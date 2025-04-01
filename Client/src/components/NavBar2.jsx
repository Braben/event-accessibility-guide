import { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Collapse,
  Drawer,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Menu, Xmark } from "iconoir-react";
import { TbPentagonFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const NavBar2 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false); // Close the menu when clicking outside
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="px-6 md:px-8 h-16 flex items-center justify-between sticky top-0 z-50 bg-white dark:bg-gray-900 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 max-w-full border-b border-gray-200 dark:border-gray-700 drop-shadow-sm">
      {/* Logo Section */}
      <div
        id="logo"
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <TbPentagonFilled className="text-4xl text-blue-700 dark:text-blue-400" />
          <span className="absolute inset-0 flex items-center justify-center text-white dark:text-gray-900 text-lg font-bold">
            V
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          VenueHubs
        </h2>
      </div>

      {/* Desktop Navigation */}
      <ul
        id="list"
        className="hidden md:flex items-center space-x-8 font-bold text-gray-900 dark:text-white"
      >
        <li
          className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
          onClick={() => navigate("/venues")}
        >
          Venues
        </li>
        <li
          className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
          onClick={() => navigate("/about")}
        >
          About
        </li>
        <li
          className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
          onClick={() => navigate("/faqs")}
        >
          FAQs
        </li>
        <li
          className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
          onClick={() => navigate("/contact")}
        >
          Contact
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div
        id="buttons"
        className="hidden md:flex items-center space-x-4 font-bold text-gray-900 dark:text-white"
      >
        <span
          className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
        <button
          className="bg-[#294c9f] text-white py-2 px-5 rounded-full hover:bg-blue-800 dark:hover:bg-blue-500 transition"
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
        className="ml-auto grid lg:hidden text-gray-900 dark:text-white sm:focus:border-none"
      >
        {open ? (
          <Xmark className="h-6 w-6 stroke-[2.5]" />
        ) : (
          <Menu className="h-6 w-6 stroke-[2.5]" />
        )}
      </IconButton>

      {/* Mobile Dropdown Menu */}
      <Collapse
        open={open}
        className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden dropdown menu"
      >
        <ul
          ref={menuRef}
          className="flex flex-col p-4 space-y-4 py-4 font-bold text-gray-900 dark:text-white"
        >
          <li
            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
            onClick={() => navigate("/venues")}
          >
            Venues
          </li>
          <li
            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
            onClick={() => navigate("/faqs")}
          >
            FAQs
          </li>
          <li
            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
          <button
            className="bg-[#294c9f] text-white py-2 px-5 rounded-full hover:bg-blue-800 dark:hover:bg-blue-500 transition"
            onClick={() => {
              navigate("/signup");
              setOpen(false);
            }}
          >
            Sign up
          </button>
          <button
            className="bg-white dark:bg-gray-800 text-[#294c9f] dark:text-white py-2 px-5 rounded-full transition border border-[#294c9f] dark:border-white"
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
          >
            Sign in
          </button>
        </ul>
      </Collapse>
    </nav>
  );
};

export default NavBar2;
