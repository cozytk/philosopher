import { useEffect, useMemo, useState } from 'react'
import type { ProviderId } from '@/types'
import { useStore } from '@/store/useStore'
import { beginOpenRouterLogin } from '@/llm/pkce'
import { fetchModels, pickDefaultModel, type ModelInfo } from '@/llm/models'
import { testConnection } from '@/llm/client'
import { formatUsd } from '@/llm/cost'
import { Icon } from './icons'
import { Segmented, Spinner } from './primitives'
import { useToast } from './toast'

export function ProviderSetup({ compact = false }: { compact?: boolean }) {
  const llm = useStore((s) => s.settings.llm)
  const setLlm = useStore((s) => s.setLlm)
  const toast = useToast()
  const [models, setModels] = useState<ModelInfo[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [filter, setFilter] = useState('')
  const [freeOnly, setFreeOnly] = useState(false)
  const [showKey, setShowKey] = useState(false)

  const canFetch = llm.provider === 'openrouter' || (llm.provider === 'openai' && llm.apiKey) || (llm.provider === 'custom' && llm.baseUrl)

  async function loadModels(auto = false) {
    if (!canFetch) return
    setLoading(true)
    try {
      const list = await fetchModels(llm)
      setModels(list)
      if (!llm.model || !list.some((m) => m.id === llm.model)) {
        const pick = pickDefaultModel(llm.provider, list)
        if (pick) {
          const info = list.find((m) => m.id === pick)
          setLlm({ model: pick, modelPrice: info?.price })
        }
      } else {
        const info = list.find((m) => m.id === llm.model)
        if (info?.price) setLlm({ modelPrice: info.price })
      }
      if (!auto) toast(`${list.length}개의 모델을 불러왔어요.`, 'success')
    } catch (e) {
      if (!auto) toast(e instanceof Error ? e.message : String(e), 'error')
    } finally {
      setLoading(false)
    }
  }

  // Auto-load once when a provider becomes usable.
  useEffect(() => {
    if (models !== null || !canFetch || loading) return
    const t = window.setTimeout(() => void loadModels(true), 0)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [llm.provider, llm.apiKey, llm.baseUrl])

  const visible = useMemo(() => {
    if (!models) return []
    const f = filter.trim().toLowerCase()
    return models.filter((m) => (!freeOnly || m.free) && (!f || m.id.toLowerCase().includes(f) || m.name.toLowerCase().includes(f))).slice(0, 80)
  }, [models, filter, freeOnly])

  async function test() {
    setTesting(true)
    try {
      const r = await testConnection(llm, llm.modelPrice)
      toast(`연결 성공 · ${r.model} · 비용 ${formatUsd(r.usage.costUsd)}`, 'success')
      useStore.getState().recordUsage('test', r.usage)
    } catch (e) {
      toast(e instanceof Error ? e.message : String(e), 'error')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Segmented<ProviderId>
        value={llm.provider}
        onChange={(p) => {
          setLlm({ provider: p, model: undefined, modelPrice: undefined })
          setModels(null)
        }}
        options={[
          { value: 'openrouter', label: 'OpenRouter' },
          { value: 'openai', label: 'OpenAI' },
          { value: 'custom', label: '직접 지정 (로컬/호환)' },
        ]}
        size="md"
      />

      {llm.provider === 'openrouter' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs leading-relaxed text-ink-2">
            하나의 키로 수백 개 모델을 씁니다. 무료 모델(:free)도 있고, 유료 모델도 한 번의 성찰에 보통 수 원 이하예요. 로그인하면 이 앱 전용 키가 발급되고, 키는 이 브라우저에만 저장됩니다.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn-primary" onClick={() => void beginOpenRouterLogin({ limitUsd: 5 })}>
              <Icon name="external" size={14} /> OpenRouter로 로그인 (키 자동 발급)
            </button>
            <span className="text-xs text-ink-3">또는</span>
            <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="text-xs text-ink-2 underline decoration-line-2 underline-offset-2">
              openrouter.ai/keys에서 키 만들기
            </a>
          </div>
          <KeyInput value={llm.apiKey ?? ''} onChange={(v) => setLlm({ apiKey: v || undefined, keySource: 'manual' })} placeholder="sk-or-v1-…" show={showKey} setShow={setShowKey} />
          {llm.keySource === 'oauth' && llm.apiKey && <div className="text-[11px] text-good">로그인으로 발급된 키가 연결되어 있어요.</div>}
        </div>
      )}

      {llm.provider === 'openai' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs leading-relaxed text-ink-2">
            OpenAI API 키를 직접 씁니다. 참고: “ChatGPT로 로그인(Sign in with ChatGPT)”은 아직 OpenAI가 서드파티 앱에 열어두지 않아 여기서는 지원하지 않습니다. 열리면 OpenRouter 로그인과 같은 방식으로 추가될 예정이에요.
          </p>
          <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-xs text-ink-2 underline decoration-line-2 underline-offset-2">
            platform.openai.com/api-keys에서 키 만들기
          </a>
          <KeyInput value={llm.apiKey ?? ''} onChange={(v) => setLlm({ apiKey: v || undefined })} placeholder="sk-…" show={showKey} setShow={setShowKey} />
        </div>
      )}

      {llm.provider === 'custom' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs leading-relaxed text-ink-2">
            OpenAI 호환 엔드포인트라면 무엇이든. 로컬 모델(Ollama, LM Studio)이면 비용이 0이에요. Ollama는 <code className="rounded bg-paper-3 px-1">OLLAMA_ORIGINS=*</code>로 실행해야 브라우저에서 접근됩니다. 직접 운영하는 프록시(예: 다른 계정 인증을 대신하는 서버)도 여기에 연결하면 됩니다.
          </p>
          <div>
            <label className="label" htmlFor="baseUrl">Base URL</label>
            <input id="baseUrl" className="input font-mono text-xs" placeholder="http://localhost:11434/v1" value={llm.baseUrl ?? ''} onChange={(e) => setLlm({ baseUrl: e.target.value.trim() || undefined })} />
          </div>
          <KeyInput value={llm.apiKey ?? ''} onChange={(v) => setLlm({ apiKey: v || undefined })} placeholder="필요한 경우에만" show={showKey} setShow={setShowKey} />
        </div>
      )}

      <div className="flex flex-col gap-2 rounded-lg border border-line bg-paper-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">모델</div>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-secondary px-2 py-1 text-xs" onClick={() => void loadModels()} disabled={!canFetch || loading}>
              {loading ? <Spinner size={12} /> : <Icon name="refresh" size={13} />} 목록 불러오기
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 md:flex-row md:items-center">
          <input className="input font-mono text-xs" placeholder={llm.provider === 'openrouter' ? 'openai/gpt-4o-mini' : llm.provider === 'openai' ? 'gpt-4o-mini' : 'llama3.2'} value={llm.model ?? ''} onChange={(e) => setLlm({ model: e.target.value.trim() || undefined, modelPrice: models?.find((m) => m.id === e.target.value.trim())?.price })} />
          {llm.modelPrice && (
            <span className="shrink-0 text-[11px] text-ink-3">
              입력 {formatUsd(llm.modelPrice.prompt)} · 출력 {formatUsd(llm.modelPrice.completion)} / 1M 토큰
            </span>
          )}
        </div>
        {models && models.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <input className="input py-1 text-xs" placeholder="모델 검색" value={filter} onChange={(e) => setFilter(e.target.value)} />
              {llm.provider === 'openrouter' && (
                <label className="flex shrink-0 items-center gap-1 text-xs text-ink-2">
                  <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} /> 무료만
                </label>
              )}
            </div>
            <div className="scroll-thin max-h-48 overflow-y-auto rounded-md border border-line">
              {visible.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setLlm({ model: m.id, modelPrice: m.price })}
                  className={'flex w-full items-center justify-between gap-2 px-2.5 py-1.5 text-left text-xs hover:bg-paper-3 ' + (m.id === llm.model ? 'bg-accent-soft' : '')}
                >
                  <span className="min-w-0 truncate font-mono">{m.id}</span>
                  <span className="shrink-0 text-ink-3">{m.free ? '무료' : m.price ? `${formatUsd(m.price.prompt)} / ${formatUsd(m.price.completion)}` : ''}</span>
                </button>
              ))}
              {visible.length === 0 && <div className="px-3 py-3 text-xs text-ink-4">일치하는 모델이 없어요</div>}
            </div>
            <div className="text-[10px] text-ink-4">가격은 1M 토큰당 USD. 저렴한 순으로 정렬. 성찰 한 번은 보통 2~4K 토큰을 씁니다.</div>
          </div>
        )}
        {!compact && (
          <button type="button" className="btn-secondary self-start" onClick={() => void test()} disabled={testing || !llm.model || (!llm.apiKey && llm.provider !== 'custom')}>
            {testing ? <Spinner size={12} /> : <Icon name="check" size={13} />} 연결 확인
          </button>
        )}
      </div>
    </div>
  )
}

function KeyInput({ value, onChange, placeholder, show, setShow }: { value: string; onChange: (v: string) => void; placeholder: string; show: boolean; setShow: (v: boolean) => void }) {
  return (
    <div>
      <label className="label" htmlFor="apikey">API 키</label>
      <div className="flex gap-2">
        <input id="apikey" type={show ? 'text' : 'password'} className="input font-mono text-xs" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value.trim())} autoComplete="off" spellCheck={false} />
        <button type="button" className="btn-secondary shrink-0 px-2" onClick={() => setShow(!show)}>{show ? '숨기기' : '보기'}</button>
      </div>
    </div>
  )
}
