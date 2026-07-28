import { Link } from 'react-router-dom'
import { isLoggedIn } from '../api/authApi'

const heroNotes = [
  {
    title: 'Ideas for the weekend',
    body: 'Try the new ramen place, finish the sci-fi book, sketch the balcony garden layout.',
    category: 'Personal',
    tilt: '-6deg',
    color: 'bg-amber-100 ring-amber-200',
    chip: 'bg-amber-200/80 text-amber-900',
    delay: '0s',
  },
  {
    title: 'Sprint retro notes',
    body: 'Ship the auth flow, tighten the API errors, demo the search filter on Friday.',
    category: 'Work',
    tilt: '4deg',
    color: 'bg-white ring-slate-200',
    chip: 'bg-emerald-100 text-emerald-800',
    delay: '1.2s',
  },
  {
    title: 'Reading list',
    body: 'MongoDB indexes deep-dive, React Router loaders, that article on JWT best practices.',
    category: 'Study',
    tilt: '-2deg',
    color: 'bg-sky-50 ring-sky-200',
    chip: 'bg-sky-200/70 text-sky-900',
    delay: '2.4s',
  },
]

const steps = [
  {
    number: '1',
    title: 'Create your account',
    body: 'Sign up with just your name, email and a password. Your password is securely hashed and never stored as plain text, and you get a private session that stays signed in for 7 days — so your notes are ready every time you come back.',
  },
  {
    number: '2',
    title: 'Write your note',
    body: "Hit “New Note”, give it a title and start typing. There's nothing to configure and no folders to create first — the whole point is that your thought lands on the page before it fades from your head.",
  },
  {
    number: '3',
    title: 'Give it a category',
    body: 'Tag each note as Personal, Work or Study. Categories show up as colored chips on every card, so when your board fills up you can still read it at a glance instead of scanning a wall of text.',
  },
  {
    number: '4',
    title: 'Find it again instantly',
    body: 'Start typing in the search bar and your notes filter live, keystroke by keystroke. No search button, no waiting — the note you wrote three weeks ago is back on screen in seconds.',
  },
]

