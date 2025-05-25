const express = require("express");
const Review = require("../models/reviews");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/books/:id/reviews", auth, async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }
  const existing = await Review.findOne({
    user: req.user.id,
    book: req.params.id,
  });
  if (existing) return res.status(400).json({ message: "Already reviewed" });

  const review = new Review({
    user: req.user.id,
    book: req.params.id,
    rating,
    comment,
  });
  await review.save();
  res.status(201).json(review);
});

router.put("/:id", auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });
  Object.assign(review, req.body);
  await review.save();
  res.json(review);
});

router.delete("/:id", auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  // check if review exists and belongs to user
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });
  await review.remove();
  res.json({ message: "Deleted" });
});

module.exports = router;
