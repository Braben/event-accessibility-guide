import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteVenue, setVenues, updateVenue } from "../slicers/venueSlicer";
import UpdateVenue from "./UpdateVenue";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
const API_BASE_URL =
  "https://event-accessibility-guide-production.up.railway.app";

const TOTAL_ACCESSIBILITY_FEATURES = 20; // Change this based on your system

const VenueLists = () => {
  const { userDetails } = useContext(UserContext);
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.venues);
  console.log(venues);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/venues`);
        dispatch(setVenues(res.data));
      } catch (err) {
        console.error("Failed to fetch venues", err);
      }
    };

    fetchVenues();
  }, [dispatch]);
  const userVenues = venues.filter((venue) => venue.userId === userDetails.id);

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

  const handleDelete = async (venueId) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/venues/${venueId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast('Venue deleted successfully');
          // Dispatch the deleteVenue action to remove the venue from state
          dispatch(deleteVenue(venueId));
        } else {
          alert('Failed to delete venue');
        }
      } catch (error) {
        alert('Error deleting venue: ' + error.message);
      }
    }
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
  
    // Create a string of feature categories
    const categories = features.map(feature => feature.category);
  
    // Check if we need to slice and combine or just return the listed features
    if (categories.length > 2) {
      const firstTwo = categories.slice(0, 2).join(", ");
      const remaining = categories.length - 2;
      return `${firstTwo} +${remaining} more`;
    }
  
    return categories.join(", ");
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
              userVenues.map((venue) => {
                const { score, color } = getAccessibilityData(
                  venue.accessibilityFeatures
                );
                return (
                  <div key={venue.id} className="table-row border-b">
                    <div className="table-cell px-4 py-2">
                      {venue.name}
                    </div>
                    <div className="table-cell px-4 py-2">
                      {venue.address}
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
                        onClick={() => handleDelete(venue.id)}
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
