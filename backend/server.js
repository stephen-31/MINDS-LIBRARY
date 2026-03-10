// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import booksRouter from './routes/books.js';
// import studentsRouter from './routes/students.js';
// import transactionsRouter from './routes/transactions.js';

// const app = express();

// // Force port 5000 to match your frontend alerts
// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library-management';

// app.use(cors());
// app.use(express.json());

// // Routes - Ensure transactions is mounted to /api/transactions
// app.use('/api/books', booksRouter);
// app.use('/api/students', studentsRouter);
// app.use('/api/transactions', transactionsRouter);

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   });
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import booksRouter from './routes/books.js';
import studentsRouter from './routes/students.js';
import transactionsRouter from './routes/transactions.js';

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library-management';

// --- UPDATED CORS SETTINGS ---
app.use(cors({
  // Replace the URL below with your actual Vercel Production URL
  origin: 'https://minds-library.vercel.app/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// -----------------------------

app.use(express.json());

// Routes
app.use('/api/books', booksRouter);
app.use('/api/students', studentsRouter);
app.use('/api/transactions', transactionsRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });