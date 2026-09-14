/** Pull a JSON object out of a model reply that may include prose or code fences. */
export function extractJson<T = unknown>(text: string): T {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced ? fenced[1] : trimmed
  try {
    return JSON.parse(candidate) as T
  } catch {
    const start = candidate.indexOf('{')
    const end = candidate.lastIndexOf('}')
    if (start !== -1 && end > start) {
      const slice = candidate.slice(start, end + 1)
      try {
        return JSON.parse(slice) as T
      } catch {
        // try to repair trailing commas
        const repaired = slice.replace(/,\s*([}\]])/g, '$1')
        return JSON.parse(repaired) as T
      }
    }
    throw new Error('응답에서 JSON을 찾지 못했습니다.')
  }
}

export function asStringArray(x: unknown, max = 8): string[] {
  if (!Array.isArray(x)) return []
  return x
    .map((v) => (typeof v === 'string' ? v : typeof v === 'object' && v && 'text' in v ? String((v as { text: unknown }).text) : ''))
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max)
}

export function asNumber(x: unknown, fallback: number, min = 0, max = 3): number {
  const n = typeof x === 'number' ? x : typeof x === 'string' ? Number(x) : NaN
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}
