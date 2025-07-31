"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocalSidebar({
  theme,
  setTheme,
  sidebarOpen,
  setSidebarOpen,
  mounted,
  setSettingsOpen,
}) {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
  ];
  const links = [
    {
      href: "/local/dashboard",
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
    },
    { href: "/", icon: "fas fa-home", label: "Home" },
    { href: "/local/members", icon: "fas fa-users", label: "Members" },
    {
      href: "/local/attendance",
      icon: "fas fa-calendar-check",
      label: "Attendance",
    },
    { href: "/local/analytics", icon: "fas fa-chart-bar", label: "Analytics" },
    { href: "/local/bulk", icon: "fas fa-user-plus", label: "Bulk Add" },
  ];
  return (
    <div
      className={`fixed left-0 top-16 ${mounted && theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg transition-all duration-300 z-20
      ${sidebarOpen ? "w-64" : "w-16"} ${sidebarOpen ? "block" : "hidden lg:flex"} overflow-y-auto overflow-x-hidden`}
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="flex flex-col min-w-0">
        {/* Sidebar Header */}
        <div
          className={`${sidebarOpen ? "p-4" : "p-2"} border-b ${mounted && theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <div
            className={`flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} min-w-0`}
          >
            {sidebarOpen && (
              <h2
                className={`text-lg font-semibold ${mounted && theme === "dark" ? "text-white" : "text-gray-800"} truncate`}
              >
                Navigation
              </h2>
            )}
            {/* Collapse button only on desktop */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`hidden lg:inline ${mounted && theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} transition-colors flex-shrink-0`}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              onMouseEnter={() => {
                const el = document.getElementById("sidebar-tooltip");
                if (el) el.style.display = "block";
              }}
              onMouseLeave={() => {
                const el = document.getElementById("sidebar-tooltip");
                if (el) el.style.display = "none";
              }}
              onFocus={() => {
                const el = document.getElementById("sidebar-tooltip");
                if (el) el.style.display = "block";
              }}
              onBlur={() => {
                const el = document.getElementById("sidebar-tooltip");
                if (el) el.style.display = "none";
              }}
            >
              <i
                className={`fas ${sidebarOpen ? "fa-chevron-left" : "fa-chevron-right"} text-sm`}
              ></i>
            </button>
            {/* Tooltip for hamburger/collapse */}
            <div
              id="sidebar-tooltip"
              style={{ display: "none" }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded bg-gray-900 text-white text-xs shadow z-50 whitespace-nowrap"
              role="tooltip"
            >
              {sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            </div>
          </div>
        </div>
        {/* Sidebar Navigation */}
        <nav className={`${sidebarOpen ? "p-4" : "p-2"} space-y-2`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${pathname === link.href ? (mounted && theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-blue-50 text-blue-700") : mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title={link.label}
            >
              <i className={`${link.icon} text-lg flex-shrink-0`}></i>
              {sidebarOpen && (
                <span className="font-medium truncate">{link.label}</span>
              )}
            </Link>
          ))}
          {/* Theme Toggle */}
          <div
            className={`w-full flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} rounded-lg transition-colors min-w-0`}
          >
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-full p-0.5 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle theme"
              title={
                mounted && theme === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
            >
              {/* Toggle Track */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-inner">
                {/* Toggle Handle */}
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white dark:bg-gray-600 rounded-full shadow-lg transition-all duration-300 transform ${
                    mounted && theme === "dark"
                      ? "translate-x-6"
                      : "translate-x-0"
                  }`}
                >
                  {/* Moon Icon for Dark Mode */}
                  {mounted && theme === "dark" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-lg animate-pulse" />
                    </div>
                  )}

                  {/* Sun Icon for Light Mode */}
                  {mounted && theme === "light" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-lg" />
                    </div>
                  )}
                </div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    mounted && theme === "dark"
                      ? "bg-gradient-to-r from-cyan-400/20 to-blue-500/20 shadow-lg shadow-cyan-400/30"
                      : "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 shadow-lg shadow-yellow-400/30"
                  }`}
                />
              </div>
            </button>
            {sidebarOpen && <span className="font-medium truncate">Theme</span>}
          </div>
        </nav>
        {/* Notifications */}
        <div
          className={`p-2 border-t ${mounted && theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`w-full flex items-center space-x-3 p-2 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} rounded-lg transition-colors relative min-w-0`}
              title="Notifications"
            >
              <i className="fas fa-bell text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium text-sm truncate">
                  Notifications
                </span>
              )}
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center flex-shrink-0">
                  {notifications.length}
                </span>
              )}
            </button>
            {/* Notifications Dropdown */}
            {notificationsOpen && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 max-h-48 overflow-y-auto min-w-0">
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-2 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-start space-x-2 min-w-0">
                        <div
                          className={`flex-shrink-0 w-2 h-2 rounded-full mt-1 ${notification.type === "success" ? "bg-green-500" : notification.type === "warning" ? "bg-yellow-500" : notification.type === "error" ? "bg-red-500" : "bg-blue-500"}`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-900 dark:text-white truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* User Menu */}
        <div
          className={`p-2 border-t ${mounted && theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-full flex items-center space-x-3 p-2 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} rounded-lg transition-colors min-w-0`}
              title="Admin User"
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-user text-xs text-white"></i>
              </div>
              {sidebarOpen && (
                <>
                  <span className="font-medium text-sm truncate">Admin</span>
                  <i className="fas fa-chevron-down text-xs flex-shrink-0"></i>
                </>
              )}
            </button>
            {/* User Menu Dropdown */}
            {userMenuOpen && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 min-w-0">
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    admin@ypg.com
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      if (setSettingsOpen) setSettingsOpen(true);
                      setUserMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 min-w-0"
                  >
                    <i className="fas fa-cog text-sm flex-shrink-0"></i>
                    <span className="truncate">Settings</span>
                  </button>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 min-w-0"
                  >
                    <i className="fas fa-sign-out-alt text-sm flex-shrink-0"></i>
                    <span className="truncate">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
