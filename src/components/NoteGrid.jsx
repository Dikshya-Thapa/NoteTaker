import NoteCard from './NoteCard'

export default function NoteGrid() {
  const notes = [
    {
      id: 1,
      title: 'Study React',
      description: 'Learn React components and props.',
      category: 'Study',
    },
    {
      id: 2,
      title: 'Complete Project',
      description: 'Finish the note taker homepage.',
      category: 'Work',
    },
    {
      id: 3,
      title: 'Buy Groceries',
      description: 'Buy milk, bread and vegetables.',
      category: 'Personal',
    },
    {
      id: 4,
      title: 'Prepare Presentation',
      description: 'Create slides for the class presentation.',
      category: 'Study',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          title={note.title}
          description={note.description}
          category={note.category}
        />
      ))}
    </div>
  )
}