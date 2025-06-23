import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await fetch(
    "https://event-accessibility-guide.onrender.com/events"
  );
  const data = await res.json();
  return data.data; // ✅ Assuming your backend response is { message, data }
});

const initialState = {
  events: [],
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { createEvent, deleteEvent, updateEvent, setEvents } =
  eventSlice.actions;

export default eventSlice.reducer;
