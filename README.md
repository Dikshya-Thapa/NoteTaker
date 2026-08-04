# NoteTaker — Frontend

The React interface for NoteTaker, a personal note-taking app where you can write,
organise and search notes, and ask a built-in AI assistant about them.

Live site: https://spiffy-rugelach-f7d678.netlify.app
API: https://notetaker-backend-dydl.onrender.com
Backend repository: https://github.com/Dikshya-Thapa/NoteTaker_Backend

## Features

- Landing page introducing the app, with sections on how it works and about the developer
- Register and log in with JWT authentication, including a show/hide password toggle
- Notes dashboard with a time-based greeting and the current date
- Create, read, update and delete notes, each with a title, body and category
- Categories: Personal, Work and Study, colour-coded across the app
- Live search by title, combined with a category filter
- Confirmation dialogs before deleting a note or logging out
- Toast messages for every action, and a loading skeleton while notes are fetched
- AI assistant panel that answers questions about your own saved notes
- Responsive layout for mobile, tablet and desktop
- Protected routes: signed-out visitors are redirected to the login page

## Tech stack

- React 19 with React Router
- Vite
- Tailwind CSS
- Axios

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173

### Environment variables

Create a `.env` file in this folder:

```
VITE_API_URL=http://localhost:3001
```

Point it at the deployed API instead when you want to work against production data:

```
VITE_API_URL=https://notetaker-backend-dydl.onrender.com
```

Vite reads `.env` only at startup, so restart the dev server after changing it.
See `.env.example` for a template.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
public/            logo, artwork, profile photo, Netlify redirect rule
src/
  api/             axios clients for auth, notes and the AI assistant
  components/      NoteCard, NoteGrid, SearchBar, NewNoteButton, ChatAssistant
  pages/           Landing, Login, Register, Home, NewNote, EditNote
  App.jsx          routes, protected routes, note state and toasts
  index.css        Tailwind setup and custom animations
```

## Deployment

Deployed to Netlify from the `main` branch.

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL` set to the deployed API URL

`public/_redirects` contains `/* /index.html 200`, which lets React Router handle
page refreshes on routes such as `/notes` instead of returning a 404.

A GitHub Actions workflow lints and builds the project on every push to `main`.

## Author

Dikshya Thapa