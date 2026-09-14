import { describe, expect, it } from 'vitest'
import type { ProviderConfig } from '@/types'
import { QUESTION_MAP, lensesForQuestion } from '@/content'
import { reflectOnAnswer, dialogueTurn, synthesizePhilosophy } from './features'
import { fetchModels } from './models'

/**
 * Live check against OpenRouter. Skipped unless OPENROUTER_API_KEY is set.
 * Run locally:  OPENROUTER_API_KEY=… OPENROUTER_MODEL=… npx vitest run src/llm/live.test.ts
 * Or dispatch the "LLM live check" workflow on GitHub.
 */
const KEY = process.env.OPENROUTER_API_KEY
const MODEL = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-v4.1-flash'
const live = KEY ? describe : describe.skip

const TEXT =
  '예를 들어 지난주 토요일 아침에 친구와 한강을 걸었을 때 나는 행복했다. 왜냐하면 아무것도 증명할 필요가 없었기 때문이다. ' +
  '하지만 회사에서 인정받았을 때의 기쁨은 금방 사라졌다. 아마도 그것은 비교에서 온 기쁨이었던 것 같다.\n\n' +
  '그래서 나는 행복이 성취보다 관계와 현재에 있다고 생각한다. 에피쿠로스가 말한 평정이 내가 원하는 것일지도 모르겠다. 정말 그런가?'

live('live OpenRouter check', () => {
  const cfg: ProviderConfig = { provider: 'openrouter', apiKey: KEY, model: MODEL }
  const question = QUESTION_MAP['hap-moments']
  const now = new Date().toISOString()
  const answer = {
    questionId: question.id,
    text: TEXT,
    stance: '행복은 증명할 필요가 없는 시간에 온다',
    confidence: 60,
    openQuestions: [],
    linkedLensIds: [],
    status: 'answered' as const,
    createdAt: now,
    updatedAt: now,
    versions: [],
  }
  const candidates = lensesForQuestion(question.id)

  it('lists the configured model in the catalog', async () => {
    const list = await fetchModels(cfg)
    const hit = list.find((m) => m.id === MODEL)
    console.log(`catalog: ${list.length} models; ${MODEL}: ${hit ? `found, $${hit.price?.prompt}/$${hit.price?.completion} per 1M` : 'NOT FOUND'}`)
    expect(hit).toBeDefined()
  }, 60_000)

  it('reflect returns structured JSON', async () => {
    const res = await reflectOnAnswer(cfg, { question, answer, candidates, related: [{ questionId: 'joy-lost-time', title: '몰입', stance: '나는 결과가 바로 보이는 일을 할 때 즐겁다' }] })
    console.log('reflect:', JSON.stringify({ summary: res.data.summary, questions: res.data.questions.length, lenses: res.data.lenses, tensions: res.data.tensions.length, rubric: res.data.rubric, usage: res.usage, model: res.model }, null, 1))
    expect(res.data.summary.length).toBeGreaterThan(0)
    expect(res.data.questions.length).toBeGreaterThanOrEqual(3)
    expect(res.usage.promptTokens).toBeGreaterThan(0)
  }, 180_000)

  it('dialogue streams a short reply', async () => {
    let streamed = ''
    const res = await dialogueTurn(cfg, { question, answer, candidates, history: [], userMessage: '행복과 만족이 어떻게 다른지 모르겠어요.' }, (t) => (streamed += t))
    console.log('dialogue:', res.data.slice(0, 200), '| streamed chars:', streamed.length, '| usage:', res.usage)
    expect(res.data.length).toBeGreaterThan(0)
    expect(streamed.length).toBeGreaterThan(0)
  }, 180_000)

  it('synthesizes a philosophy draft in markdown', async () => {
    const res = await synthesizePhilosophy(cfg, {
      entries: [
        { domain: '행복', title: question.title, stance: answer.stance, confidence: 60, openQuestions: [], excerpt: TEXT.slice(0, 200) },
        { domain: '즐거움과 몰입', title: '몰입', stance: '나는 결과가 바로 보이는 일을 할 때 즐겁다', confidence: 75, openQuestions: ['혼자일 때만 그런가?'], excerpt: '' },
        { domain: '일과 소명', title: '일', stance: '내 일은 경력이지만 잘 만들 때는 소명이 된다', confidence: 60, openQuestions: [], excerpt: '' },
      ],
      values: ['자유', '우정', '장인정신'],
    })
    console.log('synthesis:', res.data.length, 'chars; starts with:', res.data.slice(0, 80).replace(/\n/g, ' '), '| usage:', res.usage)
    expect(res.data).toContain('#')
    expect(res.data.length).toBeGreaterThan(300)
  }, 240_000)
})
