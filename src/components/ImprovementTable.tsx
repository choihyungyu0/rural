import type { ImprovementRow } from '../data/dashboardData'
import { StatusBadge } from './StatusBadge'

type ImprovementTableProps = {
  rows: ImprovementRow[]
}

export function ImprovementTable({ rows }: ImprovementTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs font-extrabold text-slate-500">
          <tr>
            <th className="px-4 py-3">순위</th>
            <th className="px-4 py-3">개선 과제</th>
            <th className="px-4 py-3">담당 부서</th>
            <th className="px-4 py-3">목표 일정</th>
            <th className="px-4 py-3">진행 상태</th>
            <th className="px-4 py-3">KPI</th>
            <th className="px-4 py-3">시급성</th>
            <th className="px-4 py-3">영향도</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row.rank} className="text-slate-700">
              <td className="px-4 py-4 font-extrabold text-slate-950">{row.rank}</td>
              <td className="px-4 py-4 font-bold text-slate-900">{row.task}</td>
              <td className="px-4 py-4">{row.department}</td>
              <td className="px-4 py-4">{row.due}</td>
              <td className="px-4 py-4">
                <StatusBadge label={row.status} />
              </td>
              <td className="px-4 py-4 font-semibold">{row.kpi}</td>
              <td className="px-4 py-4">
                <StatusBadge label={row.urgency} />
              </td>
              <td className="px-4 py-4">
                <StatusBadge label={row.impact} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
