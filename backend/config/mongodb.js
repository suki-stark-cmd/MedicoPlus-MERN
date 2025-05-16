import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database connect"))
    await mongoose.connect(`${process.env.MONGODB_URI}/medicoplus`)

}

export default connectDB