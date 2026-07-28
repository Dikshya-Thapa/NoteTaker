import axios from 'axios'

const APIURL = import.meta.env.API_URL || 'https://notetaker-backend-dydl.onrender.com'

const api = axios.create({
  baseURL: APIURL,
  withCredentials: true,
})


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