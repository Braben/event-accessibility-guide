import React, { useState } from "react";
import { IconButton, Collapse } from "@material-tailwind/react";
import { Menu, Xmark } from "iconoir-react";
import { TbPentagonFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const NavBar2 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-6 md:px-8 h-16 flex items-center justify-between sticky top-0 z-50 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 max-w-full border-b border-gray-100 drop-shadow-sm">
      {/* Logo Section */}
      <div
        id="logo"
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <TbPentagonFilled className="text-4xl text-blue-700" />
          <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
            V
          </span>
        </div>
        <h2 className="text-xl font-semibold">VenueHubs</h2>
      </div>

      {/* Desktop Navigation */}
      <ul id="list" className="hidden md:flex items-center space-x-8 font-bold">
        <li
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/venues")}
        >
          Venues
        </li>
        <li
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/about")}
        >
          About
        </li>
        <li
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/faqs")}
        >
          FAQs
        </li>
        <li
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/contact")}
        >
          Contact
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div
        id="buttons"
        className="hidden md:flex items-center space-x-4 font-bold"
      >
        <span
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
        <button
          className="bg-[#294c9f] text-white py-2 px-5 rounded-full hover:bg-blue-800 transition"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <IconButton
        size="sm"
        variant="ghost"
        color="secondary"
        onClick={() => setOpen(!open)}
        className="ml-auto grid lg:hidden"
      >
        {open ? <Xmark className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </IconButton>

      {/* Mobile Dropdown Menu */}
      <Collapse
        open={open}
        className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden"
      >
        <ul className="flex flex-col p-4 space-y-4 py-4 font-bold">
          <li
            className="cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/venues")}
          >
            Venues
          </li>
          <li
            className="cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/faqs")}
          >
            FAQs
          </li>
          <li
            className="cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
          <span
            className="cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
          <button
            className="bg-[#294c9f] text-white py-2 px-5 rounded-full hover:bg-blue-800 transition"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </ul>
      </Collapse>
    </nav>
  );
};

export default NavBar2;
