import type { Lens } from '@/types'
import { countChars, countParagraphs, countSentences } from '@/lib/text'

/** Surface features of a piece of reflective writing. Cheap, local, Korean-aware. */
export interface TextSignals {
  chars: number
  sentences: number
  paragraphs: number
  /** Concrete lived example present (time/place/scene words). */
  hasExample: boolean
  /** Reasons/justifications present. */
  hasReasons: boolean
  /** Counter-positions or tensions acknowledged. */
  hasContrast: boolean
  /** Epistemic humility: uncertainty markers. */
  hasUncertainty: boolean
  /** Questions the writer asks themself. */
  selfQuestions: number
  /** First-person position statements present. */
  hasStanceWords: boolean
  /** Lenses whose names appear in the text. */
  mentionedLensIds: string[]
}

const RE_EXAMPLE =
  /예를 들|예컨대|가령|이를테면|때가 있|했을 때|었을 때|았을 때|기억이 나|기억한다|경험|지난달|지난주|작년|어릴 적|어렸을|학창|그날|그때|어제|주말에|여행|회사에서|학교에서|집에서|\d{4}년|\d+살|\d+세|번째|장면/
const RE_REASONS = /왜냐하면|때문|이유|근거|라서 |므로|니까|덕분|탓에|덕에/
const RE_CONTRAST =
  /하지만|그러나|반면|한편|그렇지만|오히려|반대로|물론|다만|비록|그럼에도|그런데|반론|반대 의견|다른 관점|다르게 보면|한쪽으로는|다른 쪽으로는/
const RE_UNCERTAINTY = /모르겠|확실하지|확신할 수 없|확신은 없|아마도|것 같다|것 같아|일지도|않을까|글쎄|고민이|헷갈|모호|아직은/
const RE_STANCE =
  /생각한다|생각해요|생각합니다|믿는다|믿어요|믿습니다|여긴다|여겨요|여깁니다|본다\.|봐요|봅니다|정의한다|정의하고|정의해|택한다|택하겠|택해요|택합니다|나에게 .{1,30}(이다|다\.)|나는 .{1,40}(이다|다\.)|내게 .{1,30}(이다|다\.)/

const STOP = new Set(['철학', '이론', '심리학', '연구', '자아', '삶', '의미', '행복', '실험', '개념', '법칙', '효과', '문화', '동양', '서양', '세', '가지', '종류', '두', '네'])
const PARTICLE = '(은|는|이|가|의|에|도|처럼|라면|과|와|를|을|에게|께서|로)'

interface LensTokens {
  id: string
  tokens: RegExp[]
}

let cache: { key: string; tokens: LensTokens[] } | null = null

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Build name-matching regexes for each lens: the part before " — ", split on
 * "·" and spaces. Only proper names (thinkers, traditions) are matched —
 * descriptive study titles like "삶은 꽤 의미 있다" would match ordinary prose.
 */
export function buildLensTokens(lenses: Pick<Lens, 'id' | 'name' | 'type'>[]): LensTokens[] {
  const key = lenses.map((l) => l.id).join('|')
  if (cache && cache.key === key) return cache.tokens
  const out: LensTokens[] = []
  for (const l of lenses) {
    if (l.type !== 'thinker' && l.type !== 'tradition') continue
    const head = l.name.split(' — ')[0]
    const parts = head
      .split(/[·\s,]+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0 && !STOP.has(p))
    const tokens: RegExp[] = []
    for (const p of parts) {
      if (p.length === 1) tokens.push(new RegExp('(?<![\\uAC00-\\uD7A3])' + escapeRe(p) + PARTICLE + '(?![\\uAC00-\\uD7A3])'))
      else if (p.length >= 2) tokens.push(new RegExp(escapeRe(p)))
    }
    if (tokens.length) out.push({ id: l.id, tokens })
  }
  cache = { key, tokens: out }
  return out
}

export function analyzeText(text: string, lenses: Pick<Lens, 'id' | 'name' | 'type'>[] = []): TextSignals {
  const t = text ?? ''
  const mentioned: string[] = []
  if (t.length > 0 && lenses.length > 0) {
    for (const lt of buildLensTokens(lenses)) {
      if (lt.tokens.some((re) => re.test(t))) mentioned.push(lt.id)
    }
  }
  return {
    chars: countChars(t),
    sentences: countSentences(t),
    paragraphs: countParagraphs(t),
    hasExample: RE_EXAMPLE.test(t),
    hasReasons: RE_REASONS.test(t),
    hasContrast: RE_CONTRAST.test(t),
    hasUncertainty: RE_UNCERTAINTY.test(t),
    selfQuestions: (t.match(/[?？]/g) ?? []).length,
    hasStanceWords: RE_STANCE.test(t),
    mentionedLensIds: mentioned,
  }
}

/** Crisis language check, local only. Used to show support resources, never to block. */
const RE_CRISIS = /자살|죽고 싶|죽어버리|자해|살고 싶지 않|사라지고 싶|끝내고 싶|목숨을/
export function hasCrisisLanguage(text: string): boolean {
  return RE_CRISIS.test(text ?? '')
}
