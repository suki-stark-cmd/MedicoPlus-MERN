import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors } from '../assets/assets'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialities = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']

  return (
    <div className='page-wrapper py-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
          Browse <span className='gradient-text'>Doctors</span>
        </h1>
        <p className='text-slate-400 mt-2 text-sm'>Browse through the doctors specialist.</p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-6'>
        {/* Filter Toggle (Mobile) */}
        <button
          className={`py-2.5 px-5 rounded-lg text-sm transition-all sm:hidden flex items-center gap-2 ${showFilter ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'glass-card-static text-slate-300 border border-slate-700'}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' /></svg>
          Filters
        </button>

        {/* Sidebar Filters */}
        <div className={`flex flex-col gap-3 text-sm min-w-[180px] ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`pl-4 py-2.5 pr-6 rounded-xl cursor-pointer transition-all duration-300 ${speciality === spec
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                : 'glass-card-static text-slate-300 hover:text-emerald-400 hover:border-emerald-500/20'
                }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Grid */}
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
              className='glass-card overflow-hidden cursor-pointer group animate-fadeInUp'
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
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
      </div>
    </div>
  )
}

export default Doctors