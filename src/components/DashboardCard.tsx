import type { ReactNode } from 'react'

type DashboardCardProps = {
  title: string
  eyebrow?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function DashboardCard({
  title,
  eyebrow,
  action,
  children,
  className = '',
  contentClassName = '',
}: DashboardCardProps) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white dashboard-shadow ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <div>
          {eyebrow && <p className="mb-1 text-xs font-bold uppercase text-slate-400">{eyebrow}</p>}
          <h2 className="text-[18px] font-extrabold text-slate-950">{title}</h2>
        </div>
        {action}
      </div>
      <div className={`p-6 ${contentClassName}`}>{children}</div>
    </section>
  )
}
