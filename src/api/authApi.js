import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

export async function registerUser(userData) {
  const response = await api.post('/auth/register', userData)

  return response.data
}

export async function loginUser(credentials) {
  const response = await api.post('/auth/login', credentials)

  return response.data
}

export function saveSession({ token, user }) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem('token'))
}

export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
} 