import { Link } from 'react-router-dom'

export default function NewNoteButton() {
  return (
    <Link
      to="/new-note"
      className="group inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
      >
        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
      </svg>
      New Note
    </Link>
  )
} 