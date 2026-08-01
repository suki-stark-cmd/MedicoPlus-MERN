import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FileText, Save, ArrowLeft, X } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'

const WritePrescription = () => {
  const { apptId } = useParams()
  const { dToken, backendUrl } = useContext(DoctorContext)
  const [appointment, setAppointment] = useState(null)
  const [prescription, setPrescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const fetchAppointment = async () => {
    if (!apptId) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/patient/${apptId}`, {
        headers: { dToken }
      })
      if (data.success) {
        setAppointment(data.appointment)
        setPrescription(data.appointment.prescription || '')
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
      fetchAppointment()
    }
  }, [dToken, apptId])

  const savePrescription = async () => {
    if (!prescription.trim()) {
      toast.error('Prescription cannot be empty')
      return
    }
    setSaving(true)
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/prescription/${apptId}`,
        { prescription },
        { headers: { dToken } }
      )
      if (data.success) {
        toast.success('Prescription saved successfully')
        setAppointment(data.appointment)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="glass-card rounded-xl p-6">
          <div className="p-8 text-center text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/appointments')}
        className="flex items-center gap-2 text-indigo-600 mb-6 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Appointments
      </button>

      <div className="glass-card rounded-2xl p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Write Prescription</h1>
              {appointment?.userData && (
                <p className="text-sm text-gray-500">
                  For: {appointment.userData.name || 'Unknown Patient'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Prescription Editor */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prescription
          </label>
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 min-h-[200px] font-mono text-sm resize-y"
            placeholder="Write your prescription here..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => navigate('/appointments')}
            className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={savePrescription}
            disabled={saving || !prescription.trim()}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #0d9481 100%)'
            }}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Prescription
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default WritePrescription
