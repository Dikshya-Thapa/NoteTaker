export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        />
      </svg>

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search notes by title..."
        className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  )
} 