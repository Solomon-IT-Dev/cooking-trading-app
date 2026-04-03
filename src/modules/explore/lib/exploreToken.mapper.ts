import type { StoveEntity } from '@/modules/explore/model'
import type { Token } from '@/modules/explore/ui/explorePage.types'

const DEFAULT_ADDRESS = '----...----'
const DEFAULT_QUICK_BUY_LABEL = '$100'
const tokenCache = new WeakMap<StoveEntity, Token>()

export function toToken(row: StoveEntity): Token {
  const cached = tokenCache.get(row)
  if (cached) {
    return cached
  }

  const token: Token = {
    id: row.id,
    name: row.name,
    symbol: row.symbol,
    address: shortenAddress(row.id),
    avatar:
      row.image ?? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(row.id)}`,
    quickBuyLabel: DEFAULT_QUICK_BUY_LABEL,
    socials: row.socials,
    badges: {
      developerHolding: (row.devHoldPercentage ?? 0) > 0 && row.devSold !== true,
      auditAvailable: row.auditDataAvailable === true,
    },
    stats: {
      top10HoldPercent: formatPercent(row.top10HoldPercentage),
      devHoldPercent: formatPercent(row.devHoldPercentage),
      traders: toCount(row.traders ?? totalTransactions(row)),
      holders: toCount(row.holders),
      liquidity: formatUsd(row.liquidity),
      volume: formatUsd(row.volume),
      cap: withDollar(row.marketCap),
      bcp: formatPercent(row.bondingCurveProgress),
      age: formatAge(row.createdAt),
    },
  }

  tokenCache.set(row, token)
  return token
}

function totalTransactions(row: StoveEntity): number | null {
  const buy = row.transactionsBuy ?? 0
  const sell = row.transactionsSell ?? 0
  const sum = buy + sell
  return Number.isFinite(sum) ? sum : null
}

function shortenAddress(value: string): string {
  if (!value || value.length < 8) {
    return DEFAULT_ADDRESS
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function toCount(value: number | null): number {
  if (value === null || !Number.isFinite(value)) {
    return 0
  }
  return Math.max(0, Math.round(value))
}

function formatPercent(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return '0%'
  }
  return `${value.toFixed(value >= 10 ? 0 : 2)}%`
}

function withDollar(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return '$0'
  }

  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }

  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }

  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}k`
  }

  if (value >= 1) {
    return `$${value.toFixed(2)}`
  }

  if (value > 0) {
    return `$${value.toFixed(6)}`
  }

  return '$0'
}

function formatUsd(value: number | null): string {
  return withDollar(value)
}

function formatAge(value: number | null): string {
  if (!value || !Number.isFinite(value)) {
    return '--'
  }

  const createdMs = value > 1_000_000_000_000 ? value : value * 1000
  const deltaSeconds = Math.max(0, Math.floor((Date.now() - createdMs) / 1000))

  if (deltaSeconds < 60) {
    return `${deltaSeconds}s`
  }
  if (deltaSeconds < 3600) {
    return `${Math.floor(deltaSeconds / 60)}m`
  }
  if (deltaSeconds < 86_400) {
    return `${Math.floor(deltaSeconds / 3600)}h`
  }
  return `${Math.floor(deltaSeconds / 86_400)}d`
}
