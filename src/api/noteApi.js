import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

// Attach the JWT (saved at login/register) to every request,
// so the protected note routes (POST / PUT / DELETE) work.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
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