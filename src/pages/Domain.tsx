import { Link, Navigate, useParams } from 'react-router'
import { DOMAIN_MAP, LEVEL_LABELS, questionsOfDomain } from '@/content'
import { useOverall, useRecommendations } from '@/hooks/useScores'
import { useStore } from '@/store/useStore'
import { STATUS_LABELS, isAnswered } from '@/engine/scoring'
import { Meter, SectionTitle, Tag } from '@/ui/primitives'
import { Icon } from '@/ui/icons'
import type { Answer, QuestionLevel } from '@/types'

function statusGlyph(a: Answer | undefined): { glyph: string; label: string; cls: string } {
  if (!a || (!a.text && !a.stance)) return { glyph: '○', label: '아직', cls: 'text-ink-4' }
  if (!isAnswered(a)) return { glyph: '◔', label: '작성 중', cls: 'text-warn' }
  if (a.status === 'settled') return { glyph: '✓', label: '정리됨', cls: 'text-good' }
  if (a.status === 'revisit') return { glyph: '↻', label: '다시 볼 것', cls: 'text-accent' }
  return { glyph: '●', label: '답함', cls: 'text-accent' }
}

export default function DomainPage() {
  const { domainId = '' } = useParams()
  const domain = DOMAIN_MAP[domainId]
  const overall = useOverall()
  const answers = useStore((s) => s.answers)
  const recs = useRecommendations(2, domainId)
  if (!domain) return <Navigate to="/questions" replace />
  const ds = overall.domains.find((d) => d.domainId === domainId)!
  const qs = questionsOfDomain(domainId)

  return (
    <div className="flex flex-col gap-7">
      <Link to="/questions" className="inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink">
        <Icon name="chevron-left" size={16} /> 모든 영역
      </Link>
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-paper-3 font-serif text-2xl text-ink-2">{domain.glyph}</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="h-serif text-2xl">{domain.name}</h1>
              {domain.core && <Tag tone="accent">핵심</Tag>}
            </div>
            <p className="text-sm text-ink-2">{domain.tagline}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-3">{domain.why}</p>
          </div>
        </div>
        <div className="card w-full shrink-0 p-4 md:w-72">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-ink-3">영역 점수</span>
            <span className="font-serif text-2xl font-semibold tabular-nums">{ds.score}</span>
          </div>
          <div className="mt-1 text-xs font-medium text-ink">{STATUS_LABELS[ds.status].name}</div>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">{STATUS_LABELS[ds.status].desc}</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            <Meter label="넓이" value={ds.coverage} />
            <Meter label="깊이" value={ds.depth} />
            <Meter label="다양성" value={ds.exploration} />
            <Meter label="확립" value={ds.commitment} />
          </div>
        </div>
      </header>

      {recs.length > 0 && (
        <section>
          <SectionTitle>이 영역에서 다음으로</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {recs.map((r) => (
              <Link key={r.question.id} to={`/q/${r.question.id}`} className="card flex flex-col gap-1.5 p-4 hover:border-accent/40">
                <div className="text-xs text-ink-3">{LEVEL_LABELS[r.question.level].name} 단계 · 약 {r.question.minutes}분</div>
                <div className="font-serif text-[15px] leading-snug">{r.question.title}</div>
                <div className="text-xs text-accent-ink">{r.reasons[0]}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle>질문 사다리</SectionTitle>
        <div className="flex flex-col gap-4">
          {([1, 2, 3, 4] as QuestionLevel[]).map((level) => (
            <div key={level} className="card overflow-hidden">
              <div className="flex items-center gap-3 border-b border-line bg-paper-3/50 px-4 py-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">{level}</span>
                <span className="font-medium">{LEVEL_LABELS[level].name}</span>
                <span className="text-xs text-ink-3">{LEVEL_LABELS[level].desc}</span>
              </div>
              <ul className="divide-y divide-line">
                {qs
                  .filter((q) => q.level === level)
                  .map((q) => {
                    const a = answers[q.id]
                    const st = statusGlyph(a)
                    const locked = (q.prereqIds ?? []).filter((p) => !isAnswered(answers[p]))
                    return (
                      <li key={q.id}>
                        <Link to={`/q/${q.id}`} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-paper-3/40">
                          <span className={'mt-0.5 w-4 text-center font-mono text-sm ' + st.cls} title={st.label}>{st.glyph}</span>
                          <div className="min-w-0 flex-1">
                            <div className="font-serif text-[15px] leading-snug">{q.title}</div>
                            {a?.stance && <div className="mt-1 text-xs text-ink-2">“{a.stance}”</div>}
                            {locked.length > 0 && (
                              <div className="mt-1 text-[11px] text-ink-3">먼저: {locked.map((p) => qs.find((x) => x.id === p)?.title.slice(0, 28) + '…').join(', ')}</div>
                            )}
                          </div>
                          <span className="shrink-0 text-[11px] text-ink-4">{q.minutes}분</span>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
