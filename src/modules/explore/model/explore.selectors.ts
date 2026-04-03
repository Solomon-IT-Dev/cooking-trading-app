import type { ExploreStoreState } from './store'

export const selectStoveById = (state: ExploreStoreState) => state.byId
export const selectStoveOrder = (state: ExploreStoreState) => state.order
export const selectStreamStatus = (state: ExploreStoreState) => state.streamStatus
export const selectStreamError = (state: ExploreStoreState) => state.streamError
export const selectLastEventAt = (state: ExploreStoreState) => state.lastEventAt
export const selectTotalEvents = (state: ExploreStoreState) => state.totalEvents
