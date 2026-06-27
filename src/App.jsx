import NoteGrid from './components/NoteGrid'
import NewNoteButton from './components/NewNoteButton'
import SearchBar from './components/SearchBar'

export default function App() {
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

            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Create, organise and quickly find your personal, work and study
              notes.
            </p>
          </div>

          <NewNoteButton />
        </header>

        <SearchBar />

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Your notes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Four notes available
              </p>
            </div>
          </div>

          <NoteGrid />
        </section>
      </div>
    </main>
  )
} 