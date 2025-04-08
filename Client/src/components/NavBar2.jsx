import { useEffect, useRef, useState } from "react";
import { Menu, Xmark } from "iconoir-react";
import { TbPentagonFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from '../context/NotificationContext';

const NavBar2 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Use the notification context
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  // Check if current route is venue-related or profile
  const isVenueOrProfile = ['/venue', '/venuedetails1', '/venuedetails2', '/venuedetails3', '/venuedetails4', '/profile'].some(
    path => location.pathname === path || 
           (path === '/venue' && location.pathname.includes('venue'))
  );

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

  // Close notifications when clicking outside - only add listener when notifications are shown
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showNotifications]);

  const navItems = [
    { label: "Venues", path: "/venue" },
    { label: "About", path: "/about" },
    { label: "FAQs", path: "/faqs" },
    { label: "Contact", path: "/contact" }
  ];

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

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          className="p-2 text-gray-700 hover:text-blue-700"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <Xmark className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul id="list" className="hidden md:flex items-center space-x-8 font-bold">
        {navItems.map((item) => (
          <li
            key={item.path}
            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* Desktop Right Side: Either Login/Signup OR Notifications/Profile */}
      <div className="hidden md:flex items-center space-x-4">
        {isVenueOrProfile ? (
          // For venue and profile pages: Notification & Profile
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <div className="relative" ref={notificationRef}>
              <div className="cursor-pointer relative" onClick={() => setShowNotifications(!showNotifications)}>
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                    {unreadCount}
                  </span>
                )}
              </div>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-10 right-0 w-80 bg-white text-black rounded-lg shadow-lg p-4 z-10">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">Notifications</span>
                    <span className="text-blue-500 text-sm cursor-pointer" onClick={markAllAsRead}>Mark all as read</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications?.length === 0 ? (
                      <p className="text-center py-4">No new notifications</p>
                    ) : (
                      notifications?.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b cursor-pointer ${notification.read ? 'bg-gray-100' : ''}`} 
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p>{notification.message}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Picture */}
            <img 
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              className="w-8 h-8 rounded-full cursor-pointer" 
              onClick={() => navigate('/profile')} 
            />
          </div>
        ) : (
          // For regular pages: Login & Sign up buttons
          <>
            <Link to="/login" className="text-black dark:text-white hover:text-blue-500">Login</Link>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Sign up</Link>
          </>
        )}
      </div>

      {/* Mobile Drawer Menu - Replaced Material Tailwind Drawer with conditional rendering */}
      {open && (
        <div 
          ref={menuRef}
          className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg p-4 z-50"
        >
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              VenueHubs
            </h5>
            <button 
              className="p-2 text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
              onClick={() => setOpen(false)}
            >
              <Xmark className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                className="px-4 py-2 text-left text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile auth buttons */}
            {!isVenueOrProfile ? (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                  onClick={() => {
                    navigate('/login');
                    setOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => {
                    navigate('/signup');
                    setOpen(false);
                  }}
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                  onClick={() => {
                    navigate('/profile');
                    setOpen(false);
                  }}
                >
                  My Profile
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar2;