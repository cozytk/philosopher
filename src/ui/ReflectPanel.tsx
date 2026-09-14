import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import type { Answer, Lens, Question } from '@/types'
import { LENS_MAP, QUESTION_MAP, DOMAIN_MAP } from '@/content'
import { useLlm } from '@/hooks/useLlm'
import { useStore } from '@/store/useStore'
import { reflectOnAnswer, dialogueTurn } from '@/llm/features'
import { buildReflectMessages, buildDialogueMessages, type RelatedStance } from '@/llm/prompts'
import { answerInputHash } from '@/engine/scoring'
import { estimateTokens } from '@/lib/text'
import { estimateCostUsd, formatUsd } from '@/llm/cost'
import { nowIso, formatDate } from '@/lib/dates'
import { Icon } from './icons'
import { Bar, Spinner, Tag } from './primitives'
import { LensCard } from './LensCard'

const EMPTY_MESSAGES: never[] = []

const QTYPE: Record<string, string> = {
  clarify: '명료화',
  assumption: '전제',
  evidence: '근거',
  perspective: '관점',
  implication: '함의',
  meta: '질문 자체',
}

export function ReflectPanel({
  question,
  answer,
  candidates,
  onInsert,
  onToggleLens,
}: {
  question: Question
  answer: Answer
  candidates: Lens[]
  onInsert: (text: string) => void
  onToggleLens: (lensId: string) => void
}) {
  const { run, busy, configured, price, llm } = useLlm()
  const setReflection = useStore((s) => s.setReflection)
  const answers = useStore((s) => s.answers)
  const dialogues = useStore((s) => s.dialogues)
  const addDialogueMessage = useStore((s) => s.addDialogueMessage)
  const replaceLastAssistant = useStore((s) => s.replaceLastAssistant)
  const clearDialogue = useStore((s) => s.clearDialogue)
  const [draft, setDraft] = useState('')
  const [streaming, setStreaming] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const related: RelatedStance[] = useMemo(
    () =>
      Object.values(answers)
        .filter((a) => a.questionId !== question.id && a.stance && a.stance.trim().length >= 8)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, 8)
        .map((a) => ({ questionId: a.questionId, title: QUESTION_MAP[a.questionId]?.title ?? a.questionId, stance: a.stance! })),
    [answers, question.id],
  )

  const currentHash = answerInputHash(answer)
  const reflection = answer.reflection
  const fresh = reflection?.inputHash === currentHash
  const enoughText = (answer.text ?? '').replace(/\s+/g, '').length >= 60

  const reflectEstimate = useMemo(() => {
    const msgs = buildReflectMessages({ question, answer, candidates, related })
    const tokens = estimateTokens(msgs.map((m) => m.content).join('\n'))
    return { tokens, cost: estimateCostUsd(price, tokens, 2400) }
  }, [question, answer, candidates, related, price])

  const messages = useMemo(() => dialogues[question.id] ?? EMPTY_MESSAGES, [dialogues, question.id])

  async function doReflect() {
    const data = await run('reflect', (config, p) => reflectOnAnswer(config, { question, answer, candidates, related }, p))
    if (data) setReflection(question.id, data)
  }

  async function send(textIn?: string) {
    const text = (textIn ?? draft).trim()
    if (!text || busy) return
    setDraft('')
    addDialogueMessage(question.id, { role: 'user', content: text, at: nowIso() })
    addDialogueMessage(question.id, { role: 'assistant', content: '', at: nowIso() })
    setStreaming('')
    let acc = ''
    const history = messages.map((m) => ({ role: m.role, content: m.content }))
    const data = await run('dialogue', (config, p) =>
      dialogueTurn(config, { question, answer, candidates, history, userMessage: text }, (t) => {
        acc += t
        setStreaming(acc)
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
      }, p),
    )
    replaceLastAssistant(question.id, data ?? (acc || '(응답을 받지 못했어요. 다시 시도해주세요.)'))
    setStreaming(null)
  }

  const dialogueEstimate = useMemo(() => {
    const msgs = buildDialogueMessages({ question, answer, candidates, history: messages.map((m) => ({ role: m.role, content: m.content })), userMessage: draft || '…' })
    const tokens = estimateTokens(msgs.map((m) => m.content).join('\n'))
    return estimateCostUsd(price, tokens, 800)
  }, [question, answer, candidates, messages, draft, price])

  if (!configured) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-dashed border-line px-4 py-6 text-sm">
        <div className="font-serif text-base">AI 성찰은 선택 사항이에요</div>
        <p className="text-ink-2">
          당신의 키로 모델을 연결하면, 글을 읽고 숨은 전제를 짚어주고, 다른 답과의 긴장을 찾고, 서재의 관점 중 지금 도움이 될 것을 골라줍니다. 호출은 버튼을 누를 때만 일어나고, 한 번에 보통 수 원 이하예요.
        </p>
        <Link to="/settings" className="btn-primary self-start">
          <Icon name="settings" size={15} /> AI 연결하기
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-medium">성찰 받기</div>
            <div className="text-[11px] text-ink-3">
              {fresh ? `최신 (${formatDate(reflection!.at, true)})` : reflection ? '글이 바뀌었어요 — 다시 받을 수 있어요' : '한 번의 호출로 전제·질문·긴장·관점을 받아요'}
              {' · '}예상 ≤ {formatUsd(reflectEstimate.cost)}
              {busy === 'reflect' ? ' · 읽는 중이에요. 추론 모델은 1~2분 걸리기도 해요.' : ''}
            </div>
          </div>
          <button type="button" className="btn-primary" onClick={doReflect} disabled={busy !== null || fresh || !enoughText} title={!enoughText ? '먼저 글을 조금 더 써주세요 (60자 이상)' : ''}>
            {busy === 'reflect' ? <Spinner size={14} /> : <Icon name="sparkles" size={15} />} {fresh ? '최신' : reflection ? '다시 받기' : '성찰 받기'}
          </button>
        </div>

        {reflection && (
          <div className={'rise flex flex-col gap-3 rounded-lg border border-line bg-paper-2 p-3 ' + (fresh ? '' : 'opacity-80')}>
            {reflection.summary && <p className="font-serif text-[15px] leading-relaxed">{reflection.summary}</p>}
            {reflection.strengths.length > 0 && (
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-good">잘 된 점</div>
                <ul className="list-disc pl-4 text-xs leading-relaxed text-ink-2">{reflection.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            )}
            {reflection.assumptions.length > 0 && (
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-warn">숨은 전제</div>
                <ul className="list-disc pl-4 text-xs leading-relaxed text-ink-2">{reflection.assumptions.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            )}
            {reflection.questions.length > 0 && (
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-accent-ink">다음 생각을 여는 질문</div>
                <ul className="flex flex-col gap-1.5">
                  {reflection.questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-md bg-paper-3/60 px-2.5 py-1.5">
                      <Tag>{QTYPE[q.type] ?? q.type}</Tag>
                      <span className="flex-1 font-serif text-[13px] leading-relaxed">{q.q}</span>
                      <button type="button" className="btn-ghost shrink-0 px-1.5 py-0.5 text-[11px]" onClick={() => onInsert(`\n\n▸ ${q.q}\n`)} title="글에 넣기">
                        <Icon name="plus" size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {reflection.tensions.length > 0 && (
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-bad">다른 답과의 긴장</div>
                <ul className="flex flex-col gap-1">
                  {reflection.tensions.map((t, i) => {
                    const q = QUESTION_MAP[t.questionId]
                    return (
                      <li key={i} className="text-xs leading-relaxed text-ink-2">
                        {t.note}{' '}
                        {q && (
                          <Link to={`/q/${q.id}`} className="text-accent-ink underline decoration-line-2 underline-offset-2">
                            ({DOMAIN_MAP[q.domainId]?.name} · {q.title.slice(0, 24)}…)
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {reflection.lenses.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="text-[11px] font-medium uppercase tracking-wide text-lens-ink">지금 도움이 될 관점</div>
                {reflection.lenses.map((l) => {
                  const lens = LENS_MAP[l.id]
                  if (!lens) return null
                  return <LensCard key={l.id} lens={lens} reason={l.why} linked={answer.linkedLensIds.includes(l.id)} onToggle={() => onToggleLens(l.id)} onInsert={onInsert} />
                })}
              </div>
            )}
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">루브릭 (0–3)</div>
              <div className="grid grid-cols-5 gap-2">
                {(
                  [
                    ['명료', reflection.rubric.clarity],
                    ['근거', reflection.rubric.reasons],
                    ['경험', reflection.rubric.lived],
                    ['대안', reflection.rubric.alternatives],
                    ['통합', reflection.rubric.integration],
                  ] as [string, number][]
                ).map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] text-ink-3"><span>{k}</span><span>{v}</span></div>
                    <Bar value={v} max={3} height={4} />
                  </div>
                ))}
              </div>
            </div>
            {reflection.nextStep && (
              <div className="rounded-md border border-accent/30 bg-accent-soft/50 px-2.5 py-2 text-xs leading-relaxed text-accent-ink">
                <span className="font-medium">다음 한 걸음 · </span>
                {reflection.nextStep}
              </div>
            )}
            <div className="text-[10px] text-ink-4">{reflection.model}</div>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-2 border-t border-line pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">소크라테스식 대화</div>
            <div className="text-[11px] text-ink-3">한 번에 질문 하나씩 · 턴당 예상 ≤ {formatUsd(dialogueEstimate)}</div>
          </div>
          {messages.length > 0 && (
            <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => clearDialogue(question.id)}>
              <Icon name="trash" size={13} /> 비우기
            </button>
          )}
        </div>
        <div ref={listRef} className="scroll-thin flex max-h-80 flex-col gap-2 overflow-y-auto rounded-lg border border-line bg-paper-3/40 p-2">
          {messages.length === 0 && <div className="px-2 py-6 text-center text-xs text-ink-4">막힌 곳에서 시작해보세요. “행복과 만족이 어떻게 다른지 모르겠어요” 같은 말이면 충분해요.</div>}
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1
            const content = isLast && m.role === 'assistant' && streaming !== null ? streaming : m.content
            return (
              <div key={i} className={'max-w-[92%] rounded-lg px-3 py-2 text-[13px] leading-relaxed ' + (m.role === 'user' ? 'self-end bg-accent-soft text-ink' : 'self-start bg-paper-2 text-ink')}>
                {content || (isLast && streaming !== null ? <Spinner size={12} /> : '')}
              </div>
            )
          })}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            void send()
          }}
        >
          <input className="input" placeholder="생각을 적거나 막힌 곳을 말해보세요…" value={draft} onChange={(e) => setDraft(e.target.value)} disabled={busy !== null} />
          <button type="submit" className="btn-primary shrink-0" disabled={busy !== null || !draft.trim()}>
            {busy === 'dialogue' ? <Spinner size={14} /> : <Icon name="chat" size={15} />}
          </button>
        </form>
        <div className="flex flex-wrap gap-1.5">
          {['지금까지 정리해줘', '반대 입장에서 물어봐줘', '내 말 중 모호한 단어를 짚어줘'].map((s) => (
            <button key={s} type="button" className="chip cursor-pointer hover:border-line-2" onClick={() => void send(s)} disabled={busy !== null}>
              {s}
            </button>
          ))}
        </div>
        <div className="text-[10px] text-ink-4">모델: {llm.model}</div>
      </section>
    </div>
  )
}
