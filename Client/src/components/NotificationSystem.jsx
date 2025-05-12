// 1. First, create a new file called NotificationSystem.jsx in your components folder:

// src/components/NotificationSystem.jsx
import React, { useState, createContext, useContext, useReducer } from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FiCheck, FiX } from "react-icons/fi";

// Create context for notifications
const NotificationContext = createContext();

// Notification reducer for managing state
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => 
          notification.id === action.payload ? { ...notification, read: true } : notification
        )
      };
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({ ...notification, read: true }))
      };
    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          {
            id: Date.now(),
            ...action.payload,
            read: false,
            time: action.payload.time || 'Just now'
          },
          ...state.notifications
        ]
      };
    default:
      return state;
  }
};

// Initial notification data
const initialNotifications = {
  notifications: [
    {
      id: 1,
      type: 'event',
      title: 'New Event Added',
      message: 'Grand Conference Center has been added to your venues',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Accessibility Update',
      message: 'New accessibility guidelines have been published',
      time: '1 hour ago',
      read: true
    },
    {
      id: 3,
      type: 'event',
      title: 'New Event Added',
      message: 'Grand Conference Center has been added to your venues',
      time: '10 minutes ago',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Accessibility Update',
      message: 'New verification required for venue listings',
      time: '3 hours ago',
      read: false
    }
  ]
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialNotifications);

  const markAsRead = (id) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const deleteNotification = (id) => {
    dispatch({ type: 'DELETE_NOTIFICATION', payload: id });
  };

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const value = {
    notifications: state.notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook for using notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification bell component that can be used in your header
export const NotificationBell = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="relative">
      <button 
        className="relative flex items-center" 
        onClick={() => setShowNotifications(!showNotifications)}
        aria-label="Notifications"
      >
        <IoNotificationsOutline className="size-6" />
        {unreadCount > 0 && (
          <GoDotFill className="absolute -top-1 right-0 text-red-600 text-bold" />
        )}
      </button>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-white border shadow-lg rounded-md z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Notifications</h3>
            <button 
              className="text-blue-600 text-sm hover:underline"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b relative ${notification.read ? '' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 rounded-full p-2 mr-3 ${
                      notification.type === 'event' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {notification.type === 'event' ? (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-gray-600 text-sm">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => markAsRead(notification.id)}
                        aria-label="Mark as read"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => deleteNotification(notification.id)}
                        aria-label="Delete notification"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};