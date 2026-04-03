import type { StoveBatch } from '@/modules/explore/model'

export type StoveChain = 'solana' | 'bsc' | 'base'

export type StoveStreamStatus = 'connecting' | 'live' | 'reconnecting' | 'error'

export type StoveStreamHandlers = {
  onStatus: (status: StoveStreamStatus) => void
  onBatch: (batch: StoveBatch) => void
  onError: (message: string) => void
}

export type StoveStreamOptions = {
  baseUrl: string
  token: string
  chain: StoveChain
  signal: AbortSignal
} & StoveStreamHandlers
