import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className='flex flex-col items-center gap-6 my-20 md:mx-10'>
      <div className='text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
          Top Doctors to <span className='gradient-text'>Book</span>
        </h2>
        <p className='sm:w-1/3 mx-auto text-center text-sm text-slate-400 mt-3'>
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className='w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full'></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-5 px-3 sm:px-0 w-full">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className={`glass-card overflow-hidden cursor-pointer group ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards', opacity: isVisible ? undefined : 0 }}
            key={index}
          >
            <div className='relative overflow-hidden'>
              <img className='w-full bg-slate-800/50 group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm'>
                <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulseDot'></span>
                <span className='text-emerald-400 text-xs'>Available</span>
              </div>
              <p className='text-white text-base font-semibold mt-1 group-hover:text-emerald-300 transition-colors duration-300'>{item.name}</p>
              <p className='text-slate-400 text-xs mt-0.5'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='gradient-btn-outline mt-8 flex items-center gap-2'>
        View All Doctors
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' /></svg>
      </button>
    </div>
  )
}

export default TopDoctors