const features = [
  {
    title: 'Capture in seconds',
    body: 'Open a note, type, save. No folders to set up first — your thought lands before it fades.',
    category: 'Create',
    icon: <path d="M12 5v14M5 12h14" strokeLinecap="round" />,
  },
  {
    title: 'Sorted by category',
    body: 'Tag notes as Personal, Work or Study so your grid stays readable even when it grows.',
    category: 'Organise',
    icon: <path d="M4 7h16M4 12h10M4 17h6" strokeLinecap="round" />,
  },
  {
    title: 'Find it by title',
    body: 'Start typing in search and the grid filters live. The note you need is two keystrokes away.',
    category: 'Search',
    icon: (
      <path
        d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img src="/logo.png" alt="NoteTaker logo" className="h-9 w-9 rounded-full" />
      <span className="font-display text-lg font-bold tracking-tight text-slate-950">
        NoteTaker
      </span>
    </Link>
  )
}

export default function LandingPage() {
  const loggedIn = isLoggedIn()

  return (
    <div className="min-h-screen scroll-smooth bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 sm:px-8 md:h-16 md:flex-nowrap md:py-0">
          <Logo />

          <div className="order-3 flex w-full items-center justify-center gap-6 text-sm font-semibold text-slate-600 md:order-none md:w-auto md:gap-8">
            <a href="#how-it-works" className="transition hover:text-slate-950">
              How it works
            </a>
            <a href="#features" className="transition hover:text-slate-950">
              Features
            </a>
            <a href="#about" className="transition hover:text-slate-950">
              About
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {loggedIn ? (
              <Link
                to="/notes"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Open my notes
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200/60 hover:text-slate-950"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Your personal workspace
            </p>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">
              Every thought,
              <br />
              <span className="relative inline-block text-emerald-600">
                pinned down.
                <svg
                  viewBox="0 0 220 12"
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full text-emerald-300"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9c40-6 120-8 214-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
              NoteTaker is a fast, focused place to capture notes, organise them
              by category, and find them again the moment you need them.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-700"
              >
                Get started — it's free
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
              >
                I already have an account
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              No credit card. Just a name, an email and your first note.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="flex flex-col gap-5 sm:px-6 lg:px-2">
              {heroNotes.map((note) => (
                <article
                  key={note.title}
                  style={{ '--tilt': note.tilt, animationDelay: note.delay }}
                  className={`note-float rounded-2xl p-5 shadow-xl shadow-slate-900/5 ring-1 ${note.color}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-slate-900">
                      {note.title}
                    </h3>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${note.chip}`}
                    >
                      {note.category}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {note.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is NoteTaker */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A notebook that keeps up with your head
            </h2>

            <div className="space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Most note apps make you do the filing before you do the
                thinking — pick a notebook, choose a folder, decide on a
                template. By the time the app is ready, the idea is gone.
                NoteTaker flips that around: writing comes first, and the
                organising is a single tap.
              </p>

              <p>
                Every note is a simple card with a title, your text, and a
                category chip. Your whole collection lives on one board, saved
                to your own account in the cloud, protected behind your login.
                Open NoteTaker on any browser, sign in, and everything is
                exactly where you left it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-slate-200 bg-slate-50 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              How it works
            </p>

            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              From signup to your first saved note in under a minute
            </h2>
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <li
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-display text-lg font-bold text-white">
                    {step.number}
                  </span>

                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-slate-500">
            Changed your mind about a note? Deleting is just as careful as
            creating — NoteTaker always asks you to confirm before anything is
            removed, so a stray click never costs you your writing.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-white scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Three things, done properly
            </h2>

            <p className="mt-3 text-slate-600">
              NoteTaker doesn't try to be everything. It does the note-taking
              basics fast and gets out of your way.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-600/5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-emerald-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                    >
                      {feature.icon}
                    </svg>
                  </span>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {feature.category}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About the maker */}
      <section id="about" className="border-t border-slate-200 bg-slate-50 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
            {/* Photo — put your image at frontend/public/profile.jpg */}
            <div className="relative mx-auto">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rotate-3 rounded-3xl bg-emerald-200/60"
              />

              <img
                src="/profile.jpg"
                alt="The maker of NoteTaker"
                className="relative h-64 w-64 rounded-3xl object-cover shadow-xl ring-1 ring-slate-200 sm:h-72 sm:w-72"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                  event.currentTarget.nextElementSibling.style.display = 'flex'
                }}
              />

              {/* Fallback shown until profile.jpg exists */}
              <div
                style={{ display: 'none' }}
                className="relative h-64 w-64 items-center justify-center rounded-3xl bg-slate-900 shadow-xl sm:h-72 sm:w-72"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-24 w-24 text-emerald-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                  />
                </svg>
              </div>
            </div>

            {/* Story */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                About NoteTaker
              </p>

              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Built by one developer, for everyday thinkers
              </h2>

              <div className="mt-6 space-y-5 leading-8 text-slate-600">
                <p>
                  Hi, I'm Dikshya Thapa, the developer behind NoteTaker. I
                  built it because my own ideas kept ending up scattered across
                  chat messages to myself, random text files, and the backs of
                  old receipts — and I could never find any of them again when
                  it mattered.
                </p>

                <p>
                  NoteTaker is built from the ground up on the MERN stack:
                  MongoDB stores your notes, an Express and Node.js API serves
                  them, and a React interface keeps everything fast and
                  responsive. Your account is protected with encrypted
                  passwords and secure token-based sessions, so your notes
                  stay yours.
                </p>

                <p>
                  It's a small app on purpose. No subscriptions, no
                  distractions, no feature bloat — just a dependable place for
                  the things you don't want to forget.
                </p>
              </div>

              <Link
                to="/register"
                className="mt-8 inline-block rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Try it yourself
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-8">
          <Logo />

          <p>&copy; {new Date().getFullYear()} NoteTaker. All rights reserved.</p>

          <p>Built with the MERN stack · MongoDB · Express · React · Node</p>
        </div>
      </footer>
    </div>
  )
} 