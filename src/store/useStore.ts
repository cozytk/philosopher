import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'
import { del, get, set } from 'idb-keyval'
import type {
  Answer,
  AnswerStatus,
  CheckinResult,
  DialogueMessage,
  JoyLog,
  PhilosophyDoc,
  ProviderConfig,
  Reflection,
  Settings,
  Snapshot,
  UsageRecord,
  ValuesResult,
} from '@/types'
import { scoreAll } from '@/engine/scoring'
import { buildSampleAnswers, buildSampleCheckins, buildSampleJoyLogs, buildSampleSnapshots, buildSampleValues } from '@/content/sample'
import { dayKey, nowIso } from '@/lib/dates'
import type { ChatUsage } from '@/llm/client'

export const DATA_VERSION = 1
const STORAGE_KEY = 'philosopher-v1'

const idbStorage: StateStorage = {
  getItem: async (name) => (await get<string>(name)) ?? null,
  setItem: async (name, value) => {
    await set(name, value)
  },
  removeItem: async (name) => {
    await del(name)
  },
}

export interface ExportBundle {
  app: 'philosopher'
  version: number
  exportedAt: string
  data: PersistedState
}

export interface PersistedState {
  answers: Record<string, Answer>
  dialogues: Record<string, DialogueMessage[]>
  joyLogs: JoyLog[]
  checkins: CheckinResult[]
  valuesResult?: ValuesResult
  doc: PhilosophyDoc
  snapshots: Snapshot[]
  usage: UsageRecord
  settings: Settings
}

export interface StoreState extends PersistedState {
  hydrated: boolean
  setHydrated: (v: boolean) => void

  saveAnswer: (questionId: string, patch: Partial<Omit<Answer, 'questionId' | 'createdAt' | 'versions'>>) => void
  setAnswerStatus: (questionId: string, status: AnswerStatus) => void
  toggleLens: (questionId: string, lensId: string) => void
  setReflection: (questionId: string, reflection: Reflection) => void
  saveVersion: (questionId: string) => void
  deleteAnswer: (questionId: string) => void

  addDialogueMessage: (questionId: string, message: DialogueMessage) => void
  replaceLastAssistant: (questionId: string, content: string) => void
  clearDialogue: (questionId: string) => void

  addJoyLog: (log: JoyLog) => void
  removeJoyLog: (id: string) => void
  addCheckin: (result: CheckinResult) => void
  setValuesResult: (result: ValuesResult | undefined) => void
  setDoc: (content: string, source: 'manual' | 'ai') => void

  recordUsage: (feature: string, usage: ChatUsage) => void
  updateSettings: (patch: Partial<Settings>) => void
  setLlm: (patch: Partial<ProviderConfig>) => void
  recordSnapshot: () => void

  exportData: () => ExportBundle
  importData: (bundle: ExportBundle, mode: 'replace' | 'merge') => void
  resetAll: () => void
  /** Fill the workshop with clearly-labelled example data (kept separate from real answers by id). */
  loadSample: () => void
}

export const DEFAULT_SETTINGS: Settings = {
  llm: { provider: 'openrouter', monthlyBudgetUsd: 3, hardCap: false },
  theme: 'system',
  showTips: true,
  timerMinutes: 15,
  onboarded: false,
}

const EMPTY_USAGE: UsageRecord = { calls: 0, promptTokens: 0, completionTokens: 0, costUsd: 0, byFeature: {} }

const emptyState = (): PersistedState => ({
  answers: {},
  dialogues: {},
  joyLogs: [],
  checkins: [],
  valuesResult: undefined,
  doc: { content: '', updatedAt: nowIso(), versions: [] },
  snapshots: [],
  usage: { ...EMPTY_USAGE, byFeature: {} },
  settings: { ...DEFAULT_SETTINGS, llm: { ...DEFAULT_SETTINGS.llm } },
})

function newAnswer(questionId: string): Answer {
  const now = nowIso()
  return {
    questionId,
    text: '',
    openQuestions: [],
    linkedLensIds: [],
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    versions: [],
  }
}

const MAX_VERSIONS = 40

