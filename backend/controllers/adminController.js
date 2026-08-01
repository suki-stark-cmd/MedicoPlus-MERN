import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModels.js"
import userModel from "../models/userModel.js"
import appointmentModel from "../models/appointmentModel.js"
import jwt from 'jsonwebtoken'


// api for adding doctors

const adddoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        
        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !degree || !address) {
            return res.json({ success: false, message: "Missing Detials" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "pleace enter valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Pleace enter strong password" })
        }

        //hasing doctors password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        let imageUrl = ''
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            imageUrl = imageUpload.secure_url
        }

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" })
    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api for admin Login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        // Log login attempt
        console.log(`[LOGIN] Admin login attempt for email:`, email)

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            console.log(`[LOGIN] Success - Admin logged in:`, email)
            res.json({ success: true, token }
            )

        }
        else {
            console.log(`[LOGIN] Failed - Invalid credentials for email:`, email)
            res.json({ success: false, message: "Invalid Credentials" });
        }


    } catch (error) {
        console.log(`[LOGIN] Error during admin login:`, error.message)
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

// API to get dashboard stats
const getDashboardStats = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const appointments = await appointmentModel.find({}).sort({ createdAt: -1 }).limit(5)
        const patients = await userModel.find({})

        const stats = {
            doctors: doctors.length,
            appointments: await appointmentModel.countDocuments({}),
            patients: patients.length,
            earnings: await appointmentModel.aggregate([
                { $match: { status: "completed" } },
                { $group: { _id: null, total: { $sum: "$fees" } } }
            ]).then(result => result[0]?.total || 0)
        }

        const recentAppointments = appointments.map(appt => ({
            _id: appt._id,
            doctorName: appt.docData?.name || 'N/A',
            patientName: appt.userData?.name || 'N/A',
            date: appt.slotDate || 'N/A',
            status: appt.status || 'pending'
        }))

        res.json({ success: true, stats, recentAppointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({}).sort({ createdAt: -1 })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).sort({ date: -1 })
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to toggle doctor availability
const toggleDoctorAvailability = async (req, res) => {
    try {
        const { id } = req.params
        const { available } = req.body
        const doctor = await doctorModel.findByIdAndUpdate(
            id,
            { available },
            { new: true }
        )
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }
        res.json({ success: true, message: "Doctor availability updated", doctor })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to delete a doctor
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await doctorModel.findByIdAndDelete(id)
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }
        res.json({ success: true, message: "Doctor deleted" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await appointmentModel.findByIdAndDelete(id)
        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" })
        }
        res.json({ success: true, message: "Appointment deleted" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { adddoctor, loginAdmin, getDashboardStats, getAllAppointments, getAllDoctors, toggleDoctorAvailability, deleteDoctor, deleteAppointment }