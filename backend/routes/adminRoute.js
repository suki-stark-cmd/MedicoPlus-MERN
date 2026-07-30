import express from 'express'
import { adddoctor, loginAdmin, getDashboardStats, getAllAppointments, getAllDoctors, toggleDoctorAvailability, deleteDoctor, deleteAppointment } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

// Admin login
adminRouter.post('/login', loginAdmin)

// Doctor management
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), adddoctor)
adminRouter.get('/doctors', authAdmin, getAllDoctors)
adminRouter.put('/doctor/:id/availability', authAdmin, toggleDoctorAvailability)
adminRouter.delete('/doctor/:id', authAdmin, deleteDoctor)

// Appointment management
adminRouter.get('/appointments', authAdmin, getAllAppointments)
adminRouter.delete('/appointment/:id', authAdmin, deleteAppointment)

// Dashboard stats
adminRouter.get('/dashboard', authAdmin, getDashboardStats)

export default adminRouter