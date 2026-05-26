import type { SuitabilityLevel, WorkationSpaceType, WorkationStats } from '../types/workation'

type WorkationCandidateTableProps = {
  candidates: WorkationStats['topCandidates']
}

const scoreClassNames: Record<SuitabilityLevel, string> = {
  높음: 'high',
  중상: 'midHigh',
  중간: 'middle',
  낮음: 'low',
}

const typeLabels: Record<WorkationSpaceType, string> = {
  빈집: '빈집',
  폐교: '폐교',
  '유휴 공공시설': '공공시설',
  '미활용 상가': '상가',
}

export function WorkationCandidateTable({ candidates }: WorkationCandidateTableProps) {
  return (
    <article className="workationPanel workationCandidateCard" aria-labelledby="workation-candidate-title">
      <h2 id="workation-candidate-title">우선 활용 후보 TOP 5</h2>

      <div className="workationCandidateTableWrap">
        <table className="workationCandidateTable">
          <thead>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">공간명</th>
              <th scope="col">유형</th>
              <th scope="col">적합도</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((item) => (
              <tr key={item.rank}>
                <td>
                  <span className="workationRankBadge">{item.rank}</span>
                </td>
                <td>{item.name}</td>
                <td>{typeLabels[item.type]}</td>
                <td>
                  <span className={`workationScoreBadge ${scoreClassNames[item.suitabilityLevel]}`}>
                    {item.suitabilityLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
