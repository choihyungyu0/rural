import type { ReactNode } from 'react'
import { Database, FileText, PlusCircle } from 'lucide-react'
import { DashboardCard } from '../components/DashboardCard'
import { Hero } from '../components/Hero'
import { ImprovementTable } from '../components/ImprovementTable'
import { ResourceMap } from '../components/ResourceMap'
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart'
import {
  improvementRows,
  improvementSummaries,
  inconvenienceFactors,
  movementImprovementNotes,
  prototypeNote,
} from '../data/dashboardData'

export function ImprovementPage() {
  return (
    <div className="space-y-6">
      <Hero
        title="불편요소 개선 및 실행 전략"
        subtitle="설문 기반 불편요소와 이동 동선을 바탕으로 우선 개선 과제와 실행 방향을 제안합니다."
        diagnosis="교통 연계와 체험 예약 개선이 체류시간 확대의 핵심입니다."
      />

      <section className="grid grid-cols-3 gap-5">
        {improvementSummaries.map((summary) => (
          <article key={summary.label} className="rounded-lg border border-slate-200 bg-white p-5 dashboard-shadow">
            <p className="text-sm font-extrabold text-slate-500">{summary.label}</p>
            <p className="mt-3 text-[24px] font-extrabold text-slate-950">{summary.value}</p>
            <p className="mt-2 text-sm font-bold text-emerald-700">{summary.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-[0.9fr_1.1fr] gap-6">
        <DashboardCard title="주요 불편요소 분석">
          <HorizontalBarChart data={inconvenienceFactors} />
        </DashboardCard>
        <DashboardCard title="하동·구례 연계 동선 및 이동 불편 예상 구간">
          <ResourceMap notes={movementImprovementNotes} />
        </DashboardCard>
      </section>

      <DashboardCard title="개선 우선순위">
        <ImprovementTable rows={improvementRows} />
      </DashboardCard>

      <div className="flex items-center justify-between gap-5 rounded-lg border border-slate-200 bg-white px-5 py-4 dashboard-shadow">
        <p className="text-xs font-semibold text-slate-500">{prototypeNote}</p>
        <div className="flex shrink-0 gap-3">
          <ActionButton icon={<FileText size={16} />} label="상세 보고서" />
          <ActionButton icon={<PlusCircle size={16} />} label="개선과제 등록" primary />
          <ActionButton icon={<Database size={16} />} label="데이터 업데이트" />
        </div>
      </div>
    </div>
  )
}

type ActionButtonProps = {
  icon: ReactNode
  label: string
  primary?: boolean
}

function ActionButton({ icon, label, primary = false }: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-extrabold transition ${
        primary
          ? 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
