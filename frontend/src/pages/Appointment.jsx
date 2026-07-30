import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slottime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div className='page-wrapper py-6'>

      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-6 animate-fadeInUp'>
        {/* Doctor Image */}
        <div className='sm:w-72 flex-shrink-0'>
          <div className='rounded-2xl overflow-hidden border border-slate-700/50' style={{ background: 'linear-gradient(135deg, #065f46, #0f766e)' }}>
            <img className='w-full' src={docInfo.image} alt={docInfo.name} />
          </div>
        </div>

        {/* Doctor Info */}
        <div className='flex-1 glass-card-static p-6 sm:p-8'>
          {/* Name & Verified */}
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl sm:text-3xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
              {docInfo.name}
            </h1>
            <img className='w-5' src={assets.verified_icon} alt="Verified" />
          </div>

          {/* Degree & Experience */}
          <div className='flex items-center gap-3 mt-2 flex-wrap'>
            <span className='text-slate-300 text-sm'>{docInfo.degree} — {docInfo.speciality}</span>
            <span className='py-1 px-3 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'>
              {docInfo.experience}
            </span>
          </div>

          {/* About */}
          <div className='mt-5'>
            <p className='flex items-center gap-2 text-sm font-semibold text-white'>
              About <img className='w-3.5 opacity-60' src={assets.info_icon} alt="" style={{ filter: 'invert(0.7)' }} />
            </p>
            <p className='text-sm text-slate-400 max-w-[700px] mt-2 leading-relaxed'>{docInfo.about}</p>
          </div>

          {/* Fee */}
          <div className='mt-5 flex items-center gap-2'>
            <span className='text-slate-400 text-sm'>Appointment fee:</span>
            <span className='text-emerald-400 font-bold text-lg'>{currencySymbol}{docInfo.fees}</span>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-[312px] mt-8 animate-fadeInUp stagger-2'>
        <h3 className='text-lg font-semibold text-white mb-4' style={{ fontFamily: 'Inter, sans-serif' }}>
          Booking <span className='gradient-text'>Slots</span>
        </h3>

        {/* Day Selector */}
        <div className='flex gap-3 items-center w-full overflow-x-auto scrollbar-hide pb-2'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-5 min-w-16 rounded-2xl cursor-pointer transition-all duration-300 flex-shrink-0 ${slotIndex === index
                ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                : 'glass-card-static text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              key={index}
            >
              <p className='text-xs font-medium'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className='text-lg font-bold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className='flex items-center gap-3 w-full overflow-x-auto scrollbar-hide mt-5 pb-2'>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm flex-shrink-0 px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${item.time === slottime
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20'
                : 'glass-card-static text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        {/* Book Button */}
        <button className='gradient-btn mt-8 px-16 py-3.5 text-base font-semibold animate-pulseGlow'>
          Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className='section-divider mt-16'></div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment