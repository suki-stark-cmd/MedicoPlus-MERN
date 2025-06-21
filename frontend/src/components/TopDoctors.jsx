import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaUserMd, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10 animate-fadeIn'>
            <h1 className='text-3xl font-extrabold text-blue-900 drop-shadow'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-600'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-500 bg-white animate-fadeIn group' key={index}>
                        <img className='bg-[#EAEFFF] w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                {item.available ? <FaCheckCircle /> : <FaTimesCircle />}<p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-[#262626] text-lg font-bold flex items-center gap-2'><FaUserMd />{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 px-12 py-3 rounded-full mt-10 shadow hover:scale-105 transition-transform font-semibold flex items-center gap-2 focus:scale-95 active:scale-95'>more <FaUserMd /></button>
        </div>
    )
}

export default TopDoctors