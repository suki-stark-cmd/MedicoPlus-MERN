import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { MapPin, Phone, Mail, Clock, Send, Briefcase, CheckCircle2 } from 'lucide-react'

const Contact = () => {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setForm({ name: '', email: '', message: '' })
        }, 2500)
    }

    return (
        <div className='py-8 px-4 sm:px-[4%] max-w-7xl mx-auto space-y-16'>
            
            {/* Header */}
            <div className='text-center space-y-2'>
                <h1 className='text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight'>
                    Contact <span className='gradient-text'>Us</span>
                </h1>
                <p className='text-slate-500 text-sm sm:text-base max-w-xl mx-auto'>
                    Have questions or feedback? Our dedicated patient support team is here to assist you 24/7.
                </p>
            </div>

            {/* Contact Layout */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                
                {/* Left Office Info Card */}
                <div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-blue-500/5 space-y-8'>
                    <div className='relative rounded-2xl overflow-hidden shadow-md max-h-64'>
                        <img className='w-full h-64 object-cover' src={assets.contact_banner || assets.contact_image} alt="Contact Clinic Desk" />
                    </div>

                    <div className='space-y-6 text-sm text-slate-600'>
                        <h3 className='text-xl font-bold text-slate-900'>Headquarters & Clinic Office</h3>

                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-xl bg-blue-50 text-blue-600 mt-0.5'>
                                    <MapPin className='w-4 h-4' />
                                </div>
                                <div>
                                    <span className='font-bold text-slate-800 block'>Address</span>
                                    <span>54709 Willms Station, Suite 350, Washington, USA</span>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-xl bg-blue-50 text-blue-600 mt-0.5'>
                                    <Phone className='w-4 h-4' />
                                </div>
                                <div>
                                    <span className='font-bold text-slate-800 block'>Phone Number</span>
                                    <span>(415) 555-0132 / Toll Free: 1-800-MEDICO</span>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-xl bg-blue-50 text-blue-600 mt-0.5'>
                                    <Mail className='w-4 h-4' />
                                </div>
                                <div>
                                    <span className='font-bold text-slate-800 block'>Email Support</span>
                                    <span className='text-blue-600'>support@medicoplus.com</span>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-xl bg-blue-50 text-blue-600 mt-0.5'>
                                    <Clock className='w-4 h-4' />
                                </div>
                                <div>
                                    <span className='font-bold text-slate-800 block'>Working Hours</span>
                                    <span>Mon - Sat: 8:00 AM - 9:00 PM (EST)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Interactive Contact Form */}
                <div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-blue-500/5 space-y-6'>
                    <div className='space-y-1'>
                        <h3 className='text-2xl font-extrabold text-slate-900'>Send Us a Message</h3>
                        <p className='text-slate-500 text-xs sm:text-sm'>
                            Fill out the form below and our medical coordinator will respond within 2 hours.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-4 text-left'>
                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-700 block'>Your Full Name</label>
                            <input 
                                type="text"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                                className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400'
                            />
                        </div>

                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-700 block'>Your Email Address</label>
                            <input 
                                type="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                                className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400'
                            />
                        </div>

                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-700 block'>How can we help you?</label>
                            <textarea 
                                rows="4"
                                placeholder="Write your inquiry or question here..."
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                required
                                className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 resize-none'
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={submitted}
                            className={`w-full py-3.5 font-bold text-sm text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${submitted ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/25 hover:shadow-xl hover:scale-102 active:scale-98'}`}
                        >
                            {submitted ? (
                                <>
                                    <CheckCircle2 className='w-4 h-4' />
                                    <span>Message Sent Successfully!</span>
                                </>
                            ) : (
                                <>
                                    <Send className='w-4 h-4' />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Careers Banner */}
                    <div className='pt-6 border-t border-slate-100 flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-2.5 text-xs text-slate-600 font-medium'>
                            <Briefcase className='w-4 h-4 text-blue-600' />
                            <span>Careers at MedicoPlus</span>
                        </div>
                        <button className='px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all cursor-pointer'>
                            Explore Openings
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact