export default function NewNoteButton() {
  return (
    <button
      type="button"
      className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
    >
      <span className="text-lg leading-none">+</span>
      New Note
    </button>
  )
} 