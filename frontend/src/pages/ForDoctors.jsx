import React from 'react'
import { Link } from 'react-router-dom'
import { UserCheck, Users, Award, Calendar, TrendingUp, MapPin, FileText, Shield } from 'lucide-react'

const ForDoctors = () => {
    const benefits = [
        {
            icon: <Calendar className="w-6 h-6 text-blue-600" />,
            title: 'Smart Scheduling',
            desc: 'Fill your calendar with preferred slots. Automated scheduling reduces no-shows and streamlines your practice.'
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
            title: 'Growing Patient Base',
            desc: 'Access a network of patients actively seeking care. Grow your practice with zero marketing cost.'
        },
        {
            icon: <FileText className="w-6 h-6 text-cyan-600" />,
            title: 'AI Documentation Assistant',
            desc: 'Generate prescriptions, notes, and follow-up reminders automatically — saving 2+ hours daily.'
        },
        {
            icon: <Shield className="w-6 h-6 text-emerald-600" />,
            title: 'Verified Credibility',
            desc: 'Build trust with verified profiles, patient reviews, and transparent ratings.'
        },
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-hero text-white py-20 px-4 text-center">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
                        For <span className="text-cyan-200">Doctors</span>
                    </h1>
                    <p className="text-slate-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join MedicoPlus and transform how patients discover and book appointments with you. Expand your reach, reduce administrative work, and grow your practice.
                    </p>
                    <Link
                        to="/doctor/login"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        Join MedicoPlus
                    </Link>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 sm:px-[6%] bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                            Benefits for <span className="gradient-text">Medical Professionals</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            MedicoPlus is built by doctors, for doctors — to make practice management effortless.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow text-center">
                                <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 text-center">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Trusted by Top Healthcare Providers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div>
                            <div className="text-4xl font-extrabold gradient-text">500+</div>
                            <p className="text-slate-500 mt-2">Verified Doctors</p>
                        </div>
                        <div>
                            <div className="text-4xl font-extrabold gradient-text">50k+</div>
                            <p className="text-slate-500 mt-2">Active Patients</p>
                        </div>
                        <div>
                            <div className="text-4xl font-extrabold gradient-text">4.9</div>
                            <p className="text-slate-500 mt-2">Average Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to join?</h2>
                <p className="text-slate-500 mb-6">Sign up takes less than 2 minutes.</p>
                <Link
                    to="/doctor/login"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                    Sign Up as Doctor
                </Link>
            </section>
        </div>
    )
}

export default ForDoctors
