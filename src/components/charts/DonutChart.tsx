import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { SharePoint } from '../../data/dashboardData'

type DonutChartProps = {
  data: SharePoint[]
}

export function DonutChart({ data }: DonutChartProps) {
  return (
    <div className="chart-surface relative h-[265px]">
      <div className="pointer-events-none absolute inset-x-0 top-[92px] text-center">
        <p className="text-xs font-bold text-slate-500">음식·숙박</p>
        <p className="text-2xl font-extrabold text-slate-950">64%</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={82}
            paddingAngle={3}
            stroke="#ffffff"
            strokeWidth={3}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ border: '1px solid #dfe5e9', borderRadius: 8 }}
            formatter={(value) => [`${value}%`, '비중']}
          />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
