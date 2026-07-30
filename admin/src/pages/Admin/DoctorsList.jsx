import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Search, Trash2 } from 'lucide-react'

const DoctorsList = () => {
  const { aToken, backendUrl } = useContext(AdminContext)
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/doctors', {
        headers: { aToken }
      })
      if (data.success) {
        setDoctors(data.doctors || [])
        setFilteredDoctors(data.doctors || [])
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
      fetchDoctors()
    }
  }, [aToken])

  // Search filter
  useEffect(() => {
    if (searchTerm) {
      setFilteredDoctors(
        doctors.filter(
          (doc) =>
            doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.speciality?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      setFilteredDoctors(doctors)
    }
  }, [searchTerm, doctors])

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/api/admin/doctor/${id}/availability`,
        { available: !currentStatus },
        { headers: { aToken } }
      )
      if (data.success) {
        setDoctors(
          doctors.map((doc) =>
            doc._id === id ? { ...doc, available: !currentStatus } : doc
          )
        )
        toast.success('Doctor availability updated')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteDoctor = async (id) => {
    try {
      const { data } = await axios.delete(backendUrl + `/api/admin/doctor/${id}`, {
        headers: { aToken }
      })
      if (data.success) {
        setDoctors(doctors.filter((doc) => doc._id !== id))
        toast.success('Doctor deleted')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="m-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Doctors List</h1>
        <p className="text-sm text-gray-500">{filteredDoctors.length} doctor(s) found</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or speciality..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading doctors...</div>
          ) : filteredDoctors.length > 0 ? (
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Speciality</th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-gray-500 uppercase">Experience</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 uppercase">Available</th>
                  <th className="text-center py-3 px-5 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDoctors.map((doc, index) => (
                  <tr key={doc._id || index} className="hover:bg-gray-50">
                    <td className="py-3 px-5 text-sm text-gray-500">{index + 1}</td>
                    <td className="py-3 px-5 text-sm">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={doc.image || '/placeholder.svg'}
                          alt={doc.name}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNEOEQ4RDgiLz48cGF0aCBkPSJNNjA2IDEyMEM2IDkyNCA1MjQgODAwIDI0MCA4MDBDMjQwIDg3NiAxNTYgOTI0IDE1NiA5NzJDMTU2IDEwMjAgMjQwIDEwNjggMjQwIDEwNjhaTTgwNSA0NDFDOCg4MDUgNDAxIDc2OCAzNjggNzI1IDM2OEM2ODIgMzY4IDY0MCA0MDEgNjQwIDQ0MUw2NDAgNDQyQzY0MCA0NDcgNjQwIDQ1MiA2NDAgNDU3QzY0MCA0NjIgNjQyIDQ2NSA2NDUgNDY3TDc1NSA1NzhDOCg3NTUgNTgzIDc1NSA2MDcgNzU1NjA4TDc1NSA2MDdDNzU1IDYwNyA3NTUgNjA3IDc1NSA2MDd6IiBmaWxsPSIjNzc3IiB0cmFuc2Zvcm09InNjYWxlKDEwKSIvPjwvc3ZnPg=='
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-800">{doc.name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{doc.degree || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-sm text-gray-600">{doc.email || 'N/A'}</td>
                    <td className="py-3 px-5 text-sm text-gray-600">{doc.speciality || 'N/A'}</td>
                    <td className="py-3 px-5 text-sm text-gray-600">{doc.experience || 'N/A'}</td>
                    <td className="py-3 px-5 text-center">
                      <button
                        onClick={() => toggleAvailability(doc._id, doc.available)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          doc.available ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            doc.available ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <button
                        onClick={() => deleteDoctor(doc._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-400">No doctors found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorsList