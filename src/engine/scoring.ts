import type { Answer, Question, QuestionLevel } from '@/types'
import { DOMAINS, LENSES, QUESTIONS, QUESTION_MAP } from '@/content'
import { analyzeText, type TextSignals } from './signals'
import { hashText } from '@/lib/text'
import { daysBetween } from '@/lib/dates'

// ─────────────────────────────────────────────────────────────────────────────
// Scoring model
//
// The index is a *map-coverage* measure, not a judgement of the person. It
// combines four things a reader can act on, per domain:
//   넓이 coverage    — how much of the question ladder has been written about
//   깊이 depth       — how concrete, reasoned and structured the writing is
//   다양성 exploration — how many other perspectives were engaged (lenses,
//                       counter-arguments, open questions)
//   확립 commitment  — whether a stance exists and how confident it is
// plus a small 살아있음 revisit bonus for answers that were revisited.
//
// Marcia's identity-status model (exploration × commitment) gives each domain
// a non-judgemental label: 탐색 초기 / 입장 있음·검토 전 / 탐색 중 / 입장 확립.
// ─────────────────────────────────────────────────────────────────────────────

export const LEVEL_WEIGHT: Record<QuestionLevel, number> = { 1: 1, 2: 1, 3: 1.2, 4: 1.5 }
const LENGTH_TARGET: Record<QuestionLevel, number> = { 1: 400, 2: 550, 3: 650, 4: 650 }
/** Minimum non-whitespace characters for a draft to count as "answered". */
export const ANSWERED_MIN_CHARS = 80

export type DomainStatus = 'untouched' | 'diffusion' | 'foreclosure' | 'moratorium' | 'achievement'

export const STATUS_LABELS: Record<DomainStatus, { name: string; desc: string }> = {
  untouched: { name: '시작 전', desc: '아직 이 영역의 질문에 답하지 않았어요.' },
  diffusion: { name: '탐색 초기', desc: '경험을 모으는 단계예요. 아직 입장도, 다른 관점 검토도 이르네요.' },
  foreclosure: { name: '입장 있음 · 검토 전', desc: '입장은 있지만 다른 관점과 맞붙어 본 적은 적어요. 대조 질문이 도움이 돼요.' },
  moratorium: { name: '탐색 중', desc: '여러 관점을 살펴보는 중이에요. 이제 입장을 한 문장으로 정리해볼 때예요.' },
  achievement: { name: '입장 확립', desc: '다른 관점을 알면서도 자기 입장을 세웠어요. 시간이 지나면 다시 읽어보세요.' },
}

export interface AnswerScore {
  answered: boolean
  depth: number
  exploration: number
  commitment: number
  signals: TextSignals
  /** True when an up-to-date LLM rubric was blended into depth. */
  rubricUsed: boolean
}

export function answerInputHash(a: Pick<Answer, 'text' | 'stance'>): string {
  return hashText(`${a.text ?? ''}\n---\n${a.stance ?? ''}`)
}

export function isAnswered(a: Answer | undefined): boolean {
  if (!a) return false
  const chars = (a.text ?? '').replace(/\s+/g, '').length
  return chars >= ANSWERED_MIN_CHARS || Boolean(a.stance && a.stance.trim().length >= 8)
}

export function scoreAnswer(a: Answer, q: Question): AnswerScore {
  const signals = analyzeText(a.text ?? '', LENSES)
  const answered = isAnswered(a)
  const lengthScore = Math.min(1, signals.chars / LENGTH_TARGET[q.level])
  let depth =
    0.4 * lengthScore +
    0.15 * (signals.hasExample ? 1 : 0) +
    0.15 * (signals.hasReasons ? 1 : 0) +
    0.1 * (signals.hasContrast ? 1 : 0) +
    0.1 * (signals.hasUncertainty || signals.selfQuestions > 0 ? 1 : 0) +
    0.1 * (signals.paragraphs >= 2 ? 1 : 0)

  let rubricUsed = false
  if (a.reflection && a.reflection.inputHash === answerInputHash(a)) {
    const r = a.reflection.rubric
    const avg = (r.clarity + r.reasons + r.lived + r.alternatives + r.integration) / 15
    if (Number.isFinite(avg)) {
      depth = 0.5 * depth + 0.5 * avg
      rubricUsed = true
    }
  }

  const linked = new Set(a.linkedLensIds ?? [])
  for (const id of signals.mentionedLensIds) linked.add(id)
  const lensPart = Math.min(1, linked.size / 3)
  const exploration =
    0.6 * lensPart + 0.2 * (signals.hasContrast ? 1 : 0) + 0.2 * ((a.openQuestions ?? []).length > 0 ? 1 : 0)

  let commitment = 0
  if (a.stance && a.stance.trim().length >= 8) {
    const conf = typeof a.confidence === 'number' ? Math.max(0, Math.min(100, a.confidence)) : 50
    commitment = 0.5 + 0.5 * (conf / 100)
    if (a.status === 'revisit') commitment *= 0.8
  }

  return {
    answered,
    depth: clamp01(depth),
    exploration: clamp01(exploration),
    commitment: clamp01(commitment),
    signals,
    rubricUsed,
  }
}

export interface DomainScore {
  domainId: string
  score: number
  coverage: number
  depth: number
  exploration: number
  commitment: number
  revisit: number
  status: DomainStatus
  answered: number
  total: number
  /** Whether at least one question at each level (1–4) is answered. */
  levelsDone: [boolean, boolean, boolean, boolean]
  /** First level with no answered question, or null if all touched. */
  nextLevel: QuestionLevel | null
  lastActivity?: string
  /** A stance changed within the last 14 days. */
  recentlyChanged: boolean
  distinctLenses: number
}

