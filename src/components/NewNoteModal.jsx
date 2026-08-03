import { Link } from 'react-router-dom'

export default function NewNoteButton() {
  return (
    <Link
      to="/new-note"
      className="group inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-800 bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_0_0_#065f46] transition-all hover:bg-emerald-500 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-4 w-4"
      >
        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
      </svg>
      New Note
    </Link>
  )
} 