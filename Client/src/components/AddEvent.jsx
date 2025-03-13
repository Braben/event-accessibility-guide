import React from "react";
import { useState } from "react";
const AddEvent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState(null);

  const [eventDate, setEventDate] = useState(null);
  const [venueCapacity, setVenueCapacity] = useState("");

  const accessibilityOptions = [
    "Balanced sound",
    "Earing aids",
    "Sign language translators",
    "Braille itinerary",
    "Wheel chair access",
    "Elevator",
    "Automatic doors",
    "Lighting considerations",
    "Close parking",
    "Large prints",
    "Service Animal Accommodation",
    "Sensory-Friendly Environment",
  ];

  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);

  const handleAccessibilityChange = (option) => {
    setAccessibilityFeatures(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if already selected
          : [...prev, option] // Add if not selected
    );
  };

  return (
    <div>
      <div className="mt-4 pl-4">
        <button
          className="btn btn-active btn-primary "
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Event
        </button>
        {isOpen && (
          <dialog
            className="modal flex place-content-center"
            open
            onClick={() => setIsOpen(false)}
          >
            <div
              className="modal-backdrop text-black modal-top mt-20 w-3/4 flex place-content-center "
              onClick={() => setIsOpen(false)}
            >
              <div
                className="modal-box  border-indigo-500 border-t-3 border-l-3"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className=" text-2xl font-semibold  mb-3 text-blue-700">
                  Add a new event
                </h3>

                <div className=" mx-auto bg-white rounded-md  ">
                  <form
                    action=""
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();

                      closeModal();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Enter Program Title"
                      className="input input-primary w-full"
                      required
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />

                    <input
                      type="file"
                      placeholder="Upload Image"
                      className="file-input file-input-primary w-full"
                      required
                      onChange={(e) => setEventImage(e.target.files[0])}
                    />

                    <input
                      type="datetime-local"
                      className="input input-primary w-full"
                      required
                      value={eventDate}
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const now = new Date();
                        if (selectedDate < now) {
                          alert("Please select a current or future date.");
                          return;
                        }
                        setEventDate(e.target.value);
                      }}
                    />

                    <input
                      type="text"
                      placeholder="Event Capacity"
                      className="input input-primary w-full"
                      required
                      value={venueCapacity}
                      min={10}
                      onChange={(e) => setVenueCapacity(e.target.value)}
                    />

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold">
                        Accessibility Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {accessibilityOptions.map((feature) => (
                          <label
                            key={feature}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={accessibilityFeatures.includes(feature)}
                              onChange={() =>
                                handleAccessibilityChange(feature)
                              }
                            />
                            <span>{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button type="submit" className="btn btn-secondary">
                        Submit
                      </button>
                      <button
                        className="btn btn-soft btn-accent"
                        onClick={() => setIsOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
