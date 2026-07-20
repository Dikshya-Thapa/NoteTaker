import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

export async function getNotes() {
  const response = await api.get('/notes')

  return response.data
}

export async function createNote(noteData) {
  const response = await api.post('/notes', noteData)

  return response.data
}

export async function updateNote(id, noteData) {
  const response = await api.put(`/notes/${id}`, noteData)

  return response.data
}

export async function deleteNote(id) {
  const response = await api.delete(`/notes/${id}`)

  return response.data
} 