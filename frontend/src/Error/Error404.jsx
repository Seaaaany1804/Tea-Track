import React from 'react'

const Error404 = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Tea Track Logo */}
      <div className="mb-8">
        <span className="text-4xl font-sans font-bold">
          <span className="text-emerald-600">Tea</span>
          <span className="text-emerald-800">Track</span>
        </span>
      </div>

      {/* Error Message */}
      <div className="text-center mb-8">
        <h1 className="text-2xl mb-4 text-gray-800 font-semibold">404 - Page Not Found</h1>
        <p className="text-gray-600">Oops! Looks like this page has steeped for too long.</p>
        <p className="text-gray-600 mt-2">Let's get you back to brewing.</p>
      </div>

      {/* Tea Cup Illustration */}
      <div className="w-48 h-48 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Tea Cup */}
            <path 
              d="M20 40 Q50 40 80 40 L75 70 Q50 75 25 70 Z" 
              className="fill-emerald-100 stroke-emerald-600 stroke-2"
            />
            {/* Cup Handle */}
            <path 
              d="M75 50 Q90 50 85 60 Q80 70 75 65" 
              className="fill-none stroke-emerald-600 stroke-2"
            />
            {/* Steam */}
            <path 
              d="M40 35 Q45 25 50 35 Q55 25 60 35" 
              className="fill-none stroke-emerald-400 stroke-2"
            />
            {/* Tea Line */}
            <path 
              d="M30 50 Q50 55 70 50" 
              className="fill-none stroke-emerald-500 stroke-2"
            />
          </svg>
        </div>
      </div>

      {/* Return Home Button */}
      <button 
        className="mt-8 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        onClick={() => window.location.href = '/'}
      >
        Return Home
      </button>
    </div>
  )
}

export default Error404