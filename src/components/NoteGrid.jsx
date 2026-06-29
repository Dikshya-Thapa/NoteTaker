import NoteCard from './NoteCard'

export default function NoteGrid({ notes, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="font-semibold text-slate-800">
          No notes found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Create a new note or try another search.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          category={note.category}
          date={note.date}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
} 