import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { createVenue, updateVenue } from "../slicers/venueSlicer";

const AddVenue = ({ venue = null, isEditing = false, onCancel }) => {
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueDescription, setVenueDescription] = useState("");
  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);
  
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.venues);
  
  // Initialize form with venue data if editing
  useEffect(() => {
    if (isEditing && venue) {
      setVenueName(venue.venueName || venue.name || "");
      setVenueAddress(venue.venueAddress || venue.address || "");
      setVenueDescription(venue.venueDescription || "");
      setAccessibilityFeatures(venue.accessibilityFeatures || []);
    }
  }, [isEditing, venue]);

  const accessibilityOptions = [
    "Ground Level Entry",
    "Wide Doorways",
    "Service Animals Welcome",
    "Reserved Accessible Seating",
    "Wheelchair Ramps",
    "Elevators",
    "Accessible Restrooms",
    "Hearing Loops"
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
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const newVenue = {
  //     name: venueName,
  //     venueCapacity: parseInt(venueCapacity, 10),
  //     photos: [],
  //     address: venueAddress,
  //     description: venueDescription,
  //     accessibilityFeatures,
  //     userId: userDetails.id, // Replace with logged-in user ID
  //   };
  //   console.log("newvenue", newVenue)

  //   try {
  //     const res = await fetch(`${API_BASE_URL}/venues`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newVenue),
  //     });

  //     if (res.ok) {
  //       console.log(res);
  //       const newVenue = await res.json();
  //       console.log("venue sent to slice:", newVenue)
  //       dispatch(createVenue(newVenue)); // Dispatch the venue to the Redux store

  //       // Clear the form
  //       setVenueName("");
  //       setVenueCapacity(0);
  //       setVenueAddress("");
  //       setVenueDescription("");
  //       setAccessibilityFeatures([]);
  //       setIsOpen(false);
  //     } else {
  //       const error = await res.json();
  //       alert(error.error); // Handle error response
  //     }
  //   } catch (error) {
  //     console.error("Failed to save venue:", error);
  //     alert("Failed to save venue");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && venue) {
      const updatedVenue = {
        ...venue,
        venueName,
        venueAddress,
        venueDescription,
        accessibilityFeatures,
      };
      dispatch(updateVenue(updatedVenue));
    } else {
      const newVenue = {
        id: uuidv4(),
        venueName,
        venueAddress,
        venueDescription,
        accessibilityFeatures,
        accessibility: Math.round((accessibilityFeatures.length / accessibilityOptions.length) * 100),
      };
      dispatch(createVenue(newVenue));
    }

    // Clear inputs and go back to list
    setVenueName("");
    setVenueAddress("");
    setVenueDescription("");
    setAccessibilityFeatures([]);
    onCancel();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">{isEditing ? "Edit Event" : "Add Event"}</h2>
        <p className="text-gray-600 text-sm">
          {isEditing ? "Manage and refresh your event details" : "Create a new accessible event venue"}
        </p>
      </div>
        
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="venueName" className="block text-sm font-medium mb-1">
            Event Name
          </label>
          <input
            id="venueName"
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Enter event name"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="venueAddress" className="block text-sm font-medium mb-1">
            Venue
          </label>
          <div className="relative">
            <select
              id="venueAddress"
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 pr-8 appearance-none"
              required
            >
              <option value="" disabled>Select venue</option>
              <option value="Accra mall">Accra mall</option>
              <option value="Achimota Mall">Achimota Mall</option>
              <option value="West Hills Mall">West Hills Mall</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="venueDescription" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="venueDescription"
            value={venueDescription}
            onChange={(e) => setVenueDescription(e.target.value)}
            placeholder="Describe the venue and event details"
            className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
          />
        </div>
        
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {accessibilityOptions.map((feature) => (
              <label
                key={feature}
                className="flex items-center space-x-2"
              >
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

export default AddVenue;