import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Shield, Download, Share2, MapPin, Calendar, User, FileText, Phone } from 'lucide-react'
import HealthCardQR from '../components/HealthCardQR'

const HealthCardQRPage = () => {
    const { userData } = useContext(AppContext)

    // Fallback data if user not logged in
    const patient = userData || {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+1 (212) 555-0199',
        dob: '1990-06-15',
        gender: 'Female',
        bloodType: 'O+',
        address: { line1: '742 Evergreen Terrace', line2: 'Springfield, IL 62704' },
        emergencyContact: 'John Doe (Spouse) • +1 (212) 555-0200',
        medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
        allergies: ['Penicillin', 'Peanuts'],
        patientId: 'pat_7x9y3'
    }

    const patientId = userData?._id || patient.patientId || 'unknown'

    const cardData = {
        patientId: patientId,
        name: patient.name || 'N/A',
        bloodType: patient.bloodType || 'N/A',
        dob: patient.dob || 'N/A',
        gender: patient.gender || 'N/A',
        conditions: patient.medicalConditions || [],
        allergies: patient.allergies || []
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4 sm:px-[6%]">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold uppercase tracking-wider">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Digital Health Card</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Your <span className="gradient-text">Personal Health Card</span>
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
                        This is your MedicoPlus Health Card. Tap with an NFC-enabled device or scan the QR code at any 
                        participating healthcare facility to securely share your medical information.
                    </p>
                </div>

                {/* Health Card */}
                <div className="bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center gap-10">
                    {/* QR Code / Patient ID */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                            <HealthCardQR patientId={patientId} size="lg" />
                        </div>
                        <p className="text-xs text-slate-400 text-center font-mono">
                            Patient ID: {patientId}
                        </p>
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Full Name</p>
                                <p className="font-bold text-slate-900 text-lg">{cardData.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Date of Birth</p>
                                <p className="font-semibold text-slate-900">{cardData.dob}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Gender</p>
                                <p className="font-semibold text-slate-900">{cardData.gender}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-600" />
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase">Blood Type</p>
                                    <p className="font-bold text-2xl text-rose-600">{cardData.bloodType}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Medical Conditions</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {cardData.conditions.length > 0 ? (
                                        cardData.conditions.map((c, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">{c}</span>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 text-xs">None recorded</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Allergies</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {cardData.allergies.length > 0 ? (
                                        cardData.allergies.map((a, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs rounded-full">{a}</span>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 text-xs">No known allergies</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Emergency Contact</p>
                                <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                    {patient.emergencyContact || 'Not set'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase">Last Updated</p>
                                <p className="font-semibold text-slate-900 text-sm">
                                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300"
                    >
                        <Download className="w-4 h-4 text-blue-600" />
                        Download Card (PDF)
                    </button>
                    <button
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300"
                    >
                        <Share2 className="w-4 h-4 text-blue-600" />
                        Share Card
                    </button>
                </div>

                {/* Security Note */}
                <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 text-center">
                    <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span>
                            This health card is encrypted and HIPAA-compliant. Only essential medical info is shared via NFC or QR.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HealthCardQRPage
