"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import LocalDashboardLayout from "../../../components/LocalDashboardLayout";

export default function CongregationDashboard() {
  const params = useParams();
  const router = useRouter();
  const { congregationId } = params;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [congregation, setCongregation] = useState(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated for this congregation
    const authKey = `congregation_auth_${congregationId}`;
    const authData = sessionStorage.getItem(authKey);
    
    if (authData) {
      const { authenticated, timestamp } = JSON.parse(authData);
      // Check if authentication is still valid (24 hours)
      if (authenticated && (Date.now() - timestamp) < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
        fetchCongregationData();
      } else {
        sessionStorage.removeItem(authKey);
      }
    }
    setIsLoading(false);
  }, [congregationId]);

  const fetchCongregationData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockCongregation = {
        id: congregationId,
        name: getCongregationName(congregationId),
        location: "Local Area",
        background_color: "#f0f0f0"
      };
      setCongregation(mockCongregation);
    } catch (error) {
      console.error("Error fetching congregation data:", error);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Mock authentication - replace with actual API call
      const mockPins = {
        "emmanuel": "123456",
        "peniel": "234567",
        "mizpah": "345678",
        "christ": "456789",
        "ebenezer": "567890",
        "favour": "678901",
        "liberty": "789012",
        "odagya2": "890123",
        "nom": "901234",
        "kokobriko": "012345"
      };

      const correctPin = mockPins[congregationId];
      
      if (pin === correctPin) {
        setIsAuthenticated(true);
        // Store authentication in session storage
        const authKey = `congregation_auth_${congregationId}`;
        sessionStorage.setItem(authKey, JSON.stringify({
          authenticated: true,
          timestamp: Date.now()
        }));
        fetchCongregationData();
      } else {
        setError("Invalid PIN. Please try again.");
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
    }
  };

  const handleLogout = () => {
    const authKey = `congregation_auth_${congregationId}`;
    sessionStorage.removeItem(authKey);
    setIsAuthenticated(false);
    setPin("");
    setError("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-church text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {getCongregationName(congregationId)}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Enter your congregation PIN to access the dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Congregation PIN
                </label>
                <input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                  placeholder="Enter 6-digit PIN"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                Access Dashboard
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/local")}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Back to Local Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LocalDashboardLayout>
      <div className="space-y-6">
        {/* Header with congregation info and logout */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                <i className="fas fa-church text-blue-600 mr-3"></i>
                {congregation?.name || getCongregationName(congregationId)}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Local Congregation Dashboard
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

        {/* Dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Stats Cards */}
          <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Members</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <i className="fas fa-users text-2xl opacity-80"></i>
            </div>
          </div>

          <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Male Members</p>
                <p className="text-2xl font-bold">78</p>
              </div>
              <i className="fas fa-mars text-2xl opacity-80"></i>
            </div>
          </div>

          <div className="bg-pink-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Female Members</p>
                <p className="text-2xl font-bold">78</p>
              </div>
              <i className="fas fa-venus text-2xl opacity-80"></i>
            </div>
          </div>

          <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Members</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <i className="fas fa-user-check text-2xl opacity-80"></i>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Analytics
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  View detailed analytics
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <i className="fas fa-chart-bar text-white"></i>
              </div>
            </div>
            <a
              href={`/local/congregation/${congregationId}/analytics`}
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              View Analytics
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Attendance
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage Sunday attendance
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
            </div>
            <a
              href={`/local/congregation/${congregationId}/attendance`}
              className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Manage Attendance
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Members
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage congregation members
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <i className="fas fa-users text-white"></i>
              </div>
            </div>
            <a
              href={`/local/congregation/${congregationId}/members`}
              className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Manage Members
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </LocalDashboardLayout>
  );
} 