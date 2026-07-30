import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)

  return (
    <div className='page-wrapper py-6'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
          My <span className='gradient-text'>Appointments</span>
        </h1>
        <p className='text-slate-400 mt-2 text-sm'>Manage your upcoming and past appointments.</p>
        <div className='w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mt-3 rounded-full'></div>
      </div>

      {/* Appointment List */}
      <div className='flex flex-col gap-4'>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            className='glass-card-static p-5 flex flex-col sm:flex-row gap-5 animate-fadeInUp'
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            key={index}
          >
            {/* Doctor Image */}
            <div className='w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700/50' style={{ background: 'linear-gradient(135deg, #065f46, #0f766e)' }}>
              <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
            </div>

            {/* Appointment Details */}
            <div className='flex-1'>
              <h3 className='text-white font-semibold text-lg' style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</h3>
              <p className='text-emerald-400 text-sm mt-0.5'>{item.speciality}</p>

              <div className='mt-3 flex flex-col gap-1'>
                <p className='text-slate-400 text-xs flex items-center gap-2'>
                  <svg className='w-3.5 h-3.5 text-slate-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
                  {item.address.line1}, {item.address.line2}
                </p>
                <p className='text-slate-300 text-sm flex items-center gap-2 mt-1'>
                  <svg className='w-3.5 h-3.5 text-emerald-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
                  <span className='text-slate-400'>25, May, 2025</span>
                  <span className='text-slate-600'>|</span>
                  <span className='text-slate-400'>5:30 PM</span>
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className='flex items-center sm:hidden'>
              <span className='px-3 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'>
                Upcoming
              </span>
            </div>

            {/* Actions */}
            <div className='flex flex-row sm:flex-col gap-3 justify-end items-end'>
              <span className='hidden sm:inline-block px-3 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 mb-2'>
                Upcoming
              </span>
              <button className='gradient-btn text-xs px-6 py-2.5 sm:min-w-[140px]'>
                Pay Online
              </button>
              <button className='text-xs text-red-400 px-6 py-2.5 sm:min-w-[140px] rounded-full border border-red-500/30 hover:bg-red-500/15 hover:border-red-500/50 transition-all duration-300 cursor-pointer'>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (when no appointments) */}
      {doctors.length === 0 && (
        <div className='glass-card-static p-16 text-center animate-fadeInUp'>
          <div className='w-20 h-20 rounded-full bg-slate-800 mx-auto mb-6 flex items-center justify-center'>
            <svg className='w-10 h-10 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
          </div>
          <h3 className='text-xl font-semibold text-white mb-2'>No Appointments Yet</h3>
          <p className='text-slate-400 text-sm'>Book your first appointment with a trusted doctor.</p>
        </div>
      )}
    </div>
  )
}

export default MyAppointments