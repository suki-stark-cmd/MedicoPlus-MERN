import { v2 as cloudinery } from 'cloudinary'

const connectCloudinary = async () => {

    cloudinery.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECERT_KEY
    })
}

export default connectCloudinary