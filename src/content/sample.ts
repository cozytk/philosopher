import type { Answer, CheckinResult, JoyLog, Snapshot, ValuesResult } from '@/types'
import { SCALE_MAP, scoreScale } from './scales'

/**
 * Clearly-labelled example data so a new reader can see a populated map
 * before writing anything. Every stance starts with "(예시)" and every text
 * with a notice; 설정 → 모두 지우기 removes it.
 */
const NOTICE = '(예시 기록입니다. 설정에서 ‘모두 지우기’로 지울 수 있어요.)\n\n'

function daysAgo(n: number, hour = 21): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(hour, 12, 0, 0)
  return d.toISOString()
}

function answer(
  questionId: string,
  text: string,
  opts: { stance?: string; confidence?: number; lenses?: string[]; open?: string[]; created: number; updated?: number; versions?: Answer['versions'] } ,
): Answer {
  return {
    questionId,
    text: NOTICE + text,
    stance: opts.stance ? `(예시) ${opts.stance}` : undefined,
    confidence: opts.confidence,
    openQuestions: opts.open ?? [],
    linkedLensIds: opts.lenses ?? [],
    status: opts.stance ? 'answered' : 'draft',
    createdAt: daysAgo(opts.created),
    updatedAt: daysAgo(opts.updated ?? opts.created),
    versions: opts.versions ?? [],
  }
}

