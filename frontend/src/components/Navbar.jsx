import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { User, Calendar, LogOut, Menu, X, ChevronDown, Sparkles, Activity } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import LanguageSelector from './LanguageSelector'

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, userData, logout } = useContext(AppContext);

    return (
        <header className='sticky top-0 z-50 glass-nav transition-all duration-300 px-4 sm:px-[8%] py-3.5 mb-6'>
            <div className='flex items-center justify-between max-w-7xl mx-auto'>
                
                {/* Brand Text Logo */}
                <div onClick={() => navigate('/')} className='flex items-center gap-2.5 cursor-pointer group'>
                    <div className='w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300'>
                        <Activity className='w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse' />
                    </div>
                    <span className='text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300'>
                        Medico<span className='gradient-text'>Plus</span>
                    </span>
                </div>

                {/* Desktop Navigation Links */}
                <ul className='hidden md:flex items-center gap-8 font-medium text-sm text-slate-600'>
                    <NavLink to={'/'} className={({ isActive }) => `relative py-1.5 transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`}>
                        {({ isActive }) => (
                            <>
                                <span>HOME</span>
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse-glow'></span>
                                )}
                            </>
                        )}
                    </NavLink>
                    <NavLink to={'/doctors'} className={({ isActive }) => `relative py-1.5 transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`}>
                        {({ isActive }) => (
                            <>
                                <span>ALL DOCTORS</span>
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse-glow'></span>
                                )}
                            </>
                        )}
                    </NavLink>
                    <NavLink to={'/how-it-works'} className={({ isActive }) => `relative py-1.5 transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`}>
                        {({ isActive }) => (
                            <>
                                <span>HOW IT WORKS</span>
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse-glow'></span>
                                )}
                            </>
                        )}
                    </NavLink>
                    <NavLink to={'/health-card'} className={({ isActive }) => `relative py-1.5 transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`}>
                        {({ isActive }) => (
                            <>
                                <span>HEALTH CARD</span>
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse-glow'></span>
                                )}
                            </>
                        )}
                    </NavLink>
                    <NavLink to={'/pricing'} className={({ isActive }) => `relative py-1.5 transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`}>
                        {({ isActive }) => (
                            <>
                                <span>PRICING</span>
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse-glow'></span>
                                )}
                            </>
                        )}
                    </NavLink>
                    <NavLink to={'/contact'} className={({ isActive }) => `relative py-1.5 transition-colors duration-200 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`}>
                        {({ isActive }) => (
                            <>
                                <span>CONTACT</span>
                                {isActive && (
                                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse-glow'></span>
                                )}
                            </>
                        )}
                    </NavLink>
                </ul>

                {/* Action / Profile Menu */}
                <div className='flex items-center gap-4'>
                    {/* Language Selector */}
                    <div className='hidden sm:block'>
                        <LanguageSelector />
                    </div>

                    {token ? (
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <div className='relative p-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 group-hover:scale-105'>
                                <img 
                                    className='w-9 h-9 rounded-full object-cover border-2 border-white' 
                                    src={userData?.image || assets.profile_pic} 
                                    alt={userData?.name || "Profile"} 
                                />
                            </div>
                            <ChevronDown className='w-4 h-4 text-slate-500 transition-transform duration-300 group-hover:rotate-180' />

                            {/* Dropdown Menu */}
                            <div className='absolute top-full right-0 pt-3 text-sm font-medium text-slate-700 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2'>
                                <div className='w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-3 flex flex-col gap-1.5'>
                                    <div className='px-3 py-2 border-b border-slate-100 mb-1'>
                                        <p className='text-xs text-slate-400 font-normal'>Signed in as</p>
                                        <p className='text-sm font-semibold text-slate-900 truncate'>{userData?.name || 'User'}</p>
                                        <p className='text-xs text-slate-400 truncate'>{userData?.email || ''}</p>
                                    </div>
                                    <button onClick={() => navigate('/my-profile')} className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 transition-all text-left'>
                                        <User className='w-4 h-4 text-blue-500' />
                                        <span>My Profile</span>
                                    </button>
                                    <button onClick={() => navigate('/my-appointments')} className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 transition-all text-left'>
                                        <Calendar className='w-4 h-4 text-blue-500' />
                                        <span>My Appointments</span>
                                    </button>
                                    <button onClick={() => navigate('/subscription')} className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 transition-all text-left'>
                                        <Sparkles className='w-4 h-4 text-blue-500' />
                                        <span>Subscription</span>
                                    </button>
                                    <div className='h-px bg-slate-100 my-1'></div>
                                    <button onClick={logout} className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-all text-left'>
                                        <LogOut className='w-4 h-4 text-rose-500' />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className='relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-105 active:scale-95 cursor-pointer'
                        >
                            <Sparkles className='w-4 h-4 text-cyan-200 animate-pulse' />
                            <span>Create account</span>
                        </button>
                    )}

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setShowMenu(true)}
                        className='md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors'
                        aria-label="Toggle menu"
                    >
                        <Menu className='w-6 h-6' />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay Drawer */}
            <div className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className={`fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col p-6 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className='flex items-center justify-between border-b border-slate-100 pb-4 mb-6'>
                        <div onClick={() => { navigate('/'); setShowMenu(false); }} className='flex items-center gap-2 cursor-pointer'>
                            <div className='w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20'>
                                <Activity className='w-4 h-4 text-white animate-pulse' />
                            </div>
                            <span className='text-xl font-black tracking-tight text-slate-900'>
                                Medico<span className='gradient-text'>Plus</span>
                            </span>
                        </div>
                        <button onClick={() => setShowMenu(false)} className='p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100'>
                            <X className='w-6 h-6' />
                        </button>
                    </div>

                    <div className="mb-4">
                        <LanguageSelector />
                    </div>

                    <nav className='flex flex-col gap-3 font-medium text-slate-700'>
                        <NavLink onClick={() => setShowMenu(false)} to='/' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'}`}>
                            HOME
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'}`}>
                            ALL DOCTORS
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/how-it-works' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'}`}>
                            HOW IT WORKS
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/health-card' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'}`}>
                            HEALTH CARD
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/pricing' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'}`}>
                            PRICING
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'}`}>
                            CONTACT
                        </NavLink>
                    </nav>

                    {!token && (
                        <div className='mt-auto pt-6 border-t border-slate-100'>
                            <button 
                                onClick={() => { navigate('/login'); setShowMenu(false); }} 
                                className='w-full py-3 text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 font-medium rounded-xl shadow-lg shadow-blue-500/25'
                            >
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar