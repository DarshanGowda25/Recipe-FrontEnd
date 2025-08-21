// src/components/RecipeTable.jsx
import { useState } from 'react'
import RatingStars from './RatingStars'

const RecipeTable = ({
  recipes,
  loading,
  pagination,
  filters,
  onRowClick,
  onFiltersChange,
  onPaginationChange
}) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (field, value) => {
    const newFilters = { ...localFilters }
    if (value) {
      newFilters[field] = value
    } else {
      delete newFilters[field]
    }
    setLocalFilters(newFilters)
  }

  const applyFilters = () => {
    // Transform frontend filter keys to backend API expected keys
    const apiFilters = { ...localFilters }
    
    // Convert maxCalories to calories for the API
    if (apiFilters.maxCalories) {
      apiFilters.calories = `<=${apiFilters.maxCalories}`
      delete apiFilters.maxCalories
    }
    
    // Convert other filters if needed (e.g., maxTime to total_time)
    if (apiFilters.maxTime) {
      apiFilters.total_time = `<=${apiFilters.maxTime}`
      delete apiFilters.maxTime
    }
    
    onFiltersChange(apiFilters)
    onPaginationChange({ ...pagination, page: 1 })
  }

  const clearFilters = () => {
    const emptyFilters = {}
    setLocalFilters(emptyFilters)
    onFiltersChange(emptyFilters)
    onPaginationChange({ ...pagination, page: 1 })
  }

  const handlePageChange = (newPage) => {
    onPaginationChange({ ...pagination, page: newPage })
  }

  const handleLimitChange = (newLimit) => {
    onPaginationChange({ ...pagination, limit: parseInt(newLimit), page: 1 })
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit)

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Filter Section */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={localFilters.title || ''}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
            <input
              type="text"
              value={localFilters.cuisine || ''}
              onChange={(e) => handleFilterChange('cuisine', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search cuisine"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={localFilters.minRating || ''}
              onChange={(e) => handleFilterChange('minRating', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Min rating"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Time (min)</label>
            <input
              type="number"
              value={localFilters.maxTime || ''}
              onChange={(e) => handleFilterChange('maxTime', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Max time"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Calories</label>
            <input
              type="number"
              value={localFilters.maxCalories || ''}
              onChange={(e) => handleFilterChange('maxCalories', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Max calories"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuisine</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serves</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                </tr>
              ))
            ) : (
              recipes.map((recipe) => (
                <tr 
                  key={recipe.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onRowClick(recipe)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {recipe.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{recipe.cuisine}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RatingStars rating={recipe.rating} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{recipe.total_time || recipe.totalTime} min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{recipe.serves}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {recipe.nutrients?.calories || 'N/A'}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span> of{' '}
            <span className="font-medium">{pagination.total}</span> results
          </span>
          
          <select
            value={pagination.limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="15">15 / page</option>
            <option value="25">25 / page</option>
            <option value="50">50 / page</option>
          </select>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (pagination.page <= 3) {
              pageNum = i + 1
            } else if (pagination.page >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = pagination.page - 2 + i
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md text-sm ${
                  pagination.page === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeTable