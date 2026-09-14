import type { ProviderConfig } from '@/types'

/** USD per 1M tokens. OpenRouter prices come from its model list at runtime; these are fallbacks. */
export interface Price {
  prompt: number
  completion: number
}

/** Approximate OpenAI list prices (USD / 1M tokens). Verify against platform.openai.com/pricing. */
export const OPENAI_PRICES: Record<string, Price> = {
  'gpt-4o-mini': { prompt: 0.15, completion: 0.6 },
  'gpt-4.1-nano': { prompt: 0.1, completion: 0.4 },
  'gpt-4.1-mini': { prompt: 0.4, completion: 1.6 },
  'gpt-4.1': { prompt: 2, completion: 8 },
  'gpt-4o': { prompt: 2.5, completion: 10 },
  'gpt-5-nano': { prompt: 0.05, completion: 0.4 },
  'gpt-5-mini': { prompt: 0.25, completion: 2 },
  'gpt-5': { prompt: 1.25, completion: 10 },
}

export function priceFor(config: ProviderConfig, prices: Record<string, Price>): Price | undefined {
  const model = config.model ?? ''
  if (prices[model]) return prices[model]
  // strip date suffixes like gpt-4o-mini-2024-07-18
  const base = Object.keys(prices).find((k) => model.startsWith(k))
  return base ? prices[base] : undefined
}

export function estimateCostUsd(price: Price | undefined, promptTokens: number, completionTokens: number): number | undefined {
  if (!price) return undefined
  return (promptTokens * price.prompt + completionTokens * price.completion) / 1_000_000
}

export function formatUsd(x: number | undefined): string {
  if (x === undefined || !Number.isFinite(x)) return '—'
  if (x === 0) return '$0'
  if (x < 0.001) return '<$0.001'
  if (x < 0.01) return `$${x.toFixed(4)}`
  if (x < 1) return `$${x.toFixed(3)}`
  return `$${x.toFixed(2)}`
}

export function formatKrw(usd: number | undefined, rate = 1380): string {
  if (usd === undefined || !Number.isFinite(usd)) return ''
  const krw = usd * rate
  if (krw < 1) return '약 1원 미만'
  return `약 ${Math.round(krw).toLocaleString('ko-KR')}원`
}
