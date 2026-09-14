import type { ProviderConfig } from '@/types'
import { baseUrlFor } from './models'
import type { Price } from './cost'
import { estimateCostUsd } from './cost'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatUsage {
  promptTokens: number
  completionTokens: number
  /** USD; exact from OpenRouter, estimated elsewhere, undefined when unknown. */
  costUsd?: number
}

export interface ChatOptions {
  messages: ChatMessage[]
  maxTokens?: number
  temperature?: number
  /** Ask for a JSON object; falls back gracefully when the model refuses the parameter. */
  json?: boolean
  signal?: AbortSignal
  /** Stream tokens as they arrive. */
  onToken?: (token: string) => void
  /** Used to estimate cost when the provider does not report it. */
  price?: Price
}

export interface ChatResult {
  text: string
  model: string
  usage: ChatUsage
}

export class LlmError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

function friendly(status: number, body: string, provider: ProviderConfig['provider']): string {
  const snippet = body.replace(/\s+/g, ' ').slice(0, 240)
  if (status === 401) return provider === 'custom' ? `인증 실패(401). 엔드포인트가 키를 요구하는지 확인하세요. ${snippet}` : `API 키가 유효하지 않습니다(401). 설정에서 키를 확인하세요.`
  if (status === 402) return '크레딧이 부족합니다(402). 제공자 계정에 잔액을 충전하세요.'
  if (status === 403) return `접근이 거부되었습니다(403). ${snippet}`
  if (status === 404) return `모델 또는 엔드포인트를 찾을 수 없습니다(404). 모델 id를 확인하세요. ${snippet}`
  if (status === 429) return '요청이 너무 잦습니다(429). 잠시 후 다시 시도하세요. 무료 모델은 분당/일일 한도가 있습니다.'
  if (status >= 500) return `제공자 서버 오류(${status}). 잠시 후 다시 시도하세요.`
  return `요청 실패(${status}): ${snippet}`
}

function buildHeaders(config: ProviderConfig): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' }
  if (config.apiKey) h.Authorization = `Bearer ${config.apiKey}`
  if (config.provider === 'openrouter') {
    h['HTTP-Referer'] = typeof location !== 'undefined' ? location.origin : 'https://github.com/cozytk/philosopher'
    h['X-Title'] = 'Philosopher'
  }
  return h
}

interface Attempt {
  useJson: boolean
  useTemperature: boolean
  maxParam: 'max_tokens' | 'max_completion_tokens'
  /** OpenRouter: bound hidden reasoning so it cannot eat the whole output budget. */
  useReasoning: boolean
  /** OpenRouter: prefer the fastest provider for the model. */
  useProviderPrefs: boolean
  maxTokens?: number
  retriedEmpty: boolean
}

const MAX_OUTPUT_TOKENS = 8000

/** Chat-completions call that works against OpenRouter, OpenAI, or any compatible endpoint. */
export async function chat(config: ProviderConfig, opts: ChatOptions): Promise<ChatResult> {
  if (!config.model) throw new LlmError('모델이 선택되지 않았습니다. 설정에서 모델을 고르세요.')
  const url = `${baseUrlFor(config)}/chat/completions`
  const stream = Boolean(opts.onToken)
  let attempt: Attempt = {
    useJson: Boolean(opts.json),
    useTemperature: typeof opts.temperature === 'number',
    maxParam: config.provider === 'openai' ? 'max_completion_tokens' : 'max_tokens',
    useReasoning: config.provider === 'openrouter',
    useProviderPrefs: config.provider === 'openrouter',
    maxTokens: opts.maxTokens,
    retriedEmpty: false,
  }

  for (let i = 0; i < 7; i++) {
    const body: Record<string, unknown> = {
      model: config.model,
      messages: opts.messages,
      stream,
    }
    if (attempt.maxTokens) body[attempt.maxParam] = attempt.maxTokens
    if (attempt.useTemperature) body.temperature = opts.temperature
    if (attempt.useJson) body.response_format = { type: 'json_object' }
    if (config.provider === 'openrouter') {
      body.usage = { include: true }
      if (attempt.useReasoning) body.reasoning = { effort: 'low', exclude: true }
      if (attempt.useProviderPrefs) body.provider = { sort: 'throughput' }
    }
    if (stream && config.provider !== 'openrouter') body.stream_options = { include_usage: true }

    const res = await fetch(url, { method: 'POST', headers: buildHeaders(config), body: JSON.stringify(body), signal: opts.signal })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      const lower = text.toLowerCase()
      // Parameter-compatibility retries (different providers/models reject different params).
      if (res.status === 400 && attempt.useJson && /response_format|json_object|json/.test(lower)) {
        attempt = { ...attempt, useJson: false }
        continue
      }
      if (res.status === 400 && attempt.useTemperature && /temperature/.test(lower)) {
        attempt = { ...attempt, useTemperature: false }
        continue
      }
      if (res.status === 400 && /max_tokens|max_completion_tokens/.test(lower)) {
        attempt = { ...attempt, maxParam: attempt.maxParam === 'max_tokens' ? 'max_completion_tokens' : 'max_tokens' }
        continue
      }
      if (res.status === 400 && attempt.useReasoning && /reasoning/.test(lower)) {
        attempt = { ...attempt, useReasoning: false }
        continue
      }
      if (res.status === 400 && attempt.useProviderPrefs && /provider/.test(lower)) {
        attempt = { ...attempt, useProviderPrefs: false }
        continue
      }
      throw new LlmError(friendly(res.status, text, config.provider), res.status)
    }

    const result = stream ? await readStream(res, opts.onToken!) : await readJson(res)
    if (!result.text.trim()) {
      // Reasoning models can spend the whole budget thinking and return nothing visible.
      const budget = attempt.maxTokens
      const limitHit = result.finishReason === 'length' || (budget ? result.usage.completionTokens >= budget * 0.9 : false)
      if (budget && limitHit && !attempt.retriedEmpty && budget < MAX_OUTPUT_TOKENS) {
        attempt = { ...attempt, retriedEmpty: true, maxTokens: Math.min(MAX_OUTPUT_TOKENS, budget * 2) }
        continue
      }
      throw new LlmError('모델이 빈 답을 보냈어요. 추론(생각) 토큰이 출력 한도를 다 썼을 수 있습니다. 다시 시도하거나 설정에서 다른 모델을 골라보세요.')
    }
    const usage: ChatUsage = {
      promptTokens: result.usage.promptTokens,
      completionTokens: result.usage.completionTokens,
      costUsd: result.usage.costUsd ?? estimateCostUsd(opts.price, result.usage.promptTokens, result.usage.completionTokens),
    }
    return { text: result.text, model: result.model || config.model, usage }
  }
  throw new LlmError('요청 매개변수를 조정했지만 제공자가 계속 거부했습니다.')
}

