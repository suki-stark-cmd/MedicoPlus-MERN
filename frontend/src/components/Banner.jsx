import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { UserPlus, ArrowRight } from 'lucide-react'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 shadow-2xl text-white my-16 p-8 sm:p-12 lg:p-16'>
            {/* Ambient Background Accents */}
            <div className='absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none'></div>

            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto'>
                {/* Left Content */}
                <div className='flex-1 flex flex-col items-start gap-5 text-left'>
                    <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-200 text-xs font-medium'>
                        <span>Fast & Hassle-Free</span>
                    </div>

                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight'>
                        Book Appointment With <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white'>
                            100+ Trusted Doctors
                        </span>
                    </h2>

                    <p className='text-blue-100 text-sm sm:text-base font-light max-w-lg'>
                        Create your free patient account today to gain full access to instant appointment booking, medical history, and direct consultations.
                    </p>

                    <button 
                        onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                        className='inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-blue-700 font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer mt-2'
                    >
                        <UserPlus className='w-4 h-4 text-blue-600' />
                        <span>Create Free Account</span>
                        <ArrowRight className='w-4 h-4 text-blue-600' />
                    </button>
                </div>

                {/* Right Image Media */}
                <div className='hidden md:block w-1/2 max-w-xs lg:max-w-sm relative'>
                    <img 
                        className='w-full h-auto object-contain drop-shadow-2xl' 
                        src={assets.appointment_img} 
                        alt="Appointment Doctor" 
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner