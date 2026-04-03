import { useEffect, useRef } from 'react'

import { connectStoveStream } from '@/modules/explore/api'
import { FLUSH_INTERVAL_MS } from '@/modules/explore/constants'
import type { StoveBatch } from '@/modules/explore/model'
import { useExploreStore } from '@/modules/explore/model'

const STOVE_CHAIN = 'solana' as const

export function useExploreStream() {
  const queueRef = useRef<StoveBatch[]>([])
  const rafIdRef = useRef<number | null>(null)
  const lastFlushAtRef = useRef(0)
  const isDisposedRef = useRef(false)

  useEffect(() => {
    isDisposedRef.current = false
    const { setStreamStatus, setStreamError } = useExploreStore.getState()
    const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
    const token = import.meta.env.VITE_STOVE_TOKEN as string | undefined

    if (!baseUrl || !token) {
      setStreamStatus('error')
      setStreamError('Missing VITE_API_BASE_URL or VITE_STOVE_TOKEN')
      return
    }

    const abortController = new AbortController()
    setStreamStatus('connecting')
    setStreamError(null)

    const flushQueue = (now: number) => {
      rafIdRef.current = null
      if (isDisposedRef.current) {
        return
      }

      if (now - lastFlushAtRef.current < FLUSH_INTERVAL_MS) {
        scheduleFlush()
        return
      }

      const batches = queueRef.current
      if (batches.length === 0) {
        return
      }

      queueRef.current = []
      lastFlushAtRef.current = now

      useExploreStore.getState().applyBatches(batches)
      scheduleFlush()
    }

    const scheduleFlush = () => {
      if (isDisposedRef.current || rafIdRef.current !== null) {
        return
      }
      rafIdRef.current = requestAnimationFrame(flushQueue)
    }

    void connectStoveStream({
      baseUrl,
      token,
      chain: STOVE_CHAIN,
      signal: abortController.signal,
      onStatus: setStreamStatus,
      onError: setStreamError,
      onBatch: batch => {
        queueRef.current.push(batch)
        scheduleFlush()
      },
    }).catch(error => {
      if (abortController.signal.aborted) {
        return
      }

      const message = error instanceof Error ? error.message : 'Unknown stream error'
      setStreamStatus('error')
      setStreamError(message)
    })

    return () => {
      isDisposedRef.current = true
      abortController.abort()
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      queueRef.current = []
    }
  }, [])
}
