// // import 'dotenv/config';
// // import express from 'express';
// // import cors from 'cors';
// // import mongoose from 'mongoose';
// // import booksRouter from './routes/books.js';
// // import studentsRouter from './routes/students.js';
// // import transactionsRouter from './routes/transactions.js';

// // const app = express();

// // // Force port 5000 to match your frontend alerts
// // const PORT = process.env.PORT || 5000;
// // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library-management';

// // app.use(cors());
// // app.use(express.json());

// // // Routes - Ensure transactions is mounted to /api/transactions
// // app.use('/api/books', booksRouter);
// // app.use('/api/students', studentsRouter);
// // app.use('/api/transactions', transactionsRouter);

// // mongoose
// //   .connect(MONGODB_URI)
// //   .then(() => {
// //     app.listen(PORT, () => {
// //       console.log(`✅ Server running on http://localhost:${PORT}`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.error('❌ MongoDB connection error:', err.message);
// //     process.exit(1);
// //   });
// // import 'dotenv/config';
// // import express from 'express';
// // import cors from 'cors';
// // import mongoose from 'mongoose';
// // import booksRouter from './routes/books.js';
// // import studentsRouter from './routes/students.js';
// // import transactionsRouter from './routes/transactions.js';

// // const app = express();

// // const PORT = process.env.PORT || 5000;
// // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library-management';

// // // --- UPDATED CORS SETTINGS ---
// // app.use(cors({
// //   // Replace the URL below with your actual Vercel Production URL
// //   origin: 'http://localhost:5000', 
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   credentials: true
// // }));
// // // -----------------------------

// // app.use(express.json());

// // // Routes
// // app.use('/api/books', booksRouter);
// // app.use('/api/students', studentsRouter);
// // app.use('/api/transactions', transactionsRouter);

// // mongoose
// //   .connect(MONGODB_URI)
// //   .then(() => {
// //     app.listen(PORT, () => {
// //       console.log(`✅ Server running on port ${PORT}`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.error('❌ MongoDB connection error:', err.message);
// //     process.exit(1);
// //   });
// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import booksRouter from './routes/books.js';
// import studentsRouter from './routes/students.js';
// import transactionsRouter from './routes/transactions.js';

// const app = express();

// // Configuration from Environment or Defaults
// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library-management';

// // --- UPDATED CORS SETTINGS ---
// // This allows your Vite frontend (port 5173) to securely access this API
// app.use(cors({
//   origin: 'https://minds-library.vercel.app', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
// // -----------------------------

// app.use(express.json());

// // Routes
// app.use('/api/books', booksRouter);
// app.use('/api/students', studentsRouter);
// app.use('/api/transactions', transactionsRouter);

// // Database Connection and Server Start
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//       console.log(`🚀 Accepting requests from: http://localhost:5173`);
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

// Configuration
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI; // Removed local fallback for security

// --- DYNAMIC CORS SETTINGS ---
const allowedOrigins = [
  'https://minds-library.vercel.app', 
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// -----------------------------

app.use(express.json());

// Routes
app.use('/api/books', booksRouter);
app.use('/api/students', studentsRouter);
app.use('/api/transactions', transactionsRouter);

// Database Connection and Server Start
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is live on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });