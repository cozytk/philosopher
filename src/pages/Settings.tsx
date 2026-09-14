import { useRef, useState } from 'react'
import { useStore, monthSpend, type ExportBundle } from '@/store/useStore'
import { ProviderSetup } from '@/ui/ProviderSetup'
import { Modal, SectionTitle, Segmented, StatTile } from '@/ui/primitives'
import { Icon } from '@/ui/icons'
import { formatUsd, formatKrw } from '@/llm/cost'
import { useToast } from '@/ui/toast'
import { formatDate } from '@/lib/dates'

export default function SettingsPage() {
  const settings = useStore((s) => s.settings)
  const usage = useStore((s) => s.usage)
  const updateSettings = useStore((s) => s.updateSettings)
  const setLlm = useStore((s) => s.setLlm)
  const exportData = useStore((s) => s.exportData)
  const importData = useStore((s) => s.importData)
  const resetAll = useStore((s) => s.resetAll)
  const toast = useToast()
  const fileRef = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<ExportBundle | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetText, setResetText] = useState('')
  const spend = monthSpend(usage)

  function download() {
    const bundle = exportData()
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `philosopher-${formatDate(new Date()).replace(/\./g, '')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      const text = await f.text()
      const bundle = JSON.parse(text) as ExportBundle
      if (bundle.app !== 'philosopher' || !bundle.data) throw new Error('Philosopher 내보내기 파일이 아니에요.')
      setPending(bundle)
    } catch (err) {
      toast(err instanceof Error ? err.message : String(err), 'error')
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="h-serif text-2xl md:text-3xl">설정</h1>
        <p className="mt-1 text-sm text-ink-2">AI는 선택 사항입니다. 연결하지 않아도 질문·관점·지도·도구·문서는 모두 동작해요.</p>
      </header>

      <section>
        <SectionTitle>AI 연결</SectionTitle>
        <div className="card p-4 md:p-5">
          <ProviderSetup />
        </div>
      </section>

      <section>
        <SectionTitle>비용</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          <StatTile label="이번 달" value={formatUsd(spend)} sub={formatKrw(spend)} />
          <StatTile label="누적 호출" value={usage.calls} sub={`${(usage.promptTokens + usage.completionTokens).toLocaleString('ko-KR')} 토큰`} />
          <StatTile label="누적 비용" value={formatUsd(usage.costUsd)} sub="OpenRouter는 실제, 그 외는 추정" />
        </div>
        <div className="card mt-3 flex flex-col gap-3 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="budget">월 예산 (USD)</label>
              <input id="budget" type="number" min={0} step={0.5} className="input" value={settings.llm.monthlyBudgetUsd ?? 0} onChange={(e) => setLlm({ monthlyBudgetUsd: Number(e.target.value) || 0 })} />
            </div>
            <label className="flex items-center gap-2 self-end pb-2 text-sm">
              <input type="checkbox" checked={Boolean(settings.llm.hardCap)} onChange={(e) => setLlm({ hardCap: e.target.checked })} />
              예산을 넘으면 AI 호출 차단
            </label>
          </div>
          {Object.keys(usage.byFeature).length > 0 && (
            <table className="w-full text-xs">
              <thead className="text-ink-3">
                <tr><th className="py-1 text-left font-normal">기능</th><th className="py-1 text-right font-normal">호출</th><th className="py-1 text-right font-normal">비용</th></tr>
              </thead>
              <tbody>
                {Object.entries(usage.byFeature).map(([k, v]) => (
                  <tr key={k} className="border-t border-line"><td className="py-1">{({ reflect: '성찰', dialogue: '대화', synthesize: '철학 초안', test: '연결 확인' } as Record<string, string>)[k] ?? k}</td><td className="py-1 text-right tabular-nums">{v.calls}</td><td className="py-1 text-right tabular-nums">{formatUsd(v.costUsd)}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="text-[11px] leading-relaxed text-ink-4">비용을 낮게 유지하는 설계: 관점 추천·점수·다음 질문·도구는 모두 로컬 계산이고, AI는 버튼을 누를 때만 짧은 프롬프트로 한 번 호출됩니다. 같은 글에 대한 성찰은 다시 호출하지 않아요.</p>
        </div>
      </section>

      <section>
        <SectionTitle>화면과 쓰기</SectionTitle>
        <div className="card flex flex-col gap-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm">테마</span>
            <Segmented value={settings.theme} onChange={(v) => updateSettings({ theme: v })} options={[{ value: 'system', label: '시스템' }, { value: 'light', label: '밝게' }, { value: 'dark', label: '어둡게' }]} />
          </div>
          <label className="flex items-center justify-between gap-2 text-sm">
            <span>질문 아래에 글쓰기 단서 보이기</span>
            <input type="checkbox" checked={settings.showTips} onChange={(e) => updateSettings({ showTips: e.target.checked })} />
          </label>
          <div className="flex items-center justify-between gap-2 text-sm">
            <label htmlFor="timer">집중 타이머 (분)</label>
            <input id="timer" type="number" min={5} max={60} className="input w-24" value={settings.timerMinutes} onChange={(e) => updateSettings({ timerMinutes: Math.max(5, Math.min(60, Number(e.target.value) || 15)) })} />
          </div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <label htmlFor="name">이름 (선택)</label>
            <input id="name" className="input w-48" placeholder="문서와 인사에 쓰여요" value={settings.displayName ?? ''} onChange={(e) => updateSettings({ displayName: e.target.value || undefined })} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>데이터</SectionTitle>
        <div className="card flex flex-col gap-3 p-4 text-sm">
          <p className="text-xs leading-relaxed text-ink-2">모든 기록은 이 브라우저의 저장소(IndexedDB)에만 있습니다. 브라우저 데이터를 지우거나 기기를 바꾸면 사라지니 가끔 내보내두세요. 내보내기 파일에는 API 키가 포함되지 않아요.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={download}><Icon name="download" size={14} /> JSON으로 내보내기</button>
            <button type="button" className="btn-secondary" onClick={() => fileRef.current?.click()}><Icon name="upload" size={14} /> 가져오기</button>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onFile} />
            <button type="button" className="btn-ghost text-bad" onClick={() => setConfirmReset(true)}><Icon name="trash" size={14} /> 모두 지우기</button>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>안내</SectionTitle>
        <div className="card flex flex-col gap-2 p-4 text-xs leading-relaxed text-ink-2">
          <p>이 작업실은 치료나 상담을 대신하지 않습니다. 반추가 깊어지거나 위기감이 들면 사람에게 연락하세요: 자살예방상담전화 <strong>109</strong>, 정신건강위기상담 <strong>1577-0199</strong>, 청소년 <strong>1388</strong>.</p>
          <p>서재의 관점들은 원전과 논문을 요약한 것으로, 정확성을 위해 애썼지만 요약은 요약입니다. 중요한 인용은 출처에서 직접 확인하세요.</p>
          <p>점수는 당신을 평가하지 않습니다. 열 영역의 질문 사다리를 얼마나 걸어갔는지를 잰 ‘지도의 채워진 정도’일 뿐이에요.</p>
        </div>
      </section>

      <Modal open={pending !== null} onClose={() => setPending(null)} title="가져오기">
        {pending && (
          <div className="flex flex-col gap-3 text-sm">
            <p>{formatDate(pending.exportedAt, true)}에 내보낸 파일 · 답 {Object.keys(pending.data.answers ?? {}).length}개 · 즐거움 기록 {(pending.data.joyLogs ?? []).length}개</p>
            <div className="flex flex-col gap-2">
              <button type="button" className="btn-primary" onClick={() => { importData(pending, 'merge'); setPending(null); toast('합쳤어요. 더 최근 것이 우선됩니다.', 'success') }}>
                현재 기록과 합치기 (권장)
              </button>
              <button type="button" className="btn-secondary" onClick={() => { importData(pending, 'replace'); setPending(null); toast('교체했어요.', 'success') }}>
                현재 기록을 버리고 교체하기
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="모두 지우기">
        <div className="flex flex-col gap-3 text-sm">
          <p>답, 기록, 문서, 설정이 모두 사라지고 되돌릴 수 없어요. 먼저 내보내기를 권합니다. 확인하려면 <strong>삭제</strong>라고 입력하세요.</p>
          <input className="input" value={resetText} onChange={(e) => setResetText(e.target.value)} placeholder="삭제" />
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => setConfirmReset(false)}>취소</button>
            <button type="button" className="btn-primary bg-bad hover:bg-bad" disabled={resetText !== '삭제'} onClick={() => { resetAll(); setConfirmReset(false); setResetText(''); toast('모두 지웠어요.', 'success') }}>
              지우기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
