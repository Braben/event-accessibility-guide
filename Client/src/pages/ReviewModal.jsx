import React, { useState } from "react";
import toastify from "react-hot-toast";
import { useDispatch } from "react-redux";
import { submitReview } from "../slicers/reviewSlicer";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({ isOpen, onClose, venue, venueId, userId, user }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Basic accessibilityRatings input (can be replaced with a more advanced UI)
  // const [accessibilityRatings, setAccessibilityRatings] = useState({
  //   entrance: 0,
  //   restroom: 0,
  //   parking: 0,
  // });

  if (!isOpen) return null;

  const handleSubmit = () => {
    const reviewData = {
      venueId,
      userId,
      user,
      rating,
      comments: review,
      venue: venue.name,
      // accessibilityRatings,
      isRecommended,
    };
    console.log("Review data:", reviewData);
    if (venueId && userId && user && rating && review) {
      dispatch(submitReview(reviewData));
      onClose();
      console.log("Review submitted:", reviewData);
      toastify.success("Review submitted successfully!");
    } else {
      console.error("Missing required fields", reviewData);
      toastify.error("Please log in to submit a review.");
      navigate("/login");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">
            Write a Review for {venue.name}
          </h2>
          <button
            onClick={onClose}
            className="  hover:text-white  bg-red-600 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overall Rating
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this venue"
              className="w-full border rounded-md p-2 h-32 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Recommendation Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="recommended"
              checked={isRecommended}
              onChange={() => setIsRecommended(!isRecommended)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor="recommended"
              className="ml-2 block text-sm text-gray-700"
            >
              I would recommend this venue to others visiting this accessibility
              needs
            </label>
          </div>
        </div>
        {/* Accessibility Ratings */}

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