interface RawUsage {
  prompt_tokens?: number
  completion_tokens?: number
  cost?: number
}

function parseUsage(u: RawUsage | undefined): ChatUsage {
  return {
    promptTokens: u?.prompt_tokens ?? 0,
    completionTokens: u?.completion_tokens ?? 0,
    costUsd: typeof u?.cost === 'number' ? u.cost : undefined,
  }
}

interface ReadResult {
  text: string
  model: string
  usage: ChatUsage
  finishReason?: string
}

async function readJson(res: Response): Promise<ReadResult> {
  const json = (await res.json()) as {
    model?: string
    choices?: { message?: { content?: string | { text?: string }[] }; finish_reason?: string | null }[]
    usage?: RawUsage
    error?: { message?: string }
  }
  if (json.error?.message) throw new LlmError(json.error.message)
  const choice = json.choices?.[0]
  const raw = choice?.message?.content
  const text = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw.map((p) => p.text ?? '').join('') : ''
  return { text, model: json.model ?? '', usage: parseUsage(json.usage), finishReason: choice?.finish_reason ?? undefined }
}

async function readStream(res: Response, onToken: (t: string) => void): Promise<ReadResult> {
  const reader = res.body?.getReader()
  if (!reader) throw new LlmError('스트리밍 응답을 읽을 수 없습니다.')
  const decoder = new TextDecoder()
  let buffer = ''
  let text = ''
  let model = ''
  let usage: ChatUsage = { promptTokens: 0, completionTokens: 0 }
  let finishReason: string | undefined
  let done = false
  while (!done) {
    const { value, done: d } = await reader.read()
    done = d
    if (value) buffer += decoder.decode(value, { stream: true })
    let idx: number
    while ((idx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, idx).trim()
      buffer = buffer.slice(idx + 1)
      if (!line || line.startsWith(':')) continue // SSE comments like ": OPENROUTER PROCESSING"
      if (!line.startsWith('data:')) continue
      const payload = line.slice(5).trim()
      if (payload === '[DONE]') {
        done = true
        break
      }
      try {
        const chunk = JSON.parse(payload) as {
          model?: string
          choices?: { delta?: { content?: string }; finish_reason?: string | null }[]
          usage?: RawUsage
          error?: { message?: string }
        }
        if (chunk.error?.message) throw new LlmError(chunk.error.message)
        if (chunk.model) model = chunk.model
        const choice = chunk.choices?.[0]
        const delta = choice?.delta?.content
        if (delta) {
          text += delta
          onToken(delta)
        }
        if (choice?.finish_reason) finishReason = choice.finish_reason
        if (chunk.usage) usage = parseUsage(chunk.usage)
      } catch (e) {
        if (e instanceof LlmError) throw e
        // ignore malformed keep-alive fragments
      }
    }
  }
  return { text, model, usage, finishReason }
}

/** Quick connectivity/authorization check used by the settings page. */
export async function testConnection(config: ProviderConfig, price?: Price): Promise<ChatResult> {
  return chat(config, {
    messages: [{ role: 'user', content: '한 단어로만 답하세요: 준비됐나요?' }],
    maxTokens: 200,
    price,
  })
}
