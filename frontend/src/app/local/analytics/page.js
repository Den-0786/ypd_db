"use client";

import { useState, useEffect } from "react";
import LocalDashboardLayout from "../../components/LocalDashboardLayout";

export default function LocalAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
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
          monthlyTrend: filteredData.sundayAttendance.monthlyTrend,
          yearlyTrend: filteredData.sundayAttendance.yearlyTrend,
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
      // Try to fetch real data from API first
      const response = await fetch(
        "http://localhost:8000/api/analytics/detailed/"
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Use real data from API
          const realData = {
            sundayAttendance: {
              totalAttendance: data.data.weeklyTrend.reduce(
                (sum, week) => sum + week.total,
                0
              ),
              averageAttendance:
                data.data.weeklyTrend.length > 0
                  ? data.data.weeklyTrend.reduce(
                      (sum, week) => sum + week.total,
                      0
                    ) / data.data.weeklyTrend.length
                  : 0,
              congregationsCount: data.data.congregations.length,
              growth: 0, // Would need to calculate from trend data
              weeklyTrend: data.data.weeklyTrend || [],
              monthlyTrend: data.data.monthlyTrend || [],
              yearlyTrend: data.data.yearlyTrend || [],
            },
            membersDatabase: {
              totalMembers: data.data.congregations.reduce(
                (sum, cong) => sum + cong.members,
                0
              ),
              congregations: data.data.congregations || [],
              genderDistribution: data.data.genderDistribution || [],
            },
          };
          setChartData(realData);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      // Show toast message instead of console.log
      if (typeof window !== "undefined" && window.showToast) {
        window.showToast("Failed to fetch analytics data", "error");
      }
    }

    // Set empty data if API fails
    setChartData({
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
        congregations: [],
        genderDistribution: [],
      },
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <LocalDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </LocalDashboardLayout>
    );
  }

  return (
    <LocalDashboardLayout>
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            <i className="fas fa-chart-bar text-blue-600 mr-3"></i>
            Local Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Comprehensive insights into local YPG attendance and membership data
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          {/* Large screens - All filters on single row */}
          <div className="hidden lg:grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="local-analytics-cong-filter-lg"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Congregation
              </label>
              <select
                id="local-analytics-cong-filter-lg"
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
                htmlFor="local-analytics-date-start-lg"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Start Date
              </label>
              <input
                id="local-analytics-date-start-lg"
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
                htmlFor="local-analytics-date-end-lg"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                End Date
              </label>
              <input
                id="local-analytics-date-end-lg"
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

          {/* Small screens - Stacked filters */}
          <div className="lg:hidden space-y-3">
            <div>
              <label
                htmlFor="local-analytics-cong-filter-sm"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Congregation
              </label>
              <select
                id="local-analytics-cong-filter-sm"
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
                  htmlFor="local-analytics-date-start-sm"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Start Date
                </label>
                <input
                  id="local-analytics-date-start-sm"
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
                  htmlFor="local-analytics-date-end-sm"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  End Date
                </label>
                <input
                  id="local-analytics-date-end-sm"
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

        <div className="bg-gray-50 dark:bg-gray-700 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 mt-6">
            <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
            Sunday Attendance Analytics
          </h2>

          {/* Statistics Cards */}
          <div className="flex overflow-x-auto space-x-4 pb-4 mb-8">
            <div className="flex-shrink-0 w-48 bg-blue-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Total Attendance</p>
                  <p className="text-lg font-bold">
                    {chartData.sundayAttendance.totalAttendance}
                  </p>
                </div>
                <i className="fas fa-users text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>

            <div className="flex-shrink-0 w-48 bg-indigo-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-indigo-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 dark:from-indigo-400/10 dark:to-indigo-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Male Attendance</p>
                  <p className="text-lg font-bold">
                    {chartData.sundayAttendance.weeklyTrend
                      .slice(0, 4)
                      .reduce((sum, week) => sum + week.male, 0)}
                  </p>
                </div>
                <i className="fas fa-mars text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>

            <div className="flex-shrink-0 w-48 bg-pink-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-pink-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-pink-600/20 dark:from-pink-400/10 dark:to-pink-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Female Attendance</p>
                  <p className="text-lg font-bold">
                    {chartData.sundayAttendance.weeklyTrend
                      .slice(0, 4)
                      .reduce((sum, week) => sum + week.female, 0)}
                  </p>
                </div>
                <i className="fas fa-venus text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>

            <div className="flex-shrink-0 w-48 bg-green-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Average Attendance</p>
                  <p className="text-lg font-bold">
                    {chartData.sundayAttendance.averageAttendance}
                  </p>
                </div>
                <i className="fas fa-chart-bar text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>

            <div className="flex-shrink-0 w-48 bg-yellow-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-yellow-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 dark:from-yellow-400/10 dark:to-yellow-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Growth</p>
                  <p className="text-lg font-bold">
                    {chartData.sundayAttendance.growth}%
                  </p>
                </div>
                <i className="fas fa-arrow-up text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
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
                    href="/local/weeklytrends"
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
                    href="/local/monthlytrends"
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
                    href="/local/yearlytreds"
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
                        href="/local/weeklytrends"
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
                        href="/local/monthlytrends"
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
                        href="/local/yearlytreds"
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
        <div className="bg-gray-50 dark:bg-gray-700 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            <i className="fas fa-database text-green-600 mr-3"></i>
            Members Database Analytics
          </h2>

          {/* Members Key Metrics */}
          <div className="mb-8">
            {/* Large screens - Grid layout */}
            <div className="hidden lg:grid grid-cols-6 gap-3">
              <div className="bg-green-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Total Members</p>
                    <p className="text-lg font-bold">
                      {chartData.membersDatabase?.congregations?.reduce(
                        (sum, c) => sum + c.count,
                        0
                      ) || 0}
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
              <div className="bg-orange-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Active Guilders</p>
                    <p className="text-lg font-bold">
                      {Math.floor(
                        (chartData.membersDatabase?.congregations?.reduce(
                          (sum, c) => sum + c.count,
                          0
                        ) || 0) * 0.85
                      )}
                    </p>
                  </div>
                  <i className="fas fa-user-check text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-red-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-red-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 dark:from-red-400/10 dark:to-red-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Inactive Guilders</p>
                    <p className="text-lg font-bold">
                      {Math.floor(
                        (chartData.membersDatabase?.congregations?.reduce(
                          (sum, c) => sum + c.count,
                          0
                        ) || 0) * 0.15
                      )}
                    </p>
                  </div>
                  <i className="fas fa-user-times text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
              <div className="bg-yellow-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-yellow-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 dark:from-yellow-400/10 dark:to-yellow-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">Growth</p>
                    <p className="text-lg font-bold">+12.5%</p>
                  </div>
                  <i className="fas fa-arrow-up text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
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
                          {chartData.membersDatabase?.congregations?.reduce(
                            (sum, c) => sum + c.count,
                            0
                          ) || 0}
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
                  <div className="bg-orange-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Active Guilders</p>
                        <p className="text-lg font-bold">
                          {Math.floor(
                            (chartData.membersDatabase?.congregations?.reduce(
                              (sum, c) => sum + c.count,
                              0
                            ) || 0) * 0.85
                          )}
                        </p>
                      </div>
                      <i className="fas fa-user-check text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-red-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-red-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 dark:from-red-400/10 dark:to-red-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Inactive Guilders</p>
                        <p className="text-lg font-bold">
                          {Math.floor(
                            (chartData.membersDatabase?.congregations?.reduce(
                              (sum, c) => sum + c.count,
                              0
                            ) || 0) * 0.15
                          )}
                        </p>
                      </div>
                      <i className="fas fa-user-times text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                  <div className="bg-yellow-500 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg dark:shadow-yellow-500/20 relative overflow-hidden group flex-shrink-0 w-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 dark:from-yellow-400/10 dark:to-yellow-600/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-90">Growth</p>
                        <p className="text-lg font-bold">+12.5%</p>
                      </div>
                      <i className="fas fa-arrow-up text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 lg:p-4 lg:max-h-[50rem]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Members by Gender
              </h3>
              <div className="space-y-3 lg:space-y-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-3 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Male Members
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {chartData.membersDatabase?.genderDistribution?.reduce(
                        (sum, item) => sum + item.male,
                        0
                      ) || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${((chartData.membersDatabase?.genderDistribution?.reduce((sum, item) => sum + item.male, 0) || 0) / (chartData.membersDatabase?.congregations?.reduce((sum, c) => sum + c.count, 0) || 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-3 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Female Members
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {chartData.membersDatabase?.genderDistribution?.reduce(
                        (sum, item) => sum + item.female,
                        0
                      ) || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-pink-500"
                      style={{
                        width: `${((chartData.membersDatabase?.genderDistribution?.reduce((sum, item) => sum + item.female, 0) || 0) / (chartData.membersDatabase?.congregations?.reduce((sum, c) => sum + c.count, 0) || 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Gender Distribution
              </h3>
              {/* Large screens - Grid layout with cards */}
              <div className="hidden lg:grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                  <div className="relative z-10">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                      Total Members
                    </h4>
                    <div className="flex justify-center space-x-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                          <i className="fas fa-mars text-white text-sm"></i>
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {chartData.membersDatabase?.genderDistribution?.reduce(
                            (sum, item) => sum + item.male,
                            0
                          ) || 0}
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
                          {chartData.membersDatabase?.genderDistribution?.reduce(
                            (sum, item) => sum + item.female,
                            0
                          ) || 0}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Female
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Small screens - Grid layout with evenly distributed cards */}
              <div className="lg:hidden">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                    <div className="relative z-10">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                        Total Members
                      </h4>
                      <div className="flex justify-center space-x-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                            <i className="fas fa-mars text-white text-sm"></i>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {chartData.membersDatabase?.genderDistribution?.reduce(
                              (sum, item) => sum + item.male,
                              0
                            ) || 0}
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
                            {chartData.membersDatabase?.genderDistribution?.reduce(
                              (sum, item) => sum + item.female,
                              0
                            ) || 0}
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
            </div>
          </div>
        </div>
      </div>
    </LocalDashboardLayout>
  );
}
