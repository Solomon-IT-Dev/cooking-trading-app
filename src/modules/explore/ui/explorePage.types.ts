export type TokenStats = {
  top10HoldPercent: string
  devHoldPercent: string
  traders: number
  holders: number
  liquidity: string
  volume: string
  cap: string
  bcp: string
  age: string
}

export type Token = {
  id: string
  name: string
  symbol: string
  address: string
  avatar: string
  quickBuyLabel: string
  socials: {
    twitter: string | null
    telegram: string | null
    website: string | null
  }
  badges: {
    developerHolding: boolean
    auditAvailable: boolean
  }
  stats: TokenStats
}

export type Column = {
  id: string
  title: string
  tokens: Token[]
}
