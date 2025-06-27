import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../context/UserContext";
import { createEvent, updateEvent } from "../slicers/eventSlicer";

const AddEvents = ({ event = null, isEditing = false, onCancel }) => {
  // const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);
  const { userDetails } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [venueId, setVenueId] = useState("");
  const [photos, setPhotos] = useState([]);
  const [fetchedVenues, setFetchedVenues] = useState([]);
  const [accessibilityOptions, setAccessibilityOptions] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events) || [];

  useEffect(() => {
    if (isEditing && event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setStartDate(event.startDate ? new Date(event.startDate) : null);
      setEndDate(event.endDate ? new Date(event.endDate) : null);
      setVenueId(event.venueId || "");
      setPhotos(event.photos || []);
    }
  }, [isEditing, event]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://event-accessibility-guide.onrender.com/venues"
        );
        const data = await response.json();
        setFetchedVenues(data || []);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };

    fetchVenues();
  }, []);

  // const accessibilityOptions = [
  //   "Ground Level Entry",
  //   "Wide Doorways",
  //   "Service Animals Welcome",
  //   "Reserved Accessible Seating",
  //   "Wheelchair Ramps",
  //   "Elevators",
  //   "Accessible Restrooms",
  //   "Hearing Loops",
  // ];

  //features to be added
  useEffect(() => {
    const accessibilityOptions = async () => {
      try {
        const response = await fetch(
          "https://event-accessibility-guide.onrender.com/features"
        );
        const data = await response.json();
        setAccessibilityOptions(data || []);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };

    accessibilityOptions();
  }, []);
  console.log(accessibilityOptions);

  // accessibility features
  const handleAccessibilityChange = (category) => {
    setSelectedFeatures((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // venue events date and time validation
  const isOverlapping = (newStart, newEnd, events) => {
    return events.some((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return (
        event.venueId === venueId && // same venue
        ((newStart >= start && newStart < end) || // starts in another event
          (newEnd > start && newEnd <= end) || // ends in another event
          (newStart <= start && newEnd >= end)) // completely overlaps
      );
    });
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please select both start and end date/time.");
      return;
    }
    if (dayjs(endDate).isBefore(dayjs(startDate))) {
      alert("End date must be after start date.");
      return;
    }
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    const filteredEvents = isEditing
      ? events.filter((e) => e.id !== event.id)
      : events;

    if (isOverlapping(newStart, newEnd, filteredEvents)) {
      alert("This event overlaps with an existing event at the same venue.");
      return;
    }

    const formattedStart = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    const formattedEnd = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");

    const eventData = {
      title,
      description,
      startDate: formattedStart,
      endDate: formattedEnd,
      venueId,
      venue: fetchedVenues.find((venue) => venue.id === venueId),
      photos,
      createdBy: userDetails?.id,
    };

    try {
      if (isEditing) {
        const response = await fetch(
          `https://event-accessibility-guide.onrender.com/events/${event.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...eventData, id: event.id }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(updateEvent(data));
          onCancel();
        } else {
          console.error("Error from server:", data.message);
        }
      } else {
        await dispatch(createEvent(eventData));
        onCancel();
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // const handleAccessibilityChange = (option) => {
  //   setAccessibilityOptions((prev) =>
  //     prev.includes(option)
  //       ? prev.filter((item) => item !== item)
  //       : [...prev, option]
  //   );
  // };

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow max-w-2xl mx-auto min-h-0 max-h-[calc(100vh-100px)] overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <div className="border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold">
          {isEditing ? "Edit Event" : "Add Event"}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          {isEditing
            ? "Manage and refresh your event details"
            : "Create a new accessible event venue"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label
            htmlFor="eventTitle"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            Event Name
          </label>
          <input
            id="eventTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event name"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="venue"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            Venue
          </label>
          <div className="relative">
            <select
              id="venue"
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 pr-8 appearance-none text-sm"
              required
            >
              <option value="" disabled>
                Select venue
              </option>
              {fetchedVenues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name || venue.venueName || "Unnamed Venue"}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the venue and event details"
            className="w-full border border-gray-300 rounded-md p-2 h-20 sm:h-24 resize-none text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="w-full">
            <label
              htmlFor="startDate"
              className="block text-xs sm:text-sm font-medium mb-1"
            >
              Start Date & Time
            </label>
            {/* <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border p-2 rounded-md text-sm"
              required
            /> */}
            {/* <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border p-2 rounded-md text-sm"
              required
            /> */}

            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd h:mm aa"
                minDate={new Date()}
                className="w-full border p-2 rounded-md text-sm"
                placeholderText="Select start date and time"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="endDate"
              className="block text-xs sm:text-sm font-medium mb-1"
            >
              End Date & Time
            </label>
            {/* <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border p-2 rounded-md text-sm"
              required
            /> */}
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd h:mm aa"
              minDate={startDate || new Date()}
              className="w-full border p-2 rounded-md text-sm"
              placeholderText="Select end date and time"
            />
          </div>
        </div>
        {/* accsessibility */}
        <div className="mt-3 sm:mt-4">
          <h3 className="text-xs sm:text-sm font-medium mb-2">
            Accessibility Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {accessibilityOptions.map((feature) => (
              <label key={feature.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  // checked={accessibilityOptions.includes(feature)}
                  // onChange={() => handleAccessibilityChange(feature)}
                  checked={selectedFeatures.includes(feature.category)}
                  onChange={() => handleAccessibilityChange(feature.category)}
                  aria-label={feature.category}
                />
                <span className="text-xs sm:text-sm">{feature.category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-3 sm:pt-4 border-t mt-3 sm:mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 py-1 sm:py-2 bg-black border border-black rounded-md text-white hover:bg-gray-800 w-full sm:w-auto text-xs sm:text-sm"
          >
            {isEditing ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