export const useStore = create<StoreState>()(
  persist(
    (setState, getState) => ({
      ...emptyState(),
      hydrated: false,
      setHydrated: (v) => setState({ hydrated: v }),

      saveAnswer: (questionId, patch) =>
        setState((s) => {
          const prev = s.answers[questionId] ?? newAnswer(questionId)
          const next: Answer = { ...prev, ...patch, questionId, updatedAt: nowIso() }
          const stanceChanged = (patch.stance ?? prev.stance) !== prev.stance && Boolean(prev.stance)
          if (stanceChanged) {
            // A changed stance is worth remembering: snapshot the previous state.
            const versions = [...prev.versions, { at: prev.updatedAt, text: prev.text, stance: prev.stance, confidence: prev.confidence }].slice(-MAX_VERSIONS)
            next.versions = versions
          }
          if (next.status === 'draft' && (next.text.replace(/\s+/g, '').length >= 80 || (next.stance && next.stance.length >= 8))) {
            next.status = 'answered'
          }
          return { answers: { ...s.answers, [questionId]: next } }
        }),

      setAnswerStatus: (questionId, status) =>
        setState((s) => {
          const prev = s.answers[questionId] ?? newAnswer(questionId)
          return { answers: { ...s.answers, [questionId]: { ...prev, status, updatedAt: nowIso() } } }
        }),

      toggleLens: (questionId, lensId) =>
        setState((s) => {
          const prev = s.answers[questionId] ?? newAnswer(questionId)
          const has = prev.linkedLensIds.includes(lensId)
          const linkedLensIds = has ? prev.linkedLensIds.filter((x) => x !== lensId) : [...prev.linkedLensIds, lensId]
          return { answers: { ...s.answers, [questionId]: { ...prev, linkedLensIds, updatedAt: nowIso() } } }
        }),

      setReflection: (questionId, reflection) =>
        setState((s) => {
          const prev = s.answers[questionId] ?? newAnswer(questionId)
          return { answers: { ...s.answers, [questionId]: { ...prev, reflection } } }
        }),

      saveVersion: (questionId) =>
        setState((s) => {
          const prev = s.answers[questionId]
          if (!prev) return {}
          const last = prev.versions[prev.versions.length - 1]
          if (last && last.text === prev.text && last.stance === prev.stance) return {}
          const versions = [...prev.versions, { at: nowIso(), text: prev.text, stance: prev.stance, confidence: prev.confidence }].slice(-MAX_VERSIONS)
          return { answers: { ...s.answers, [questionId]: { ...prev, versions } } }
        }),

      deleteAnswer: (questionId) =>
        setState((s) => {
          const answers = { ...s.answers }
          delete answers[questionId]
          const dialogues = { ...s.dialogues }
          delete dialogues[questionId]
          return { answers, dialogues }
        }),

      addDialogueMessage: (questionId, message) =>
        setState((s) => ({ dialogues: { ...s.dialogues, [questionId]: [...(s.dialogues[questionId] ?? []), message].slice(-60) } })),
      replaceLastAssistant: (questionId, content) =>
        setState((s) => {
          const list = [...(s.dialogues[questionId] ?? [])]
          for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].role === 'assistant') {
              list[i] = { ...list[i], content }
              break
            }
          }
          return { dialogues: { ...s.dialogues, [questionId]: list } }
        }),
      clearDialogue: (questionId) =>
        setState((s) => {
          const dialogues = { ...s.dialogues }
          delete dialogues[questionId]
          return { dialogues }
        }),

      addJoyLog: (log) => setState((s) => ({ joyLogs: [log, ...s.joyLogs].slice(0, 2000) })),
      removeJoyLog: (id) => setState((s) => ({ joyLogs: s.joyLogs.filter((l) => l.id !== id) })),
      addCheckin: (result) => setState((s) => ({ checkins: [...s.checkins, result].slice(-400) })),
      setValuesResult: (result) => setState({ valuesResult: result }),
      setDoc: (content, source) =>
        setState((s) => {
          const versions = s.doc.content && s.doc.content !== content ? [...s.doc.versions, { at: s.doc.updatedAt, content: s.doc.content, source }].slice(-20) : s.doc.versions
          return { doc: { content, updatedAt: nowIso(), versions } }
        }),

      recordUsage: (feature, usage) =>
        setState((s) => {
          const cost = usage.costUsd ?? 0
          const f = s.usage.byFeature[feature] ?? { calls: 0, costUsd: 0 }
          const month = monthKey()
          const monthCostUsd = (s.usage.month === month ? s.usage.monthCostUsd ?? 0 : 0) + cost
          return {
            usage: {
              calls: s.usage.calls + 1,
              promptTokens: s.usage.promptTokens + usage.promptTokens,
              completionTokens: s.usage.completionTokens + usage.completionTokens,
              costUsd: s.usage.costUsd + cost,
              byFeature: { ...s.usage.byFeature, [feature]: { calls: f.calls + 1, costUsd: f.costUsd + cost } },
              month,
              monthCostUsd,
            },
          }
        }),

      updateSettings: (patch) => setState((s) => ({ settings: { ...s.settings, ...patch } })),
      setLlm: (patch) => setState((s) => ({ settings: { ...s.settings, llm: { ...s.settings.llm, ...patch } } })),

      recordSnapshot: () =>
        setState((s) => {
          const overall = scoreAll(s.answers)
          const snap: Snapshot = {
            at: nowIso(),
            index: overall.index,
            domains: Object.fromEntries(overall.domains.map((d) => [d.domainId, d.score])),
          }
          const today = dayKey()
          const rest = s.snapshots.filter((x) => dayKey(x.at) !== today)
          const last = rest[rest.length - 1]
          if (last && last.index === snap.index && rest.length === s.snapshots.length) return {}
          return { snapshots: [...rest, snap].slice(-400) }
        }),

      exportData: () => {
        const s = getState()
        return {
          app: 'philosopher',
          version: DATA_VERSION,
          exportedAt: nowIso(),
          data: {
            answers: s.answers,
            dialogues: s.dialogues,
            joyLogs: s.joyLogs,
            checkins: s.checkins,
            valuesResult: s.valuesResult,
            doc: s.doc,
            snapshots: s.snapshots,
            usage: s.usage,
            settings: { ...s.settings, llm: { ...s.settings.llm, apiKey: undefined } },
          },
        }
      },

      importData: (bundle, mode) =>
        setState((s) => {
          const d = bundle.data
          if (mode === 'replace') {
            return { ...emptyState(), ...d, settings: { ...DEFAULT_SETTINGS, ...d.settings, llm: { ...s.settings.llm, ...(d.settings?.llm ?? {}), apiKey: s.settings.llm.apiKey } } }
          }
          const answers = { ...s.answers }
          for (const [k, v] of Object.entries(d.answers ?? {})) {
            const cur = answers[k]
            if (!cur || new Date(v.updatedAt).getTime() > new Date(cur.updatedAt).getTime()) answers[k] = v
          }
          const seenJoy = new Set(s.joyLogs.map((l) => l.id))
          const seenCheck = new Set(s.checkins.map((c) => c.id))
          return {
            answers,
            dialogues: { ...(d.dialogues ?? {}), ...s.dialogues },
            joyLogs: [...s.joyLogs, ...(d.joyLogs ?? []).filter((l) => !seenJoy.has(l.id))],
            checkins: [...s.checkins, ...(d.checkins ?? []).filter((c) => !seenCheck.has(c.id))],
            valuesResult: s.valuesResult ?? d.valuesResult,
            doc: s.doc.content ? s.doc : d.doc ?? s.doc,
            snapshots: [...(d.snapshots ?? []), ...s.snapshots].sort((a, b) => a.at.localeCompare(b.at)),
          }
        }),

      resetAll: () => setState({ ...emptyState() }),

      loadSample: () =>
        setState((s) => {
          const answers = { ...buildSampleAnswers(), ...s.answers }
          const overall = scoreAll(answers)
          const snapshots = s.snapshots.length >= 2 ? s.snapshots : buildSampleSnapshots(overall.index, Object.fromEntries(overall.domains.map((d) => [d.domainId, d.score])))
          const seenJoy = new Set(s.joyLogs.map((l) => l.id))
          const seenChk = new Set(s.checkins.map((c) => c.id))
          return {
            answers,
            joyLogs: [...s.joyLogs, ...buildSampleJoyLogs().filter((l) => !seenJoy.has(l.id))],
            checkins: [...s.checkins, ...buildSampleCheckins().filter((c) => !seenChk.has(c.id))].sort((a, b) => a.at.localeCompare(b.at)),
            valuesResult: s.valuesResult ?? buildSampleValues(),
            snapshots,
            settings: { ...s.settings, onboarded: true },
          }
        }),
    }),
    {
      name: STORAGE_KEY,
      version: DATA_VERSION,
      storage: createJSONStorage(() => idbStorage),
      partialize: (s) => ({
        answers: s.answers,
        dialogues: s.dialogues,
        joyLogs: s.joyLogs,
        checkins: s.checkins,
        valuesResult: s.valuesResult,
        doc: s.doc,
        snapshots: s.snapshots,
        usage: s.usage,
        settings: s.settings,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    },
  ),
)

export function monthKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** Month-to-date spend, used for the soft budget. */
export function monthSpend(usage: UsageRecord): number {
  return usage.month === monthKey() ? usage.monthCostUsd ?? 0 : 0
}
