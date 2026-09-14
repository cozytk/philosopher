import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { DOMAINS, LENSES, LENS_TYPE_LABELS, QUESTION_MAP } from '@/content'
import { Icon } from '@/ui/icons'
import { Tag } from '@/ui/primitives'
import type { LensType } from '@/types'

const TYPES: (LensType | 'all')[] = ['all', 'thinker', 'tradition', 'concept', 'study', 'book']

export default function LibraryPage() {
  const [q, setQ] = useState('')
  const [type, setType] = useState<LensType | 'all'>('all')
  const [domain, setDomain] = useState<string>('all')

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return LENSES.filter((l) => {
      if (type !== 'all' && l.type !== type) return false
      if (domain !== 'all' && !l.questionIds.some((id) => QUESTION_MAP[id]?.domainId === domain)) return false
      if (!needle) return true
      const hay = [l.name, l.origin, l.position, l.keyConcept, l.challenge, ...l.tags].join(' ').toLowerCase()
      return hay.includes(needle)
    }).sort((a, b) => a.name.localeCompare(b.name, 'ko'))
  }, [q, type, domain])

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="h-serif text-2xl md:text-3xl">서재</h1>
        <p className="mt-1 text-sm text-ink-2">{LENSES.length}개의 관점 — 사상가, 전통, 개념, 연구. 각 관점은 당신에게 되묻는 질문 하나를 갖고 있어요.</p>
      </header>
      <div className="flex flex-col gap-3">
        <label className="relative block">
          <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" />
          <input className="input pl-9" placeholder="이름, 개념, 키워드로 찾기 (예: 몰입, 무아, 후회)" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <button key={t} type="button" onClick={() => setType(t)} className={'chip cursor-pointer ' + (type === t ? 'border-ink bg-ink text-paper' : 'hover:border-line-2')}>
              {t === 'all' ? '전체' : LENS_TYPE_LABELS[t]}
            </button>
          ))}
          <span className="mx-1 self-center text-ink-4">|</span>
          <button type="button" onClick={() => setDomain('all')} className={'chip cursor-pointer ' + (domain === 'all' ? 'border-ink bg-ink text-paper' : 'hover:border-line-2')}>
            모든 영역
          </button>
          {DOMAINS.map((d) => (
            <button key={d.id} type="button" onClick={() => setDomain(d.id)} className={'chip cursor-pointer ' + (domain === d.id ? 'border-ink bg-ink text-paper' : 'hover:border-line-2')}>
              {d.name}
            </button>
          ))}
        </div>
      </div>
      <div className="text-xs text-ink-3">{list.length}개</div>
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((l) => (
          <Link key={l.id} to={`/library/${l.id}`} className="card flex flex-col gap-2 p-4 transition-colors hover:border-lens/50">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-serif text-[15px] font-semibold leading-snug">{l.name}</div>
                <div className="text-[11px] text-ink-3">{l.origin}</div>
              </div>
              <Tag tone="lens">{LENS_TYPE_LABELS[l.type]}</Tag>
            </div>
            <p className="line-clamp-3 text-xs leading-relaxed text-ink-2">{l.position}</p>
            <div className="text-[11px] text-lens-ink">핵심: {l.keyConcept}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
