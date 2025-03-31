import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { Button } from "@material-tailwind/react";
const Venues = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    accessibility: "",
  });
  const [venues, setVenues] = useState([]);

  //function to handle search/filter
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!filters.location) {
      console.error("Please enter a location/ event.");
      return;
    }
    try {
      // fetch api from backend
      const response = await fetch(
        `https://event-accessibility-guide-production.up.railway.app/api/venues/search?query=${filters.location}&accessibility=${filters.accessibility}`
      );
      const data = await response.json();
      console.log(data);
      // store filtered data
      setVenues(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mx-8 ">
      <div className="mt-4 ">
        <h3 className="font-bold text-2xl">Accessible Venues</h3>
        <p>Find venues with accessibility features for your next event </p>
      </div>
      <div className="flex items-center gap-3 ">
        <form
          className="bg-gray-200 h-12 w-4/5 gap-3 px-5 flex items-center justify-center border border-black border-opacity-40"
          onSubmit={handleSearch}
        >
          <button type="submit" className="transition">
            <IoMdSearch className="size-8 font-bold text-gray-700" />
          </button>

          <Input
            className="border-transparent focus:ring-0 focus:outline-none focus:border-transparent focus-visible:ring-0 focus-visible:outline-none shadow-none placeholder:text-black  bg-transparent w-64 p-0"
            color="secondary"
            placeholder="Search venues"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent default form submission
                handleSearch(e); // Call search function
              }
            }}
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </form>

        <button
          className="btn btn-outline border-black w-1/4  border-opacity-40  focus:outline-none focus:ring-2 hover:bg-gray-300  h-12"
          style={{
            outline: "none",
            boxShadow: "none",
          }}
          onClick={() => setShowFilters(!showFilters)}
        >
          <CiFilter className="size-6  stroke-[1]" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div id="filters" className="h-48 w-full  bg-slate-300 mt-2">
          <label>Location:</label>
          <Input
            className="text-white"
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
          <label>Accessibility Features:</label>
          <select
            value={filters.accessibility}
            onChange={(e) =>
              setFilters({ ...filters, accessibility: e.target.value })
            }
          >
            <option value="">Select All</option>
            <option value="wheelchair accessible">Wheelchair Accessible</option>
            <option value="accessible seating">Accessible Seating</option>
            <option value="visual aids">Visual Aids</option>
            <option value="braille">Braille</option>
            <option value="sign language interpreters">
              Sign Language Interpreters
            </option>
            <option value="hearing aids">Hearing Aids</option>
            <option value="speech-to-text assistants">
              Speech-to-Text Assistants
            </option>
            <option value="deafness support">Deafness Support</option>
            <option value="wheelchair-accessible restrooms">
              Wheelchair-Accessible Restrooms
            </option>
            <option value="noisy environments">Noisy Environments</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Venues;
