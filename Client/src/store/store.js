import { configureStore } from "@reduxjs/toolkit";

import venuesReducer from "../slicers/venueSlicer";
import eventsReducer from "../slicers/eventSlicer";
export const store = configureStore({
  reducer: {
    venues: venuesReducer,
    events: eventsReducer,
  },
});
