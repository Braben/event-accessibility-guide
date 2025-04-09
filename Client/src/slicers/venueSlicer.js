import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venues: [],
};

const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {
    createVenue: (state, action) => {
      state.venues.push(action.payload);
    },
    deleteVenue: (state, action) => {
      state.venues = state.venues.filter(
        (venue) => venue.id !== action.payload
      );
    },
    updateVenue: (state, action) => {
      state.venues = state.venues.map((venue) =>
        venue.id === action.payload.id ? { ...venue, ...action.payload } : venue
      );
    },
    setVenues: (state, action) => {
      state.venues = action.payload; 
    },
  },
});

export const { createVenue, deleteVenue, updateVenue, setVenues } = venueSlice.actions;

export default venueSlice.reducer;
