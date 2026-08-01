import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import bcrypt from 'bcrypt'
import doctorModel from './models/doctorModels.js'

// Seed initial doctors into the database
const seedDoctors = async () => {
    try {
        const existing = await doctorModel.countDocuments()
        if (existing > 0) {
            console.log(`Found ${existing} existing doctors, clearing and re-seeding...`)
            await doctorModel.deleteMany({})
        }

        const hashedPassword = await bcrypt.hash('doctor123', 10)
        const sampleImage = 'https://res.cloudinary.com/de3q5kwhd/image/upload/v1749019659/bi18ondnki6jw2lg6sx2.png'

        const doctors = [
            {
                name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'General physician', degree: 'MBBS, MD', experience: '12 Year',
                about: 'Board-certified general physician with 12 years in primary and preventive care.',
                fees: 300, address: { line1: '123 MG Road', line2: 'Delhi, India' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'hi'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Priya Sharma', email: 'priya.sharma@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Gynecologist', degree: 'DGO, MD', experience: '8 Year',
                about: 'Specialized gynecologist with expertise in womens health and maternal care.',
                fees: 500, address: { line1: '456 Park Street', line2: 'Mumbai, India' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'hi'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Amit Patel', email: 'amit.patel@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Dermatologist', degree: 'MD, DDV', experience: '15 Year',
                about: 'Dermatologist specializing in skin, hair, and nail disorders.',
                fees: 450, address: { line1: '789 Bloor Street', line2: 'Toronto, Canada' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Sneha Reddy', email: 'sneha.reddy@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Pediatrician', degree: 'MBBS, MD, MRCPCH', experience: '10 Year',
                about: 'Pediatrician with 10 years of experience caring for children from newborns to adolescents.',
                fees: 400, address: { line1: '321 Queen Street', line2: 'Toronto, Canada' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'te'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. James Wilson', email: 'james.wilson@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Neurologist', degree: 'MD, PhD', experience: '18 Year',
                about: 'Neurologist with expertise in complex neurological conditions.',
                fees: 800, address: { line1: '101 Manhattan Avenue', line2: 'New York, USA' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Maria Santos', email: 'maria.santos@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Gastroenterologist', degree: 'MD, DM', experience: '14 Year',
                about: 'Gastroenterologist with extensive experience in digestive health and endoscopy.',
                fees: 700, address: { line1: '202 Fifth Avenue', line2: 'New York, USA' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'es', 'pt'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Carlos Mendoza', email: 'carlos.mendoza@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Cardiologist', degree: 'MD, DM Cardiology', experience: '16 Year',
                about: 'Cardiologist specializing in heart disease prevention and interventional cardiology.',
                fees: 750, address: { line1: '303 Ocean Drive', line2: 'Miami, USA' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'es'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Sarah Thompson', email: 'sarah.thompson@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Orthopedic', degree: 'MS, MCh Ortho', experience: '13 Year',
                about: 'Orthopedic surgeon with expertise in joint replacement and sports medicine.',
                fees: 650, address: { line1: '404 Sunset Blvd', line2: 'Los Angeles, USA' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. David Kim', email: 'david.kim@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'ENT Specialist', degree: 'MD, MS ENT', experience: '9 Year',
                about: 'ENT specialist focusing on minimally invasive procedures.',
                fees: 500, address: { line1: '505 Victoria Street', line2: 'Toronto, Canada' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'ko'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Emily Chen', email: 'emily.chen@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Ophthalmologist', degree: 'MD, MS Ophthalmology', experience: '11 Year',
                about: 'Ophthalmologist specializing in cataract surgery and refractive lens procedures.',
                fees: 550, address: { line1: '606 Granville Street', line2: 'Vancouver, Canada' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'zh'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Omar Hassan', email: 'omar.hassan@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Dentist', degree: 'DDS, FICD', experience: '7 Year',
                about: 'Dentist with expertise in cosmetic dentistry and dental implants.',
                fees: 400, address: { line1: '707 King Street', line2: 'Toronto, Canada' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en', 'ar'], available: true, slots_booked: {},
            },
            {
                name: 'Dr. Lisa Anderson', email: 'lisa.anderson@medicoplus.com', password: hashedPassword,
                image: sampleImage, speciality: 'Psychiatrist', degree: 'MD, FRCPC', experience: '10 Year',
                about: 'Psychiatrist specializing in anxiety, depression, and cognitive behavioral therapy.',
                fees: 600, address: { line1: '808 Jarvis Street', line2: 'Toronto, Canada' }, date: Date.now(),
                verificationStatus: 'verified', languagesSpoken: ['en'], available: true, slots_booked: {},
            },
        ]

        await doctorModel.insertMany(doctors)
        console.log(`Seeded ${doctors.length} doctors`)
    } catch (error) {
        console.error('Doctor seeding failed:', error.message)
    }
}

//app config
const app = express()
const port = process.env.PORT || 4000

// Connect to DB
connectDB().then(() => {
    app.listen(port, () => console.log("Server Started on port", port))
})
connectCloudinary()

//midlewares
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
    const startTime = Date.now();
    const { method, url, body, query, params, ip } = req;
    
    // Log incoming request
    console.log(`[${new Date().toISOString()}] → ${method} ${url} | IP: ${ip}`);
    
    // Log request body for login/auth endpoints (omit passwords in logs)
    if (url.includes('/login') || url.includes('/register')) {
        const safeBody = { ...body };
        if (safeBody.password) safeBody.password = '[REDACTED]';
        console.log(`  Request body:`, JSON.stringify(safeBody));
    }
    
    // Capture response for logging
    const originalSend = res.send;
    res.send = function(chunk) {
        const responseTime = Date.now() - startTime;
        const success = res.statusCode >= 200 && res.statusCode < 400;
        const statusIcon = success ? '✓' : '✗';
        
        console.log(`[${new Date().toISOString()}] ${statusIcon} ${method} ${url} | Status: ${res.statusCode} | Time: ${responseTime}ms`);
        
        // Log response body for auth endpoints
        if (url.includes('/login') || url.includes('/register')) {
            let responseBody = chunk;
            if (typeof chunk === 'string') {
                try {
                    const parsed = JSON.parse(chunk);
                    const safeParsed = { ...parsed };
                    if (safeParsed.token) safeParsed.token = '[REDACTED]';
                    if (safeParsed.user) safeParsed.user = '[REDACTED]';
                    responseBody = JSON.stringify(safeParsed);
                } catch (e) {
                    responseBody = '[non-JSON response]';
                }
            }
            console.log(`  Response:`, responseBody);
        }
        
        originalSend.call(this, chunk);
    };
    
    next();
});

//api end points 
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
//localhost:4000/api/admin/add-doctor
app.get('/', (req, res) => {
    res.send('API is Working')
})

