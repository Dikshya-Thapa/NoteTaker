import NoteGrid from './components/NoteGrid'
import NewNoteButton from './components/NewNoteButton'
import SearchBar from './components/SearchBar'

export default function App() {
  return (
    <main className="min-h-screen bg-purple-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <Title />
          <NewNoteButton />
        </div>

        <div className="mt-6">
          <SearchBar />
        </div>

        <div className="mt-6">
          <NoteGrid />
        </div>
      </div>
    </main>
  )
}

function Title() {
  return (
    <h1 className="text-3xl font-bold text-red-800">
      Note Taker
    </h1>
  )
}