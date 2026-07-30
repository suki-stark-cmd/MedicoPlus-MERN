import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='page-wrapper py-6'>
      {/* Page Header */}
      <div className='text-center pt-10 animate-fadeInUp'>
        <h1 className='text-3xl md:text-4xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
          Contact <span className='gradient-text'>Us</span>
        </h1>
        <div className='w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full'></div>
      </div>

      <div className='my-12 flex flex-col justify-center md:flex-row gap-10 mb-28 animate-fadeInUp stagger-2'>
        {/* Image */}
        <div className='w-full md:max-w-[360px] rounded-2xl overflow-hidden flex-shrink-0'>
          <img className='w-full h-full object-cover' src={assets.contact_image} alt="Contact" style={{ filter: 'brightness(0.85)' }} />
        </div>

        {/* Contact Info */}
        <div className='flex flex-col justify-center gap-8'>
          {/* Office */}
          <div className='glass-card-static p-6 rounded-xl'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center'>
                <svg className='w-5 h-5 text-emerald-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
              </div>
              <h3 className='font-semibold text-lg text-white' style={{ fontFamily: 'Inter, sans-serif' }}>Our Office</h3>
            </div>
            <p className='text-slate-400 text-sm leading-relaxed'>54709 Willms Station <br />Suite 350, Washington, USA</p>
          </div>

          {/* Contact Details */}
          <div className='glass-card-static p-6 rounded-xl'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center'>
                <svg className='w-5 h-5 text-emerald-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' /></svg>
              </div>
              <h3 className='font-semibold text-lg text-white' style={{ fontFamily: 'Inter, sans-serif' }}>Get in Touch</h3>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-slate-400 text-sm flex items-center gap-2'>
                <span className='text-slate-500'>Tel:</span> (415) 555-0132
              </p>
              <p className='text-slate-400 text-sm flex items-center gap-2'>
                <span className='text-slate-500'>Email:</span> medicoplus.tech@gmail.com
              </p>
            </div>
          </div>

          {/* Careers */}
          <div className='glass-card-static p-6 rounded-xl'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center'>
                <svg className='w-5 h-5 text-emerald-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>
              </div>
              <h3 className='font-semibold text-lg text-white' style={{ fontFamily: 'Inter, sans-serif' }}>Careers at MedicoPlus</h3>
            </div>
            <p className='text-slate-400 text-sm mb-4'>Learn more about our teams and job openings.</p>
            <button className='gradient-btn-outline text-sm'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact