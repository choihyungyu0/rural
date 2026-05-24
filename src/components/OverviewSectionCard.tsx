import type { ReactNode } from 'react'
import { LocalImage } from './LocalImage'

type OverviewSectionCardProps = {
  title: string
  iconSrc: string
  iconAlt: string
  children: ReactNode
  className?: string
}

export function OverviewSectionCard({
  title,
  iconSrc,
  iconAlt,
  children,
  className = '',
}: OverviewSectionCardProps) {
  return (
    <section className={`overviewPanel ${className}`}>
      <div className="panelTitle">
        <LocalImage
          src={iconSrc}
          alt={iconAlt}
          className="panelTitleIcon"
          fallbackLabel={title}
        />
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}
