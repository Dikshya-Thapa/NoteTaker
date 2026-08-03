import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewNoteButton from '../components/NewNoteButton'
import NoteGrid from '../components/NoteGrid'
import SearchBar from '../components/SearchBar'
import ChatAssistant from '../components/ChatAssistant'
import { clearSession, getStoredUser, logoutUser } from '../api/authApi'

const categories = ['All', 'Personal', 'Work', 'Study']

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'

  return 'Good evening'
}

export default function HomePage({
  showMessage,
  notes,
  isLoading,
  searchText,
  onSearchChange,
  onDelete,
}) {
  const navigate = useNavigate()
  const user = getStoredUser()

  const [activeCategory, setActiveCategory] = useState('All')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const visibleNotes =
    activeCategory === 'All'
      ? notes
      : notes.filter((note) => note.category === activeCategory)

  function countFor(category) {
    if (category === 'All') return notes.length

    return notes.filter((note) => note.category === category).length
  }

  async function handleConfirmLogout() {
    try {
      
      await logoutUser()
    } catch {
      
    }

    clearSession()

    showMessage?.('success', 'You have been logged out.')

    navigate('/login')
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome panel */}
        <section className="relative overflow-hidden rounded-3xl bg-indigo-50 ring-1 ring-indigo-100">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,#c7c3e8_1px,transparent_1px)] [background-size:24px_24px] opacity-50"
          />

          <div className="relative flex flex-col justify-between gap-8 p-8 sm:p-10 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                {user?.name ? `${user.name}'s workspace` : 'Personal workspace'}
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {getGreeting()}
                {user?.name ? `, ${user.name.split(' ')[0]}` : ''}
              </h1>

              <p className="mt-3 text-slate-600">
                It's {today}. What's on your mind today?
              </p>

              <div className="mt-7 flex items-center gap-3">
                <NewNoteButton />

                <button
                  type="button"
                  onClick={() => setIsLoggingOut(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_2px_0_0_#cbd5e1] transition-all hover:bg-slate-50 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Log out
                </button>
              </div>
            </div>

            <img
              src="/auth-art.jpg"
              alt="Illustration of colorful planner notes"
              className="h-32 w-full -rotate-1 rounded-2xl object-cover shadow-xl shadow-indigo-200 ring-1 ring-indigo-100 sm:h-40 lg:h-auto lg:w-80 lg:-rotate-2 lg:object-contain xl:w-96"
            />
          </div>
        </section>

        {/* Search with built-in category filter */}
        <section className="mt-8">
          <SearchBar
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            category={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={Object.fromEntries(
              categories.map((category) => [category, countFor(category)]),
            )}
          />
        </section>

        {/* Notes */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {activeCategory === 'All'
                  ? 'Your notes'
                  : `${activeCategory} notes`}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {visibleNotes.length}{' '}
                {visibleNotes.length === 1 ? 'note' : 'notes'} available
              </p>
            </div>
          </div>

          {isLoading && notes.length === 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="min-h-64 animate-pulse rounded-2xl bg-slate-200/80 p-6"
                >
                  <div className="h-6 w-20 rounded-full bg-slate-300/80" />
                  <div className="mt-5 h-5 w-3/4 rounded bg-slate-300/80" />
                  <div className="mt-3 h-3.5 w-full rounded bg-slate-300/60" />
                  <div className="mt-2 h-3.5 w-5/6 rounded bg-slate-300/60" />
                </div>
              ))}
            </div>
          ) : (
            <NoteGrid notes={visibleNotes} onDelete={onDelete} />
          )}
        </section>
      </div>

      <ChatAssistant />

      {/* Logout confirmation */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Log out of NoteTaker?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your notes stay safe. You will need to log in again to open
                your workspace.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsLoggingOut(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_2px_0_0_#cbd5e1] transition-all hover:bg-slate-50 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                Stay logged in
              </button>

              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-950 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_0_0_#020617] transition-all hover:bg-slate-800 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}