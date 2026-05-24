import type { ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { BarPoint } from '../../data/dashboardData'

type HorizontalBarChartProps = {
  data: BarPoint[]
  color?: string
  unit?: string
}

export function HorizontalBarChart({ data, color = '#1f9a62', unit = '%' }: HorizontalBarChartProps) {
  const formatLabel = (value: ReactNode) => `${value}${unit}`

  return (
    <div className="chart-surface h-[265px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 34, left: 12, bottom: 0 }}>
          <CartesianGrid stroke="#e8edf2" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            width={92}
            tick={{ fontSize: 12, fontWeight: 700 }}
          />
          <Tooltip
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ border: '1px solid #dfe5e9', borderRadius: 8 }}
            formatter={(value) => [`${value}${unit}`, '비중']}
          />
          <Bar dataKey="value" barSize={18} radius={[0, 8, 8, 0]} fill={color}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color ?? color} />
            ))}
            <LabelList dataKey="value" position="right" formatter={formatLabel} className="text-xs font-bold" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
