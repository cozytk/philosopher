import type { ProviderConfig } from '@/types'
import { OPENAI_PRICES, type Price } from './cost'

export interface ModelInfo {
  id: string
  name: string
  /** USD per 1M tokens; undefined when unknown. */
  price?: Price
  contextLength?: number
  free?: boolean
  supportsJson?: boolean
}

/** Cheap, capable defaults tried in order until one exists in the provider's catalog. */
export const PREFERRED_MODELS: Record<ProviderConfig['provider'], string[]> = {
  openrouter: [
    'openai/gpt-5-mini',
    'google/gemini-2.5-flash',
    'anthropic/claude-haiku-4.5',
    'openai/gpt-4.1-mini',
    'openai/gpt-4o-mini',
    'google/gemini-2.5-flash-lite',
    'deepseek/deepseek-chat-v3-0324',
  ],
  openai: ['gpt-5-mini', 'gpt-4.1-mini', 'gpt-4o-mini', 'gpt-5-nano', 'gpt-4.1-nano'],
  custom: [],
}

export function baseUrlFor(config: ProviderConfig): string {
  if (config.provider === 'openrouter') return 'https://openrouter.ai/api/v1'
  if (config.provider === 'openai') return 'https://api.openai.com/v1'
  return (config.baseUrl ?? 'http://localhost:11434/v1').replace(/\/+$/, '')
}

interface OpenRouterModel {
  id: string
  name?: string
  context_length?: number
  pricing?: { prompt?: string; completion?: string }
  supported_parameters?: string[]
}

export async function fetchModels(config: ProviderConfig, signal?: AbortSignal): Promise<ModelInfo[]> {
  const base = baseUrlFor(config)
  const headers: Record<string, string> = {}
  if (config.apiKey && config.provider !== 'openrouter') headers.Authorization = `Bearer ${config.apiKey}`
  if (config.provider === 'openrouter' && config.apiKey) headers.Authorization = `Bearer ${config.apiKey}`
  const res = await fetch(`${base}/models`, { headers, signal })
  if (!res.ok) throw new Error(`모델 목록을 가져오지 못했습니다 (${res.status})`)
  const json = (await res.json()) as { data?: unknown[] }
  const data = Array.isArray(json.data) ? json.data : []

  if (config.provider === 'openrouter') {
    return (data as OpenRouterModel[])
      .filter((m) => typeof m.id === 'string')
      .map((m) => {
        const p = Number(m.pricing?.prompt ?? NaN) * 1_000_000
        const c = Number(m.pricing?.completion ?? NaN) * 1_000_000
        const price = Number.isFinite(p) && Number.isFinite(c) ? { prompt: p, completion: c } : undefined
        return {
          id: m.id,
          name: m.name ?? m.id,
          price,
          contextLength: m.context_length,
          free: price ? price.prompt === 0 && price.completion === 0 : m.id.endsWith(':free'),
          supportsJson: m.supported_parameters?.includes('response_format') ?? undefined,
        }
      })
      .sort((a, b) => (a.price?.prompt ?? 1e9) - (b.price?.prompt ?? 1e9))
  }

  return (data as { id?: string }[])
    .filter((m) => typeof m.id === 'string')
    .map((m) => {
      const id = m.id as string
      const key = Object.keys(OPENAI_PRICES).find((k) => id === k || id.startsWith(k + '-'))
      return { id, name: id, price: key ? OPENAI_PRICES[key] : undefined }
    })
    .filter((m) => config.provider !== 'openai' || /^(gpt|o\d|chatgpt)/.test(m.id))
    .sort((a, b) => (a.price?.prompt ?? 1e9) - (b.price?.prompt ?? 1e9))
}

export function pickDefaultModel(provider: ProviderConfig['provider'], available: ModelInfo[]): string | undefined {
  const ids = new Set(available.map((m) => m.id))
  const hit = PREFERRED_MODELS[provider].find((id) => ids.has(id))
  if (hit) return hit
  return available[0]?.id
}
