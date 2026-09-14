import type { Domain } from '@/types'

/**
 * The map of self-inquiry. Ten areas, three of them "core" (the questions the
 * app was built around). Order = position on the map.
 */
export const DOMAINS: Domain[] = [
  {
    id: 'happiness',
    name: '행복',
    tagline: '행복은 무엇이고, 나에게는 어떤 모습인가',
    why: '행복에 대한 정의가 흐리면 삶의 선택 기준도 흐려집니다. 쾌락·만족·의미·풍요로움 중 무엇을 행복이라 부르는지 스스로 정하는 일이 철학의 출발점입니다.',
    glyph: '陽',
    order: 1,
    core: true,
  },
  {
    id: 'meaning',
    name: '의미와 목적',
    tagline: '삶의 목적은 무엇인가, 무엇이 내 삶을 의미 있게 하는가',
    why: '의미는 "일관성(이해됨) · 목적(방향) · 중요성(가치 있음)"의 세 겹으로 이루어집니다. 이 세 가지를 각각 점검하면 막연한 질문이 답할 수 있는 질문으로 바뀝니다.',
    glyph: '志',
    order: 2,
    core: true,
  },
  {
    id: 'joy',
    name: '즐거움과 몰입',
    tagline: '나는 무엇을 할 때 즐거운가, 언제 시간 가는 줄 모르는가',
    why: '"무엇을 할 때 즐거운가"는 추상적인 행복론보다 먼저 답할 수 있는 경험적 질문입니다. 기록하고 관찰하면 답이 드러나고, 그 답이 행복과 의미에 대한 나의 이론을 검증합니다.',
    glyph: '樂',
    order: 3,
    core: true,
  },
  {
    id: 'values',
    name: '가치',
    tagline: '나는 무엇을 중요하게 여기는가, 무엇을 포기하지 않는가',
    why: '가치는 선택의 순간에 드러납니다. 말하는 가치와 실제 행동이 보여주는 가치를 대조해 보면 내가 정말 무엇을 원하는지가 보입니다.',
    glyph: '貴',
    order: 4,
  },
  {
    id: 'identity',
    name: '자아와 이야기',
    tagline: '나는 누구인가, 어떤 이야기가 나를 만들었는가',
    why: '자아는 발견되는 사실이라기보다 계속 써 내려가는 이야기에 가깝습니다. 내 서사의 핵심 장면과 전환점을 알면, 지금의 나를 이해하고 다음 장을 선택할 수 있습니다.',
    glyph: '我',
    order: 5,
  },
  {
    id: 'relationships',
    name: '관계와 사랑',
    tagline: '나에게 타인은 무엇이며, 사랑과 우정은 어떤 자리를 차지하는가',
    why: '장기 종단 연구들이 반복해서 보여주듯, 좋은 삶의 가장 강력한 예측 변수는 관계의 질입니다. 관계를 어떻게 바라보는지가 곧 행복과 의미의 이론을 좌우합니다.',
    glyph: '仁',
    order: 6,
  },
  {
    id: 'work',
    name: '일과 소명',
    tagline: '나에게 일은 무엇인가, 생계·경력·소명 중 어디쯤인가',
    why: '깨어 있는 시간의 절반이 일입니다. 일을 무엇으로 여기느냐(생계, 경력, 소명)에 따라 같은 일도 전혀 다른 경험이 됩니다.',
    glyph: '業',
    order: 7,
  },
  {
    id: 'suffering',
    name: '고통과 감정',
    tagline: '고통을 어떻게 이해하고 다룰 것인가, 감정은 무엇을 말해주는가',
    why: '고통을 제거할 대상으로만 보면 삶의 절반을 적으로 돌리게 됩니다. 어떤 고통은 의미와 짝을 이룹니다. 고통에 대한 태도가 곧 삶에 대한 태도입니다.',
    glyph: '苦',
    order: 8,
  },
  {
    id: 'freedom',
    name: '자유와 책임',
    tagline: '나는 얼마나 자유로운가, 무엇에 책임이 있는가',
    why: '자유를 "제약 없음"으로 보느냐 "스스로 세운 법을 따름"으로 보느냐에 따라, 선택·후회·책임의 무게가 완전히 달라집니다.',
    glyph: '由',
    order: 9,
  },
  {
    id: 'mortality',
    name: '시간과 죽음',
    tagline: '유한한 시간 앞에서 무엇이 중요해지는가',
    why: '죽음을 생각하는 일은 우울한 일이 아니라 우선순위를 정하는 가장 정직한 방법입니다. 시간의 유한성은 다른 모든 질문에 무게를 부여합니다.',
    glyph: '限',
    order: 10,
  },
]

export const DOMAIN_MAP: Record<string, Domain> = Object.fromEntries(DOMAINS.map((d) => [d.id, d]))

export const LEVEL_LABELS: Record<1 | 2 | 3 | 4, { name: string; short: string; desc: string }> = {
  1: { name: '경험', short: '1', desc: '구체적인 경험에서 출발하는 "무엇" 질문' },
  2: { name: '정의', short: '2', desc: '개념을 정의하고 이유를 밝히는 질문' },
  3: { name: '대조', short: '3', desc: '다른 관점·반론·사고실험과 맞붙는 질문' },
  4: { name: '종합', short: '4', desc: '대안을 알면서도 나의 입장을 세우는 질문' },
}
