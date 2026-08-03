import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, saveSession } from '../api/authApi'

export default function LoginPage({ showMessage }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setIsSubmitting(true)

      const data = await loginUser({ email: email.trim(), password })

      saveSession(data)

      showMessage?.(
        'success',
        `Welcome back, ${data.user?.name || 'friend'}!`,
      )

      navigate('/notes')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to log in. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <div className="flex min-h-screen items-center justify-center px-4 py-10 lg:py-10">
        <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <img src="/logo.png" alt="NoteTaker logo" className="h-10 w-10 rounded-full" />
          <span className="font-display text-xl font-bold tracking-tight text-slate-950">
            NoteTaker
          </span>
        </Link>

        
        <img
          src="/auth-art.jpg"
          alt="Illustration of colorful planner notes"
          className="mb-6 h-36 w-full rounded-2xl object-cover shadow-md ring-1 ring-indigo-100 sm:h-44 lg:hidden"
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">
            Welcome back
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Log in to open your notes.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                            <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" style={{ paddingRight: '3rem' }}
              />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <path d="m2 2 20 20" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-950 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_0_0_#020617] transition-all hover:bg-slate-800 active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 py-3"
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          New to NoteTaker?{' '}
          <Link
            to="/register"
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Create an account
          </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden bg-indigo-50 p-12 lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,#c7c3e8_1px,transparent_1px)] [background-size:24px_24px] opacity-50"
        />

        <div className="relative">
          <img
            src="/auth-art.jpg"
            alt="Illustration of colorful planner notes"
            className="w-full max-w-xl -rotate-2 rounded-3xl shadow-2xl shadow-indigo-200 ring-1 ring-indigo-100"
          />

          <div className="mt-9 flex items-center justify-center gap-2.5">
            <span className="rounded-full bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-200">
              Personal
            </span>

            <span className="rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-200">
              Work
            </span>

            <span className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              Study
            </span>
          </div>

          <p className="mt-4 text-center text-sm font-medium text-slate-500">
            Plan your week, keep your ideas, find them fast.
          </p>
        </div>
      </div>
    </main>
  )
}