import { describe, expect, it } from 'vitest'
import type { Answer } from '@/types'
import { QUESTION_MAP, LENSES } from '@/content'
import { analyzeText, hasCrisisLanguage } from './signals'
import { scoreAnswer, scoreDomain, scoreAll, isAnswered, answerInputHash } from './scoring'
import { recommendQuestions, revisitSuggestions } from './recommend'
import { retrieveLenses } from './retrieval'

const LONG =
  '예를 들어 지난주 토요일 아침, 친구와 한강을 걸었을 때 나는 행복했다. 왜냐하면 아무것도 증명할 필요가 없었기 때문이다. ' +
  '하지만 회사에서 인정받았을 때의 기쁨은 금방 사라졌다. 아마도 그것은 비교에서 온 기쁨이었던 것 같다.\n\n' +
  '그래서 나는 행복이 성취보다 관계와 현재에 있다고 생각한다. 아리스토텔레스처럼 활동이라고 보기엔 아직 확신이 없다. ' +
  '정말 그런가? 에피쿠로스가 말한 평정이 내가 원하는 것일지도 모르겠다. 이 문장을 다시 읽어보면 나는 여전히 흔들린다. ' +
  '그럼에도 이 답을 적어두는 이유는 다음에 비교해보기 위해서다. 오늘의 나는 여기까지 왔다.'

const PLAIN =
  '예를 들어 지난주 토요일 아침에 친구와 한강을 걸었을 때 나는 행복했다. 왜냐하면 아무것도 증명할 필요가 없었기 때문이다. ' +
  '회사에서 인정받았을 때의 기쁨은 금방 사라졌다. 그것은 비교에서 온 기쁨이었다. 그래서 나는 행복이 성취보다 관계와 현재에 있다고 생각한다. ' +
  '이 답을 적어두는 이유는 다음에 비교해보기 위해서다. 오늘의 나는 여기까지 왔다. 내일의 나도 같은 답을 쓸 것이다. 행복은 관계 속의 현재다.'

function answer(partial: Partial<Answer> & { questionId: string }): Answer {
  const now = new Date().toISOString()
  return {
    text: '',
    openQuestions: [],
    linkedLensIds: [],
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    versions: [],
    ...partial,
  }
}

describe('signals', () => {
  it('detects examples, reasons, contrast, uncertainty, self-questions and lens mentions', () => {
    const s = analyzeText(LONG, LENSES)
    expect(s.hasExample).toBe(true)
    expect(s.hasReasons).toBe(true)
    expect(s.hasContrast).toBe(true)
    expect(s.hasUncertainty).toBe(true)
    expect(s.selfQuestions).toBeGreaterThan(0)
    expect(s.hasStanceWords).toBe(true)
    expect(s.paragraphs).toBe(2)
    expect(s.mentionedLensIds).toContain('aristotle-eudaimonia')
    expect(s.mentionedLensIds).toContain('epicurus-ataraxia')
  })
  it('handles empty text', () => {
    const s = analyzeText('', LENSES)
    expect(s.chars).toBe(0)
    expect(s.mentionedLensIds).toEqual([])
  })
  it('one-character thinker names need a particle', () => {
    expect(analyzeText('밀가루를 샀다', LENSES).mentionedLensIds).not.toContain('mill-utilitarianism')
    expect(analyzeText('밀은 높은 쾌락을 말했다', LENSES).mentionedLensIds).toContain('mill-utilitarianism')
  })
  it('flags crisis language', () => {
    expect(hasCrisisLanguage('요즘 너무 힘들다')).toBe(false)
    expect(hasCrisisLanguage('죽고 싶다는 생각이 든다')).toBe(true)
  })
})

