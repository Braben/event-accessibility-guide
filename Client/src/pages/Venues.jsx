import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import VenueFilterSidebar from "./VenueFilterSidebar";
import VenueCard from "../components/VenueCard";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
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
        "https://event-accessibility-guide.onrender.com/api/v1/venues"
      );
      if (!response.ok) throw new Error("Failed to fetch venues");
      const data = await response.json();
      console.log("Filter response:", data);
      setVenues(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      let queryParams = `query=${searchQuery.trim()}`;

      if (appliedFilters.accessibility.length > 0) {
        queryParams += `&accessibility=${appliedFilters.accessibility.join(
          ","
        )}`;
      }

      if (appliedFilters.venueTypes.length > 0) {
        queryParams += `&venueTypes=${appliedFilters.venueTypes.join(",")}`;
      }

      queryParams += `&distance=${appliedFilters.distance}`;

      const response = await fetch(
        `https://event-accessibility-guide.onrender.com/api/v1/venues/search?${queryParams}`
      );
      const data = await response.json();
      setSearchVenues(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const applyFilters = async (filters) => {
    setAppliedFilters(filters);

    try {
      let queryParams = [];

      if (searchQuery.trim()) {
        queryParams.push(`query=${searchQuery.trim()}`);
      }

      if (filters.accessibility.length > 0) {
        const normalizedAccessibility = filters.accessibility.map((item) =>
          item.trim()
        );
        queryParams.push(
          `accessibility=${filters.accessibility
            .map(encodeURIComponent)
            .join(",")}`
        );
      }

      // if (filters.venueTypes.length > 0) {
      //   queryParams.push(
      //     `venueTypes=${filters.venueTypes.map(encodeURIComponent).join(",")}`
      //   );
      // }

      // queryParams.push(`distance=${filters.distance}`);

      const response = await fetch(
        `https://event-accessibility-guide.onrender.com/api/v1/venues/search?${queryParams.join(
          "&"
        )}`
      );

      if (!response.ok) throw new Error("Failed to fetch filtered venues");

      const data = await response.json();
      setSearchVenues(data);
    } catch (err) {
      console.error("Apply filters error:", err);
    }
  };

  const clearAllFilters = () => {
    setAppliedFilters({ accessibility: [], venueTypes: [], distance: 32 });
    setSearchVenues([]);
    setSearchQuery("");
  };

  const displayedVenues = searchVenues.length > 0 ? searchVenues : venues;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10 p-2 gap-2">
        <h1 className="text-5xl font-bold text-black">Accessible Venues</h1>
        <p className="text-xl text-black mt-2">
          Find venues with accessibility features for your next event venues
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-6">
        <form onSubmit={handleSearch} className="relative w-10/12 ">
          <button
            type="submit"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-700 text-xl"
            aria-label="Search"
          >
            <IoSearchSharp />
          </button>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venues (restaurants, parks, hotels...)"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 w-2/12 bg-blue-100 text-blue-700 px-5 py-3 rounded-lg shadow-sm border border-blue-300 hover:bg-blue-200 transition"
        >
          <CiFilter className="text-xl" />
          {appliedFilters.accessibility.length > 0 ||
          appliedFilters.venueTypes.length > 0
            ? `Filters (${
                appliedFilters.accessibility.length +
                appliedFilters.venueTypes.length
              })`
            : "Show Filters"}
        </button>
      </div>

      <VenueFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={applyFilters}
        initialFilters={appliedFilters}
      />

      {/* Applied Filters */}
      {(appliedFilters.accessibility.length > 0 ||
        appliedFilters.venueTypes.length > 0) && (
        <div className="flex flex-wrap gap-3 mb-6">
          {[...appliedFilters.accessibility, ...appliedFilters.venueTypes].map(
            (filter) => (
              <span
                key={filter}
                className="bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {filter}
                <button
                  className="font-bold"
                  onClick={() => {
                    setAppliedFilters((prev) => ({
                      ...prev,
                      accessibility: prev.accessibility.filter(
                        (f) => f !== filter
                      ),
                      venueTypes: prev.venueTypes.filter((f) => f !== filter),
                    }));
                  }}
                >
                  ×
                </button>
              </span>
            )
          )}
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-500 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Loading and Error */}
      {loading && (
        <div className="text-center text-gray-500">Loading venues...</div>
      )}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      {searchVenues.length > 0 ||
      appliedFilters.accessibility.length > 0 ||
      appliedFilters.venueTypes.length > 0 ? (
        <div>{`Showing ${displayedVenues.length} out of ${venues.length} venues`}</div>
      ) : (
        <div>{`Showing ${venues.length} venues`}</div>
      )}

      {/* Venue Cards Grid */}
      {!loading && displayedVenues.length > 0 ? (
        <div className="container mx-auto">
          <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
            {displayedVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      ) : (
        !loading && (
          <div className="text-center text-gray-500 mt-16">
            No venues found.
          </div>
        )
      )}
    </div>
  );
};

export default Venues;
