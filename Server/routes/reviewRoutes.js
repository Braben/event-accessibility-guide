const express = require("express");
const { reviewSchema } = require("../middlewares/validation");
const {
  createReview,
  getAllReviews,
  getAReview,
  updatedReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", createReview);

router.get("/venue/:venueId", getAllReviews);

router.get("/user/:userId", getAReview);

router.put("/:id", updatedReview);

router.delete("/:id", deleteReview);

module.exports = router;
