import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useStore } from '@/store/useStore'
import { newId } from '@/lib/ids'
import { formatDate, nowIso } from '@/lib/dates'
import { Icon } from '@/ui/icons'
import { Bar, SectionTitle } from '@/ui/primitives'
import { useToast } from '@/ui/toast'
import type { JoyLog } from '@/types'

const WHO = ['혼자', '가족', '연인', '친구', '동료', '낯선 사람들']

function Scale({ value, onChange, min, max, labels }: { value: number; onChange: (v: number) => void; min: number; max: number; labels: [string, string] }) {
  return (
    <div>
      <div className="flex gap-1">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((v) => (
          <button key={v} type="button" onClick={() => onChange(v)} className={'h-9 flex-1 rounded-md border text-sm tabular-nums ' + (v === value ? 'border-accent bg-accent text-white' : 'border-line bg-paper-2 hover:border-line-2')}>
            {v > 0 && min < 0 ? `+${v}` : v}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-ink-4"><span>{labels[0]}</span><span>{labels[1]}</span></div>
    </div>
  )
}

interface Agg {
  activity: string
  n: number
  engagement: number
  energy: number
  flow: number
}

export default function JoyLogTool() {
  const logs = useStore((s) => s.joyLogs)
  const addJoyLog = useStore((s) => s.addJoyLog)
  const removeJoyLog = useStore((s) => s.removeJoyLog)
  const saveAnswer = useStore((s) => s.saveAnswer)
  const existing = useStore((s) => s.answers['joy-energy'])
  const navigate = useNavigate()
  const toast = useToast()

  const [activity, setActivity] = useState('')
  const [engagement, setEngagement] = useState(3)
  const [energy, setEnergy] = useState(0)
  const [flow, setFlow] = useState(3)
  const [withWhom, setWithWhom] = useState('혼자')
  const [note, setNote] = useState('')

  const agg = useMemo<Agg[]>(() => {
    const m = new Map<string, Agg>()
    for (const l of logs) {
      const key = l.activity.trim().replace(/\s+/g, ' ')
      const a = m.get(key) ?? { activity: key, n: 0, engagement: 0, energy: 0, flow: 0 }
      a.n++
      a.engagement += l.engagement
      a.energy += l.energy
      a.flow += l.flow
      m.set(key, a)
    }
    return [...m.values()].map((a) => ({ ...a, engagement: a.engagement / a.n, energy: a.energy / a.n, flow: a.flow / a.n }))
  }, [logs])

  const withStats = useMemo(() => {
    const m = new Map<string, { n: number; joy: number; energy: number }>()
    for (const l of logs) {
      const k = l.withWhom ?? '혼자'
      const a = m.get(k) ?? { n: 0, joy: 0, energy: 0 }
      a.n++
      a.joy += (l.engagement + l.flow) / 2
      a.energy += l.energy
      m.set(k, a)
    }
    return [...m.entries()].map(([k, v]) => ({ who: k, n: v.n, joy: v.joy / v.n, energy: v.energy / v.n })).sort((a, b) => b.joy - a.joy)
  }, [logs])

  const topFlow = [...agg].filter((a) => a.n >= 1).sort((a, b) => (b.engagement + b.flow) - (a.engagement + a.flow)).slice(0, 4)
  const topEnergy = [...agg].sort((a, b) => b.energy - a.energy).slice(0, 3)
  const drain = [...agg].sort((a, b) => a.energy - b.energy).slice(0, 3)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!activity.trim()) return
    const log: JoyLog = { id: newId('joy'), at: nowIso(), activity: activity.trim(), engagement, energy, flow, withWhom, note: note.trim() || undefined }
    addJoyLog(log)
    setActivity('')
    setNote('')
    toast('기록했어요.', 'success')
  }

  function sendToQuestion() {
    const lines = [
      `▸ 즐거움 기록 요약 (${logs.length}건, ${formatDate(new Date())})`,
      `가장 몰입한 활동: ${topFlow.map((a) => `${a.activity}(몰입 ${a.engagement.toFixed(1)}, 플로우 ${a.flow.toFixed(1)})`).join(', ') || '-'}`,
      `에너지를 채운 활동: ${topEnergy.map((a) => `${a.activity}(${a.energy >= 0 ? '+' : ''}${a.energy.toFixed(1)})`).join(', ') || '-'}`,
      `에너지를 뺏은 활동: ${drain.map((a) => `${a.activity}(${a.energy >= 0 ? '+' : ''}${a.energy.toFixed(1)})`).join(', ') || '-'}`,
      `함께한 사람별: ${withStats.map((w) => `${w.who} 즐거움 ${w.joy.toFixed(1)}`).join(', ') || '-'}`,
      '',
    ].join('\n')
    saveAnswer('joy-energy', { text: (existing?.text ? existing.text + '\n\n' : '') + lines + '\n' })
    toast('즐거움 질문에 요약을 가져왔어요.', 'success')
    navigate('/q/joy-energy')
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink">
          <Icon name="chevron-left" size={16} /> 도구
        </Link>
        <h1 className="h-serif text-2xl">즐거움 기록</h1>
        <p className="text-sm text-ink-2">칙센트미하이의 경험표집법과 ‘좋은 시간 일지’를 합친 것. 활동 뒤에 세 가지만 남기면 됩니다. 며칠이면 패턴이 보여요.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form onSubmit={submit} className="card flex flex-col gap-4 p-4 md:p-5">
          <div>
            <label className="label" htmlFor="act">무엇을 했나요?</label>
            <input id="act" className="input" placeholder="예: 친구와 산책, 코드 리팩토링, 유튜브 보기" value={activity} onChange={(e) => setActivity(e.target.value)} list="activities" />
            <datalist id="activities">{agg.slice(0, 30).map((a) => <option key={a.activity} value={a.activity} />)}</datalist>
          </div>
          <div>
            <label className="label">몰입 — 얼마나 빠져들었나요?</label>
            <Scale value={engagement} onChange={setEngagement} min={1} max={5} labels={['딴생각', '완전히 빠짐']} />
          </div>
          <div>
            <label className="label">에너지 — 끝나고 나서 어땠나요?</label>
            <Scale value={energy} onChange={setEnergy} min={-2} max={2} labels={['소진됨', '충전됨']} />
          </div>
          <div>
            <label className="label">플로우 — 시간이 사라졌나요? 실력에 살짝 벅찼나요?</label>
            <Scale value={flow} onChange={setFlow} min={1} max={5} labels={['지루/불안', '몰입 상태']} />
          </div>
          <div>
            <label className="label">누구와</label>
            <div className="flex flex-wrap gap-1.5">
              {WHO.map((w) => (
                <button key={w} type="button" onClick={() => setWithWhom(w)} className={'chip cursor-pointer ' + (withWhom === w ? 'border-ink bg-ink text-paper' : 'hover:border-line-2')}>{w}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="label" htmlFor="note">메모 (선택)</label>
            <input id="note" className="input" placeholder="무엇이 그렇게 만들었나요?" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary self-start" disabled={!activity.trim()}>
            <Icon name="plus" size={14} /> 기록하기
          </button>
        </form>

        <div className="flex flex-col gap-5">
          <section>
            <SectionTitle>패턴</SectionTitle>
            {logs.length < 3 ? (
              <div className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-ink-4">세 개 이상 기록되면 패턴을 보여드려요. (지금 {logs.length}개)</div>
            ) : (
              <div className="card flex flex-col gap-4 p-4">
                <div>
                  <div className="mb-1.5 text-xs font-medium text-ink-3">가장 몰입한 활동 (몰입+플로우)</div>
                  {topFlow.map((a) => (
                    <div key={a.activity} className="mb-1.5 flex items-center gap-2 text-sm">
                      <span className="w-36 truncate">{a.activity}</span>
                      <Bar value={(a.engagement + a.flow) / 2} max={5} height={6} />
                      <span className="w-8 text-right text-xs tabular-nums text-ink-3">{((a.engagement + a.flow) / 2).toFixed(1)}</span>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="mb-1 text-xs font-medium text-good">에너지를 채운 활동</div>
                    {topEnergy.map((a) => <div key={a.activity} className="text-sm text-ink-2">{a.activity} <span className="text-xs text-ink-3">({a.energy >= 0 ? '+' : ''}{a.energy.toFixed(1)}, {a.n}회)</span></div>)}
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-medium text-bad">에너지를 뺏은 활동</div>
                    {drain.map((a) => <div key={a.activity} className="text-sm text-ink-2">{a.activity} <span className="text-xs text-ink-3">({a.energy >= 0 ? '+' : ''}{a.energy.toFixed(1)}, {a.n}회)</span></div>)}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-ink-3">함께한 사람별 즐거움</div>
                  <div className="flex flex-wrap gap-1.5">
                    {withStats.map((w) => <span key={w.who} className="chip">{w.who} {w.joy.toFixed(1)} · 에너지 {w.energy >= 0 ? '+' : ''}{w.energy.toFixed(1)}</span>)}
                  </div>
                </div>
                <button type="button" className="btn-secondary self-start" onClick={sendToQuestion}>
                  <Icon name="scroll" size={14} /> ‘즐거움과 몰입’ 질문에 요약 가져가기
                </button>
              </div>
            )}
          </section>
          <section>
            <SectionTitle>최근 기록</SectionTitle>
            {logs.length === 0 ? (
              <div className="text-sm text-ink-4">아직 없어요.</div>
            ) : (
              <ul className="card divide-y divide-line">
                {logs.slice(0, 12).map((l) => (
                  <li key={l.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                    <div className="min-w-0 flex-1">
                      <div className="truncate">{l.activity} <span className="text-xs text-ink-3">· {l.withWhom}</span></div>
                      <div className="text-[11px] text-ink-3">{formatDate(l.at, true)} · 몰입 {l.engagement} · 에너지 {l.energy > 0 ? '+' : ''}{l.energy} · 플로우 {l.flow}{l.note ? ` · ${l.note}` : ''}</div>
                    </div>
                    <button type="button" className="btn-ghost px-1.5 py-1" onClick={() => removeJoyLog(l.id)} aria-label="삭제"><Icon name="trash" size={14} /></button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
