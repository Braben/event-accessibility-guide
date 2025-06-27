import { useEffect, useState } from "react";
import { CheckCircle, Circle, X } from "lucide-react";

const VenueFilterSidebar = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
}) => {
  const [selectedFilters, setSelectedFilters] = useState({
    accessibility: [],
    venueTypes: [],
    distance: 32, // Include distance in state to track slider value
  });

  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);

  useEffect(() => {
    async function fetchAccessibilityFeatures() {
      try {
        const res = await fetch(
          "https://event-accessibility-guide.onrender.com/features"
        );
        if (!res.ok) throw new Error("Failed to fetch accessibility features");
        const data = await res.json();
        setAccessibilityFeatures(data);
      } catch (err) {
        console.error("Error fetching accessibility features:", err);
      }
    }
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

  // Handle distance slider change
  const handleDistanceChange = (e) => {
    setSelectedFilters((prev) => ({
      ...prev,
      distance: parseInt(e.target.value),
    }));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 md:w-96 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">Filter Venues</h2>
          <button
            onClick={onClose}
            className="p-2"
            aria-label="Close filter sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-grow">
          {/* Accessibility Features */}
          <h3 className="font-medium text-sm sm:text-base mb-2">
            Accessibility Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {accessibilityFeatures.map((feature) => {
              const category = feature.category;
              return (
                <button
                  key={feature.id}
                  onClick={() => toggleFilter("accessibility", category)}
                  className={`bg-gray-100 p-3 rounded flex items-center space-x-2 w-full min-h-[44px] text-sm sm:text-base ${
                    selectedFilters.accessibility.includes(category)
                      ? "border-blue-600 bg-blue-100"
                      : ""
                  }`}
                  aria-pressed={selectedFilters.accessibility.includes(category)}
                >
                  {selectedFilters.accessibility.includes(category) ? (
                    <CheckCircle size={16} className="text-blue-600" />
                  ) : (
                    <Circle size={16} />
                  )}
                  <span className="truncate">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Venue Types */}
          <h3 className="font-medium text-sm sm:text-base mb-2">Venue Types</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {[
              "Arts & Culture",
              "Sports & Recreation",
              "Education",
              "Entertainment",
            ].map((type) => (
              <button
                key={type}
                onClick={() => toggleFilter("venueTypes", type)}
                className={`bg-gray-100 p-3 rounded flex items-center space-x-2 w-full min-h-[44px] text-sm sm:text-base ${
                  selectedFilters.venueTypes.includes(type)
                    ? "border-blue-600 bg-blue-100"
                    : ""
                }`}
                aria-pressed={selectedFilters.venueTypes.includes(type)}
              >
                {selectedFilters.venueTypes.includes(type) ? (
                  <CheckCircle size={16} className="text-blue-600" />
                ) : (
                  <Circle size={16} />
                )}
                <span className="truncate">{type}</span>
              </button>
            ))}
          </div>

          {/* Distance Slider */}
          <h3 className="font-medium text-sm sm:text-base mb-2">Distance</h3>
          <input
            type="range"
            min="1"
            max="50"
            value={selectedFilters.distance}
            onChange={handleDistanceChange}
            className="w-full mb-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            aria-label="Distance filter"
          />
          <div className="flex justify-between text-xs sm:text-sm text-gray-600">
            <span>1 mile</span>
            <span>{selectedFilters.distance} miles</span>
            <span>50 miles</span>
          </div>
        </div>

        {/* Fixed Footer for Buttons */}
        <div className="p-4 border-t bg-white flex flex-col gap-2">
          <button
            className="w-full border py-3 rounded text-sm sm:text-base min-h-[44px]"
            onClick={() =>
              setSelectedFilters({
                accessibility: [],
                venueTypes: [],
                distance: 32,
              })
            }
            aria-label="Reset filters"
          >
            Reset Filters
          </button>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded text-sm sm:text-base min-h-[44px]"
            onClick={() => {
              onApplyFilters(selectedFilters);
              onClose();
            }}
            aria-label="Apply filters"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default VenueFilterSidebar;