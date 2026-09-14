import type { Lens, Question } from '@/types'
import { LENSES, LENS_MAP } from '@/content'
import { analyzeText } from './signals'

/** Domain-level words that appear in almost every lens; useless for matching. */
const GENERIC_TAGS = new Set([
  '행복', '의미', '즐거움', '가치', '자아', '관계', '일', '고통', '감정', '자유', '죽음', '시간', '경험', '대조', '정의', '종합', '점검', '한국', '문화', '목적',
])

export interface LensSuggestion {
  lens: Lens
  score: number
  reason: string
  /** 'direct' = curated for this question, 'text' = matched the writing, 'contrast' = opposes an engaged lens */
  source: 'direct' | 'text' | 'contrast'
}

/**
 * Rank lenses for a question + the reader's current text. No network, no
 * model: curated links first, then keyword matches, then deliberate
 * contrasts to whatever the reader already engaged with (to widen the view).
 */
export function retrieveLenses(question: Question, text: string, linkedLensIds: string[] = [], k = 6): LensSuggestion[] {
  const out = new Map<string, LensSuggestion>()
  const linked = new Set(linkedLensIds)

  question.lensIds.forEach((id, i) => {
    const lens = LENS_MAP[id]
    if (!lens) return
    out.set(id, { lens, score: 10 - i, reason: '이 질문에 직접 닿아 있는 관점', source: 'direct' })
  })

  const t = text ?? ''
  if (t.trim().length > 20) {
    const signals = analyzeText(t, LENSES)
    for (const lens of LENSES) {
      let hits = 0
      const matched: string[] = []
      for (const tag of lens.tags) {
        if (!/[가-힣]/.test(tag)) continue // Korean tags only for matching
        if (tag.length < 2 || GENERIC_TAGS.has(tag)) continue
        if (t.includes(tag)) {
          hits++
          if (matched.length < 2) matched.push(tag)
        }
      }
      if (signals.mentionedLensIds.includes(lens.id)) hits += 3
      if (hits === 0) continue
      const prev = out.get(lens.id)
      const score = (prev?.score ?? 0) + hits * 1.5
      const reason = signals.mentionedLensIds.includes(lens.id)
        ? '당신의 글에서 직접 언급된 관점'
        : `당신의 글에 ‘${matched.join('’, ‘')}’이(가) 등장해요`
      out.set(lens.id, { lens, score, reason: prev ? prev.reason : reason, source: prev ? 'direct' : 'text' })
    }
  }

  // Widen: contrasts of what the reader already engaged with.
  for (const id of linked) {
    const lens = LENS_MAP[id]
    for (const c of lens?.contrastsWith ?? []) {
      if (linked.has(c)) continue
      const cl = LENS_MAP[c]
      if (!cl) continue
      const prev = out.get(c)
      out.set(c, {
        lens: cl,
        score: (prev?.score ?? 0) + 5,
        reason: prev?.source === 'direct' ? prev.reason : `‘${lens.name.split(' — ')[0]}’과 맞서는 관점 — 다른 방면에서 보기`,
        source: prev?.source === 'direct' ? 'direct' : 'contrast',
      })
    }
  }

  return [...out.values()]
    .filter((s) => !linked.has(s.lens.id) || s.source === 'direct')
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
}
