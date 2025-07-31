"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar({
  theme,
  setTheme,
  notifications,
  notificationsOpen,
  setNotificationsOpen,
  userMenuOpen,
  setUserMenuOpen,
  setSettingsOpen,
  sidebarOpen,
  setSidebarOpen,
  mounted,
}) {
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      {/* Sidebar */}
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
              >
                <i
                  className={`fas ${sidebarOpen ? "fa-chevron-left" : "fa-chevron-right"} text-sm`}
                ></i>
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className={`${sidebarOpen ? "p-4" : "p-2"} space-y-2`}>
            <Link
              href="/dashboard"
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title="Dashboard"
            >
              <i className="fas fa-tachometer-alt text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium truncate">Dashboard</span>
              )}
            </Link>

            <Link
              href="/"
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title="Home"
            >
              <i className="fas fa-home text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium truncate">Home</span>
              )}
            </Link>

            <Link
              href="/members"
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title="Members"
            >
              <i className="fas fa-users text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium truncate">Members</span>
              )}
            </Link>

            <Link
              href="/attendance"
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title="Attendance"
            >
              <i className="fas fa-calendar-check text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium truncate">Attendance</span>
              )}
            </Link>

            <Link
              href="/analytics"
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title="Analytics"
            >
              <i className="fas fa-chart-bar text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium truncate">Analytics</span>
              )}
            </Link>

            <Link
              href="/bulk"
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title="Bulk Add"
            >
              <i className="fas fa-user-plus text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium truncate">Bulk Add</span>
              )}
            </Link>

            <Link
              href="/leaderboard"
              className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-lg transition-colors min-w-0 ${mounted && theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              title="Leaderboard"
            >
              <i className="fas fa-trophy text-lg flex-shrink-0"></i>
              {sidebarOpen && (
                <span className="font-medium truncate">Leaderboard</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
