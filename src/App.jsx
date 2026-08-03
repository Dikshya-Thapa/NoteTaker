import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NewNotePage from './pages/NewNotePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EditNotePage from './pages/EditNotePage'
import { createNote, deleteNote, getNotes, updateNote } from './api/noteApi'
import { isLoggedIn } from './api/authApi'


function getErrorMessage(error, fallback) {
  const data = error.response?.data

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.map((item) => item.message || item.msg).join(' ')
  }

  return data?.message || fallback
}

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default function App() {
  const [notes, setNotes] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(() => isLoggedIn())
  const [isDeleting, setIsDeleting] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)

  const [message, setMessage] = useState({
    type: '',
    text: '',
  })

  const location = useLocation()

  function showMessage(type, text) {
    setMessage({ type, text })

    setTimeout(() => {
      setMessage({ type: '', text: '' })
    }, 3000)
  }

  useEffect(() => {
    
    const needsNotes =
      location.pathname === '/notes' ||
      location.pathname.startsWith('/edit-note')

    if (!isLoggedIn() || !needsNotes) {
      return
    }

    async function fetchNotes() {
      try {
        setIsLoading(true)

        const response = await getNotes()

        const notesData = Array.isArray(response)
          ? response
          : response.notes || []

        setNotes(notesData)
      } catch (error) {
        console.log(error.response?.data || error.message)

        showMessage('error', getErrorMessage(error, 'Failed to load notes'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [location.pathname])

  useEffect(() => {
    console.log(`Current note count: ${notes.length}`)
  }, [notes])

  useEffect(() => {
    if (location.pathname.startsWith('/edit-note')) {
      document.title = 'Edit Note | NoteTaker'
    } else if (location.pathname === '/new-note') {
      document.title = 'Create New Note | NoteTaker'
    } else if (location.pathname === '/notes') {
      document.title = `NoteTaker | ${notes.length} notes`
    } else if (location.pathname === '/login') {
      document.title = 'Log in | NoteTaker'
    } else if (location.pathname === '/register') {
      document.title = 'Create account | NoteTaker'
    } else {
      document.title = 'NoteTaker — Every thought, pinned down'
    }
  }, [location.pathname, notes.length])

  async function handleAddNote(noteData) {
    try {
      const notePayload = {
        title: noteData.title,
        body: noteData.body,
        category: noteData.category || 'Personal',
        date: noteData.date || 'Today',
      }

      console.log('Sending note:', notePayload)

      const response = await createNote(notePayload)

      const savedNote = response.note || response

      
      setNotes((currentNotes) => [
        savedNote,
        ...currentNotes.filter((note) => note._id !== savedNote._id),
      ])

      showMessage(
        'success',
        response.message || 'Note created successfully',
      )

      return savedNote
    } catch (error) {
      console.log(error.response?.data || error.message)

      showMessage('error', getErrorMessage(error, 'Failed to create note'))

      throw error
    }
  }

  async function handleUpdateNote(id, noteData) {
    try {
      const response = await updateNote(id, noteData)

      const savedNote = response.note || response

      setNotes((currentNotes) =>
        currentNotes.map((note) => (note._id === id ? savedNote : note)),
      )

      showMessage(
        'success',
        response.message || 'Note updated successfully',
      )
    } catch (error) {
      console.log(error.response?.data || error.message)

      showMessage('error', getErrorMessage(error, 'Failed to update note'))

      throw error
    }
  }

  function handleDeleteNote(noteId) {
    const selectedNote = notes.find((note) => note._id === noteId)

    if (!selectedNote) {
      showMessage('error', 'Note not found')
      return
    }

    setNoteToDelete(selectedNote)
  }

  function handleCancelDelete() {
    setNoteToDelete(null)
  }

  async function handleConfirmDelete() {
    if (!noteToDelete) return

    try {
      setIsDeleting(true)

      const response = await deleteNote(noteToDelete._id)

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note._id !== noteToDelete._id),
      )

      setNoteToDelete(null)

      showMessage(
        'success',
        response.message || 'Note deleted successfully',
      )
    } catch (error) {
      console.log(error.response?.data || error.message)

      showMessage('error', getErrorMessage(error, 'Failed to delete note'))
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredNotes = notes.filter((note) =>
    note.title?.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <>
      {message.text && (
        <div
          className={`fixed left-1/2 top-5 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-xl px-5 py-4 text-sm font-semibold shadow-lg ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
              : 'bg-red-50 text-red-700 ring-1 ring-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage showMessage={showMessage} />} />

        <Route path="/register" element={<RegisterPage showMessage={showMessage} />} />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <HomePage
                showMessage={showMessage}
                notes={filteredNotes}
                isLoading={isLoading}
                searchText={searchText}
                onSearchChange={setSearchText}
                onDelete={handleDeleteNote}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/new-note"
          element={
            <ProtectedRoute>
              <NewNotePage onSave={handleAddNote} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-note/:id"
          element={
            <ProtectedRoute>
              <EditNotePage
                notes={notes}
                isLoading={isLoading}
                onSave={handleUpdateNote}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {noteToDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v5" />
                <path d="M14 11v5" />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Delete this note?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-slate-800">
                  “{noteToDelete.title}”
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_2px_0_0_#cbd5e1] transition-all hover:bg-slate-50 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-800 bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_0_0_#7f1d1d] transition-all hover:bg-red-500 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? 'Deleting...' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}