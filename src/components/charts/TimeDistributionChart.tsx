import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { timeDistribution } from '../../data/analysisData'

const chartData = timeDistribution.map((item) => ({
  ...item,
  percentLabel: `${item.value}%`,
}))

export function TimeDistributionChart() {
  return (
    <div className="timeDistribution">
      <div className="timeChartFrame" role="img" aria-label="시간대별 방문 분포 세로 막대 차트">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 28, right: 10, bottom: 4, left: -18 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#334155', fontSize: 13, fontWeight: 800 }}
              tickLine={false}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              domain={[0, 40]}
              tickFormatter={(value: number) => `${value}%`}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="value" radius={[9, 9, 0, 0]} barSize={38}>
              <LabelList dataKey="percentLabel" position="top" fill="#0f172a" fontWeight={900} />
              {chartData.map((item) => (
                <Cell fill={item.color} key={item.label} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="timeRangeGrid" aria-label="시간대 설명">
        {timeDistribution.map((item) => (
          <span key={item.label}>({item.timeRange})</span>
        ))}
      </div>
    </div>
  )
}
