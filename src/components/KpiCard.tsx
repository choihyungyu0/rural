import { LocalImage } from './LocalImage'

type KpiCardItem = {
  title: string
  value: string
  change?: string
  changeTone: 'green' | 'red'
  iconSrc: string
  iconAlt: string
}

type KpiCardProps = {
  item: KpiCardItem
}

export function KpiCard({ item }: KpiCardProps) {
  return (
    <article className="kpiCard">
      <div className={`kpiIcon ${item.changeTone}`}>
        <LocalImage
          src={item.iconSrc}
          alt={item.iconAlt}
          className="kpiIconImage"
          fallbackLabel={item.title}
        />
      </div>

      <div className="kpiInfo">
        <h2>{item.title}</h2>
        <strong>{item.value}</strong>
        {item.change ? <p className={item.changeTone}>{item.change}</p> : null}
      </div>
    </article>
  )
}
