import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='relative overflow-hidden rounded-2xl mx-4 sm:mx-0' style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #0d4a4a 100%)' }}>
      {/* Decorative Blobs */}
      <div className='blob blob-emerald w-72 h-72 -top-20 -right-20'></div>
      <div className='blob blob-teal w-96 h-96 -bottom-40 -left-20'></div>
      <div className='blob blob-cyan w-48 h-48 top-1/2 left-1/3'></div>

      <div className='flex flex-col md:flex-row items-center px-6 md:px-10 lg:px-20'>
        {/* Left Side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-14 md:py-[8vw]'>
          <p className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight animate-fadeInUp' style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className='text-white'>Book Appointment</span> <br />
            <span className='gradient-text'>With Trusted Doctors</span>
          </p>
          <div className='flex flex-col md:flex-row items-center gap-4 text-slate-300 text-sm font-light animate-fadeInUp stagger-2'>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p className='leading-relaxed'>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />schedule your appointment hassle-free.</p>
          </div>

          {/* Stats */}
          <div className='flex gap-8 mt-2 animate-fadeInUp stagger-3'>
            <div className='text-center'>
              <p className='text-2xl font-bold text-white'>200+</p>
              <p className='text-xs text-slate-400 mt-1'>Expert Doctors</p>
            </div>
            <div className='w-px bg-slate-600'></div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-white'>1K+</p>
              <p className='text-xs text-slate-400 mt-1'>Happy Patients</p>
            </div>
            <div className='w-px bg-slate-600'></div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-white'>50+</p>
              <p className='text-xs text-slate-400 mt-1'>Specialities</p>
            </div>
          </div>

          <a href="#speciality" className='gradient-btn flex items-center gap-2 mt-2 animate-fadeInUp stagger-4 text-sm'>
            Book appointment <img className='w-3' src={assets.arrow_icon} alt="" style={{ filter: 'invert(1)' }} />
          </a>
        </div>

        {/* Right Side */}
        <div className='md:w-1/2 relative flex justify-center'>
          <img className='w-full md:absolute bottom-0 h-auto max-w-md animate-float' src={assets.header_img} alt="Doctor" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }} />
        </div>
      </div>
    </div>
  )
}

export default Header