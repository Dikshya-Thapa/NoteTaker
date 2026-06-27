const categoryStyles = {
  Personal: 'bg-rose-50 text-rose-700 ring-rose-200',
  Work: 'bg-blue-50 text-blue-700 ring-blue-200',
  Study: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export default function NoteCard({
  title,
  description,
  category,
  date,
}) {
  return (
    <article className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
            categoryStyles[category] ||
            'bg-slate-100 text-slate-700 ring-slate-200'
          }`}
        >
          {category}
        </span>

        <span className="text-xs font-medium text-slate-400">
          {date}
        </span>
      </div>

      <h2 className="mt-6 text-xl font-semibold leading-7 text-slate-900">
        {title}
      </h2>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-slate-700 transition group-hover:text-emerald-600"
      >
        View note
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
    </article>
  )
} 