import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  hostelNumber: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);