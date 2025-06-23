import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, fetchEvents } from "../slicers/eventSlicer";
import { Pencil, Trash2 } from "lucide-react"; // Optional: Icon set

const EventList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `https://event-accessibility-guide.onrender.com/events/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to delete event:", errorData.message);
          return;
        }

        // If successful, update the Redux state
        dispatch(deleteEvent(id));
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Event List</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events created yet.</p>
      ) : (
        <div className="grid-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div className="">
                <div className="bg-slate-200">
                  <h3 className="text-lg font-semibold text-black">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500 mt-2 w-2/5 bg-gray-300 rounded-full py-2 px-3">
                    <strong>Venue:</strong> {event.venue?.venueName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 w-1.5/5 bg-gray-300 rounded-full py-2 px-3">
                    <strong>Start:</strong> {event.startDate}
                  </p>
                  <p className="text-sm text-gray-500 w-1.5/5 bg-gray-300 rounded-full py-2 px-3">
                    <strong>End:</strong> {event.endDate}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => onEdit(event)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
