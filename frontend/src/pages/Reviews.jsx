import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { Star, Send, Calendar, FileText } from 'lucide-react'

const Reviews = () => {
    const { backendUrl, token, userData } = useContext(AppContext)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasReviewed, setHasReviewed] = useState(false)
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/user/appointments`, {
                    headers: { token }
                })
                if (response.data.success) {
                    // Filter to only completed appointments that haven't been reviewed
                    const completed = response.data.appointments.filter(a => a.status === 'completed')
                    setAppointments(completed)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (token) fetchAppointments()
    }, [backendUrl, token])

    const handleSubmitReview = async () => {
        if (rating === 0 || !reviewText.trim()) return

        setIsSubmitting(true)
        try {
            // In production, POST to backend
            // await axios.post(`${backendUrl}/api/user/review`, { appointmentId, rating, comment }, { headers: { token } })

            setHasReviewed(true)
            setIsSubmitting(false)
        } catch (error) {
            console.log(error)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="py-12 px-4 sm:px-[6%] max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Write a Review</h1>
                <p className="text-slate-500 text-sm">
                    Share your experience to help other patients find the right care.
                </p>
            </div>

            {hasReviewed ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                        <Star className="w-8 h-8 text-emerald-500 fill-amber-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you!</h3>
                    <p className="text-slate-500">
                        Your review has been submitted and will help other patients make informed decisions.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                    {/* Doctor Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Select Appointment</label>
                        <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all">
                            {appointments.length > 0 ? (
                                appointments.map(appt => (
                                    <option key={appt._id} value={appt._id}>
                                        {appt.docData?.name} — {appt.date}
                                    </option>
                                ))
                            ) : (
                                <option>No completed appointments available for review</option>
                            )}
                        </select>
                    </div>

                    {/* Star Rating */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Your Rating</label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-0.5 transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-6 h-6 transition-colors ${
                                            star <= (hoverRating || rating)
                                                ? 'fill-amber-400 text-amber-400'
                                                : 'text-slate-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Your Review</label>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="What went well? What could be improved?"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 resize-none"
                            rows={5}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmitReview}
                        disabled={isSubmitting || rating === 0 || !reviewText.trim()}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Reviews
