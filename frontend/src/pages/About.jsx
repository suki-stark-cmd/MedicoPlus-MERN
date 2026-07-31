import React from 'react'
import { assets } from '../assets/assets'
import { Award, Zap, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react'

const About = () => {
    const stats = [
        { label: "Verified Specialists", val: "100+" },
        { label: "Satisfied Patients", val: "50k+" },
        { label: "Appointments Booked", val: "150k+" },
        { label: "Patient Satisfaction", val: "99.8%" },
    ]

    return (
        <div className='py-8 px-4 sm:px-[4%] max-w-7xl mx-auto space-y-16'>
            
            {/* Header Title */}
            <div className='text-center space-y-2'>
                <h1 className='text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight'>
                    About <span className='gradient-text'>MedicoPlus</span>
                </h1>
                <p className='text-slate-500 text-sm sm:text-base max-w-xl mx-auto'>
                    Redefining digital healthcare by bridging the gap between patients and certified medical specialists.
                </p>
            </div>

            {/* Mission & Vision Showcase */}
            <div className='flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl shadow-blue-500/5'>
                <div className='w-full md:w-1/2 relative'>
                    <div className='p-2 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl'>
                        <img className='w-full h-auto rounded-2xl object-cover' src={assets.about_image} alt="About MedicoPlus" />
                    </div>
                </div>

                <div className='w-full md:w-1/2 space-y-6 text-slate-600 text-sm leading-relaxed'>
                    <h2 className='text-2xl font-bold text-slate-900'>Your Smart Healthcare Companion</h2>
                    
                    <p>
                        At MedicoPlus, we simplify how you connect with doctors and manage your health. Whether you're booking appointments, exploring available specialists, or seeking routine consultations, MedicoPlus ensures a seamless, secure, and personalized experience right at your fingertips.
                    </p>

                    <p>
                        Our team is committed to continuous technological innovation. We integrate cutting-edge telemedicine tools to ensure immediate access to healthcare whenever and wherever you need it.
                    </p>

                    <div className='p-6 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2 text-slate-800'>
                        <h3 className='text-base font-bold text-blue-700 flex items-center gap-2'>
                            <ShieldCheck className='w-5 h-5 text-blue-600' />
                            <span>Our Vision</span>
                        </h3>
                        <p className='text-xs sm:text-sm text-slate-600'>
                            To build an accessible, transparent, and connected digital healthcare ecosystem that empowers individuals to take control of their health journey without barriers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Metrics Counter Strip */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map((item, idx) => (
                    <div key={idx} className='p-6 rounded-3xl bg-white border border-slate-100 shadow-sm text-center space-y-1'>
                        <span className='text-3xl sm:text-4xl font-extrabold text-blue-600 block'>{item.val}</span>
                        <span className='text-xs sm:text-sm font-semibold text-slate-500'>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Why Choose Us */}
            <div className='space-y-8'>
                <div className='text-center space-y-2'>
                    <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
                        Why Choose <span className='gradient-text'>Us</span>
                    </h2>
                    <p className='text-slate-500 text-sm'>
                        Designed with patient convenience and security at its core.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 space-y-4'>
                        <div className='p-3.5 rounded-2xl bg-blue-50 text-blue-600 w-fit'>
                            <Zap className='w-6 h-6' />
                        </div>
                        <h3 className='text-lg font-bold text-slate-900'>Efficiency</h3>
                        <p className='text-slate-500 text-sm leading-relaxed'>
                            Streamlined appointment scheduling that effortlessly fits into your busy lifestyle without waiting lines.
                        </p>
                    </div>

                    <div className='p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 space-y-4'>
                        <div className='p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 w-fit'>
                            <Award className='w-6 h-6' />
                        </div>
                        <h3 className='text-lg font-bold text-slate-900'>Convenience</h3>
                        <p className='text-slate-500 text-sm leading-relaxed'>
                            Access to an extensive network of vetted healthcare specialists in your area with transparent pricing.
                        </p>
                    </div>

                    <div className='p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 space-y-4'>
                        <div className='p-3.5 rounded-2xl bg-cyan-50 text-cyan-600 w-fit'>
                            <Heart className='w-6 h-6' />
                        </div>
                        <h3 className='text-lg font-bold text-slate-900'>Personalization</h3>
                        <p className='text-slate-500 text-sm leading-relaxed'>
                            Tailored doctor recommendations and reminders to keep your healthcare on track effortlessly.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About