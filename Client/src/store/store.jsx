import { configureStore } from "@reduxjs/toolkit";

import venuesReducer from "../slicers/VenueSlicer";
export const store = configureStore({
  reducer: {
    venues: venuesReducer,
  },
});
