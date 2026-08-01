import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { FileText, Download, Calendar, User } from 'lucide-react'

const Prescriptions = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [prescriptions, setPrescriptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/user/prescriptions`, {
                    headers: { token }
                })
                if (response.data.success) {
                    setPrescriptions(response.data.prescriptions)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPrescriptions()
    }, [backendUrl, token])

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-24 bg-slate-200 rounded"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-12 px-4 sm:px-[6%] max-w-5xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Prescriptions</h1>
                    <p className="text-slate-500 text-sm">
                        View and manage your prescriptions from past appointments.
                    </p>
                </div>
            </div>

            {prescriptions.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No prescriptions yet</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Prescriptions from completed appointments with medication orders will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {prescriptions.map((rx, index) => (
                        <div key={rx._id || index} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Prescription #{index + 1}</h3>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{rx.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                <span>Dr. {rx.doctorName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                                    <Download className="w-3 h-3" />
                                    Download
                                </button>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl mb-4">
                                <p className="text-sm text-slate-700 whitespace-pre-line">{rx.prescription || 'No prescription details available.'}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                <div>
                                    <span className="font-medium text-slate-700">Dosage:</span> {rx.dosage || 'As prescribed'}
                                </div>
                                <div>
                                    <span className="font-medium text-slate-700">Refills:</span> {rx.refills || 0}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Prescriptions
