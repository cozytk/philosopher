import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { VALUE_CARDS, VALUE_GROUPS, VALUE_MAP } from '@/content'
import { useStore } from '@/store/useStore'
import { Icon } from '@/ui/icons'
import { Tag } from '@/ui/primitives'
import { formatDate, nowIso } from '@/lib/dates'
import { useToast } from '@/ui/toast'

type Stage = 'intro' | 'keep' | 'ten' | 'rank' | 'why' | 'done'

const AXIS_LABEL: Record<string, string> = { openness: '변화에 대한 개방', conservation: '보존·안정', enhancement: '자기 고양', transcendence: '자기 초월', mixed: '즐거움' }

export default function ValuesSortTool() {
  const result = useStore((s) => s.valuesResult)
  const setValuesResult = useStore((s) => s.setValuesResult)
  const saveAnswer = useStore((s) => s.saveAnswer)
  const existing = useStore((s) => s.answers['val-rank'])
  const navigate = useNavigate()
  const toast = useToast()
  const [stage, setStage] = useState<Stage>(result ? 'done' : 'intro')
  const [kept, setKept] = useState<Set<string>>(new Set())
  const [ten, setTen] = useState<Set<string>>(new Set())
  const [ranked, setRanked] = useState<string[]>([])
  const [why, setWhy] = useState<Record<string, string>>({})

  const axisSummary = useMemo(() => {
    const top = result?.top ?? ranked
    const counts: Record<string, number> = {}
    for (const id of top) {
      const g = VALUE_MAP[id]?.group
      if (!g) continue
      const axis = VALUE_GROUPS[g].axis
      counts[axis] = (counts[axis] ?? 0) + 1
    }
    return counts
  }, [result, ranked])

  function toggle(setter: (f: (s: Set<string>) => Set<string>) => void, id: string, max?: number) {
    setter((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else if (!max || n.size < max) n.add(id)
      return n
    })
  }
  function toggleRank(id: string) {
    setRanked((r) => (r.includes(id) ? r.filter((x) => x !== id) : r.length < 5 ? [...r, id] : r))
  }
  function move(i: number, dir: -1 | 1) {
    setRanked((r) => {
      const j = i + dir
      if (j < 0 || j >= r.length) return r
      const n = [...r]
      ;[n[i], n[j]] = [n[j], n[i]]
      return n
    })
  }
  function finish() {
    setValuesResult({ at: nowIso(), top: ranked, why })
    setStage('done')
  }
  function restart() {
    setKept(new Set())
    setTen(new Set())
    setRanked([])
    setWhy({})
    setStage('keep')
  }
  function sendToQuestion() {
    const top = result?.top ?? []
    const lines = top.map((id, i) => `${i + 1}. ${VALUE_MAP[id]?.name}${result?.why[id] ? ` — ${result.why[id]}` : ''}`).join('\n')
    const summary = `▸ 가치 카드 정렬 결과 (${formatDate(result?.at ?? new Date())})\n${lines}\n\n축: ${Object.entries(axisSummary).map(([k, v]) => `${AXIS_LABEL[k]} ${v}`).join(' · ')}\n\n`
    saveAnswer('val-rank', { text: (existing?.text ? existing.text + '\n\n' : '') + summary })
    toast('가치 질문에 결과를 가져왔어요.', 'success')
    navigate('/q/val-rank')
  }

  const header = (
    <header className="flex flex-col gap-1">
      <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink">
        <Icon name="chevron-left" size={16} /> 도구
      </Link>
      <h1 className="h-serif text-2xl">가치 카드 정렬</h1>
    </header>
  )

  if (stage === 'intro') {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {header}
        <div className="card flex flex-col gap-3 p-5 text-sm leading-relaxed text-ink-2">
          <p>가치는 목록일 때는 아무것도 결정해주지 않고, 서열일 때 결정을 돕습니다. 세 번에 걸쳐 걸러냅니다.</p>
          <ol className="list-decimal pl-5">
            <li>45장 중 “나에게 중요하다”고 느끼는 카드를 고릅니다. (개수 제한 없음)</li>
            <li>고른 카드를 10장으로 좁힙니다.</li>
            <li>10장 중 5장을 골라 순위를 매기고, 원하면 이유를 적습니다.</li>
          </ol>
          <p className="text-xs text-ink-3">빠르게, 직관으로. 고민되는 카드는 대개 ‘중요하다고 믿고 싶은 것’이지 ‘중요한 것’이 아닙니다. 슈워츠(1992)의 가치 구조를 바탕으로 결과를 두 축으로 읽어드립니다.</p>
          <button type="button" className="btn-primary self-start" onClick={() => setStage('keep')}>시작하기</button>
        </div>
      </div>
    )
  }

  if (stage === 'keep' || stage === 'ten') {
    const pool = stage === 'keep' ? VALUE_CARDS : VALUE_CARDS.filter((v) => kept.has(v.id))
    const selected = stage === 'keep' ? kept : ten
    const max = stage === 'ten' ? 10 : undefined
    return (
      <div className="flex flex-col gap-5">
        {header}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{stage === 'keep' ? '1단계 · 중요한 것 고르기' : '2단계 · 10장으로 좁히기'}</div>
            <div className="text-xs text-ink-3">{stage === 'keep' ? '개수 제한 없이, 느껴지는 대로.' : `남길 카드 10장을 고르세요. (${selected.size}/10)`}</div>
          </div>
          <button
            type="button"
            className="btn-primary"
            disabled={stage === 'keep' ? kept.size < 5 : ten.size < 5}
            onClick={() => {
              if (stage === 'keep') {
                if (kept.size <= 10) {
                  setTen(new Set(kept))
                  setStage('rank')
                } else setStage('ten')
              } else setStage('rank')
            }}
          >
            다음 <Icon name="chevron-right" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {pool.map((v) => {
            const on = selected.has(v.id)
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => toggle(stage === 'keep' ? setKept : setTen, v.id, max)}
                className={'flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-colors ' + (on ? 'border-accent bg-accent-soft' : 'border-line bg-paper-2 hover:border-line-2')}
              >
                <span className="font-serif text-[15px] font-semibold">{v.name}</span>
                <span className="text-[11px] leading-snug text-ink-3">{v.desc}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (stage === 'rank') {
    const pool = VALUE_CARDS.filter((v) => ten.has(v.id))
    return (
      <div className="flex flex-col gap-5">
        {header}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">3단계 · 다섯 개, 순서대로</div>
            <div className="text-xs text-ink-3">가장 중요한 것부터 차례로 누르세요. ({ranked.length}/5)</div>
          </div>
          <button type="button" className="btn-primary" disabled={ranked.length !== 5} onClick={() => setStage('why')}>
            다음 <Icon name="chevron-right" size={14} />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_280px]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {pool.map((v) => {
              const idx = ranked.indexOf(v.id)
              return (
                <button key={v.id} type="button" onClick={() => toggleRank(v.id)} className={'flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left ' + (idx >= 0 ? 'border-accent bg-accent-soft' : 'border-line bg-paper-2 hover:border-line-2')}>
                  <span className={'grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ' + (idx >= 0 ? 'bg-accent text-white' : 'bg-paper-3 text-ink-4')}>{idx >= 0 ? idx + 1 : ''}</span>
                  <span className="font-serif text-[15px] font-semibold">{v.name}</span>
                </button>
              )
            })}
          </div>
          <div className="card p-3">
            <div className="mb-2 text-xs text-ink-3">순위 조정</div>
            <ol className="flex flex-col gap-1">
              {ranked.map((id, i) => (
                <li key={id} className="flex items-center gap-2 rounded-md bg-paper-3/60 px-2 py-1.5 text-sm">
                  <span className="w-4 text-xs text-ink-3">{i + 1}</span>
                  <span className="flex-1 font-serif">{VALUE_MAP[id].name}</span>
                  <button type="button" className="btn-ghost px-1 py-0.5" onClick={() => move(i, -1)} aria-label="위로"><Icon name="arrow-up" size={13} /></button>
                  <button type="button" className="btn-ghost px-1 py-0.5" onClick={() => move(i, 1)} aria-label="아래로"><Icon name="arrow-down" size={13} /></button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'why') {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        {header}
        <div>
          <div className="font-medium">4단계 · 왜 중요한가 (선택)</div>
          <div className="text-xs text-ink-3">각 가치가 실제 선택에서 드러난 장면을 한 줄로.</div>
        </div>
        <div className="flex flex-col gap-3">
          {ranked.map((id, i) => (
            <div key={id} className="card p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-semibold text-white">{i + 1}</span>
                <span className="font-serif text-[15px] font-semibold">{VALUE_MAP[id].name}</span>
                <Tag>{VALUE_GROUPS[VALUE_MAP[id].group].name}</Tag>
              </div>
              <input className="input" placeholder="예: 작년에 연봉 대신 이것을 택했다" value={why[id] ?? ''} onChange={(e) => setWhy((w) => ({ ...w, [id]: e.target.value }))} />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={() => setStage('rank')}>이전</button>
          <button type="button" className="btn-primary" onClick={finish}>저장</button>
        </div>
      </div>
    )
  }

  const top = result?.top ?? []
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      {header}
      <div className="text-xs text-ink-3">{result ? `${formatDate(result.at)} 정렬` : ''}</div>
      <ol className="card divide-y divide-line">
        {top.map((id, i) => (
          <li key={id} className="flex items-start gap-3 px-4 py-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent font-serif text-sm font-semibold text-white">{i + 1}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-[16px] font-semibold">{VALUE_MAP[id]?.name}</span>
                <Tag>{VALUE_GROUPS[VALUE_MAP[id]?.group ?? 'benevolence'].name}</Tag>
              </div>
              <div className="text-xs text-ink-3">{VALUE_MAP[id]?.desc}</div>
              {result?.why[id] && <div className="mt-1 text-sm text-ink-2">— {result.why[id]}</div>}
            </div>
          </li>
        ))}
      </ol>
      <div className="card p-4 text-sm">
        <div className="mb-1 font-medium">두 축으로 읽기</div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(axisSummary).map(([k, v]) => (
            <span key={k} className="chip">{AXIS_LABEL[k]} · {v}</span>
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-ink-3">
          슈워츠의 구조에서 ‘변화에 대한 개방’과 ‘보존’은, ‘자기 고양’과 ‘자기 초월’은 서로 긴장합니다. 양쪽을 모두 상위에 두었다면 그 긴장이 실제 선택 어디에서 드러나는지 ‘가치’ 영역의 충돌 질문에서 살펴보세요.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={sendToQuestion}>
          <Icon name="scroll" size={14} /> 가치 질문에 가져가기
        </button>
        <button type="button" className="btn-secondary" onClick={restart}>
          <Icon name="refresh" size={14} /> 다시 정렬하기
        </button>
      </div>
    </div>
  )
}
