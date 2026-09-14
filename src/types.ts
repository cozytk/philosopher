// ─────────────────────────────────────────────────────────────────────────────
// Core domain types shared by content, engines, store and UI.
// Everything the app persists is plain JSON so it can be exported/imported.
// ─────────────────────────────────────────────────────────────────────────────

/** A thematic area of self-inquiry (행복, 의미와 목적, 즐거움과 몰입 …). */
export interface Domain {
  id: string
  /** Short display name. */
  name: string
  /** One-line description shown on cards. */
  tagline: string
  /** Why this area matters for building one's own philosophy. */
  why: string
  /** Emoji-free glyph used for the domain's icon (single character). */
  glyph: string
  /** Rendering order on the map. */
  order: number
  /** Whether it is one of the three core questions the app starts from. */
  core?: boolean
}

/**
 * Depth ladder for every domain.
 * 1 경험  — concrete lived experience, "what" questions
 * 2 정의  — definitions, reasons, distinctions
 * 3 대조  — engaging counter-positions, other traditions, thought experiments
 * 4 종합  — stating one's own position with awareness of alternatives
 */
export type QuestionLevel = 1 | 2 | 3 | 4

export type QuestionKind =
  | 'experience'
  | 'definition'
  | 'contrast'
  | 'synthesis'
  | 'thought-experiment'
  | 'practice'

export interface Question {
  id: string
  domainId: string
  level: QuestionLevel
  kind: QuestionKind
  /** The question itself, phrased to the reader. */
  title: string
  /** Why answering this helps; shown under the title. */
  why: string
  /** Writing cues: concrete sub-prompts the reader can follow. */
  cues: string[]
  /** Common traps for this question (e.g. rumination) and how to avoid them. */
  caution?: string
  /** Lenses that speak most directly to this question. */
  lensIds: string[]
  /** Questions that should ideally be answered first. Soft prerequisites. */
  prereqIds?: string[]
  /** Free tags used for retrieval and cross-linking. */
  tags: string[]
  /** Rough time budget in minutes. */
  minutes: number
}

export type LensType = 'thinker' | 'tradition' | 'concept' | 'paper' | 'study' | 'book'

export interface LensSource {
  /** e.g. "Aristotle, Nicomachean Ethics, Book I" or a paper citation. */
  citation: string
  /** 원전 / 논문 / 입문서 / 국역본 … */
  kind: '원전' | '논문' | '입문' | '국역본' | '책' | '기타'
  /** Optional URL (DOI or public page). */
  url?: string
}

/**
 * A "lens" is a precomputed perspective: a thinker, tradition, concept or
 * research finding, stated as a position on the questions it touches, plus the
 * question it would put back to the reader. Lenses are static data, so
 * suggesting them costs nothing at runtime.
 */
export interface Lens {
  id: string
  type: LensType
  /** Display name, e.g. "아리스토텔레스" or "쾌락 적응 (Hedonic adaptation)". */
  name: string
  /** Era, field or origin, e.g. "고대 그리스 · 덕 윤리" or "심리학 · 2013". */
  origin: string
  /** The position in 1–3 sentences, written as what this lens would say. */
  position: string
  /** One key concept or term the reader can take away. */
  keyConcept: string
  /** The question this lens puts to the reader. */
  challenge: string
  /** Where to read further. */
  sources: LensSource[]
  /** Retrieval tags (Korean + English keywords). */
  tags: string[]
  /** Questions this lens speaks to. */
  questionIds: string[]
  /** Which lens ids contrast with this one — used to widen the reader's view. */
  contrastsWith?: string[]
}

// ── User data ────────────────────────────────────────────────────────────────

export type AnswerStatus = 'draft' | 'answered' | 'settled' | 'revisit'

export interface AnswerVersion {
  at: string
  text: string
  stance?: string
  confidence?: number
}

export interface Reflection {
  /** Hash of the (text + stance) it was produced for; prevents re-calling for unchanged input. */
  inputHash: string
  model: string
  at: string
  summary: string
  strengths: string[]
  assumptions: string[]
  questions: { q: string; type: string }[]
  tensions: { questionId: string; note: string }[]
  lenses: { id: string; why: string }[]
  rubric: { clarity: number; reasons: number; lived: number; alternatives: number; integration: number }
  nextStep: string
}

export interface Answer {
  questionId: string
  text: string
  /** One-sentence current position. */
  stance?: string
  /** 0–100 confidence in the stance. */
  confidence?: number
  /** Questions the writer still holds open. */
  openQuestions: string[]
  /** Lenses the writer explicitly engaged with. */
  linkedLensIds: string[]
  status: AnswerStatus
  createdAt: string
  updatedAt: string
  versions: AnswerVersion[]
  reflection?: Reflection
  /** Optional date after which the app suggests re-reading. */
  revisitAt?: string
}

export interface DialogueMessage {
  role: 'user' | 'assistant'
  content: string
  at: string
}

export interface JoyLog {
  id: string
  at: string
  activity: string
  /** 1–5 how absorbed / engaged. */
  engagement: number
  /** -2..+2 energy after the activity. */
  energy: number
  /** 1–5 flow (lost track of time, challenge≈skill). */
  flow: number
  withWhom?: string
  note?: string
}

export interface CheckinResult {
  id: string
  scaleId: string
  at: string
  /** item id → raw response */
  responses: Record<string, number>
  /** subscale id → normalized 0–100 */
  scores: Record<string, number>
}

export interface ValuesResult {
  at: string
  /** Ranked top value ids, most important first. */
  top: string[]
  /** value id → why it matters (writer's words). */
  why: Record<string, string>
}

export interface PhilosophyDoc {
  content: string
  updatedAt: string
  versions: { at: string; content: string; source: 'manual' | 'ai' }[]
}

export interface Snapshot {
  at: string
  index: number
  domains: Record<string, number>
}

export interface UsageRecord {
  calls: number
  promptTokens: number
  completionTokens: number
  costUsd: number
  byFeature: Record<string, { calls: number; costUsd: number }>
  /** "YYYY-MM" of the month the running monthly total refers to. */
  month?: string
  monthCostUsd?: number
}

// ── LLM configuration ────────────────────────────────────────────────────────

export type ProviderId = 'openrouter' | 'openai' | 'custom'

export interface ProviderConfig {
  provider: ProviderId
  /** API key (OpenRouter key, OpenAI key, or whatever the custom endpoint expects). */
  apiKey?: string
  /** For OpenRouter: how the key was obtained. */
  keySource?: 'manual' | 'oauth'
  /** Base URL for custom OpenAI-compatible endpoints. */
  baseUrl?: string
  /** Model id, e.g. "openai/gpt-4o-mini". */
  model?: string
  /** USD per 1M tokens for the selected model, cached for estimates. */
  modelPrice?: { prompt: number; completion: number }
  /** Soft monthly budget in USD; calls are blocked when exceeded if hardCap. */
  monthlyBudgetUsd?: number
  hardCap?: boolean
}

export interface Settings {
  llm: ProviderConfig
  theme: 'system' | 'light' | 'dark'
  /** Show writing tips inside the editor. */
  showTips: boolean
  /** Default focus timer minutes. */
  timerMinutes: number
  /** Whether the user finished onboarding. */
  onboarded: boolean
  /** Display name (optional, only used in the philosophy document heading). */
  displayName?: string
}
