import React from 'react'
import { Star, Calendar } from 'lucide-react'

const DoctorCard = ({ doctor, onClick, currencySymbol, showBookButton = false }) => {
    return (
        <div
            onClick={onClick}
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
        >
            {/* Image Container with Overlay Gradient */}
            <div className="relative bg-gradient-to-b from-blue-50/80 to-slate-100 overflow-hidden pt-4 px-4">
                {/* Availability Pill */}
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-emerald-100 text-emerald-600 text-xs font-medium">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span>{doctor.available ? 'Available' : 'Unavailable'}</span>
                </div>

                <img
                    className="w-full h-52 sm:h-56 object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    src={doctor.image}
                    alt={doctor.name}
                />
            </div>

            {/* Card Details */}
            <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1 justify-between">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium">
                            {doctor.speciality}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{doctor.ratings?.average || 4.9}</span>
                        </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                        {doctor.name}
                    </h3>

                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                        {doctor.degree} • {doctor.experience || '4+ Years Experience'}
                    </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-slate-900 font-bold text-base">
                        {currencySymbol}{doctor.fees} <span className="text-xs text-slate-400 font-normal">/ Visit</span>
                    </div>

                    {showBookButton && (
                        <button className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <Calendar className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DoctorCard
