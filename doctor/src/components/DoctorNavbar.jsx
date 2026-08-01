import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import {
  Home,
  Calendar,
  Clock,
  Wallet,
  User,
  Menu,
  X,
  LogOut,
  Stethoscope
} from 'lucide-react'

const DoctorNavbar = () => {
  const { profile, logout } = useContext(DoctorContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/appointments', label: 'Appointments', icon: Calendar },
    { to: '/schedule', label: 'Schedule', icon: Clock },
    { to: '/earnings', label: 'Earnings', icon: Wallet },
    { to: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-purple rounded-xl flex items-center justify-center animate-pulse-glow">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Doctor Portal</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}

            {/* Doctor Profile */}
            {profile && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                <img
                  src={profile.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNEOEQ4RDgiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE0IiByPSI4IiBmaWxsPSIjOEEEDY4Ij48L2NpcmNsZT48cGF0aCBkPSJNMzUgMjRsLTItNS0zIDRtMCAwTDM1IDI0IiBmaWxsPSIjOEEEDY4Ij48L3BhdGg+PC9zdmc+'}
                  alt={profile.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-indigo-200"
                />
                <span className="text-sm font-medium text-gray-700 hidden lg:block">
                  Dr. {profile.name?.split(' ')[0] || 'Doctor'}
                </span>
              </div>
            )}

            <button
              onClick={logout}
              className="ml-2 text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {profile && (
              <img
                src={profile.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNEOEQ4RDgiLz48L2NpcmNsZT4KPHBhdGggZD0iTTM1IDI0bC0yLTVsLTMgM3ptMCAwTDM1IDI0IiBmaWxsPSIjOEEEDY4Ij48L3BhdGg+PC9zdmc+'}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-200"
              />
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-1 mt-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-indigo-50'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-left"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default DoctorNavbar
