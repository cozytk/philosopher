import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import Markdown from 'react-markdown'
import { DOMAINS, QUESTION_MAP, VALUE_MAP } from '@/content'
import { useStore } from '@/store/useStore'
import { useLlm } from '@/hooks/useLlm'
import { synthesizePhilosophy } from '@/llm/features'
import { buildSynthesisMessages, type SynthesisInput } from '@/llm/prompts'
import { estimateTokens, truncate } from '@/lib/text'
import { estimateCostUsd, formatUsd } from '@/llm/cost'
import { formatDate } from '@/lib/dates'
import { Icon } from '@/ui/icons'
import { EmptyState, Modal, SectionTitle, Segmented, Spinner, Tag } from '@/ui/primitives'
import { useToast } from '@/ui/toast'
import type { Answer, Question } from '@/types'

const EMPTY_VALUES: string[] = []

interface Entry {
  answer: Answer
  question: Question
}

function compileOutline(entries: Entry[], values: string[], name?: string): string {
  const lines: string[] = []
  lines.push(`# ${name ? `${name}의 철학` : '나의 철학'}`)
  lines.push(`_${formatDate(new Date())} 기준 · 입장 ${entries.length}개_`)
  lines.push('')
  if (values.length) {
    lines.push('## 핵심 가치')
    values.forEach((v, i) => lines.push(`${i + 1}. ${VALUE_MAP[v]?.name ?? v}`))
    lines.push('')
  }
  for (const d of DOMAINS) {
    const es = entries.filter((e) => e.question.domainId === d.id).sort((a, b) => b.question.level - a.question.level)
    if (es.length === 0) continue
    lines.push(`## ${d.name}`)
    for (const e of es) {
      lines.push(`> ${e.answer.stance}`)
      lines.push(`> — 확신도 ${e.answer.confidence ?? 50} · ${formatDate(e.answer.updatedAt)} · ${truncate(e.question.title, 40)}`)
      lines.push('')
      if (e.answer.openQuestions.length) lines.push(`열린 질문: ${e.answer.openQuestions.join(' / ')}`)
      lines.push('')
    }
  }
  const open = entries.flatMap((e) => e.answer.openQuestions)
  if (open.length) {
    lines.push('## 아직 열린 질문')
    for (const q of open.slice(0, 12)) lines.push(`- ${q}`)
    lines.push('')
  }
  lines.push('_이 문서는 입장들을 모은 초안입니다. 당신의 말로 고쳐 쓰세요._')
  return lines.join('\n')
}

export default function PhilosophyPage() {
  const answers = useStore((s) => s.answers)
  const doc = useStore((s) => s.doc)
  const setDoc = useStore((s) => s.setDoc)
  const valuesResult = useStore((s) => s.valuesResult)
  const displayName = useStore((s) => s.settings.displayName)
  const { run, busy, configured, price } = useLlm()
  const toast = useToast()
  const [content, setContent] = useState(doc.content)
  const [mode, setMode] = useState<'edit' | 'preview'>(doc.content ? 'preview' : 'edit')
  const [showVersions, setShowVersions] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(window.innerHeight * 0.55, el.scrollHeight)}px`
  }, [content, mode])

  useEffect(() => {
    if (content === doc.content) return
    const t = window.setTimeout(() => setDoc(content, 'manual'), 800)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  const entries = useMemo<Entry[]>(
    () =>
      Object.values(answers)
        .filter((a) => a.stance && a.stance.trim().length >= 8)
        .map((a) => ({ answer: a, question: QUESTION_MAP[a.questionId] }))
        .filter((e): e is Entry => Boolean(e.question))
        .sort((x, y) => {
          const dx = DOMAINS.findIndex((d) => d.id === x.question.domainId)
          const dy = DOMAINS.findIndex((d) => d.id === y.question.domainId)
          return dx - dy || y.question.level - x.question.level
        }),
    [answers],
  )
  const values = useMemo(() => valuesResult?.top ?? EMPTY_VALUES, [valuesResult])

  const synthesisInput = useMemo<SynthesisInput>(
    () => ({
      entries: entries.map((e) => ({
        domain: DOMAINS.find((d) => d.id === e.question.domainId)?.name ?? e.question.domainId,
        title: e.question.title,
        stance: e.answer.stance ?? '',
        confidence: e.answer.confidence,
        openQuestions: e.answer.openQuestions,
        excerpt: e.answer.text.slice(0, 300),
      })),
      values: values.map((v) => VALUE_MAP[v]?.name ?? v),
      displayName,
    }),
    [entries, values, displayName],
  )
  const aiEstimate = useMemo(() => {
    const tokens = estimateTokens(buildSynthesisMessages(synthesisInput).map((m) => m.content).join('\n'))
    return estimateCostUsd(price, tokens, 4000)
  }, [synthesisInput, price])

  function insertCompiled() {
    const md = compileOutline(entries, values, displayName)
    setContent((prev) => (prev.trim() ? prev.trimEnd() + '\n\n---\n\n' + md : md))
    setMode('edit')
    toast('입장들을 문서에 모았어요.', 'success')
  }

  async function aiDraft() {
    if (entries.length < 3) {
      toast('입장이 3개 이상 있어야 초안을 만들 수 있어요.', 'info')
      return
    }
    const data = await run('synthesize', (config, p) => synthesizePhilosophy(config, synthesisInput, p))
    if (data) {
      if (content.trim()) setDoc(content, 'manual')
      setContent(data)
      setMode('preview')
      toast('AI 초안이 준비됐어요. 당신의 말로 고쳐 쓰세요.', 'success')
    }
  }

  function download() {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `my-philosophy-${formatDate(new Date()).replace(/\./g, '')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(content)
      toast('복사했어요.', 'success')
    } catch {
      toast('복사에 실패했어요.', 'error')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="h-serif text-2xl md:text-3xl">나의 철학</h1>
          <p className="mt-1 text-sm text-ink-2">질문마다 세운 입장들이 여기서 하나의 문서가 됩니다. 살아 있는 문서예요—바뀌면 이전 판이 남습니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={insertCompiled} disabled={entries.length === 0}>
            <Icon name="scroll" size={14} /> 입장 모아 넣기 (무료)
          </button>
          <button type="button" className="btn-primary" onClick={() => void aiDraft()} disabled={busy !== null || !configured || entries.length < 3} title={!configured ? 'AI를 연결하면 쓸 수 있어요' : entries.length < 3 ? '입장이 3개 이상 필요해요' : ''}>
            {busy === 'synthesize' ? <Spinner size={14} /> : <Icon name="sparkles" size={14} />} AI 초안 {configured && entries.length >= 3 ? `(≤ ${formatUsd(aiEstimate)})` : ''}
          </button>
        </div>
      </header>

      {entries.length === 0 && !content ? (
        <EmptyState
          title="아직 세운 입장이 없어요"
          desc="질문에 답하면서 ‘지금 나의 입장 — 한 문장’을 채우면 여기에 모입니다. 종합(4단계) 질문의 입장이 특히 중요해요."
          action={<Link to="/questions" className="btn-primary">질문으로 가기</Link>}
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
            <SectionTitle>재료 · 입장 {entries.length}개</SectionTitle>
            <div className="scroll-thin card max-h-[70vh] divide-y divide-line overflow-y-auto">
              {values.length > 0 && (
                <div className="px-3 py-2.5">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">핵심 가치</div>
                  <div className="flex flex-wrap gap-1">{values.map((v, i) => <Tag key={v}>{i + 1}. {VALUE_MAP[v]?.name}</Tag>)}</div>
                </div>
              )}
              {DOMAINS.map((d) => {
                const es = entries.filter((e) => e.question.domainId === d.id)
                if (es.length === 0) return null
                return (
                  <div key={d.id} className="px-3 py-2.5">
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-3"><span className="font-serif text-sm">{d.glyph}</span>{d.name}</div>
                    {es.map((e) => (
                      <Link key={e.question.id} to={`/q/${e.question.id}`} className="block rounded-md px-1.5 py-1 text-xs hover:bg-paper-3">
                        <div className="font-serif text-[13px] leading-snug text-ink">“{e.answer.stance}”</div>
                        <div className="text-[10px] text-ink-4">{e.question.level}단계 · 확신 {e.answer.confidence ?? 50} · {formatDate(e.answer.updatedAt)}</div>
                      </Link>
                    ))}
                  </div>
                )
              })}
            </div>
          </aside>

          <section className="flex min-w-0 flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Segmented value={mode} onChange={setMode} options={[{ value: 'edit', label: '쓰기' }, { value: 'preview', label: '읽기' }]} />
              <div className="flex items-center gap-1">
                <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => setShowVersions(true)} disabled={doc.versions.length === 0}><Icon name="history" size={13} /> 이전 판 {doc.versions.length}</button>
                <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={() => void copy()} disabled={!content}><Icon name="copy" size={13} /> 복사</button>
                <button type="button" className="btn-ghost px-2 py-1 text-xs" onClick={download} disabled={!content}><Icon name="download" size={13} /> .md</button>
              </div>
            </div>
            <div className="card min-h-[60vh] p-5 md:p-8">
              {mode === 'edit' ? (
                <textarea ref={textareaRef} className="editor min-h-[55vh] font-sans text-[15px] leading-relaxed" value={content} onChange={(e) => setContent(e.target.value)} placeholder="여기에 당신의 철학을 씁니다. 마크다운을 쓸 수 있어요. 오른쪽 위 ‘입장 모아 넣기’로 시작해도 좋습니다." spellCheck={false} />
              ) : content ? (
                <div className="md"><Markdown>{content}</Markdown></div>
              ) : (
                <div className="py-10 text-center text-sm text-ink-4">아직 비어 있어요. ‘쓰기’로 바꿔 시작하세요.</div>
              )}
            </div>
            <div className="text-[11px] text-ink-4">마지막 저장 {formatDate(doc.updatedAt, true)} · 자동 저장</div>
          </section>
        </div>
      )}

      <Modal open={showVersions} onClose={() => setShowVersions(false)} title="이전 판" wide>
        <ul className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
          {[...doc.versions].reverse().map((v, i) => (
            <li key={v.at + i} className="rounded-lg border border-line p-3">
              <div className="flex items-center justify-between text-xs text-ink-3">
                <span>{formatDate(v.at, true)} · {v.source === 'ai' ? 'AI 초안' : '직접 작성'} · {v.content.length}자</span>
                <button type="button" className="btn-secondary px-2 py-1 text-xs" onClick={() => { setContent(v.content); setShowVersions(false); setMode('edit') }}>이 판으로 되돌리기</button>
              </div>
              <pre className="mt-2 max-h-32 overflow-hidden whitespace-pre-wrap text-xs text-ink-2">{truncate(v.content, 500)}</pre>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  )
}
