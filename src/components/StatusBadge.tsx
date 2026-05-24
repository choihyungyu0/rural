type StatusBadgeProps = {
  label: string
}

const toneByLabel: Record<string, string> = {
  진행중: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  검토중: 'border-sky-200 bg-sky-50 text-sky-700',
  계획: 'border-amber-200 bg-amber-50 text-amber-700',
  준비중: 'border-slate-200 bg-slate-50 text-slate-600',
  상: 'border-rose-200 bg-rose-50 text-rose-700',
  중: 'border-amber-200 bg-amber-50 text-amber-700',
  하: 'border-slate-200 bg-slate-50 text-slate-600',
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className={`inline-flex min-w-12 justify-center rounded-full border px-2.5 py-1 text-xs font-extrabold ${toneByLabel[label] ?? toneByLabel.준비중}`}>
      {label}
    </span>
  )
}
