import type { Token } from '@/modules/explore/ui/explorePage.types'
import { ClockIcon, PersonIcon } from '@/share/icons'

type StatsRowProps = {
  stats: Token['stats']
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="text-purple-400 text-xs">☂️</span>
            <span className="text-purple-400 text-xs">{stats.top10HoldPercent}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs">〽️</span>
            <span className="text-yellow-400 text-xs">{stats.devHoldPercent}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-cyan-400 text-xs">🌐</span>
            <span className="text-cyan-400 text-xs">{stats.traders}</span>
          </span>
        </div>
        <span className="text-zinc-500 text-xs">
          BCP <span className="text-white">{stats.bcp}</span>
        </span>
      </div>

      <div className="flex items-center justify-between text-zinc-500 text-[11px]">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1">
            <PersonIcon />
            <span className="text-white">{stats.holders}</span>
          </span>
          <span>
            Liq <span className="text-white">{stats.liquidity}</span>
          </span>
          <span>
            Vol <span className="text-white">{stats.volume}</span>
          </span>
          <span>
            Cap <span className="text-white">{stats.cap}</span>
          </span>
        </div>
        <span className="flex items-center gap-1">
          <ClockIcon />
          <span>{stats.age}</span>
        </span>
      </div>
    </>
  )
}
