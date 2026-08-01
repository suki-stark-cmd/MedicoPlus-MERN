import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { Star, Calendar, MapPin, Globe } from 'lucide-react'

const DoctorProfile = () => {
    const navigate = useNavigate()
    const { id: docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, requireAuth } = useContext(AppContext)
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/user/doctor/${docId}`)
                if (response.data.success) {
                    setDoctor(response.data.doctor)
                }
            } catch (error) {
                // Fallback: find in local doctors list
                const localDoc = doctors?.find(d => d._id === docId)
                if (localDoc) setDoctor(localDoc)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchDoctor()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docId, doctors])

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!doctor) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-slate-500">Doctor not found</p>
            </div>
        )
    }

    const handleBookAppointment = () => {
        if (requireAuth(navigate)) {
            navigate(`/book/${docId}`)
        }
    }

    return (
        <div className="py-8 px-4 sm:px-[6%] max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Doctor Image */}
                    <div className="md:w-1/3 flex-shrink-0">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-64 md:h-80 object-cover object-top rounded-2xl border-4 border-slate-50"
                        />
                    </div>

                    {/* Doctor Info */}
                    <div className="md:w-2/3 space-y-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{doctor.name}</h1>
                            <p className="text-lg text-slate-600 mt-1">{doctor.speciality}</p>
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-amber-500 font-semibold">
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <span>{doctor.ratings?.average || 4.9} / 5.0</span>
                            </div>
                            <span className="text-sm text-slate-500">({doctor.ratings?.count || 0} reviews)</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <span className="text-xs text-slate-500">Experience</span>
                                <p className="font-semibold text-slate-900">{doctor.experience}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <span className="text-xs text-slate-500">Degree</span>
                                <p className="font-semibold text-slate-900">{doctor.degree}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <span className="text-xs text-slate-500">Consultation Fee</span>
                                <p className="font-semibold text-slate-900">{currencySymbol}{doctor.fees}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <span className="text-xs text-slate-500">Status</span>
                                <p className={`font-semibold ${doctor.available ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {doctor.available ? 'Available' : 'Unavailable'}
                                </p>
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">Languages:</span>
                            {(doctor.languagesSpoken || ['en']).map((lang, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded-full text-xs">{lang}</span>
                            ))}
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                            <div>
                                <span className="text-sm text-slate-600">Practice Location:</span>
                                <p className="text-sm font-medium text-slate-900">{doctor.address?.line1}, {doctor.address?.line2}</p>
                            </div>
                        </div>

                        {/* About */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">About Dr. {doctor.name.split(' ').pop()}</h3>
                            <p className="text-slate-600 leading-relaxed">{doctor.about}</p>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={handleBookAppointment}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm sm:text-base rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <Calendar className="w-5 h-5" />
                            <span>Book Appointment</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
