import { CheckCircle2 } from 'lucide-react'
import { CourseCard } from '../components/CourseCard'
import { DashboardCard } from '../components/DashboardCard'
import { Hero } from '../components/Hero'
import { KpiCard } from '../components/KpiCard'
import { ResourceMap } from '../components/ResourceMap'
import { kpiMetrics, overviewInsights, prototypeNote, recommendedCourses } from '../data/dashboardData'

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <Hero
        variant="scenic"
        title="하동·구례 농촌관광 운영 개선 개요"
        subtitle="데이터 기반으로 하동·구례 농촌관광의 현황을 진단하고, 체류·소비 증대를 위한 운영 개선 방향을 제안합니다."
        diagnosis="방문자 수와 소비는 증가하고 있으나, 숙박 전환율은 감소해 미식·체험·숙박 연계 강화가 필요합니다."
      />

      <section className="grid grid-cols-4 gap-5">
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-[0.86fr_1.14fr] gap-6">
        <DashboardCard title="핵심 분석 요약">
          <div className="space-y-4">
            {overviewInsights.map((insight) => (
              <div key={insight.title} className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={16} />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-950">{insight.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{insight.body}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="미식·체험·숙박 연계 관광 동선">
          <ResourceMap />
        </DashboardCard>
      </section>

      <DashboardCard title="추천 체류형 코스">
        <div className="grid grid-cols-2 gap-5">
          {recommendedCourses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </DashboardCard>

      <p className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-xs font-semibold text-slate-500">
        {prototypeNote}
      </p>
    </div>
  )
}
