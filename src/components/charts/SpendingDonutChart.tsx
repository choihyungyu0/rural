import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { spendingRatio } from '../../data/analysisData'

export function SpendingDonutChart() {
  return (
    <div className="donutLayout">
      <div className="donutChartFrame" role="img" aria-label="관광소비 비중 도넛 차트">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spendingRatio}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="86%"
              paddingAngle={3}
              stroke="none"
            >
              {spendingRatio.map((item) => (
                <Cell fill={item.color} key={item.name} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb', fontWeight: 700 }}
              itemStyle={{ fontWeight: 800 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="donutCenter" aria-hidden="true">
          <span>총 소비액</span>
          <strong>444.7억원</strong>
        </div>
      </div>

      <ul className="donutLegend" aria-label="관광소비 비중 범례">
        {spendingRatio.map((item) => (
          <li key={item.name}>
            <span className="legendDot" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
            <strong>{item.value}%</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
