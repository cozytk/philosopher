import { useCallback, useState } from 'react'
import type { ProviderConfig } from '@/types'
import { useStore, monthSpend } from '@/store/useStore'
import { useToast } from '@/ui/toast'
import type { ChatUsage } from '@/llm/client'
import type { Price } from '@/llm/cost'

export function isLlmConfigured(llm: ProviderConfig): boolean {
  if (!llm.model) return false
  if (llm.provider === 'custom') return Boolean(llm.baseUrl)
  return Boolean(llm.apiKey)
}

export function budgetState(llm: ProviderConfig, monthCost: number): { exceeded: boolean; ratio: number } {
  const budget = llm.monthlyBudgetUsd ?? 0
  if (!budget) return { exceeded: false, ratio: 0 }
  return { exceeded: monthCost >= budget, ratio: monthCost / budget }
}

/** Runs an LLM feature with configuration/budget checks, usage accounting and error toasts. */
export function useLlm() {
  const llm = useStore((s) => s.settings.llm)
  const usage = useStore((s) => s.usage)
  const recordUsage = useStore((s) => s.recordUsage)
  const toast = useToast()
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const configured = isLlmConfigured(llm)
  const spend = monthSpend(usage)
  const budget = budgetState(llm, spend)
  const price: Price | undefined = llm.modelPrice

  const run = useCallback(
    async <T,>(feature: string, fn: (config: ProviderConfig, price?: Price) => Promise<{ data: T; usage: ChatUsage }>): Promise<T | null> => {
      setError(null)
      if (!configured) {
        toast('AI를 쓰려면 설정에서 제공자와 모델을 연결하세요.', 'info')
        return null
      }
      if (budget.exceeded && llm.hardCap) {
        toast('이번 달 예산을 넘었어요. 설정에서 예산을 조정하거나 상한을 끄세요.', 'error')
        return null
      }
      setBusy(feature)
      try {
        const res = await fn(llm, price)
        recordUsage(feature, res.usage)
        return res.data
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        setError(msg)
        toast(msg, 'error')
        return null
      } finally {
        setBusy(null)
      }
    },
    [configured, budget.exceeded, llm, price, recordUsage, toast],
  )

  return { run, busy, error, configured, llm, price, spend, budget }
}
