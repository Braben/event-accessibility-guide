import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, deleteEvent } from "../slicers/eventSlicer";
import { Edit, Trash } from "lucide-react";

const EventLists = ({ onEdit }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events) || [];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Function to get accessibility color
  const getAccessibilityColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-400";
    return "bg-red-500";
  };

  // Format features for display
  const formatFeatures = (features) => {
    if (!features || features.length === 0) return [];

    const mainFeatures = features.slice(0, 2);
    const remaining = features.length - 2;

    if (remaining > 0) {
      return [...mainFeatures, `+${remaining} more`];
    }
    return mainFeatures;
  };

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (eventToDelete) {
      dispatch(deleteEvent(eventToDelete.id));
      setShowDeleteModal(false);
      setEventToDelete(null);
    }
  };

  // Open delete modal
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  // Delete modal component
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 lg:p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Delete Event</h3>
        <p className="mb-6 text-sm lg:text-base">
          Are you sure you want to delete "
          {eventToDelete?.title || eventToDelete?.title}"? This action cannot be
          undone.
        </p>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm lg:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm lg:text-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Venue
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Accessibility
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Features
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {Array.isArray(events) && events.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 bg-gray-50 rounded-md"
                >
                  <p className="text-gray-500">No events available</p>
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const accessibilityScore =
                  event.accessibility ||
                  Math.round(
                    ((event.accessibilityFeatures?.length || 0) / 8) * 100
                  );

                const features = formatFeatures(event.accessibilityFeatures);

                return (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm">{event.title}</td>
                    <td className="py-4 px-4 text-sm">
                      {event.venue?.name || "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getAccessibilityColor(
                              accessibilityScore
                            )}`}
                            style={{ width: `${accessibilityScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">
                          {accessibilityScore}%{event.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col space-y-1">
                        {features.map((feature, index) => (
                          <span key={index} className="text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800"
                          onClick={() => onEdit(event)}
                          aria-label="Edit Event"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteClick(event)}
                          aria-label="Delete Event"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {Array.isArray(events) && events.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <p className="text-gray-500">No events available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const accessibilityScore =
                event.accessibility ||
                Math.round(
                  ((event.accessibilityFeatures?.length || 0) / 8) * 100
                );

              const features = formatFeatures(event.accessibilityFeatures);

              return (
                <div
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  {/* Event Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {event.venue?.venueName || "N/A"}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-2">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
                        onClick={() => onEdit(event)}
                        aria-label="Edit Event"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                        onClick={() => handleDeleteClick(event)}
                        aria-label="Delete Event"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Accessibility Score */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">
                        Accessibility
                      </span>
                      <span className="text-xs font-medium text-gray-900">
                        {accessibilityScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getAccessibilityColor(
                          accessibilityScore
                        )}`}
                        style={{ width: `${accessibilityScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Features */}
                  {features.length > 0 && (
                    <div>
                      <span className="text-xs text-gray-600 block mb-2">
                        Features
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
};

export default EventLists;
