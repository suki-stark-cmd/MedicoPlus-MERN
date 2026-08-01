import React from 'react'

const LoadingSplash = ({ fullScreen = false }) => {
    const spinner = (
        <div className="flex items-center justify-center gap-2 text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-bounce"></div>
        </div>
    )

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="text-center">
                    {spinner}
                    <p className="mt-4 text-sm text-slate-500">Loading MedicoPlus...</p>
                </div>
            </div>
        )
    }

    return spinner
}

export default LoadingSplash
