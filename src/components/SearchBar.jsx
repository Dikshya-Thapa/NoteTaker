export default function SearchBar() {
  return (
    <div className="w-full">
      <input
        type="search"
        placeholder="Search notes..."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
      />
    </div>
  )
}