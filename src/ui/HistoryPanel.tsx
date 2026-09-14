import { useState } from 'react'
import type { Answer } from '@/types'
import { formatDate } from '@/lib/dates'
import { countChars } from '@/lib/text'
import { Modal } from './primitives'
import { Icon } from './icons'

export function HistoryPanel({ answer, onSaveVersion, onRestore }: { answer: Answer | undefined; onSaveVersion: () => void; onRestore: (text: string, stance?: string, confidence?: number) => void }) {
  const [open, setOpen] = useState<number | null>(null)
  const versions = answer?.versions ?? []
  const v = open !== null ? versions[open] : null
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-ink-3">
          {answer ? (
            <>
              처음 {formatDate(answer.createdAt)} · 마지막 {formatDate(answer.updatedAt, true)}
            </>
          ) : (
            '아직 기록이 없어요.'
          )}
        </div>
        <button type="button" className="btn-secondary px-2 py-1 text-xs" onClick={onSaveVersion} disabled={!answer}>
          <Icon name="history" size={13} /> 지금 버전 저장
        </button>
      </div>
      <p className="text-[11px] leading-relaxed text-ink-4">입장이 바뀔 때는 자동으로 이전 버전이 남습니다. 생각이 어떻게 움직였는지 보는 것이 이 작업실의 핵심이에요.</p>
      {versions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line px-3 py-6 text-center text-xs text-ink-4">저장된 버전이 없어요</div>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {[...versions].reverse().map((ver, i) => {
            const idx = versions.length - 1 - i
            return (
              <li key={ver.at + idx} className="rounded-lg border border-line bg-paper-2 px-3 py-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ink-3">{formatDate(ver.at, true)} · {countChars(ver.text)}자</span>
                  <button type="button" className="btn-ghost px-1.5 py-0.5 text-[11px]" onClick={() => setOpen(idx)}>
                    보기
                  </button>
                </div>
                {ver.stance && <div className="mt-1 text-ink-2">“{ver.stance}”{typeof ver.confidence === 'number' ? ` (${ver.confidence})` : ''}</div>}
              </li>
            )
          })}
        </ul>
      )}
      <Modal open={open !== null} onClose={() => setOpen(null)} title={v ? formatDate(v.at, true) : ''} wide>
        {v && (
          <div className="flex flex-col gap-3">
            {v.stance && <div className="rounded-lg bg-accent-soft px-3 py-2 text-sm text-accent-ink">“{v.stance}”</div>}
            <pre className="max-h-[50vh] overflow-y-auto whitespace-pre-wrap rounded-lg bg-paper-3/60 p-3 font-serif text-[15px] leading-relaxed">{v.text || '(비어 있음)'}</pre>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={() => setOpen(null)}>
                닫기
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  onRestore(v.text, v.stance, v.confidence)
                  setOpen(null)
                }}
              >
                이 버전으로 되돌리기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
