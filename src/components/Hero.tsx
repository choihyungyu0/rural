import { Activity, ArrowRight } from 'lucide-react'

type HeroProps = {
  title: string
  subtitle: string
  diagnosis?: string
  variant?: 'scenic' | 'plain'
}

export function Hero({ title, subtitle, diagnosis, variant = 'plain' }: HeroProps) {
  if (variant === 'scenic') {
    return (
      <section className="relative overflow-hidden rounded-lg border border-emerald-100 bg-[#edf8f1] dashboard-shadow">
        <div className="absolute inset-0">
          <svg viewBox="0 0 1200 360" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#d9f1ff" />
                <stop offset="62%" stopColor="#eef9ed" />
                <stop offset="100%" stopColor="#f7f0d8" />
              </linearGradient>
              <linearGradient id="river" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#65bde4" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#2f80d1" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#65bde4" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <rect width="1200" height="360" fill="url(#sky)" />
            <path d="M0 180 L155 72 L320 181 L456 86 L620 190 L780 98 L960 187 L1200 92 L1200 360 L0 360 Z" fill="#b7dcc2" />
            <path d="M0 224 L160 144 L295 220 L482 124 L640 228 L790 150 L1010 226 L1200 146 L1200 360 L0 360 Z" fill="#7fbe93" opacity="0.7" />
            <path d="M0 286 C185 235 330 326 514 282 C700 238 830 286 1000 250 C1098 230 1158 224 1200 230 L1200 360 L0 360 Z" fill="#f5d98d" opacity="0.8" />
            <path d="M-20 310 C170 274 260 350 444 315 C586 288 730 252 918 302 C1020 330 1112 310 1220 286" fill="none" stroke="url(#river)" strokeWidth="34" strokeLinecap="round" />
            <path d="M0 326 C204 295 342 344 560 318 C752 295 935 330 1200 292 L1200 360 L0 360 Z" fill="#9dcc78" opacity="0.55" />
            <g opacity="0.86">
              <rect x="892" y="218" width="44" height="34" rx="4" fill="#fff8ec" />
              <path d="M886 220 L914 198 L942 220 Z" fill="#d96f4d" />
              <rect x="946" y="230" width="34" height="24" rx="4" fill="#fff8ec" />
              <path d="M940 231 L963 212 L986 231 Z" fill="#2f80d1" />
              <rect x="100" y="236" width="48" height="30" rx="4" fill="#fff8ec" />
              <path d="M94 238 L124 216 L154 238 Z" fill="#1f9a62" />
            </g>
          </svg>
        </div>
        <div className="relative grid min-h-[290px] grid-cols-[1fr_330px] items-center gap-10 px-10 py-9">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-emerald-800">
              <Activity size={14} />
              운영 개선 제안 MVP
            </p>
            <h1 className="text-[34px] font-extrabold leading-[1.25] text-slate-950">{title}</h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-700">{subtitle}</p>
            {diagnosis && (
              <div className="mt-6 inline-flex max-w-3xl items-center gap-3 rounded-lg border border-emerald-200 bg-white/82 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-sm">
                <ArrowRight size={17} />
                {diagnosis}
              </div>
            )}
          </div>
          <div className="rounded-lg border border-white/80 bg-white/65 p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-3 text-sm font-bold">
              <span className="rounded-lg bg-emerald-50 px-4 py-3 text-emerald-800">하동 미식</span>
              <span className="rounded-lg bg-sky-50 px-4 py-3 text-sky-800">구례 숙박</span>
              <span className="rounded-lg bg-amber-50 px-4 py-3 text-amber-800">체험 예약</span>
              <span className="rounded-lg bg-slate-50 px-4 py-3 text-slate-700">연계 이동</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white px-8 py-7 dashboard-shadow">
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-4xl">
          <h1 className="text-[30px] font-extrabold leading-[1.28] text-slate-950">{title}</h1>
          <p className="mt-3 text-[15px] leading-7 text-slate-600">{subtitle}</p>
        </div>
        {diagnosis && (
          <div className="max-w-[390px] rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-900">
            {diagnosis}
          </div>
        )}
      </div>
    </section>
  )
}
