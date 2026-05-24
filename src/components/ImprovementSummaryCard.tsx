import type { SummaryCardItem } from '../data/improvementData'
import { ImageWithFallback } from './ImageWithFallback'

type ImprovementSummaryCardProps = {
  item: SummaryCardItem
}

export function ImprovementSummaryCard({ item }: ImprovementSummaryCardProps) {
  return (
    <article className={`improvementSummaryCard ${item.tone}`}>
      <div className="improvementSummaryIcon">
        <ImageWithFallback
          src={item.iconSrc}
          alt={item.iconAlt}
          className="improvementSummaryIconImage"
          fallbackLabel={item.label}
        />
      </div>

      <div className="improvementSummaryText">
        <p>{item.label}</p>
        <strong>{item.value}</strong>
        <span>{item.description}</span>
      </div>
    </article>
  )
}
