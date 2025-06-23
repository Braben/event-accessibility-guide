import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../context/UserContext";

import { createEvent, updateEvent } from "../slicers/eventSlicer";

const AddEvent = ({ event = null, isEditing = false, onCancel }) => {
  const { userDetails } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venueId, setVenueId] = useState("");
  const [photos, setPhotos] = useState([]);
  const [fetchedVenues, setFetchedVenues] = useState([]);

  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      startDate,
      endDate,
      venueId,
      photos,
      createdBy: userDetails?.id, // make sure you include this
    };

    try {
      let response;
      if (isEditing) {
        // 🔁 Update existing event
        response = await fetch(
          `https://event-accessibility-guide.onrender.com/events/${event.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...eventData, id: event.id }),
          }
        );
      } else {
        // ➕ Create new event
        response = await fetch(
          "https://event-accessibility-guide.onrender.com/events",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          }
        );
      }

      const data = await response.json();

      if (response.ok) {
        if (isEditing) {
          dispatch(updateEvent(data));
        } else {
          dispatch(createEvent(data));
        }
        onCancel(); // close form
      } else {
        console.error("Error from server:", data.message);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">
        {isEditing ? "Edit Event" : "Add New Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-24 resize-none"
        />

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
        <div className="flex justify-between items-center space-x-4">
          <select
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            className="w-full md:w-[250px] border border-gray-300 p-2 rounded-md bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="w-[100px] " value="">
              Select Venue
            </option>
            {fetchedVenues.map((venue) => (
              <option className=" w-4/6" key={venue.id} value={venue.id}>
                {venue.name || venue.venueName}
              </option>
            ))}
          </select>

          {/* Future: Add file upload for photos */}
          <input
            type="file"
            multiple
            onChange={(e) => setPhotos([...e.target.files])}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            {isEditing ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
