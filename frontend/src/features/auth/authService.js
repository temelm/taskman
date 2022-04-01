import axios from 'axios'

const API_URL = '/api/users/'

const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logoutUser = async () => {
  localStorage.removeItem('user')
}

const authService = {
  createUser,
  loginUser,
  logoutUser
}

export default authService