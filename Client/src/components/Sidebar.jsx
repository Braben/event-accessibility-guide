import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TbPentagonFilled } from "react-icons/tb";
import { FiHome, FiSettings, FiMenu, FiX } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import { Pin } from "iconoir-react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { ProfileSection, EditProfileModal } from "./ProfileSection";

const Sidebar = ({ activePage }) => {
  const { user, userDetails } = useContext(UserContext);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Add this line - you were missing this!
  const navigate = useNavigate();

  // Profile data for the form
  const profileData = {
    fullName: userDetails
      ? `${userDetails.firstname} ${userDetails.lastname}`
      : "User",
    email: userDetails?.email || "john.mahama@example.com",
    phone: userDetails?.phone || "+233 24647544",
    organization: userDetails?.organization || "AccessPro Events",
    bio:
      userDetails?.bio ||
      "Event organizer with 5+ years of experience in creating accessible venues for all attendees.",
    profileImage: userDetails?.profileInfo || null,
  };

  const handleProfileSave = (formData) => {
    console.log("Saving profile data:", formData);
    setShowEditProfile(false);
    setShowProfileSection(true);
  };

  const sideBarLinks = [
    {
      icon: FiHome,
      title: "Dashboard",
      href: "/organizer/dashboard",
      active: activePage === "dashboard",
    },
    {
      icon: Pin,
      title: "Accessibility",
      href: "/organizer/accessibility",
      active: activePage === "accessibility",
    },
    // {
    //   icon: CgMenuBoxed,
    //   title: "Event/Venue",
    //   href: "/organizer/events",
    //   active: activePage === "events",
    // },
    {
      icon: CgMenuBoxed,
      title: "Events",
      href: "/organizer/event",
      active: activePage === "event",
    },
    {
      icon: FiSettings,
      title: "Settings",
      href: "/organizer/settings",
      active: activePage === "settings",
    },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1A1A1A] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <FiX className="text-xl" />
        ) : (
          <FiMenu className="text-xl" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          w-[250px] bg-[#1A1A1A] text-white fixed left-0 top-0 bottom-0 flex flex-col overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 p-4 mb-6 cursor-pointer" 
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 navigate("/");
               }}>
            <div className="relative inline-block">
              <TbPentagonFilled className="text-5xl text-blue-700 pointer-events-none" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold pointer-events-none">
                V
              </span>
            </div>
            <h2 className="text-xl font-semibold">VenueHubs</h2>
          </div>

          {/* Navigation */}
          <div className="px-4 flex-grow">
            <h2 className="text-gray-400 text-sm font-medium mb-2 px-4">
              Main
            </h2>
            <nav>
              {sideBarLinks.map(({ icon: Icon, title, href, active }) => (
                <Link
                  key={title}
                  to={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                    active ? "bg-blue-600" : "hover:bg-gray-800"
                  }`}
                  onClick={closeMobileMenu} // Close mobile menu when link is clicked
                >
                  <Icon className="text-lg" />
                  <span>{title}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 mt-auto">
            <div
              className="bg-[#3b3b3b] rounded-lg flex items-center p-3 gap-3 cursor-pointer hover:bg-[#4a4a4a]"
              onClick={() => {
                setShowProfileSection(true);
                closeMobileMenu(); // Close mobile menu when profile is clicked
              }}
            >
              {userDetails && userDetails.profileInfo ? (
                <img
                  src={userDetails.profileInfo}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <MdOutlinePersonOutline className="text-white text-xl" />
                </div>
              )}
              <div className="flex-grow">
                <h4 className="text-sm text-white">
                  {userDetails
                    ? `${userDetails.firstname} ${userDetails.lastname}`
                    : "User"}
                </h4>
                <h4 className="text-xs text-gray-400">
                  {userDetails && userDetails.role === "ADMIN"
                    ? "EVENT ORGANIZER"
                    : "USER"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section Modal */}
      {showProfileSection && (
        <ProfileSection
          onClose={() => setShowProfileSection(false)}
          onEditClick={() => {
            setShowProfileSection(false);
            setShowEditProfile(true);
          }}
        />
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          onClose={() => {
            setShowEditProfile(false);
            setShowProfileSection(true);
          }}
          onSave={handleProfileSave}
          initialData={profileData}
        />
      )}
    </>
  );
};

export default Sidebar;
