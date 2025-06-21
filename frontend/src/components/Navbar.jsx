import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaUserCircle, FaSignOutAlt, FaUserMd, FaHome, FaInfoCircle, FaPhoneAlt, FaBars } from 'react-icons/fa'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <nav className='w-full flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD] bg-gradient-to-r from-blue-200 via-white to-blue-100 shadow-md rounded-b-xl animate-fadeIn'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer transition-transform duration-300 hover:scale-105' src={assets.logo} alt="" />
      <ul className='md:flex items-start gap-12 font-semibold hidden ml-[-40px]'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
          <li className='flex items-center gap-4 py-1 hover:text-blue-500 transition-colors'><FaHome /> HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
          <li className='flex items-center gap-4 py-1 hover:text-blue-500 transition-colors'><FaUserMd /> ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
          <li className='flex items-center gap-4 py-1 hover:text-blue-500 transition-colors'><FaInfoCircle /> ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>
          <li className='flex items-center gap-4 py-1 hover:text-blue-500 transition-colors'><FaPhoneAlt /> CONTACT</li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData
            ? <div
                className="flex items-center gap-2 cursor-pointer group relative"
                tabIndex={0}
                onBlur={() => setShowProfileMenu(false)}
              >
                <div className='-ml-12 hidden md:block' onClick={() => setShowProfileMenu((prev) => !prev)}>
                  <img
                    className='w-8 rounded-full border-2 border-blue-200 shadow'
                    src={userData.image}
                    alt=""
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div className={`absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-30 ${showProfileMenu ? '' : 'hidden'}`}>
                  <div className='min-w-48 bg-white rounded-xl shadow-lg flex flex-col gap-4 p-4'>
                    <p onClick={() => { setShowProfileMenu(false); navigate('/my-profile'); }} className='hover:text-blue-600 flex items-center gap-2 cursor-pointer'><FaUserCircle /> My Profile</p>
                    <p onClick={() => { setShowProfileMenu(false); navigate('/my-appointments'); }} className='hover:text-blue-600 flex items-center gap-2 cursor-pointer'><FaUserMd /> My Appointments</p>
                    <p onClick={() => { setShowProfileMenu(false); logout(); }} className='hover:text-red-500 flex items-center gap-2 cursor-pointer'><FaSignOutAlt /> Logout</p>
                  </div>
                </div>
              </div>
            : <button onClick={() => navigate('/login')} className='bg-gradient-to-r from-blue-500 to-blue-400 text-white px-8 py-3 rounded-full font-light shadow hover:scale-105 transition-transform hidden md:block md:mr-6'>Create account</button>
        }
        <FaBars onClick={() => setShowMenu(true)} className='w-6 h-6 md:hidden text-blue-600 cursor-pointer' />
        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden fixed top-0 right-0 bottom-0 z-30 bg-white shadow-lg transition-all duration-300 ${showMenu ? 'w-3/4 animate-fadeIn' : 'w-0 overflow-hidden'}`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-semibold'>
            <NavLink onClick={() => setShowMenu(false)} to='/' className='w-full'>
              <p className='flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors'><FaHome /> HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='w-full'>
              <p className='flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors'><FaUserMd /> ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' className='w-full'>
              <p className='flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors'><FaInfoCircle /> ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' className='w-full'>
              <p className='flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors'><FaPhoneAlt /> CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar