import { FireIcon, ListIcon, PositionsIcon } from '@/share/icons'

const tabs = [
  { id: 'positions', label: 'Positions', Icon: PositionsIcon },
  { id: 'trending', label: 'Trending', Icon: FireIcon },
  { id: 'watchlist', label: 'Watch List', Icon: ListIcon },
]

export function TopTabs() {
  return (
    <nav className="flex items-center gap-1.5">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          className="flex items-center gap-1 rounded-md border border-[#333333] bg-[#1e1e1e] px-2 py-[7px] text-[14px] font-semibold tracking-[-0.02em] text-white transition hover:bg-zinc-800"
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
