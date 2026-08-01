import express from 'express'
import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointments,
    getMedicalRecords,
    getPrescriptions,
    getAllDoctors,
    getDoctorById
} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

// Public routes (no auth)
userRouter.get('/doctors', getAllDoctors)        // list all doctors (public)
userRouter.get('/doctor/:id', getDoctorById)     // doctor public profile (no auth)

// Auth routes
userRouter.post('/register', registerUser)       // patient signup
userRouter.post('/login', loginUser)            // patient login

// Protected routes (auth required)
userRouter.get('/profile', authUser, getProfile)                           // get patient profile
userRouter.put('/profile', authUser, updateProfile)                         // update patient profile
userRouter.post('/book-appointment', authUser, bookAppointment)             // book appointment
userRouter.get('/appointments', authUser, listAppointments)                 // get patient appointments
userRouter.get('/medical-records', authUser, getMedicalRecords)               // get medical records
userRouter.get('/prescriptions', authUser, getPrescriptions)                // get prescriptions

export default userRouter
