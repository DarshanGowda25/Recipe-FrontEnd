// src/App.jsx
import { useState } from 'react'
import RecipeTable from './components/RecipeTable'
import RecipeDrawer from './components/RecipeDrawer'
import FallbackMessage from './components/FallbackMessage'
import { useRecipes } from './hooks/useRecipes'

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const {
    recipes,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    setPagination
  } = useRecipes()

  const handleRowClick = (recipe) => {
    setSelectedRecipe(recipe)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedRecipe(null)
  }

  if (error) {
    return <FallbackMessage type="error" message={error.message} />
  }

  if (!loading && recipes.length === 0) {
    return <FallbackMessage type="no-data" message="No recipes found" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe Explorer</h1>
        
        <RecipeTable
          recipes={recipes}
          loading={loading}
          pagination={pagination}
          filters={filters}
          onRowClick={handleRowClick}
          onFiltersChange={setFilters}
          onPaginationChange={setPagination}
        />
        
        <RecipeDrawer
          recipe={selectedRecipe}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
        />
      </div>
    </div>
  )
}

export default App