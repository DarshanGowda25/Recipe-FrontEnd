// src/components/RecipeDrawer.jsx
import { useState } from 'react'
import NutritionTable from './NutritionTable'

const RecipeDrawer = ({ recipe, isOpen, onClose }) => {
  const [expandedTime, setExpandedTime] = useState(false)

  if (!recipe) return null

  return (
    <>

      
      {/* Drawer - fixed to right side with proper width */}
      <div className={`fixed top-0 right-0 h-full w-[600px] max-w-lg bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 sticky top-0">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{recipe.title}</h2>
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p className="text-blue-100 mt-1">{recipe.cuisine}</p>
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{recipe.description || "No description available."}</p>
            </div>
            
            {/* Time Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Time Details</h3>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div>
                  <span className="font-medium">Total Time:</span> {recipe.total_time || recipe.totalTime} minutes
                </div>
                <button 
                  onClick={() => setExpandedTime(!expandedTime)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${expandedTime ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
              
              {expandedTime && (
                <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Prep Time:</span> {recipe.prep_time || recipe.prepTime || 'N/A'} minutes
                    </div>
                    <div>
                      <span className="font-medium">Cook Time:</span> {recipe.cook_time || recipe.cookTime || 'N/A'} minutes
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Serves */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Serving Information</h3>
              <p className="text-gray-600">{recipe.serves}</p>
            </div>
            
            {/* Nutrition */}
            {recipe.nutrients && Object.keys(recipe.nutrients).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nutrition Information</h3>
                <NutritionTable nutrition={recipe.nutrients} />
              </div>
            )}
            
            {/* Show message if no nutrition data */}
            {(!recipe.nutrients || Object.keys(recipe.nutrients).length === 0) && (
              <div className="text-gray-500 italic">
                No nutrition information available for this recipe.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeDrawer