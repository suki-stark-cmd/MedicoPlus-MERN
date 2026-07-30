import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className='flex items-center justify-between py-4 px-4 sm:px-[10%]'>
        <img onClick={() => navigate('/')} className='w-40 cursor-pointer hover:opacity-80 transition-opacity duration-300' src={assets.logo} alt="MedicoPlus" style={{ filter: 'brightness(1.1)' }} />

        {/* Desktop Nav Links */}
        <ul className='hidden md:flex items-center gap-8 font-medium text-sm tracking-wide'>
          <NavLink to={'/'}>
            <li className='py-1 text-slate-300 hover:text-emerald-400 transition-colors duration-300 uppercase'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 w-3/5 m-auto hidden rounded-full' />
          </NavLink>
          <NavLink to={'/doctors'}>
            <li className='py-1 text-slate-300 hover:text-emerald-400 transition-colors duration-300 uppercase'>All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 w-3/5 m-auto hidden rounded-full' />
          </NavLink>
          <NavLink to={'/about'}>
            <li className='py-1 text-slate-300 hover:text-emerald-400 transition-colors duration-300 uppercase'>About</li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 w-3/5 m-auto hidden rounded-full' />
          </NavLink>
          <NavLink to={'/contact'}>
            <li className='py-1 text-slate-300 hover:text-emerald-400 transition-colors duration-300 uppercase'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 w-3/5 m-auto hidden rounded-full' />
          </NavLink>
        </ul>

        {/* Right Side */}
        <div className='flex items-center gap-4'>
          {
            token
              ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <div className='w-9 h-9 rounded-full border-2 border-emerald-500/50 overflow-hidden hover:border-emerald-400 transition-all duration-300'>
                  <img className='w-full h-full object-cover' src={assets.profile_pic} alt="Profile" />
                </div>
                <img className='w-2.5 opacity-60' src={assets.dropdown_icon} alt="" style={{ filter: 'invert(1)' }} />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium z-20 hidden group-hover:block'>
                  <div className='min-w-48 glass-card-static p-4 flex flex-col gap-3 animate-scaleIn'>
                    <p onClick={() => navigate('/my-profile')} className='text-slate-300 hover:text-emerald-400 cursor-pointer transition-colors duration-200 text-sm'>My Profile</p>
                    <p onClick={() => navigate('/my-appointments')} className='text-slate-300 hover:text-emerald-400 cursor-pointer transition-colors duration-200 text-sm'>My Appointments</p>
                    <div className='h-px bg-slate-700'></div>
                    <p onClick={() => setToken(false)} className='text-slate-400 hover:text-red-400 cursor-pointer transition-colors duration-200 text-sm'>Logout</p>
                  </div>
                </div>
              </div>
              : <button onClick={() => navigate('/login')} className='gradient-btn hidden md:block text-sm px-6 py-2.5'>Create account</button>
          }

          {/* Mobile Hamburger */}
          <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" style={{ filter: 'invert(1)' }} />

          {/* Mobile Menu */}
          <div className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${showMenu ? 'visible' : 'invisible'}`}>
            {/* Backdrop */}
            <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${showMenu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowMenu(false)}></div>

            {/* Menu Panel */}
            <div className={`absolute top-0 right-0 bottom-0 w-72 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 transition-transform duration-500 ease-out ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className='flex items-center justify-between px-6 py-6'>
                <img className='w-32' src={assets.logo} alt="" style={{ filter: 'brightness(1.1)' }} />
                <img className='w-6 cursor-pointer opacity-60 hover:opacity-100 transition-opacity' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" style={{ filter: 'invert(1)' }} />
              </div>
              <ul className='flex flex-col gap-2 mt-5 px-6'>
                <NavLink onClick={() => setShowMenu(false)} to='/'>
                  <p className='px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-all duration-200'>Home</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
                  <p className='px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-all duration-200'>All Doctors</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/about'>
                  <p className='px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-all duration-200'>About</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/contact'>
                  <p className='px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-all duration-200'>Contact</p>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar