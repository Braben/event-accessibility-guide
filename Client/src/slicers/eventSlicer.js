import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    updateEvent: (state, action) => {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? { ...event, ...action.payload } : event
      );
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { createEvent, deleteEvent, updateEvent, setEvents } =
  eventSlice.actions;

export default eventSlice.reducer;
