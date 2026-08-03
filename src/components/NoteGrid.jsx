import NoteCard from './NoteCard'
import NewNoteButton from './NewNoteButton'

export default function NoteGrid({ notes, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-8 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
            <path d="M17.5 2.5a2.1 2.1 0 0 1 3 3L12 14l-4 1 1-4Z" />
          </svg>
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900">
          No notes here yet
        </h3>

        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-500">
          Notes you create will show up on this board. Start with whatever is
          on your mind, or try a different search or category.
        </p>

        <div className="mt-7">
          <NewNoteButton />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          id={note._id}
          title={note.title}
          body={note.body}
          category={note.category}
          date={note.date}
          createdAt={note.createdAt}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
} 