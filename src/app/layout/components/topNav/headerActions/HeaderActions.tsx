import { BellIcon, SettingsIcon } from '@/share/icons'

import { BalanceDisplay } from './balanceDisplay'
import { IconButton } from './iconButton'
import { ProfileAvatar } from './profileAvatar'

export function HeaderActions() {
  return (
    <div className="flex items-center gap-1">
      <BalanceDisplay />
      <IconButton>
        <SettingsIcon />
      </IconButton>
      <IconButton>
        <BellIcon />
      </IconButton>
      <ProfileAvatar />
    </div>
  )
}
