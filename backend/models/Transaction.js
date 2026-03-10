import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { 
    type: String, 
    enum: ['issued', 'returned'], // Lowercase only for consistency
    default: 'issued',            // Matches the enum
    required: true 
  },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);