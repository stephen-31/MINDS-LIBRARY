import express from 'express';
import Transaction from '../models/Transaction.js';
import Book from '../models/Book.js';
import Student from '../models/Student.js'; // Ensure this is imported
import mongoose from 'mongoose';

const router = express.Router();

// 1. GET: Fetch issued books with populated details
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: 'issued' })
      .populate('bookId')
      .populate('studentId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST: Quick Issue (Creates Student if missing)
router.post('/issue-direct', async (req, res) => {
  try {
    const { studentName, studentGrade, hostelNumber, bookId } = req.body;

    // Find or Create the Student
    let student = await Student.findOne({ name: studentName, grade: studentGrade });
    if (!student) {
      student = new Student({ name: studentName, grade: studentGrade, hostelNumber });
      await student.save();
    }

    // Create the Transaction
    const newTransaction = new Transaction({
      studentId: student._id, 
      bookId: bookId,
      issueDate: new Date(),
      status: 'issued'
    });

    await newTransaction.save();

    // Decrease Book Quantity
    await Book.findByIdAndUpdate(bookId, { $inc: { availableQuantity: -1 } });

    res.status(201).json({ message: 'Book Issued Successfully!', transaction: newTransaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. PUT: Return Book (Increments stock)
router.put('/return/:id', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const transaction = await Transaction.findById(req.params.id).session(session);

    if (!transaction || transaction.status === 'returned') {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Transaction not found or already returned' });
    }

    transaction.status = 'returned';
    transaction.returnDate = new Date();
    await transaction.save({ session });

    const book = await Book.findById(transaction.bookId).session(session);
    if (book) {
      book.availableQuantity += 1;
      await book.save({ session });
    }

    await session.commitTransaction();
    res.json({ message: 'Book returned successfully!' });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

export default router;