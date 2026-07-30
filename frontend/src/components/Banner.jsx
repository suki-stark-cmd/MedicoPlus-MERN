import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

  const navigate = useNavigate()
  return (
    <div className='relative overflow-hidden rounded-2xl my-20 md:mx-10' style={{ background: 'linear-gradient(135deg, #065f46, #0f766e, #134e4a)' }}>
      {/* Decorative Blobs */}
      <div className='blob blob-emerald w-64 h-64 -top-20 right-10'></div>
      <div className='blob blob-teal w-48 h-48 bottom-0 -left-10'></div>

      <div className='flex items-center px-6 sm:px-10 md:px-14 lg:px-16'>
        {/* Left Side */}
        <div className='flex-1 py-12 sm:py-14 md:py-20 lg:py-24'>
          <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight' style={{ fontFamily: 'Inter, sans-serif' }}>
            <p>Book Appointment</p>
            <p className='mt-3 text-emerald-200'>With 100+ Trusted Doctors</p>
          </div>
          <p className='text-emerald-100/70 text-sm mt-4 max-w-md leading-relaxed'>
            Get access to the best healthcare professionals in your area. Quick, easy, and hassle-free booking.
          </p>
          <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-emerald-800 font-semibold text-sm px-8 py-3 rounded-full mt-6 hover:scale-105 hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-300 cursor-pointer'>
            Create account
          </button>
        </div>

        {/* Right Side */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
          <img className='w-full absolute bottom-0 right-0 max-w-md animate-float' src={assets.appointment_img} alt="Doctor" style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))' }} />
        </div>
      </div>
    </div>
  )
}

export default Banner