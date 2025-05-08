import { createSlice } from "@reduxjs/toolkit";

// Initial venue data
const initialState = {
  venues: [
    {
      id: "1",
      venueName: "Little Havana",
      venueAddress: "Accra mall",
      venueDescription: "A vibrant venue with excellent acoustics",
      accessibilityFeatures: ["Wheelchair Ramps", "Elevators", "Accessible Restrooms", "Wide Doorways"],
      accessibility: 90
    },
    {
      id: "2",
      venueName: "Afrochella",
      venueAddress: "Achimota Mall",
      venueDescription: "Large outdoor space with modern facilities",
      accessibilityFeatures: ["Wheelchair Ramps", "Elevators", "Ground Level Entry"],
      accessibility: 70
    },
    {
      id: "3",
      venueName: "Cocktail Party",
      venueAddress: "West Hills Mall",
      venueDescription: "Elegant space for sophisticated gatherings",
      accessibilityFeatures: ["Wheelchair Ramps", "Elevators", "Reserved Accessible Seating"],
      accessibility: 50
    },
    {
      id: "4",
      venueName: "Cocktail Party",
      venueAddress: "West Hills Mall",
      venueDescription: "Intimate setting with versatile space options",
      accessibilityFeatures: ["Wheelchair Ramps", "Elevators", "Accessible Restrooms"],
      accessibility: 50
    }
  ],
};

const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {
    createVenue: (state, action) => {
      state.venues.push(action.payload);
    },
    updateVenue: (state, action) => {
      const updatedVenue = action.payload;
      const index = state.venues.findIndex((venue) => venue.id === updatedVenue.id);
      
      if (index !== -1) {
        state.venues[index] = updatedVenue;
      }
    },
    deleteVenue: (state, action) => {
      const venueId = action.payload;
      state.venues = state.venues.filter((venue) => venue.id !== venueId);
    },
  },
});

export const { createVenue, updateVenue, deleteVenue } = venueSlice.actions;
export default venueSlice.reducer;