describe('scoring', () => {
  const q = QUESTION_MAP['hap-moments']
  it('short drafts do not count as answered', () => {
    expect(isAnswered(answer({ questionId: q.id, text: '짧다' }))).toBe(false)
    expect(isAnswered(answer({ questionId: q.id, text: LONG }))).toBe(true)
    expect(isAnswered(answer({ questionId: q.id, text: '', stance: '행복은 관계 속의 현재다' }))).toBe(true)
  })
  it('depth grows with length, examples and reasons', () => {
    const shallow = scoreAnswer(answer({ questionId: q.id, text: '행복은 좋은 것이다. '.repeat(10) }), q)
    const deep = scoreAnswer(answer({ questionId: q.id, text: LONG }), q)
    expect(deep.depth).toBeGreaterThan(shallow.depth)
    expect(deep.depth).toBeLessThanOrEqual(1)
  })
  it('commitment depends on stance and confidence', () => {
    const none = scoreAnswer(answer({ questionId: q.id, text: LONG }), q)
    const low = scoreAnswer(answer({ questionId: q.id, text: LONG, stance: '행복은 관계 속의 현재다', confidence: 10 }), q)
    const high = scoreAnswer(answer({ questionId: q.id, text: LONG, stance: '행복은 관계 속의 현재다', confidence: 90 }), q)
    expect(none.commitment).toBe(0)
    expect(high.commitment).toBeGreaterThan(low.commitment)
  })
  it('blends an up-to-date rubric into depth and ignores stale ones', () => {
    const base = answer({ questionId: q.id, text: LONG })
    const rubric = { clarity: 3, reasons: 3, lived: 3, alternatives: 3, integration: 3 }
    const fresh = {
      ...base,
      reflection: { inputHash: answerInputHash(base), model: 'm', at: base.updatedAt, summary: '', strengths: [], assumptions: [], questions: [], tensions: [], lenses: [], rubric, nextStep: '' },
    }
    const stale = { ...fresh, reflection: { ...fresh.reflection, inputHash: 'deadbeef' } }
    expect(scoreAnswer(fresh, q).rubricUsed).toBe(true)
    expect(scoreAnswer(stale, q).rubricUsed).toBe(false)
    expect(scoreAnswer(fresh, q).depth).toBeGreaterThan(scoreAnswer(stale, q).depth)
  })
  it('domain status follows exploration × commitment', () => {
    expect(scoreDomain('happiness', {}).status).toBe('untouched')
    const a1 = answer({ questionId: 'hap-moments', text: '행복은 좋은 것이다. '.repeat(10) })
    expect(scoreDomain('happiness', { [a1.questionId]: a1 }).status).toBe('diffusion')
    const a2 = answer({ questionId: 'hap-define', text: LONG, stance: '행복은 관계 속의 현재다', confidence: 90 })
    const a3 = answer({ questionId: 'hap-synthesis', text: LONG, stance: '행복은 관계 속의 현재다', confidence: 90, linkedLensIds: ['aristotle-eudaimonia', 'stoicism-dichotomy', 'buddhism-dukkha'], openQuestions: ['정말?'] })
    const d = scoreDomain('happiness', { [a1.questionId]: a1, [a2.questionId]: a2, [a3.questionId]: a3 })
    expect(d.status).toBe('achievement')
    expect(d.levelsDone).toEqual([true, true, false, true])
    expect(d.nextLevel).toBe(3)
    expect(d.score).toBeGreaterThan(0)
    expect(d.score).toBeLessThanOrEqual(100)
  })
  it('overall index is 0 with no answers and bounded otherwise', () => {
    expect(scoreAll({}).index).toBe(0)
    const a = answer({ questionId: 'joy-lost-time', text: LONG, stance: '나는 만들 때 즐겁다', confidence: 70 })
    const all = scoreAll({ [a.questionId]: a })
    expect(all.index).toBeGreaterThan(0)
    expect(all.index).toBeLessThanOrEqual(100)
    expect(all.counts.answered).toBe(1)
    expect(all.counts.stances).toBe(1)
  })
})

describe('recommendations', () => {
  it('starts with core experience questions when nothing is answered', () => {
    const recs = recommendQuestions({}, scoreAll({}), { limit: 3 })
    expect(recs.length).toBe(3)
    expect(recs.every((r) => r.question.level === 1)).toBe(true)
    expect(new Set(recs.map((r) => r.question.domainId)).size).toBe(3)
    expect(recs.some((r) => ['happiness', 'meaning', 'joy'].includes(r.question.domainId))).toBe(true)
  })
  it('respects prerequisites and suggests contrast for foreclosed domains', () => {
    const a = answer({ questionId: 'hap-moments', text: PLAIN, stance: '행복은 관계 속의 현재다', confidence: 90 })
    const b = answer({ questionId: 'hap-define', text: PLAIN, stance: '행복은 관계 속의 현재다', confidence: 90 })
    const answers = { [a.questionId]: a, [b.questionId]: b }
    const overall = scoreAll(answers)
    expect(overall.domains.find((d) => d.domainId === 'happiness')!.status).toBe('foreclosure')
    const recs = recommendQuestions(answers, overall, { domainId: 'happiness', limit: 5 })
    expect(recs.some((r) => r.question.id === 'hap-synthesis')).toBe(false)
    expect(recs[0].question.level).toBe(3)
    expect(recs[0].kind).toBe('contrast')
    expect(recs.every((r) => r.question.id !== 'hap-moments')).toBe(true)
  })
  it('suggests synthesis once exploration is high', () => {
    const mk = (id: string) =>
      answer({ questionId: id, text: LONG, linkedLensIds: ['aristotle-eudaimonia', 'stoicism-dichotomy', 'buddhism-dukkha'], openQuestions: ['?'] })
    const answers = Object.fromEntries(['hap-moments', 'hap-define', 'hap-stoic-test', 'hap-pursuit-paradox'].map((id) => [id, mk(id)]))
    const recs = recommendQuestions(answers, scoreAll(answers), { domainId: 'happiness', limit: 3 })
    expect(recs[0].question.id).toBe('hap-synthesis')
    expect(recs[0].kind).toBe('synthesize')
  })
  it('flags old stances for revisiting', () => {
    const old = new Date(Date.now() - 45 * 86400000).toISOString()
    const a = answer({ questionId: 'hap-define', text: LONG, stance: '행복은 관계 속의 현재다', createdAt: old, updatedAt: old })
    const s = revisitSuggestions({ [a.questionId]: a })
    expect(s.length).toBe(1)
    expect(s[0].daysAgo).toBeGreaterThanOrEqual(45)
  })
})

describe('retrieval', () => {
  it('returns curated lenses first and adds text matches and contrasts', () => {
    const q = QUESTION_MAP['hap-define']
    const res = retrieveLenses(q, LONG, ['aristotle-eudaimonia'], 8)
    expect(res.length).toBeGreaterThan(0)
    expect(res.some((r) => r.source === 'contrast')).toBe(true)
    expect(res.every((r) => r.lens.id !== 'aristotle-eudaimonia' || r.source === 'direct')).toBe(true)
  })
})
