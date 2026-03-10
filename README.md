# Library Management System

A full-stack library management app with **Add Books**, **Issue Book**, and **Return Book** workflows.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React, Vite

## Setup

### 1. MongoDB

Ensure MongoDB is running locally (e.g. `mongod` or MongoDB Atlas).

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # Edit MONGODB_URI if needed
npm run dev
```

Runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000` with API proxy to the backend.

## Workflow

### Phase 1: Add Books
- Use **Add Book** tab
- Enter Title, Author, ISBN, Total Quantity
- If ISBN exists → quantity is added to existing stock
- If new ISBN → new book document is created

### Phase 2: Issue Book
- Add students first via **Add Student**
- Use **Issue Book** tab
- Select student and available book
- Backend checks: availability, student limit, no duplicate issue
- Creates transaction and decrements `availableQuantity`

### Phase 3: Return Book
- Use **Return Book** tab
- View active (issued) transactions
- Click **Return** to mark as returned and restore quantity

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | List all books |
| POST | /api/books | Add book (or increment if ISBN exists) |
| GET | /api/students | List students |
| POST | /api/students | Add student |
| GET | /api/transactions | List transactions (optional ?status=issued) |
| POST | /api/transactions/issue | Issue a book |
| PUT | /api/transactions/return/:id | Return a book |
