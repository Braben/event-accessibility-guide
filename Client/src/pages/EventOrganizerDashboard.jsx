import Sidebar from "../components/Sidebar";
import React from "react";
import { Link } from "react-router-dom";
import { TbPentagonFilled } from "react-icons/tb";
import { Card, List, Typography, Chip, Input } from "@material-tailwind/react";
import { FiHome, FiSettings } from "react-icons/fi";
import { TbPentagonPlus } from "react-icons/tb";
import { CgMenuBoxed } from "react-icons/cg";
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import AddVenue from "../components/AddVenue";
import profilePicture from "../Assets/unsplash_Ba1eGcAFj5w.png";
import VenueLists from "../components/VenueLists";

const EventOrganizerDashboard = () => {
  const sideBarLinks = [
    {
      icon: FiHome,
      title: "Dashboard",
      href: "/organizer/dashboard",
    },
    {
      icon: TbPentagonPlus,
      title: "Accessibility",
      href: "/organizer/accessibility",
    },
    {
      icon: CgMenuBoxed,
      title: "Venue",
      href: "/organizer/venue",
    },
    {
      icon: FiSettings,
      title: "Settings",
      href: "/organizer/settings",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-12 min-h-screen">
        <div
          id="side-bar"
          className="hidden md:block md:col-span-3 lg:col-span-2 bg-black text-white h-full p-2"
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <div className="flex items-center space-x-3">
                <div className="relative inline-block">
                  <TbPentagonFilled className="text-6xl text-blue-700" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    V
                  </span>
                </div>
                <h2 className="text-xl font-semibold">VenueHubs</h2>
              </div>
              <div className="mt-8 text-sm">
                <h2 className="text-white ml-2">Main</h2>
                <List className="space-y-2 min-w-[40px]">
                  {sideBarLinks.map(({ icon: Icon, title, href }) => (
                    <Link key={title} to={href}>
                      <List.Item className="py-2 hover:bg-blue-600">
                        <List.ItemStart className="flex items-center text-white">
                          <Icon className="mr-3 " />
                          {title}
                        </List.ItemStart>
                      </List.Item>
                    </Link>
                  ))}
                </List>
              </div>
            </div>
            <hr className="border-t-slate-700 mb-4 mx-2" />
            <div className="mt-auto bg-[#3b3b3b] rounded-lg flex items-center p-2 gap-2">
              {/* Profile Image */}
              <img
                src={profilePicture}
                alt="Profile"
                className="size-10 rounded-full"
              />

              {/* Name and Role - This should take available space */}
              <div className="flex-grow">
                <h4 className="text-[12px] text-white">John Mahama</h4>
                <h4 className="text-[9px] text-gray-400">Event Organizer</h4>
              </div>

              {/* Person Icon - Pushed to the right */}
              <MdOutlinePersonOutline className="text-white text-xl" />
            </div>
          </div>
        </div>
        <div
          id="main-content"
          className="col-span-12 md:col-span-9 lg:col-span-10 bg-[#e0e0e4]"
        >
          <div className="flex flex-col">
            <div className="flex justify-between bg-white p-5 font-">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <div className="relative">
                <IoNotificationsOutline className="size-6" />
                <GoDotFill className="absolute -top-1 right-0 text-red-600 text-bold" />
              </div>
            </div>
            <div className="flex flex-col m-6">
              <div className="bg-[#294c9f] text-white rounded-xl p-3 h-24">
                <h2 className="text-xl font-bold tracking-wide">
                  Welcome back, John!
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
                    <AddVenue />
                  </div>
                </div>
                <hr className="-mx-3 my-3 border-secondary " />
                <div>
                  <div className="w-1/2 bg-[#e0e0e4]  border border-slate-400 rounded-lg flex ">
                    <Input
                      placeholder="Search..."
                      type="text"
                      className="bg-transparent border-none focus:ring-0 focus:outline-none text-black px-2 py-3 hover:border-none"
                    >
                      <button className=" absolute inset-y-0 left-2 flex items-center">
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
      </div>
    </div>
  );
};

export default EventOrganizerDashboard;
