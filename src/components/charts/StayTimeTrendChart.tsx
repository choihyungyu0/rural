import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { MonthlyTrendItem } from '../../data/analysisData'

type StayTimeTrendChartProps = {
  data: MonthlyTrendItem[]
}

const formatMonth = (month: string) => month.replace(/^\d{4}년\s*/, '')
const formatHours = (value: number) => `${Number(value).toFixed(1)}시간`

export function StayTimeTrendChart({ data }: StayTimeTrendChartProps) {
  const maxHours = Math.max(5, ...data.flatMap((item) => [item.하동, item.구례]))
  const yAxisMax = Math.ceil(maxHours + 2)

  return (
    <div className="chartFrame" role="img" aria-label="하동과 구례의 평균 체류시간 추이 선형 차트">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="month"
            tickFormatter={formatMonth}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
            tickLine={false}
            axisLine={{ stroke: '#d1d5db' }}
            interval={0}
          />
          <YAxis
            domain={[0, yAxisMax]}
            tickFormatter={formatHours}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
            tickLine={false}
            axisLine={false}
            width={54}
          />
          <Tooltip
            cursor={{ stroke: '#94a3b8', strokeDasharray: '4 4' }}
            contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb', fontWeight: 700 }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontWeight: 800, color: '#334155' }} />
          <Line
            type="monotone"
            dataKey="하동"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            unit="시간"
          />
          <Line
            type="monotone"
            dataKey="구례"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            unit="시간"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
