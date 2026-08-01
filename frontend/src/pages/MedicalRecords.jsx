import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { Calendar, Clock, User, Stethoscope, FileText, Download, Search } from 'lucide-react'

const MedicalRecords = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/user/medical-records`, {
                    headers: { token }
                })
                if (response.data.success) {
                    setRecords(response.data.records)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecords()
    }, [backendUrl, token])

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-12 px-4 sm:px-[6%] max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                    Medical Records
                </h1>
                <p className="text-slate-500 text-sm">
                    Timeline of your medical history, appointments, and prescriptions.
                </p>
            </div>

            {records.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No medical records yet</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Your medical records from completed appointments will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {records.map((record, index) => (
                        <div key={record._id || index} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Steth className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 gap-4 flex-wrap">
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                <span>{record.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                <span>{record.slotTime}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                record.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                                                record.status === 'cancelled' ? 'bg-rose-50 text-rose-600' :
                                                'bg-amber-50 text-amber-600'
                                            }`}>
                                                {record.status}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-slate-900">{record.doctorName}</h3>
                                        <p className="text-sm text-slate-500">{record.speciality} • Consultation</p>

                                        {record.prescription && (
                                            <div className="mt-3 p-4 bg-slate-50 rounded-xl">
                                                <p className="text-xs font-semibold text-slate-500 mb-2">Prescription</p>
                                                <p className="text-sm text-slate-700 whitespace-pre-line">{record.prescription}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                                    <Download className="w-3 h-3" />
                                    Export
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MedicalRecords
