import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteVenue } from "../slicers/venueSlicer";
import UpdateVenue from "./UpdateVenue";
import { FaEdit, FaTrash } from "react-icons/fa";

const TOTAL_ACCESSIBILITY_FEATURES = 20; // Change this based on your system

const VenueLists = () => {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.venues);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  // Open modal with selected venue
  const handleEdit = (venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedVenue(null);
  };

  // Function to get accessibility score and progress bar color
  const getAccessibilityData = (selectedFeatures) => {
    const count = selectedFeatures?.length || 0;
    const score = Math.round((count / TOTAL_ACCESSIBILITY_FEATURES) * 100);

    let color = "bg-red-500"; // Default: Red (≤ 50%)
    if (score >= 60 && score <= 80) color = "bg-yellow-500"; // Yellow (60-80%)
    if (score >= 90) color = "bg-green-500"; // Green (≥ 90%)

    return { score, color };
  };

  // Function to format accessibility features display
  const formatFeatures = (features) => {
    if (!features || features.length === 0) return "None";

    const firstTwo = features.slice(0, 2).join(", ");
    const remaining = features.length - 2;

    return remaining > 0 ? `${firstTwo} +${remaining} more` : firstTwo;
  };

  return (
    <div className="container  -mt-3 -ml-3  ">
      <div className="overflow-x-auto">
        <div className="table w-full  border-gray-200">
          {/* Table Headers */}
          <div className="table-header-group bg-[#e0e0e4]">
            <div className="table-row">
              <div className="table-cell px-4 py-2 font-semibold">Name</div>
              <div className="table-cell px-4 py-2 font-semibold">Address</div>
              <div className="table-cell px-4 py-2 font-semibold">Capacity</div>
              <div className="table-cell px-4 py-2 font-semibold">
                Accessibility
              </div>
              <div className="table-cell px-4 py-2 font-semibold">Features</div>
              <div className="table-cell px-4 py-2 font-semibold">Action</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="table-row-group">
            {venues.length === 0 ? (
              <div className="table-row">
                <div className="table-cell text-center p-4" colSpan="6">
                  No venues available
                </div>
              </div>
            ) : (
              venues.map((venue) => {
                const { score, color } = getAccessibilityData(
                  venue.accessibilityFeatures
                );
                return (
                  <div key={venue.id} className="table-row border-b">
                    <div className="table-cell px-4 py-2">
                      {venue.venueName}
                    </div>
                    <div className="table-cell px-4 py-2">
                      {venue.venueAddress}
                    </div>
                    <div className="table-cell px-4 py-2">
                      {venue.venueCapacity}
                    </div>

                    {/* Accessibility Score */}
                    <div className="table-cell px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{score}%</span>
                        <div className="w-24 h-2 bg-gray-300 rounded">
                          <div
                            className={`h-2 rounded ${color}`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="table-cell px-4 py-2">
                      {formatFeatures(venue.accessibilityFeatures)}
                    </div>

                    {/* Actions */}
                    <div className="table-cell px-4 py-2 gap-3">
                      <button
                        onClick={() => handleEdit(venue)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => dispatch(deleteVenue(venue.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Update Venue Modal */}
      {isModalOpen && (
        <UpdateVenue
          isOpen={isModalOpen}
          onClose={handleClose}
          venue={selectedVenue}
        />
      )}
    </div>
  );
};

export default VenueLists;
