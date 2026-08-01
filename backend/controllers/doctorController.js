import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModels.js'
import appointmentModel from '../models/appointmentModel.js'

// API to login doctor
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body

        // Log login attempt
        console.log(`[LOGIN] Doctor login attempt for email:`, email)

        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            console.log(`[LOGIN] Failed - Doctor not found for email:`, email)
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (!isMatch) {
            console.log(`[LOGIN] Failed - Password mismatch for email:`, email)
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        console.log(`[LOGIN] Success - Doctor logged in:`, email)
        res.json({ success: true, token })
    } catch (error) {
        console.log(`[LOGIN] Error during doctor login:`, error.message)
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor dashboard stats
const getDashboard = async (req, res) => {
    try {
        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0
        let completed = 0
        let pending = 0
        let cancelled = 0

        appointments.forEach(appt => {
            if (appt.status === 'completed') {
                earnings += appt.amount
                completed++
            } else if (appt.status === 'pending') {
                pending++
            } else if (appt.status === 'cancelled') {
                cancelled++
            }
        })

        const stats = {
            totalAppointments: appointments.length,
            completed,
            pending,
            cancelled,
            earnings,
        }

        // Get latest 5 appointments for dashboard view
        const recentAppointments = appointments
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 5)
            .map(appt => ({
                _id: appt._id,
                patientName: appt.userData?.name || 'N/A',
                date: appt.date,
                slotTime: appt.slotTime,
                status: appt.status,
                amount: appt.amount,
            }))

        res.json({ success: true, stats, recentAppointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments for this doctor
const getAppointments = async (req, res) => {
    try {
        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId }).sort({ createdAt: -1 })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get patient record by appointment
const getPatientRecord = async (req, res) => {
    try {
        const { id } = req.params
        const { docId } = req.body

        // Find appointment for this doctor and patient
        const appointment = await appointmentModel.findOne({ _id: id, docId }).sort({ createdAt: -1 })

        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        res.json({ success: true, appointment })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to add prescription to an appointment
const addPrescription = async (req, res) => {
    try {
        const { apptId } = req.params
        const { prescription } = req.body
        const { docId } = req.body

        const appointment = await appointmentModel.findOneAndUpdate(
            { _id: apptId, docId },
            { prescription, status: 'completed' },
            { new: true }
        )

        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        res.json({ success: true, message: 'Prescription added', appointment })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor's availability / schedule
const updateSchedule = async (req, res) => {
    try {
        const { docId } = req.body
        const { slots } = req.body

        const doctor = await doctorModel.findByIdAndUpdate(
            docId,
            { slots },
            { new: true }
        ).select('-password')

        res.json({ success: true, message: 'Schedule updated', doctor })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor earnings summary
const getEarnings = async (req, res) => {
    try {
        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId, status: 'completed' })

        let totalEarnings = 0
        let totalAppointments = 0
        const monthlyData = {}

        appointments.forEach(appt => {
            totalEarnings += appt.amount
            totalAppointments++

            const month = new Date(appt.createdAt).toISOString().slice(0, 7)
            if (!monthlyData[month]) {
                monthlyData[month] = { earnings: 0, count: 0 }
            }
            monthlyData[month].earnings += appt.amount
            monthlyData[month].count += 1
        })

        const earnings = {
            total: totalEarnings,
            totalAppointments,
            monthly: monthlyData,
        }

        res.json({ success: true, earnings })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get and update doctor profile
const getDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.body

        const doctor = await doctorModel.findById(docId).select('-password')

        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        res.json({ success: true, doctor })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.body
        const { name, speciality, degree, experience, about, fees, address, languagesSpoken, phone } = req.body

        const updatedData = {
            name,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: address ? JSON.parse(address) : undefined,
            languagesSpoken,
            phone,
        }

        const doctor = await doctorModel.findByIdAndUpdate(docId, updatedData, { new: true }).select('-password')

        res.json({ success: true, message: 'Profile updated', doctor })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginDoctor,
    getDashboard,
    getAppointments,
    getPatientRecord,
    addPrescription,
    updateSchedule,
    getEarnings,
    getDoctorProfile,
    updateDoctorProfile
}
