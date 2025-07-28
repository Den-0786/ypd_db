"use client";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import ExportAnalyticsButton from "./ExportAnalyticsButton";

export default function DashboardLayout({
  children,
  currentPage,
  currentPageProps,
  headerAction,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");
  const [securityMethod, setSecurityMethod] = useState("password"); // 'password' or 'pin'

  // Initialize sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state - ensure sidebar is closed on mobile by default
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      message: "New member registration pending approval",
      time: "2 min ago",
      type: "info",
    },
    {
      id: 2,
      message: "Weekly attendance report is ready",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 3,
      message: "System backup completed successfully",
      time: "3 hours ago",
      type: "success",
    },
    {
      id: 4,
      message: "Database maintenance scheduled for tonight",
      time: "5 hours ago",
      type: "warning",
    },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Header */}
      <header
        className={`${theme === "dark" ? "bg-gray-800" : "bg-blue-600"} shadow-lg w-full px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between fixed top-0 left-0 z-20`}
      >
        <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-6">
          <div className="relative lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-blue-200 transition-colors mr-2 lg:hidden focus:outline-none"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              onBlur={() =>
                setTimeout(() => {
                  const el = document.getElementById("sidebar-tooltip");
                  if (el) el.style.display = "none";
                }, 100)
              }
              onFocus={(e) => {
                const el = document.getElementById("sidebar-tooltip");
                if (el) el.style.display = "block";
              }}
              onMouseEnter={(e) => {
                const el = document.getElementById("sidebar-tooltip");
                if (el) el.style.display = "block";
              }}
              onMouseLeave={(e) => {
                const el = document.getElementById("sidebar-tooltip");
                if (el) el.style.display = "none";
              }}
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
            <div
              id="sidebar-tooltip"
              style={{ display: "none" }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded bg-gray-900 text-white text-xs shadow z-50 whitespace-nowrap"
              role="tooltip"
            >
              {sidebarOpen ? "Close sidebar" : "Open sidebar"}
            </div>
          </div>
          <i className="fas fa-database text-white text-lg sm:text-2xl"></i>
          <span className="text-white text-lg sm:text-2xl font-bold">
            {currentPage}
          </span>
        </div>
        {/* Optional right-aligned header action */}
        {headerAction && (
          <div className="flex items-center">{headerAction}</div>
        )}
        {/* Quick Actions Dropdown for Analytics Page */}
        {currentPage === "Analytics" && (
          <QuickActionsDropdown filtered={currentPageProps?.filtered} />
        )}
      </header>

      {/* Sidebar */}
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        notifications={notifications}
        notificationsOpen={notificationsOpen}
        setNotificationsOpen={setNotificationsOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        setSettingsOpen={setSettingsOpen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Settings Modal */}
      {settingsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSettingsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              <div className="flex h-96">
                {/* Settings Sidebar */}
                <div className="w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <nav className="p-4 space-y-2">
                    <button
                      onClick={() => setActiveSettingsTab("profile")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === "profile"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <i className="fas fa-user mr-2"></i>Profile
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("security")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === "security"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <i className="fas fa-shield-alt mr-2"></i>Security
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("notifications")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === "notifications"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <i className="fas fa-bell mr-2"></i>Notifications
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("appearance")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === "appearance"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <i className="fas fa-palette mr-2"></i>Appearance
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("data")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === "data"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <i className="fas fa-database mr-2"></i>Data Management
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab("about")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === "about"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <i className="fas fa-info-circle mr-2"></i>About
                    </button>
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {activeSettingsTab === "profile" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Profile Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Admin User"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue="admin@ypg.com"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            defaultValue="+233 20 123 4567"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Role
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            <option>System Administrator</option>
                            <option>Data Manager</option>
                            <option>Viewer</option>
                          </select>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Update Profile
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === "security" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Security Settings
                      </h3>

                      {/* Authentication Method Toggle */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                          Authentication Method
                        </h4>
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setSecurityMethod("password")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              securityMethod === "password"
                                ? "bg-blue-600 text-white"
                                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            <i className="fas fa-key mr-2"></i>
                            Username & Password
                          </button>
                          <button
                            onClick={() => setSecurityMethod("pin")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              securityMethod === "pin"
                                ? "bg-blue-600 text-white"
                                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            <i className="fas fa-mobile-alt mr-2"></i>
                            PIN Authentication
                          </button>
                        </div>
                      </div>

                      {/* Password Authentication Form */}
                      {securityMethod === "password" && (
                        <div className="space-y-4">
                          <h4 className="text-md font-medium text-gray-900 dark:text-white">
                            Password Settings
                          </h4>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="2fa"
                              className="rounded"
                            />
                            <label
                              htmlFor="2fa"
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              Enable Two-Factor Authentication
                            </label>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Update Password Settings
                          </button>
                        </div>
                      )}

                      {/* PIN Authentication Form */}
                      {securityMethod === "pin" && (
                        <div className="space-y-4">
                          <h4 className="text-md font-medium text-gray-900 dark:text-white">
                            PIN Settings
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            PIN authentication is used for quick actions and
                            sensitive operations.
                          </p>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Current PIN
                            </label>
                            <input
                              type="password"
                              maxLength="6"
                              placeholder="Enter 4-6 digit PIN"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              New PIN
                            </label>
                            <input
                              type="password"
                              maxLength="6"
                              placeholder="Enter 4-6 digit PIN"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Confirm New PIN
                            </label>
                            <input
                              type="password"
                              maxLength="6"
                              placeholder="Confirm 4-6 digit PIN"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="pin-actions"
                              className="rounded"
                              defaultChecked
                            />
                            <label
                              htmlFor="pin-actions"
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              Require PIN for sensitive actions
                            </label>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Update PIN Settings
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSettingsTab === "notifications" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              Email Notifications
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Receive notifications via email
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              New Member Alerts
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Get notified when new members register
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              Weekly Reports
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Receive weekly summary reports
                            </p>
                          </div>
                          <input type="checkbox" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              System Updates
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Notifications about system maintenance
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                          />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === "appearance" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Appearance Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Theme
                          </label>
                          <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          >
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                            <option value="auto">Auto (System)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            <option>English</option>
                            <option>Twi</option>
                            <option>Ga</option>
                            <option>Ewe</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Font Size
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                          </select>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Apply Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === "data" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Data Management
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                            Export Data
                          </h4>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                            Download your data in various formats
                          </p>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-700">
                              <i className="fas fa-download mr-2"></i>Export as
                              CSV
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-700">
                              <i className="fas fa-file-excel mr-2"></i>Export
                              as Excel
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-700">
                              <i className="fas fa-file-pdf mr-2"></i>Export as
                              PDF
                            </button>
                          </div>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                          <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                            Backup & Restore
                          </h4>
                          <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                            Manage your data backups
                          </p>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-700">
                              <i className="fas fa-save mr-2"></i>Create Backup
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-700">
                              <i className="fas fa-upload mr-2"></i>Restore from
                              Backup
                            </button>
                          </div>
                        </div>
                        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                          <h4 className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">
                            Danger Zone
                          </h4>
                          <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                            Irreversible actions
                          </p>
                          <button className="w-full text-left px-3 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-700">
                            <i className="fas fa-trash mr-2"></i>Clear All Data
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === "about" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        About YPG Database
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Version Information
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Version: 1.0.0
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Build: 2024.1.1
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Last Updated: January 2024
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Description
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            YPG Database Management System is a comprehensive
                            solution for managing Young People's Group data,
                            attendance tracking, and analytics. Built with
                            modern web technologies to provide a seamless
                            experience for church administrators and youth
                            leaders.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Features
                          </h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Member Management & Registration</li>
                            <li>• Attendance Tracking & Reporting</li>
                            <li>• Analytics & Insights</li>
                            <li>• Bulk Data Import/Export</li>
                            <li>• Multi-language Support</li>
                            <li>• Dark/Light Theme</li>
                            <li>• Mobile Responsive Design</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Support
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            For technical support or feature requests, please
                            contact the development team.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <div
        className={`pt-16 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"}`}
        onClick={() => {
          // Close sidebar when clicking outside on mobile
          if (sidebarOpen && window.innerWidth < 1024) {
            setSidebarOpen(false);
          }
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}

// Quick Actions Dropdown Component
function QuickActionsDropdown({ filtered }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  return (
    <div className="relative ml-2" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/90 hover:bg-blue-50 text-blue-700 rounded-lg shadow-sm border border-blue-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <i className="fas fa-bolt text-blue-500"></i>
        Quick Actions
        <i
          className={`fas fa-chevron-${open ? "up" : "down"} text-xs ml-1`}
        ></i>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-2 animate-fadeIn">
          <ExportAnalyticsButton
            filtered={filtered}
            label="Export Analytics Report"
          />
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-800 focus:bg-green-100 dark:focus:bg-green-700 transition"
            onClick={() => alert("Trend report generation coming soon!")}
          >
            <i className="fas fa-chart-line"></i> Generate Trend Report
          </button>
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-800 focus:bg-purple-100 dark:focus:bg-purple-700 transition"
            onClick={() => alert("PDF report creation coming soon!")}
          >
            <i className="fas fa-file-pdf"></i> Create PDF Report
          </button>
          <button
            className="w-full flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-800 focus:bg-yellow-100 dark:focus:bg-yellow-700 transition rounded-b-lg"
            onClick={() => window.print()}
          >
            <i className="fas fa-calendar"></i> Print Analytics
          </button>
        </div>
      )}
    </div>
  );
}
