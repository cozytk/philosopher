/**
 * Value cards for the sorting tool. Grouped by Schwartz's ten basic values
 * (plus a few additions that readers reliably ask for), so the result can
 * be summarised on the two axes: 변화–보존, 자기고양–자기초월.
 */
export type ValueGroup =
  | 'self-direction'
  | 'stimulation'
  | 'hedonism'
  | 'achievement'
  | 'power'
  | 'security'
  | 'conformity'
  | 'tradition'
  | 'benevolence'
  | 'universalism'

export interface ValueCard {
  id: string
  name: string
  desc: string
  group: ValueGroup
}

export const VALUE_GROUPS: Record<ValueGroup, { name: string; axis: 'openness' | 'conservation' | 'enhancement' | 'transcendence' | 'mixed' }> = {
  'self-direction': { name: '자기주도', axis: 'openness' },
  stimulation: { name: '자극', axis: 'openness' },
  hedonism: { name: '쾌락', axis: 'mixed' },
  achievement: { name: '성취', axis: 'enhancement' },
  power: { name: '권력', axis: 'enhancement' },
  security: { name: '안전', axis: 'conservation' },
  conformity: { name: '동조', axis: 'conservation' },
  tradition: { name: '전통', axis: 'conservation' },
  benevolence: { name: '자애', axis: 'transcendence' },
  universalism: { name: '보편주의', axis: 'transcendence' },
}

export const VALUE_CARDS: ValueCard[] = [
  { id: 'freedom', name: '자유', desc: '내 삶의 방향을 스스로 정하고 간섭받지 않기', group: 'self-direction' },
  { id: 'independence', name: '독립', desc: '남에게 기대지 않고 스스로 서기', group: 'self-direction' },
  { id: 'creativity', name: '창의성', desc: '새로운 것을 만들고 표현하기', group: 'self-direction' },
  { id: 'curiosity', name: '호기심', desc: '알고 싶어 하고 탐구하기', group: 'self-direction' },
  { id: 'growth', name: '성장', desc: '배우고 어제보다 나아지기', group: 'self-direction' },
  { id: 'authenticity', name: '진정성', desc: '남의 기대가 아니라 나에게 진실하기', group: 'self-direction' },
  { id: 'adventure', name: '모험', desc: '낯선 곳으로 가고 위험을 감수하기', group: 'stimulation' },
  { id: 'variety', name: '다양한 경험', desc: '새롭고 다채로운 경험으로 삶을 채우기', group: 'stimulation' },
  { id: 'challenge', name: '도전', desc: '어려운 일에 맞서 한계를 넓히기', group: 'stimulation' },
  { id: 'pleasure', name: '즐거움', desc: '재미와 기쁨을 누리기', group: 'hedonism' },
  { id: 'comfort', name: '편안함', desc: '안락하고 여유로운 일상', group: 'hedonism' },
  { id: 'humor', name: '유머', desc: '웃음과 가벼움을 잃지 않기', group: 'hedonism' },
  { id: 'achievement', name: '성취', desc: '목표를 이루고 결과를 내기', group: 'achievement' },
  { id: 'competence', name: '유능함', desc: '일을 잘 해내는 사람이 되기', group: 'achievement' },
  { id: 'ambition', name: '야망', desc: '크게 되고 크게 이루기', group: 'achievement' },
  { id: 'recognition', name: '인정', desc: '노력과 성과를 알아봐주는 것', group: 'achievement' },
  { id: 'mastery', name: '장인정신', desc: '그 자체를 위해 일을 잘하려는 마음', group: 'achievement' },
  { id: 'influence', name: '영향력', desc: '사람과 세상을 움직이는 힘', group: 'power' },
  { id: 'wealth', name: '부', desc: '경제적 풍요와 여유', group: 'power' },
  { id: 'status', name: '지위', desc: '사회적 위치와 명예', group: 'power' },
  { id: 'stability', name: '안정', desc: '예측 가능하고 흔들리지 않는 삶', group: 'security' },
  { id: 'health', name: '건강', desc: '몸과 마음의 온전함', group: 'security' },
  { id: 'family-safety', name: '가족의 안전', desc: '사랑하는 사람들이 안전하고 평안하기', group: 'security' },
  { id: 'order', name: '질서', desc: '정돈되고 규칙적인 환경', group: 'security' },
  { id: 'peace-of-mind', name: '평온', desc: '마음의 고요와 불안 없음', group: 'security' },
  { id: 'politeness', name: '예의', desc: '타인을 존중하는 태도와 격식', group: 'conformity' },
  { id: 'self-discipline', name: '자기절제', desc: '충동을 다스리고 스스로를 통제하기', group: 'conformity' },
  { id: 'duty', name: '책임감', desc: '맡은 일과 사람에 대한 의무를 다하기', group: 'conformity' },
  { id: 'tradition', name: '전통', desc: '물려받은 관습과 뿌리를 지키기', group: 'tradition' },
  { id: 'humility', name: '겸손', desc: '자신을 낮추고 분수를 알기', group: 'tradition' },
  { id: 'spirituality', name: '영성', desc: '나보다 큰 것과의 연결, 신앙', group: 'tradition' },
  { id: 'love', name: '사랑', desc: '깊이 사랑하고 사랑받기', group: 'benevolence' },
  { id: 'friendship', name: '우정', desc: '신뢰할 수 있는 친구들과의 유대', group: 'benevolence' },
  { id: 'honesty', name: '정직', desc: '거짓 없이 진실하게', group: 'benevolence' },
  { id: 'loyalty', name: '의리', desc: '내 사람에게 끝까지 충실하기', group: 'benevolence' },
  { id: 'care', name: '돌봄', desc: '필요한 사람을 돕고 보살피기', group: 'benevolence' },
  { id: 'forgiveness', name: '용서', desc: '원한을 내려놓고 관계를 회복하기', group: 'benevolence' },
  { id: 'contribution', name: '기여', desc: '세상에 무언가를 보태기', group: 'universalism' },
  { id: 'justice', name: '정의', desc: '공정함과 약자의 보호', group: 'universalism' },
  { id: 'equality', name: '평등', desc: '모든 사람의 동등한 존엄', group: 'universalism' },
  { id: 'peace', name: '평화', desc: '갈등 없는 세상과 조화', group: 'universalism' },
  { id: 'nature', name: '자연', desc: '자연과 환경을 아끼고 연결되기', group: 'universalism' },
  { id: 'wisdom', name: '지혜', desc: '깊이 이해하고 성숙한 판단을 하기', group: 'universalism' },
  { id: 'beauty', name: '아름다움', desc: '예술과 자연의 아름다움을 누리기', group: 'universalism' },
  { id: 'openness', name: '열린 마음', desc: '다른 생각과 사람을 받아들이기', group: 'universalism' },
]

export const VALUE_MAP: Record<string, ValueCard> = Object.fromEntries(VALUE_CARDS.map((v) => [v.id, v]))
