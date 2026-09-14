import { Link } from 'react-router'
import type { Lens } from '@/types'
import { LENS_TYPE_LABELS } from '@/content'
import { Icon } from './icons'
import { Tag } from './primitives'

export function LensCard({
  lens,
  reason,
  linked,
  onToggle,
  onInsert,
}: {
  lens: Lens
  reason?: string
  linked: boolean
  onToggle: () => void
  onInsert: (text: string) => void
}) {
  return (
    <div className={'rounded-lg border p-3 transition-colors ' + (linked ? 'border-lens/60 bg-lens-soft/40' : 'border-line bg-paper-2')}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link to={`/library/${lens.id}`} className="font-serif text-[14px] font-semibold leading-snug hover:text-lens-ink">
            {lens.name}
          </Link>
          <div className="text-[11px] text-ink-3">{lens.origin}</div>
        </div>
        <Tag tone="lens">{LENS_TYPE_LABELS[lens.type]}</Tag>
      </div>
      {reason && <div className="mt-1 text-[11px] text-lens-ink">{reason}</div>}
      <p className="mt-2 text-xs leading-relaxed text-ink-2">{lens.position}</p>
      <p className="mt-2 rounded-md bg-paper-3/70 px-2.5 py-1.5 font-serif text-[13px] leading-relaxed text-ink">“{lens.challenge}”</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={onToggle} className={'btn px-2 py-1 text-xs ' + (linked ? 'bg-lens text-white' : 'bg-paper-3 text-ink hover:bg-paper-4')}>
          <Icon name={linked ? 'check' : 'link'} size={13} /> {linked ? '연결됨' : '내 답에 연결'}
        </button>
        <button type="button" onClick={() => onInsert(`> ${lens.challenge}\n> — ${lens.name}\n\n`)} className="btn-ghost px-2 py-1 text-xs">
          <Icon name="plus" size={13} /> 질문을 글에 넣기
        </button>
        <Link to={`/library/${lens.id}`} className="btn-ghost ml-auto px-2 py-1 text-xs">
          자세히 <Icon name="chevron-right" size={13} />
        </Link>
      </div>
    </div>
  )
}
