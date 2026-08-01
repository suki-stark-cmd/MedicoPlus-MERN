import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  docData: { type: Object, required: true },
  userData: { type: Object, required: true },
  date: { type: String, required: true },
  slotTime: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  payment: { type: Boolean, default: false },
  // Extended fields for prescription and reviews
  prescription: { type: String, default: '' },
  review: { 
    rating: { type: Number, default: 0 },
    comment: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
