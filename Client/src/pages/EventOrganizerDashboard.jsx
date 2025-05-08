import React, { useContext } from "react";
import { Input } from "@material-tailwind/react";
import { IoSearchSharp } from "react-icons/io5";
import { NotificationBell } from '../components/NotificationSystem';
import VenueLists from "../components/VenueLists";
import { UserContext } from "../context/UserContext";
import Sidebar from '../components/Sidebar'; // Import the shared sidebar component

const EventOrganizerDashboard = () => {
  const { user, userDetails, loading } = useContext(UserContext);
  
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
      <div className="flex-1 ml-[250px] flex flex-col bg-[#e0e0e4]">
        {/* Header */}
        <div className="flex justify-between bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="relative">
            <NotificationBell />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="bg-[#294c9f] text-white rounded-xl p-3 h-24">
            <h2 className="text-xl font-bold tracking-wide">
              Welcome back, {userDetails.firstname}!
            </h2>
            <p className="text-sm mt-2">
              Your venues are performing well. You have 3 new accessibility
              reviews this <br /> week.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="w-full md:w-1/2 bg-white rounded-xl p-4 flex flex-col">
              <p className="text-sm">Total Venues</p>
              <p className="mt-3 text-xl font-bold">12</p>
            </div>
            <div className="w-full md:w-1/2 bg-white rounded-xl p-4 flex flex-col">
              <p className="text-sm">Accessibility Score</p>
              <p className="mt-3 text-xl font-bold">87%</p>
            </div>
          </div>

          <div className="bg-white h-96 mt-7 rounded-xl p-3">
            <div className="flex justify-between">
              <div id="venue-texts">
                <h1 className="font-bold text-xl">Your Venues</h1>
                <p className="text-sm">
                  Manage your venue accessibility information
                </p>
              </div>
              <div id="button">
                {/* Button placeholder if needed */}
              </div>
            </div>
            
            <hr className="-mx-3 my-3 border-secondary" />
            
            <div>
              <div className="w-1/2 bg-white border border-slate-400 rounded-lg flex">
                <Input
                  placeholder="Search..."
                  type="text"
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-black px-2 py-3 hover:border-none"
                >
                  <button className="absolute inset-y-0 left-2 flex items-center">
                    <IoSearchSharp className="size-6 text-[#294c9f]" />
                  </button>
                  <Input.Icon
                    as="button"
                    className="data-[placement=start]:left-px cursor-pointer"
                  ></Input.Icon>
                </Input>
              </div>
            </div>
            
            <hr className="-mx-3 my-3 border-secondary" />
            
            <VenueLists />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerDashboard;