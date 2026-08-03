import axios from 'axios'


const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://notetaker-backend-dydl.onrender.com'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export async function askAssistant(message) {
  const response = await api.post('/ai/chat', { message })

  return response.data
}