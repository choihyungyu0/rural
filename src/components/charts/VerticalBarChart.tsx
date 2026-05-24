import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { BarPoint } from '../../data/dashboardData'

type VerticalBarChartProps = {
  data: BarPoint[]
  color?: string
  unit?: string
}

export function VerticalBarChart({ data, color = '#2f80d1', unit = '%' }: VerticalBarChartProps) {
  return (
    <div className="chart-surface h-[265px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e8edf2" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={38} />
          <Tooltip
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ border: '1px solid #dfe5e9', borderRadius: 8 }}
            formatter={(value) => [`${value}${unit}`, '비중']}
          />
          <Bar dataKey="value" barSize={34} radius={[8, 8, 0, 0]} fill={color}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color ?? color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