export function buildSampleAnswers(): Record<string, Answer> {
  const list: Answer[] = [
    answer(
      'hap-moments',
      '첫 번째 장면. 지난주 토요일 아침 일곱 시, 친구와 한강을 걸었다. 특별한 이야기는 없었고 서로의 일에 대해 두서없이 말했다. 왜 좋았는지 생각해보면, 아무것도 증명할 필요가 없었기 때문인 것 같다. 몸은 가벼웠고 걸음이 느렸다. 끝나고 나서 집에 와 아무것도 안 하고 한 시간을 보냈는데 그것도 좋았다.\n\n두 번째 장면. 회사에서 두 달 걸린 기능을 배포하고 팀장이 슬랙에 짧게 고맙다고 썼을 때. 그 순간은 확실히 기뻤다. 하지만 이 기쁨은 이상하게 빨리 사라졌다. 저녁쯤엔 이미 다음 일을 걱정하고 있었다.\n\n세 번째 장면. 조카가 내가 만든 종이비행기를 보고 웃었을 때. 이건 설명이 안 된다. 그냥 좋았다.\n\n세 장면의 공통점을 찾아보면, 두 장면은 ‘누군가와 함께’였고 ‘평가가 없었다’. 배포의 기쁨만 성격이 다르다. 그건 비교와 인정에서 온 기쁨이었고, 그래서 오래가지 않았던 것 아닐까.',
      { stance: '행복은 증명할 필요가 없는 시간에 온다', confidence: 60, lenses: ['kahneman-two-selves', 'suh-origin-of-happiness'], created: 21, updated: 20 },
    ),
    answer(
      'hap-define',
      '내가 ‘행복하다’고 말할 때 가리키는 건 대체로 ‘평온’에 가깝다. 신나는 상태가 아니라 걱정이 없는 상태. 그런데 이렇게 정의하면 문제가 생긴다. 걱정이 없는 상태는 대개 아무것도 하지 않을 때인데, 아무것도 하지 않는 삶을 행복한 삶이라고 부르고 싶지는 않다.\n\n그래서 ‘만족’을 더해본다. 하루 단위로는 평온, 인생 단위로는 만족. 하지만 이것도 이상하다. 인생 단위의 만족은 결국 기억하는 자아가 내리는 평가라서, 실제로 살았던 하루하루와 어긋날 수 있다.\n\n의미는 행복과 다른 것으로 두고 싶다. 의미 있지만 행복하지 않은 시기가 분명히 있었다(대학원 시절). 그렇다면 내 정의: 행복은 평온한 하루들이 쌓여 만족스러운 기억이 되는 것. 다만 이 정의는 ‘풍요로움’—낯선 경험, 흔들리는 경험—을 배제하는데, 그게 맞는지 확신이 없다.',
      {
        stance: '행복은 평온한 하루들이 쌓여 만족으로 기억되는 것이다',
        confidence: 55,
        lenses: ['parfit-wellbeing-theories', 'oishi-psychological-richness'],
        open: ['풍요로운 삶은 행복한 삶과 다른 종류인가?'],
        created: 18,
        updated: 6,
        versions: [{ at: daysAgo(18), text: '(이전 판)', stance: '(예시) 행복은 걱정이 없는 상태다', confidence: 50 }],
      },
    ),
    answer(
      'hap-experience-machine',
      '즉답: 접속하지 않겠다. 이유를 적어보니 세 가지다. 첫째, 내가 겪는 일이 실제여야 한다는 감각이 있다. 둘째, 기계 안의 친구는 친구가 아니다. 셋째, 접속한 뒤의 나는 아무것도 되지 못한다. 그러니까 나는 느낌만 원하는 게 아니라 실제로 무언가를 하고, 실제 사람과 만나고, 어떤 사람이 되기를 원한다.\n\n그런데 정직하게 보면, 지금 삶에서 이미 ‘가짜여도 상관없는’ 부분이 있다. 퇴근 후 세 시간의 영상 시청. 그 시간은 사실상 경험 기계다. 그렇다면 나는 원칙적으로 기계를 거부하면서 매일 세 시간씩 접속하는 사람이다. 이 모순이 내 행복론의 가장 약한 지점 같다.',
      { stance: '행복은 좋은 느낌만이 아니라 실제로 함과 실제 사람을 포함한다', confidence: 70, lenses: ['nozick-experience-machine', 'parfit-wellbeing-theories'], open: ['매일의 영상 시청은 경험 기계와 무엇이 다른가?'], created: 12 },
    ),
    answer(
      'mean-felt',
      '의미 있다고 느낀 순간: 후배가 내가 작년에 만든 문서를 보고 덕분에 첫 배포를 해냈다고 말했을 때. 내가 없어도 남는 것이 있었다.\n\n허무했던 순간: 분기 목표를 다 채우고 나서 다음 분기 목표를 받았을 때. 숫자가 숫자로 이어질 뿐 아무것도 완결되지 않는 느낌. 두 순간의 차이를 한 단어로 하면 ‘이어짐’이다. 의미 있는 순간에는 무언가가 누군가에게로 이어졌고, 허무한 순간에는 아무 데로도 이어지지 않았다.',
      { stance: '의미는 내가 한 일이 누군가에게 이어질 때 생긴다', confidence: 50, lenses: ['heintzelman-king-meaning'], created: 15 },
    ),
    answer(
      'mean-three',
      '일관성: 6. 지금까지의 삶이 하나의 이야기로 이해되느냐면, 반쯤은 그렇다. 전공에서 지금 일로 옮긴 건 설명이 되는데, 왜 이 회사인지는 설명이 안 된다.\n\n목적: 4. 방향이 있다기보다 흐름을 따라왔다. 방향은 누가 정했나? 주로 다음 단계가 뻔히 보이는 쪽으로.\n\n중요성: 7. 부모님, 조카, 팀원 몇 명에게는 내 삶이 중요하다. 이 점수가 가장 높다는 게 의외였다. 가장 낮은 것은 목적. 그렇다면 답해야 할 질문은 ‘내가 원하는 방향은 무엇인가’보다 먼저 ‘지금까지 나를 움직인 방향은 무엇이었나’인 것 같다.',
      { stance: '내 삶은 이해되고 중요하지만, 방향은 아직 남이 정한 것에 가깝다', confidence: 65, lenses: ['martela-steger-three-meanings'], created: 9 },
    ),
    answer(
      'joy-lost-time',
      '1) 새벽에 사이드 프로젝트 코드를 리팩토링할 때. 세 시간이 순식간에 갔다. 혼자, 실력에 살짝 벅찬 문제, 테스트가 바로 통과/실패를 알려줌.\n2) 친구들과 보드게임. 함께, 규칙이 분명, 즉각적 피드백.\n3) 목공 클래스에서 도마를 만들 때. 손이 바쁘고 결과가 눈에 보임.\n\n공통 조건: 결과가 바로 보이고, 실력보다 조금 어렵고, 평가하는 사람이 없다. 혼자/함께는 상관없었다. 몰입이 끝난 뒤의 느낌은 셋 다 충만했지, 허탈하지 않았다. 반대로 영상 시청은 시간이 사라지긴 하지만 끝나면 허탈하다. 몰입과 시간 소멸은 다른 것이다.',
      { stance: '나는 결과가 바로 보이고 살짝 벅찬 일을 할 때 즐겁다', confidence: 75, lenses: ['csikszentmihalyi-flow', 'designing-your-life'], created: 14 },
    ),
    answer(
      'joy-energy',
      '어제: 출근길 팟캐스트(+1, 즐거움 3), 오전 회의 두 개(-2, 2), 점심 혼자 산책(+2, 4), 오후 코드 리뷰(0, 3), 야근(-2, 2), 밤에 영상 두 시간(-1, 3).\n\n즐거웠지만 에너지를 빼앗은 활동: 영상 시청. 지루했지만 에너지를 채운 활동: 산책. 즐거움과 에너지는 확실히 다르게 움직인다. 앞으로 일주일 즐거움 기록을 써보기로.',
      { lenses: ['berridge-wanting-liking'], created: 8 },
    ),
    answer(
      'val-choices',
      '작년에 연봉이 20% 높은 회사의 제안을 거절했다. 이유는 지금 팀이 좋아서, 그리고 그 회사가 야근이 많다고 들어서. 그때는 ‘안정’ 때문이라고 생각했는데 다시 보니 지킨 것은 ‘시간’과 ‘사람’이었다. 같은 상황에서 반대로 선택했을 사람은 성취나 부를 더 중요하게 여기는 사람일 것이다. 지킨 것에 이름을 붙이면: 자유로운 시간, 신뢰하는 관계.',
      { stance: '나는 돈보다 시간과 사람을 지킨다', confidence: 70, lenses: ['revealed-values'], created: 10 },
    ),
    answer(
      'id-scenes',
      '1. 열두 살, 처음 컴퓨터를 분해했다가 조립하지 못해 아버지에게 혼난 날 — ‘열어보고 싶은 사람’의 시작.\n2. 스무 살, 재수를 결정한 겨울 — 처음으로 남과 다른 길을 골랐다.\n3. 스물여섯, 대학원을 그만둔 날 — 바닥. 하지만 지금 일의 시작.\n4. 서른, 첫 배포 — 절정. 내가 만든 것이 세상에서 돌아갔다.\n5. 지난달, 조카와 종이비행기 — 최근. 왜 이 장면이 떠오르는지 아직 모르겠다.\n\n다섯 장면을 잇는 주제가 있다면 ‘열어보고, 만들어보고, 실패하고, 다시 만드는 사람’.',
      { lenses: ['mcadams-narrative-identity'], created: 7 },
    ),
    answer(
      'work-jcc',
      '지금 일을 생계로 서술하면: 월급을 받고 퇴근을 기다리는 일. 경력으로 서술하면: 시니어가 되기 위한 단계. 소명으로 서술하면: 사람들이 쓰는 도구를 잘 만드는 일.\n\n세 서술 중 가장 자연스러운 건 경력이다. 그런데 최고의 하루들은 전부 소명의 서술에 가까웠다. 소명으로 보는 데 방해가 되는 건 일 자체가 아니라 조직의 평가 방식인 것 같다. 분기 숫자가 아니라 만든 것의 질로 평가받을 때 나는 이 일을 소명처럼 느낀다.',
      { stance: '내 일은 경력이지만, 잘 만들 때는 소명이 된다', confidence: 60, lenses: ['wrzesniewski-calling', 'sennett-craftsman'], created: 5 },
    ),
    answer(
      'mort-week',
      '서른셋이면 1,716주를 썼다. 80년을 산다면 남은 주는 2,400주쯤. 첫 감정은 초조함보다 어색함이었다. 숫자로 보니 시간이 재고처럼 느껴졌다. 남은 주 중 정말 ‘내 것’인 시간은? 주중 저녁 두 시간과 주말 절반. 계산하면 30%도 안 된다. 그 30%를 영상 시청에 쓰고 있다는 사실이 이 질문의 답보다 더 크게 남는다.',
      { lenses: ['burkeman-four-thousand-weeks'], created: 3 },
    ),
  ]
  return Object.fromEntries(list.map((a) => [a.questionId, a]))
}

