const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a Review**
const createReview = async (req, res) => {
  const { venueId, rating, comments, accessibilityRatings, userId } = req.body;

  // Check if venue exists before creating a review
  try {
    const existingVenue = await prisma.venue.findUnique({ where: { id: venueId } });
    if (!existingVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // if venue exist, create the review
    const newReview = await prisma.review.create({
      data: { venueId, userId, rating, comments, accessibilityRatings: accessibilityRatings || {} },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Reviews for a Venue**
const getAllReviews =  async (req, res) => {
  try {
    const { venueId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { venueId },
      // showing the user's name on the reviews posted
      include: { user: { select: { name: true } } },
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Reviews by a User
const getAReview = async (req, res) => {
  const { userId } = req.params;

  try {
    const userReviews = await prisma.review.findMany({
      where: { userId },
      include: { venue: { select: { name: true } } },
    });

    res.status(200).json(userReviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a Review
const updatedReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comments, accessibilityRatings, userId } = req.body;

  try {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this review" });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, comments, accessibilityRatings },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a Review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    // const userId = req.user.id
    // const review = await prisma.review.findUnique({ where: { id } });

    // if (!review) {
    //   return res.status(404).json({ message: "Review not found" });
    // }

    // if (review.userId !== userId) {
    //   return res.status(403).json({ message: "Unauthorized to delete this review" });
    // }

    await prisma.review.delete({ where: { id } });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createReview, deleteReview, updatedReview, getAllReviews, getAReview };
