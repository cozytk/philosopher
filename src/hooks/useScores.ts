import { useMemo, useState } from 'react'
import { useStore } from '@/store/useStore'
import { scoreAll, type OverallScore } from '@/engine/scoring'
import { recommendQuestions, revisitSuggestions, type Recommendation, type RevisitSuggestion } from '@/engine/recommend'

export function useOverall(): OverallScore {
  const answers = useStore((s) => s.answers)
  return useMemo(() => scoreAll(answers), [answers])
}

export function useRecommendations(limit = 5, domainId?: string): Recommendation[] {
  const answers = useStore((s) => s.answers)
  const overall = useOverall()
  return useMemo(() => recommendQuestions(answers, overall, { limit, domainId }), [answers, overall, limit, domainId])
}

export function useRevisits(limit = 4): RevisitSuggestion[] {
  const answers = useStore((s) => s.answers)
  const [now] = useState(() => Date.now())
  return useMemo(() => revisitSuggestions(answers, now, limit), [answers, now, limit])
}
