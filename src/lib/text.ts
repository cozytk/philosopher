/** Small text helpers that are aware of Korean writing (no word spaces). */

export function countChars(text: string): number {
  return text.replace(/\s+/g, '').length
}

export function countSentences(text: string): number {
  const parts = text
    .split(/[.!?。！？…]+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1)
  return parts.length
}

export function countParagraphs(text: string): number {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean).length
}

/** FNV-1a 32-bit hash, used to detect whether an answer changed since a reflection. */
export function hashText(text: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max - 1) + '…'
}

/** Rough token estimate: Korean ≈ 1 token per 1.5 chars, Latin ≈ 1 per 4 chars. */
export function estimateTokens(text: string): number {
  let hangul = 0
  let other = 0
  for (const ch of text) {
    if (/[가-힣㄰-㆏]/.test(ch)) hangul++
    else other++
  }
  return Math.ceil(hangul / 1.5 + other / 4)
}
