import type { CourseItem } from '../data/overviewData'
import { LocalImage } from './LocalImage'

type CourseCardProps = {
  item: CourseItem
}

export function CourseCard({ item }: CourseCardProps) {
  return (
    <article className="courseCard">
      <LocalImage
        src={item.imageSrc}
        alt={item.imageAlt}
        className="courseImage"
        fallbackClassName="courseImageFallback"
        fallbackLabel={item.title}
      />

      <div className="courseContent">
        <h3>{item.title}</h3>

        <div className="badgeRow">
          {item.badges.map((badge, index) => (
            <span className={index === 0 ? 'dayBadge' : 'courseBadge'} key={badge}>
              {badge}
            </span>
          ))}
        </div>

        <p>{item.route}</p>
      </div>

      <button
        type="button"
        className={`courseButton ${item.buttonTone}`}
        aria-label={`${item.title} 코스 상세보기`}
      >
        <span>{item.buttonLabel}</span>
      </button>
    </article>
  )
}
