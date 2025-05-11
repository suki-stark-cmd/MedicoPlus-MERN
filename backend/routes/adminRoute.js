import express from 'express'
import { adddoctor,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),adddoctor)
adminRouter.post('/login',loginAdmin)

export default adminRouter