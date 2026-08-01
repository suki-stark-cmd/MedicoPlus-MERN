import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  DollarSign,
  FileText
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const { dToken, backendUrl, profile } = useContext(DoctorContext)
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completed: 0,
    pending: 0,
    cancelled: 0,
    earnings: 0
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dToken }
      })
      if (data.success) {
        setStats(data.stats || stats)
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
    if (dToken) {
      fetchDashboardData()
    }
  }, [dToken])

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: <Calendar className="w-6 h-6 text-indigo-500" />,
      bg: 'bg-indigo-50',
      trend: '+12% this month'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
      bg: 'bg-emerald-50',
      trend: '+8% this month'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50',
      trend: '-3% this month'
    },
    {
      title: 'Total Earnings',
      value: `$${stats.earnings}`,
      icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
      bg: 'bg-yellow-50',
      trend: '+5% this month'
    },
  ]

  const statusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-amber-100 text-amber-700'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {profile ? `Dr. ${profile.name}` : 'Doctor'}'s Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Welcome back — here's your practice at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-5 shadow-sm border border-gray-100 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {loading ? '...' : card.value}
                </p>
                <p className="text-emerald-500 text-xs mt-1">{card.trend}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="glass-card rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
          <button
            onClick={() => navigate('/appointments')}
            className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : recentAppointments.length > 0 ? (
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentAppointments.map((appt, index) => (
                  <tr key={appt._id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5 text-sm text-gray-400">{index + 1}</td>
                    <td className="py-3 px-5 text-sm text-gray-700 font-medium">
                      {appt.patientName || 'N/A'}
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-500">
                      {appt.date || 'N/A'} • {appt.slotTime || ''}
                    </td>
                    <td className="py-3 px-5 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColor(appt.status)}`}>
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
