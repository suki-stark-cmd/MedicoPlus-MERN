import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, MapPin, CheckCircle, Activity, Award, Star } from 'lucide-react'

const HowItWorks = () => {
    const steps = [
        {
            step: '01',
            title: 'Find Your Doctor',
            description: 'Search from our verified network of 500+ specialists across 20+ specialities. Filter by location, specialty, ratings, and availability.',
            icon: <BookOpen className="w-6 h-6 text-white" />,
        },
        {
            step: '02',
            title: 'Book Your Appointment',
            description: 'Select your preferred date and time slot. Confirm your appointment instantly online — no phone calls needed. Works 24/7.',
            icon: <Clock className="w-6 h-6 text-white" />,
        },
        {
            step: '03',
            title: 'Health Record Travels With You',
            description: 'Your complete medical history, prescriptions, and test results are stored digitally on your MedicoPlus Health Card — accessible anytime, anywhere.',
            icon: <MapPin className="w-6 h-6 text-white" />,
        },
    ]

    const benefits = [
        {
            icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
            title: 'HIPAA Compliant',
            desc: 'Your health data is encrypted and protected with bank-level security.'
        },
        {
            icon: <Activity className="w-6 h-6 text-indigo-500" />,
            title: 'Verified Doctors',
            desc: 'Every doctor is vetted for credentials, license, and professional standing.'
        },
        {
            icon: <Award className="w-6 h-6 text-amber-500" />,
            title: 'No Substitution Policy',
            desc: 'You always get the exact doctor you booked — never a substitution.'
        },
        {
            icon: <Star className="w-6 h-6 text-rose-500" />,
            title: 'Multi-Language Support',
            desc: 'Communicate in your preferred language with doctors who speak yours.'
        },
    ]

    return (
        <div>
            {/* SEO Meta handled by Helmet or document head if configured */}

            {/* Hero Section */}
            <section className="text-center py-16 px-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
                    How <span className="gradient-text">MedicoPlus</span> Works
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Booking a doctor's appointment should be simple, transparent, and fast. Here's how it works in just 3 easy steps.
                </p>
            </section>

            {/* Process Steps */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.step} className={`flex items-start md:items-center gap-6 md:gap-8 mb-12 last:mb-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Step Number / Icon Circle */}
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {step.step}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">{step.description}</p>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute left-0 w-px h-24 bg-slate-200"></div>
                                )}
                            </div>

                            {/* Icon for visual */}
                            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-56 h-40 rounded-2xl bg-slate-50 border border-slate-100">
                                {step.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-16 px-4 sm:px-[6%] bg-slate-50 rounded-3xl">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                        Why Choose <span className="gradient-text">MedicoPlus</span>
                    </h2>
                    <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
                        We've built healthcare booking to be simple, secure, and patient-first.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow">
                                <div className="flex justify-center mb-4">{item.icon}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16">
                <Link
                    to="/doctors"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    Find Your Doctor Now
                </Link>
            </section>
        </div>
    )
}

// Import ShieldCheck at the top - placed here for readability
import { ShieldCheck } from 'lucide-react'

export default HowItWorks
