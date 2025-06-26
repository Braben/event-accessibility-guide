import React, { useState, useContext } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { NotificationBell } from '../components/NotificationSystem';
import { UserContext } from '../context/UserContext';
import Sidebar from '../components/Sidebar';

const SettingsSection = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [accessibilityUpdates, setAccessibilityUpdates] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState('Private');
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const { user, userDetails, loading } = useContext(UserContext);

  const toggleAccordion = (section) => {
    setExpandedAccordion(expandedAccordion === section ? null : section);
  };

  const handleVisibilitySelect = (option) => {
    setSelectedVisibility(option);
    setShowDropdown(false);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user || !userDetails) {
    return <div className="p-4">Please log in to view your settings.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="settings" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-[250px]">
        {/* Header */}
        <div className="flex justify-between bg-white p-4 sm:p-5 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold">Settings</h2>
          <div className="relative">
            <NotificationBell />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 bg-gray-50 overflow-auto">
          <div className="bg-white shadow rounded-md max-w-full sm:max-w-2xl mx-auto p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold">Settings</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
              Customize your experience with the Venue Accessibility Guide platform
            </p>

            {/* Notifications Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-medium mb-2 sm:mb-4 text-sm sm:text-base">Notifications</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Customize how you receive notifications
              </p>

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
              <h3 className="font-medium mb-2 sm:mb-4 text-sm sm:text-base">Account</h3>

              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-medium mb-2">Email Visibility</label>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex justify-between items-center w-full pl-3 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md bg-white"
                    aria-expanded={showDropdown}
                    aria-controls="visibility-dropdown"
                  >
                    <span>{selectedVisibility}</span>
                    <ChevronDown size={14} sm={{ size: 16 }} className="text-gray-400" />
                  </button>

                  {showDropdown && (
                    <div
                      id="visibility-dropdown"
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
                    >
                      <div
                        onClick={() => handleVisibilitySelect('Private')}
                        className={`flex items-center px-3 py-2 cursor-pointer text-xs sm:text-sm ${
                          selectedVisibility === 'Private' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {selectedVisibility === 'Private' && <Check size={14} sm={{ size: 16 }} className="mr-2" />}
                        <span>Private</span>
                      </div>
                      <div
                        onClick={() => handleVisibilitySelect('Visible to contacts')}
                        className={`flex items-center px-3 py-2 cursor-pointer text-xs sm:text-sm ${
                          selectedVisibility === 'Visible to contacts' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {selectedVisibility === 'Visible to contacts' && (
                          <Check size={14} sm={{ size: 16 }} className="mr-2" />
                        )}
                        <span>Visible to contacts</span>
                      </div>
                      <div
                        onClick={() => handleVisibilitySelect('Public')}
                        className={`flex items-center px-3 py-2 cursor-pointer text-xs sm:text-sm ${
                          selectedVisibility === 'Public' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {selectedVisibility === 'Public' && <Check size={14} sm={{ size: 16 }} className="mr-2" />}
                        <span>Public</span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Control who can see your email address</p>
              </div>

              <ToggleItem
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                isEnabled={twoFactorAuth}
                onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 sm:mt-8 flex justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base">
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
        <p className="font-medium text-xs sm:text-sm">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors focus:outline-none ${
          isEnabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        onClick={onChange}
        role="switch"
        aria-checked={isEnabled}
      >
        <span
          className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6 sm:translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export default SettingsSection;