import { HeaderActions } from './headerActions'
import { TopTabs } from './topTabs'

export function TopNav() {
  return (
    <header className="mb-[3px] flex h-[38px] items-center justify-between bg-[#0a0a0a]">
      <TopTabs />
      <HeaderActions />
    </header>
  )
}
