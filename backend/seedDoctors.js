import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import doctorModel from './models/doctorModels.js'

// Load environment variables
dotenv.config()

const seedDoctors = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
    const DB_NAME = 'medicoplus'

    try {
        // Try Atlas first, fall back to in-memory if needed (same logic as mongodb.js)
        try {
            await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
            console.log('Connected to MongoDB Atlas')
        } catch (atlasError) {
            console.log('Atlas connection failed, using in-memory MongoDB...')
            const { MongoMemoryServer } = await import('mongodb-memory-server')
            const mongoServer = await MongoMemoryServer.create()
            await mongoose.connect(mongoServer.getUri())
            console.log('Connected to in-memory MongoDB')
        }

        // Clear existing doctors
        await doctorModel.deleteMany({})
        console.log('Cleared existing doctors')

        // Password is hashed for each doctor (same as adminController adddoctor)
        const hashedPassword = await bcrypt.hash('doctor123', 10)

        const doctors = [
            {
                name: 'Dr. Rajesh Kumar',
                email: 'rajesh.kumar@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'General physician',
                degree: 'MBBS, MD',
                experience: '12 Year',
                about: 'Dr. Rajesh Kumar is a board-certified general physician with over 12 years of experience in primary and preventive care.',
                fees: 300,
                address: { line1: '123 MG Road', line2: 'Delhi, India' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'hi'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Priya Sharma',
                email: 'priya.sharma@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Gynecologist',
                degree: 'DGO, MD',
                experience: '8 Year',
                about: 'Dr. Priya Sharma is a specialized gynecologist with expertise in women\'s health and maternal care.',
                fees: 500,
                address: { line1: '456 Park Street', line2: 'Mumbai, India' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'hi'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Amit Patel',
                email: 'amit.patel@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Dermatologist',
                degree: 'MD, DDV',
                experience: '15 Year',
                about: 'Dr. Amit Patel is a dermatologist specializing in skin, hair, and nail disorders with 15 years of experience.',
                fees: 450,
                address: { line1: '789 Bloor Street', line2: 'Toronto, Canada' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Sneha Reddy',
                email: 'sneha.reddy@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Pediatrician',
                degree: 'MBBS, MD, MRCPCH',
                experience: '10 Year',
                about: 'Dr. Sneha Reddy is a pediatrician with over 10 years of experience caring for children from newborns to adolescents.',
                fees: 400,
                address: { line1: '321 Queen Street', line2: 'Toronto, Canada' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'te'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. James Wilson',
                email: 'james.wilson@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Neurologist',
                degree: 'MD, PhD',
                experience: '18 Year',
                about: 'Dr. James Wilson is a neurologist with expertise in treating complex neurological conditions including epilepsy and Parkinsons disease.',
                fees: 800,
                address: { line1: '101 Manhattan Avenue', line2: 'New York, USA' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Maria Santos',
                email: 'maria.santos@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Gastroenterologist',
                degree: 'MD, DM',
                experience: '14 Year',
                about: 'Dr. Maria Santos is a gastroenterologist with extensive experience in digestive health and endoscopy procedures.',
                fees: 700,
                address: { line1: '202 Fifth Avenue', line2: 'New York, USA' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'es', 'pt'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Carlos Mendoza',
                email: 'carlos.mendoza@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Cardiologist',
                degree: 'MD, DM Cardiology',
                experience: '16 Year',
                about: 'Dr. Carlos Mendoza is a cardiologist specializing in heart disease prevention and interventional cardiology.',
                fees: 750,
                address: { line1: '303 Ocean Drive', line2: 'Miami, USA' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'es'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Sarah Thompson',
                email: 'sarah.thompson@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Orthopedic',
                degree: 'MS, MCh Ortho',
                experience: '13 Year',
                about: 'Dr. Sarah Thompson is an orthopedic surgeon with expertise in joint replacement and sports medicine injuries.',
                fees: 650,
                address: { line1: '404 Sunset Blvd', line2: 'Los Angeles, USA' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. David Kim',
                email: 'david.kim@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'ENT Specialist',
                degree: 'MD, MS ENT',
                experience: '9 Year',
                about: 'Dr. David Kim specializes in ear, nose, and throat disorders with a focus on minimally invasive procedures.',
                fees: 500,
                address: { line1: '505 Victoria Street', line2: 'Toronto, Canada' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'ko'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Emily Chen',
                email: 'emily.chen@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Ophthalmologist',
                degree: 'MD, MS Ophthalmology',
                experience: '11 Year',
                about: 'Dr. Emily Chen is an ophthalmologist specializing in cataract surgery and refractive lens procedures.',
                fees: 550,
                address: { line1: '606 Granville Street', line2: 'Vancouver, Canada' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'zh'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Omar Hassan',
                email: 'omar.hassan@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Dentist',
                degree: 'DDS, FICD',
                experience: '7 Year',
                about: 'Dr. Omar Hassan is a dentist with expertise in cosmetic dentistry and dental implants.',
                fees: 400,
                address: { line1: '707 King Street', line2: 'Toronto, Canada' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en', 'ar'],
                available: true,
                slots_booked: {},
            },
            {
                name: 'Dr. Lisa Anderson',
                email: 'lisa.anderson@medicoplus.com',
                password: hashedPassword,
                image: 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png',
                speciality: 'Psychiatrist',
                degree: 'MD, FRCPC',
                experience: '10 Year',
                about: 'Dr. Lisa Anderson is a psychiatrist specializing in anxiety, depression, and cognitive behavioral therapy.',
                fees: 600,
                address: { line1: '808 Jarvis Street', line2: 'Toronto, Canada' },
                date: Date.now(),
                verificationStatus: 'verified',
                languagesSpoken: ['en'],
                available: true,
                slots_booked: {},
            },
        ]

        await doctorModel.insertMany(doctors)
        console.log(`Seeded ${doctors.length} doctors`)

        // Verify
        const count = await doctorModel.countDocuments()
        console.log(`Total doctors in DB: ${count}`)

        await mongoose.disconnect()
        console.log('Disconnected from MongoDB')
        process.exit(0)
    } catch (error) {
        console.error('Seed failed:', error)
        process.exit(1)
    }
}

seedDoctors()
