import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-20'>
      {/* Gradient Divider */}
      <div className='section-divider'></div>

      <div className='px-4 sm:px-[10%] py-16' style={{ background: 'linear-gradient(180deg, #0f172a, #0c1222)' }}>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm'>

          {/* Left Section */}
          <div>
            <img className='mb-5 w-40' src={assets.logo} alt="MedicoPlus" style={{ filter: 'brightness(1.1)' }} />
            <p className='w-full md:w-2/3 text-slate-400 leading-7'>
              MedicoPlus is your smart healthcare companion. We simplify the way you connect with doctors and manage your health, ensuring a seamless and personalized experience.
            </p>
            {/* Social Icons */}
            <div className='flex gap-4 mt-6'>
              {['M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.6 8.6 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 5.67a4.28 4.28 0 001.32 5.72 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.27 4.27 0 01-1.93.07 4.28 4.28 0 004 2.97A8.58 8.58 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.06a8.5 8.5 0 01-2.54.7z',
                'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z',
                'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z'
              ].map((path, i) => (
                <div key={i} className='w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer group'>
                  <svg className='w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors' fill='currentColor' viewBox='0 0 24 24'><path d={path} /></svg>
                </div>
              ))}
            </div>
          </div>

          {/* Center Section */}
          <div>
            <p className='text-lg font-semibold text-white mb-5' style={{ fontFamily: 'Inter, sans-serif' }}>COMPANY</p>
            <ul className='flex flex-col gap-3 text-slate-400'>
              <li className='hover:text-emerald-400 cursor-pointer transition-colors duration-200'><Link to='/'>Home</Link></li>
              <li className='hover:text-emerald-400 cursor-pointer transition-colors duration-200'><Link to='/about'>About us</Link></li>
              <li className='hover:text-emerald-400 cursor-pointer transition-colors duration-200'><Link to='/contact'>Contact us</Link></li>
              <li className='hover:text-emerald-400 cursor-pointer transition-colors duration-200'>Privacy policy</li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <p className='text-lg font-semibold text-white mb-5' style={{ fontFamily: 'Inter, sans-serif' }}>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-slate-400'>
              <li className='flex items-center gap-2'>
                <svg className='w-4 h-4 text-emerald-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' /></svg>
                +1-212-456-7890
              </li>
              <li className='flex items-center gap-2'>
                <svg className='w-4 h-4 text-emerald-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>
                medicoplus.tech@gmail.com
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className='mt-12'>
          <div className='h-px bg-slate-800'></div>
          <p className='py-5 text-sm text-center text-slate-500'>
            Copyright © 2025 MedicoPlus - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer