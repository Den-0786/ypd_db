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
      const mockData = {
        sundayAttendance: {
          totalAttendance: 3456,
          averageAttendance: 81.7,
          congregationsCount: 3,
          growth: 12.5,
          weeklyTrend: [
            { date: "2024-01-07", male: 25, female: 30, total: 55 },
            { date: "2024-01-14", male: 28, female: 32, total: 60 },
            { date: "2024-01-21", male: 22, female: 35, total: 57 },
            { date: "2024-01-28", male: 30, female: 38, total: 68 },
            { date: "2024-02-04", male: 26, female: 34, total: 60 },
            { date: "2024-02-11", male: 29, female: 37, total: 66 },
            { date: "2024-02-18", male: 24, female: 33, total: 57 },
            { date: "2024-02-25", male: 31, female: 39, total: 70 },
          ],
          monthlyTrend: [
            { month: "Jan", male: 105, female: 135, total: 240 },
            { month: "Feb", male: 110, female: 143, total: 253 },
            { month: "Mar", male: 98, female: 128, total: 226 },
            { month: "Apr", male: 115, female: 145, total: 260 },
            { month: "May", male: 108, female: 138, total: 246 },
            { month: "Jun", male: 112, female: 142, total: 254 },
            { month: "Jul", male: 118, female: 148, total: 266 },
            { month: "Aug", male: 125, female: 155, total: 280 },
            { month: "Sep", male: 132, female: 162, total: 294 },
            { month: "Oct", male: 140, female: 170, total: 310 },
            { month: "Nov", male: 145, female: 175, total: 320 },
            { month: "Dec", male: 150, female: 180, total: 330 },
          ],
          yearlyTrend: [
            { year: "2019", male: 1000, female: 1200, total: 2200 },
            { year: "2020", male: 1050, female: 1250, total: 2300 },
            { year: "2021", male: 1100, female: 1300, total: 2400 },
            { year: "2022", male: 1150, female: 1350, total: 2500 },
            { year: "2023", male: 1200, female: 1400, total: 2600 },
            { year: "2024", male: 1250, female: 1450, total: 2700 },
          ],
        },
        membersDatabase: {
          congregations: [
            { name: "Central", count: 1200 },
            { name: "North", count: 800 },
            { name: "South", count: 1456 },
          ],
          genderDistribution: [
            { congregation: "Central", male: 580, female: 620 },
            { congregation: "North", male: 380, female: 420 },
            { congregation: "South", male: 680, female: 776 },
          ],
        },
      };
      setChartData(mockData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  Explore monthly attendance trends with detailed analytics and
                  visualizations
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
                  Analyze yearly attendance patterns and long-term growth trends
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

            {/* Gender Distribution */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Gender Distribution by Congregation
              </h3>
              {/* Large screens - Grid layout with cards */}
              <div className="hidden lg:grid grid-cols-1 gap-6">
                {chartData.membersDatabase.genderDistribution.map(
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
              {/* Small screens - Grid layout with evenly distributed cards */}
              <div className="lg:hidden">
                <div className="grid grid-cols-2 gap-4">
                  {chartData.membersDatabase.genderDistribution.map(
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalDashboardLayout>
  );
}
