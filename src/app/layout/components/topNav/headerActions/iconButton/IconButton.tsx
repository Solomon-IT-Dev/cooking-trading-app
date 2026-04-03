import type { ReactNode } from 'react'

type IconButtonProps = {
  children: ReactNode
}

export function IconButton({ children }: IconButtonProps) {
  return (
    <button className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#333333] bg-[#131313] text-zinc-400 transition-colors hover:text-white">
      {children}
    </button>
  )
}
