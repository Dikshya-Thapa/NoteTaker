import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NewNotePage({ onSave }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: 'Personal',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.title.trim() || !formData.body.trim()) {
      return
    }

    onSave({
      title: formData.title.trim(),
      body: formData.body.trim(),
      category: formData.category,
    })

    navigate('/')
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
        >
          ← Back to notes
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="border-b border-slate-200 pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              NoteTaker
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Create New Note
            </h1>

            <p className="mt-2 text-slate-500">
              Enter the details for your new note.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter note title"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Note body
              </label>

              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Write your note..."
                rows="7"
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
              <Link
                to="/"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
} 