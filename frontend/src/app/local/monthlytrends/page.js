"use client";

import { useState, useEffect } from "react";
import LocalDashboardLayout from "../../components/LocalDashboardLayout";
import getDataStore from "../../utils/dataStore";

export default function MonthlyTrendsPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [tooltip, setTooltip] = useState({
    show: false,
    data: null,
    x: 0,
    y: 0,
  });
  const [congregationName, setCongregationName] = useState(null);

  useEffect(() => {
    // Get congregation name from localStorage
    const storedCongregationName = localStorage.getItem("congregationName");
    if (storedCongregationName) {
      setCongregationName(storedCongregationName);
    }
  }, []);

  useEffect(() => {
    if (congregationName) {
      fetchAnalyticsData();
    }
  }, [congregationName]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Get data from data store
      const dataStore = getDataStore();
      const attendanceRecords = await dataStore.getAttendanceRecords({ congregation: congregationName });

      console.log("Monthly Trends - Attendance data:", attendanceRecords);

      // Group attendance records by month
      const monthlyData = {};
      if (attendanceRecords && Array.isArray(attendanceRecords)) {
        attendanceRecords.forEach((record) => {
          if (record && record.date) {
            const date = new Date(record.date);
            const monthKey = date.toLocaleDateString("default", { month: "long" });
            
            if (!monthlyData[monthKey]) {
              monthlyData[monthKey] = {
                month: monthKey,
                male: 0,
                female: 0,
                total: 0,
              };
            }
            
            monthlyData[monthKey].male += record?.male || 0;
            monthlyData[monthKey].female += record?.female || 0;
            monthlyData[monthKey].total += record?.total || 0;
          }
        });
      }

      // Convert to array and sort by month order
      const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      const monthlyTrend = Object.values(monthlyData).sort((a, b) => {
        return monthOrder.indexOf(a?.month || "") - monthOrder.indexOf(b?.month || "");
      });

          const realData = {
            sundayAttendance: {
          monthlyTrend: monthlyTrend,
            },
          };

      console.log("Monthly Trends - Final data:", realData);
          setChartData(realData);
          setLoading(false);
    } catch (error) {
      console.error("Error fetching monthly trends data:", error);
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
        <div className="bg-gray-50 dark:bg-gray-700 shadow rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 mt-4 md:mt-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
              Monthly Attendance Trends
            </h2>

            {/* Navigation Buttons */}
            <div className="flex space-x-2 mt-4 md:mt-0">
              <a
                href="/local/weeklytrends"
                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <i className="fas fa-calendar-week mr-2"></i>
                Weekly
              </a>
              <button
                disabled
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Monthly
              </button>
              <a
                href="/local/yearlytreds"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <i className="fas fa-chart-line mr-2"></i>
                Yearly
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {/* Monthly Trends Description Card */}
            <div className="w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border-l-4 border-blue-500 border  dark:border-gray-600 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-blue-600/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Monthly Attendance Overview
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {(() => {
                        const monthlyData = chartData.sundayAttendance?.monthlyTrend || [];
                        if (monthlyData.length === 0) return "No data available";
                        const firstRecord = monthlyData[0] || {};
                        const year = new Date().getFullYear(); // Use current year as fallback
                        return `${year} - ${monthlyData.length} Month Analysis`;
                      })()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {chartData.sundayAttendance?.monthlyTrend?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Months</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {(() => {
                          const monthlyData =
                            chartData.sundayAttendance?.monthlyTrend || [];
                          if (monthlyData.length === 0) return 0;
                          const total = monthlyData.reduce(
                            (sum, month) => sum + (month?.total || 0),
                            0
                          );
                          return Math.round(total / monthlyData.length);
                        })()}
                      </div>
                      <div className="text-xs text-gray-500">Avg/Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {(() => {
                          const monthlyData =
                            chartData.sundayAttendance?.monthlyTrend || [];
                          if (monthlyData.length === 0) return 0;
                          const firstMonth = monthlyData[0] || {};
                          const lastMonth = monthlyData[monthlyData.length - 1] || {};
                          const difference =
                            (lastMonth?.total || 0) - (firstMonth?.total || 0);
                          return difference > 0 ? "+" + difference : difference;
                        })()}
                      </div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Monthly attendance analysis shows attendance patterns across
                    12 months. The data reveals{" "}
                    {(() => {
                      const monthlyData =
                        chartData.sundayAttendance?.monthlyTrend || [];
                      if (monthlyData.length === 0) return "no data available for analysis.";
                      const firstMonth = monthlyData[0] || {};
                      const lastMonth = monthlyData[monthlyData.length - 1] || {};
                      const difference =
                        (lastMonth?.total || 0) - (firstMonth?.total || 0);
                      return difference > 0
                        ? "consistent monthly growth with improving attendance trends."
                        : "varying monthly patterns that require strategic attention.";
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Trend Chart */}
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Attendance Trend
              </h3>

              {/* Large Screen - All months in one card */}
              <div className="hidden lg:block">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg w-full">
                  <div className="overflow-x-auto">
                    <div className="flex items-end justify-between space-x-1 min-w-max">
                      {(chartData.sundayAttendance?.monthlyTrend || []).map(
                        (month, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center min-w-[40px]"
                          >
                            <div className="flex space-x-0 h-48 mb-1 items-end">
                              <div
                                className="w-3 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.male || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px]">
                                  M: {month?.male || 0}
                                </span>
                              </div>
                              <div
                                className="w-3 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.female || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px]">
                                  F: {month?.female || 0}
                                </span>
                              </div>
                              <div
                                className="w-3 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.total || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px]">
                                  Total: {month?.total || 0}
                                </span>
                              </div>
                            </div>
                            <div className="text-[10px] text-gray-600 dark:text-gray-300 text-center">
                              {month?.month || "N/A"}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Small Screen - Two separate cards */}
              <div className="lg:hidden space-y-4">
                {/* January to June */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg w-full">
                  <div className="overflow-x-auto">
                    <div className="flex items-end justify-between space-x-2 min-w-max">
                      {(chartData.sundayAttendance?.monthlyTrend || [])
                        .slice(0, 6)
                        .map((month, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center min-w-[50px]"
                          >
                            <div className="flex space-x-0 h-32 md:h-48 mb-1 items-end">
                              <div
                                className="w-3 md:w-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.male || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                  M: {month?.male || 0}
                                </span>
                              </div>
                              <div
                                className="w-3 md:w-4 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.female || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                  F: {month?.female || 0}
                                </span>
                              </div>
                              <div
                                className="w-3 md:w-4 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.total || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                  Total: {month?.total || 0}
                                </span>
                              </div>
                            </div>
                            <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 text-center">
                              {month?.month || "N/A"}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* July to December */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg w-full">
                  <div className="overflow-x-auto">
                    <div className="flex items-end justify-between space-x-2 min-w-max">
                      {(chartData.sundayAttendance?.monthlyTrend || [])
                        .slice(6, 12)
                        .map((month, index) => (
                          <div
                            key={index + 6}
                            className="flex flex-col items-center min-w-[50px]"
                          >
                            <div className="flex space-x-0 h-32 md:h-48 mb-1 items-end">
                              <div
                                className="w-3 md:w-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.male || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                  M: {month?.male || 0}
                                </span>
                              </div>
                              <div
                                className="w-3 md:w-4 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.female || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                  F: {month?.female || 0}
                                </span>
                              </div>
                              <div
                                className="w-3 md:w-4 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                                style={{
                                  height: `${((month?.total || 0) / Math.max(...(chartData.sundayAttendance?.monthlyTrend || []).map((m) => Math.max(m?.male || 0, m?.female || 0, m?.total || 0)))) * 100}%`,
                                }}
                              >
                                <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                  Total: {month?.total || 0}
                                </span>
                              </div>
                            </div>
                            <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 text-center">
                              {month?.month || "N/A"}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Trend Analytics Card */}
              <div
                className="mt-6 p-4 md:p-6 h-[20rem] md:h-[30rem] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg w-full"
                style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-white text-lg font-semibold">
                      Monthly Trend
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Total Attendance:{" "}
                      {(chartData.sundayAttendance?.monthlyTrend || []).reduce(
                        (sum, month) => sum + (month?.total || 0),
                        0
                      )}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-400 shadow-lg"
                    style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)" }}
                  >
                    <i className="fas fa-chart-line text-white text-sm"></i>
                  </div>
                </div>

                <div className="relative h-[10rem] md:h-[16rem] bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="border-b border-gray-300 dark:border-gray-600 opacity-30"
                      ></div>
                    ))}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
                    {(() => {
                      const monthlyData = chartData.sundayAttendance?.monthlyTrend || [];
                      if (monthlyData.length === 0) return [0, 0, 0, 0, 0, 0];
                      const maxValue = Math.max(...monthlyData.map(m => m?.total || 0));
                      const step = Math.ceil(maxValue / 5);
                      return [step * 5, step * 4, step * 3, step * 2, step, 0].map((num) => (
                      <span key={num}>{num}</span>
                      ));
                    })()}
                  </div>

                  {/* Line Graph */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ padding: "0.2rem" }}
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="0" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Background Gray Line */}
                    <polyline
                      fill="none"
                      stroke="rgba(156, 163, 175, 0.3)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={(() => {
                        const monthlyData = chartData.sundayAttendance?.monthlyTrend || [];
                        if (monthlyData.length === 0) return "";
                        const maxValue = Math.max(...monthlyData.map(m => m?.total || 0));
                        const scale = maxValue > 0 ? 80 / maxValue : 0;
                        return monthlyData.map((month, index) => {
                          const x = monthlyData.length === 1 ? 50 : 10 + index * (80 / Math.max(monthlyData.length - 1, 1));
                          const y = 90 - (month?.total || 0) * scale;
                          return `${x},${y}`;
                        }).join(" ");
                      })()}
                    />

                    {/* Main Blue Line */}
                    <polyline
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={(() => {
                        const monthlyData = chartData.sundayAttendance?.monthlyTrend || [];
                        if (monthlyData.length === 0) return "";
                        const maxValue = Math.max(...monthlyData.map(m => m?.total || 0));
                        const scale = maxValue > 0 ? 80 / maxValue : 0;
                        return monthlyData.map((month, index) => {
                          const x = monthlyData.length === 1 ? 50 : 10 + index * (80 / Math.max(monthlyData.length - 1, 1));
                          const y = 90 - (month?.total || 0) * scale;
                          return `${x},${y}`;
                        }).join(" ");
                      })()}
                      filter="url(#glow)"
                    />

                    {/* Invisible Interactive Path for Tooltip */}
                    <path
                      d={(() => {
                        const monthlyData = chartData.sundayAttendance?.monthlyTrend || [];
                        if (monthlyData.length === 0) return "";
                        const maxValue = Math.max(...monthlyData.map(m => m?.total || 0));
                        const scale = maxValue > 0 ? 80 / maxValue : 0;
                        return monthlyData.map((month, index) => {
                          const x = monthlyData.length === 1 ? 50 : 10 + index * (80 / Math.max(monthlyData.length - 1, 1));
                          const y = 90 - (month?.total || 0) * scale;
                          return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                        }).join(" ");
                      })()}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="8"
                      className="cursor-pointer"
                      onMouseMove={(e) => {
                        const rect = e.target
                          .closest("svg")
                          .getBoundingClientRect();
                        const mouseX =
                          ((e.clientX - rect.left) / rect.width) * 100;

                        // Find the nearest point based on mouse position
                        const points = chartData.sundayAttendance?.monthlyTrend || [];
                        let nearestIndex = 0;
                        let minDistance = Infinity;

                        points.forEach((month, index) => {
                          const x = 5 + index * 8;
                          const distance = Math.abs(mouseX - x);
                          if (distance < minDistance) {
                            minDistance = distance;
                            nearestIndex = index;
                          }
                        });

                        const nearestMonth = points[nearestIndex];
                        const x = 5 + nearestIndex * 8;
                        const y = 90 - ((nearestMonth?.total || 0) / 400) * 60;
                        const prevMonth =
                          nearestIndex > 0 ? points[nearestIndex - 1] : null;
                        const difference = prevMonth
                          ? (nearestMonth?.total || 0) - (prevMonth?.total || 0)
                          : 0;

                        const tooltipX = (x / 100) * rect.width;
                        const tooltipY = (y / 100) * rect.height - 40;

                        setTooltip({
                          show: true,
                          data: {
                            month: nearestMonth,
                            index: nearestIndex,
                            difference,
                            prevMonth,
                            type: "monthly",
                          },
                          x: tooltipX,
                          y: tooltipY,
                        });
                      }}
                      onMouseLeave={() => {
                        setTooltip({
                          show: false,
                          data: null,
                          x: 0,
                          y: 0,
                        });
                      }}
                    />

                    {/* Data Points */}
                    {(() => {
                      const monthlyData = chartData.sundayAttendance?.monthlyTrend || [];
                      if (monthlyData.length === 0) return [];
                      const maxValue = Math.max(...monthlyData.map(m => m?.total || 0));
                      const scale = maxValue > 0 ? 80 / maxValue : 0;
                      
                      return monthlyData.map((month, index) => {
                        const x = monthlyData.length === 1 ? 50 : 10 + index * (80 / Math.max(monthlyData.length - 1, 1));
                        const y = 90 - (month?.total || 0) * scale;
                        const prevMonth = index > 0 ? monthlyData[index - 1] : null;
                        const difference = prevMonth ? (month?.total || 0) - (prevMonth?.total || 0) : 0;

                        return (
                          <g key={index}>
                            {/* Outer glow for better visibility */}
                            <circle
                              cx={x}
                              cy={y}
                              r="3"
                              fill="rgba(59, 130, 246, 0.3)"
                              className="cursor-pointer"
                            />
                            {/* Main data point */}
                          <circle
                            cx={x}
                            cy={y}
                              r="2"
                            fill="#3b82f6"
                            stroke="#ffffff"
                              strokeWidth="0.5"
                              className="cursor-pointer hover:r-3 transition-all duration-200"
                            onMouseEnter={(e) => {
                              const rect = e.target
                                .closest("svg")
                                .getBoundingClientRect();

                              const tooltipX = (x / 100) * rect.width;
                              const tooltipY = (y / 100) * rect.height - 40;

                              setTooltip({
                                show: true,
                                data: {
                                  month,
                                  index,
                                  difference,
                                  prevMonth,
                                  type: "monthly",
                                },
                                x: tooltipX,
                                y: tooltipY,
                              });
                            }}
                            onMouseLeave={() => {
                              setTooltip({
                                show: false,
                                data: null,
                                x: 0,
                                y: 0,
                              });
                            }}
                          />
                          </g>
                        );
                      });
                    })()}
                  </svg>

                  {/* Tooltip */}
                  {tooltip.show && tooltip.data && (
                    <div
                      className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg z-10 min-w-[160px]"
                      style={{
                        left:
                          tooltip.data.index < 6
                            ? Math.min(tooltip.x + 20, window.innerWidth - 180) // Right side for Jan-Jun (index 0-5)
                            : Math.max(10, tooltip.x - 20), // Left side for Jul-Dec (index 6-11)
                        top: Math.max(10, tooltip.y),
                        transform:
                          tooltip.data.index < 6 ? "none" : "translateX(-100%)",
                      }}
                    >
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {tooltip.data.month?.month || "N/A"}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Male: {tooltip.data.month?.male || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Female: {tooltip.data.month?.female || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Total: {tooltip.data.month?.total || 0}
                      </div>
                      {tooltip.data.difference !== 0 && (
                        <div
                          className={`text-xs font-medium mt-1 ${
                            tooltip.data.difference > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {tooltip.data.difference > 0 ? "+" : ""}
                          {tooltip.data.difference} from previous month
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Trend Analysis */}
                <div className="mt-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Monthly Trend Analysis
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {(() => {
                      const monthlyData =
                        chartData.sundayAttendance?.monthlyTrend || [];
                      if (monthlyData.length === 0) return "No data available for analysis.";
                      const firstMonth = monthlyData[0] || {};
                      const lastMonth = monthlyData[monthlyData.length - 1] || {};
                      const difference =
                        (lastMonth?.total || 0) - (firstMonth?.total || 0);

                      return difference > 0
                        ? `Monthly attendance has increased by ${Math.abs(difference)} people over the year. Strong growth!`
                        : `Monthly attendance has decreased by ${Math.abs(difference)} people. Consider engagement strategies.`;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalDashboardLayout>
  );
}
