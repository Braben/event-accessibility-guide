import React from "react";
import { Input } from "@material-tailwind/react";
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
const Events = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mx-8 ">
      <div className="mt-4 ">
        <h3 className="font-bold text-2xl">Accessible Venues</h3>
        <p>Find venues with accessibility features for your next event </p>
      </div>
      <div className="flex items-center gap-3 ">
        <form
          className="bg-gray-200 h-12 w-4/5 gap-3 px-5 flex items-center justify-center border border-black border-opacity-40"
          // onSubmit={handleSearch}
        >
          <button type="submit" className="transition">
            <IoMdSearch className="size-8 font-bold text-gray-700" />
          </button>

          <Input
            className="border-transparent focus:ring-0 focus:outline-none focus:border-transparent focus-visible:ring-0 focus-visible:outline-none shadow-none placeholder:text-black  bg-transparent w-64 p-0"
            color="secondary"
            placeholder="Search venues"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent default form submission
                handleSearch(); // Call search function
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
        <div id="filters" className="h-48 w-full  bg-slate-950 mt-2"></div>
      )}
    </div>
  );
};

export default Events;
