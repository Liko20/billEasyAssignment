# 📚 Book Review RESTful API

A RESTful API for managing users, books, and reviews built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

---

## 🚀 Features

- User registration and login (JWT-based)
- Add, list, and filter books
- Add, update, and delete reviews (1 per user per book)
- Pagination for books and reviews
- Search books by title or author (case-insensitive, partial match)

---

## 🛠️ Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens) for Auth
- dotenv for config

---

## 📁 Project Structure

```
📆 root
🐃 models/         # Mongoose schemas (User, Book, Review)
🐃 routes/         # Route handlers
🐃 middleware/     # Middleware (auth, config)
🐃 config/         # DB config
🐃 cert/           # SSL certificates for HTTPS
🐃 app.js          # Main app setup
🐃 server.js       # HTTPS server entry
🐃 .env            # Environment variables
🐃 README.md
```

---

### 1. Clone and install dependencies

```bash
git clone https://github.com/Liko20/book-review-api.git
cd billEasyAssignment
npm install
```

### 2. Setup `.env`

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=your_super_secret_key
```

### 4. Run the server

```bash
node server.js
```

Server will run at:  
🔒 `http://localhost:3000`

---

## 📬 Sample API Requests (Using curl)

### 🔐 Authentication

#### ✅ Signup

```bash
curl --location 'http://localhost:3000/users/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456"
}'
```

#### ✅ Login

```bash
curl --location 'http://localhost:3000/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "john@example.com",
  "password": "123456"
}'
```

---

### 📚 Books

#### ✅ Add a Book (Auth required)

```bash
curl --location 'http://localhost:3000/books' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction"
}'
```

#### ✅ Get All Books (with filters & pagination)

```bash
curl 'http://localhost:3000/books?page=1&limit=10&author=paulo&genre=Fiction'
```

#### ✅ Get Book Details by ID

```bash
curl 'http://localhost:3000/books/<BOOK_ID>?page=1&limit=5'
```

#### ✅ Search Books

```bash
curl 'http://localhost:3000/books/search?q=alchemist'
```

---

### 📝 Reviews

#### ✅ Add Review (Auth, 1 per user per book)

```bash
curl --location 'http://localhost:3000/reviews/books/<BOOK_ID>/reviews' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "rating": 5,
  "comment": "Amazing book!"
}'
```

#### ✅ Update Review (Auth)

```bash
curl --location --request PUT 'http://localhost:3000/reviews/<REVIEW_ID>' \
--header 'Authorization: Bearer <TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "rating": 4,
  "comment": "Updated comment"
}'
```

#### ✅ Delete Review (Auth)

```bash
curl --location --request DELETE 'http://localhost:3000/reviews/<REVIEW_ID>' \
--header 'Authorization: Bearer <TOKEN>'
```

---

## 📊 Database Schema (Simplified)

### User

```json
{
  "username": String,
  "email": String,
  "password": String (hashed)
}
```

### Book

```json
{
  "title": String,
  "author": String,
  "genre": String
}
```

### Review

```json
{
  "user": ObjectId (ref User),
  "book": ObjectId (ref Book),
  "rating": Number (1–5),
  "comment": String
}
```

---

┌────────────┐       ┌────────────┐       ┌────────────┐
│   User     │       │   Review   │       │   Book     │
├────────────┤       ├────────────┤       ├────────────┤
│ _id        │◄────┐ │ _id        │ ┌────►│ _id        │
│ username   │     └─│ user       │ │     │ title      │
│ email      │       │ book       │─┘     │ author     │
│ password   │       │ rating     │       │ genre      │
└────────────┘       │ comment    │       └────────────┘
                     └────────────┘


