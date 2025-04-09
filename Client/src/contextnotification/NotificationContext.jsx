import React, { createContext, useContext, useState } from 'react';

// Create context
const NotificationContext = createContext();

// Create a custom hook for using the context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New venue added in your area", time: "10 minutes ago", read: false },
    { id: 2, message: "Your booking request was confirmed", time: "2 hours ago", read: false },
    { id: 3, message: "Welcome to VenuesHub!", time: "1 day ago", read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

    // Add a new notification
    const addNotification = (message) => {
      const newNotification = {
        id: Date.now(),
        message,
        time: 'Just now',
        read: false
      };
      setNotifications([newNotification, ...notifications]);
    };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

   // The value to be provided to consumers
   const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};