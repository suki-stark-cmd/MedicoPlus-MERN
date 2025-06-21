import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'

const Banner = () => {
    const navigate = useNavigate()
    return (
        <div className='flex bg-gradient-to-r from-blue-200 via-white to-blue-100 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-0 md:mx-10 shadow-xl animate-fadeIn'>
            {/* ------- Left Side ------- */}
            <div className='flex-1 py-6 sm:py-8 md:py-12 lg:py-16 lg:pl-5 flex flex-col justify-center'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-blue-900 drop-shadow-lg'>
                    <p>Book Appointment</p>
                    <p className='mt-4'>With 100+ Trusted Doctors</p>
                </div>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm sm:text-base px-4 py-3 rounded-full mt-6 shadow hover:scale-105 hover:bg-blue-600 transition-all focus:scale-95 active:scale-95 min-w-[140px] w-fit'><FaUserPlus />Create account</button>
            </div>
            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0 max-w-md rounded-2xl' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner