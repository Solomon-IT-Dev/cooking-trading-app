export const EXPLORE_SSE_PATH = '/kitchen/stove'

export const FLUSH_INTERVAL_MS = 16

export const SSE_RETRY_BASE_DELAY_MS = 500
export const SSE_RETRY_MAX_EXPONENT = 6
export const SSE_RETRY_JITTER_MS = 300

export const SSE_HEARTBEAT_EVENTS = new Set(['heartbeat', 'ping'])

export const SSE_PAYLOAD_ARRAY_KEYS = ['newPairs', 'aboutToMigrate', 'migrated'] as const
