import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { RxEnvelopeClosed } from "react-icons/rx";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle smooth scrolling to sections
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
  };



  return (
    <footer className="bg-[#1E1E1E] text-white pt-8 pb-6 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row md:items-start md:justify-between gap-y-8">
        {/* Logo and Social */}
        <div className="flex flex-col">
          <div
            onClick={(e) => {
              e.preventDefault();
              console.log("Logo clicked, navigating to homepage");
              navigate("/");
            }}
            className="flex items-center gap-3 cursor-pointer group"
            aria-label="Go to homepage"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate("/");
              }
            }}
          >
            <div className="w-8 h-8 bg-blue-500 flex items-center justify-center flex-shrink-0" style={{clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'}}>
              <span className="text-white font-bold text-lg leading-none">V</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-white group-hover:text-blue-400 transition-colors">
              VenueHubs
            </span>
          </div>
          <p className="mt-3 text-sm sm:text-base">
            Making the world accessible one venue at a time
          </p>
          <div className="flex gap-4 sm:gap-6 mt-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl hover:text-blue-400"
              aria-label="Visit our Twitter page"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl hover:text-blue-600"
              aria-label="Visit our Facebook page"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl hover:text-pink-400"
              aria-label="Visit our Instagram page"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Quick Links</h3>
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-indigo-400 text-sm sm:text-base"
            aria-label="Go to homepage"
          >
            Home
          </div>
          <div
            onClick={() => navigate("/events")}
            className="cursor-pointer hover:text-indigo-400 text-sm sm:text-base"
            aria-label="Go to events page"
          >
            Events
          </div>
          <div
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-indigo-400 text-sm sm:text-base"
            aria-label="Go to About Us section"
          >
            About Us
          </div>
          <div
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-indigo-400 text-sm sm:text-base"
            aria-label="Go to Contact Us section"
          >
            Contact Us
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Contact</h3>
          <p className="flex items-start gap-2 text-sm sm:text-base">
            <BsTelephone className="mt-1 text-base sm:text-lg" />
            +233 245480345
          </p>
          <div className="flex items-start gap-2 text-sm sm:text-base">
            <RxEnvelopeClosed className="mt-1 text-base sm:text-lg" />
            <a
              href="mailto:Info@venuehubs.com"
              className="hover:text-blue-400"
              aria-label="Email us at Info@venuehubs.com"
            >
              Info@venuehubs.com
            </a>
          </div>
          <p className="flex items-start gap-2 text-sm sm:text-base">
            <MdOutlineLocationOn className="text-lg sm:text-2xl" />
            Accra, Ghana
          </p>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-[1px] w-full bg-blue-500 mt-8"></div>

      {/* Footer Bottom Text */}
      <p className="flex items-center gap-2 mt-4 text-xs sm:text-sm text-center justify-center">
        <FaRegCopyright className="text-base" />
        2025 AccessMap. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;