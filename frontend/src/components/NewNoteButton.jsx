import { Link } from 'react-router-dom'

export default function NewNoteButton() {
  return (
    <Link
      to="/new-note"
      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      <span className="text-lg">+</span>
      New Note
    </Link>
  )
} 