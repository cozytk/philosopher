export const DAY_MS = 24 * 60 * 60 * 1000

export function nowIso(): string {
  return new Date().toISOString()
}

export function daysBetween(a: string | number | Date, b: string | number | Date = Date.now()): number {
  return Math.floor((new Date(b).getTime() - new Date(a).getTime()) / DAY_MS)
}

export function dayKey(d: string | number | Date = Date.now()): string {
  const x = new Date(d)
  const y = x.getFullYear()
  const m = String(x.getMonth() + 1).padStart(2, '0')
  const dd = String(x.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

export function formatDate(d: string | number | Date, withTime = false): string {
  const x = new Date(d)
  if (Number.isNaN(x.getTime())) return ''
  const base = `${x.getFullYear()}.${String(x.getMonth() + 1).padStart(2, '0')}.${String(x.getDate()).padStart(2, '0')}`
  if (!withTime) return base
  return `${base} ${String(x.getHours()).padStart(2, '0')}:${String(x.getMinutes()).padStart(2, '0')}`
}

export function relativeDays(d: string | number | Date): string {
  const days = daysBetween(d)
  if (days <= 0) return '오늘'
  if (days === 1) return '어제'
  if (days < 7) return `${days}일 전`
  if (days < 30) return `${Math.floor(days / 7)}주 전`
  if (days < 365) return `${Math.floor(days / 30)}개월 전`
  return `${Math.floor(days / 365)}년 전`
}
