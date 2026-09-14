import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from './icons'

export function Bar({ value, max = 1, color = 'var(--accent)', height = 6, label }: { value: number; max?: number; color?: string; height?: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="w-full overflow-hidden rounded-full bg-paper-3" style={{ height }} role="img" aria-label={label ?? `${Math.round(pct)}%`} title={label}>
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

export function Meter({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="flex flex-col gap-1" title={hint}>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-ink-3">{label}</span>
        <span className="tabular-nums text-ink-2">{Math.round(value * 100)}</span>
      </div>
      <Bar value={value} height={5} />
    </div>
  )
}

export function StatTile({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="card px-4 py-3">
      <div className="text-xs text-ink-3">{label}</div>
      <div className="mt-0.5 font-serif text-2xl font-semibold tabular-nums">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-ink-3">{sub}</div>}
    </div>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="h-serif text-lg">{children}</h2>
      {action}
    </div>
  )
}

export function EmptyState({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div className="font-serif text-lg">{title}</div>
      {desc && <p className="max-w-md text-sm text-ink-3">{desc}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 md:items-center md:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={'rise card max-h-[92vh] w-full overflow-y-auto rounded-b-none p-5 md:rounded-b-[var(--radius-card)] ' + (wide ? 'md:max-w-3xl' : 'md:max-w-lg')}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          {title ? <h3 className="h-serif text-lg">{title}</h3> : <span />}
          <button type="button" className="btn-ghost -mr-2 px-2" onClick={onClose} aria-label="닫기">
            <Icon name="x" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Segmented<T extends string>({ value, onChange, options, size = 'sm' }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; size?: 'sm' | 'md' }) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-paper-3 p-0.5" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          onClick={() => onChange(o.value)}
          className={
            'rounded-md px-2.5 font-medium transition-colors ' +
            (size === 'sm' ? 'py-1 text-xs ' : 'py-1.5 text-sm ') +
            (o.value === value ? 'bg-paper-2 text-ink shadow-sm' : 'text-ink-3 hover:text-ink')
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'lens' | 'good' | 'warn' }) {
  const cls = {
    neutral: 'bg-paper-3 text-ink-2 border-line',
    accent: 'bg-accent-soft text-accent-ink border-accent/30',
    lens: 'bg-lens-soft text-lens-ink border-lens/30',
    good: 'bg-good-soft text-good border-good/30',
    warn: 'bg-warn-soft text-warn border-warn/30',
  }[tone]
  return <span className={'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ' + cls}>{children}</span>
}

export function LevelDots({ done, current }: { done: [boolean, boolean, boolean, boolean]; current?: number | null }) {
  return (
    <div className="flex items-center gap-1" aria-label={`단계 ${done.filter(Boolean).length}/4 완료`}>
      {done.map((d, i) => (
        <span
          key={i}
          className={
            'h-2 w-2 rounded-full ' + (d ? 'bg-accent' : current === i + 1 ? 'border border-accent bg-transparent' : 'bg-paper-4')
          }
        />
      ))}
    </div>
  )
}

export function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-line-2 border-t-accent"
      style={{ width: size, height: size }}
      aria-label="로딩 중"
    />
  )
}
