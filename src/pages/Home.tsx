import { Link } from 'react-router'
import { DOMAINS, LEVEL_LABELS, QUESTIONS } from '@/content'
import { useOverall, useRecommendations, useRevisits } from '@/hooks/useScores'
import { useStore } from '@/store/useStore'
import { STATUS_LABELS } from '@/engine/scoring'
import { Bar, LevelDots, Meter, SectionTitle, Tag } from '@/ui/primitives'
import { RadialGauge, Sparkline } from '@/ui/charts'
import { Icon } from '@/ui/icons'
import { formatDate, relativeDays } from '@/lib/dates'
import type { RecommendationKind } from '@/engine/recommend'

const KIND_LABEL: Record<RecommendationKind, string> = {
  start: '시작',
  continue: '이어쓰기',
  next: '다음 단계',
  contrast: '관점 대조',
  synthesize: '입장 정리',
  deepen: '깊이 더하기',
  explore: '넓히기',
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 5) return '늦은 밤이에요'
  if (h < 12) return '좋은 아침이에요'
  if (h < 18) return '좋은 오후예요'
  return '좋은 저녁이에요'
}

export default function HomePage() {
  const overall = useOverall()
  const recs = useRecommendations(3)
  const revisits = useRevisits(3)
  const snapshots = useStore((s) => s.snapshots)
  const name = useStore((s) => s.settings.displayName)
  const answeredTotal = overall.counts.answered
  const coreDomains = overall.domains.filter((d) => DOMAINS.find((x) => x.id === d.domainId)?.core)

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <div className="text-sm text-ink-3">{formatDate(new Date())}</div>
        <h1 className="h-serif text-2xl md:text-3xl">
          {greeting()}{name ? `, ${name}` : ''}.
        </h1>
        <p className="text-sm text-ink-2">
          {answeredTotal === 0
            ? '첫 질문에 답하면 지도가 그려지기 시작해요. 정답은 없고, 정직함만 있으면 됩니다.'
            : `지금까지 ${answeredTotal}개의 질문에 답했고, ${overall.counts.stances}개의 입장을 세웠어요.`}
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="card flex flex-col gap-5 p-5">
          <div className="flex items-center gap-5">
            <RadialGauge value={overall.index} label={`자기이해 지수 ${overall.index}`} />
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-wide text-ink-3">자기이해 지수</div>
              <div className="font-serif text-lg">탐구 지도의 채워진 정도</div>
              <p className="mt-1 text-xs leading-relaxed text-ink-3">
                당신의 가치를 매기는 점수가 아니라, 열 영역의 질문 사다리를 얼마나 넓고 깊게, 여러 관점으로, 자기 입장까지 걸어갔는지를 잰 수치예요.
              </p>
              <div className="mt-2 text-xs text-ink-2">
                핵심 세 영역 평균 <span className="font-semibold tabular-nums">{overall.coreIndex}</span> · 전체 평균 <span className="font-semibold tabular-nums">{overall.index}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4 sm:grid-cols-4">
            <Meter label="넓이 · 답한 질문" value={overall.components.coverage} hint="영역별 질문 사다리를 얼마나 밟았는가" />
            <Meter label="깊이 · 구체와 근거" value={overall.components.depth} hint="장면·이유·구조·자기 질문이 있는가" />
            <Meter label="다양성 · 관점" value={overall.components.exploration} hint="다른 관점과 반론을 얼마나 만났는가" />
            <Meter label="확립 · 입장" value={overall.components.commitment} hint="한 문장 입장과 확신도" />
          </div>
        </div>
        <div className="card flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-ink-3">{snapshots.length >= 2 ? '추세' : '핵심 세 영역'}</div>
              <div className="font-serif text-lg">{snapshots.length >= 2 ? `${snapshots.length}일의 기록` : '행복 · 의미 · 즐거움'}</div>
            </div>
            <div className="text-right text-xs text-ink-3">
              <div>만난 관점 {overall.counts.lenses}</div>
              <div>질문 {overall.counts.answered}/{overall.counts.questions}</div>
            </div>
          </div>
          {snapshots.length >= 2 ? (
            <Sparkline points={snapshots.slice(-60).map((s) => s.index)} label="자기이해 지수 추세" />
          ) : (
            <div className="flex flex-col gap-2.5">
              {coreDomains.map((ds) => {
                const d = DOMAINS.find((x) => x.id === ds.domainId)!
                return (
                  <Link key={d.id} to={`/questions/${d.id}`} className="flex items-center gap-3 text-sm hover:text-accent-ink">
                    <span className="font-serif text-ink-2">{d.glyph}</span>
                    <span className="w-24 shrink-0">{d.name}</span>
                    <Bar value={ds.score} max={100} height={6} label={`${d.name} ${ds.score}`} />
                    <span className="w-7 text-right text-xs tabular-nums text-ink-3">{ds.score}</span>
                  </Link>
                )
              })}
              <div className="text-[11px] text-ink-4">며칠 기록이 쌓이면 이 자리에 추세가 보여요.</div>
            </div>
          )}
        </div>
      </section>

      <section>
        <SectionTitle
          action={
            <Link to="/questions" className="text-sm text-ink-3 hover:text-ink">
              모든 질문 →
            </Link>
          }
        >
          다음에 답해볼 질문
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {recs.map((r) => {
            const d = DOMAINS.find((x) => x.id === r.question.domainId)!
            return (
              <Link key={r.question.id} to={`/q/${r.question.id}`} className="card group flex flex-col gap-2 p-4 transition-colors hover:border-accent/40">
                <div className="flex items-center gap-2 text-xs text-ink-3">
                  <span className="font-serif text-base text-ink-2">{d.glyph}</span>
                  <span>{d.name}</span>
                  <span>·</span>
                  <span>{LEVEL_LABELS[r.question.level].name}</span>
                  <span className="ml-auto">
                    <Tag tone={r.kind === 'contrast' ? 'lens' : r.kind === 'synthesize' ? 'accent' : 'neutral'}>{KIND_LABEL[r.kind]}</Tag>
                  </span>
                </div>
                <div className="font-serif text-[15px] leading-snug text-ink group-hover:text-accent-ink">{r.question.title}</div>
                <div className="text-xs leading-relaxed text-ink-3">{r.reasons[0]}</div>
                <div className="mt-auto flex items-center gap-1 text-xs text-ink-4">
                  <Icon name="clock" size={13} /> 약 {r.question.minutes}분
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <SectionTitle>탐구 지도</SectionTitle>
        <div className="card divide-y divide-line">
          {overall.domains
            .map((ds) => ({ ds, d: DOMAINS.find((x) => x.id === ds.domainId)! }))
            .sort((a, b) => a.d.order - b.d.order)
            .map(({ ds, d }) => {
              const nextQ = ds.nextLevel ? QUESTIONS.find((q) => q.domainId === d.id && q.level === ds.nextLevel) : undefined
              return (
                <Link key={d.id} to={`/questions/${d.id}`} className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 px-4 py-3 transition-colors hover:bg-paper-3/50 md:grid-cols-[auto_150px_1fr_auto_auto] md:gap-x-4">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper-3 font-serif text-lg text-ink-2">{d.glyph}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{d.name}</span>
                      {d.core && <Tag tone="accent">핵심</Tag>}
                    </div>
                    <div className="text-[11px] text-ink-3">{STATUS_LABELS[ds.status].name}{ds.recentlyChanged ? ' · 재구성 중' : ''}</div>
                  </div>
                  <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                    <Bar value={ds.score} max={100} height={7} label={`${d.name} ${ds.score}`} />
                    <span className="w-8 text-right text-xs tabular-nums text-ink-2">{ds.score}</span>
                  </div>
                  <div className="col-start-2 md:col-start-auto">
                    <LevelDots done={ds.levelsDone} current={ds.nextLevel} />
                  </div>
                  <div className="col-start-2 truncate text-[11px] text-ink-3 md:col-start-auto md:max-w-[180px]">
                    {ds.answered}/{ds.total} · {nextQ ? `다음: ${LEVEL_LABELS[nextQ.level].name}` : '모든 단계 시작됨'}
                  </div>
                </Link>
              )
            })}
        </div>
      </section>

      {revisits.length > 0 && (
        <section>
          <SectionTitle>다시 읽어볼 답</SectionTitle>
          <div className="grid gap-3 md:grid-cols-3">
            {revisits.map((r) => (
              <Link key={r.question.id} to={`/q/${r.question.id}`} className="card flex flex-col gap-1.5 p-4 hover:border-accent/40">
                <div className="text-xs text-ink-3">{relativeDays(r.answer.updatedAt)} · {DOMAINS.find((d) => d.id === r.question.domainId)?.name}</div>
                <div className="font-serif text-[15px] leading-snug">{r.question.title}</div>
                {r.answer.stance && <div className="text-xs text-ink-2">“{r.answer.stance}”</div>}
                <div className="text-xs text-accent-ink">{r.reason}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-xs leading-relaxed text-ink-4">
        이 작업실의 모든 기록은 이 브라우저에만 저장됩니다. AI 기능은 당신이 버튼을 누를 때만, 당신의 키로 호출됩니다.
      </p>
    </div>
  )
}
