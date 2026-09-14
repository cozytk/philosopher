import { Link, Navigate, useParams } from 'react-router'
import { DOMAIN_MAP, LENS_MAP, LENS_TYPE_LABELS, QUESTION_MAP } from '@/content'
import { Icon } from '@/ui/icons'
import { SectionTitle, Tag } from '@/ui/primitives'
import { useStore } from '@/store/useStore'

export default function LensPage() {
  const { lensId = '' } = useParams()
  const lens = LENS_MAP[lensId]
  const answers = useStore((s) => s.answers)
  if (!lens) return <Navigate to="/library" replace />
  const questions = lens.questionIds.map((id) => QUESTION_MAP[id]).filter(Boolean)
  const contrasts = (lens.contrastsWith ?? []).map((id) => LENS_MAP[id]).filter(Boolean)
  const linkedIn = Object.values(answers).filter((a) => a.linkedLensIds.includes(lens.id))

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-7">
      <Link to="/library" className="inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink">
        <Icon name="chevron-left" size={16} /> 서재
      </Link>
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag tone="lens">{LENS_TYPE_LABELS[lens.type]}</Tag>
          <span className="text-xs text-ink-3">{lens.origin}</span>
        </div>
        <h1 className="h-serif text-2xl md:text-3xl">{lens.name}</h1>
      </header>

      <section className="card p-5">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-3">이 관점이 말하기를</div>
        <p className="font-serif text-[17px] leading-[1.8] text-ink">{lens.position}</p>
        <div className="mt-4 rounded-lg bg-lens-soft px-3 py-2 text-sm text-lens-ink">
          <span className="font-medium">핵심 개념 · </span>
          {lens.keyConcept}
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border-l-4 border-accent bg-accent-soft/60 px-5 py-4">
        <div className="mb-1 text-xs font-medium uppercase tracking-wide text-accent-ink">당신에게 되묻기를</div>
        <p className="font-serif text-[16px] leading-relaxed text-ink">{lens.challenge}</p>
      </section>

      <section>
        <SectionTitle>더 읽기</SectionTitle>
        <ul className="card divide-y divide-line">
          {lens.sources.map((s, i) => (
            <li key={i} className="flex items-start gap-3 px-4 py-2.5 text-sm">
              <Tag>{s.kind}</Tag>
              <span className="text-ink-2">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-line-2 underline-offset-2 hover:text-ink">
                    {s.citation} <Icon name="external" size={12} className="inline" />
                  </a>
                ) : (
                  s.citation
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>이 관점으로 답해보기</SectionTitle>
        <ul className="card divide-y divide-line">
          {questions.map((q) => (
            <li key={q.id}>
              <Link to={`/q/${q.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-paper-3/40">
                <span className="font-serif text-ink-3">{DOMAIN_MAP[q.domainId]?.glyph}</span>
                <span className="flex-1 font-serif text-[15px] leading-snug">{q.title}</span>
                {answers[q.id]?.linkedLensIds.includes(lens.id) && <Tag tone="lens">연결됨</Tag>}
                <Icon name="chevron-right" size={16} className="text-ink-4" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {contrasts.length > 0 && (
        <section>
          <SectionTitle>맞서는 관점</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {contrasts.map((c) => (
              <Link key={c.id} to={`/library/${c.id}`} className="card p-4 hover:border-lens/50">
                <div className="font-serif font-semibold">{c.name}</div>
                <p className="mt-1 line-clamp-2 text-xs text-ink-2">{c.position}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-1.5">
        {lens.tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
      {linkedIn.length > 0 && <p className="text-xs text-ink-3">당신은 이 관점을 {linkedIn.length}개의 답에 연결했어요.</p>}
    </div>
  )
}
