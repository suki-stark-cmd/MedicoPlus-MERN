import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Users, Calendar, DollarSign, UserCheck } from 'lucide-react'

const Dashboard = () => {
  const { aToken, backendUrl } = useContext(AdminContext)
  const [stats, setStats] = useState({ doctors: 0, appointments: 0, patients: 0, earnings: 0 })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {
        headers: { aToken }
      })
      if (data.success) {
        setStats(data.stats)
        setRecentAppointments(data.recentAppointments || [])
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
      fetchDashboardData()
    }
  }, [aToken])

  const statCards = [
    { title: 'Total Doctors', value: stats.doctors, icon: <UserCheck className="w-8 h-8 text-blue-500" />, bg: 'bg-blue-50', trend: '+12%' },
    { title: 'Total Appointments', value: stats.appointments, icon: <Calendar className="w-8 h-8 text-purple-500" />, bg: 'bg-purple-50', trend: '+8%' },
    { title: 'Total Patients', value: stats.patients, icon: <Users className="w-8 h-8 text-green-500" />, bg: 'bg-green-50', trend: '+15%' },
    { title: 'Total Earnings', value: `$${stats.earnings}`, icon: <DollarSign className="w-8 h-8 text-yellow-500" />, bg: 'bg-yellow-50', trend: '+5%' }
  ]

  return (
    <div className="m-5">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className={`${card.bg} p-5 rounded-xl border border-gray-100 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{loading ? '...' : card.value}</p>
                <p className="text-green-500 text-xs mt-1">{card.trend} from last month</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
          <button className="text-blue-500 text-sm font-medium hover:text-blue-600">View All</button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : recentAppointments.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentAppointments.slice(0, 5).map((appt, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-5 text-sm text-gray-700">{appt.doctorName || 'N/A'}</td>
                    <td className="py-3 px-5 text-sm text-gray-700">{appt.patientName || 'N/A'}</td>
                    <td className="py-3 px-5 text-sm text-gray-500">{appt.date || 'N/A'}</td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appt.status === 'completed' ? 'bg-green-100 text-green-600' :
                        appt.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {appt.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-400">No recent appointments</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard