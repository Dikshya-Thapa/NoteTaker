import { useEffect, useState } from 'react'
import NewNoteButton from './components/NewNoteButton'
import NewNoteModal from './components/NewNoteModal'
import NoteGrid from './components/NoteGrid'
import SearchBar from './components/SearchBar'

const initialNotes = [
  {
    id: 1,
    title: 'Study React',
    body: 'Review React components, props and reusable component structure.',
    category: 'Study',
    date: '22 June',
  },
  {
    id: 2,
    title: 'Complete NoteTaker UI',
    body: 'Finish the note cards, search bar and responsive grid layout.',
    category: 'Work',
    date: '23 June',
  },
  {
    id: 3,
    title: 'Feed My Dog',
    body: 'Give my dog food and replace the drinking water.',
    category: 'Personal',
    date: '24 June',
  },
  {
    id: 4,
    title: 'Prepare Project Presentation',
    body: 'Create slides explaining the NoteTaker components and design.',
    category: 'Study',
    date: '25 June',
  },
]

export default function App() {
  const [notes, setNotes] = useState(initialNotes)
  const [searchText, setSearchText] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log(`Current note count: ${notes.length}`)
  }, [notes])

  function handleAddNote(noteData) {
    const newNote = {
      id: Date.now(),
      ...noteData,
      date: 'Today',
    }

    setNotes((currentNotes) => [newNote, ...currentNotes])
    setShowModal(false)
  }

  function handleDeleteNote(noteId) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    )
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Personal workspace
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              NoteTaker
            </h1>

            <p className="mt-3 text-slate-600">
              Create, organise and quickly find your notes.
            </p>
          </div>

          <NewNoteButton onClick={() => setShowModal(true)} />
        </header>

        <SearchBar
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Your notes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredNotes.length} notes available
            </p>
          </div>

          <NoteGrid
            notes={filteredNotes}
            onDelete={handleDeleteNote}
          />
        </section>
      </div>

      {showModal && (
        <NewNoteModal
          onClose={() => setShowModal(false)}
          onSave={handleAddNote}
        />
      )}
    </main>
  )
} 