export function buildSampleJoyLogs(): JoyLog[] {
  const rows: [number, string, number, number, number, string][] = [
    [1, '한강 산책', 4, 2, 3, '혼자'],
    [1, '야근', 2, -2, 2, '동료'],
    [2, '사이드 프로젝트 코딩', 5, 1, 5, '혼자'],
    [2, '영상 시청', 3, -1, 2, '혼자'],
    [3, '보드게임', 5, 2, 4, '친구'],
    [4, '오전 회의', 2, -2, 1, '동료'],
    [5, '목공 클래스', 5, 1, 5, '낯선 사람들'],
    [6, '가족 저녁', 4, 1, 3, '가족'],
    [6, '영상 시청', 3, -1, 2, '혼자'],
  ]
  return rows.map(([d, activity, engagement, energy, flow, withWhom], i) => ({
    id: `sample_joy_${i}`,
    at: daysAgo(d, 20),
    activity,
    engagement,
    energy,
    flow,
    withWhom,
  }))
}

export function buildSampleCheckins(): CheckinResult[] {
  const mlq = SCALE_MAP['mlq']
  const r1: Record<string, number> = { p1: 3, p2: 3, p3: 4, p4: 3, p5: 4, s1: 6, s2: 6, s3: 5, s4: 6, s5: 6 }
  const r2: Record<string, number> = { p1: 4, p2: 4, p3: 5, p4: 4, p5: 3, s1: 6, s2: 5, s3: 5, s4: 6, s5: 5 }
  return [
    { id: 'sample_chk_1', scaleId: 'mlq', at: daysAgo(20), responses: r1, scores: scoreScale(mlq, r1) },
    { id: 'sample_chk_2', scaleId: 'mlq', at: daysAgo(2), responses: r2, scores: scoreScale(mlq, r2) },
  ]
}

export function buildSampleValues(): ValuesResult {
  return {
    at: daysAgo(10),
    top: ['freedom', 'friendship', 'mastery', 'curiosity', 'health'],
    why: { freedom: '연봉 대신 시간을 택했다', friendship: '힘들 때 연락하는 사람이 셋 있다', mastery: '잘 만든 것이 돌아갈 때 가장 뿌듯하다' },
  }
}

/** A plausible ramp toward the current index, so the trend card has something to show. */
export function buildSampleSnapshots(currentIndex: number, domains: Record<string, number>): Snapshot[] {
  const out: Snapshot[] = []
  const days = 14
  for (let i = days; i >= 1; i--) {
    const f = 1 - i / days
    const eased = f * f * (3 - 2 * f)
    out.push({
      at: daysAgo(i, 22),
      index: Math.round(currentIndex * eased),
      domains: Object.fromEntries(Object.entries(domains).map(([k, v]) => [k, Math.round(v * eased)])),
    })
  }
  return out
}
