import { Link } from 'react-router-dom'


function formatDate(createdAt, fallback) {
  const parsed = new Date(createdAt)

  if (!createdAt || Number.isNaN(parsed.getTime())) {
    return fallback || 'Today'
  }

  const today = new Date()

  if (parsed.toDateString() === today.toDateString()) {
    return 'Today'
  }

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  if (parsed.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }

  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(parsed.getFullYear() === today.getFullYear()
      ? {}
      : { year: 'numeric' }),
  })
}

const categoryStyles = {
  Personal: {
    card: 'bg-rose-50 ring-rose-200 hover:shadow-rose-200/70',
    chip: 'bg-white/80 text-rose-700 ring-rose-200',
  },
  Work: {
    card: 'bg-blue-50 ring-blue-200 hover:shadow-blue-200/70',
    chip: 'bg-white/80 text-blue-700 ring-blue-200',
  },
  Study: {
    card: 'bg-emerald-50 ring-emerald-200 hover:shadow-emerald-200/70',
    chip: 'bg-white/80 text-emerald-700 ring-emerald-200',
  },
}

const fallbackStyle = {
  card: 'bg-slate-50 ring-slate-200 hover:shadow-slate-200/70',
  chip: 'bg-white/80 text-slate-700 ring-slate-200',
}

export default function NoteCard({
  id,
  title,
  body,
  category,
  date,
  createdAt,
  onDelete,
}) {
  const styles = categoryStyles[category] || fallbackStyle

  return (
    <article
      className={`flex min-h-64 flex-col rounded-2xl p-6 shadow-sm ring-1 transition duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-xl ${styles.card}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles.chip}`}
        >
          {category}
        </span>

        <div className="flex items-center">
          <Link
            to={`/edit-note/${id}`}
            aria-label={`Edit note: ${title}`}
            title="Edit note"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400/70 transition hover:bg-white/80 hover:text-emerald-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
            >
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </Link>

          <button
          type="button"
          onClick={() => onDelete(id)}
          aria-label={`Delete note: ${title}`}
          title="Delete note"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400/70 transition hover:bg-white/80 hover:text-red-600"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4.5 w-4.5"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v5" />
            <path d="M14 11v5" />
          </svg>
          </button>
        </div>
      </div>

      <h2 className="mt-4 text-xl font-semibold leading-snug text-slate-900">
        {title}
      </h2>

      <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-600 line-clamp-4">
        {body}
      </p>

      <div className="mt-5 flex items-center gap-1.5 border-t border-slate-900/10 pt-4 text-xs font-medium text-slate-500">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>

        {formatDate(createdAt, date)}
      </div>
    </article>
  )
}