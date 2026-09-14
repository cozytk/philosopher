import { NavLink, Outlet, useLocation } from 'react-router'
import { Icon } from './icons'
import { useStore } from '@/store/useStore'
import { budgetState, isLlmConfigured } from '@/hooks/useLlm'
import { monthSpend } from '@/store/useStore'

const NAV = [
  { to: '/', label: '홈', icon: 'home' as const, end: true },
  { to: '/questions', label: '질문', icon: 'question' as const },
  { to: '/library', label: '서재', icon: 'book' as const },
  { to: '/tools', label: '도구', icon: 'tools' as const },
  { to: '/philosophy', label: '나의 철학', icon: 'scroll' as const },
]

export function Layout() {
  const llm = useStore((s) => s.settings.llm)
  const usage = useStore((s) => s.usage)
  const location = useLocation()
  const focus = location.pathname.startsWith('/q/') && new URLSearchParams(location.search).get('focus') === '1'
  const configured = isLlmConfigured(llm)
  const budget = budgetState(llm, monthSpend(usage))

  if (focus) {
    return (
      <div className="min-h-dvh bg-paper">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-paper md:flex">
      <aside className="hidden w-[228px] shrink-0 flex-col border-r border-line bg-paper-2/60 px-3 py-5 md:flex md:sticky md:top-0 md:h-dvh">
        <NavLink to="/" className="mb-6 flex items-center gap-2 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-paper">
            <span className="h-3 w-3 rounded-full border-2 border-paper" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">Philosopher</span>
        </NavLink>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ' +
                (isActive ? 'bg-paper-3 font-medium text-ink' : 'text-ink-2 hover:bg-paper-3/70 hover:text-ink')
              }
            >
              <Icon name={n.icon} size={17} />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 px-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ' +
              (isActive ? 'bg-paper-3 font-medium text-ink' : 'text-ink-2 hover:bg-paper-3/70 hover:text-ink')
            }
          >
            <Icon name="settings" size={17} />
            설정
          </NavLink>
          <div className="rounded-lg border border-line bg-paper-2 px-2.5 py-2 text-[11px] leading-snug text-ink-3">
            {configured ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className={'h-1.5 w-1.5 rounded-full ' + (budget.exceeded ? 'bg-bad' : 'bg-good')} />
                  AI 연결됨 · {llm.model?.split('/').pop()}
                </div>
                {llm.monthlyBudgetUsd ? <div className="mt-1">이번 달 사용 {Math.round(budget.ratio * 100)}%</div> : null}
              </>
            ) : (
              <div>AI 없이도 모든 기록·지도·관점을 쓸 수 있어요.</div>
            )}
          </div>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-paper/90 px-4 py-2.5 backdrop-blur md:hidden">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-paper">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-paper" />
            </span>
            <span className="font-serif text-base font-semibold">Philosopher</span>
          </NavLink>
          <NavLink to="/settings" className="btn-ghost px-2" aria-label="설정">
            <Icon name="settings" />
          </NavLink>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-5 md:px-8 md:pb-10 md:pt-8">
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-paper/95 backdrop-blur md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                'flex flex-col items-center gap-0.5 py-2 text-[11px] ' + (isActive ? 'text-accent' : 'text-ink-3')
              }
            >
              <Icon name={n.icon} size={20} />
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
