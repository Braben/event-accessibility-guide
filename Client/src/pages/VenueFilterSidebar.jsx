import { useEffect, useState } from "react";
import { CheckCircle, Circle, X } from "lucide-react";
// import { FaCheckCircle, FaCircle } from "react-icons/fa";

const VenueFilterSidebar = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
}) => {
  // State to track selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    accessibility: [],
    venueTypes: [],
  });

  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);

  useEffect(() => {
    const fetchAccessibilityFeatures = async () => {
      try {
        const res = await fetch(
          // "https://event-accessibility-guide.onrender.com/features"
          "https://event-accessibility-guide.onrender.com/features"
        );
        const data = await res.json();
        setAccessibilityFeatures(data);
      } catch (err) {
        console.error("Error fetching accessibility features:", err);
      }
    };

    fetchAccessibilityFeatures();
  }, []);

  useEffect(() => {
    if (initialFilters) {
      setSelectedFilters(initialFilters);
    }
  }, [initialFilters]);

  // Function to toggle selection
  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updatedCategory };
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-auto max-h-[90vh] w-1/3 max-w-md bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Filter Venues</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-grow">
          {/* Accessibility Features */}
          <h3 className="font-medium mb-2">Accessibility Features</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {accessibilityFeatures.map((feature) => {
              const category = feature.category;
              return (
                <button
                  key={feature.id}
                  onClick={() =>
                    toggleFilter("accessibility", feature.category)
                  }
                  className={`bg-[#E0E0E4] p-2 rounded flex items-center space-x-2 w-full ${
                    selectedFilters.accessibility.includes(category)
                      ? "border-blue-600 bg-blue-100"
                      : ""
                  }`}
                >
                  {selectedFilters.accessibility.includes(category) ? (
                    <CheckCircle size={16} className="text-blue-600" />
                  ) : (
                    <Circle size={16} />
                  )}
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

          {/* Venue Types */}
          <h3 className="font-medium mb-2">Venue Types</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              "Arts & Culture",
              "Sports & Recreation",
              "Education",
              "Entertainment",
            ].map((type) => (
              <button
                key={type}
                onClick={() => toggleFilter("venueTypes", type)}
                className={`bg-[#E0E0E4] p-2 rounded flex items-center space-x-2 w-full ${
                  selectedFilters.venueTypes.includes(type)
                    ? "border-blue-600 bg-blue-100"
                    : ""
                }`}
              >
                {selectedFilters.venueTypes.includes(type) ? (
                  <CheckCircle size={16} className="text-blue-600" />
                ) : (
                  <Circle size={16} />
                )}
                <span>{type}</span>
              </button>
            ))}
          </div>

          {/* Distance Slider */}
          <h3 className="font-medium mb-2">Distance</h3>
          <input
            type="range"
            min="1"
            max="50"
            defaultValue="32"
            className="w-full mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>1 mile</span>
            <span>32 miles</span>
            <span>50 miles</span>
          </div>
        </div>

        {/* Fixed Footer for Buttons */}
        <div className="p-4 border-t bg-white">
          <button
            className="w-full border py-2 rounded mb-2"
            onClick={() =>
              setSelectedFilters({ accessibility: [], venueTypes: [] })
            }
          >
            Reset Filters
          </button>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={() => {
              onApplyFilters(selectedFilters);
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default VenueFilterSidebar;
