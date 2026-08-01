import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
            <div className="text-center space-y-8 max-w-md">
                <div className="space-y-4">
                    <h1 className="text-8xl font-extrabold gradient-text">404</h1>
                    <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
                    <p className="text-slate-500 text-sm">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <Home className="w-4 h-4" />
                    Return Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
