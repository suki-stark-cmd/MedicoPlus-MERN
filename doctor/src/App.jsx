import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DoctorContext } from './context/DoctorContext'
import DoctorNavbar from './components/DoctorNavbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import PatientRecord from './pages/PatientRecord'
import WritePrescription from './pages/WritePrescription'
import Schedule from './pages/Schedule'
import Earnings from './pages/Earnings'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const App = () => {
  const { dToken } = useContext(DoctorContext)

  // Protected route wrapper — redirects to /login if not authenticated
  const ProtectedRoute = ({ children }) => {
    if (!dToken) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  // Show login when not authenticated, otherwise show portal layout
  const renderLayout = (page) => (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <DoctorNavbar />
        {page}
      </div>
    </ProtectedRoute>
  )

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Routes>
        {/* Public Auth Route */}
        <Route path="/login" element={dToken ? <Navigate to="/dashboard" replace /> : <Login />} />

        {/* Protected Portal Routes */}
        <Route path="/dashboard" element={renderLayout(<Dashboard />)} />
        <Route path="/appointments" element={renderLayout(<Appointments />)} />
        <Route path="/patient/:id" element={renderLayout(<PatientRecord />)} />
        <Route path="/prescription/:apptId" element={renderLayout(<WritePrescription />)} />
        <Route path="/schedule" element={renderLayout(<Schedule />)} />
        <Route path="/earnings" element={renderLayout(<Earnings />)} />
        <Route path="/profile" element={renderLayout(<Profile />)} />

        {/* Root redirect */}
        <Route path="/" element={<Navigate to={dToken ? "/dashboard" : "/login"} replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
