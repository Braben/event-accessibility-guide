import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Input } from "@material-tailwind/react";
import { IoSearchSharp } from "react-icons/io5";
import { NotificationBell } from "../components/NotificationSystem";
import EventLists from "../components/EventList";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar"; // Import the shared sidebar component

// Loading Spinner Component
const LoadingSpinner = ({ size = "w-8 h-8", text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className={`${size} animate-spin`}>
      <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-blue-500"></div>
    </div>
    <p className="mt-4 text-gray-500 text-sm sm:text-base">{text}</p>
  </div>
);

// Full Page Loading Component for Dashboard
const DashboardLoading = () => (
  <div className="flex h-screen">
    {/* Sidebar placeholder */}
    <div className="w-[250px] bg-gray-100 animate-pulse hidden lg:block">
      <div className="p-4 space-y-4">
        <div className="h-8 bg-gray-300 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>

    {/* Main Content Loading */}
    <div className="flex-1 lg:ml-[250px] ml-0 flex flex-col bg-[#e0e0e4]">
      {/* Header Loading */}
      <div className="bg-white p-4 lg:p-5 shadow-sm animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-32"></div>
          <div className="h-8 bg-gray-300 rounded-full w-8"></div>
        </div>
      </div>

      {/* Content Loading */}
      <div className="p-4 lg:p-6 flex-1">
        <LoadingSpinner 
          size="w-12 h-12" 
          text="Loading your dashboard..." 
        />
      </div>
    </div>
  </div>
);

const EventOrganizerDashboard = () => {
  const { user, userDetails, loading } = useContext(UserContext);
  const events = useSelector((state) => state.events.events) || [];

  if (loading) {
    return <DashboardLoading />;
  }

  if (!user || !userDetails) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#e0e0e4]">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Required</h2>
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
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