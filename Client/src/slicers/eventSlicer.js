import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch events
const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await fetch(
    "https://event-accessibility-guide.onrender.com/events"
  );
  const data = await res.json();
  return data.data;
});

// Async thunk to delete an event
const deleteEvent = createAsyncThunk("events/deleteEvent", async (eventId) => {
  const res = await fetch(
    `https://event-accessibility-guide.onrender.com/events/${eventId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete event");
  }

  return eventId;
});

// Async thunk to create a new event
const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    const response = await fetch(
      "https://event-accessibility-guide.onrender.com/events",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create event");
    }

    return data;
  }
);

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
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
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
      });
  },
});

// ⛔️ DO NOT export createEvent here
export const { updateEvent, setEvents } = eventSlice.actions;
export { createEvent, fetchEvents, deleteEvent }; // ✅ Export thunks separately

export default eventSlice.reducer;
