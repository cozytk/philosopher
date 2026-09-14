import { Link } from 'react-router'
import { DOMAINS } from '@/content'
import { useOverall } from '@/hooks/useScores'
import { STATUS_LABELS } from '@/engine/scoring'
import { Bar, LevelDots, Tag } from '@/ui/primitives'

export default function QuestionsPage() {
  const overall = useOverall()
  const byId = Object.fromEntries(overall.domains.map((d) => [d.domainId, d]))
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="h-serif text-2xl md:text-3xl">질문</h1>
        <p className="mt-1 text-sm text-ink-2">열 개의 영역, 네 개의 단계. 경험에서 시작해 정의를 세우고, 다른 관점과 맞붙은 뒤, 자기 입장을 씁니다.</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((d) => {
          const ds = byId[d.id]
          return (
            <Link key={d.id} to={`/questions/${d.id}`} className="card group flex flex-col gap-3 p-4 transition-colors hover:border-accent/40">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-paper-3 font-serif text-xl text-ink-2 group-hover:bg-accent-soft group-hover:text-accent-ink">{d.glyph}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-semibold">{d.name}</span>
                    {d.core && <Tag tone="accent">핵심</Tag>}
                  </div>
                  <p className="text-xs leading-relaxed text-ink-3">{d.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bar value={ds.score} max={100} height={6} label={`${d.name} ${ds.score}`} />
                <span className="w-7 text-right text-xs tabular-nums text-ink-2">{ds.score}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-ink-3">
                <span>{STATUS_LABELS[ds.status].name} · {ds.answered}/{ds.total}</span>
                <LevelDots done={ds.levelsDone} current={ds.nextLevel} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
