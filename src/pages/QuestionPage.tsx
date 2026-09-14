import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router'
import { DOMAIN_MAP, LEVEL_LABELS, QUESTION_MAP, QUESTIONS } from '@/content'
import { useStore } from '@/store/useStore'
import { retrieveLenses } from '@/engine/retrieval'
import { hasCrisisLanguage } from '@/engine/signals'
import { isAnswered } from '@/engine/scoring'
import { countChars } from '@/lib/text'
import { formatDate } from '@/lib/dates'
import { Icon } from '@/ui/icons'
import { Segmented, Tag } from '@/ui/primitives'
import { LensCard } from '@/ui/LensCard'
import { ReflectPanel } from '@/ui/ReflectPanel'
import { HistoryPanel } from '@/ui/HistoryPanel'
import { useToast } from '@/ui/toast'
import type { Answer, AnswerStatus } from '@/types'

type PanelTab = 'lenses' | 'ai' | 'history' | 'links'

export default function QuestionPage() {
  const { questionId = '' } = useParams()
  const question = QUESTION_MAP[questionId]
  if (!question) return <Navigate to="/questions" replace />
  return <Workspace key={questionId} questionId={questionId} />
}

function Workspace({ questionId }: { questionId: string }) {
  const question = QUESTION_MAP[questionId]
  const domain = DOMAIN_MAP[question.domainId]
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const focus = params.get('focus') === '1'
  const toast = useToast()

  const stored = useStore((s) => s.answers[questionId])
  const allAnswers = useStore((s) => s.answers)
  const saveAnswer = useStore((s) => s.saveAnswer)
  const setAnswerStatus = useStore((s) => s.setAnswerStatus)
  const toggleLens = useStore((s) => s.toggleLens)
  const saveVersion = useStore((s) => s.saveVersion)
  const recordSnapshot = useStore((s) => s.recordSnapshot)
  const showTips = useStore((s) => s.settings.showTips)
  const timerMinutes = useStore((s) => s.settings.timerMinutes)

  const [text, setText] = useState(stored?.text ?? '')
  const [stance, setStance] = useState(stored?.stance ?? '')
  const [confidence, setConfidence] = useState(stored?.confidence ?? 50)
  const [openQ, setOpenQ] = useState('')
  const [tab, setTab] = useState<PanelTab>('lenses')
  const [remaining, setRemaining] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Debounced autosave of text / stance / confidence.
  useEffect(() => {
    const same = text === (stored?.text ?? '') && stance === (stored?.stance ?? '') && confidence === (stored?.confidence ?? 50)
    if (same) return
    const t = window.setTimeout(() => {
      saveAnswer(questionId, { text, stance: stance || undefined, confidence })
      recordSnapshot()
    }, 600)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, stance, confidence])

  // Autosize the editor.
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(224, el.scrollHeight)}px`
  }, [text, focus])

  // Focus timer. At zero it stays at 00:00 (toast once) until the reader dismisses it.
  useEffect(() => {
    if (remaining === null) return
    if (remaining === 0) {
      toast('시간이 됐어요. 여기서 멈춰도 충분합니다.', 'success')
      return
    }
    const t = window.setTimeout(() => setRemaining((r) => (r === null ? null : Math.max(0, r - 1))), 1000)
    return () => window.clearTimeout(t)
  }, [remaining, toast])

  const insert = useCallback((snippet: string) => {
    setText((prev) => (prev.endsWith('\n') || prev.length === 0 ? prev + snippet : prev + '\n' + snippet))
    window.setTimeout(() => textareaRef.current?.focus(), 0)
  }, [])

  const answer: Answer = useMemo(
    () => ({
      questionId,
      text,
      stance: stance || undefined,
      confidence,
      openQuestions: stored?.openQuestions ?? [],
      linkedLensIds: stored?.linkedLensIds ?? [],
      status: stored?.status ?? 'draft',
      createdAt: stored?.createdAt ?? new Date().toISOString(),
      updatedAt: stored?.updatedAt ?? new Date().toISOString(),
      versions: stored?.versions ?? [],
      reflection: stored?.reflection,
      revisitAt: stored?.revisitAt,
    }),
    [questionId, text, stance, confidence, stored],
  )

  const suggestions = useMemo(() => retrieveLenses(question, text, answer.linkedLensIds, 6), [question, text, answer.linkedLensIds])
  const candidates = useMemo(() => suggestions.map((s) => s.lens), [suggestions])
  const crisis = useMemo(() => hasCrisisLanguage(text), [text])
  const chars = countChars(text)

  const related = useMemo(() => {
    const sameDomain = QUESTIONS.filter((q) => q.domainId === question.domainId && q.id !== question.id)
    const prereqs = (question.prereqIds ?? []).map((id) => QUESTION_MAP[id]).filter(Boolean)
    const nextInDomain = sameDomain.filter((q) => q.level === question.level + 1).slice(0, 2)
    const sharedLens = QUESTIONS.filter((q) => q.id !== question.id && q.domainId !== question.domainId && q.lensIds.some((l) => question.lensIds.includes(l))).slice(0, 4)
    return { prereqs, nextInDomain, sharedLens }
  }, [question])

  const toolLink = question.domainId === 'joy' ? { to: '/tools/joy', label: '즐거움 기록' } : question.domainId === 'values' ? { to: '/tools/values', label: '가치 카드 정렬' } : question.domainId === 'meaning' || question.domainId === 'identity' || question.domainId === 'suffering' || question.domainId === 'happiness' ? { to: '/tools/checkin', label: '자기 점검' } : null

  function addOpenQuestion() {
    const q = openQ.trim()
    if (!q) return
    saveAnswer(questionId, { openQuestions: [...(stored?.openQuestions ?? []), q].slice(0, 10) })
    setOpenQ('')
  }
  function removeOpenQuestion(i: number) {
    const list = [...(stored?.openQuestions ?? [])]
    list.splice(i, 1)
    saveAnswer(questionId, { openQuestions: list })
  }
  function setRevisit(days: number | null) {
    saveAnswer(questionId, { revisitAt: days === null ? undefined : new Date(Date.now() + days * 86400000).toISOString() })
    if (days !== null) setAnswerStatus(questionId, 'revisit')
    toast(days === null ? '다시 읽기 예약을 지웠어요.' : `${days}일 뒤에 다시 읽도록 표시했어요.`, 'success')
  }

  const mm = remaining !== null ? String(Math.floor(remaining / 60)).padStart(2, '0') : null
  const ss = remaining !== null ? String(remaining % 60).padStart(2, '0') : null

  const panel = (
    <div className="flex flex-col gap-3">
      <Segmented
        value={tab}
        onChange={setTab}
        options={[
          { value: 'lenses', label: '관점' },
          { value: 'ai', label: 'AI' },
          { value: 'history', label: '기록' },
          { value: 'links', label: '연결' },
        ]}
        size="md"
      />
      {tab === 'lenses' && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] leading-relaxed text-ink-3">다른 방면에서 보기. 당신의 글에 맞춰 고른 관점이에요. ‘연결’하면 다양성 점수에 반영되고, 질문을 글에 넣어 답해볼 수도 있어요.</p>
          {suggestions.map((s) => (
            <LensCard key={s.lens.id} lens={s.lens} reason={s.reason} linked={answer.linkedLensIds.includes(s.lens.id)} onToggle={() => toggleLens(questionId, s.lens.id)} onInsert={insert} />
          ))}
        </div>
      )}
      {tab === 'ai' && <ReflectPanel question={question} answer={answer} candidates={candidates} onInsert={insert} onToggleLens={(id) => toggleLens(questionId, id)} />}
      {tab === 'history' && (
        <HistoryPanel
          answer={stored}
          onSaveVersion={() => {
            saveAnswer(questionId, { text, stance: stance || undefined, confidence })
            window.setTimeout(() => {
              saveVersion(questionId)
              toast('버전을 저장했어요.', 'success')
            }, 50)
          }}
          onRestore={(t, s, c) => {
            setText(t)
            setStance(s ?? '')
            if (typeof c === 'number') setConfidence(c)
            toast('되돌렸어요. 자동 저장됩니다.', 'success')
          }}
        />
      )}
      {tab === 'links' && (
        <div className="flex flex-col gap-4 text-sm">
          {related.prereqs.length > 0 && (
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">먼저 답하면 좋은 질문</div>
              {related.prereqs.map((q) => (
                <Link key={q.id} to={`/q/${q.id}`} className="block rounded-md px-2 py-1.5 font-serif text-[14px] hover:bg-paper-3">
                  <span className={'mr-2 ' + (isAnswered(allAnswers[q.id]) ? 'text-good' : 'text-ink-4')}>{isAnswered(allAnswers[q.id]) ? '●' : '○'}</span>
                  {q.title}
                </Link>
              ))}
            </div>
          )}
          {related.nextInDomain.length > 0 && (
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">다음 단계</div>
              {related.nextInDomain.map((q) => (
                <Link key={q.id} to={`/q/${q.id}`} className="block rounded-md px-2 py-1.5 font-serif text-[14px] hover:bg-paper-3">{q.title}</Link>
              ))}
            </div>
          )}
          {related.sharedLens.length > 0 && (
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">같은 관점을 나누는 다른 영역의 질문</div>
              {related.sharedLens.map((q) => (
                <Link key={q.id} to={`/q/${q.id}`} className="block rounded-md px-2 py-1.5 font-serif text-[14px] hover:bg-paper-3">
                  <span className="mr-2 text-ink-3">{DOMAIN_MAP[q.domainId]?.glyph}</span>{q.title}
                </Link>
              ))}
            </div>
          )}
          {toolLink && (
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">도구</div>
              <Link to={toolLink.to} className="btn-secondary">
                <Icon name="tools" size={14} /> {toolLink.label}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className={focus ? 'mx-auto max-w-3xl px-4 py-6 md:py-10' : ''}>
      <div className="mb-4 flex items-center justify-between gap-2 text-sm text-ink-3">
        <Link to={`/questions/${domain.id}`} className="inline-flex items-center gap-1 hover:text-ink">
          <Icon name="chevron-left" size={16} /> {domain.name}
        </Link>
        <div className="flex items-center gap-2">
          {mm !== null ? (
            <button type="button" className={'px-2 py-1 text-xs tabular-nums ' + (remaining === 0 ? 'btn-primary' : 'btn-secondary')} onClick={() => setRemaining(null)} title={remaining === 0 ? '타이머 닫기' : '타이머 멈추기'}>
              <Icon name="clock" size={13} /> {remaining === 0 ? '끝' : `${mm}:${ss}`}
            </button>
          ) : (
            <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => setRemaining(timerMinutes * 60)} title="시간을 정해두고 쓰면 반추를 막아줍니다">
              <Icon name="clock" size={13} /> {timerMinutes}분
            </button>
          )}
          <button
            type="button"
            className="btn-ghost px-2 py-1 text-xs"
            onClick={() => {
              const next = new URLSearchParams(params)
              if (focus) next.delete('focus')
              else next.set('focus', '1')
              setParams(next, { replace: true })
            }}
          >
            <Icon name="focus" size={13} /> {focus ? '집중 모드 끄기' : '집중 모드'}
          </button>
        </div>
      </div>

      <div className={focus ? '' : 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]'}>
        <div className="flex min-w-0 flex-col gap-5">
          <header className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
              <Tag>{LEVEL_LABELS[question.level].name} {question.level}/4</Tag>
              <span>약 {question.minutes}분</span>
              {stored && isAnswered(stored) && <span>· 마지막 {formatDate(stored.updatedAt, true)}</span>}
            </div>
            <h1 className="h-serif text-xl leading-snug md:text-2xl">{question.title}</h1>
            <p className="text-sm leading-relaxed text-ink-2">{question.why}</p>
            {question.caution && (
              <p className="rounded-md border border-warn/30 bg-warn-soft/60 px-3 py-2 text-xs leading-relaxed text-ink-2">
                <Icon name="info" size={13} className="mr-1 inline" /> {question.caution}
              </p>
            )}
          </header>

          {showTips && (
            <div className="flex flex-wrap gap-1.5">
              {question.cues.map((c) => (
                <button key={c} type="button" onClick={() => insert(`\n\n▸ ${c}\n`)} className="chip cursor-pointer text-left hover:border-accent/50 hover:text-ink" title="글에 넣기">
                  <Icon name="plus" size={12} /> {c}
                </button>
              ))}
            </div>
          )}

          <div className="card px-4 py-3 md:px-6 md:py-5">
            <textarea
              ref={textareaRef}
              className="editor"
              placeholder="여기에 쓰세요. 잘 쓸 필요 없고, 정직하면 됩니다. ‘왜’보다 ‘무엇이 있었나’로 시작해보세요."
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
            />
            <div className="mt-2 flex items-center justify-between text-[11px] text-ink-4">
              <span>{chars.toLocaleString('ko-KR')}자{chars > 0 && chars < 80 ? ' · 80자부터 “답함”으로 셉니다' : ''}</span>
              <span>자동 저장</span>
            </div>
          </div>

          {crisis && (
            <div className="rounded-[var(--radius-card)] border border-bad/30 bg-bad-soft/60 px-4 py-3 text-sm leading-relaxed text-ink">
              지금 많이 힘드신 것 같아요. 이 작업실은 혼자 견디라고 만든 곳이 아닙니다. 지금 이야기를 들어줄 사람이 있어요: <strong>자살예방상담전화 109</strong> (24시간), <strong>정신건강위기상담 1577-0199</strong>. 글은 언제든 멈춰도 됩니다.
            </div>
          )}

          <section className="card flex flex-col gap-4 p-4 md:p-5">
            <div>
              <label className="label" htmlFor="stance">지금 나의 입장 — 한 문장</label>
              <input id="stance" className="input font-serif text-[15px]" placeholder={question.level >= 4 ? '예: 행복은 ___이며, ___는 행복이 아니다.' : '아직 확실하지 않아도 지금의 가설을 적어보세요.'} value={stance} onChange={(e) => setStance(e.target.value)} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="label" htmlFor="conf">확신도 · {confidence}</label>
                <input id="conf" type="range" min={0} max={100} step={5} value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
                <div className="flex justify-between text-[10px] text-ink-4"><span>가설</span><span>확신</span></div>
              </div>
              <div>
                <label className="label">상태</label>
                <Segmented<AnswerStatus>
                  value={stored?.status ?? 'draft'}
                  onChange={(v) => setAnswerStatus(questionId, v)}
                  options={[
                    { value: 'draft', label: '작성 중' },
                    { value: 'answered', label: '답함' },
                    { value: 'settled', label: '정리됨' },
                    { value: 'revisit', label: '다시 볼 것' },
                  ]}
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="openq">아직 열린 질문</label>
              <div className="flex gap-2">
                <input
                  id="openq"
                  className="input"
                  placeholder="답하면서 새로 생긴 질문을 남겨두세요"
                  value={openQ}
                  onChange={(e) => setOpenQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addOpenQuestion()
                    }
                  }}
                />
                <button type="button" className="btn-secondary shrink-0" onClick={addOpenQuestion}>
                  <Icon name="plus" size={14} />
                </button>
              </div>
              {(stored?.openQuestions ?? []).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(stored?.openQuestions ?? []).map((q, i) => (
                    <span key={i} className="chip">
                      {q}
                      <button type="button" onClick={() => removeOpenQuestion(i)} aria-label="삭제" className="ml-1 text-ink-4 hover:text-ink">
                        <Icon name="x" size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
              <span>다시 읽기:</span>
              <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => setRevisit(30)}>30일 뒤</button>
              <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => setRevisit(90)}>90일 뒤</button>
              {stored?.revisitAt && (
                <>
                  <span className="text-accent-ink">{formatDate(stored.revisitAt)} 예약됨</span>
                  <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => setRevisit(null)}>지우기</button>
                </>
              )}
              <span className="ml-auto">
                <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => navigate(`/questions/${domain.id}`)}>
                  다른 질문으로 <Icon name="chevron-right" size={13} />
                </button>
              </span>
            </div>
          </section>

          {focus && <div className="mt-2">{panel}</div>}
        </div>

        {!focus && <aside className="lg:sticky lg:top-6 lg:self-start">{panel}</aside>}
      </div>
    </div>
  )
}
