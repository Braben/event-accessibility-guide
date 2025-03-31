import { configureStore } from "@reduxjs/toolkit";

import venuesReducer from "../slicers/venueSlicer";
export const store = configureStore({
  reducer: {
    venues: venuesReducer,
  },
});
