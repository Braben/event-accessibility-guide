import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteVenue } from "../slicers/venueSlicer";
import { Edit, Trash } from 'lucide-react';

const VenueLists = ({ onEditVenue }) => {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.venues) || [];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

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
    if (venueToDelete) {
      dispatch(deleteVenue(venueToDelete.id));
      setShowDeleteModal(false);
      setVenueToDelete(null);
    }
  };

  // Open delete modal
  const handleDeleteClick = (venue) => {
    setVenueToDelete(venue);
    setShowDeleteModal(true);
  };

  // Delete modal component
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Delete Venue</h3>
        <p className="mb-6">
          Are you sure you want to delete "{venueToDelete?.venueName || venueToDelete?.name}"? 
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  // If no venues are available
  if (venues.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">No venues available</p>
      </div>
    );
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Address</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Accessibility</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Features</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {venues.map((venue) => {
            // Calculate accessibility score if not already present
            const accessibilityScore = venue.accessibility || 
              Math.round(((venue.accessibilityFeatures?.length || 0) / 8) * 100);
            
            const features = formatFeatures(venue.accessibilityFeatures);
            
            return (
              <tr key={venue.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm">{venue.venueName || venue.name}</td>
                <td className="py-4 px-4 text-sm">{venue.venueAddress || venue.address}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getAccessibilityColor(accessibilityScore)}`}
                        style={{ width: `${accessibilityScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{accessibilityScore}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col space-y-1">
                    {features.map((feature, index) => (
                      <span key={index} className="text-sm">{feature}</span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="p-1 text-blue-600 hover:text-blue-800"
                      onClick={() => onEditVenue(venue)}
                      aria-label="Edit venue"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteClick(venue)}
                      aria-label="Delete venue"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Delete confirmation modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
};

export default VenueLists;