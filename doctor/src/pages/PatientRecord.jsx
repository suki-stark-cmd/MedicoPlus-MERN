import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
  FileText,
  ArrowLeft
} from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const PatientRecord = () => {
  const { id } = useParams()
  const { dToken, backendUrl } = useContext(DoctorContext)
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchPatientRecord = async () => {
    if (!id) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/patient/${id}`, {
        headers: { dToken }
      })
      if (data.success) {
        setAppointment(data.appointment)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (dToken) {
      fetchPatientRecord()
    }
  }, [dToken, id])

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6">
          <div className="p-8 text-center text-gray-400">Loading patient record...</div>
        </div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/appointments')}
          className="flex items-center gap-2 text-indigo-600 mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Appointments
        </button>
        <div className="glass-card rounded-xl p-8 text-center text-gray-400">
          No appointment record found
        </div>
      </div>
    )
  }

  const patient = appointment.userData || {}
  const doctor = appointment.docData || {}

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/appointments')}
        className="flex items-center gap-2 text-indigo-600 mb-6 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Appointments
      </button>

      {/* Patient Header */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-6">
          <img
            src={patient.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNEOEQ4RDgiLz48L2NpcmNsZT4KPHBhdGggZD0iTTM1IDI0bC0yLTVsLTMgM3ptMCAwTDM1IDI0IiBmaWxsPSIjOEEEDY4Ij48L3BhdGg+PC9zdmc+'}
            alt={patient.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{patient.name || 'Unknown Patient'}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-indigo-500" />
                {patient.email || 'No email'}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-indigo-500" />
                {patient.phone || 'No phone'}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-indigo-500" />
                {appointment.date || 'N/A'} • {appointment.slotTime || ''}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-indigo-500" />
                {patient.address?.line1 || 'No address'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Info */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-indigo-500" />
            Appointment Details
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">Doctor</span>
              <p className="font-medium text-gray-700">{doctor.name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Speciality</span>
              <p className="font-medium text-gray-700">{doctor.speciality || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Fees</span>
              <p className="font-medium text-gray-700">${appointment.amount || 0}</p>
            </div>
            <div>
              <span className="text-gray-500">Payment</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                appointment.payment
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {appointment.payment ? 'Paid' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Prescription */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Prescription
            </h2>
            <Link
              to={`/prescription/${appointment._id}`}
              className="text-xs px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              {appointment.prescription ? 'Edit' : 'Add'}
            </Link>
          </div>
          {appointment.prescription ? (
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {appointment.prescription}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">No prescription added yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientRecord
