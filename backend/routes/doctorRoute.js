import express from 'express'
import {
    loginDoctor,
    getDashboard,
    getAppointments,
    getPatientRecord,
    addPrescription,
    updateSchedule,
    getEarnings,
    getDoctorProfile,
    updateDoctorProfile
} from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

// Doctor auth
doctorRouter.post('/login', loginDoctor)                    // doctor login

// Protected routes (auth required)
doctorRouter.get('/dashboard', authDoctor, getDashboard)                          // dashboard stats
doctorRouter.get('/appointments', authDoctor, getAppointments)                    // all appointments for this doctor
doctorRouter.get('/patient/:id', authDoctor, getPatientRecord)                   // patient record view
doctorRouter.post('/prescription/:apptId', authDoctor, addPrescription)           // add prescription
doctorRouter.put('/schedule', authDoctor, updateSchedule)                         // update availability/schedule
doctorRouter.get('/earnings', authDoctor, getEarnings)                           // earnings summary
doctorRouter.get('/profile', authDoctor, getDoctorProfile)                       // get doctor profile
doctorRouter.put('/profile', authDoctor, updateDoctorProfile)                    // update doctor profile

export default doctorRouter
