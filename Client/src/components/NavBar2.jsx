import { useContext, useEffect, useRef, useState } from "react";
import {
  IconButton,
  Collapse,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Menu, Xmark } from "iconoir-react";
import { TbPentagonFilled } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutBtn";
import { UserContext } from "../context/UserContext";

const NavBar2 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, userDetails, accessToken } = useContext(UserContext);
  const location = useLocation();
  console.log("usernav:", userDetails);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Function to handle smooth scrolling to sections or navigation
  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
    setOpen(false);
  };

  // Navigation links array for reusability
  const navLinks = [
    { name: "Venues", path: "/venues", action: () => navigate("/venues") },
    { name: "About", sectionId: "about", action: () => scrollToSection("about") },
    { name: "FAQs", sectionId: "faqs", action: () => scrollToSection("faqs") },
    { name: "Contact", sectionId: "contact", action: () => scrollToSection("contact") },
  ];

  return (
    <nav className="px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between sticky top-0 z-50 bg-white dark:bg-gray-900 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 max-w-full border-b border-gray-200 dark:border-gray-700 drop-shadow-sm">
      {/* Logo Section */}
      <div
        id="logo"
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
        aria-label="Go to homepage"
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <TbPentagonFilled className="text-4xl text-blue-700 dark:text-blue-400" />
          <span className="absolute inset-0 flex items-center justify-center text-white dark:text-gray-900 text-lg font-bold">
            V
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          VenueHubs
        </h2>
      </div>

      {/* Desktop Navigation */}
      <ul
        id="list"
        className="hidden md:flex items-center space-x-6 lg:space-x-8 font-bold text-sm lg:text-base"
      >
        {navLinks.map((link) => (
          <li
            key={link.name}
            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
            onClick={link.action}
            aria-label={`Go to ${link.name}`}
          >
            {link.name}
          </li>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div
        id="buttons"
        className="hidden md:flex items-center space-x-4 font-bold text-gray-900 dark:text-white"
      >
        {user && accessToken ? (
          <div className="flex items-center gap-3">
            <LogoutButton />
            <div
              className="w-10 h-10 bg-red-500 rounded-full overflow-hidden flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
              onClick={() => navigate("/organizer/dashboard")}
              aria-label="Go to user dashboard"
              title="Go to Dashboard"
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User avatar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <>
            <span
              className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400 text-sm lg:text-base"
              onClick={() => navigate("/login")}
              aria-label="Log in"
            >
              Login
            </span>
            <button
              className="bg-[#294c9f] text-white py-2 px-4 lg:px-5 rounded-full hover:bg-blue-800 dark:hover:bg-blue-500 transition text-sm lg:text-base"
              onClick={() => navigate("/signup")}
              aria-label="Sign up"
            >
              Sign up
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <IconButton
        size="sm"
        variant="ghost"
        color="secondary"
        onClick={() => setOpen(!open)}
        className="ml-auto grid md:hidden text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={open ? "Close menu" : "Open menu"}
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
        className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden"
      >
        <ul
          ref={menuRef}
          className="flex flex-col p-4 space-y-4 py-6 font-bold text-gray-900 dark:text-white text-sm sm:text-base"
        >
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
              onClick={() => {
                link.action();
                setOpen(false);
              }}
              aria-label={`Go to ${link.name}`}
            >
              {link.name}
            </li>
          ))}
          {user && accessToken ? (
            <li className="flex items-center gap-3">
              <LogoutButton />
              <div
                className="w-10 h-10 bg-red-500 rounded-full overflow-hidden flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
                onClick={() => {
                  navigate("/organizer/dashboard");
                  setOpen(false);
                }}
                aria-label="Go to user dashboard"
                title="Go to Dashboard"
              >
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </li>
          ) : (
            <>
              <li>
                <button
                  className="w-full bg-[#294c9f] text-white py-2 px-5 rounded-full hover:bg-blue-800 dark:hover:bg-blue-500 transition text-sm sm:text-base min-h-[44px]"
                  onClick={() => {
                    navigate("/signup");
                    setOpen(false);
                  }}
                  aria-label="Sign up"
                >
                  Sign up
                </button>
              </li>
              <li>
                <button
                  className="w-full bg-white dark:bg-gray-800 text-[#294c9f] dark:text-white py-2 px-5 rounded-full transition border border-[#294c9f] dark:border-white text-sm sm:text-base min-h-[44px]"
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  aria-label="Sign in"
                >
                  Sign in
                </button>
              </li>
            </>
          )}
        </ul>
      </Collapse>
    </nav>
  );
};

export default NavBar2;