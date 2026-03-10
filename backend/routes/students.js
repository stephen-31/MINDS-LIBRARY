import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, grade, hostelNumber } = req.body;
    
    // Explicit validation check
    if (!name || !grade || !hostelNumber) {
      return res.status(400).json({ error: 'Name, Grade, and Hostel Number are required' });
    }

    const newStudent = new Student({ name, grade, hostelNumber });
    await newStudent.save();
    
    res.status(201).json({ message: 'Student added successfully!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Database conflict: Please drop the old email index in MongoDB.' });
    }
    res.status(400).json({ error: err.message });
  }
});

export default router;