import { Bed, Clock, TrendingDown, TrendingUp, Users, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { KpiMetric } from '../data/dashboardData'

type KpiCardProps = {
  metric: KpiMetric
}

const iconByLabel: Record<string, LucideIcon> = {
  '총 방문자 수': Users,
  '평균 체류시간': Clock,
  '1인당 관광소비': Wallet,
  '숙박 전환율': Bed,
}

export function KpiCard({ metric }: KpiCardProps) {
  const Icon = iconByLabel[metric.label] ?? Users
  const TrendIcon = metric.direction === 'up' ? TrendingUp : TrendingDown
  const tone =
    metric.direction === 'up'
      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
      : 'border-rose-100 bg-rose-50 text-rose-700'

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 dashboard-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
          <p className="mt-3 text-[28px] font-extrabold text-slate-950">{metric.value}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700">
          <Icon size={20} />
        </span>
      </div>
      <div className={`mt-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${tone}`}>
        <TrendIcon size={13} />
        {metric.change}
      </div>
    </article>
  )
}
