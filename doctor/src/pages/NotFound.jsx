import React from 'react'
import { Home, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-white/80 max-w-md mx-auto">
            The page you're looking for doesn't exist or you may have been redirected.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.05]"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
