import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Heart, Shield, Send, Activity } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='mt-24 border-t border-slate-200 bg-slate-900 text-slate-300 rounded-t-3xl pt-16 pb-8 px-6 sm:px-[8%]'>
            <div className='max-w-7xl mx-auto flex flex-col gap-12'>
                {/* Main Grid */}
                <div className='grid grid-cols-1 md:grid-cols-5 gap-10 text-sm'>
                    
                    {/* Brand Info */}
                    <div className='md:col-span-1.5 flex flex-col gap-4'>
                        <div className='flex items-center gap-2.5 cursor-pointer'>
                            <div className='w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25'>
                                <Activity className='w-5 h-5 text-white animate-pulse' />
                            </div>
                            <span className='text-2xl font-black tracking-tight text-white'>
                                Medico<span className='gradient-text'>Plus</span>
                            </span>
                        </div>

                        <p className='text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm'>
                            MedicoPlus is your trusted digital healthcare companion. Book certified doctor appointments online, access medical profiles, and manage your health seamlessly.
                        </p>

                        <div className='flex items-center gap-2 text-xs text-blue-400 font-medium pt-2'>
                            <Shield className='w-4 h-4 text-blue-400' />
                            <span>HIPAA Compliant & Secure Platform</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='flex flex-col gap-4'>
                        <h4 className='text-white font-bold text-base tracking-wide'>Quick Links</h4>
                        <ul className='flex flex-col gap-2.5 text-slate-400 text-xs sm:text-sm'>
                            <li><Link to='/' className='hover:text-blue-400 transition-colors'>Home</Link></li>
                            <li><Link to='/doctors' className='hover:text-blue-400 transition-colors'>All Doctors</Link></li>
                            <li><Link to='/how-it-works' className='hover:text-blue-400 transition-colors'>How It Works</Link></li>
                            <li><Link to='/health-card' className='hover:text-blue-400 transition-colors'>Health Card</Link></li>
                            <li><Link to='/pricing' className='hover:text-blue-400 transition-colors'>Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className='flex flex-col gap-4'>
                        <h4 className='text-white font-bold text-base tracking-wide'>Company</h4>
                        <ul className='flex flex-col gap-2.5 text-slate-400 text-xs sm:text-sm'>
                            <li><Link to='/about' className='hover:text-blue-400 transition-colors'>About Us</Link></li>
                            <li><Link to='/blog' className='hover:text-blue-400 transition-colors'>Blog</Link></li>
                            <li><Link to='/for-doctors' className='hover:text-blue-400 transition-colors'>For Doctors</Link></li>
                            <li><Link to='/for-pharmacies' className='hover:text-blue-400 transition-colors'>For Pharmacies</Link></li>
                            <li><Link to='/careers' className='hover:text-blue-400 transition-colors'>Careers</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className='flex flex-col gap-4'>
                        <h4 className='text-white font-bold text-base tracking-wide'>Support</h4>
                        <ul className='flex flex-col gap-2.5 text-slate-400 text-xs sm:text-sm'>
                            <li><Link to='/contact' className='hover:text-blue-400 transition-colors'>Contact Us</Link></li>
                            <li><Link to='/faq' className='hover:text-blue-400 transition-colors'>FAQ</Link></li>
                            <li><Link to='/help' className='hover:text-blue-400 transition-colors'>Help Center</Link></li>
                            <li><Link to='/terms' className='hover:text-blue-400 transition-colors'>Terms of Service</Link></li>
                            <li><Link to='/privacy' className='hover:text-blue-400 transition-colors'>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className='flex flex-col gap-4'>
                        <h4 className='text-white font-bold text-base tracking-wide'>Contact</h4>
                        <ul className='flex flex-col gap-3 text-slate-400 text-xs sm:text-sm'>
                            <li className='flex items-center gap-2.5'>
                                <Phone className='w-4 h-4 text-blue-400 flex-shrink-0' />
                                <span>+1 (212) 456-7890</span>
                            </li>
                            <li className='flex items-center gap-2.5'>
                                <Mail className='w-4 h-4 text-blue-400 flex-shrink-0' />
                                <span>support@medicoplus.com</span>
                            </li>
                            <li className='flex items-center gap-2.5'>
                                <MapPin className='w-4 h-4 text-blue-400 flex-shrink-0' />
                                <span>742 Evergreen Terrace, Medical District, NY</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription  */}
                    <div className='md:col-span-1 flex flex-col gap-4'>
                        <h4 className='text-white font-bold text-base tracking-wide'>Stay Updated</h4>
                        <p className='text-slate-400 text-xs leading-relaxed'>
                            Subscribe to receive healthcare tips and updates on new specialist arrivals.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-2'>
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className='bg-slate-800 border border-slate-700 text-xs text-white px-3 py-2 rounded-full focus:outline-none placeholder:text-slate-500'
                            />
                            <button className='flex items-center justify-center gap-1 p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer'>
                                <Send className='w-3.5 h-3.5' />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright Line */}
                <div className='border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500'>
                    <p>© {new Date().getFullYear()} MedicoPlus Inc. All rights reserved.</p>
                    <div className='flex items-center gap-1 text-slate-400'>
                        <span>Crafted with</span>
                        <Heart className='w-3.5 h-3.5 text-rose-500 fill-rose-500' />
                        <span>for healthcare excellence</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer