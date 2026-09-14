import { useState } from 'react'
import { useNavigate } from 'react-router'
import { QUESTION_MAP, STARTER_QUESTION_IDS, DOMAIN_MAP } from '@/content'
import { useStore } from '@/store/useStore'
import { ProviderSetup } from '@/ui/ProviderSetup'
import { Icon } from '@/ui/icons'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const updateSettings = useStore((s) => s.updateSettings)
  const displayName = useStore((s) => s.settings.displayName)
  const [step, setStep] = useState(0)
  const [name, setName] = useState(displayName ?? '')

  function finish(to: string) {
    updateSettings({ onboarded: true, displayName: name.trim() || undefined })
    navigate(to)
  }

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-5 py-10">
        <div className="mb-8 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-paper"><span className="h-3 w-3 rounded-full border-2 border-paper" /></span>
          <span className="font-serif text-lg font-semibold">Philosopher</span>
          <span className="ml-auto text-xs text-ink-4">{step + 1} / 4</span>
        </div>

        {step === 0 && (
          <div className="rise flex flex-col gap-5">
            <h1 className="h-serif text-3xl leading-tight md:text-4xl">나를 이해하고, 나의 철학을 세우는 작업실.</h1>
            <p className="text-[15px] leading-relaxed text-ink-2">
              행복은 무엇인가. 삶의 목적은 무엇인가. 나는 무엇을 할 때 즐거운가. 이런 질문에 한 번에 답할 수는 없습니다. 대신 경험을 모으고, 말을 정의하고, 다른 관점과 맞붙고, 입장을 세우는 일을 반복할 수는 있어요. 이곳은 그 반복을 위한 곳입니다.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-ink-2">
              <li className="flex gap-2"><span className="text-accent">●</span> 95개의 질문이 열 영역, 네 단계의 사다리로 놓여 있어요.</li>
              <li className="flex gap-2"><span className="text-lens">●</span> 112개의 관점—사상가, 전통, 연구—이 당신의 글에 맞춰 되묻습니다.</li>
              <li className="flex gap-2"><span className="text-ink-3">●</span> 지도가 지금 어디까지 왔는지, 다음에 어떤 질문에 답해야 하는지 보여줘요.</li>
            </ul>
            <div>
              <label className="label" htmlFor="name">어떻게 불러드릴까요? (선택)</label>
              <input id="name" className="input max-w-xs" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 또는 별명" />
            </div>
            <p className="text-xs text-ink-4">모든 기록은 이 브라우저에만 저장됩니다. 서버로 보내지 않아요.</p>
            <button type="button" className="btn-primary self-start" onClick={() => setStep(1)}>다음 <Icon name="chevron-right" size={14} /></button>
          </div>
        )}

        {step === 1 && (
          <div className="rise flex flex-col gap-5">
            <h2 className="h-serif text-2xl">어떻게 움직이나</h2>
            <ol className="flex flex-col gap-3">
              {[
                ['경험', '구체적인 장면부터. “행복했던 순간 세 장면”처럼 ‘무엇’을 묻는 질문에서 시작합니다.'],
                ['정의', '당신이 쓰는 말을 당신이 정의합니다. 행복은 쾌락인가, 만족인가, 의미인가.'],
                ['대조', '다른 관점—아리스토텔레스, 불교, 심리학 실험—과 맞붙습니다. 서재가 되묻습니다.'],
                ['종합', '“행복이란 ___이다”를 당신의 말로 쓰고, 그 정의가 배제하는 것까지 씁니다.'],
              ].map(([t, d], i) => (
                <li key={t} className="card flex gap-3 p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">{i + 1}</span>
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-sm text-ink-2">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm leading-relaxed text-ink-2">
              열 영역마다 이 네 단계를 밟습니다. <strong>자기이해 지수</strong>는 넓이(답한 질문), 깊이(구체성과 근거), 다양성(만난 관점), 확립(세운 입장)을 합친 지도의 채워진 정도예요. 입장은 시간이 지나면 바뀌고, 바뀐 기록이 남습니다. 그것이 철학이 자라는 모양입니다.
            </p>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary" onClick={() => setStep(0)}>이전</button>
              <button type="button" className="btn-primary" onClick={() => setStep(2)}>다음 <Icon name="chevron-right" size={14} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="rise flex flex-col gap-5">
            <h2 className="h-serif text-2xl">AI 대화 상대 (선택)</h2>
            <p className="text-sm leading-relaxed text-ink-2">
              당신의 키로 모델을 연결하면, 글을 읽고 숨은 전제를 짚고, 다른 답과의 긴장을 찾고, 서재에서 지금 도움이 될 관점을 골라줍니다. 호출은 당신이 버튼을 누를 때만, 짧게. 대부분의 사용은 한 달에 몇백 원 안쪽이고, 무료 모델이나 로컬 모델이면 0원이에요. 지금 건너뛰고 나중에 설정에서 연결해도 됩니다.
            </p>
            <div className="card p-4">
              <ProviderSetup compact />
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>이전</button>
              <button type="button" className="btn-primary" onClick={() => setStep(3)}>다음 <Icon name="chevron-right" size={14} /></button>
              <button type="button" className="btn-ghost" onClick={() => setStep(3)}>AI 없이 계속</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="rise flex flex-col gap-5">
            <h2 className="h-serif text-2xl">첫 질문을 고르세요</h2>
            <p className="text-sm text-ink-2">세 개의 핵심 영역, 각각의 첫 질문입니다. 10분이면 충분해요.</p>
            <div className="flex flex-col gap-3">
              {STARTER_QUESTION_IDS.map((id) => {
                const q = QUESTION_MAP[id]
                const d = DOMAIN_MAP[q.domainId]
                return (
                  <button key={id} type="button" onClick={() => finish(`/q/${id}`)} className="card group flex items-start gap-3 p-4 text-left transition-colors hover:border-accent/50">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-paper-3 font-serif text-lg text-ink-2 group-hover:bg-accent-soft group-hover:text-accent-ink">{d.glyph}</span>
                    <div>
                      <div className="text-xs text-ink-3">{d.name} · 약 {q.minutes}분</div>
                      <div className="font-serif text-[16px] leading-snug">{q.title}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>이전</button>
              <button type="button" className="btn-ghost" onClick={() => finish('/')}>지도부터 둘러보기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
