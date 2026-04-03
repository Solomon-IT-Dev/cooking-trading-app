import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

import { TokenCard } from '@/modules/explore/ui/components/tokenCard'
import type { Token } from '@/modules/explore/ui/explorePage.types'
import { InfoIcon } from '@/share/icons'

import { ColumnEmptyState } from './columnEmptyState'
import { ColumnSkeleton } from './columnSkeleton'

interface TokenColumnProps {
  title: string
  tokens: Token[]
  isLoading?: boolean
}

export function TokenColumn({ title, tokens, isLoading = false }: TokenColumnProps) {
  const titleClassName = getTitleClassName(title)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 132,
    overscan: 6,
  })
  const virtualRows = rowVirtualizer.getVirtualItems()

  return (
    <section className="relative flex min-h-0 flex-col border-[0.5px] border-gray-900 rounded-xl">
      <div className="flex h-[55px] items-center gap-1.5 px-2">
        <h2
          className={`text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] ${titleClassName}`}
        >
          {title}
        </h2>
        <button className="text-zinc-600 transition-colors hover:text-zinc-400">
          <InfoIcon />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="token-scrollbar flex flex-1 flex-col overflow-y-auto px-2 pb-2 pr-3"
      >
        {isLoading ? (
          <ColumnSkeleton />
        ) : tokens.length === 0 ? (
          <ColumnEmptyState />
        ) : (
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
            {virtualRows.map(virtualRow => {
              const token = tokens[virtualRow.index]

              return (
                <div
                  key={token.id}
                  ref={rowVirtualizer.measureElement}
                  data-index={virtualRow.index}
                  className="absolute left-0 top-0 w-full pb-2"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  <TokenCard token={token} />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}

function getTitleClassName(title: string): string {
  if (title === 'New Tokens') {
    return 'text-[#b279ff]'
  }

  if (title === 'About To Graduate') {
    return 'text-[#f1c83f]'
  }

  return 'text-[#4cdcff]'
}
