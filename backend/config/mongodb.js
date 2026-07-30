import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database connect"))
    
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/medicoplus`)
    } catch (error) {
        console.log("MongoDB Atlas connection failed, falling back to in-memory MongoDB...")
        const { MongoMemoryServer } = await import('mongodb-memory-server')
        const mongoServer = await MongoMemoryServer.create()
        const uri = mongoServer.getUri()
        await mongoose.connect(uri)
        console.log("Connected to in-memory MongoDB")
    }

}

export default connectDB