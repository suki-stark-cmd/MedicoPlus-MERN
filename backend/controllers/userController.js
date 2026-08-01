import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModels.js'
import appointmentModel from '../models/appointmentModel.js'

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // checking if user already exists
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password (min 8 chars)' })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
            image: req.file ? req.file.path : undefined,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.json({ success: true, token, message: 'Account created successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Log login attempt
        console.log(`[LOGIN] User login attempt for email:`, email)

        const user = await userModel.findOne({ email })
        if (!user) {
            console.log(`[LOGIN] Failed - User not found for email:`, email)
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            console.log(`[LOGIN] Failed - Password mismatch for email:`, email)
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        console.log(`[LOGIN] Success - User logged in:`, email)
        res.json({ success: true, token })
    } catch (error) {
        console.log(`[LOGIN] Error during login:`, error.message)
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId).select('-password')
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, gender, dob, language, location } = req.body

        const updatedData = {
            name,
            phone,
            address,
            gender,
            dob,
            language,
            location,
        }

        // upload image to cloudinary if provided
        if (req.file) {
            // image upload handled via multer + cloudinary in production
            updatedData.image = req.file.path
        }

        const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password')

        res.json({ success: true, user, message: 'Profile updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')
        const userData = await userModel.findById(userId).select('-password')

        if (!docData || !userData) {
            return res.json({ success: false, message: 'Doctor or user not found' })
        }

        const appointmentData = {
            userId,
            docId,
            docData,
            userData,
            date: slotDate,
            slotTime,
            amount: docData.fees,
            status: 'pending',
            payment: false,
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // mark slot as booked in doctor's slots
        if (!docData.slots[slotDate]) {
            docData.slots[slotDate] = {}
        }
        docData.slots[slotDate][slotTime] = true
        await docData.save()

        res.json({ success: true, message: 'Appointment booked successfully', appointment: newAppointment })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments of a user
const listAppointments = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId }).sort({ createdAt: -1 })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user medical records
const getMedicalRecords = async (req, res) => {
    try {
        const { userId } = req.body

        // Get all completed appointments for this user as medical history
        const appointments = await appointmentModel.find({ userId, status: 'completed' }).sort({ createdAt: -1 })

        const records = appointments.map(appt => ({
            _id: appt._id,
            doctorName: appt.docData?.name || 'Unknown',
            speciality: appt.docData?.speciality || 'N/A',
            date: appt.date || 'N/A',
            slotTime: appt.slotTime || 'N/A',
            prescription: appt.prescription || '',
            notes: '',
            status: appt.status,
        }))

        res.json({ success: true, records })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user prescriptions
const getPrescriptions = async (req, res) => {
    try {
        const { userId } = req.body

        const appointments = await appointmentModel.find({
            userId,
            status: 'completed',
            prescription: { $ne: '' }
        }).sort({ createdAt: -1 })

        const prescriptions = appointments.map(appt => ({
            _id: appt._id,
            doctorName: appt.docData?.name || 'Unknown',
            speciality: appt.docData?.speciality || 'N/A',
            date: appt.date,
            slotTime: appt.slotTime,
            prescription: appt.prescription || '',
            dosage: '',
            refills: 0,
        }))

        res.json({ success: true, prescriptions })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors (public listing)
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password').sort({ date: -1 })
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get single doctor by ID (public profile)
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await doctorModel.findById(id).select('-password')
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }
        res.json({ success: true, doctor })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
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
}
