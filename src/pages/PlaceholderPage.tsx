import { BarChart3 } from 'lucide-react'

type PlaceholderPageProps = {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="grid min-h-[620px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-slate-100 text-slate-500">
          <BarChart3 size={26} />
        </span>
        <h1 className="mt-5 text-[28px] font-extrabold text-slate-950">{title}</h1>
        <p className="mt-3 text-sm font-semibold text-slate-500">해당 화면은 다음 단계에서 확장 예정입니다.</p>
      </div>
    </section>
  )
}
