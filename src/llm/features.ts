import type { ProviderConfig, Reflection } from '@/types'
import { chat, type ChatUsage } from './client'
import { asNumber, asStringArray, extractJson } from './json'
import { buildDialogueMessages, buildReflectMessages, buildSynthesisMessages, type DialogueInput, type ReflectInput, type SynthesisInput } from './prompts'
import { answerInputHash } from '@/engine/scoring'
import type { Price } from './cost'
import { nowIso } from '@/lib/dates'

export interface FeatureResult<T> {
  data: T
  usage: ChatUsage
  model: string
}

const REFLECT_TYPES = new Set(['clarify', 'assumption', 'evidence', 'perspective', 'implication', 'meta'])

export async function reflectOnAnswer(config: ProviderConfig, input: ReflectInput, price?: Price, signal?: AbortSignal): Promise<FeatureResult<Reflection>> {
  const messages = buildReflectMessages(input)
  const res = await chat(config, { messages, maxTokens: 2400, temperature: 0.4, json: true, price, signal })
  const raw = extractJson<Record<string, unknown>>(res.text)
  const candidateIds = new Set(input.candidates.map((c) => c.id))
  const relatedIds = new Set(input.related.map((r) => r.questionId))

  const questions = (Array.isArray(raw.questions) ? raw.questions : [])
    .map((q) => {
      if (typeof q === 'string') return { q, type: 'clarify' }
      if (q && typeof q === 'object') {
        const o = q as { q?: unknown; type?: unknown; question?: unknown }
        const text = typeof o.q === 'string' ? o.q : typeof o.question === 'string' ? o.question : ''
        const type = typeof o.type === 'string' && REFLECT_TYPES.has(o.type) ? o.type : 'clarify'
        return { q: text.trim(), type }
      }
      return { q: '', type: 'clarify' }
    })
    .filter((q) => q.q.length > 0)
    .slice(0, 6)

  const tensions = (Array.isArray(raw.tensions) ? raw.tensions : [])
    .map((t) => {
      const o = (t ?? {}) as { questionId?: unknown; note?: unknown }
      return { questionId: typeof o.questionId === 'string' ? o.questionId : '', note: typeof o.note === 'string' ? o.note.trim() : '' }
    })
    .filter((t) => t.note && relatedIds.has(t.questionId))
    .slice(0, 4)

  const lenses = (Array.isArray(raw.lenses) ? raw.lenses : [])
    .map((l) => {
      const o = (l ?? {}) as { id?: unknown; why?: unknown }
      return { id: typeof o.id === 'string' ? o.id : '', why: typeof o.why === 'string' ? o.why.trim() : '' }
    })
    .filter((l) => candidateIds.has(l.id))
    .slice(0, 3)

  const r = (raw.rubric ?? {}) as Record<string, unknown>
  const reflection: Reflection = {
    inputHash: answerInputHash(input.answer),
    model: res.model,
    at: nowIso(),
    summary: typeof raw.summary === 'string' ? raw.summary.trim() : '',
    strengths: asStringArray(raw.strengths, 3),
    assumptions: asStringArray(raw.assumptions, 4),
    questions,
    tensions,
    lenses,
    rubric: {
      clarity: asNumber(r.clarity, 1),
      reasons: asNumber(r.reasons, 1),
      lived: asNumber(r.lived, 1),
      alternatives: asNumber(r.alternatives, 1),
      integration: asNumber(r.integration, 1),
    },
    nextStep: typeof raw.nextStep === 'string' ? raw.nextStep.trim() : '',
  }
  return { data: reflection, usage: res.usage, model: res.model }
}

export async function dialogueTurn(
  config: ProviderConfig,
  input: DialogueInput,
  onToken: (t: string) => void,
  price?: Price,
  signal?: AbortSignal,
): Promise<FeatureResult<string>> {
  const messages = buildDialogueMessages(input)
  const res = await chat(config, { messages, maxTokens: 800, temperature: 0.7, onToken, price, signal })
  return { data: res.text.trim(), usage: res.usage, model: res.model }
}

export async function synthesizePhilosophy(config: ProviderConfig, input: SynthesisInput, price?: Price, signal?: AbortSignal): Promise<FeatureResult<string>> {
  const messages = buildSynthesisMessages(input)
  const res = await chat(config, { messages, maxTokens: 4000, temperature: 0.5, price, signal })
  let md = res.text.trim()
  const fenced = md.match(/^```(?:markdown|md)?\s*([\s\S]*?)```$/i)
  if (fenced) md = fenced[1].trim()
  return { data: md, usage: res.usage, model: res.model }
}
