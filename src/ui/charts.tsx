/** Small, dependency-free SVG charts. One hue for magnitude; text in ink tokens. */

export function Sparkline({ points, width = 240, height = 48, label }: { points: number[]; width?: number; height?: number; label?: string }) {
  if (points.length < 2) return null
  const max = Math.max(100, ...points)
  const min = 0
  const dx = width / (points.length - 1)
  const y = (v: number) => height - 4 - ((v - min) / (max - min || 1)) * (height - 8)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * dx).toFixed(1)},${y(p).toFixed(1)}`).join(' ')
  const last = points[points.length - 1]
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={label ?? '추세'} className="block">
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={(points.length - 1) * dx} cy={y(last)} r={3.5} fill="var(--accent)" stroke="var(--paper-2)" strokeWidth={2} />
    </svg>
  )
}

export function RadialGauge({ value, size = 132, label }: { value: number; size?: number; label?: string }) {
  const r = size / 2 - 8
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? `${pct}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--paper-4)" strokeWidth={8} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 600ms ease' }}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontFamily="var(--font-serif)" fontSize={size * 0.28} fontWeight={600} fill="var(--ink)">
        {Math.round(pct)}
      </text>
    </svg>
  )
}

export function MiniBars({ values, labels, height = 56 }: { values: number[]; labels?: string[]; height?: number }) {
  const max = Math.max(1, ...values)
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {values.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1" title={labels?.[i]}>
          <div className="w-full rounded-t bg-accent/80" style={{ height: `${Math.max(3, (v / max) * (height - 16))}px` }} />
          {labels && <span className="text-[10px] text-ink-4">{labels[i]}</span>}
        </div>
      ))}
    </div>
  )
}
