import type { ReactNode } from 'react'

type PageScaffoldProps = {
  header?: ReactNode
  children: ReactNode
  contentClassName?: string
}

export function PageScaffold({ header, children, contentClassName }: PageScaffoldProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      {header}
      <div className={contentClassName ?? 'flex-1'}>{children}</div>
    </section>
  )
}

