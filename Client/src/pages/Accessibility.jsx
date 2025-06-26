import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { NotificationBell } from '../components/NotificationSystem';
import Sidebar from '../components/Sidebar';

const Accessibility = () => {
  const [activeTab, setActiveTab] = useState('guidelines');
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const { user, userDetails, loading } = useContext(UserContext);

  useEffect(() => {
    console.log('User details:', userDetails);
    console.log('User object:', user);
  }, [userDetails, user]);

  const toggleAccordion = (section) => {
    setExpandedAccordion(expandedAccordion === section ? null : section);
  };

  const handleCheckboxChange = (section, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [`${section}-${item}`]: !prev[`${section}-${item}`],
    }));
  };

  // Calculate completion progress
  const totalCheckboxes = 8;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = (checkedCount / totalCheckboxes) * 100;

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user || !userDetails) {
    return <div className="p-4">Please log in to view your events.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="accessibility" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-[250px]">
        {/* Header */}
  <div className="bg-white shadow-sm flex justify-between items-center p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold">Accessibility</h2>
          <NotificationBell />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-[#E0E0E4] p-4 sm:p-6">
          <div className="max-w-full sm:max-w-3xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Accessibility</h1>

            {/* Tab Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <button
                className={`py-2 sm:py-3 text-center font-medium rounded-md text-sm sm:text-base ${
                  activeTab === 'guidelines' ? 'bg-white' : 'bg-gray-200'
                }`}
                onClick={() => setActiveTab('guidelines')}
                aria-selected={activeTab === 'guidelines'}
                role="tab"
              >
                Guidelines
              </button>
              <button
                className={`py-2 sm:py-3 text-center font-medium rounded-md text-sm sm:text-base ${
                  activeTab === 'checklist' ? 'bg-white' : 'bg-gray-200'
                }`}
                onClick={() => setActiveTab('checklist')}
                aria-selected={activeTab === 'checklist'}
                role="tab"
              >
                Checklist
              </button>
            </div>

            {/* Guidelines Content */}
            {activeTab === 'guidelines' && (
              <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
                {/* Important Note */}
  <div className="bg-gray-100 p-3 sm:p-4 mb-4 rounded-md">
                  <h3 className="font-bold mb-1 text-sm sm:text-base">Important</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    These guidelines are based on international accessibility standards and best practices. Always consult
                    local regulations for specific requirements in your area.
                  </p>
                </div>

                <h2 className="text-lg sm:text-xl font-bold mb-1">Accessibility Guidelines</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Essential standards for making your venues accessible to all attendees
                </p>

                {/* Accordion Sections */}
                <div className="mb-2">
                  <button
                    className="flex items-center justify-between w-full bg-gray-200 p-2 sm:p-3 rounded-md text-sm sm:text-base"
                    onClick={() => toggleAccordion('physical')}
                    aria-expanded={expandedAccordion === 'physical'}
                    aria-controls="physical-accessibility"
                  >
                    <span className="font-medium">Physical Accessibility</span>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${
                        expandedAccordion === 'physical' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedAccordion === 'physical' && (
                    <div id="physical-accessibility" className="bg-gray-50 p-3 sm:p-4 mt-1 rounded-md border border-gray-200">
                      <h4 className="font-medium mb-2 text-sm sm:text-base">Physical Accessibility Requirements</h4>
                      <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                        <li>Ensure entrances are accessible without steps or have proper ramps</li>
                        <li>All doorways should be at least 32 inches wide to accommodate wheelchairs</li>
                        <li>Ramps should have a slope of 1:12 or less for safety</li>
                        <li>Elevators must be available for multi-level venues</li>
                        <li>Pathways should be clear of obstacles and at least 36 inches wide</li>
                        <li>Accessible parking spaces should be available close to entrances</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mb-2">
                  <button
                    className="flex items-center justify-between w-full bg-gray-200 p-2 sm:p-3 rounded-md text-sm sm:text-base"
                    onClick={() => toggleAccordion('location')}
                    aria-expanded={expandedAccordion === 'location'}
                    aria-controls="location-accessibility"
                  >
                    <span className="font-medium">How to add a location to our database?</span>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${
                        expandedAccordion === 'location' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedAccordion === 'location' && (
                    <div id="location-accessibility" className="bg-gray-50 p-3 sm:p-4 mt-1 rounded-md border border-gray-200">
                      <h4 className="font-medium mb-2 text-sm sm:text-base">Adding a New Location</h4>
                      <ol className="list-decimal pl-5 space-y-3 text-xs sm:text-sm">
                        <li>
                          <p className="font-medium">Submit location details</p>
                          <p>Complete the online form with address, contact information, and venue type.</p>
                        </li>
                        <li>
                          <p className="font-medium">Complete accessibility assessment</p>
                          <p>Use the checklist to document all accessibility features of your venue.</p>
                        </li>
                        <li>
                          <p className="font-medium">Upload photos</p>
                          <p>Provide clear images of entrances, pathways, restrooms, and other relevant areas.</p>
                        </li>
                        <li>
                          <p className="font-medium">Verification</p>
                          <p>Our team will review the submission and may contact you for additional information.</p>
                        </li>
                      </ol>
                      <div className="mt-4 bg-blue-50 p-2 sm:p-3 rounded-md text-xs sm:text-sm text-blue-800">
                        Need help? Contact our support team at support@accessiblevenues.com
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-2">
                  <button
                    className="flex items-center justify-between w-full bg-gray-200 p-2 sm:p-3 rounded-md text-sm sm:text-base"
                    onClick={() => toggleAccordion('report')}
                    aria-expanded={expandedAccordion === 'report'}
                    aria-controls="report-accessibility"
                  >
                    <span className="font-medium">How to report an issue with a listing?</span>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${
                        expandedAccordion === 'report' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedAccordion === 'report' && (
                    <div id="report-accessibility" className="bg-gray-50 p-3 sm:p-4 mt-1 rounded-md border border-gray-200">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Reporting Accessibility Issues</h4>
                      <p className="mb-3 text-xs sm:text-sm">
                        If you encounter inaccurate information or accessibility barriers at a listed venue, please follow
                        these steps:
                      </p>
                      <div className="space-y-4 text-xs sm:text-sm">
                        <div>
                          <p className="font-medium">Option 1: Report from venue page</p>
                          <p className="pl-4">Use the "Report Issue" button on the venue listing page and complete the form with specific details.</p>
                        </div>
                        <div>
                          <p className="font-medium">Option 2: Email our team</p>
                          <p className="pl-4">Send details to reports@accessiblevenues.com including the venue name, location, and description of the issue.</p>
                        </div>
                        <div>
                          <p className="font-medium">Option 3: Call our support line</p>
                          <p className="pl-4">For urgent issues, call 1-800-555-ACCESS (1-800-555-2223) during business hours.</p>
                        </div>
                      </div>
                      <p className="mt-4 text-xs sm:text-sm italic">
                        We aim to address all reports within 48 hours and will update the listing information as needed.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Checklist Content */}
            {activeTab === 'checklist' && (
              <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold mb-1">Accessibility Checklist</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Use this checklist to assess the accessibility of your venues
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="font-medium mb-2 text-sm sm:text-base">Completion Progress</div>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                {/* Physical Accessibility Section */}
                <div className="mb-4">
                  <div className="bg-gray-200 p-2 sm:p-3 rounded-md font-medium mb-2 text-sm sm:text-base">
                    Physical Accessibility
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="physical-entrance"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['physical-entrance']}
                        onChange={() => handleCheckboxChange('physical', 'entrance')}
                      />
                      <label htmlFor="physical-entrance" className="text-xs sm:text-sm">
                        Accessible entrance with no steps
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="physical-doorways"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['physical-doorways']}
                        onChange={() => handleCheckboxChange('physical', 'doorways')}
                      />
                      <label htmlFor="physical-doorways" className="text-xs sm:text-sm">
                        Doorways at least 32 inches wide
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="physical-ramps"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['physical-ramps']}
                        onChange={() => handleCheckboxChange('physical', 'ramps')}
                      />
                      <label htmlFor="physical-ramps" className="text-xs sm:text-sm">
                        Ramps with appropriate slope (1:12 or less)
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="physical-elevators"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['physical-elevators']}
                        onChange={() => handleCheckboxChange('physical', 'elevators')}
                      />
                      <label htmlFor="physical-elevators" className="text-xs sm:text-sm">
                        Elevators available for multi-level venues
                      </label>
                    </div>
                  </div>
                </div>

                {/* Restrooms Section */}
                <div className="mb-4">
                  <div className="bg-gray-200 p-2 sm:p-3 rounded-md font-medium mb-2 text-sm sm:text-base">
                    Restrooms
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="restroom-entrance"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['restroom-entrance']}
                        onChange={() => handleCheckboxChange('restroom', 'entrance')}
                      />
                      <label htmlFor="restroom-entrance" className="text-xs sm:text-sm">
                        Accessible entrance with no steps
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="restroom-doorways"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['restroom-doorways']}
                        onChange={() => handleCheckboxChange('restroom', 'doorways')}
                      />
                      <label htmlFor="restroom-doorways" className="text-xs sm:text-sm">
                        Doorways at least 32 inches wide
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="restroom-ramps"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['restroom-ramps']}
                        onChange={() => handleCheckboxChange('restroom', 'ramps')}
                      />
                      <label htmlFor="restroom-ramps" className="text-xs sm:text-sm">
                        Ramps with appropriate slope (1:12 or less)
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="restroom-elevators"
                        className="h-5 w-5 mr-2"
                        checked={!!checkedItems['restroom-elevators']}
                        onChange={() => handleCheckboxChange('restroom', 'elevators')}
                      />
                      <label htmlFor="restroom-elevators" className="text-xs sm:text-sm">
                        Elevators available for multi-level venues
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;