import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { CalendarCheck, ShieldCheck, Clock, Award } from 'lucide-react'

const Home = () => {
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
            <TopDoctors />
            <Banner />
        </div>
    )
}

export default Home