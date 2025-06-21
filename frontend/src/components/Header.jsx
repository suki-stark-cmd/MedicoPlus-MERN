import React from 'react'
import { assets } from '../assets/assets'
import { FaUserFriends, FaArrowRight } from 'react-icons/fa'

const Header = () => {
    return (
        <div className='w-full flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-blue-200 via-white to-blue-100 rounded-2xl px-6 md:px-10 lg:px-20 shadow-xl animate-fadeIn min-h-[620px] md:min-h-[700px]'>
            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-blue-900 font-extrabold leading-tight drop-shadow-lg'>
                    Book Appointment <br />  With Trusted Doctors
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-blue-900 text-base font-light'>
                    <FaUserFriends className='w-8 h-8 bg-white rounded-full p-1 shadow' />
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </div>
                <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-blue-900 text-sm m-auto md:m-0 hover:scale-105 hover:bg-blue-100 transition-all duration-300 shadow focus:scale-95 active:scale-95'>
                    Book appointment <FaArrowRight className='w-4 h-4' />
                </a>
            </div>
            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative flex justify-center items-end'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-2xl animate-fadeIn' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header