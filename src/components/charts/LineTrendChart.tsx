import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type LineTrendDatum = {
  month: string
} & Record<string, string | number>

type LineTrendChartProps = {
  data: LineTrendDatum[]
  dataKey: string
  stroke: string
  unit: string
}

export function LineTrendChart({ data, dataKey, stroke, unit }: LineTrendChartProps) {
  return (
    <div className="chart-surface h-[265px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 4, bottom: 0 }}>
          <CartesianGrid stroke="#e8edf2" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={48} />
          <Tooltip
            contentStyle={{ border: '1px solid #dfe5e9', borderRadius: 8 }}
            formatter={(value) => [`${value}${unit}`, '']}
            labelStyle={{ fontWeight: 800, color: '#172033' }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={3}
            unit={unit}
            dot={{ r: 4, fill: '#ffffff', stroke, strokeWidth: 2 }}
            activeDot={{ r: 6, fill: stroke }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
