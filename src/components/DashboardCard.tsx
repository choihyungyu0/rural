import { useId, type ReactNode } from 'react'
import { ImageWithFallback } from './ImageWithFallback'

type DashboardCardProps = {
  title: string
  iconSrc: string
  iconAlt: string
  children: ReactNode
  className?: string
}

export function DashboardCard({
  title,
  iconSrc,
  iconAlt,
  children,
  className = '',
}: DashboardCardProps) {
  const titleId = useId()

  return (
    <section className={`dashboardCard ${className}`} aria-labelledby={titleId}>
      <div className="dashboardCardHeader">
        <ImageWithFallback
          src={iconSrc}
          alt={iconAlt}
          className="dashboardCardIcon"
          fallbackLabel={title}
        />
        <h2 id={titleId}>{title}</h2>
      </div>
      <div className="dashboardCardBody">{children}</div>
    </section>
  )
}
