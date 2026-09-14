import { afterEach, describe, expect, it, vi } from 'vitest'
import { extractJson } from './json'
import { challengeFor, pendingConfigHandoff } from './pkce'
import { chat } from './client'
import type { ProviderConfig } from '@/types'

describe('extractJson', () => {
  it('parses plain, fenced and prose-wrapped JSON', () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 })
    expect(extractJson('```json\n{"a": [1,2]}\n```')).toEqual({ a: [1, 2] })
    expect(extractJson('여기 결과입니다:\n{"summary":"x","n":2}\n감사합니다')).toEqual({ summary: 'x', n: 2 })
    expect(extractJson('{"a":1,}')).toEqual({ a: 1 })
    expect(() => extractJson('no json here')).toThrow()
  })
})

describe('pkce', () => {
  it('computes the RFC 7636 S256 challenge', async () => {
    const verifier = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
    expect(await challengeFor(verifier)).toBe('E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM')
  })

  it('reads a config handoff from the hash query and strips it from the address', () => {
    const urls: string[] = []
    vi.stubGlobal('window', {
      location: { hash: '#/settings?or_key=abc123&model=x/y&keep=1', pathname: '/app/', search: '' },
      history: { replaceState: (_s: unknown, _t: string, url: string) => urls.push(url) },
    })
    expect(pendingConfigHandoff()).toEqual({ apiKey: 'abc123', provider: 'openrouter', model: 'x/y' })
    expect(urls[0]).toBe('/app/#/settings?keep=1')
    vi.stubGlobal('window', { location: { hash: '#/settings', pathname: '/app/', search: '' }, history: { replaceState: () => {} } })
    expect(pendingConfigHandoff()).toBeNull()
    vi.unstubAllGlobals()
  })
})

const cfg: ProviderConfig = { provider: 'openrouter', apiKey: 'sk-or-test', model: 'openai/gpt-4o-mini' }

function sse(lines: string[]): Response {
  const stream = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder()
      for (const l of lines) controller.enqueue(enc.encode(l + '\n'))
      controller.close()
    },
  })
  return new Response(stream, { status: 200, headers: { 'Content-Type': 'text/event-stream' } })
}

describe('chat client', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('reads non-streaming replies and OpenRouter cost accounting', async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body))
      expect(body.usage).toEqual({ include: true })
      expect(body.max_tokens).toBe(50)
      return new Response(JSON.stringify({ model: 'openai/gpt-4o-mini', choices: [{ message: { content: 'hi' } }], usage: { prompt_tokens: 10, completion_tokens: 2, cost: 0.00001 } }), { status: 200 })
    })
    vi.stubGlobal('fetch', fetchMock)
    const res = await chat(cfg, { messages: [{ role: 'user', content: 'x' }], maxTokens: 50 })
    expect(res.text).toBe('hi')
    expect(res.usage).toEqual({ promptTokens: 10, completionTokens: 2, costUsd: 0.00001 })
    const headers = (fetchMock.mock.calls[0][1] as RequestInit).headers as Record<string, string>
    expect(headers.Authorization).toBe('Bearer sk-or-test')
    expect(headers['X-Title']).toBe('Philosopher')
  })

  it('parses SSE streams, skips comments, collects usage from the final chunk', async () => {
    vi.stubGlobal('fetch', async () =>
      sse([
        ': OPENROUTER PROCESSING',
        'data: {"model":"m","choices":[{"delta":{"content":"안"}}]}',
        '',
        'data: {"choices":[{"delta":{"content":"녕"}}]}',
        'data: {"choices":[],"usage":{"prompt_tokens":5,"completion_tokens":2,"cost":0.000002}}',
        'data: [DONE]',
      ]),
    )
    const tokens: string[] = []
    const res = await chat(cfg, { messages: [{ role: 'user', content: 'x' }], onToken: (t) => tokens.push(t) })
    expect(tokens).toEqual(['안', '녕'])
    expect(res.text).toBe('안녕')
    expect(res.usage.costUsd).toBe(0.000002)
    expect(res.model).toBe('m')
  })

  it('retries without response_format when the provider rejects it, and estimates cost from a price', async () => {
    let calls = 0
    vi.stubGlobal('fetch', async (_url: string, init?: RequestInit) => {
      calls++
      const body = JSON.parse(String(init?.body))
      if (body.response_format) return new Response('{"error":{"message":"response_format is not supported"}}', { status: 400 })
      return new Response(JSON.stringify({ choices: [{ message: { content: '{"ok":true}' } }], usage: { prompt_tokens: 1000, completion_tokens: 1000 } }), { status: 200 })
    })
    const res = await chat({ ...cfg, provider: 'openai', model: 'gpt-4o-mini' }, { messages: [{ role: 'user', content: 'x' }], json: true, price: { prompt: 1, completion: 2 } })
    expect(calls).toBe(2)
    expect(res.text).toBe('{"ok":true}')
    expect(res.usage.costUsd).toBeCloseTo(0.003, 6)
  })

  it('sends bounded reasoning and throughput routing to OpenRouter, dropping them if rejected', async () => {
    const bodies: Record<string, unknown>[] = []
    vi.stubGlobal('fetch', async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as Record<string, unknown>
      bodies.push(body)
      if (body.reasoning) return new Response('{"error":{"message":"reasoning is not supported for this model"}}', { status: 400 })
      return new Response(JSON.stringify({ choices: [{ message: { content: 'ok' }, finish_reason: 'stop' }], usage: { prompt_tokens: 1, completion_tokens: 1 } }), { status: 200 })
    })
    const res = await chat(cfg, { messages: [{ role: 'user', content: 'x' }], maxTokens: 100 })
    expect(res.text).toBe('ok')
    expect(bodies[0].reasoning).toEqual({ effort: 'low', exclude: true })
    expect(bodies[0].provider).toEqual({ sort: 'throughput' })
    expect(bodies[1].reasoning).toBeUndefined()
  })

  it('retries once with a bigger budget when a reasoning model returns nothing visible', async () => {
    const budgets: number[] = []
    vi.stubGlobal('fetch', async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as { max_tokens: number }
      budgets.push(body.max_tokens)
      if (budgets.length === 1) return new Response(JSON.stringify({ choices: [{ message: { content: '' }, finish_reason: 'length' }], usage: { prompt_tokens: 10, completion_tokens: 500 } }), { status: 200 })
      return new Response(JSON.stringify({ choices: [{ message: { content: '# 초안' }, finish_reason: 'stop' }], usage: { prompt_tokens: 10, completion_tokens: 900 } }), { status: 200 })
    })
    const res = await chat(cfg, { messages: [{ role: 'user', content: 'x' }], maxTokens: 500 })
    expect(budgets).toEqual([500, 1000])
    expect(res.text).toBe('# 초안')
  })

  it('reports an empty reply clearly after the retry', async () => {
    vi.stubGlobal('fetch', async () => new Response(JSON.stringify({ choices: [{ message: { content: '' }, finish_reason: 'length' }], usage: { prompt_tokens: 1, completion_tokens: 500 } }), { status: 200 }))
    await expect(chat(cfg, { messages: [{ role: 'user', content: 'x' }], maxTokens: 500 })).rejects.toThrow(/빈 답/)
  })

  it('turns HTTP errors into readable messages', async () => {
    vi.stubGlobal('fetch', async () => new Response('nope', { status: 401 }))
    await expect(chat(cfg, { messages: [{ role: 'user', content: 'x' }] })).rejects.toThrow(/401/)
  })
})
