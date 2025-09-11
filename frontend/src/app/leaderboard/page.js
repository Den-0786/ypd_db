"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import AttendanceLeaderboard from "../components/AttendanceLeaderboard";
import AnnualWinners from "../components/AnnualWinners";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("weekly");
  const [lastUpdated, setLastUpdated] = useState("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Set the timestamp on the client side to avoid hydration mismatch
    setLastUpdated(new Date().toLocaleString());
  }, []);

  const tabs = [
    { id: "weekly", name: "Weekly Winners", icon: "fas fa-calendar-week" },
    { id: "monthly", name: "Monthly Winners", icon: "fas fa-calendar-alt" },
    { id: "annual", name: "Annual Champions", icon: "fas fa-trophy" },
  ];

  return (
    <DashboardLayout currentPage="Leaderboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                <i className="fas fa-trophy text-yellow-500 mr-3"></i>
                Attendance Leaderboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
                Track and celebrate congregations with the highest attendance
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <i className="fas fa-clock mr-1"></i>
                Last updated: {lastUpdated || "Loading..."}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav
              className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto"
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <i className={`${tab.icon} mr-1 sm:mr-2`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-96">
          {activeTab === "weekly" && (
            <div className="space-y-6">
              <AttendanceLeaderboard type="weekly" />

              {/* Additional Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Weekly Leaderboard Rules
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Updated every Monday at 10:00 AM</li>
                      <li>• Shows top 3 congregations from previous Sunday</li>
                      <li>
                        • Previous week&apos;s winner shown for comparison
                      </li>
                      <li>
                        • Comparison removed after 2 days (Wednesday 10:00 AM)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "monthly" && (
            <div className="space-y-6">
              <AttendanceLeaderboard type="monthly" />

              {/* Additional Info */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-green-500 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      Monthly Leaderboard Rules
                    </h4>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                      <li>• Updated on the 1st of each month at 10:00 AM</li>
                      <li>• Shows top 3 congregations from previous month</li>
                      <li>
                        • Previous month&apos;s winner shown for comparison
                      </li>
                      <li>
                        • Comparison removed after 5 days (6th of month 10:00
                        AM)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "annual" && (
            <div className="space-y-6">
              <AnnualWinners year={currentYear} />

              {/* Additional Info */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-purple-500 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                      Annual Champions Rules
                    </h4>
                    <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                      <li>• Updated on December 31st at 10:00 AM</li>
                      <li>• Shows all monthly winners for the year</li>
                      <li>
                        • Gold badge for 1st place, Silver for 2nd, Diamond for
                        3rd
                      </li>
                      <li>
                        • Congregations with multiple wins are listed once with
                        win count
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-3 w-48 flex-shrink-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-calendar-week text-blue-500 text-lg"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Weekly Winners
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    Updated every Monday
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-3 w-48 flex-shrink-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-calendar-alt text-green-500 text-lg"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Monthly Winners
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    Updated monthly
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-3 w-48 flex-shrink-0">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-trophy text-yellow-500 text-lg"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Annual Champions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    Updated yearly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
