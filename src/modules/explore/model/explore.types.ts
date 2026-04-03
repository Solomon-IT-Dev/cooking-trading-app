export type StreamStatus = 'idle' | 'connecting' | 'live' | 'reconnecting' | 'error'

export type StoveCategory = 'newPairs' | 'aboutToMigrate' | 'migrated'

export type StoveSocialLinks = {
  twitter: string | null
  telegram: string | null
  website: string | null
}

export type StoveEntity = {
  id: string
  name: string
  symbol: string
  category: StoveCategory
  source: string
  image: string | null
  price: number | null
  marketCap: number | null
  volume: number | null
  liquidity: number | null
  holders: number | null
  transactionsBuy: number | null
  transactionsSell: number | null
  traders: number | null
  bondingCurveProgress: number | null
  priceChange24h: number | null
  top10HoldPercentage: number | null
  devHoldPercentage: number | null
  createdAt: number | null
  devSold: boolean | null
  auditDataAvailable: boolean | null
  socials: StoveSocialLinks
}

export type StoveUpdateMode = 'snapshot' | 'update'

export type StoveBatch = {
  mode: StoveUpdateMode
  items: StoveEntity[]
}
