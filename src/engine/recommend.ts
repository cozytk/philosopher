import type { Answer, Question } from '@/types'
import { DOMAIN_MAP, QUESTIONS, QUESTION_MAP } from '@/content'
import { isAnswered, type OverallScore } from './scoring'
import { daysBetween } from '@/lib/dates'

export type RecommendationKind = 'start' | 'continue' | 'next' | 'contrast' | 'synthesize' | 'deepen' | 'explore'

export interface Recommendation {
  question: Question
  score: number
  kind: RecommendationKind
  reasons: string[]
}

export interface RecommendOptions {
  limit?: number
  /** Restrict to one domain (used on domain pages). */
  domainId?: string
  now?: number
}

/**
 * Pick the questions most worth answering next. Purely local.
 * The ladder is respected (prerequisites first), weak domains are pulled up,
 * and Marcia-style gaps are addressed: a domain with a stance but little
 * exploration gets a 대조 question; a domain with lots of exploration and no
 * stance gets its 종합 question.
 */
export function recommendQuestions(
  answers: Record<string, Answer>,
  overall: OverallScore,
  opts: RecommendOptions = {},
): Recommendation[] {
  const limit = opts.limit ?? 5
  const now = opts.now ?? Date.now()
  const byDomain = Object.fromEntries(overall.domains.map((d) => [d.domainId, d]))
  const candidates: Recommendation[] = []

  for (const q of QUESTIONS) {
    if (opts.domainId && q.domainId !== opts.domainId) continue
    const a = answers[q.id]
    if (a && isAnswered(a)) continue
    const prereqsOk = (q.prereqIds ?? []).every((p) => isAnswered(answers[p]))
    if (!prereqsOk) continue

    const ds = byDomain[q.domainId]
    const domain = DOMAIN_MAP[q.domainId]
    let score = 0
    let kind: RecommendationKind = 'next'
    const reasons: string[] = []

    if (a && (a.text ?? '').trim().length > 0) {
      score += 2.5
      kind = 'continue'
      reasons.push('쓰다 만 답이 있어요. 이어서 써보세요.')
    }

    if (ds.answered === 0) {
      if (domain.core) {
        score += 2.5
        kind = 'start'
        reasons.push(`핵심 영역 ‘${domain.name}’은 아직 시작 전이에요. 경험 질문부터 가볍게 시작해보세요.`)
      } else {
        score += 1
        reasons.push(`‘${domain.name}’ 영역은 아직 비어 있어요.`)
      }
    }

    if (ds.nextLevel !== null) {
      if (q.level === ds.nextLevel) {
        score += 4
        if (ds.answered > 0) reasons.push(`‘${domain.name}’에서 다음 단계(${levelName(q.level)})로 올라갈 차례예요.`)
      } else if (q.level < ds.nextLevel) {
        score += 1
      } else {
        score -= 3
      }
    } else {
      score += 1
    }

    score += 3 * (1 - ds.score / 100)

    if (ds.lastActivity && daysBetween(ds.lastActivity, now) <= 7 && ds.answered > 0) {
      score += 1.5
      if (reasons.length === 0) reasons.push(`최근 ‘${domain.name}’을 탐구 중이니 흐름을 이어가기 좋아요.`)
    }

    if (ds.status === 'foreclosure' && (q.kind === 'contrast' || q.kind === 'thought-experiment')) {
      score += 3
      kind = 'contrast'
      reasons.unshift(`‘${domain.name}’에는 입장이 있지만 다른 관점과 아직 맞붙어 보지 않았어요.`)
    }
    if (ds.status === 'moratorium' && q.kind === 'synthesis') {
      score += 3
      kind = 'synthesize'
      reasons.unshift(`‘${domain.name}’에서 여러 관점을 살펴봤으니 이제 입장을 한 문장으로 정리해볼 때예요.`)
    }
    if (ds.answered > 0 && ds.depth < 0.4 && q.kind === 'experience') {
      score += 1
      kind = kind === 'next' ? 'deepen' : kind
      reasons.push('구체적인 장면을 더 모으면 답에 깊이가 생겨요.')
    }
    if (ds.answered > 0 && ds.exploration < 0.3 && q.level >= 3) {
      score += 0.5
      if (kind === 'next') kind = 'explore'
    }

    if (reasons.length === 0) reasons.push(`‘${domain.name}’ 영역을 넓혀줄 질문이에요.`)
    candidates.push({ question: q, score, kind, reasons })
  }

  candidates.sort((x, y) => y.score - x.score)

  // Diversify across domains: a domain already picked pays a penalty.
  const picked: Recommendation[] = []
  const usedDomains = new Map<string, number>()
  const pool = [...candidates]
  while (picked.length < limit && pool.length > 0) {
    let bestIdx = 0
    let bestScore = -Infinity
    for (let i = 0; i < pool.length; i++) {
      const c = pool[i]
      const penalty = opts.domainId ? 0 : 2.5 * (usedDomains.get(c.question.domainId) ?? 0)
      const s = c.score - penalty
      if (s > bestScore) {
        bestScore = s
        bestIdx = i
      }
    }
    const [chosen] = pool.splice(bestIdx, 1)
    picked.push(chosen)
    usedDomains.set(chosen.question.domainId, (usedDomains.get(chosen.question.domainId) ?? 0) + 1)
  }
  return picked
}

export interface RevisitSuggestion {
  answer: Answer
  question: Question
  reason: string
  daysAgo: number
}

/** Answers worth re-reading: old stances, scheduled revisits, and AI-detected tensions. */
export function revisitSuggestions(answers: Record<string, Answer>, now = Date.now(), limit = 4): RevisitSuggestion[] {
  const out: RevisitSuggestion[] = []
  for (const a of Object.values(answers)) {
    const q = QUESTION_MAP[a.questionId]
    if (!q || !isAnswered(a)) continue
    const daysAgo = daysBetween(a.updatedAt, now)
    if (a.revisitAt && new Date(a.revisitAt).getTime() <= now) {
      out.push({ answer: a, question: q, reason: '다시 읽기로 정한 날짜가 됐어요.', daysAgo })
      continue
    }
    if (a.reflection && a.reflection.tensions.length > 0 && daysAgo >= 3) {
      out.push({ answer: a, question: q, reason: '다른 답과의 긴장이 발견된 답이에요. 지금은 어떻게 보이나요?', daysAgo })
      continue
    }
    if (a.stance && daysAgo >= 30) {
      out.push({ answer: a, question: q, reason: `${daysAgo}일 전의 입장이에요. 지금도 동의하나요?`, daysAgo })
    }
  }
  out.sort((x, y) => y.daysAgo - x.daysAgo)
  return out.slice(0, limit)
}

function levelName(level: number): string {
  return ({ 1: '경험', 2: '정의', 3: '대조', 4: '종합' } as Record<number, string>)[level] ?? String(level)
}
