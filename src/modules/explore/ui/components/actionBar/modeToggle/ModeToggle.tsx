import { useState } from 'react'

type Mode = 'normal' | 'special'

const modes: { id: Mode; label: string }[] = [
  { id: 'normal', label: 'Normal Mode' },
  { id: 'special', label: 'Special Mode' },
]

export function ModeToggle() {
  const [active, setActive] = useState<Mode>('normal')

  return (
    <div className="flex h-[40px] w-[328px] items-center rounded-lg bg-[#1e1e1e] p-[2px]">
      {modes.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={`flex-1 rounded-md px-[10px] py-[5px] text-[14px] font-semibold tracking-[-0.02em] transition-colors ${
            active === id
              ? 'bg-[#16dc55] text-black'
              : 'text-zinc-100 hover:bg-zinc-800/60'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