export function scoreDomain(domainId: string, answers: Record<string, Answer>): DomainScore {
  const qs = QUESTIONS.filter((q) => q.domainId === domainId)
  const scored = qs
    .map((q) => ({ q, a: answers[q.id] }))
    .filter((x): x is { q: Question; a: Answer } => Boolean(x.a))
    .map(({ q, a }) => ({ q, a, s: scoreAnswer(a, q) }))
    .filter((x) => x.s.answered)

  const totalW = qs.reduce((acc, q) => acc + LEVEL_WEIGHT[q.level], 0)
  const doneW = scored.reduce((acc, x) => acc + LEVEL_WEIGHT[x.q.level], 0)
  const coverage = totalW === 0 ? 0 : doneW / totalW

  const wmean = (f: (x: { q: Question; a: Answer; s: AnswerScore }) => number) => {
    if (scored.length === 0) return 0
    const w = scored.reduce((acc, x) => acc + LEVEL_WEIGHT[x.q.level], 0)
    return scored.reduce((acc, x) => acc + f(x) * LEVEL_WEIGHT[x.q.level], 0) / w
  }

  const depth = wmean((x) => x.s.depth)

  const distinct = new Set<string>()
  for (const x of scored) {
    for (const id of x.a.linkedLensIds ?? []) distinct.add(id)
    for (const id of x.s.signals.mentionedLensIds) distinct.add(id)
  }
  const exploration = scored.length === 0 ? 0 : 0.7 * wmean((x) => x.s.exploration) + 0.3 * Math.min(1, distinct.size / 4)

  const synth = scored.filter((x) => x.q.level === 4)
  const meanAll = wmean((x) => x.s.commitment)
  let commitment: number
  if (synth.length > 0) {
    const meanSynth = synth.reduce((acc, x) => acc + x.s.commitment, 0) / synth.length
    commitment = 0.6 * meanSynth + 0.4 * meanAll
  } else {
    commitment = Math.min(0.75, meanAll)
  }

  const revisit =
    scored.length === 0
      ? 0
      : scored.filter((x) => (x.a.versions?.length ?? 0) >= 2 || daysBetween(x.a.createdAt, x.a.updatedAt) >= 7).length /
        scored.length

  const score = Math.round(100 * (0.3 * coverage + 0.25 * depth + 0.2 * exploration + 0.2 * commitment + 0.05 * revisit))

  let status: DomainStatus
  if (scored.length === 0) status = 'untouched'
  else if (exploration >= 0.5 && commitment >= 0.5) status = 'achievement'
  else if (exploration >= 0.5) status = 'moratorium'
  else if (commitment >= 0.5) status = 'foreclosure'
  else status = 'diffusion'

  const levelsDone: [boolean, boolean, boolean, boolean] = [1, 2, 3, 4].map((l) =>
    scored.some((x) => x.q.level === l),
  ) as [boolean, boolean, boolean, boolean]
  const nextIdx = levelsDone.findIndex((d) => !d)
  const nextLevel = nextIdx === -1 ? null : ((nextIdx + 1) as QuestionLevel)

  const lastActivity = scored.map((x) => x.a.updatedAt).sort().at(-1)
  const recentlyChanged = scored.some((x) => {
    const v = x.a.versions ?? []
    if (v.length < 2) return false
    const last = v[v.length - 1]
    const prev = v[v.length - 2]
    return last.stance !== prev.stance && daysBetween(last.at) <= 14
  })

  return {
    domainId,
    score,
    coverage,
    depth,
    exploration,
    commitment,
    revisit,
    status,
    answered: scored.length,
    total: qs.length,
    levelsDone,
    nextLevel,
    lastActivity,
    recentlyChanged,
    distinctLenses: distinct.size,
  }
}

export interface OverallScore {
  index: number
  /** Mean of the three core domains (행복·의미·즐거움). */
  coreIndex: number
  domains: DomainScore[]
  components: { coverage: number; depth: number; exploration: number; commitment: number }
  counts: { answered: number; stances: number; lenses: number; questions: number }
}

export function scoreAll(answers: Record<string, Answer>): OverallScore {
  const domains = DOMAINS.map((d) => scoreDomain(d.id, answers))
  const n = domains.length || 1
  const index = Math.round(domains.reduce((acc, d) => acc + d.score, 0) / n)
  const core = domains.filter((d) => DOMAINS.find((x) => x.id === d.domainId)?.core)
  const coreIndex = core.length ? Math.round(core.reduce((acc, d) => acc + d.score, 0) / core.length) : 0
  const mean = (k: 'coverage' | 'depth' | 'exploration' | 'commitment') =>
    domains.reduce((acc, d) => acc + d[k], 0) / n
  const all = Object.values(answers)
  const lensSet = new Set<string>()
  for (const a of all) for (const id of a.linkedLensIds ?? []) lensSet.add(id)
  return {
    index,
    coreIndex,
    domains,
    components: { coverage: mean('coverage'), depth: mean('depth'), exploration: mean('exploration'), commitment: mean('commitment') },
    counts: {
      answered: all.filter((a) => isAnswered(a)).length,
      stances: all.filter((a) => a.stance && a.stance.trim().length >= 8).length,
      lenses: lensSet.size,
      questions: QUESTIONS.length,
    },
  }
}

export function questionOf(id: string): Question | undefined {
  return QUESTION_MAP[id]
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x))
}
