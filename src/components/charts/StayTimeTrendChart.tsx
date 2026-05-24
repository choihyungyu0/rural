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
import { averageStayTimeTrend } from '../../data/analysisData'

const formatMonth = (month: string) => month.replace('2025년 ', '').replace('2026년 ', '')
const formatHours = (value: number) => `${value}시간`

export function StayTimeTrendChart() {
  return (
    <div className="chartFrame" role="img" aria-label="하동과 구례의 평균 체류시간 추이 선형 차트">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={averageStayTimeTrend} margin={{ top: 12, right: 16, bottom: 4, left: 0 }}>
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
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
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
