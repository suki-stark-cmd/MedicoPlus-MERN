import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DollarSign, Calendar, TrendingUp, Wallet } from 'lucide-react'

const Earnings = () => {
  const { dToken, backendUrl } = useContext(DoctorContext)
  const [earnings, setEarnings] = useState({
    total: 0,
    totalAppointments: 0,
    monthly: {}
  })
  const [loading, setLoading] = useState(true)

  const fetchEarnings = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/earnings`, {
        headers: { dToken }
      })
      if (data.success) {
        setEarnings(data.earnings || earnings)
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
      fetchEarnings()
    }
  }, [dToken])

  // Convert monthly object to sorted array
  const monthlyData = Object.entries(earnings.monthly || {}).sort(([a], [b]) =>
    b.localeCompare(a)
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
          <p className="text-sm text-gray-500">Track your earnings and payouts</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="glass-card rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                ${loading ? '...' : earnings.total.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed Appointments</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {loading ? '...' : earnings.totalAppointments}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Avg per Appointment</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                ${loading ? '...' : earnings.totalAppointments > 0
                  ? (earnings.total / earnings.totalAppointments).toFixed(2)
                  : '0.00'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="glass-card rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : monthlyData.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Month</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Appointments</th>
                  <th className="text-right py-3 px-5 text-xs font-medium text-gray-500 uppercase">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthlyData.map(([month, data]) => (
                  <tr key={month} className="hover:bg-gray-50">
                    <td className="py-3 px-5 text-sm text-gray-700 font-medium">
                      {new Date(month + '-01').toLocaleString('default', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-600">{data.count}</td>
                    <td className="py-3 px-5 text-sm text-right text-emerald-600 font-semibold">
                      ${data.earnings.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-400">
              No earnings data yet
            </div>
          )}
        </div>
      </div>

      {/* Payout Section */}
      <div className="glass-card rounded-xl border border-gray-200 shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-indigo-500" />
          Payout
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Earnings are automatically deposited to your bank account at the end of each month.
        </p>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Next payout:</strong> End of month
          </p>
          <p className="text-sm text-gray-600">
            <strong>Payout method:</strong> Bank Transfer (details in Profile)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Earnings
