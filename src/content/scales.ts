/**
 * Short self-check scales used for the "점검" tool. Items are informal
 * Korean adaptations inspired by published instruments; they are meant for
 * self-observation over time, not diagnosis. Each subscale is normalised to
 * 0–100 so trends can be plotted.
 */
export interface ScaleItem {
  id: string
  text: string
  subscale: string
  reverse?: boolean
}

export interface Scale {
  id: string
  name: string
  short: string
  description: string
  /** Minutes to complete. */
  minutes: number
  /** Likert points, e.g. 5 or 7. */
  points: number
  anchors: { low: string; high: string }
  subscales: { id: string; name: string; description: string }[]
  items: ScaleItem[]
  /** How to read the result (non-diagnostic). */
  reading: string
  source: string
  /** Which domain this feeds on the map. */
  domainId: string
}

export const SCALES: Scale[] = [
  {
    id: 'mlq',
    name: '삶의 의미 — 존재와 탐색',
    short: '의미',
    description: '내 삶이 지금 의미 있다고 느끼는 정도(존재)와 의미를 찾으려 애쓰는 정도(탐색)를 따로 봅니다.',
    minutes: 3,
    points: 7,
    anchors: { low: '전혀 아니다', high: '매우 그렇다' },
    subscales: [
      { id: 'presence', name: '의미의 존재', description: '지금 내 삶이 의미 있다고 느끼는 정도' },
      { id: 'search', name: '의미의 탐색', description: '의미를 적극적으로 찾고 있는 정도 (높다고 나쁜 것이 아님)' },
    ],
    items: [
      { id: 'p1', text: '내 삶의 의미가 무엇인지 알고 있다.', subscale: 'presence' },
      { id: 'p2', text: '내 삶에는 분명한 방향 감각이 있다.', subscale: 'presence' },
      { id: 'p3', text: '내 삶이 의미 있다고 느낀다.', subscale: 'presence' },
      { id: 'p4', text: '내 삶을 의미 있게 만드는 것이 무엇인지 발견했다.', subscale: 'presence' },
      { id: 'p5', text: '내 삶에는 뚜렷한 목적이 없다.', subscale: 'presence', reverse: true },
      { id: 's1', text: '나는 내 삶의 의미를 찾고 있다.', subscale: 'search' },
      { id: 's2', text: '내 삶을 의미 있게 느끼게 해줄 무언가를 찾고 있다.', subscale: 'search' },
      { id: 's3', text: '내 삶의 목적을 늘 찾고 있다.', subscale: 'search' },
      { id: 's4', text: '삶의 의미에 대해 자주 생각한다.', subscale: 'search' },
      { id: 's5', text: '내 삶의 의미를 발견하려 애쓰고 있다.', subscale: 'search' },
    ],
    reading:
      '존재와 탐색은 별개의 축입니다. 존재가 높고 탐색도 높다면 삶을 계속 깊게 만드는 중이고, 둘 다 낮다면 가장 취약한 상태일 수 있습니다. 탐색이 높다는 것은 문제가 아니라 이 작업실에 온 이유입니다.',
    source: 'Steger, Frazier, Oishi & Kaler (2006) MLQ에 기반한 비공식 자기점검. 한국판: 원두리·권선중·김교헌 (2005).',
    domainId: 'meaning',
  },
  {
    id: 'swls',
    name: '삶의 만족',
    short: '만족',
    description: '삶 전체에 대한 인지적 평가. 기분이 아니라 “내 삶은 어떤가”에 대한 판단입니다.',
    minutes: 2,
    points: 7,
    anchors: { low: '전혀 아니다', high: '매우 그렇다' },
    subscales: [{ id: 'satisfaction', name: '삶의 만족', description: '삶 전체에 대한 평가' }],
    items: [
      { id: '1', text: '전반적으로 내 삶은 내가 생각하는 이상에 가깝다.', subscale: 'satisfaction' },
      { id: '2', text: '내 삶의 조건은 훌륭하다.', subscale: 'satisfaction' },
      { id: '3', text: '나는 내 삶에 만족한다.', subscale: 'satisfaction' },
      { id: '4', text: '지금까지 나는 삶에서 원하는 중요한 것들을 얻었다.', subscale: 'satisfaction' },
      { id: '5', text: '다시 태어나도 지금처럼 살고 싶다.', subscale: 'satisfaction' },
    ],
    reading:
      '이 점수는 “행복한 기분”이 아니라 삶에 대한 평가입니다. 카너먼의 구분으로 보면 기억하는 자아의 답입니다. 경험하는 자아의 답(즐거움 기록)과 비교해보세요.',
    source: 'Diener, Emmons, Larsen & Griffin (1985) SWLS에 기반한 자기점검.',
    domainId: 'happiness',
  },
  {
    id: 'scc',
    name: '자기개념 명료성',
    short: '명료성',
    description: '나에 대한 생각이 얼마나 분명하고, 일관되며, 시간이 지나도 안정적인지 봅니다.',
    minutes: 3,
    points: 5,
    anchors: { low: '전혀 아니다', high: '매우 그렇다' },
    subscales: [{ id: 'clarity', name: '자기개념 명료성', description: '자기 이해의 분명함과 일관성' }],
    items: [
      { id: '1', text: '내가 어떤 사람인지에 대한 나의 생각들은 자주 서로 충돌한다.', subscale: 'clarity', reverse: true },
      { id: '2', text: '어떤 날은 나 자신에 대해 이렇게 생각하고, 다른 날은 전혀 다르게 생각한다.', subscale: 'clarity', reverse: true },
      { id: '3', text: '내 성격의 여러 면을 하나로 설명하려면 시간이 오래 걸린다.', subscale: 'clarity', reverse: true },
      { id: '4', text: '내 성격 중 어떤 것이 진짜 나인지 잘 모르겠다.', subscale: 'clarity', reverse: true },
      { id: '5', text: '누군가 나를 묘사해달라고 하면 날마다 다른 답을 할 것 같다.', subscale: 'clarity', reverse: true },
      { id: '6', text: '내가 정말 어떤 사람인지 헷갈릴 때가 많다.', subscale: 'clarity', reverse: true },
      { id: '7', text: '대체로 나는 내가 누구이고 무엇을 원하는지 분명히 안다.', subscale: 'clarity' },
      { id: '8', text: '과거의 나와 지금의 나가 잘 이어진다고 느낀다.', subscale: 'clarity' },
      { id: '9', text: '나 자신에 대한 믿음은 시간이 지나도 꽤 안정적이다.', subscale: 'clarity' },
      { id: '10', text: '나는 내가 무엇을 중요하게 여기는지 안다.', subscale: 'clarity' },
    ],
    reading:
      '명료성이 낮다고 나쁜 것은 아닙니다. 탐색 중이거나, 관계 속에서 자아를 정의하는 사람은 낮게 나올 수 있습니다. 다만 남의 시선에 따라 자기 서술이 흔들린다면 ‘자아와 이야기’ 영역의 질문들이 도움이 됩니다.',
    source: 'Campbell et al. (1996) Self-Concept Clarity Scale에서 영감을 받은 비공식 자기점검.',
    domainId: 'identity',
  },
  {
    id: 'rrq',
    name: '반추와 성찰',
    short: '반추/성찰',
    description: '자기에게 주의를 돌리는 방식이 불안에서 오는 반추인지, 호기심에서 오는 성찰인지 봅니다.',
    minutes: 2,
    points: 5,
    anchors: { low: '전혀 아니다', high: '매우 그렇다' },
    subscales: [
      { id: 'rumination', name: '반추', description: '불안·위협에서 오는 반복적 자기 주의 (낮을수록 편안)' },
      { id: 'reflection', name: '성찰', description: '호기심에서 오는 자기 탐구 (높을수록 이 작업실과 잘 맞음)' },
    ],
    items: [
      { id: 'r1', text: '부끄러웠던 일을 오래 곱씹는다.', subscale: 'rumination' },
      { id: 'r2', text: '하지 말았어야 할 말이나 행동을 되새기며 시간을 보낸다.', subscale: 'rumination' },
      { id: 'r3', text: '이미 지난 일을 계속 다시 생각한다.', subscale: 'rumination' },
      { id: 'r4', text: '나 자신에 대해 생각하는 것을 멈추기 어렵다.', subscale: 'rumination' },
      { id: 'f1', text: '나 자신의 생각과 감정을 탐구하는 것을 좋아한다.', subscale: 'reflection' },
      { id: 'f2', text: '내가 왜 그렇게 행동했는지 분석하는 것이 흥미롭다.', subscale: 'reflection' },
      { id: 'f3', text: '내 삶에 대해 철학적으로 생각하는 것을 즐긴다.', subscale: 'reflection' },
      { id: 'f4', text: '새로운 자기 이해를 얻는 것이 즐겁다.', subscale: 'reflection' },
    ],
    reading:
      '반추가 높다면 이 작업실을 쓰는 방식을 조정하세요: ‘왜’ 대신 ‘무엇’으로 묻고, 3인칭 서술을 쓰고, 한 번에 20분을 넘기지 마세요. 성찰이 높다면 대조(3단계) 질문들이 특히 잘 맞을 것입니다.',
    source: 'Trapnell & Campbell (1999) Rumination–Reflection Questionnaire에서 영감을 받은 비공식 자기점검.',
    domainId: 'suffering',
  },
]

export const SCALE_MAP: Record<string, Scale> = Object.fromEntries(SCALES.map((s) => [s.id, s]))

/** Normalise raw responses into 0–100 per subscale. */
export function scoreScale(scale: Scale, responses: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {}
  for (const sub of scale.subscales) {
    const items = scale.items.filter((i) => i.subscale === sub.id)
    let total = 0
    let n = 0
    for (const item of items) {
      const raw = responses[item.id]
      if (typeof raw !== 'number' || Number.isNaN(raw)) continue
      const v = item.reverse ? scale.points + 1 - raw : raw
      total += (v - 1) / (scale.points - 1)
      n += 1
    }
    out[sub.id] = n === 0 ? 0 : Math.round((total / n) * 100)
  }
  return out
}
