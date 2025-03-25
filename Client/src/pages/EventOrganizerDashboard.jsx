import Sidebar from "../components/Sidebar";
import React from "react";
import { FiSettings } from "react-icons/fi";
import AddVenue from "../components/AddVenue";

const EventOrganizerDashboard = () => {
  return (
    <div>
      <div className="flex justify-between mx-10 mt-4">
        <div>
          <Sidebar />
        </div>
        <div>
          <FiSettings className="size-8" />
        </div>
      </div>
      <hr className="-mx-3 my-3 border-secondary" />

      <div className="m-4 mx-20">
        <h4 className="font-bold text-2xl">Dashboard</h4>

        <div className=" gap-20 grid grid-cols-2 text-white mt-2">
          <div className="bg-slate-500 h-24 p-4">
            <h5>Total venues</h5>
            <p className="text-2xl font-bold">10</p>
          </div>
          <div className="bg-slate-500 p-4">
            <h5>Accessibility Score</h5>
            <p className="text-2xl font-bold">87%</p>
          </div>
        </div>
      </div>

      <div className="h-96 mx-20 bg-slate-500 text-white">
        <div className="grid grid-cols-3 gap-3 p-3">
          <div className="col-span-2" id="your_venues">
            <h4 className="font-bold  text-2xl">Your Venues</h4>
            <p>Manage your venue accessibility information</p>
          </div>
          <div
            id="add_venue "
            className="h-full bg-white flex items-center place-content-center"
          >
            <AddVenue className="flex items-stretch" />
          </div>
        </div>
        <hr className="-mx-3 my-3 border-white bg-white" />
      </div>
    </div>
  );
};

export default EventOrganizerDashboard;
