import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../context/UserContext";

import { createEvent, updateEvent } from "../slicers/eventSlicer";

const AddEvents = ({ event = null, isEditing = false, onCancel }) => {
  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);

  //events items
  const { userDetails } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venueId, setVenueId] = useState("");
  const [photos, setPhotos] = useState([]);
  const [fetchedVenues, setFetchedVenues] = useState([]);

  const dispatch = useDispatch();
  // dispatch(createEvent(eventData));

  useEffect(() => {
    if (isEditing && event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setStartDate(event.startDate?.slice(0, 10) || "");
      setEndDate(event.endDate?.slice(0, 10) || "");
      setVenueId(event.venueId || "");
      setPhotos(event.photos || []);
    }
  }, [isEditing, event]);

  // Fetch venues from the server
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://event-accessibility-guide.onrender.com/venues"
        );
        const data = await response.json();
        // console.log("Fetched venues data:", data); // ✅ add this
        setFetchedVenues(data || []);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };

    fetchVenues();
  }, []);

  // Create a new event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      startDate,
      endDate,
      venueId,
      photos,
      createdBy: userDetails?.id,
    };

    try {
      if (isEditing) {
        // If editing, still use your manual PUT
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
        //  Use only Redux thunk to create new event
        await dispatch(createEvent(eventData));
        onCancel();
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const accessibilityOptions = [
    "Ground Level Entry",
    "Wide Doorways",
    "Service Animals Welcome",
    "Reserved Accessible Seating",
    "Wheelchair Ramps",
    "Elevators",
    "Accessible Restrooms",
    "Hearing Loops",
  ];

  const handleAccessibilityChange = (option) => {
    setAccessibilityFeatures((prev) => {
      const updated = prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];
      console.log("Updated features:", updated); // ✅ add this
      return updated;
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">
          {isEditing ? "Edit Event" : "Add Event"}
        </h2>
        <p className="text-gray-600 text-sm">
          {isEditing
            ? "Manage and refresh your event details"
            : "Create a new accessible event venue"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="eventTitle"
            className="block text-sm font-medium mb-1"
          >
            Event Name
          </label>
          <input
            id="eventTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event name"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-medium mb-1">
            Venue
          </label>
          <div className="relative">
            <select
              id="venue"
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 pr-8 appearance-none"
              required
            >
              <option value="" disabled>
                Select venue
              </option>
              {fetchedVenues.map((venue) => (
                <option className=" w-4/6" key={venue.id} value={venue.id}>
                  {venue.name || venue.venueName}
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
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the venue and event details"
            className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
          />
        </div>

        {/* startdate and enddate */}
        <div className="flex space-x-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-1/2 border p-2 rounded"
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-1/2 border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {accessibilityOptions.map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600"
                  checked={accessibilityFeatures.includes(feature)}
                  onChange={() => handleAccessibilityChange(feature)}
                />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black border border-black rounded-md text-white hover:bg-gray-800"
          >
            {isEditing ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
