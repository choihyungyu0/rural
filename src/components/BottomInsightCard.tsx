import type { BottomCardItem } from '../data/improvementData'
import { ImageWithFallback } from './ImageWithFallback'

type BottomInsightCardProps = {
  item: BottomCardItem
}

export function BottomInsightCard({ item }: BottomInsightCardProps) {
  return (
    <article className="bottomInsightCard">
      <div className="bottomInsightIcon">
        <ImageWithFallback
          src={item.iconSrc}
          alt={item.iconAlt}
          className="bottomInsightIconImage"
          fallbackLabel={item.title}
        />
      </div>
      <div>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
      </div>
    </article>
  )
}
