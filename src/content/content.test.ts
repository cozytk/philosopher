import { describe, expect, it } from 'vitest'
import { DOMAINS, LENSES, LENS_MAP, QUESTIONS, QUESTION_MAP, SCALES, VALUE_CARDS, scoreScale } from './index'

describe('content integrity', () => {
  it('has unique ids everywhere', () => {
    const ids = (xs: { id: string }[]) => xs.map((x) => x.id)
    for (const list of [DOMAINS, QUESTIONS, LENSES, VALUE_CARDS, SCALES]) {
      expect(new Set(ids(list)).size).toBe(list.length)
    }
  })

  it('questions reference existing domains, lenses and prerequisites', () => {
    const domainIds = new Set(DOMAINS.map((d) => d.id))
    for (const q of QUESTIONS) {
      expect(domainIds.has(q.domainId), `${q.id} domain`).toBe(true)
      expect(q.lensIds.length, `${q.id} lenses`).toBeGreaterThan(0)
      for (const l of q.lensIds) expect(LENS_MAP[l], `${q.id} → lens ${l}`).toBeDefined()
      for (const p of q.prereqIds ?? []) {
        const pq = QUESTION_MAP[p]
        expect(pq, `${q.id} → prereq ${p}`).toBeDefined()
        expect(pq.domainId).toBe(q.domainId)
        expect(pq.level).toBeLessThanOrEqual(q.level)
      }
      expect(q.cues.length).toBeGreaterThanOrEqual(3)
      expect(q.minutes).toBeGreaterThan(0)
    }
  })

  it('every domain has all four levels and a synthesis question with prerequisites', () => {
    for (const d of DOMAINS) {
      const qs = QUESTIONS.filter((q) => q.domainId === d.id)
      for (const level of [1, 2, 3, 4]) {
        expect(qs.some((q) => q.level === level), `${d.id} level ${level}`).toBe(true)
      }
      const synth = qs.filter((q) => q.level === 4)
      for (const s of synth) expect((s.prereqIds ?? []).length, `${s.id} prereqs`).toBeGreaterThan(0)
    }
  })

  it('every lens is used by at least one question and contrasts point to real lenses', () => {
    for (const l of LENSES) {
      expect(l.questionIds.length, `${l.id} unused`).toBeGreaterThan(0)
      expect(l.sources.length, `${l.id} sources`).toBeGreaterThan(0)
      for (const c of l.contrastsWith ?? []) expect(LENS_MAP[c], `${l.id} contrasts ${c}`).toBeDefined()
    }
  })

  it('scales score to 0–100 and handle reverse items', () => {
    const swls = SCALES.find((s) => s.id === 'swls')!
    const max = Object.fromEntries(swls.items.map((i) => [i.id, swls.points]))
    expect(scoreScale(swls, max).satisfaction).toBe(100)
    const scc = SCALES.find((s) => s.id === 'scc')!
    const allHigh = Object.fromEntries(scc.items.map((i) => [i.id, scc.points]))
    // 6 reverse items at max → 0, 4 direct items at max → 100 → mean 40
    expect(scoreScale(scc, allHigh).clarity).toBe(40)
    for (const s of SCALES) for (const item of s.items) expect(s.subscales.some((sub) => sub.id === item.subscale)).toBe(true)
  })
})
