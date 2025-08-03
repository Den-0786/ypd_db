"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import dataStore from "../utils/dataStore";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    sundayAttendance: {
      totalAttendance: 0,
      averageAttendance: 0,
      congregationsCount: 0,
      growth: 0,
      weeklyTrend: [],
      monthlyTrend: [],
      yearlyTrend: [],
    },
    membersDatabase: {
      totalMembers: 0,
      congregations: [],
      genderDistribution: [],
    },
  });
  const [tooltip, setTooltip] = useState({
    show: false,
    data: null,
    x: 0,
    y: 0,
  });
  const [selectedCongregation, setSelectedCongregation] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  useEffect(() => {
    if (!chartData.sundayAttendance) return;
    let filteredData = { ...chartData };
    // Filter by congregation
    if (selectedCongregation !== "All") {
      filteredData = {
        ...filteredData,
        sundayAttendance: {
          ...filteredData.sundayAttendance,
          weeklyTrend: filteredData.sundayAttendance.weeklyTrend.filter(
            (w) => w.congregation === selectedCongregation
          ),
          monthlyTrend: filteredData.sundayAttendance.monthlyTrend, // Could filter if data is per congregation
          yearlyTrend: filteredData.sundayAttendance.yearlyTrend, // Could filter if data is per congregation
        },
        membersDatabase: {
          ...filteredData.membersDatabase,
          congregations: filteredData.membersDatabase.congregations.filter(
            (c) => c.name === selectedCongregation
          ),
          genderDistribution:
            filteredData.membersDatabase.genderDistribution.filter(
              (g) => g.congregation === selectedCongregation
            ),
        },
      };
    }
    // Filter by date range (for weeklyTrend only)
    if (dateRange.start && dateRange.end) {
      filteredData = {
        ...filteredData,
        sundayAttendance: {
          ...filteredData.sundayAttendance,
          weeklyTrend: filteredData.sundayAttendance.weeklyTrend.filter(
            (w) => w.date >= dateRange.start && w.date <= dateRange.end
          ),
        },
      };
    }
    setFiltered(filteredData);
  }, [chartData, selectedCongregation, dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Get analytics data from data store
      const analyticsData = dataStore.getAnalyticsData();
      
      if (analyticsData && Object.keys(analyticsData).length > 0) {
        setChartData(analyticsData);
      } else {
        // Fallback to mock data if no real data exists
        const mockData = {
          sundayAttendance: {
            totalAttendance: 3456,
            averageAttendance: 81.7,
            congregationsCount: 3,
            growth: 12.5,
            weeklyTrend: [
              { date: "2024-01-07", male: 125, female: 150, total: 275 },
              { date: "2024-01-14", male: 128, female: 152, total: 280 },
              { date: "2024-01-21", male: 122, female: 155, total: 277 },
              { date: "2024-01-28", male: 130, female: 158, total: 288 },
              { date: "2024-02-04", male: 126, female: 154, total: 280 },
              { date: "2024-02-11", male: 129, female: 157, total: 286 },
              { date: "2024-02-18", male: 124, female: 153, total: 277 },
              { date: "2024-02-25", male: 131, female: 159, total: 290 },
            ],
            monthlyTrend: [
              { month: "Jan", male: 505, female: 635, total: 1140 },
              { month: "Feb", male: 510, female: 643, total: 1153 },
              { month: "Mar", male: 498, female: 628, total: 1126 },
              { month: "Apr", male: 515, female: 645, total: 1160 },
              { month: "May", male: 508, female: 638, total: 1146 },
              { month: "Jun", male: 512, female: 642, total: 1154 },
              { month: "Jul", male: 518, female: 648, total: 1166 },
              { month: "Aug", male: 525, female: 655, total: 1180 },
              { month: "Sep", male: 532, female: 662, total: 1194 },
              { month: "Oct", male: 540, female: 670, total: 1210 },
              { month: "Nov", male: 545, female: 675, total: 1220 },
              { month: "Dec", male: 550, female: 680, total: 1230 },
            ],
            yearlyTrend: [
              { year: "2019", male: 6000, female: 7200, total: 13200 },
              { year: "2020", male: 6300, female: 7500, total: 13800 },
              { year: "2021", male: 6600, female: 7800, total: 14400 },
              { year: "2022", male: 6900, female: 8100, total: 15000 },
              { year: "2023", male: 7200, female: 8400, total: 15600 },
              { year: "2024", male: 7500, female: 8700, total: 16200 },
            ],
          },
          membersDatabase: {
            totalMembers: 127,
            congregations: [
              {
                name: "Emmanuel Congregation Ahinsan",
                count: 45,
                color: "#3B82F6",
              },
              {
                name: "Peniel Congregation Esreso No1",
                count: 32,
                color: "#10B981",
              },
              {
                name: "Mizpah Congregation Odagya No1",
                count: 28,
                color: "#F59E0B",
              },
              {
                name: "Christ Congregation Ahinsan Estate",
                count: 22,
                color: "#EF4444",
              },
              {
                name: "Ebenezer Congregation Dompoase Aprabo",
                count: 18,
                color: "#8B5CF6",
              },
              {
                name: "Favour Congregation Esreso No2",
                count: 15,
                color: "#06B6D4",
              },
              {
                name: "Liberty Congregation Esreso High Tension",
                count: 12,
                color: "#F97316",
              },
              { name: "Odagya No2", count: 10, color: "#EC4899" },
              { name: "NOM", count: 8, color: "#84CC16" },
              { name: "Kokobriko", count: 6, color: "#F472B6" },
            ],
            genderDistribution: [
              { congregation: "Emmanuel Congregation Ahinsan", male: 22, female: 23 },
              { congregation: "Peniel Congregation Esreso No1", male: 16, female: 16 },
              { congregation: "Mizpah Congregation Odagya No1", male: 14, female: 14 },
              { congregation: "Christ Congregation Ahinsan Estate", male: 11, female: 11 },
              { congregation: "Ebenezer Congregation Dompoase Aprabo", male: 9, female: 9 },
              { congregation: "Favour Congregation Esreso No2", male: 8, female: 7 },
              { congregation: "Liberty Congregation Esreso High Tension", male: 6, female: 6 },
              { congregation: "Odagya No2", male: 5, female: 5 },
              { congregation: "NOM", male: 4, female: 4 },
              { congregation: "Kokobriko", male: 3, female: 3 },
            ],
          },
        };
        setChartData(mockData);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout currentPage="Analytics">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Empty state if no data after filtering
  if (
    filtered &&
    !filtered.sundayAttendance?.weeklyTrend?.length &&
    !filtered.sundayAttendance?.monthlyTrend?.length &&
    !filtered.sundayAttendance?.yearlyTrend?.length
  ) {
    return (
      <DashboardLayout currentPage="Analytics">
        <div className="flex flex-col items-center justify-center h-96">
          <i className="fas fa-folder-open text-5xl text-gray-300 mb-4"></i>
          <div className="text-xl font-semibold text-gray-500 mb-2">
            No analytics data found
          </div>
          <div className="text-gray-400">
            Try adjusting your filters or date range.
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="Analytics" currentPageProps={{ filtered }}>
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            <i className="fas fa-chart-bar text-blue-600 mr-3"></i>
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Comprehensive insights into YPG attendance and membership data
          </p>
        </div>
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          {/* Large screens - All filters on single row */}
          <div className="hidden lg:grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="analytics-cong-filter-lg"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Congregation
              </label>
              <select
                id="analytics-cong-filter-lg"
                value={selectedCongregation}
                onChange={(e) => setSelectedCongregation(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                aria-label="Filter by congregation"
              >
                <option value="All" className="text-gray-800 dark:text-white">
                  All Congregations
                </option>
                {chartData.membersDatabase?.congregations?.map((c) => (
                  <option
                    key={c.name}
                    value={c.name}
                    className="text-gray-800 dark:text-white"
                  >
                    {c.name}
                  </option>
                )) || []}
              </select>
            </div>
            <div>
              <label
                htmlFor="analytics-date-start-lg"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Start Date
              </label>
              <input
                id="analytics-date-start-lg"
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                aria-label="Start date"
              />
            </div>
            <div>
              <label
                htmlFor="analytics-date-end-lg"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                End Date
              </label>
              <input
                id="analytics-date-end-lg"
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                aria-label="End date"
              />
            </div>
          </div>
          {/* Small screens - Congregation on top, dates on single row below */}
          <div className="lg:hidden space-y-3">
            <div>
              <label
                htmlFor="analytics-cong-filter-sm"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Congregation
              </label>
              <select
                id="analytics-cong-filter-sm"
                value={selectedCongregation}
                onChange={(e) => setSelectedCongregation(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                aria-label="Filter by congregation"
              >
                <option value="All" className="text-gray-800 dark:text-white">
                  All Congregations
                </option>
                {chartData.membersDatabase?.congregations?.map((c) => (
                  <option
                    key={c.name}
                    value={c.name}
                    className="text-gray-800 dark:text-white"
                  >
                    {c.name}
                  </option>
                )) || []}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="analytics-date-start-sm"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Start Date
                </label>
                <input
                  id="analytics-date-start-sm"
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                  aria-label="Start date"
                />
              </div>
              <div>
                <label
                  htmlFor="analytics-date-end-sm"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  End Date
                </label>
                <input
                  id="analytics-date-end-sm"
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                  aria-label="End date"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
            Sunday Attendance Analytics
          </h2>

          <div className="mb-8">
            {/* Large screens - Grid layout */}
            <div className="hidden lg:grid grid-cols-4 gap-3">
              <div className="bg-blue-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Total Attendance</p>
                    <p className="text-lg font-bold">
                      {chartData.sundayAttendance?.totalAttendance || 0}
                    </p>
                  </div>
                  <i className="fas fa-users text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-green-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Average Attendance</p>
                    <p className="text-lg font-bold">
                      {chartData.sundayAttendance?.averageAttendance || 0}
                    </p>
                  </div>
                  <i className="fas fa-chart-line text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-purple-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Congregations</p>
                    <p className="text-lg font-bold">
                      {chartData.sundayAttendance?.congregationsCount || 0}
                    </p>
                  </div>
                  <i className="fas fa-church text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-yellow-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-yellow-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 dark:from-yellow-400/10 dark:to-yellow-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Growth</p>
                    <p className="text-lg font-bold">
                      {chartData.sundayAttendance?.growth || 0}%
                    </p>
                  </div>
                  <i className="fas fa-arrow-up text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>
            {/* Small screens - Horizontal scrollable layout */}
            <div className="lg:hidden">
              <div className="overflow-x-auto">
                <div className="flex space-x-3 min-w-max pb-2">
                  <div className="bg-blue-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Total Attendance</p>
                        <p className="text-lg font-bold">
                          {chartData.sundayAttendance?.totalAttendance || 0}
                        </p>
                      </div>
                      <i className="fas fa-users text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-green-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Average Attendance</p>
                        <p className="text-lg font-bold">
                          {chartData.sundayAttendance?.averageAttendance || 0}
                        </p>
                      </div>
                      <i className="fas fa-chart-line text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-purple-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Congregations</p>
                        <p className="text-lg font-bold">
                          {chartData.sundayAttendance?.congregationsCount || 0}
                        </p>
                      </div>
                      <i className="fas fa-church text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-yellow-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-yellow-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 dark:from-yellow-400/10 dark:to-yellow-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Growth</p>
                        <p className="text-lg font-bold">
                          {chartData.sundayAttendance?.growth || 0}%
                        </p>
                      </div>
                      <i className="fas fa-arrow-up text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Navigation Cards to Separate Trend Components */}
            <div>
              {/* Large screens - Grid layout */}
              <div className="hidden md:grid grid-cols-3 gap-6">
                {/* Weekly Trends Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Weekly Trends
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Detailed weekly attendance analysis
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-calendar-week text-white"></i>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    View comprehensive weekly attendance trends with bar charts
                    and line graphs
                  </p>
                  <a
                    href="/analytics/weeklytrends"
                    className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    View Weekly Trends
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>

                {/* Monthly Trends Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Monthly Trends
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Monthly attendance patterns
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-calendar-alt text-white"></i>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Explore monthly attendance trends with detailed analytics
                    and visualizations
                  </p>
                  <a
                    href="/analytics/monthlytrends"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    View Monthly Trends
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>

                {/* Yearly Trends Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Yearly Trends
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Long-term attendance analysis
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <i className="fas fa-chart-line text-white"></i>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Analyze yearly attendance patterns and long-term growth
                    trends
                  </p>
                  <a
                    href="/analytics/yearlytrends"
                    className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    View Yearly Trends
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
              {/* Small screens - Horizontal scrollable layout */}
              <div className="md:hidden">
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 min-w-max pb-2">
                    {/* Weekly Trends Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Weekly Trends
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Detailed weekly attendance analysis
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                          <i className="fas fa-calendar-week text-white"></i>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        View comprehensive weekly attendance trends with bar
                        charts and line graphs
                      </p>
                      <a
                        href="/analytics/weeklytrends"
                        className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        View Weekly Trends
                        <i className="fas fa-arrow-right ml-2"></i>
                      </a>
                    </div>

                    {/* Monthly Trends Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Monthly Trends
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Monthly attendance patterns
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <i className="fas fa-calendar-alt text-white"></i>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Explore monthly attendance trends with detailed
                        analytics and visualizations
                      </p>
                      <a
                        href="/analytics/monthlytrends"
                        className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        View Monthly Trends
                        <i className="fas fa-arrow-right ml-2"></i>
                      </a>
                    </div>

                    {/* Yearly Trends Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Yearly Trends
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Long-term attendance analysis
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <i className="fas fa-chart-line text-white"></i>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Analyze yearly attendance patterns and long-term growth
                        trends
                      </p>
                      <a
                        href="/analytics/yearlytrends"
                        className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        View Yearly Trends
                        <i className="fas fa-arrow-right ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Database Analytics Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            <i className="fas fa-database text-green-600 mr-3"></i>
            Congregations Database Analytics
          </h2>

          {/* Members Key Metrics */}
          <div className="mb-8">
            {/* Large screens - Grid layout */}
            <div className="hidden lg:grid grid-cols-4 gap-3">
              <div className="bg-green-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Total Members</p>
                    <p className="text-lg font-bold">
                      {chartData.membersDatabase?.totalMembers || 0}
                    </p>
                  </div>
                  <i className="fas fa-users text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-blue-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Male Members</p>
                    <p className="text-lg font-bold">
                      {chartData.membersDatabase?.genderDistribution?.reduce(
                        (sum, item) => sum + item.male,
                        0
                      ) || 0}
                    </p>
                  </div>
                  <i className="fas fa-mars text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-pink-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-pink-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-pink-600/20 dark:from-pink-400/10 dark:to-pink-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Female Members</p>
                    <p className="text-lg font-bold">
                      {chartData.membersDatabase?.genderDistribution?.reduce(
                        (sum, item) => sum + item.female,
                        0
                      ) || 0}
                    </p>
                  </div>
                  <i className="fas fa-venus text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-purple-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Congregations</p>
                    <p className="text-lg font-bold">
                      {chartData.membersDatabase?.congregations?.length || 0}
                    </p>
                  </div>
                  <i className="fas fa-church text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>
            {/* Small screens - Horizontal scrollable layout */}
            <div className="lg:hidden">
              <div className="overflow-x-auto">
                <div className="flex space-x-3 min-w-max pb-2">
                  <div className="bg-green-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Total Members</p>
                        <p className="text-lg font-bold">
                          {chartData.membersDatabase?.totalMembers || 0}
                        </p>
                      </div>
                      <i className="fas fa-users text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-blue-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Male Members</p>
                        <p className="text-lg font-bold">
                          {chartData.membersDatabase?.genderDistribution?.reduce(
                            (sum, item) => sum + item.male,
                            0
                          ) || 0}
                        </p>
                      </div>
                      <i className="fas fa-mars text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-pink-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-pink-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-pink-600/20 dark:from-pink-400/10 dark:to-pink-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Female Members</p>
                        <p className="text-lg font-bold">
                          {chartData.membersDatabase?.genderDistribution?.reduce(
                            (sum, item) => sum + item.female,
                            0
                          ) || 0}
                        </p>
                      </div>
                      <i className="fas fa-venus text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-purple-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Congregations</p>
                        <p className="text-lg font-bold">
                          {chartData.membersDatabase?.congregations?.length ||
                            0}
                        </p>
                      </div>
                      <i className="fas fa-church text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 lg:p-4 lg:max-h-[50rem]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Members by Congregation
              </h3>
              <div className="space-y-3 lg:space-y-2">
                {chartData.membersDatabase?.congregations?.map(
                  (congregation, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-3 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {congregation.name}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {congregation.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(congregation.count / Math.max(...(chartData.membersDatabase?.congregations?.map((c) => c.count) || [0]))) * 100}%`,
                            backgroundColor: congregation.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Gender Distribution by Congregation
              </h3>
              {/* Large screens - Grid layout with cards */}
              <div className="hidden lg:grid grid-cols-1 gap-6">
                {chartData.membersDatabase?.genderDistribution?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                      <div className="relative z-10">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                          {item.congregation}
                        </h4>
                        <div className="flex justify-center space-x-4">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                              <i className="fas fa-mars text-white text-sm"></i>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.male}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Male
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                              <i className="fas fa-venus text-white text-sm"></i>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.female}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Female
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              {/* Small screens - Horizontal scrollable layout */}
              <div className="lg:hidden">
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 min-w-max pb-2">
                    {chartData.membersDatabase?.genderDistribution?.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group flex-shrink-0 w-48"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                          <div className="relative z-10">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                              {item.congregation}
                            </h4>
                            <div className="flex justify-center space-x-4">
                              <div className="text-center">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                                  <i className="fas fa-mars text-white text-sm"></i>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.male}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Male
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                                  <i className="fas fa-venus text-white text-sm"></i>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.female}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Female
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
