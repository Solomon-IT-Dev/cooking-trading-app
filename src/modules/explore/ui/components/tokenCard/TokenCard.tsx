import { memo } from 'react'

import type { Token } from '@/modules/explore/ui/explorePage.types'

import { StatsRow } from './statsRow'
import { TokenCardHeader } from './tokenCardHeader'

interface TokenCardProps {
  token: Token
}

function TokenCardComponent({ token }: TokenCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800/80 bg-[#131313] px-3 py-2 transition-colors hover:border-zinc-700/80 hover:bg-[#181818]">
      <TokenCardHeader token={token} />
      <div className="my-1.5 h-px bg-zinc-800/60" />
      <div className="flex flex-col gap-1">
        <StatsRow stats={token.stats} />
      </div>
    </div>
  )
}

export const TokenCard = memo(TokenCardComponent)
