"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import getDataStore from "../../utils/dataStore";

export default function YearlyTrendsPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [tooltip, setTooltip] = useState({
    show: false,
    data: null,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const dataStore = getDataStore();
      const attendanceRecords = await dataStore.getAttendanceRecords();
      
      console.log("DEBUG: Raw attendance records:", attendanceRecords);
      console.log("DEBUG: Number of records:", attendanceRecords?.length || 0);
      
      if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
        console.log("DEBUG: No valid attendance records found");
        setChartData({
          sundayAttendance: {
            yearlyTrend: []
          }
        });
        setLoading(false);
        return;
      }

      const yearlyData = {};
      
      attendanceRecords.forEach(record => {
        if (record && record.date) {
          const date = new Date(record.date);
          const year = date.getFullYear().toString();
          
          if (!yearlyData[year]) {
            yearlyData[year] = {
              year: year,
              male: 0,
              female: 0,
              total: 0
            };
          }
          
          yearlyData[year].male += record.male || 0;
          yearlyData[year].female += record.female || 0;
          yearlyData[year].total += record.total || 0;
        }
      });

      const yearlyTrend = Object.values(yearlyData).sort((a, b) => {
        return parseInt(a.year) - parseInt(b.year);
      });

      console.log("DEBUG: Processed yearly trend:", yearlyTrend);

      const realData = {
        sundayAttendance: {
          yearlyTrend: yearlyTrend
        }
      };
      
      setChartData(realData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setChartData({
        sundayAttendance: {
          yearlyTrend: []
        }
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const yearlyTrend = chartData.sundayAttendance?.yearlyTrend || [];
  const maxValue = Math.max(...yearlyTrend.map(y => Math.max(y?.male || 0, y?.female || 0, y?.total || 0)), 1);
  const firstYear = yearlyTrend[0] || {};
  const lastYear = yearlyTrend[yearlyTrend.length - 1] || {};
  const difference = (lastYear?.total || 0) - (firstYear?.total || 0);
  const average = yearlyTrend.length > 0 ? Math.round(yearlyTrend.reduce((sum, year) => sum + (year?.total || 0), 0) / yearlyTrend.length) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700 shadow rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 mt-4 md:mt-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
              Yearly Attendance Trends
            </h2>

            {/* Navigation Buttons */}
            <div className="flex space-x-2 mt-4 md:mt-0">
              <a
                href="/analytics/weeklytrends"
                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <i className="fas fa-calendar-week mr-2"></i>
                Weekly
              </a>
              <a
                href="/analytics/monthlytrends"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Monthly
              </a>
              <button
                disabled
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
              >
                <i className="fas fa-chart-line mr-2"></i>
                Yearly
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Yearly Trends Description Card */}
            <div className="w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border-l-4 border-green-500 border  dark:border-gray-600 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-green-600/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Yearly Attendance Overview
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {chartData.sundayAttendance?.yearlyTrend?.length > 0 ? 
                        `${chartData.sundayAttendance.yearlyTrend[0]?.year || 'N/A'} - ${chartData.sundayAttendance.yearlyTrend[chartData.sundayAttendance.yearlyTrend.length - 1]?.year || 'N/A'} - ${chartData.sundayAttendance.yearlyTrend.length} Year Analysis` : 
                        'No Data Available'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {yearlyTrend.length}
                      </div>
                      <div className="text-xs text-gray-500">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {average}
                      </div>
                      <div className="text-xs text-gray-500">Avg/Year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {difference > 0 ? "+" + difference : difference}
                      </div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Yearly attendance analysis shows long-term attendance
                    patterns across {yearlyTrend.length} years. The data reveals{" "}
                    {difference > 0
                      ? "sustained yearly growth with excellent long-term trends."
                      : "fluctuating yearly patterns that need strategic planning."}
                  </p>
                </div>
              </div>
            </div>

            {/* Yearly Trend Chart */}
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Yearly Attendance Trend
              </h3>

              {yearlyTrend.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
                  <div className="text-gray-500 dark:text-gray-400 text-lg">
                    No attendance data available
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg w-full">
                  <div className="overflow-x-auto">
                    <div className="flex items-end justify-between space-x-2 min-w-max">
                      {yearlyTrend.map((year, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center min-w-[60px] md:min-w-[80px]"
                        >
                          <div className="flex space-x-0 h-32 md:h-48 mb-1 items-end">
                            <div
                              className="w-4 md:w-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                height: `${((year?.male || 0) / maxValue) * 100}%`,
                              }}
                            >
                              <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                M: {year?.male || 0}
                              </span>
                            </div>
                            <div
                              className="w-4 md:w-6 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                height: `${((year?.female || 0) / maxValue) * 100}%`,
                              }}
                            >
                              <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                F: {year?.female || 0}
                              </span>
                            </div>
                            <div
                              className="w-4 md:w-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                height: `${((year?.total || 0) / maxValue) * 100}%`,
                              }}
                            >
                              <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                Total: {year?.total || 0}
                              </span>
                            </div>
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 text-center">
                            {year?.year || 'N/A'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Yearly Trend Analytics Card */}
              <div
                className="mt-6 p-4 md:p-6 h-[20rem] md:h-[30rem] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg w-full"
                style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-white text-lg font-semibold">
                      Yearly Trend
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Total Attendance: {yearlyTrend.reduce((sum, year) => sum + (year?.total || 0), 0)}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-green-400 shadow-lg"
                    style={{ boxShadow: "0 0 10px rgba(16, 185, 129, 0.6)" }}
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
                    {[5, 4, 3, 2, 1, 0].map((num) => (
                      <span key={num}>{Math.round((num / 5) * maxValue)}</span>
                    ))}
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
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
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
                      points={yearlyTrend
                        .map((year, index) => {
                          const x = 10 + (index * 80) / Math.max(yearlyTrend.length - 1, 1);
                          const y = 90 - ((year?.total || 0) / maxValue) * 65;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />

                    {/* Main Green Line */}
                    <polyline
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={yearlyTrend
                        .map((year, index) => {
                          const x = 10 + (index * 80) / Math.max(yearlyTrend.length - 1, 1);
                          const y = 90 - ((year?.total || 0) / maxValue) * 60;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      filter="url(#glow)"
                    />

                    {/* Invisible Interactive Path for Tooltip */}
                    <path
                      d={yearlyTrend
                        .map((year, index) => {
                          const x = 10 + (index * 80) / Math.max(yearlyTrend.length - 1, 1);
                          const y = 90 - ((year?.total || 0) / maxValue) * 60;
                          return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="12"
                      className="cursor-pointer"
                      onMouseMove={(e) => {
                        const rect = e.target
                          .closest("svg")
                          .getBoundingClientRect();
                        const mouseX =
                          ((e.clientX - rect.left) / rect.width) * 100;

                        let nearestIndex = 0;
                        let minDistance = Infinity;

                        yearlyTrend.forEach((year, index) => {
                          const x = 10 + (index * 80) / Math.max(yearlyTrend.length - 1, 1);
                          const distance = Math.abs(mouseX - x);
                          if (distance < minDistance) {
                            minDistance = distance;
                            nearestIndex = index;
                          }
                        });

                        const nearestYear = yearlyTrend[nearestIndex];
                        const x = 10 + (nearestIndex * 80) / Math.max(yearlyTrend.length - 1, 1);
                        const y = 90 - ((nearestYear?.total || 0) / maxValue) * 60;
                        const prevYear =
                          nearestIndex > 0 ? yearlyTrend[nearestIndex - 1] : null;
                        const difference = prevYear
                          ? (nearestYear?.total || 0) - (prevYear?.total || 0)
                          : 0;

                        const tooltipX = (x / 100) * rect.width;
                        const tooltipY = (y / 100) * rect.height - 40;

                        setTooltip({
                          show: true,
                          data: {
                            year: nearestYear,
                            index: nearestIndex,
                            difference,
                            prevYear,
                            type: "yearly",
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
                    {yearlyTrend.map((year, index) => {
                      const x = 10 + (index * 80) / Math.max(yearlyTrend.length - 1, 1);
                      const y = 90 - ((year?.total || 0) / maxValue) * 60;
                      const prevYear = index > 0 ? yearlyTrend[index - 1] : null;
                      const difference = prevYear ? (year?.total || 0) - (prevYear?.total || 0) : 0;

                      return (
                        <g key={index}>
                          <circle
                            cx={x}
                            cy={y}
                            r="3"
                            fill="rgba(16, 185, 129, 0.3)"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="2"
                            fill="#10b981"
                            stroke="#ffffff"
                            strokeWidth="0.5"
                            className="cursor-pointer hover:r-2.5 transition-all duration-200"
                            onMouseEnter={(e) => {
                              const rect = e.target
                                .closest("svg")
                                .getBoundingClientRect();
                              const tooltipX = (x / 100) * rect.width;
                              const tooltipY = (y / 100) * rect.height - 40;

                              setTooltip({
                                show: true,
                                data: {
                                  year,
                                  index,
                                  difference,
                                  prevYear,
                                  type: "yearly",
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
                    })}
                  </svg>

                  {/* Tooltip */}
                  {tooltip.show && tooltip.data && (
                    <div
                      className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg z-10 min-w-[160px]"
                      style={{
                        left:
                          tooltip.data.index < 3
                            ? Math.min(tooltip.x + 20, window.innerWidth - 180) // Right side for years 1-3
                            : Math.max(10, tooltip.x - 20), // Left side for years 4-6
                        top: Math.max(10, tooltip.y),
                        transform:
                          tooltip.data.index < 3 ? "none" : "translateX(-100%)",
                      }}
                    >
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {tooltip.data.year?.year || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                        Male: {tooltip.data.year?.male || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                        Female: {tooltip.data.year?.female || 0}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Total: {tooltip.data.year?.total || 0}
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
                          {tooltip.data.difference} from previous year
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Trend Analysis */}
                <div className="mt-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Yearly Trend Analysis
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {difference > 0
                      ? `Yearly attendance has increased by ${Math.abs(difference)} people over the years. Excellent long-term growth!`
                      : `Yearly attendance has decreased by ${Math.abs(difference)} people. Consider long-term engagement strategies.`}
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
