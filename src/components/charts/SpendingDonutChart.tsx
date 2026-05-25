import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { SpendingRatioItem } from '../../data/analysisData'

type SpendingDonutChartProps = {
  data: SpendingRatioItem[]
  totalSpendingLabel: string
}

const formatRatio = (value: number) => `${value.toFixed(1)}%`

export function SpendingDonutChart({ data, totalSpendingLabel }: SpendingDonutChartProps) {
  return (
    <div className="donutLayout">
      <div className="donutChartFrame" role="img" aria-label="관광소비 비중 도넛 차트">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="86%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item) => (
                <Cell fill={item.color} key={item.name} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb', fontWeight: 700 }}
              formatter={(value) => formatRatio(Number(value))}
              itemStyle={{ fontWeight: 800 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="donutCenter" aria-hidden="true">
          <span>소비액</span>
          <strong>{totalSpendingLabel}</strong>
        </div>
      </div>

      <ul className="donutLegend" aria-label="관광소비 비중 범례">
        {data.map((item) => (
          <li key={item.name}>
            <span className="legendDot" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
            <strong>{formatRatio(item.value)}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
