import {
  ExploreIcon,
  HomeIcon,
  LogoIcon,
  PerpetualsIcon,
  PortfolioIcon,
  ReferralIcon,
  StrategiesIcon,
} from '@/share/icons'

const navItems = [
  { id: 'home', Icon: HomeIcon },
  { id: 'explore', Icon: ExploreIcon },
  { id: 'perpetuals', Icon: PerpetualsIcon },
  { id: 'portfolio', Icon: PortfolioIcon },
  { id: 'strategies', Icon: StrategiesIcon },
  { id: 'referral', Icon: ReferralIcon },
]

export function Sidebar() {
  return (
    <aside className="flex h-full w-14 flex-col items-center bg-[#0a0a0a] py-1">
      <div className="mb-4 mt-[1px]">
        <LogoIcon />
      </div>
      <nav className="flex flex-col items-center gap-1">
        {navItems.map(({ id, Icon }) => (
          <button
            key={id}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800/45 hover:text-zinc-100"
          >
            <Icon />
          </button>
        ))}
      </nav>
    </aside>
  )
}
