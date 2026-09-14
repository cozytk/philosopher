import type { Lens, Question } from '@/types'
import { LENSES_ANCIENT } from './lenses-ancient'
import { LENSES_MODERN } from './lenses-modern'
import { LENSES_PSYCH } from './lenses-psych'
import { QUESTIONS, QUESTION_MAP } from './questions'

export { DOMAINS, DOMAIN_MAP, LEVEL_LABELS } from './domains'
export { QUESTIONS, QUESTION_MAP, questionsOfDomain, STARTER_QUESTION_IDS } from './questions'
export { VALUE_CARDS, VALUE_MAP, VALUE_GROUPS } from './values'
export type { ValueCard, ValueGroup } from './values'
export { SCALES, SCALE_MAP, scoreScale } from './scales'
export type { Scale, ScaleItem } from './scales'

const RAW = [...LENSES_ANCIENT, ...LENSES_MODERN, ...LENSES_PSYCH]

/** Every lens, with the questions that reference it filled in. */
export const LENSES: Lens[] = RAW.map((l) => ({
  ...l,
  questionIds: QUESTIONS.filter((q) => q.lensIds.includes(l.id)).map((q) => q.id),
}))

export const LENS_MAP: Record<string, Lens> = Object.fromEntries(LENSES.map((l) => [l.id, l]))

export function lensesForQuestion(questionId: string): Lens[] {
  const q: Question | undefined = QUESTION_MAP[questionId]
  if (!q) return []
  return q.lensIds.map((id) => LENS_MAP[id]).filter(Boolean)
}

export const LENS_TYPE_LABELS: Record<Lens['type'], string> = {
  thinker: '사상가',
  tradition: '전통',
  concept: '개념',
  paper: '논문',
  study: '연구',
  book: '책',
}
