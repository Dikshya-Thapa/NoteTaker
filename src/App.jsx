import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NewNotePage from './pages/NewNotePage'

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
  const location = useLocation()

  useEffect(() => {
    console.log(`Current note count: ${notes.length}`)
  }, [notes])

  useEffect(() => {
    if (location.pathname === '/new-note') {
      document.title = 'Create New Note | NoteTaker'
    } else {
      document.title = `NoteTaker | ${notes.length} notes`
    }
  }, [location.pathname, notes.length])

  function handleAddNote(noteData) {
    const newNote = {
      id: Date.now(),
      ...noteData,
      date: 'Today',
    }

    setNotes((currentNotes) => [newNote, ...currentNotes])
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
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            notes={filteredNotes}
            searchText={searchText}
            onSearchChange={setSearchText}
            onDelete={handleDeleteNote}
          />
        }
      />

      <Route
        path="/new-note"
        element={<NewNotePage onSave={handleAddNote} />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
} 