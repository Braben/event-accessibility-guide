import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { RxEnvelopeClosed } from "react-icons/rx";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] text-white pt-10 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-y-10">
        {/* Logo and Social */}
        <div className="flex flex-col">
          <Link to="/" className="font-bold text-xl text-white">
            VenueHubs
          </Link>
          <p className="mt-4">Making the world accessible one</p>
          <p>venue at a time</p>
          <div className="flex gap-6 mt-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-pink-400"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <Link to="/events" className="hover:text-indigo-400">Events</Link>
          <Link to="/about" className="hover:text-indigo-400">About Us</Link>
          <Link to="/contact" className="hover:text-indigo-400">Contact Us</Link>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="flex items-start gap-2">
            <BsTelephone className="mt-1" />
            +233 245480345
          </p>
          <div className="flex items-start gap-2">
            <RxEnvelopeClosed className="mt-1" />
            <a
              href="mailto:Info@venuehubs.com"
              className="hover:text-blue-400"
            >
              Info@venuehubs.com
            </a>
          </div>
          <p className="flex items-start gap-2">
            <MdOutlineLocationOn className="text-2xl" />
            Accra, Ghana
          </p>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-[1px] w-full bg-blue-500 mt-10"></div>

      {/* Footer Bottom Text */}
      <p className="flex items-center gap-2 mt-4 text-sm text-center justify-center">
        <FaRegCopyright />
        2025 AccessMap. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
