import { create } from 'zustand'

import type { StoveBatch, StoveEntity, StreamStatus } from './explore.types'

export type ExploreStoreState = {
  byId: Record<string, StoveEntity>
  order: string[]
  streamStatus: StreamStatus
  streamError: string | null
  lastEventAt: number | null
  totalEvents: number
  setStreamStatus: (status: StreamStatus) => void
  setStreamError: (message: string | null) => void
  applyBatch: (batch: StoveBatch) => void
  applyBatches: (batches: StoveBatch[]) => void
  reset: () => void
}

const initialState = {
  byId: {},
  order: [],
  streamStatus: 'idle' as const,
  streamError: null,
  lastEventAt: null,
  totalEvents: 0,
}

export const useExploreStore = create<ExploreStoreState>((set) => ({
  ...initialState,
  setStreamStatus: (status) =>
    set((state) => (state.streamStatus === status ? state : { streamStatus: status })),
  setStreamError: (message) =>
    set((state) => (state.streamError === message ? state : { streamError: message })),
  applyBatch: (batch) => set((state) => applyBatchesToState(state, [batch])),
  applyBatches: (batches) =>
    set((state) => {
      if (batches.length === 0) {
        return state
      }
      return applyBatchesToState(state, batches)
    }),
  reset: () => set(initialState),
}))

function applyBatchesToState(
  state: Pick<ExploreStoreState, 'byId' | 'order' | 'lastEventAt' | 'totalEvents'>,
  batches: StoveBatch[]
) {
  let byId = state.byId
  let order = state.order

  for (const batch of batches) {
    if (batch.mode === 'snapshot') {
      const snapshotById: Record<string, StoveEntity> = {}
      const snapshotOrder: string[] = []
      for (const item of batch.items) {
        snapshotById[item.id] = item
        snapshotOrder.push(item.id)
      }
      byId = snapshotById
      order = snapshotOrder
      continue
    }

    const nextById = { ...byId }
    const nextOrder = [...order]
    for (const item of batch.items) {
      const exists = nextById[item.id] !== undefined
      nextById[item.id] = exists ? { ...nextById[item.id], ...item } : item
      if (!exists) {
        nextOrder.push(item.id)
      }
    }
    byId = nextById
    order = nextOrder
  }

  return {
    byId,
    order,
    lastEventAt: Date.now(),
    totalEvents: state.totalEvents + batches.length,
  }
}
