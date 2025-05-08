import React, { useState, useContext } from 'react';
import { MdOutlinePersonOutline, MdClose } from "react-icons/md";
import { UserContext } from "../context/UserContext";

// ProfileSection Component - Shows user profile details
export const ProfileSection = ({ onClose, onEditClick }) => {
  const { userDetails } = useContext(UserContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-2xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <MdClose className="text-xl" />
        </button>
        
        <h2 className="text-2xl font-semibold mb-1">Your Profile</h2>
        <p className="text-gray-600 mb-6">Manage your personal information and preferences</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            {userDetails && userDetails.profileInfo ? (
              <img
                src={userDetails.profileInfo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="bg-gray-300 rounded-full w-32 h-32 flex items-center justify-center">
                <MdOutlinePersonOutline className="text-gray-600 text-5xl" />
              </div>
            )}
            <h3 className="font-medium text-lg mt-4">
              {userDetails ? `${userDetails.firstname} ${userDetails.lastname}` : "User"}
            </h3>
            <p className="text-gray-500 text-sm">
              {userDetails && userDetails.organization}
            </p>
          </div>
          
          {/* Profile Details Section */}
          <div className="flex-1">
            <div className="mb-6">
              <h4 className="text-gray-500 text-sm mb-1">Email</h4>
              <p>{userDetails ? userDetails.email : "email@example.com"}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-gray-500 text-sm mb-1">Phone</h4>
              <p>{userDetails ? userDetails.phone : "+123 456789"}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-gray-500 text-sm mb-1">Organization</h4>
              <p>{userDetails ? userDetails.organization : "Organization"}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-gray-500 text-sm mb-1">Bio</h4>
              <p>{userDetails ? userDetails.bio : "No bio available"}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onEditClick}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// EditProfileModal Component - For editing profile details
export const EditProfileModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    organization: initialData?.organization || '',
    bio: initialData?.bio || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-2xl  p-6 relative">
        <h2 className="text-2xl font-semibold mb-1">Your Profile</h2>
        <p className="text-gray-600 mb-6">Manage your personal information and preferences</p>
        
        <div className="flex justify-center mb-6">
          {initialData && initialData.profileImage ? (
            <img
              src={initialData.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center">
              <MdOutlinePersonOutline className="text-gray-600 text-4xl" />
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};