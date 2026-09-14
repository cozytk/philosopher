import { Link } from 'react-router'
import { useStore } from '@/store/useStore'
import { formatDate } from '@/lib/dates'
import { Icon } from '@/ui/icons'

export default function ToolsPage() {
  const valuesResult = useStore((s) => s.valuesResult)
  const joyLogs = useStore((s) => s.joyLogs)
  const checkins = useStore((s) => s.checkins)
  const lastCheckin = checkins[checkins.length - 1]
  const tools = [
    {
      to: '/tools/values',
      title: '가치 카드 정렬',
      desc: '45장의 가치 카드를 세 번 걸러 다섯 개의 서열을 만듭니다. 슈워츠의 가치 구조로 당신의 축을 읽어요.',
      meta: valuesResult ? `마지막 정렬 ${formatDate(valuesResult.at)} · 1위 ${valuesResult.top[0] ?? ''}` : '약 10분',
      glyph: '貴',
    },
    {
      to: '/tools/joy',
      title: '즐거움 기록',
      desc: '활동마다 몰입·에너지·플로우를 남기면, 며칠 뒤 “나는 무엇을 할 때 즐거운가”의 답이 데이터로 드러납니다.',
      meta: joyLogs.length ? `${joyLogs.length}개의 기록` : '하루 1분',
      glyph: '樂',
    },
    {
      to: '/tools/checkin',
      title: '자기 점검',
      desc: '삶의 의미(존재/탐색), 삶의 만족, 자기개념 명료성, 반추/성찰 — 짧은 척도로 현재 상태를 재고 시간에 따라 봅니다.',
      meta: lastCheckin ? `마지막 점검 ${formatDate(lastCheckin.at)}` : '척도당 2~3분',
      glyph: '測',
    },
  ]
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="h-serif text-2xl md:text-3xl">도구</h1>
        <p className="mt-1 text-sm text-ink-2">글로 답하기 어려운 질문은 기록과 정렬로 답합니다. 모두 이 기기 안에서, 비용 없이 동작해요.</p>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="card group flex flex-col gap-3 p-5 transition-colors hover:border-accent/40">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-paper-3 font-serif text-xl text-ink-2 group-hover:bg-accent-soft group-hover:text-accent-ink">{t.glyph}</span>
            <div className="font-serif text-lg font-semibold">{t.title}</div>
            <p className="text-sm leading-relaxed text-ink-2">{t.desc}</p>
            <div className="mt-auto flex items-center justify-between text-xs text-ink-3">
              <span>{t.meta}</span>
              <Icon name="chevron-right" size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
