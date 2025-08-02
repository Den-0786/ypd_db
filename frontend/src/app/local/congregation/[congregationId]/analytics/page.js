"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import LocalDashboardLayout from "../../../../components/LocalDashboardLayout";

export default function CongregationAnalytics() {
  const params = useParams();
  const router = useRouter();
  const { congregationId } = params;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [congregation, setCongregation] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Check authentication
    const authKey = `congregation_auth_${congregationId}`;
    const authData = sessionStorage.getItem(authKey);
    
    if (authData) {
      const { authenticated, timestamp } = JSON.parse(authData);
      if (authenticated && (Date.now() - timestamp) < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        sessionStorage.removeItem(authKey);
        router.push(`/local/congregation/${congregationId}`);
      }
    } else {
      router.push(`/local/congregation/${congregationId}`);
    }
    setIsLoading(false);
  }, [congregationId, router]);

  const fetchData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockData = {
        sundayAttendance: {
          totalAttendance: 156,
          averageAttendance: 45.2,
          growth: 8.5,
          weeklyTrend: [
            { date: "2024-01-07", male: 25, female: 30, total: 55 },
            { date: "2024-01-14", male: 28, female: 32, total: 60 },
            { date: "2024-01-21", male: 22, female: 35, total: 57 },
            { date: "2024-01-28", male: 30, female: 38, total: 68 },
          ],
        },
        membersDatabase: {
          totalMembers: 156,
          maleMembers: 78,
          femaleMembers: 78,
          activeMembers: 142,
          inactiveMembers: 14,
          growth: 12.5,
        },
      };
      setChartData(mockData);
      
      const mockCongregation = {
        id: congregationId,
        name: getCongregationName(congregationId),
        location: "Local Area",
      };
      setCongregation(mockCongregation);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCongregationName = (id) => {
    const congregations = {
      "emmanuel": "Emmanuel Congregation Ahinsan",
      "peniel": "Peniel Congregation Esreso No1",
      "mizpah": "Mizpah Congregation Odagya No1",
      "christ": "Christ Congregation Ahinsan Estate",
      "ebenezer": "Ebenezer Congregation Dompoase Aprabo",
      "favour": "Favour Congregation Esreso No2",
      "liberty": "Liberty Congregation Esreso High Tension",
      "odagya2": "Odagya No2",
      "nom": "NOM",
      "kokobriko": "Kokobriko"
    };
    return congregations[id] || "Unknown Congregation";
  };

  const handleLogout = () => {
    const authKey = `congregation_auth_${congregationId}`;
    sessionStorage.removeItem(authKey);
    router.push(`/local/congregation/${congregationId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <LocalDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                <i className="fas fa-chart-bar text-blue-600 mr-3"></i>
                {congregation?.name} Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Detailed insights and analytics for your congregation
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Attendance</p>
                <p className="text-2xl font-bold">{chartData.sundayAttendance?.totalAttendance || 0}</p>
              </div>
              <i className="fas fa-users text-2xl opacity-80"></i>
            </div>
          </div>

          <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Average Attendance</p>
                <p className="text-2xl font-bold">{chartData.sundayAttendance?.averageAttendance || 0}</p>
              </div>
              <i className="fas fa-chart-line text-2xl opacity-80"></i>
            </div>
          </div>

          <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Growth Rate</p>
                <p className="text-2xl font-bold">{chartData.sundayAttendance?.growth || 0}%</p>
              </div>
              <i className="fas fa-arrow-up text-2xl opacity-80"></i>
            </div>
          </div>

          <div className="bg-orange-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Members</p>
                <p className="text-2xl font-bold">{chartData.membersDatabase?.totalMembers || 0}</p>
              </div>
              <i className="fas fa-user-friends text-2xl opacity-80"></i>
            </div>
          </div>
        </div>

        {/* Members Database Analytics */}
        <div className="bg-gray-50 dark:bg-gray-700 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            <i className="fas fa-database text-green-600 mr-3"></i>
            Members Database Analytics
          </h2>

          {/* Members Key Metrics */}
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-500 text-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Total Members</p>
                    <p className="text-lg font-bold">{chartData.membersDatabase?.totalMembers || 0}</p>
                  </div>
                  <i className="fas fa-users text-xl opacity-80"></i>
                </div>
              </div>

              <div className="bg-blue-500 text-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Male Members</p>
                    <p className="text-lg font-bold">{chartData.membersDatabase?.maleMembers || 0}</p>
                  </div>
                  <i className="fas fa-mars text-xl opacity-80"></i>
                </div>
              </div>

              <div className="bg-pink-500 text-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Female Members</p>
                    <p className="text-lg font-bold">{chartData.membersDatabase?.femaleMembers || 0}</p>
                  </div>
                  <i className="fas fa-venus text-xl opacity-80"></i>
                </div>
              </div>

              <div className="bg-purple-500 text-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Active Members</p>
                    <p className="text-lg font-bold">{chartData.membersDatabase?.activeMembers || 0}</p>
                  </div>
                  <i className="fas fa-user-check text-xl opacity-80"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Members by Gender
              </h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Male Members
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {chartData.membersDatabase?.maleMembers || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${((chartData.membersDatabase?.maleMembers || 0) / (chartData.membersDatabase?.totalMembers || 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Female Members
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {chartData.membersDatabase?.femaleMembers || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-pink-500"
                      style={{
                        width: `${((chartData.membersDatabase?.femaleMembers || 0) / (chartData.membersDatabase?.totalMembers || 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Gender Distribution
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                  Total Members
                </h4>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="fas fa-mars text-white text-sm"></i>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {chartData.membersDatabase?.maleMembers || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Male
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="fas fa-venus text-white text-sm"></i>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {chartData.membersDatabase?.femaleMembers || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Female
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/local/congregation/${congregationId}`)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Dashboard
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {congregation?.name} Analytics
            </div>
          </div>
        </div>
      </div>
    </LocalDashboardLayout>
  );
} 