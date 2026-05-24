import { DashboardCard } from '../components/DashboardCard'
import { Hero } from '../components/Hero'
import { KpiCard } from '../components/KpiCard'
import { DonutChart } from '../components/charts/DonutChart'
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart'
import { LineTrendChart } from '../components/charts/LineTrendChart'
import { VerticalBarChart } from '../components/charts/VerticalBarChart'
import {
  inflowRegions,
  kpiMetrics,
  linkageMetrics,
  monthlyTrend,
  prototypeNote,
  spendingShare,
  timeDistribution,
} from '../data/dashboardData'

export function AnalysisPage() {
  return (
    <div className="space-y-6">
      <Hero
        title="방문 흐름·체류시간·관광소비 분석"
        subtitle="방문 흐름과 소비 구조를 바탕으로 체류형 농촌관광의 가능성을 분석합니다."
        diagnosis="오후 방문 비중이 높고 음식·숙박 소비가 64%를 차지해 체류형 미식 패키지 확대 가능성이 높습니다."
      />

      <section className="grid grid-cols-4 gap-5">
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-3 gap-6">
        <DashboardCard title="A. 월별 방문자 추이">
          <LineTrendChart data={monthlyTrend} dataKey="visitors" stroke="#1f9a62" unit="명" />
        </DashboardCard>
        <DashboardCard title="B. 평균 체류시간 추이">
          <LineTrendChart data={monthlyTrend} dataKey="stayHours" stroke="#2f80d1" unit="시간" />
        </DashboardCard>
        <DashboardCard title="C. 관광소비 비중">
          <DonutChart data={spendingShare} />
        </DashboardCard>
      </section>

      <section className="grid grid-cols-3 gap-6">
        <DashboardCard title="D. 유입 지역 TOP 5">
          <HorizontalBarChart data={inflowRegions} />
        </DashboardCard>
        <DashboardCard title="E. 시간대별 방문 분포">
          <VerticalBarChart data={timeDistribution} />
        </DashboardCard>
        <DashboardCard title="F. 연계관광 성과">
          <div className="space-y-5">
            {linkageMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-600">{metric.label}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">{metric.detail}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-950">{metric.value}</p>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${metric.progress}%`, backgroundColor: metric.color }} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <p className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-xs font-semibold text-slate-500">
        {prototypeNote}
      </p>
    </div>
  )
}
