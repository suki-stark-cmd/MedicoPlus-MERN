import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import TestimonialSection from '../components/TestimonialSection'
import { CalendarCheck, ShieldCheck, Clock, Award, Smartphone, Share2, BarChart3, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const features = [
        {
            icon: <CalendarCheck className="w-6 h-6 text-blue-600" />,
            title: "Instant Online Booking",
            desc: "Select your preferred slot and confirm appointments in under 60 seconds."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
            title: "Verified Specialists",
            desc: "Every doctor is thoroughly vetted for credentials, license, and experience."
        },
        {
            icon: <Clock className="w-6 h-6 text-cyan-600" />,
            title: "Flexible Scheduling",
            desc: "Book weekend consultations or evening slots tailored to your busy schedule."
        },
        {
            icon: <Award className="w-6 h-6 text-teal-600" />,
            title: "Top Rated Patient Care",
            desc: "Join thousands of satisfied patients receiving top-tier medical attention."
        }
    ];

    const testimonials = [
        {
            quote: "MedicoPlus made finding a specialist so easy. I booked an appointment with Dr. Patel in under 2 minutes and the NFC card shared at the clinic was seamless!",
            name: "Sarah Chen",
            location: "San Francisco, CA",
            image: "https://images.unsplash.com/photo-1494790106377-3dc133634121?w=100&h=100&fit=crop&crop=face"
        },
        {
            quote: "As someone who travels frequently, the health card QR feature saved me during a medical emergency in a different city. Incredible platform!",
            name: "Marcus Rodriguez",
            location: "Austin, TX",
            image: "https://images.unsplash.com/photo-1507003211169-f513390257e4?w=100&h=100&fit=crop&crop=face"
        },
        {
            quote: "Finally, a healthcare platform that respects privacy and has real verified doctors. The multilingual support is a game-changer for my family.",
            name: "Priya Sharma",
            location: "Seattle, WA",
            image: "https://images.unsplash.com/photo-1438564066986-d7059bc25e2c?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const healthCardFeatures = [
        {
            icon: <Share2 className="w-5 h-5 text-blue-600" />,
            title: "NFC Tap & Share",
            desc: "Tap your phone at any clinic to instantly share your medical profile."
        },
        {
            icon: <Smartphone className="w-5 h-5 text-indigo-600" />,
            title: "QR Code Access",
            desc: "Generate a scannable QR code with your key health information."
        },
        {
            icon: <BarChart3 className="w-5 h-5 text-cyan-600" />,
            title: "Records Travel With You",
            desc: "Your complete health history is always accessible, wherever you go."
        },
        {
            icon: <Zap className="w-5 h-5 text-teal-600" />,
            title: "Emergency Info",
            desc: "Critical data like blood type and allergies available even offline."
        }
    ];

    return (
        <div className="space-y-6">
            <Header />

            {/* Why Choose Us Feature Cards */}
            <section className="py-12 px-4 sm:px-[6%]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-3"
                        >
                            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <SpecialityMenu />

            {/* Health Card Preview Section */}
            <section className="py-16 px-4 sm:px-[6%]">
                <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-cyan-50/20 rounded-3xl p-8 sm:p-12 border border-slate-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Health Record Travels With You</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Digital <span className="gradient-text">Health Card</span>
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md">
                                Your medical profile on your phone. Tap an NFC-enabled reader or scan a QR code to securely 
                                share your health information with any doctor, anywhere.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                {healthCardFeatures.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm">{item.icon}</div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/health-card')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300 mt-2 cursor-pointer"
                            >
                                <Share2 className="w-4 h-4" />
                                <span>Learn About Health Card</span>
                                <Zap className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1576022355795-ff5078a587b5?w=500&h=500&fit=crop&crop=center"
                                alt="Digital health card with QR code"
                                className="w-full max-w-sm rounded-3xl shadow-2xl object-cover object-center border-8 border-white"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1576022355795-ff5078a587b5?w=500&h=500&fit=crop&crop=center' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <TopDoctors />

            {/* Testimonials */}
            <TestimonialSection testimonials={testimonials} />

            <Banner />
        </div>
    )
}

export default Home