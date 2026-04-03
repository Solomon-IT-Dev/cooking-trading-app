import { ChevronDownIcon, CopyIcon } from '@/share/icons'

export function BalanceDisplay() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#333333] bg-[#131313] px-[14px] py-[9px]">
      <span className="font-mono text-[13px] font-bold tracking-tight text-white">1102.004343</span>
      <span className="text-sm">🌀</span>
      <button className="text-zinc-500 transition-colors hover:text-zinc-200">
        <CopyIcon />
      </button>
      <button className="text-zinc-500 transition-colors hover:text-zinc-200">
        <ChevronDownIcon />
      </button>
    </div>
  )
}
