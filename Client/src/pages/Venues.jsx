import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import VenueFilterSidebar from "./VenueFilterSidebar";
import VenueCard from "../components/VenueCard";
import { toast } from "react-hot-toast";

// Loading Spinner Component
const LoadingSpinner = ({ size = "w-8 h-8", text = "Loading venues..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className={`${size} animate-spin`}>
      <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-blue-500"></div>
    </div>
    <p className="mt-4 text-gray-500 text-sm sm:text-base">{text}</p>
  </div>
);

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVenues, setSearchVenues] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    accessibility: [],
    venueTypes: [],
    distance: 32,
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchVenues([]);
    }
  }, [searchQuery]);

  const fetchVenues = async () => {
    try {
      const response = await fetch(
        "https://event-accessibility-guide.onrender.com/venues"
      );
      if (!response.ok) throw new Error("Failed to fetch venues");
      const data = await response.json();
      console.log("Filter response:", data);
      setVenues(data);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setSearchLoading(true);
    try {
      let queryParams = `query=${encodeURIComponent(searchQuery.trim())}`;

      if (appliedFilters.accessibility.length > 0) {
        queryParams += `&accessibility=${appliedFilters.accessibility
          .map(encodeURIComponent)
          .join(",")}`;
      }

      if (appliedFilters.venueTypes.length > 0) {
        queryParams += `&venueTypes=${appliedFilters.venueTypes
          .map(encodeURIComponent)
          .join(",")}`;
      }

      queryParams += `&distance=${appliedFilters.distance}`;

      const response = await fetch(
        `https://event-accessibility-guide.onrender.com/api/venues/search?${queryParams}`
      );
      const data = await response.json();
      setSearchVenues(data);
      toast.success("Search completed successfully");
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Failed to search venues");
    } finally {
      setSearchLoading(false);
    }
  };

  const applyFilters = async (filters) => {
    setAppliedFilters(filters);
    setSearchLoading(true);

    try {
      let queryParams = [];

      if (searchQuery.trim()) {
        queryParams.push(`query=${encodeURIComponent(searchQuery.trim())}`);
      }

      if (filters.accessibility.length > 0) {
        queryParams.push(
          `accessibility=${filters.accessibility
            .map(encodeURIComponent)
            .join(",")}`
        );
      }

      if (filters.venueTypes.length > 0) {
        queryParams.push(
          `venueTypes=${filters.venueTypes.map(encodeURIComponent).join(",")}`
        );
      }

      queryParams.push(`distance=${filters.distance}`);

      const response = await fetch(
        `https://event-accessibility-guide.onrender.com/api/venues/search?${queryParams.join(
          "&"
        )}`
      );

      if (!response.ok) throw new Error("Failed to fetch filtered venues");

      const data = await response.json();
      setSearchVenues(data);
      toast.success("Filters applied successfully");
    } catch (err) {
      console.error("Apply filters error:", err);
      toast.error("Failed to apply filters");
    } finally {
      setSearchLoading(false);
    }
  };

  const clearAllFilters = () => {
    setAppliedFilters({ accessibility: [], venueTypes: [], distance: 32 });
    setSearchVenues([]);
    setSearchQuery("");
    toast.success("Filters cleared");
  };

  const displayedVenues = searchVenues.length > 0 ? searchVenues : venues;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Adjusted padding for mobile */}
      <div className="mb-8 p-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
          Accessible Venues
        </h1>
        <p className="text-lg sm:text-xl text-black mt-2">
          Find venues with accessibility features for your next event
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <form onSubmit={handleSearch} className="relative flex-1 md:min-w-0">
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700 text-lg sm:text-xl"
            aria-label="Search"
            disabled={searchLoading}
          >
            {searchLoading ? (
              <div className="w-5 h-5 animate-spin">
                <div className="h-full w-full rounded-full border-2 border-gray-300 border-t-blue-500"></div>
              </div>
            ) : (
              <IoSearchSharp />
            )}
          </button>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venues (restaurants, parks, hotels...)"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            disabled={searchLoading}
          />
        </form>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-center gap-2 w-full md:w-32 lg:w-40 bg-blue-100 text-blue-700 px-4 py-3 rounded-lg shadow-sm border border-blue-300 hover:bg-blue-200 transition min-h-[44px]"
          aria-label="Show Filters"
          disabled={searchLoading}
        >
          <CiFilter className="text-lg sm:text-xl" />
          {appliedFilters.accessibility.length > 0 ||
          appliedFilters.venueTypes.length > 0 ? (
            <span className="truncate">
              Filters (
              {appliedFilters.accessibility.length +
                appliedFilters.venueTypes.length}
              )
            </span>
          ) : (
            "Show Filters"
          )}
        </button>
      </div>

      {/* Filter Sidebar */}
      <VenueFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={applyFilters}
        initialFilters={appliedFilters}
      />

      {/* Applied Filters */}
      {(appliedFilters.accessibility.length > 0 ||
        appliedFilters.venueTypes.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[...appliedFilters.accessibility, ...appliedFilters.venueTypes].map(
            (filter) => (
              <span
                key={filter}
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-2"
              >
                {filter}
                <button
                  className="font-bold text-sm"
                  onClick={() => {
                    setAppliedFilters((prev) => ({
                      ...prev,
                      accessibility: prev.accessibility.filter(
                        (f) => f !== filter
                      ),
                      venueTypes: prev.venueTypes.filter((f) => f !== filter),
                    }));
                  }}
                  aria-label={`Remove ${filter} filter`}
                >
                  ×
                </button>
              </span>
            )
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs sm:text-sm text-red-500 underline ml-2 min-h-[44px] flex items-center"
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Loading and Error */}
      {loading && <LoadingSpinner />}
      
      {searchLoading && !loading && (
        <LoadingSpinner 
          size="w-6 h-6" 
          text="Searching venues..." 
        />
      )}
      
      {error && (
        <div className="text-center text-red-500 text-sm sm:text-base">
          Error: {error}
        </div>
      )}

      {/* Venue Count */}
      {!loading && !searchLoading && (
        <>
          {searchVenues.length > 0 ||
          appliedFilters.accessibility.length > 0 ||
          appliedFilters.venueTypes.length > 0 ? (
            <div className="text-sm sm:text-base mb-4">{`Showing ${displayedVenues.length} out of ${venues.length} venues`}</div>
          ) : (
            <div className="text-sm sm:text-base mb-4">{`Showing ${venues.length} venues`}</div>
          )}
        </>
      )}

      {/* Venue Cards Grid */}
      {!loading && !searchLoading && displayedVenues.length > 0 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {displayedVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      ) : (
        !loading && !searchLoading && (
          <div className="text-center text-gray-500 text-sm sm:text-base mt-16">
            No venues found.
          </div>
        )
      )}
    </div>
  );
};

export default Venues;
