import NoteCard from './NoteCard'

export default function NoteGrid() {
  const notes = [
    {
      id: 1,
      title: 'Study React',
      description:
        'Review React components, props and reusable component structure.',
      category: 'Study',
      date: '22 June',
    },
    {
      id: 2,
      title: 'Complete NoteTaker UI',
      description:
        'Finish the note cards, search bar and responsive grid layout.',
      category: 'Work',
      date: '23 June',
    },
    {
      id: 3,
      title: 'Feed My Dog',
      description:
        'Give my dog food and replace the drinking water.',
      category: 'Personal',
      date: '24 June',
    },
    {
      id: 4,
      title: 'Prepare Project Presentation',
      description:
        'Create slides explaining the NoteTaker components and design.',
      category: 'Study',
      date: '25 June',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          title={note.title}
          description={note.description}
          category={note.category}
          date={note.date}
        />
      ))}
    </div>
  )
} 