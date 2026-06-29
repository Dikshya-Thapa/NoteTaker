export default function NewNoteButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      <span className="text-lg">+</span>
      New Note
    </button>
  )
} 