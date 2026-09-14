import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export interface Toast {
  id: number
  kind: 'info' | 'success' | 'error'
  text: string
}

interface ToastCtx {
  toasts: Toast[]
  push: (text: string, kind?: Toast['kind']) => void
  dismiss: (id: number) => void
}

const Ctx = createContext<ToastCtx | null>(null)
let seq = 1

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const push = useCallback(
    (text: string, kind: Toast['kind'] = 'info') => {
      const id = seq++
      setToasts((t) => [...t, { id, kind, text }].slice(-4))
      window.setTimeout(() => dismiss(id), kind === 'error' ? 7000 : 3500)
    },
    [dismiss],
  )
  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])
  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-2 px-4 md:bottom-6" aria-live="polite">
        {toasts.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            className={
              'pointer-events-auto rise max-w-md rounded-lg border px-3.5 py-2 text-sm shadow-card ' +
              (t.kind === 'error'
                ? 'border-bad/40 bg-bad-soft text-ink'
                : t.kind === 'success'
                  ? 'border-good/40 bg-good-soft text-ink'
                  : 'border-line bg-paper-2 text-ink')
            }
          >
            {t.text}
          </button>
        ))}
      </div>
    </Ctx.Provider>
  )
}

/** Returns the push function: `toast('저장했어요', 'success')`. */
export function useToast(): ToastCtx['push'] {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('ToastProvider missing')
  return ctx.push
}
