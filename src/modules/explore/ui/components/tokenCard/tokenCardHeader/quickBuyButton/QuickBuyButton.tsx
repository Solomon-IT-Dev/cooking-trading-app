import { LightningIcon } from '@/share/icons'

type QuickBuyButtonProps = {
  amountLabel: string
}

export function QuickBuyButton({ amountLabel }: QuickBuyButtonProps) {
  return (
    <button className="flex items-center gap-1.5 rounded-md border border-zinc-700/70 bg-[#1e1e1e] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:border-zinc-600 hover:bg-zinc-700">
      <LightningIcon />
      <span>{amountLabel}</span>
    </button>
  )
}
