import React from 'react'
import { Quote } from 'lucide-react'

const TestimonialSection = ({ testimonials }) => {
    return (
        <section className="py-16 px-4 sm:px-[6%] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 rounded-3xl">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold">
                        Patient Stories
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                        What Our <span className="gradient-text">Patients Say</span>
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
                        Real experiences from real patients who used MedicoPlus for their healthcare needs.
                    </p>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <Quote className="w-6 h-6 text-blue-600 shrink-0" />
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    "{t.quote}"
                                </p>
                            </div>
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                                    <p className="text-xs text-slate-500">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialSection
