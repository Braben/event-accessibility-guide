import React, { useState, useContext } from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Search } from 'lucide-react';
import AddVenue from "../components/AddVenue";
import VenueLists from "../components/VenueLists";
import { UserContext } from "../context/UserContext";
import Sidebar from '../components/Sidebar'; // Import the shared sidebar component

const EventsSection = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [selectedVisibility, setSelectedVisibility] = useState("Public");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
  const [selectedVenue, setSelectedVenue] = useState(null);
  
  // Get user details from context
  const { user, userDetails, loading } = useContext(UserContext);

  const toggleAccordion = (section) => {
    if (expandedAccordion === section) {
      setExpandedAccordion(null);
    } else {
      setExpandedAccordion(section);
    }
  };

  const handleVisibilitySelect = (option) => {
    setSelectedVisibility(option);
    setShowDropdown(false);
  };

  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setCurrentView('edit');
  };

  const handleAddVenue = () => {
    setCurrentView('add');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedVenue(null);
  };

  // Show loading state if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Check if user is logged in
  if (!user || !userDetails) {
    return <div>Please log in to view your events.</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Use the shared sidebar component */}
      <Sidebar activePage="events" />

      {/* Main Content */}
      <div className="flex-1 ml-[250px]">
        {/* Header */}
        <div className="flex justify-between bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">Events</h2>
          <div className="relative">
            <IoNotificationsOutline className="size-6" />
            <GoDotFill className="absolute -top-1 right-0 text-red-600 text-bold" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          {currentView === 'list' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Events</h2>
                  <p className="text-gray-600 text-sm">Manage your accessible events</p>
                </div>
                <button 
                  onClick={handleAddVenue}
                  className="bg-black text-white w-[160px] px-8 py-2 rounded-md flex items-center gap-1 hover:bg-gray-800"
                >
                  <span>+</span> Add Event
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-[830px] p-3 pl-10 border border-gray-300 rounded-md"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              {/* Venue List */}
              <VenueLists onEditVenue={handleEditVenue} />
            </div>
          )}
          
          {currentView === 'add' && (
            <AddVenue onCancel={handleBackToList} />
          )}
          
          {currentView === 'edit' && selectedVenue && (
            <AddVenue venue={selectedVenue} isEditing={true} onCancel={handleBackToList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;