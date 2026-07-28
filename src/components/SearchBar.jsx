const categories = ['All', 'Personal', 'Work', 'Study']

export default function SearchBar({
  value,
  onChange,
  category,
  onCategoryChange,
  counts,
}) {
  return (
    <div className="flex flex-col items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 sm:flex-row">
      {/* Search input */}
      <div className="relative flex-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
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
          className="w-full bg-transparent py-4 pl-12 pr-4 text-sm outline-none"
        />
      </div>

      {/* Category filter, built into the bar */}
      {onCategoryChange && (
        <label className="relative flex cursor-pointer select-none items-center gap-2 border-t border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:bg-slate-100 sm:border-l sm:border-t-0 sm:py-0">
          <span className="text-sm font-medium text-slate-500">
            Categories:
          </span>

          <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
            {category}
            {counts ? ` (${counts[category] ?? 0})` : ''}

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-slate-400"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>

          
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            aria-label="Filter notes by category"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
                {counts ? ` (${counts[option] ?? 0})` : ''}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  )
} 