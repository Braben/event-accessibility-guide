import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-white">EventsHub</Link>

        {/* Navigation Links */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/events" className="hover:text-indigo-600">Events</Link>
          <Link to="/about" className="hover:text-indigo-600">About Us</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact Us</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-400">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

