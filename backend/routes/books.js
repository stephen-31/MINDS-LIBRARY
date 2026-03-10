import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// GET all books - Fetches the inventory list
// GET all books for the dropdown list
// GET all books - UPDATED
router.get('/', async (req, res) => {
  try {
    // Remove the string 'title availableQuantity _id' to fetch everything
    const books = await Book.find({}); 
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// POST - Add or update book quantity
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn, totalQuantity } = req.body;

    if (!title || !author || !isbn || totalQuantity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const quantity = parseInt(totalQuantity, 10);
    const existingBook = await Book.findOne({ isbn: isbn.trim() });

    if (existingBook) {
      const updated = await Book.findByIdAndUpdate(
        existingBook._id,
        { $inc: { totalQuantity: quantity, availableQuantity: quantity } },
        { new: true }
      );
      return res.status(200).json({ message: 'Quantity updated', book: updated });
    }

    const newBook = await Book.create({
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      totalQuantity: quantity,
      availableQuantity: quantity,
    });

    res.status(201).json({ message: 'Book added', book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Remove a book from inventory
// This matches the fetch call: /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error("Server Delete Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;