/**
 * OAuth PKCE helpers for OpenRouter's browser flow.
 * Docs: https://openrouter.ai/docs/use-cases/oauth-pkce
 *
 *   1. generate verifier + S256 challenge, remember the verifier
 *   2. redirect to https://openrouter.ai/auth?callback_url=…&code_challenge=…&code_challenge_method=S256
 *   3. OpenRouter redirects back with ?code=…
 *   4. POST https://openrouter.ai/api/v1/auth/keys { code, code_verifier, code_challenge_method } → { key }
 */

export const OPENROUTER_AUTH_URL = 'https://openrouter.ai/auth'
export const OPENROUTER_KEYS_URL = 'https://openrouter.ai/api/v1/auth/keys'
const VERIFIER_KEY = 'philosopher.openrouter.pkce_verifier'

function base64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let s = ''
  for (const b of arr) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function generateVerifier(length = 64): string {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return base64url(bytes).slice(0, 96)
}

export async function challengeFor(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return base64url(digest)
}

/** The page OpenRouter should send the user back to: current origin + path, without hash or query. */
export function callbackUrl(): string {
  const { origin, pathname } = window.location
  return origin + pathname
}

export async function beginOpenRouterLogin(opts: { limitUsd?: number } = {}): Promise<void> {
  const verifier = generateVerifier()
  const challenge = await challengeFor(verifier)
  sessionStorage.setItem(VERIFIER_KEY, verifier)
  const url = new URL(OPENROUTER_AUTH_URL)
  url.searchParams.set('callback_url', callbackUrl())
  url.searchParams.set('code_challenge', challenge)
  url.searchParams.set('code_challenge_method', 'S256')
  if (opts.limitUsd && opts.limitUsd > 0) url.searchParams.set('limit', String(opts.limitUsd))
  window.location.assign(url.toString())
}

/** Returns the ?code= from the current URL, if OpenRouter just redirected back. */
export function pendingOpenRouterCode(): string | null {
  try {
    const params = new URLSearchParams(window.location.search)
    return params.get('code')
  } catch {
    return null
  }
}

export async function exchangeOpenRouterCode(code: string): Promise<string> {
  const verifier = sessionStorage.getItem(VERIFIER_KEY)
  if (!verifier) throw new Error('PKCE verifier가 없습니다. 같은 브라우저 탭에서 다시 시도해주세요.')
  const res = await fetch(OPENROUTER_KEYS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, code_verifier: verifier, code_challenge_method: 'S256' }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`OpenRouter 키 교환 실패 (${res.status}): ${body.slice(0, 200)}`)
  }
  const json = (await res.json()) as { key?: string }
  if (!json.key) throw new Error('OpenRouter 응답에 key가 없습니다.')
  sessionStorage.removeItem(VERIFIER_KEY)
  return json.key
}

/** Remove ?code=… from the address bar after the exchange, keeping the hash route. */
export function clearCodeFromUrl(): void {
  try {
    const url = new URL(window.location.href)
    url.searchParams.delete('code')
    window.history.replaceState({}, '', url.toString())
  } catch {
    /* ignore */
  }
}
