import { FeeIcon, LightningIcon } from '@/share/icons'

import { ModeToggle } from './modeToggle'

export function ActionBar() {
  return (
    <div className="mb-[5px] mt-[2px] flex h-[40px] items-center justify-between bg-[#0a0a0a]">
      <ModeToggle />
      <div className="flex items-center gap-1.5">
        <button className="flex items-center gap-1 rounded-md bg-[#1e1e1e] px-3 py-[7px] text-[14px] font-semibold tracking-[-0.02em] text-white transition-colors hover:bg-zinc-800">
          <FeeIcon />
          <span>Fee Settings</span>
        </button>
        <div className="flex items-center rounded-md border border-[#333333] bg-[#131313] p-[2px]">
          <button className="flex items-center gap-[2px] rounded-l-[6px] bg-[#131313] px-3 py-[5px] text-[14px] font-semibold tracking-[-0.02em] text-white transition-colors hover:bg-zinc-800">
            <LightningIcon />
            <span>Quick Buy</span>
          </button>
          <span className="min-w-[52px] rounded-[6px] bg-black px-3 py-[5px] text-[16px] font-semibold tracking-[-0.02em] text-white/60 text-align-left">
            $0
          </span>
        </div>
      </div>
    </div>
  )
}
