import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Calendar, Clock, Plus, Trash2 } from 'lucide-react'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
]

const Schedule = () => {
  const { dToken, backendUrl } = useContext(DoctorContext)
  const [slots, setSlots] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSchedule = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { dToken }
      })
      if (data.success) {
        setSlots(data.doctor.slots || {})
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
      fetchSchedule()
    }
  }, [dToken])

  const toggleSlot = (day, time) => {
    setSlots((prev) => {
      const daySlots = prev[day] || []
      let newDaySlots
      if (daySlots.includes(time)) {
        newDaySlots = daySlots.filter((t) => t !== time)
      } else {
        newDaySlots = [...daySlots, time].sort()
      }
      return { ...prev, [day]: newDaySlots }
    })
  }

  const saveSchedule = async () => {
    setSaving(true)
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/doctor/schedule`,
        { slots },
        { headers: { dToken } }
      )
      if (data.success) {
        toast.success('Schedule updated successfully')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setSaving(false)
    }
  }

  const clearDay = (day) => {
    setSlots((prev) => {
      const newSlots = { ...prev }
      delete newSlots[day]
      return newSlots
    })
  }

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6">
          <div className="p-8 text-center text-gray-400">Loading schedule...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Schedule</h1>
        <button
          onClick={saveSchedule}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #0d9481 100%)'
          }}
        >
          {saving ? 'Saving...' : 'Save Schedule'}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Select available time slots for each day. Patients will only be able to book during these times.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DAYS.map((day) => {
          const daySlots = slots[day] || []
          return (
            <div key={day} className="glass-card rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  {day}
                </h3>
                {daySlots.length > 0 && (
                  <button
                    onClick={() => clearDay(day)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Clear all slots for this day"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {TIME_SLOTS.map((time) => {
                  const isSelected = daySlots.includes(time)
                  return (
                    <button
                      key={time}
                      onClick={() => toggleSlot(day, time)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                        isSelected
                          ? 'bg-indigo-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
              {daySlots.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  {daySlots.length} slot(s) selected
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Schedule
