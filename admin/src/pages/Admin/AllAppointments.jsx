import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Search, Filter, Trash2 } from 'lucide-react'

const AllAppointments = () => {
  const { aToken, backendUrl } = useContext(AdminContext)
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', {
        headers: { aToken }
      })
      if (data.success) {
        setAppointments(data.appointments || [])
        setFilteredAppointments(data.appointments || [])
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
    if (aToken) {
      fetchAppointments()
    }
  }, [aToken])

  // Filter and search
  useEffect(() => {
    let result = appointments
    if (searchTerm) {
      result = result.filter(
        (appt) =>
          appt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter !== 'all') {
      result = result.filter((appt) => appt.status === statusFilter)
    }
    setFilteredAppointments(result)
  }, [searchTerm, statusFilter, appointments])

  const deleteAppointment = async (id) => {
    try {
      const { data } = await axios.delete(backendUrl + `/api/admin/appointment/${id}`, {
        headers: { aToken }
      })
      if (data.success) {
        setAppointments(appointments.filter((appt) => appt._id !== id))
        toast.success('Appointment deleted')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusOptions = ['all', 'pending', 'completed', 'cancelled']

  return (
    <div className="m-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Appointments</h1>
        <p className="text-sm text-gray-500">
          {filteredAppointments.length} appointment(s) found
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading appointments...</div>
          ) : filteredAppointments.length > 0 ? (
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((appt, index) => (
                  <tr key={appt._id || index} className="hover:bg-gray-50">
                    <td className="py-3 px-5 text-sm text-gray-500">{index + 1}</td>
                    <td className="py-3 px-5 text-sm text-gray-700 font-medium">{appt.patientName || 'N/A'}</td>
                    <td className="py-3 px-5 text-sm text-gray-700">{appt.doctorName || 'N/A'}</td>
                    <td className="py-3 px-5 text-sm text-gray-500">{appt.date || 'N/A'}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          appt.status === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : appt.status === 'cancelled'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {appt.status || 'pending'}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <button
                        onClick={() => deleteAppointment(appt._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-400">No appointments found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments