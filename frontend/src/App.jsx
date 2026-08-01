import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PatientLayout from './components/PatientLayout'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import DoctorProfile from './pages/DoctorProfile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import Contact from './pages/Contact'
import HowItWorks from './pages/HowItWorks'
import HealthCard from './pages/HealthCard'
import HealthCardQRPage from './pages/HealthCardQRPage'
import ForDoctors from './pages/ForDoctors'
import ForPharmacies from './pages/ForPharmacies'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Onboarding from './pages/Onboarding'
import BookAppointment from './pages/BookAppointment'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import MedicalRecords from './pages/MedicalRecords'
import Prescriptions from './pages/Prescriptions'
import SymptomChecker from './pages/SymptomChecker'
import PharmacyFinder from './pages/PharmacyFinder'
import Notifications from './pages/Notifications'
import Reviews from './pages/Reviews'
import Subscription from './pages/Subscription'
import DoctorLogin from './pages/DoctorLogin'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />

      <Routes>
        {/* Public Routes (no login required) */}
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/doctor/:id' element={<DoctorProfile />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/health-card' element={<HealthCard />} />
        <Route path='/for-doctors' element={<ForDoctors />} />
        <Route path='/for-pharmacies' element={<ForPharmacies />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy />} />

        {/* Auth Routes (no login required) */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/doctor/login' element={<DoctorLogin />} />

        {/* Patient Portal Routes (auth-protected via PatientLayout) */}
        <Route path='/onboarding' element={
          <PatientLayout>
            <Onboarding />
          </PatientLayout>
        } />
        <Route path='/book/:docId' element={
          <PatientLayout>
            <BookAppointment />
          </PatientLayout>
        } />
        <Route path='/my-profile' element={
          <PatientLayout>
            <MyProfile />
          </PatientLayout>
        } />
        <Route path='/my-appointments' element={
          <PatientLayout>
            <MyAppointments />
          </PatientLayout>
        } />
        <Route path='/medical-records' element={
          <PatientLayout>
            <MedicalRecords />
          </PatientLayout>
        } />
        <Route path='/prescriptions' element={
          <PatientLayout>
            <Prescriptions />
          </PatientLayout>
        } />
        <Route path='/health-card-q' element={
          <PatientLayout>
            <HealthCardQRPage />
          </PatientLayout>
        } />
        <Route path='/symptom-checker' element={
          <PatientLayout>
            <SymptomChecker />
          </PatientLayout>
        } />
        <Route path='/pharmacy-finder' element={
          <PatientLayout>
            <PharmacyFinder />
          </PatientLayout>
        } />
        <Route path='/notifications' element={
          <PatientLayout>
            <Notifications />
          </PatientLayout>
        } />
        <Route path='/reviews' element={
          <PatientLayout>
            <Reviews />
          </PatientLayout>
        } />
        <Route path='/subscription' element={
          <PatientLayout>
            <Subscription />
          </PatientLayout>
        } />

        {/* 404 - catch all */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App