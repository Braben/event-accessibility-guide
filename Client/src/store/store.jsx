import { configureStore } from "@reduxjs/toolkit";

import venuesReducer from "../Slicers/venueSlicer";
export const store = configureStore({
  reducer: {
    venues: venuesReducer,
  },
});
