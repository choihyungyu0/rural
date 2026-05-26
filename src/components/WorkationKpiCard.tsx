import type { WorkationKpiCardItem } from '../data/workationData'
import { LocalImage } from './LocalImage'

type WorkationKpiCardProps = {
  item: WorkationKpiCardItem
}

export function WorkationKpiCard({ item }: WorkationKpiCardProps) {
  return (
    <article className={`workationKpiCard ${item.tone}`}>
      <div className="workationKpiIcon">
        <LocalImage
          src={item.iconSrc}
          alt={item.iconAlt}
          className="workationKpiIconImage"
          fallbackClassName="workationKpiIconFallback"
          fallbackLabel={item.label}
        />
      </div>

      <div className="workationKpiText">
        <h2>{item.label}</h2>
        <strong>
          <span>{item.value}</span>
          <em>{item.unit}</em>
        </strong>
        <p>{item.subtext}</p>
      </div>
    </article>
  )
}
