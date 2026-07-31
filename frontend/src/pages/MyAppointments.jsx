import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Calendar, Clock, MapPin, CreditCard, XCircle, CheckCircle } from 'lucide-react'

const MyAppointments = () => {
    const { doctors } = useContext(AppContext)

    return (
        <div className='max-w-5xl mx-auto py-8 px-4 space-y-6'>
            <div>
                <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
                    My <span className='gradient-text'>Appointments</span>
                </h1>
                <p className='text-slate-500 text-sm mt-1'>
                    Track and manage your upcoming consultations and payments.
                </p>
            </div>

            <div className='space-y-4'>
                {doctors.slice(0, 3).map((item, index) => (
                    <div 
                        key={index}
                        className='bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6'
                    >
                        {/* Doctor Info */}
                        <div className='flex items-center gap-4 w-full sm:w-auto'>
                            <div className='w-24 h-24 rounded-2xl bg-gradient-to-b from-blue-50 to-slate-100 p-2 flex-shrink-0 border border-slate-100'>
                                <img className='w-full h-full object-cover object-top rounded-xl' src={item.image} alt={item.name} />
                            </div>

                            <div className='space-y-1 text-left'>
                                <h3 className='text-lg font-bold text-slate-900'>{item.name}</h3>
                                <span className='inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold'>
                                    {item.speciality}
                                </span>

                                <div className='flex items-start gap-1 text-xs text-slate-500 pt-1'>
                                    <MapPin className='w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0' />
                                    <span>{item.address.line1}, {item.address.line2}</span>
                                </div>
                            </div>
                        </div>

                        {/* Date & Time Slot Details */}
                        <div className='flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3'>
                            <div className='p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left sm:text-right space-y-1'>
                                <div className='flex items-center gap-1.5 text-xs text-slate-500 font-medium'>
                                    <Calendar className='w-3.5 h-3.5 text-blue-600' />
                                    <span>25 May 2025</span>
                                    <Clock className='w-3.5 h-3.5 text-blue-600 ml-2' />
                                    <span>05:30 PM</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex items-center gap-2'>
                                <button className='inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer'>
                                    <CreditCard className='w-3.5 h-3.5' />
                                    <span>Pay Online</span>
                                </button>
                                <button className='inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition-all cursor-pointer'>
                                    <XCircle className='w-3.5 h-3.5' />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments