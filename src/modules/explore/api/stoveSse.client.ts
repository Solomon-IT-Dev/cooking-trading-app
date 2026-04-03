import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'

import { HttpStatusError, isAuthStatusError } from '@/modules/explore/api/stoveSse.errors'
import { toStoveBatch } from '@/modules/explore/api/stoveSse.mappers'
import type { StoveStreamOptions } from '@/modules/explore/api/stoveSse.types'
import {
  EXPLORE_SSE_PATH,
  SSE_HEARTBEAT_EVENTS,
  SSE_RETRY_BASE_DELAY_MS,
  SSE_RETRY_JITTER_MS,
  SSE_RETRY_MAX_EXPONENT,
} from '@/modules/explore/constants'

export async function connectStoveStream(options: StoveStreamOptions) {
  const { baseUrl, token, chain, signal, onBatch, onStatus, onError } = options
  const endpointUrl = new URL(EXPLORE_SSE_PATH, baseUrl)
  endpointUrl.searchParams.set('chain', chain)
  const endpoint = endpointUrl.toString()
  let isFirstMessage = true
  let isLive = false
  let retryAttempt = 0
  let lastErrorMessage: string | null = null

  await fetchEventSource(endpoint, {
    method: 'GET',
    signal,
    openWhenHidden: true,
    headers: {
      Accept: EventStreamContentType,
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    },
    async onopen(response) {
      logSseDebug('open', {
        endpoint,
        status: response.status,
        contentType: response.headers.get('content-type'),
      })

      if (!response.ok) {
        throw new HttpStatusError(response.status, `SSE open failed with status ${response.status}`)
      }

      const contentType = response.headers.get('content-type') ?? ''
      if (!contentType.includes(EventStreamContentType)) {
        throw new Error(`Unexpected content-type: ${contentType}`)
      }

      onStatus('connecting')
      isLive = false
      retryAttempt = 0
    },
    onmessage(message) {
      const normalizedEvent = message.event?.toLowerCase()

      if (normalizedEvent === 'error') {
        const serverMessage = message.data?.trim() || 'Unknown SSE server error'
        if (lastErrorMessage !== serverMessage) {
          console.error('[SSE stove] server error event', {
            event: normalizedEvent,
            data: serverMessage,
          })
        }
        lastErrorMessage = serverMessage
        onStatus('error')
        onError(serverMessage)
        throw new Error(serverMessage)
      }

      if (normalizedEvent && SSE_HEARTBEAT_EVENTS.has(normalizedEvent)) {
        return
      }
      if (!message.data || message.data === '[DONE]') {
        return
      }
      logSseDebug('message', {
        event: normalizedEvent ?? 'message',
        dataPreview: truncateForLog(message.data),
      })

      const batch = toStoveBatch(message, isFirstMessage)
      isFirstMessage = false
      if (!batch) {
        return
      }

      if (!isLive) {
        onStatus('live')
        isLive = true
      }
      onBatch(batch)
    },
    onclose() {
      logSseDebug('close')
      onStatus('reconnecting')
    },
    onerror(error) {
      const message = error instanceof Error ? error.message : 'Unknown SSE error'
      if (lastErrorMessage !== message) {
        console.error('[SSE stove] onerror', { message })
      }
      lastErrorMessage = message

      if (isNonRetriableSseError(message)) {
        onStatus('error')
        if (lastErrorMessage !== message) {
          lastErrorMessage = message
          onError(message)
        }
        throw error
      }

      if (isAuthStatusError(error, message)) {
        onStatus('error')
        onError('Unauthorized: token is invalid or expired. Please update VITE_STOVE_TOKEN.')
        throw error
      }

      onError(message)

      retryAttempt += 1
      onStatus('reconnecting')

      const cappedAttempt = Math.min(retryAttempt, SSE_RETRY_MAX_EXPONENT)
      const baseDelay = SSE_RETRY_BASE_DELAY_MS * 2 ** cappedAttempt
      const jitter = Math.floor(Math.random() * SSE_RETRY_JITTER_MS)
      return baseDelay + jitter
    },
  })
}

function isNonRetriableSseError(message: string) {
  const normalized = message.toLowerCase()
  return (
    normalized.includes('validation failed') ||
    normalized.includes('enum string is expected') ||
    normalized.includes('sse server error:')
  )
}

function truncateForLog(data: string, maxLength = 220) {
  if (data.length <= maxLength) {
    return data
  }
  return `${data.slice(0, maxLength)}...`
}

function logSseDebug(event: string, payload?: Record<string, unknown>) {
  if (!import.meta.env.DEV) {
    return
  }

  if (payload) {
    console.info(`[SSE stove] ${event}`, payload)
    return
  }

  console.info(`[SSE stove] ${event}`)
}
