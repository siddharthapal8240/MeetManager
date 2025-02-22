import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Video, Bell, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const location = useLocation(); // Get the current route

  // State for notifications panel
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Meeting "Team Sync" ended - Processing recording',
      time: "2 minutes ago",
      type: "processing",
    },
    {
      id: 2,
      message: 'Meeting summary completed for "Project Review"',
      time: "10 minutes ago",
      type: "completed",
    },
    {
      id: 3,
      message: "Meeting reminder emails sent successfully",
      time: "1 hour ago",
      type: "notification",
    },
  ]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">MeetManager</span>
          </Link>

          {/* Centered Links (Only on Dashboard Page) */}
          {isSignedIn && location.pathname === "/dashboard" && (
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                to="/create-event"
                className="text-sm sm:text-base bg-indigo-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-indigo-700"
              >
                Create Event
              </Link>
              <Link
                to="/dashboard"
                className="text-sm sm:text-base text-gray-600 hover:text-indigo-600 px-2 py-1.5"
              >
                Dashboard
              </Link>
            </div>
          )}

          {/* Authentication, Notifications, and User Profile */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            {isSignedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Bell className="h-6 w-6 text-gray-700" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Notifications Panel */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-semibold text-lg">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="p-4 hover:bg-gray-50"
                          >
                            <p className="text-sm text-gray-800">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-gray-500">
                          No new notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile / Authentication */}
            {isSignedIn ? (
              <UserButton />
            ) : (
              <button
                onClick={() => openSignIn({})}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
