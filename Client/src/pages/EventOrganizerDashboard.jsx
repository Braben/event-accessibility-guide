import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Input } from "@material-tailwind/react";
import { IoSearchSharp } from "react-icons/io5";
import { NotificationBell } from "../components/NotificationSystem";
import EventLists from "../components/EventList";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar"; // Import the shared sidebar component

const EventOrganizerDashboard = () => {
  const { user, userDetails, loading } = useContext(UserContext);
  const events = useSelector((state) => state.events.events) || [];

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user || !userDetails) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Use the shared sidebar component with dashboard as active */}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[250px] ml-0 flex flex-col bg-[#e0e0e4]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 lg:p-5 shadow-sm gap-4 sm:gap-0">
          <h2 className="text-xl lg:text-2xl font-bold mt-12 sm:mt-0 lg:mt-0">
            Dashboard
          </h2>
          <div className="relative self-end sm:self-auto">
            <NotificationBell />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 flex-1 overflow-auto">
          {/* Welcome Card */}
          <div className="bg-[#294c9f] text-white rounded-xl p-4 lg:p-6 min-h-[120px] lg:h-24">
            <h2 className="text-lg lg:text-xl font-bold tracking-wide">
              Welcome back, {userDetails.firstname}!
            </h2>
            <p className="text-sm mt-2 leading-relaxed">
              Your venues are performing well. You have 3 new accessibility
              reviews this week.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 lg:p-6 flex flex-col">
              <p className="text-sm text-gray-600">Total Venues</p>
              <p className="mt-2 lg:mt-3 text-2xl lg:text-3xl font-bold text-gray-900">
                {events.length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 lg:p-6 flex flex-col">
              <p className="text-sm text-gray-600">Accessibility Score</p>
              <p className="mt-2 lg:mt-3 text-2xl lg:text-3xl font-bold text-gray-900">
                87%
              </p>
            </div>
          </div>

          {/* Venues Section */}
          <div className="bg-white mt-6 lg:mt-7 rounded-xl p-4 lg:p-6 min-h-[400px] lg:h-96">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div id="venue-texts">
                <h1 className="font-bold text-lg lg:text-xl">Your Venues</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your venue accessibility information
                </p>
              </div>
              <div id="button">{/* Button placeholder if needed */}</div>
            </div>

            <hr className="-mx-4 lg:-mx-6 my-4 lg:my-3 border-gray-200" />

            {/* Search Bar */}
            <div className="mb-4">
              <div className="w-full sm:w-1/2 lg:w-1/3 bg-white border border-slate-400 rounded-lg flex relative">
                <button className="absolute inset-y-0 left-2 flex items-center z-10">
                  <IoSearchSharp className="w-5 h-5 lg:w-6 lg:h-6 text-[#294c9f]" />
                </button>
                <Input
                  placeholder="Search..."
                  type="text"
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-black pl-10 pr-4 py-3 w-full hover:border-none"
                />
              </div>
            </div>

            <hr className="-mx-4 lg:-mx-6 my-4 lg:my-3 border-gray-200" />

            {/* Event Lists */}
            <div className="overflow-x-auto">
              <EventLists />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerDashboard;
