import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

const SpecialityMenu = () => {
    return (
        <section className='py-20 px-4 sm:px-[6%]' id='speciality'>
            <div className='max-w-7xl mx-auto flex flex-col items-center text-center gap-4'>
                {/* Header Badge */}
                <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider'>
                    <Sparkles className='w-3.5 h-3.5 text-blue-500' />
                    <span>Specialties</span>
                </div>

                {/* Section Title */}
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight'>
                    Find Specialist by <span className='gradient-text'>Category</span>
                </h2>

                <p className='sm:w-2/3 md:w-1/2 text-slate-500 text-sm sm:text-base leading-relaxed'>
                    Explore our comprehensive directory of certified medical specialists and schedule your consultation with ease.
                </p>

                {/* Specialty Cards Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-8 w-full'>
                    {specialityData.map((item, index) => (
                        <Link 
                            onClick={() => scrollTo(0, 0)} 
                            key={index} 
                            to={`/doctors/${item.speciality}`}
                            className='group flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden'
                        >
                            {/* Decorative background glow on hover */}
                            <div className='absolute inset-0 bg-gradient-to-b from-blue-50/50 to-indigo-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                            <div className='relative z-10 w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-2xl bg-slate-50 group-hover:bg-blue-500/10 flex items-center justify-center p-3 transition-colors duration-300'>
                                <img 
                                    className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110' 
                                    src={item.image} 
                                    alt={item.speciality} 
                                />
                            </div>

                            <p className='relative z-10 text-slate-800 font-semibold text-sm group-hover:text-blue-600 transition-colors duration-200'>
                                {item.speciality}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SpecialityMenu