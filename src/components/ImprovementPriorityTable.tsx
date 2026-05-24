import type { PriorityLevel } from '../data/improvementData'
import { improvementPriorities } from '../data/improvementData'

function PriorityBadge({ level }: { level: PriorityLevel }) {
  return <span className={`priorityBadge ${level === '높음' ? 'high' : 'medium'}`}>{level}</span>
}

export function ImprovementPriorityTable() {
  return (
    <div className="priorityTableWrap">
      <table className="priorityTable">
        <thead>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">개선 과제</th>
            <th scope="col">기대 효과</th>
            <th scope="col">시급성</th>
            <th scope="col">영향도</th>
          </tr>
        </thead>
        <tbody>
          {improvementPriorities.map((item) => (
            <tr key={item.rank}>
              <td>{item.rank}</td>
              <td>{item.task}</td>
              <td>{item.effect}</td>
              <td>
                <PriorityBadge level={item.urgency} />
              </td>
              <td>
                <PriorityBadge level={item.impact} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
