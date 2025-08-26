
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_SERVER_URL || 'https://recipe-deployment.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getRecipes = async (page = 1, limit = 15) => {
  const response = await api.get('/recipes', {
    params: { page, limit }
  })
  return response.data
}

export const searchRecipes = async (filters, page = 1, limit = 15) => {
  const response = await api.get('/recipes/search', {
    params: { ...filters, page, limit }
  })
  return response.data
}

export default api