// src/slicers/reviewSlicer.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Base URL of your backend API (adjust as needed)
const BASE_URL = "https://event-accessibility-guide.onrender.com";

// ============================
// ✅ ASYNC THUNKS (API Calls)
// ============================

// 📦 Fetch all reviews for a specific venue
export const fetchReviewsByVenue = createAsyncThunk(
  "reviews/fetchByVenue",
  async (venueId, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/venue/${venueId}/reviews`);
      if (!response.ok) throw new Error("Failed to fetch reviews by venue");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 📦 Fetch all reviews by a specific user
export const fetchReviewsByUser = createAsyncThunk(
  "reviews/fetchByUser",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}/reviews`);
      if (!response.ok) throw new Error("Failed to fetch reviews by user");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 📦 Submit a new review
export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (reviewData, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error("Failed to submit review");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ============================
// ✅ REVIEW SLICE
// ============================

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [], // Stores fetched or submitted reviews
    loading: false, // Indicates loading state
    error: null, // Stores any error message
  },
  reducers: {
    // 🔁 Clear review list and any error messages
    clearReviews: (state) => {
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🎯 FETCH REVIEWS BY VENUE
      .addCase(fetchReviewsByVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // 🎯 FETCH REVIEWS BY USER
      .addCase(fetchReviewsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ✅ SUBMIT A NEW REVIEW
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        // Add new review to the top of the list
        state.reviews.unshift(action.payload);
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// ✅ Export reducer actions and the reducer itself
export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
