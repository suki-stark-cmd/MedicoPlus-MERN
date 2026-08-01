import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Star, CheckCircle2, ArrowRight, Calendar } from 'lucide-react'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors, currencySymbol } = useContext(AppContext)

    return (
        <section className='py-16 px-4 sm:px-[6%] bg-slate-50/50 rounded-3xl my-8'>
            <div className='max-w-7xl mx-auto flex flex-col items-center gap-4 text-center'>
                {/* Header Badge */}
                <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold uppercase tracking-wider'>
                    <CheckCircle2 className='w-3.5 h-3.5 text-emerald-500' />
                    <span>Verified Medical Team</span>
                </div>

                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight'>
                    Top Rated <span className='gradient-text'>Doctors</span>
                </h2>

                <p className='sm:w-2/3 md:w-1/2 text-slate-500 text-sm sm:text-base leading-relaxed'>
                    Connect with our highly experienced medical specialists and schedule your consultation online.
                </p>

                {/* Doctor Cards Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8 w-full text-left'>
                    {doctors.slice(0, 8).map((item, index) => (
                        <div 
                            onClick={() => { navigate(`/doctor/${item._id}`); scrollTo(0, 0) }} 
                            key={index}
                            className='group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between'
                        >
                            {/* Image Container with Overlay Gradient */}
                            <div className='relative bg-gradient-to-b from-blue-50/80 to-slate-100 overflow-hidden pt-4 px-4'>
                                {/* Availability Pill */}
                                <div className='absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-emerald-100 text-emerald-600 text-xs font-medium'>
                                    <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></span>
                                    <span>Available</span>
                                </div>

                                <img 
                                    className='w-full h-56 object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500' 
                                    src={item.image} 
                                    alt={item.name} 
                                />
                            </div>

                            {/* Card Details */}
                            <div className='p-6 flex flex-col gap-3 flex-1 justify-between'>
                                <div>
                                    <div className='flex items-center justify-between gap-2 mb-1'>
                                        <span className='px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium'>
                                            {item.speciality}
                                        </span>
                                        <div className='flex items-center gap-1 text-xs text-amber-500 font-semibold'>
                                            <Star className='w-3.5 h-3.5 fill-amber-400 text-amber-400' />
                                            <span>4.9</span>
                                        </div>
                                    </div>

                                    <h3 className='text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200'>
                                        {item.name}
                                    </h3>

                                    <p className='text-xs text-slate-500 font-normal mt-0.5'>
                                        {item.degree} • {item.experience || '4+ Years Experience'}
                                    </p>
                                </div>

                                <div className='pt-3 border-t border-slate-100 flex items-center justify-between'>
                                    <div className='text-slate-900 font-bold text-base'>
                                        {currencySymbol}{item.fees} <span className='text-xs text-slate-400 font-normal'>/ Visit</span>
                                    </div>
                                    
                                    <button className='p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300'>
                                        <Calendar className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <button 
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                    className='inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-sm shadow-sm hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-300 mt-8 cursor-pointer'
                >
                    <span>Browse All Specialists</span>
                    <ArrowRight className='w-4 h-4' />
                </button>
            </div>
        </section>
    )
}

export default TopDoctors