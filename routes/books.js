const express = require("express");
const Book = require("../models/book");
const Review = require("../models/reviews");
const auth = require("../middleware/auth");
const router = express.Router();

// adding auth middleware to protect routes
router.post("/", auth, async (req, res) => {
  try {
    // validating body
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      return res
        .status(400)
        .json({ message: "Title, author, and genre are required" });
    }
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = genre;

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(books);
});

router.get("/search", async (req, res) => {
  const { q } = req.query;
  // searching by title or author both case insensitive
  const books = await Book.find({
    $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
  });
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  const { page = 1, limit = 5 } = req.query;
  // default to 5 reviews per page
  const reviews = await Review.find({ book: book._id })
    .populate("user", "username")
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  res.json({ ...book.toObject(), averageRating: avgRating, reviews });
});

module.exports = router;
