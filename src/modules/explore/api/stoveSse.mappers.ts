import { SSE_PAYLOAD_ARRAY_KEYS } from '@/modules/explore/constants'
import type { StoveBatch, StoveCategory, StoveEntity } from '@/modules/explore/model'

import type { EventSourceMessage } from '@microsoft/fetch-event-source'

export function toStoveBatch(message: EventSourceMessage, isFirstMessage: boolean): StoveBatch | null {
  let payload: unknown
  try {
    payload = JSON.parse(message.data)
  } catch {
    return null
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return null
  }

  const mode = resolveBatchMode(payload, message.event, isFirstMessage)
  const items = extractItems(payload as Record<string, unknown>)
  if (items.length === 0) {
    return null
  }

  return { mode, items }
}

function resolveBatchMode(
  payload: unknown,
  eventName: string | undefined,
  isFirstMessage: boolean
): StoveBatch['mode'] {
  const normalizedEvent = eventName?.toLowerCase() ?? ''
  if (normalizedEvent.includes('snapshot') || normalizedEvent.includes('initial')) {
    return 'snapshot'
  }

  if (typeof payload === 'object' && payload !== null && !Array.isArray(payload)) {
    const kind = getString(payload, ['type', 'event', 'kind', 'action'])?.toLowerCase() ?? ''
    if (kind.includes('snapshot') || kind.includes('initial')) {
      return 'snapshot'
    }
    if (kind.includes('update') || kind.includes('delta')) {
      return 'update'
    }
  }

  return isFirstMessage ? 'snapshot' : 'update'
}

function extractItems(payload: Record<string, unknown>): StoveEntity[] {
  const items: StoveEntity[] = []

  for (const category of SSE_PAYLOAD_ARRAY_KEYS) {
    const rawList = payload[category]
    if (!Array.isArray(rawList)) {
      continue
    }

    for (const [index, raw] of rawList.entries()) {
      const entity = toEntity(raw, `${category}-${index}`, category)
      if (entity) {
        items.push(entity)
      }
    }
  }

  return items
}

function toEntity(raw: unknown, fallbackId: string, category: StoveCategory): StoveEntity | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }

  const id = getString(raw, ['mint']) ?? fallbackId
  const symbol = getString(raw, ['symbol']) ?? 'N/A'
  const name = getString(raw, ['name']) ?? symbol
  const source = getString(raw, ['provider', 'initialLiquidityProvider']) ?? 'unknown'
  const image = getString(raw, ['image', 'icon'])
  const price = getNumber(raw, ['price', 'marketData.price', 'usdPrice'])
  const marketCap = getNumber(raw, ['marketCap', 'mcap'])
  const volume = getNumber(raw, ['volume'])
  const liquidity = getNumber(raw, ['liquidity', 'stats24H.liquidity'])
  const holders = getNumber(raw, ['totalHolders'])
  const transactionsBuy = getNumber(raw, ['transactionsBuy', 'marketData.buyCount', 'stats24H.numBuys'])
  const transactionsSell = getNumber(raw, [
    'transactionsSell',
    'marketData.sellCount',
    'stats24H.numSells',
  ])
  const traders = getNumber(raw, ['stats24H.numTraders'])
  const bondingCurveProgress = getNumber(raw, ['bondingCurveProgress', 'realCurvePercent'])
  const priceChange24h = getNumber(raw, ['stats24H.priceChange'])
  const top10HoldPercentage = getNumber(raw, ['top10HoldPercentage'])
  const devHoldPercentage = getNumber(raw, ['devHoldPercentage'])
  const createdAt = getNumber(raw, ['creationDate', 'cachedAt'])
  const devSold = getBoolean(raw, ['devSold'])
  const auditDataAvailable = getBoolean(raw, ['audit.auditDataAvailable'])
  const socials = {
    twitter: getString(raw, ['socials.twitter', 'twitter']),
    telegram: getString(raw, ['socials.telegram', 'telegram']),
    website: getString(raw, ['socials.website', 'website']),
  }

  return {
    id,
    name,
    symbol,
    category,
    source,
    price,
    marketCap,
    volume,
    liquidity,
    holders,
    transactionsBuy,
    transactionsSell,
    traders,
    bondingCurveProgress,
    priceChange24h,
    top10HoldPercentage,
    devHoldPercentage,
    createdAt,
    image,
    devSold,
    auditDataAvailable,
    socials,
  }
}

function getBoolean(source: unknown, keys: string[]): boolean | null {
  for (const key of keys) {
    const value = getByPath(source, key)
    if (typeof value === 'boolean') {
      return value
    }
  }
  return null
}

function getString(source: unknown, keys: string[]): string | null {
  for (const key of keys) {
    const value = getByPath(source, key)
    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }
  return null
}

function getNumber(source: unknown, keys: string[]): number | null {
  for (const key of keys) {
    const value = getByPath(source, key)
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value.replace('%', '').replace(/,/g, ''))
      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }
  return null
}

function getByPath(source: unknown, path: string): unknown {
  if (!source || typeof source !== 'object') {
    return undefined
  }

  const chunks = path.split('.')
  let current: unknown = source
  for (const chunk of chunks) {
    if (!current || typeof current !== 'object' || Array.isArray(current) || !(chunk in current)) {
      return undefined
    }
    current = (current as Record<string, unknown>)[chunk]
  }

  return current
}
