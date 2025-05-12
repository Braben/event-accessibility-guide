import React, { useState, useContext } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { NotificationBell } from '../components/NotificationSystem';
import { UserContext } from "../context/UserContext";
import Sidebar from '../components/Sidebar'; // Import the shared sidebar component

const SettingsSection = () => {
  // State for toggle switches
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [accessibilityUpdates, setAccessibilityUpdates] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState('Private');
  const [expandedAccordion, setExpandedAccordion] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Check if user is logged in
  if (!user || !userDetails) {
    return <div>Please log in to view your settings.</div>;
  }
   
  return (
    <div className="flex h-screen">
      {/* Use the shared sidebar component */}
      <Sidebar activePage="settings" />

      {/* Main Content */}
      <div className="flex-1 ml-[250px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">Settings</h2>
          <div className="relative">
             <NotificationBell />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 bg-gray-50 overflow-auto">
          <div className="bg-white shadow rounded-md max-w-2xl mx-auto p-6">
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-sm text-gray-500 mb-6">Customize your experience with the Venue Accessibility Guide platform</p>
            
            {/* Notifications Section */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Notifications</h3>
              <p className="text-sm text-gray-500 mb-4">Customize how you receive notifications</p>
              
              <div className="space-y-4">
                <ToggleItem 
                  label="Email Notifications" 
                  description="Receive notifications via email"
                  isEnabled={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                
                <ToggleItem 
                  label="Push Notifications" 
                  description="Receive notifications in the browser"
                  isEnabled={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
                
                <ToggleItem 
                  label="Accessibility Updates" 
                  description="Get notified about accessibility guideline changes"
                  isEnabled={accessibilityUpdates}
                  onChange={() => setAccessibilityUpdates(!accessibilityUpdates)}
                />
              </div>
            </div>
            
            {/* Account Section */}
            <div>
              <h3 className="font-medium mb-4">Account</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email Visibility</label>
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex justify-between items-center w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md bg-white"
                  >
                    <span>{selectedVisibility}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      <div 
                        onClick={() => handleVisibilitySelect('Private')}
                        className={`flex items-center px-3 py-2 cursor-pointer ${selectedVisibility === 'Private' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {selectedVisibility === 'Private' && (
                          <Check size={16} className="mr-2" />
                        )}
                        <span>Private</span>
                      </div>
                      <div 
                        onClick={() => handleVisibilitySelect('Visible to contacts')}
                        className={`flex items-center px-3 py-2 cursor-pointer ${selectedVisibility === 'Visible to contacts' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {selectedVisibility === 'Visible to contacts' && (
                          <Check size={16} className="mr-2" />
                        )}
                        <span>Visible to contacts</span>
                      </div>
                      <div 
                        onClick={() => handleVisibilitySelect('Public')}
                        className={`flex items-center px-3 py-2 cursor-pointer ${selectedVisibility === 'Public' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {selectedVisibility === 'Public' && (
                          <Check size={16} className="mr-2" />
                        )}
                        <span>Public</span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">Control who can see your email address</p>
              </div>
              
              <ToggleItem 
                label="Two-Factor Authentication" 
                description="Add an extra layer of security to your account"
                isEnabled={twoFactorAuth}
                onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              />
            </div>
            
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-md">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle Item Component
function ToggleItem({ label, description, isEnabled, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button 
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
        onClick={onChange}
      >
        <span 
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} 
        />
      </button>
    </div>
  );
}

export default SettingsSection;