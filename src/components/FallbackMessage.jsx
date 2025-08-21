// src/components/FallbackMessage.jsx
const FallbackMessage = ({ type = 'no-data', message }) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      case 'no-data':
      default:
        return (
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {getIcon()}
        <h3 className="mt-4 text-xl font-medium text-gray-900">
          {type === 'error' ? 'Something went wrong' : 'No recipes found'}
        </h3>
        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          {message || (type === 'error' 
            ? 'There was an error loading the recipes. Please try again later.' 
            : 'No recipes match your search criteria. Try adjusting your filters.')}
        </p>
        {type === 'error' && (
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default FallbackMessage