import React, { useEffect, useRef, useState } from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
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
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className='flex flex-col items-center gap-6 py-20' id='speciality'>
      <div className='text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
          Find by <span className='gradient-text'>Speciality</span>
        </h2>
        <p className='sm:w-2/3 mx-auto text-center text-sm text-slate-400 mt-3 leading-relaxed'>
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
        <div className='w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full'></div>
      </div>

      <div className='flex sm:justify-center gap-5 pt-5 w-full overflow-x-auto scrollbar-hide px-4'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className={`glass-card flex flex-col items-center text-xs flex-shrink-0 p-5 min-w-[110px] cursor-pointer group ${isVisible ? 'animate-fadeInUp stagger-' + (index + 1) : 'opacity-0'}`}
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-all duration-300'>
              <img className='w-10 sm:w-14' src={item.image} alt={item.speciality} />
            </div>
            <p className='text-slate-300 group-hover:text-emerald-400 transition-colors duration-300 text-center text-xs sm:text-sm'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu