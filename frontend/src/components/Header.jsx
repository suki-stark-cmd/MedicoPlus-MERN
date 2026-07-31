import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar, Star, ShieldCheck, Award } from 'lucide-react'

const Header = () => {
    return (
        <div className='relative overflow-hidden rounded-3xl gradient-hero shadow-2xl text-white my-4 p-8 sm:p-12 lg:p-16'>
            {/* Ambient Background Glow Orbs */}
            <div className='absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow'></div>
            <div className='absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow'></div>

            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto'>
                {/* Left Hero Content */}
                <div className='md:w-1/2 flex flex-col items-start gap-6 text-left'>
                    {/* Top Tag Badge */}
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-200 text-xs sm:text-sm font-medium shadow-sm'>
                        <ShieldCheck className='w-4 h-4 text-cyan-300' />
                        <span>Trusted Healthcare Network</span>
                    </div>

                    {/* Hero Heading */}
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight'>
                        Book Appointments With <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-100 to-white'>Top Verified Doctors</span>
                    </h1>

                    {/* Social Proof & Description */}
                    <p className='text-slate-100 text-base sm:text-lg font-light leading-relaxed max-w-xl'>
                        Connect with top-rated medical specialists instantly. Easy scheduling, transparent reviews, and personalized patient care—all in one place.
                    </p>

                    {/* Avatar Stack & Ratings */}
                    <div className='flex items-center gap-4 py-2'>
                        <div className='flex items-center -space-x-3'>
                            <img className='w-10 h-10 rounded-full border-2 border-blue-600 object-cover' src={assets.group_profiles} alt="Patients" />
                        </div>
                        <div className='flex flex-col text-xs'>
                            <div className='flex items-center gap-1 text-amber-300 font-bold'>
                                <Star className='w-4 h-4 fill-amber-300' />
                                <span>4.9 / 5.0</span>
                            </div>
                            <span className='text-cyan-100 font-light'>Over 50,000+ satisfied patients</span>
                        </div>
                    </div>

                    {/* Primary CTA Button */}
                    <div className='flex flex-wrap items-center gap-4 pt-2'>
                        <a 
                            href="#speciality" 
                            className='inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-semibold text-sm sm:text-base rounded-full shadow-lg shadow-black/10 hover:shadow-xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer'
                        >
                            <Calendar className='w-5 h-5 text-blue-600' />
                            <span>Book Appointment</span>
                            <ArrowRight className='w-4 h-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-1' />
                        </a>
                    </div>
                </div>

                {/* Right Hero Media */}
                <div className='md:w-1/2 relative flex justify-center items-end'>
                    {/* Floating Feature Card */}
                    <div className='absolute top-4 -left-4 sm:left-4 z-20 hidden sm:flex items-center gap-3 p-3.5 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl text-slate-800 animate-float'>
                        <div className='p-2.5 bg-blue-100 rounded-xl text-blue-600'>
                            <Award className='w-5 h-5' />
                        </div>
                        <div>
                            <p className='text-xs text-slate-400 font-medium'>Quality Assured</p>
                            <p className='text-sm font-bold text-slate-900'>100% Certified Doctors</p>
                        </div>
                    </div>

                    {/* Hero Image Container */}
                    <div className='relative w-full max-w-md lg:max-w-lg rounded-3xl overflow-hidden pt-6'>
                        <img 
                            className='w-full h-auto object-cover rounded-2xl drop-shadow-2xl transition-transform duration-700 hover:scale-102 max-h-[460px]' 
                            src={assets.hero_banner || assets.header_img} 
                            alt="Doctor Consultation" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header