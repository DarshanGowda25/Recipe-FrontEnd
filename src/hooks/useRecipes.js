// src/hooks/useRecipes.js
import { useState, useEffect } from 'react'
import { getRecipes, searchRecipes } from '../services/api'

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0
  })
  const [filters, setFilters] = useState({})

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        let response
        
        if (Object.keys(filters).length === 0) {
          response = await getRecipes(pagination.page, pagination.limit)
        } else {
          response = await searchRecipes(filters, pagination.page, pagination.limit)
        }
        
        setRecipes(response.data)
        setPagination(prev => ({
          ...prev,
          total: response.total
        }))
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [pagination.page, pagination.limit, filters])

  return {
    recipes,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    setPagination
  }
}