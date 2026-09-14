import { Suspense, lazy, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router'
import { Layout } from './ui/Layout'
import { ToastProvider, useToast } from './ui/toast'
import { useStore } from './store/useStore'
import { applyTheme } from './ui/theme'
import { clearCodeFromUrl, exchangeOpenRouterCode, pendingConfigHandoff, pendingOpenRouterCode } from './llm/pkce'
import { Spinner } from './ui/primitives'
import HomePage from './pages/Home'
import QuestionsPage from './pages/Questions'
import DomainPage from './pages/Domain'
import QuestionPage from './pages/QuestionPage'
import LibraryPage from './pages/Library'
import LensPage from './pages/LensPage'
import ToolsPage from './pages/Tools'
import SettingsPage from './pages/Settings'
import OnboardingPage from './pages/Onboarding'

const PhilosophyPage = lazy(() => import('./pages/Philosophy'))
import ValuesSortTool from './tools/ValuesSort'
import JoyLogTool from './tools/JoyLog'
import CheckinTool from './tools/Checkin'

function OAuthReturn() {
  const setLlm = useStore((s) => s.setLlm)
  const toast = useToast()
  useEffect(() => {
    const handoff = pendingConfigHandoff()
    if (handoff) {
      setLlm({
        ...(handoff.provider ? { provider: handoff.provider } : {}),
        ...(handoff.apiKey ? { apiKey: handoff.apiKey, keySource: 'manual' as const } : {}),
        ...(handoff.model ? { model: handoff.model, modelPrice: undefined } : {}),
      })
      toast(handoff.apiKey ? 'API 키와 모델이 연결됐어요. 주소에서 키는 지웠습니다.' : '모델이 설정됐어요.', 'success')
    }
    const code = pendingOpenRouterCode()
    if (!code) return
    ;(async () => {
      try {
        const key = await exchangeOpenRouterCode(code)
        setLlm({ provider: 'openrouter', apiKey: key, keySource: 'oauth' })
        toast('OpenRouter 계정이 연결됐어요. 모델을 골라주세요.', 'success')
        clearCodeFromUrl()
        window.location.hash = '#/settings?connected=1'
      } catch (e) {
        toast(e instanceof Error ? e.message : String(e), 'error')
        clearCodeFromUrl()
      }
    })()
  }, [setLlm, toast])
  return null
}

function ThemeSync() {
  const theme = useStore((s) => s.settings.theme)
  useEffect(() => applyTheme(theme), [theme])
  return null
}

function Gate() {
  const hydrated = useStore((s) => s.hydrated)
  const onboarded = useStore((s) => s.settings.onboarded)
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setSlow(true), 1500)
    // If storage is blocked (private mode, sandboxed preview), keep the app usable without persistence.
    const fallback = window.setTimeout(() => {
      if (!useStore.getState().hydrated) useStore.getState().setHydrated(true)
    }, 4000)
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(fallback)
    }
  }, [])
  if (!hydrated) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper text-ink-3">
        <div className="flex flex-col items-center gap-3">
          <Spinner size={22} />
          {slow && <span className="text-sm">기록을 불러오는 중…</span>}
        </div>
      </div>
    )
  }
  return (
    <Routes>
      <Route path="/welcome" element={<OnboardingPage />} />
      <Route element={<Layout />}>
        <Route index element={onboarded ? <HomePage /> : <Navigate to="/welcome" replace />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="questions/:domainId" element={<DomainPage />} />
        <Route path="q/:questionId" element={<QuestionPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="library/:lensId" element={<LensPage />} />
        <Route path="tools" element={<ToolsPage />} />
        <Route path="tools/values" element={<ValuesSortTool />} />
        <Route path="tools/joy" element={<JoyLogTool />} />
        <Route path="tools/checkin" element={<CheckinTool />} />
        <Route
          path="philosophy"
          element={
            <Suspense fallback={<div className="grid place-items-center py-20"><Spinner size={20} /></div>}>
              <PhilosophyPage />
            </Suspense>
          }
        />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <ThemeSync />
        <OAuthReturn />
        <Gate />
      </HashRouter>
    </ToastProvider>
  )
}
