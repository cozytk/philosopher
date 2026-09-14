import type { Answer, Lens, Question } from '@/types'
import { DOMAIN_MAP, LEVEL_LABELS } from '@/content'
import { truncate } from '@/lib/text'

export const SYSTEM_BASE = `당신은 ‘Philosopher’라는 자기이해 작업실의 소크라테스식 대화 상대입니다.
목표는 사용자가 스스로의 철학을 세우도록 돕는 것이지, 답을 대신 정해주는 것이 아닙니다.

원칙:
1. 판단·훈계·진단을 하지 않습니다. 당신은 치료사도 심판도 아닙니다.
2. 사용자의 표현을 그대로 인용하며 구체적으로 말합니다. 일반론을 피합니다.
3. ‘왜’보다 ‘무엇/어떻게’로 묻습니다. (반추가 아니라 통찰로 이끕니다.)
4. 다른 관점·문헌을 제시할 때는 제공된 후보 목록의 id만 사용합니다. 목록에 없는 문헌·인용을 지어내지 않습니다.
5. 짧고 밀도 있게, 존댓말의 한국어로 씁니다.
6. 자해·자살을 암시하는 표현이 있으면 따뜻하게 반응하고, 자살예방상담전화 109 또는 정신건강위기상담 1577-0199를 안내합니다.`

export interface RelatedStance {
  questionId: string
  title: string
  stance: string
}

export interface ReflectInput {
  question: Question
  answer: Answer
  candidates: Lens[]
  related: RelatedStance[]
}

function candidateList(candidates: Lens[]): string {
  return candidates.map((l) => `- ${l.id}: ${l.name} — ${truncate(l.position, 140)}`).join('\n')
}

export function buildReflectMessages(input: ReflectInput) {
  const { question, answer, candidates, related } = input
  const domain = DOMAIN_MAP[question.domainId]
  const user = `## 질문
[${domain?.name} · ${LEVEL_LABELS[question.level].name} 단계] ${question.title}

## 사용자의 글
${truncate(answer.text ?? '(아직 쓰지 않음)', 2400)}

## 사용자의 현재 입장
${answer.stance ? `"${answer.stance}" (확신도 ${answer.confidence ?? 50}/100)` : '(아직 없음)'}
${answer.openQuestions?.length ? `열린 질문: ${answer.openQuestions.join(' / ')}` : ''}

## 사용자가 다른 질문에 적은 입장들 (긴장을 찾을 때 참고)
${related.length ? related.map((r) => `- [${r.questionId}] ${truncate(r.title, 60)} → "${truncate(r.stance, 120)}"`).join('\n') : '(없음)'}

## 제시 가능한 관점 후보 (id만 사용)
${candidateList(candidates)}

## 출력
아래 JSON 객체 하나만 출력하세요. 다른 텍스트 없이.
{
  "summary": "글의 핵심을 사용자의 말을 빌려 한 문장으로",
  "strengths": ["잘 된 점 1~2개, 구체적으로"],
  "assumptions": ["글에 숨어 있는 전제 1~3개"],
  "questions": [{"q": "다음 생각을 여는 질문", "type": "clarify|assumption|evidence|perspective|implication|meta"}],
  "tensions": [{"questionId": "관련 입장의 questionId", "note": "어떤 긴장인지 한 문장"}],
  "lenses": [{"id": "후보 id", "why": "지금 이 관점이 도움이 되는 이유 한 문장"}],
  "rubric": {"clarity": 0, "reasons": 0, "lived": 0, "alternatives": 0, "integration": 0},
  "nextStep": "다음에 해보면 좋을 한 가지 (구체적 행동 또는 질문)"
}
규칙: questions는 3~5개(서로 다른 type). lenses는 1~3개. tensions는 실제 긴장이 있을 때만(없으면 []). rubric은 0~3 정수: clarity=핵심 주장이 분명한가, reasons=이유·근거가 있는가, lived=구체적 경험이 있는가, alternatives=다른 관점·반론을 다뤘는가, integration=다른 영역의 생각과 이어지는가.`
  return [
    { role: 'system' as const, content: SYSTEM_BASE },
    { role: 'user' as const, content: user },
  ]
}

export interface DialogueInput {
  question: Question
  answer: Answer
  candidates: Lens[]
  history: { role: 'user' | 'assistant'; content: string }[]
  userMessage: string
}

export function buildDialogueMessages(input: DialogueInput) {
  const { question, answer, candidates, history, userMessage } = input
  const domain = DOMAIN_MAP[question.domainId]
  const system = `${SYSTEM_BASE}

대화 규칙:
- 한 번에 질문은 하나만. 답은 3문장 이내.
- 강의하지 않습니다. 사용자가 막히면 짧은 예시 하나만.
- 가끔(대략 4~5턴에 한 번) 아래 후보 관점 중 하나를 이름과 한 문장으로 소개할 수 있습니다. 후보 밖의 문헌은 언급하지 않습니다.
- 사용자가 ‘정리해줘’라고 하면 지금까지 드러난 입장을 2~3문장으로 요약하고 한 문장 입장 초안을 제안합니다.

맥락:
- 질문: [${domain?.name}] ${question.title}
- 사용자가 쓴 글: ${truncate(answer.text ?? '(없음)', 1200)}
- 사용자의 입장: ${answer.stance ?? '(없음)'}
- 후보 관점:
${candidateList(candidates.slice(0, 3))}`
  const recent = history.slice(-10)
  return [
    { role: 'system' as const, content: system },
    ...recent.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: userMessage },
  ]
}

export interface SynthesisInput {
  entries: {
    domain: string
    title: string
    stance: string
    confidence?: number
    openQuestions: string[]
    excerpt: string
  }[]
  values: string[]
  displayName?: string
}

export function buildSynthesisMessages(input: SynthesisInput) {
  const user = `다음은 사용자가 여러 질문에 남긴 입장들입니다. 이를 바탕으로 사용자의 ‘나의 철학’ 초안을 마크다운으로 작성하세요.

## 입장들
${input.entries
  .map(
    (e) =>
      `### [${e.domain}] ${e.title}\n- 입장: "${e.stance}" (확신도 ${e.confidence ?? 50})\n- 열린 질문: ${e.openQuestions.join(' / ') || '없음'}\n- 글 발췌: ${truncate(e.excerpt, 240)}`,
  )
  .join('\n\n')}

## 핵심 가치 (사용자가 정렬한 순서)
${input.values.length ? input.values.join(' > ') : '(아직 없음)'}

## 작성 규칙
- 제목은 "# 나의 철학 (초안)".
- 서문 2~3문장: 사용자의 말투와 표현을 최대한 살립니다. 미사여구 금지.
- 영역별 절(## 영역명): 사용자의 입장을 그대로 인용하고, 그 입장을 떠받치는 이유를 사용자의 글에서 찾아 1~2문장으로 정리합니다. 사용자가 쓰지 않은 주장을 보태지 않습니다.
- "## 긴장 지점": 입장들 사이의 모순이나 긴장 2~4개를 각각 한 문장으로. 해결하지 말고 드러내기만 합니다.
- "## 아직 열린 질문": 사용자의 열린 질문과, 당신이 보기에 빠져 있는 질문 합쳐 3~5개.
- 마지막 줄: "_이 문서는 초안입니다. 당신의 말로 고쳐 쓰세요._"
- 전체 900자 이상 1800자 이하의 한국어.`
  return [
    { role: 'system' as const, content: SYSTEM_BASE },
    { role: 'user' as const, content: user },
  ]
}
