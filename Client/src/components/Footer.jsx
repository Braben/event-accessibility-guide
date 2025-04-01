import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { RxEnvelopeClosed } from "react-icons/rx";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] text-white py-13  h-[390px] mt-30">
      <div className="max-w-7xl mx-auto px-4 flex flex-col  md:flex-row items-center justify-between">
        {/* Logo */}

        <div className="flex flex-col mt-4 md:mt-0 ">
          <Link to="/" className="font-bold text-xl text-white">
            VenueHubs
          </Link>
          <p className="mt-6"> Making the world accessible one</p>
          <p>venue at a time</p>
          <div className="flex gap-7 mt-3 md:mt-4 ">
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
        <div className=" flex flex-col gap-4 mt-4 md:mt-0">
          <h3 className="text-[23px]">Quick Links</h3>
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/events" className="hover:text-indigo-600">
            Events
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-indigo-600">
            Contact Us
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col gap-4 mt-4 md:mt-0">
          <h3 className="text-[21px]">Contact</h3>
          <p className="flex gap-2">
            <BsTelephone className="mt-1" />
            +233 245480345
          </p>
          <div className="flex gap-2">
            <RxEnvelopeClosed className="mt-1" />
            <a
              href="Info@venuehubs.com"
              className="text-white hover:text-blue-600 cursor-pointer"
            >
              Info@venuehubs.com
            </a>
          </div>
          <p className="flex gap-2 cursor-pointer">
            <MdOutlineLocationOn className="mt-1 text-2xl " />
            Accra,Ghana
          </p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-blue-500 mt-20 "></div>
      <p className="flex gap-2  ml-10 mt-5">
        <FaRegCopyright className="mt-1" />
        2025 AccessMap.All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
