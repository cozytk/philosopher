import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { SCALES, SCALE_MAP, scoreScale, DOMAIN_MAP } from '@/content'
import { useStore } from '@/store/useStore'
import { newId } from '@/lib/ids'
import { formatDate, nowIso } from '@/lib/dates'
import { Icon } from '@/ui/icons'
import { Bar, SectionTitle } from '@/ui/primitives'
import { Sparkline } from '@/ui/charts'
import type { CheckinResult } from '@/types'

export default function CheckinTool() {
  const checkins = useStore((s) => s.checkins)
  const addCheckin = useStore((s) => s.addCheckin)
  const [active, setActive] = useState<string | null>(null)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [justDone, setJustDone] = useState<CheckinResult | null>(null)

  const scale = active ? SCALE_MAP[active] : null
  const history = useMemo(() => {
    const byScale: Record<string, CheckinResult[]> = {}
    for (const c of checkins) (byScale[c.scaleId] ??= []).push(c)
    return byScale
  }, [checkins])

  function submit() {
    if (!scale) return
    const scores = scoreScale(scale, responses)
    const result: CheckinResult = { id: newId('chk'), scaleId: scale.id, at: nowIso(), responses, scores }
    addCheckin(result)
    setJustDone(result)
    setActive(null)
    setResponses({})
  }

  const answeredCount = scale ? scale.items.filter((i) => typeof responses[i.id] === 'number').length : 0

  if (scale) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <button type="button" className="inline-flex items-center gap-1 self-start text-sm text-ink-3 hover:text-ink" onClick={() => setActive(null)}>
          <Icon name="chevron-left" size={16} /> 척도 고르기
        </button>
        <header>
          <h1 className="h-serif text-2xl">{scale.name}</h1>
          <p className="mt-1 text-sm text-ink-2">{scale.description}</p>
          <p className="mt-1 text-[11px] text-ink-4">{scale.source}</p>
        </header>
        <div className="flex flex-col gap-3">
          {scale.items.map((item, idx) => (
            <div key={item.id} className="card p-4">
              <div className="mb-2 font-serif text-[15px]"><span className="mr-2 text-ink-4">{idx + 1}.</span>{item.text}</div>
              <div className="flex gap-1">
                {Array.from({ length: scale.points }, (_, i) => i + 1).map((v) => (
                  <button key={v} type="button" onClick={() => setResponses((r) => ({ ...r, [item.id]: v }))} className={'h-9 flex-1 rounded-md border text-sm tabular-nums ' + (responses[item.id] === v ? 'border-accent bg-accent text-white' : 'border-line bg-paper-2 hover:border-line-2')}>
                    {v}
                  </button>
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-ink-4"><span>{scale.anchors.low}</span><span>{scale.anchors.high}</span></div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-20 flex items-center justify-between rounded-lg border border-line bg-paper-2/95 px-4 py-3 backdrop-blur md:bottom-4">
          <span className="text-sm text-ink-3">{answeredCount}/{scale.items.length}</span>
          <button type="button" className="btn-primary" disabled={answeredCount < scale.items.length} onClick={submit}>결과 보기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink">
          <Icon name="chevron-left" size={16} /> 도구
        </Link>
        <h1 className="h-serif text-2xl">자기 점검</h1>
        <p className="text-sm text-ink-2">연구에서 쓰이는 척도에서 영감을 받은 짧은 자기점검입니다. 진단이 아니라 시간에 따른 변화를 보기 위한 것이에요. 한 달에 한 번이면 충분합니다.</p>
      </header>

      {justDone && (
        <div className="rise card border-accent/40 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-serif text-lg">{SCALE_MAP[justDone.scaleId].name} · 결과</div>
            <button type="button" className="btn-ghost px-2" onClick={() => setJustDone(null)}><Icon name="x" /></button>
          </div>
          <ResultView result={justDone} previous={(history[justDone.scaleId] ?? []).filter((c) => c.id !== justDone.id).at(-1)} />
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {SCALES.map((s) => {
          const h = history[s.id] ?? []
          const last = h[h.length - 1]
          return (
            <div key={s.id} className="card flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-serif text-[16px] font-semibold">{s.name}</div>
                  <div className="text-xs text-ink-3">{s.minutes}분 · {s.items.length}문항 · {DOMAIN_MAP[s.domainId]?.name} 영역</div>
                </div>
                <button type="button" className="btn-primary shrink-0" onClick={() => setActive(s.id)}>{last ? '다시 하기' : '시작'}</button>
              </div>
              <p className="text-xs leading-relaxed text-ink-2">{s.description}</p>
              {last ? (
                <div className="flex flex-col gap-2">
                  {s.subscales.map((sub) => {
                    const series = h.map((c) => c.scores[sub.id] ?? 0)
                    return (
                      <div key={sub.id}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-ink-3">{sub.name}</span>
                          <span className="tabular-nums text-ink-2">{last.scores[sub.id]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1"><Bar value={last.scores[sub.id] ?? 0} max={100} height={5} /></div>
                          {series.length >= 2 && <div className="w-20"><Sparkline points={series} width={80} height={22} label={`${sub.name} 추세`} /></div>}
                        </div>
                      </div>
                    )
                  })}
                  <div className="text-[11px] text-ink-4">마지막 {formatDate(last.at)} · {h.length}회</div>
                </div>
              ) : (
                <div className="text-[11px] text-ink-4">아직 점검 전</div>
              )}
            </div>
          )
        })}
      </div>
      <SectionTitle>읽는 법</SectionTitle>
      <ul className="card divide-y divide-line text-sm">
        {SCALES.map((s) => (
          <li key={s.id} className="px-4 py-3">
            <div className="font-medium">{s.name}</div>
            <p className="text-xs leading-relaxed text-ink-2">{s.reading}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ResultView({ result, previous }: { result: CheckinResult; previous?: CheckinResult }) {
  const scale = SCALE_MAP[result.scaleId]
  return (
    <div className="flex flex-col gap-3">
      {scale.subscales.map((sub) => {
        const v = result.scores[sub.id] ?? 0
        const prev = previous?.scores[sub.id]
        const delta = typeof prev === 'number' ? v - prev : null
        return (
          <div key={sub.id}>
            <div className="flex items-center justify-between text-sm">
              <span>{sub.name} <span className="text-xs text-ink-3">· {sub.description}</span></span>
              <span className="tabular-nums">
                {v}
                {delta !== null && <span className={'ml-1 text-xs ' + (delta > 0 ? 'text-good' : delta < 0 ? 'text-bad' : 'text-ink-3')}>({delta > 0 ? '+' : ''}{delta})</span>}
              </span>
            </div>
            <Bar value={v} max={100} height={7} />
          </div>
        )
      })}
      <p className="text-xs leading-relaxed text-ink-2">{scale.reading}</p>
    </div>
  )
}
