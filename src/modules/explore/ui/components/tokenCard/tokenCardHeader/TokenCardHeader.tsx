import type { Token } from '@/modules/explore/ui/explorePage.types'
import { CopyIcon } from '@/share/icons'

import { QuickBuyButton } from './quickBuyButton'
import { StatusIcons } from './statusIcons'

type TokenCardHeaderProps = {
  token: Token
}

export function TokenCardHeader({ token }: TokenCardHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex min-w-0 items-center gap-2.5">
        <img
          src={token.avatar}
          alt={token.name}
          className="w-10 h-10 rounded-full bg-zinc-800 ring-1 ring-zinc-700/40 flex-shrink-0"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="max-w-[180px] min-w-[20px] truncate font-semibold text-[13px] text-white">
              {token.name}
            </span>
            <span className="text-[11px] uppercase text-zinc-500">{token.symbol}</span>
            <span className="font-mono text-xs text-zinc-500">{token.address}</span>
            <button className="p-0.5 text-zinc-600 transition-colors hover:text-zinc-400">
              <CopyIcon />
            </button>
          </div>
          <StatusIcons socials={token.socials} badges={token.badges} />
        </div>
      </div>

      <QuickBuyButton amountLabel={token.quickBuyLabel} />
    </div>
  )
}
