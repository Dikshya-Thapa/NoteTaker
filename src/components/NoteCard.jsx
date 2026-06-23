const categoryColors = {
  Personal: 'bg-pink-100 text-pink-700',
  Work: 'bg-blue-100 text-blue-700',
  Study: 'bg-green-100 text-green-700',
}

export default function NoteCard({ title, description, category }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <span
        className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-medium ${categoryColors[category]}`}
      >
        {category}
      </span>
    </div>
  )
} 