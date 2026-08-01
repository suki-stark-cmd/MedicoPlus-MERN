import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { CheckCircle2, ShieldCheck, Award, Info, Calendar, Clock, Star, ArrowRight } from 'lucide-react'
import RelatedDoctors from '../components/RelatedDoctors'

const BookAppointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slottime, setSlotTime] = useState('')
    const [isBooked, setIsBooked] = useState(false)

    const fetchDocInfo = async () => {
        if (doctors && doctors.length > 0) {
            const info = doctors.find(doc => doc._id === docId)
            setDocInfo(info)
        }
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
        if (docInfo) {
            getAvailableSlots()
        }
    }, [docInfo])

    const handleBookAppointment = () => {
        if (!slottime) {
            alert('Please select a preferred time slot before booking.')
            return
        }
        setIsBooked(true)
        setTimeout(() => {
            navigate('/my-appointments')
        }, 1500)
    }

    return docInfo && (
        <div className='py-6 px-4 sm:px-[4%] max-w-7xl mx-auto space-y-12'>
            
            {/* Top Doctor Profile Summary Card */}
            <div className='bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-500/5 overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-stretch'>
                
                {/* Doctor Avatar Container */}
                <div className='relative md:w-80 flex-shrink-0 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-700 rounded-2xl overflow-hidden p-4 flex items-end justify-center'>
                    <div className='absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30'>
                        <ShieldCheck className='w-3.5 h-3.5 text-cyan-300' />
                        <span>Verified</span>
                    </div>

                    <img 
                        className='w-full h-72 md:h-80 object-cover object-top drop-shadow-xl rounded-xl transition-transform duration-500 hover:scale-105' 
                        src={docInfo.image} 
                        alt={docInfo.name} 
                    />
                </div>

                {/* Doctor Details Info */}
                <div className='flex-1 flex flex-col justify-between gap-6'>
                    <div>
                        <div className='flex items-center gap-3'>
                            <h1 className='text-3xl font-extrabold text-slate-900'>{docInfo.name}</h1>
                            <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
                        </div>

                        <div className='flex flex-wrap items-center gap-3 text-sm mt-2'>
                            <span className='px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold border border-blue-100'>
                                {docInfo.degree} - {docInfo.speciality}
                            </span>
                            <span className='px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-medium text-xs border border-amber-100 flex items-center gap-1'>
                                <Award className='w-3.5 h-3.5 text-amber-600' />
                                <span>{docInfo.experience || '5+ Years Experience'}</span>
                            </span>
                        </div>

                        {/* About Section */}
                        <div className='mt-6 bg-slate-50/80 p-4 rounded-2xl border border-slate-100'>
                            <div className='flex items-center gap-2 text-sm font-bold text-slate-900 mb-1'>
                                <Info className='w-4 h-4 text-blue-600' />
                                <span>About Doctor</span>
                            </div>
                            <p className='text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl'>
                                {docInfo.about || 'Dedicated medical professional committed to providing top-tier healthcare services, accurate diagnostics, and compassionate patient support.'}
                            </p>
                        </div>
                    </div>

                    {/* Fees Stat */}
                    <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
                        <div>
                            <span className='text-xs text-slate-400 font-medium block'>Consultation Fee</span>
                            <span className='text-2xl font-extrabold text-slate-900'>
                                {currencySymbol}{docInfo.fees}
                            </span>
                        </div>

                        <div className='flex items-center gap-1 text-amber-500 text-sm font-bold bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100'>
                            <Star className='w-4 h-4 fill-amber-400 text-amber-400' />
                            <span>4.9 (120+ Reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Slot Picker Section */}
            <div className='bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 p-6 sm:p-8 space-y-6'>
                <div>
                    <h2 className='text-xl font-bold text-slate-900 flex items-center gap-2'>
                        <Calendar className='w-5 h-5 text-blue-600' />
                        <span>Select Date & Available Time Slot</span>
                    </h2>
                    <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
                        Pick a date and choose an available consultation slot below.
                    </p>
                </div>

                {/* Days Horizontal Carousel */}
                <div className='flex gap-3 items-center w-full overflow-x-auto pb-2 scrollbar-hide'>
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSlotIndex(index)} 
                            className={`flex flex-col items-center justify-center py-4 min-w-20 rounded-2xl cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-gradient-to-b from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
                        >
                            <span className='text-xs font-semibold uppercase tracking-wider opacity-80'>
                                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                            </span>
                            <span className='text-xl font-extrabold mt-0.5'>
                                {item[0] && item[0].datetime.getDate()}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Time Slots Chips */}
                <div className='pt-2'>
                    <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5'>
                        <Clock className='w-3.5 h-3.5 text-blue-500' />
                        <span>Available Hours</span>
                    </p>

                    <div className='flex items-center gap-3 flex-wrap'>
                        {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
                            <button 
                                key={index}
                                onClick={() => setSlotTime(item.time)} 
                                className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${item.time === slottime ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                            >
                                {item.time.toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Book Action Button */}
                <div className='pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <div className='text-xs text-slate-500'>
                        {slottime ? (
                            <span className='text-slate-800 font-medium'>Selected Slot: <strong className='text-blue-600'>{slottime}</strong></span>
                        ) : (
                            <span>Please click a time slot to proceed</span>
                        )}
                    </div>

                    <button 
                        onClick={handleBookAppointment}
                        disabled={isBooked}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-3.5 font-bold text-sm text-white rounded-full shadow-lg transition-all duration-300 cursor-pointer ${isBooked ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/25 hover:shadow-xl hover:scale-105 active:scale-95'}`}
                    >
                        {isBooked ? (
                            <>
                                <CheckCircle2 className='w-4 h-4 animate-bounce' />
                                <span>Appointment Confirmed! Redirecting...</span>
                            </>
                        ) : (
                            <>
                                <Calendar className='w-4 h-4' />
                                <span>Confirm & Book Appointment</span>
                                <ArrowRight className='w-4 h-4' />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Related Doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

        </div>
    )
}

export default BookAppointment
