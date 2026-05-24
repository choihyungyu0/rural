import { ArrowRight, CalendarDays, Utensils } from 'lucide-react'
import type { Course } from '../data/dashboardData'

type CourseCardProps = {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
          <Utensils size={20} />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
          <CalendarDays size={13} />
          {course.duration}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-slate-950">{course.title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-2 text-sm font-semibold text-slate-600">
        <p>{course.target}</p>
        <p>{course.spend}</p>
      </div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-950">
        패키지 구성안
        <ArrowRight size={15} />
      </div>
    </article>
  )
}
