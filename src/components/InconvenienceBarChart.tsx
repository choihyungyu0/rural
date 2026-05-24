import { inconvenienceItems } from '../data/improvementData'

const axisLabels = ['0%', '10%', '20%', '30%', '40%', '50%']
const axisMax = 50

export function InconvenienceBarChart() {
  return (
    <div className="inconvenienceChart" aria-label="주요 불편요소 응답 비중">
      <div className="inconvenienceRows">
        {inconvenienceItems.map((item) => (
          <div className="inconvenienceRow" key={item.category}>
            <span className="inconvenienceLabel">{item.category}</span>
            <div className="inconvenienceTrack" aria-hidden="true">
              <span
                className="inconvenienceFill"
                style={{
                  width: `${Math.min((item.percentage / axisMax) * 100, 100)}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <strong>{item.percentage.toFixed(1)}%</strong>
          </div>
        ))}
      </div>

      <div className="inconvenienceAxis" aria-hidden="true">
        <span />
        <div>
          {axisLabels.map((label) => (
            <small key={label}>{label}</small>
          ))}
        </div>
        <span />
      </div>

      <p className="chartSourceNote">자체 설문조사 결과 예시 · n=100</p>
    </div>
  )
}
