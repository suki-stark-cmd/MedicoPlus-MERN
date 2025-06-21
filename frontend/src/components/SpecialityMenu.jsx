import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaStethoscope } from 'react-icons/fa'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626] animate-fadeIn w-full'>
            <h1 className='text-3xl font-extrabold text-blue-900 drop-shadow'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-600'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='grid grid-cols-2 sm:flex sm:justify-center gap-6 pt-5 w-full max-w-7xl mx-auto px-2 sm:px-6'>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 bg-white rounded-2xl p-5 animate-fadeIn group min-w-[140px] sm:min-w-[180px] shadow transition-all duration-300 hover:bg-blue-100 hover:shadow-xl hover:scale-105'
                        key={index}>
                        <img className='w-20 sm:w-28 mb-3 group-hover:scale-110 transition-transform duration-300' src={item.image} alt="" />
                        <p className='font-semibold flex items-center gap-1 text-blue-700'><FaStethoscope />{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu