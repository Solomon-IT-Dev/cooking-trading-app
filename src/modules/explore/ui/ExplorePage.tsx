import { useEffect, useMemo, useRef } from 'react'
import { toast } from 'sonner'

import { useExploreStream } from '@/modules/explore/hooks'
import { toToken } from '@/modules/explore/lib'
import {
  selectStoveById,
  selectStoveOrder,
  selectStreamError,
  selectStreamStatus,
  useExploreStore,
} from '@/modules/explore/model'
import { ActionBar, type Column, TokenColumn } from '@/modules/explore/ui/components'

import { PageScaffold } from './layout'

export function ExplorePage() {
  useExploreStream()

  const byId = useExploreStore(selectStoveById)
  const order = useExploreStore(selectStoveOrder)
  const streamStatus = useExploreStore(selectStreamStatus)
  const streamError = useExploreStore(selectStreamError)
  const lastErrorRef = useRef<string | null>(null)

  useEffect(() => {
    if (!streamError) {
      lastErrorRef.current = null
      return
    }

    if (lastErrorRef.current === streamError) {
      return
    }

    lastErrorRef.current = streamError
    toast.error(streamError, {
      id: `stove-stream-error:${streamError}`,
      duration: 8000,
      style: {
        padding: '8px 10px',
        fontSize: '13px',
        minHeight: 'auto',
      },
    })
  }, [streamError])

  const rows = useMemo(() => order.map(id => byId[id]).filter(Boolean), [byId, order])

  const isColumnsLoading =
    rows.length === 0 &&
    (streamStatus === 'idle' || streamStatus === 'connecting' || streamStatus === 'reconnecting')

  const columns = useMemo<Column[]>(() => {
    if (rows.length === 0) {
      return [
        { id: 'new', title: 'New Tokens', tokens: [] },
        { id: 'graduate', title: 'About To Graduate', tokens: [] },
        { id: 'graduated', title: 'Graduated', tokens: [] },
      ]
    }

    const newTokens = []
    const aboutToGraduate = []
    const graduated = []

    for (const row of rows) {
      const token = toToken(row)

      if (row.category === 'newPairs') {
        newTokens.push(token)
      } else if (row.category === 'aboutToMigrate') {
        aboutToGraduate.push(token)
      } else {
        graduated.push(token)
      }
    }

    return [
      { id: 'new', title: 'New Tokens', tokens: newTokens },
      { id: 'graduate', title: 'About To Graduate', tokens: aboutToGraduate },
      { id: 'graduated', title: 'Graduated', tokens: graduated },
    ]
  }, [rows])

  return (
    <PageScaffold header={<ActionBar />} contentClassName="min-h-0 flex-1">
      <main className="h-[calc(100%-30px)] overflow-hidden">
        <div className="grid h-full min-h-0 grid-cols-3 gap-[9px]">
          {columns.map(column => (
            <TokenColumn
              key={column.id}
              title={column.title}
              tokens={column.tokens}
              isLoading={isColumnsLoading}
            />
          ))}
        </div>
      </main>
    </PageScaffold>
  )
}
