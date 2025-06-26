import { useState, useContext } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Search } from "lucide-react";
import AddEvents from "../components/AddEvents";
import EventLists from "../components/EventList";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar"; // Import the shared sidebar component

const EventSection = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list', 'add', 'edit'
  const [editingEvent, setEditingEvent] = useState(null);

  // Get user details from context
  const { user, userDetails, loading } = useContext(UserContext);

  const handleAddEvent = () => {
    setCurrentView("add");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setEditingEvent(null); // ✅ Clear editing state too
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
      <Sidebar activePage="event" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[250px] ml-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 lg:p-5 shadow-sm gap-4 sm:gap-0">
          <h2 className="text-xl lg:text-2xl font-bold mt-12 sm:mt-0 lg:mt-0">My Events</h2>
          <div className="relative self-end sm:self-auto">
            <IoNotificationsOutline className="w-5 h-5 lg:w-6 lg:h-6" />
            <GoDotFill className="absolute -top-1 right-0 text-red-600 text-bold" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 lg:p-6">
          {currentView === "list" && (
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-4">
                <div className="flex-1">
                  <h2 className="text-lg lg:text-xl font-bold">My Events</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Manage your accessible events
                  </p>
                </div>
                <button
                  onClick={handleAddEvent}
                  className="bg-black text-white w-full sm:w-auto min-w-[140px] lg:w-[160px] px-4 lg:px-8 py-2 lg:py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-sm lg:text-base"
                >
                  <span className="text-lg">+</span> 
                  <span>Add Event</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4 lg:mb-6">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full lg:max-w-2xl p-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>

              {/* Event Lists - Wrapped in overflow container */}
              <div className="overflow-x-auto">
                <EventLists
                  onEdit={(event) => {
                    setEditingEvent(event);
                    setCurrentView("edit");
                  }}
                />
              </div>
            </div>
          )}

          {/* Add/Edit Event Views */}
          {currentView === "add" && (
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
              <AddEvents onCancel={handleBackToList} />
            </div>
          )}

          {currentView === "edit" && editingEvent && (
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
              <AddEvents
                event={editingEvent}
                isEditing={true}
                onCancel={handleBackToList}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSection;
