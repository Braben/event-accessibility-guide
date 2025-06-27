import { configureStore } from "@reduxjs/toolkit";

import venuesReducer from "../slicers/venueSlicer";
import eventsReducer from "../slicers/eventSlicer";
import reviewReducer from "../slicers/reviewSlicer";
export const store = configureStore({
  reducer: {
    venues: venuesReducer,
    events: eventsReducer,
    reviews: reviewReducer,
  },
});
