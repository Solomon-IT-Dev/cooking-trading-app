import { Outlet } from 'react-router-dom'

import { Sidebar, TopNav } from './components'

export function AppLayout() {
  return (
    <div className="flex h-screen gap-2 overflow-hidden bg-[#0a0a0a] px-2 py-2 text-white antialiased">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <TopNav />
        <Outlet />
      </div>
    </div>
  )
}
