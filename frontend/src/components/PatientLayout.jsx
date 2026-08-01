import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PatientLayout = ({ children }) => {
    const { token } = useContext(AppContext)
    const navigate = useNavigate()

    // Auth guard: redirect to login if no token
    if (!token) {
        navigate('/login')
        return null
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Patient Portal Header */}
            <header className="sticky top-0 z-50 glass-nav px-4 sm:px-[8%] py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2.5 cursor-pointer group"
                    >
                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                            <span className="text-xl font-black">M+</span>
                        </div>
                        <span className="text-2xl font-black text-slate-900">Medico<span className="gradient-text">Plus</span></span>
                    </button>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <button onClick={() => navigate('/my-appointments')} className="hover:text-blue-600 transition-colors">Appointments</button>
                        <button onClick={() => navigate('/medical-records')} className="hover:text-blue-600 transition-colors">Medical Records</button>
                        <button onClick={() => navigate('/prescriptions')} className="hover:text-blue-600 transition-colors">Prescriptions</button>
                        <button onClick={() => navigate('/notifications')} className="hover:text-blue-600 transition-colors">Notifications</button>
                    </nav>
                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}

export default PatientLayout
