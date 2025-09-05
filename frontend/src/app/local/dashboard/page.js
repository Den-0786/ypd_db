"use client";
import { useState, useEffect } from "react";
import LocalDashboardLayout from "../../components/LocalDashboardLayout";
import getDataStore from "../../utils/dataStore";

export default function LocalDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [congregationId, setCongregationId] = useState(null);
  const [congregationName, setCongregationName] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalMembers: 0,
    thisWeeksAttendance: 0,
    newMembersThisMonth: 0,
    numberOfExecutives: 0,
  });

  // Handle client-side mounting and data loading
  useEffect(() => {
    setMounted(true);

    // Load congregation data from localStorage
    const storedCongregationId = localStorage.getItem("congregationId");
    const storedCongregationName = localStorage.getItem("congregationName");

    setCongregationId(storedCongregationId);
    setCongregationName(storedCongregationName);

    // Show welcome message when dashboard loads
    if (
      storedCongregationName &&
      typeof window !== "undefined" &&
      window.showToast
    ) {
      setTimeout(() => {
        window.showToast(
          `Welcome to ${storedCongregationName}!`,
          "success",
          3000
        );
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (congregationName && mounted) {
      fetchCongregationData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [congregationName, mounted]);

  const fetchCongregationData = async () => {
    try {
      setLoading(true);
      const dataStore = getDataStore();

      const response = await fetch("http://localhost:8001/api/home-stats/");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          const members = await dataStore.getMembers({
            congregation: congregationName,
          });
          const attendance = await dataStore.getAttendanceRecords({
            congregation: congregationName,
          });

          // Calculate this week's attendance
          const currentDate = new Date();
          const currentWeek = Math.ceil(
            (currentDate.getDate() +
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                1
              ).getDay()) /
              7
          );
          const thisWeekAttendance = attendance
            .filter((r) => {
              const recordDate = new Date(r.date);
              const recordWeek = Math.ceil(
                (recordDate.getDate() +
                  new Date(
                    recordDate.getFullYear(),
                    recordDate.getMonth(),
                    1
                  ).getDay()) /
                  7
              );
              return (
                recordDate.getFullYear() === currentDate.getFullYear() &&
                recordDate.getMonth() === currentDate.getMonth() &&
                recordWeek === currentWeek
              );
            })
            .reduce((sum, r) => sum + (r.total || 0), 0);

          // Calculate new members this month
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();
          const newMembersThisMonth = members.filter((m) => {
            const memberDate = new Date(m.timestamp);
            return (
              memberDate.getMonth() === currentMonth &&
              memberDate.getFullYear() === currentYear
            );
          }).length;

          // Count executives
          const numberOfExecutives = members.filter(
            (m) => m.is_executive
          ).length;

          setStats({
            totalMembers: members.length,
            thisWeeksAttendance: thisWeekAttendance,
            newMembersThisMonth: newMembersThisMonth,
            numberOfExecutives: numberOfExecutives,
          });
        }
      } else {
        // Use fallback data
        setStats({
          totalMembers: 0,
          thisWeeksAttendance: 0,
          newMembersThisMonth: 0,
          numberOfExecutives: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching congregation data:", error);
      // Use fallback data
      setStats({
        totalMembers: 0,
        thisWeeksAttendance: 0,
        newMembersThisMonth: 0,
        numberOfExecutives: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while mounting
  if (!mounted || loading) {
    return (
      <LocalDashboardLayout currentPage="Dashboard">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <i className="fas fa-church text-blue-200"></i>
                  Loading Dashboard...
                </h2>
                <p className="text-blue-100 text-lg mb-4">
                  Please wait while we load your congregation data...
                </p>
              </div>
            </div>
          </div>
        </div>
      </LocalDashboardLayout>
    );
  }

  return (
    <LocalDashboardLayout currentPage="Dashboard">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <i className="fas fa-church text-blue-200"></i>
                {congregationName
                  ? `${congregationName} Dashboard`
                  : "You Are Welcome"}
              </h2>
              <p className="text-blue-100 text-lg mb-4">
                {congregationName
                  ? `Welcome to your congregation's management center. View and manage your congregation's data.`
                  : "Grace and leadership go hand in hand. You're logged in as an Admin. You can View, manage and check the trends of the guild."}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>System Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fas fa-calendar"></i>
                  <span>
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  Total Members
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalMembers}
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-users text-xl lg:text-2xl text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  This Week&apos;s Attendance
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.thisWeeksAttendance}
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-calendar-check text-xl lg:text-2xl text-green-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  New Members This Month
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.newMembersThisMonth}
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-user-plus text-xl lg:text-2xl text-orange-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  Number of Executives
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.numberOfExecutives}
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-user-tie text-xl lg:text-2xl text-purple-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            <i className="fas fa-bolt text-blue-600 mr-2"></i>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Add New Member */}
            <div className="relative group">
              <div className="bg-blue-50 dark:bg-gray-700 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Add Member
                  </span>
                  <i className="fas fa-user-plus text-lg text-blue-600"></i>
                </div>
              </div>
              {/* Tooltip */}
              <div className="absolute z-20 w-64 p-3 text-sm text-white bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bottom-full mb-2 left-1/2 transform -translate-x-1/2 before:absolute before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-900 before:rotate-45 before:top-full before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2">
                Register individual members with personal and church details.
                Navigate to the sidebar and get started
              </div>
            </div>

            {/* Record Attendance */}
            <div className="relative group">
              <div className="bg-green-50 dark:bg-gray-700 shadow-lg dark:shadow-green-500/20 relative overflow-hidden rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Record Attendance
                  </span>
                  <i className="fas fa-clipboard-check text-lg text-green-600"></i>
                </div>
              </div>
              {/* Tooltip */}
              <div className="absolute z-20 w-64 p-3 text-sm text-white bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bottom-full mb-2 left-1/2 transform -translate-x-1/2 before:absolute before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-900 before:rotate-45 before:top-full before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2">
                Track weekly attendance of all guilders. Navigate to the sidebar
                and get started
              </div>
            </div>

            {/* View Analytics */}
            <div className="relative group">
              <div className="bg-purple-50 dark:bg-gray-700 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    View Analytics
                  </span>
                  <i className="fas fa-chart-bar text-lg text-purple-600"></i>
                </div>
              </div>
              {/* Tooltip */}
              <div className="absolute z-20 w-64 p-3 text-sm text-white bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bottom-full mb-2 left-1/2 transform -translate-x-1/2 before:absolute before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-900 before:rotate-45 before:top-full before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2">
                View comprehensive analytics and reports for attendance and
                growth trends. Navigate to the sidebar and get started
              </div>
            </div>

            {/* Bulk Registration */}
            <div className="relative group">
              <div className="bg-orange-50 dark:bg-gray-700 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bulk Registration
                  </span>
                  <i className="fas fa-users text-lg text-orange-600"></i>
                </div>
              </div>
              {/* Tooltip */}
              <div className="absolute z-20 w-64 p-3 text-sm text-white bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bottom-full mb-2 left-1/2 transform -translate-x-1/2 before:absolute before:w-2 before:h-2 before:bg-gray-800 dark:before:bg-gray-900 before:rotate-45 before:top-full before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2">
                Import multiple members at once using CSV files or manual entry
                forms. Navigate to the sidebar and get started
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalDashboardLayout>
  );
}
