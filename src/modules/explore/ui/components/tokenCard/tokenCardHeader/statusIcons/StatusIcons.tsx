import type { Token } from '@/modules/explore/ui/explorePage.types'
import { GlobeIcon, TelegramIcon, XIcon } from '@/share/icons'

import { PillBadge } from './pillBadge'
import { SpiralBadge } from './spiralBadge'

import type { ReactNode } from 'react'

type StatusIconsProps = {
  socials: Token['socials']
  badges: Token['badges']
}

export function StatusIcons({ socials, badges }: StatusIconsProps) {
  return (
    <div className="flex items-center gap-1 text-zinc-500">
      {badges.developerHolding ? <PillBadge /> : null}
      {badges.auditAvailable ? <SpiralBadge /> : null}
      {badges.developerHolding || badges.auditAvailable ? (
        <div className="w-px h-3 bg-zinc-700 mx-0.5" />
      ) : null}
      <SocialLink href={socials.twitter} ariaLabel="Open Twitter">
        <XIcon />
      </SocialLink>
      <SocialLink href={socials.telegram} ariaLabel="Open Telegram">
        <TelegramIcon />
      </SocialLink>
      <SocialLink href={socials.website} ariaLabel="Open Website">
        <GlobeIcon />
      </SocialLink>
    </div>
  )
}

type SocialLinkProps = {
  href: string | null
  ariaLabel: string
  children: ReactNode
}

function SocialLink({ href, ariaLabel, children }: SocialLinkProps) {
  if (!href) {
    return <span className="text-zinc-700">{children}</span>
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className="transition-colors hover:text-zinc-300"
    >
      {children}
    </a>
  )
}
