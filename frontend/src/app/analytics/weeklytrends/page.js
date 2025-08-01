"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function WeeklyTrendsPage() {
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
      const mockData = {
        sundayAttendance: {
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
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700 shadow rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 mt-4 md:mt-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
              Weekly Attendance Trends
            </h2>

            {/* Navigation Buttons */}
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                disabled
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed"
              >
                <i className="fas fa-calendar-week mr-2"></i>
                Weekly
              </button>
              <a
                href="/analytics/monthlytrends"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Monthly
              </a>
              <a
                href="/analytics/yearlytrends"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <i className="fas fa-chart-line mr-2"></i>
                Yearly
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {/* Weekly Trends Description Card */}
            <div className="w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border-l-4 border-orange-500 border dark:border-gray-600 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-orange-600/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Weekly Attendance Overview
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      January 2025 - 4 Week Analysis
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {
                          chartData.sundayAttendance.weeklyTrend.slice(0, 4)
                            .length
                        }
                      </div>
                      <div className="text-xs text-gray-500">Weeks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(
                          chartData.sundayAttendance.weeklyTrend
                            .slice(0, 4)
                            .reduce((sum, week) => sum + week.total, 0) / 4
                        )}
                      </div>
                      <div className="text-xs text-gray-500">Avg/Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {(() => {
                          const weeklyData =
                            chartData.sundayAttendance.weeklyTrend.slice(0, 4);
                          const firstWeek = weeklyData[0];
                          const lastWeek = weeklyData[weeklyData.length - 1];
                          const difference = lastWeek.total - firstWeek.total;
                          return difference > 0 ? "+" + difference : difference;
                        })()}
                      </div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Weekly attendance analysis shows attendance patterns across
                    4 weeks. The data reveals{" "}
                    {(() => {
                      const weeklyData =
                        chartData.sundayAttendance.weeklyTrend.slice(0, 4);
                      const firstWeek = weeklyData[0];
                      const lastWeek = weeklyData[weeklyData.length - 1];
                      const difference = lastWeek.total - firstWeek.total;
                      return difference > 0
                        ? "positive growth trends with increasing attendance."
                        : "fluctuating attendance patterns that need attention.";
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Weekly Attendance Bar Chart */}
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-2 md:mt-6">
                Weekly Attendance Trend
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border border-gray-100 dark:border-gray-600 w-full">
                <div className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <i className="fas fa-calendar-week text-blue-500 mr-2"></i>
                  January 2025
                </div>
                <div className="overflow-x-auto">
                  <div className="flex items-end justify-between space-x-2 md:space-x-4 min-w-max">
                    {chartData.sundayAttendance.weeklyTrend
                      .slice(0, 4)
                      .map((week, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center min-w-[60px] md:min-w-[80px]"
                        >
                          <div className="flex space-x-0 h-32 md:h-48 mb-1 items-end">
                            <div
                              className="w-4 md:w-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                height: `${(week.male / Math.max(...chartData.sundayAttendance.weeklyTrend.map((w) => Math.max(w.male, w.female, w.total)))) * 100}%`,
                              }}
                            >
                              <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                M: {week.male}
                              </span>
                            </div>
                            <div
                              className="w-4 md:w-8 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                height: `${(week.female / Math.max(...chartData.sundayAttendance.weeklyTrend.map((w) => Math.max(w.male, w.female, w.total)))) * 100}%`,
                              }}
                            >
                              <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                F: {week.female}
                              </span>
                            </div>
                            <div
                              className="w-4 md:w-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                height: `${(week.total / Math.max(...chartData.sundayAttendance.weeklyTrend.map((w) => Math.max(w.male, w.female, w.total)))) * 100}%`,
                              }}
                            >
                              <span className="transform -rotate-90 whitespace-nowrap text-[10px] md:text-xs">
                                Total: {week.total}
                              </span>
                            </div>
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-600 font-medium text-center">
                            {new Date(week.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Attendance Line Graph */}
            <div
              className="w-full"
              style={{ boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" }}
            >
              <div
                className="p-4 md:p-6 h-[20rem] md:h-[30rem] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg w-full"
                style={{ boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-white text-lg font-semibold">
                      Weekly Trend
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Total Attendance:{" "}
                      {chartData.sundayAttendance.weeklyTrend
                        .slice(0, 4)
                        .reduce((sum, week) => sum + week.total, 0)}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-orange-400 shadow-lg"
                    style={{
                      boxShadow: "0 0 10px rgba(249, 115, 22, 0.6)",
                    }}
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
                    {[10, 8, 6, 4, 2, 0].map((num) => (
                      <span key={num}>{num}</span>
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
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
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
                      points={chartData.sundayAttendance.weeklyTrend
                        .slice(0, 4)
                        .map((week, index) => {
                          const x = 10 + index * 25;
                          const y = 88 - (week.total / 10) * 6;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />

                    {/* Main Orange/Red Line */}
                    <polyline
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={chartData.sundayAttendance.weeklyTrend
                        .slice(0, 4)
                        .map((week, index) => {
                          const x = 10 + index * 25;
                          const y = 90 - (week.total / 10) * 6;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      filter="url(#glow)"
                    />

                    {/* Invisible Interactive Path for Tooltip */}
                    <path
                      d={chartData.sundayAttendance.weeklyTrend
                        .slice(0, 4)
                        .map((week, index) => {
                          const x = 10 + index * 25;
                          const y = 90 - (week.total / 10) * 6;
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

                        // Find the nearest point based on mouse position with improved sensitivity
                        const points =
                          chartData.sundayAttendance.weeklyTrend.slice(0, 4);
                        let nearestIndex = 0;
                        let minDistance = Infinity;

                        points.forEach((week, index) => {
                          const x = 10 + index * 25;
                          const distance = Math.abs(mouseX - x);
                          if (distance < minDistance) {
                            minDistance = distance;
                            nearestIndex = index;
                          }
                        });

                        const nearestWeek = points[nearestIndex];
                        const x = 10 + nearestIndex * 25;
                        const y = 90 - (nearestWeek.total / 10) * 6;
                        const prevWeek =
                          nearestIndex > 0 ? points[nearestIndex - 1] : null;
                        const difference = prevWeek
                          ? nearestWeek.total - prevWeek.total
                          : 0;

                        const tooltipX = (x / 100) * rect.width;
                        const tooltipY = (y / 100) * rect.height - 40;

                        setTooltip({
                          show: true,
                          data: {
                            week: nearestWeek,
                            index: nearestIndex,
                            difference,
                            prevWeek,
                            type: "weekly",
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
                    {chartData.sundayAttendance.weeklyTrend
                      .slice(0, 4)
                      .map((week, index) => {
                        const x = 10 + index * 25;
                        const y = 90 - (week.total / 10) * 6;
                        const prevWeek =
                          index > 0
                            ? chartData.sundayAttendance.weeklyTrend[index - 1]
                            : null;
                        const difference = prevWeek
                          ? week.total - prevWeek.total
                          : 0;

                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="1.2"
                            fill="#f97316"
                            stroke="#ffffff"
                            strokeWidth="0.3"
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
                                  week,
                                  index,
                                  difference,
                                  prevWeek,
                                  type: "weekly",
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
                        );
                      })}
                  </svg>

                  {/* Tooltip */}
                  {tooltip.show && tooltip.data && (
                    <div
                      className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg z-10 min-w-[160px]"
                      style={{
                        left:
                          tooltip.data.index < 2
                            ? Math.min(tooltip.x + 20, window.innerWidth - 180) // Right side for points 1, 2
                            : Math.max(10, tooltip.x - 20), // Left side for points 3, 4
                        top: Math.max(10, tooltip.y),
                        transform:
                          tooltip.data.index < 2 ? "none" : "translateX(-100%)",
                      }}
                    >
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        Week {tooltip.data.index + 1}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                        Date:{" "}
                        {new Date(tooltip.data.week.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Male: {tooltip.data.week.male}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Female: {tooltip.data.week.female}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Total: {tooltip.data.week.total}
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
                          {tooltip.data.difference} from previous week
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Trend Analysis */}
                <div className="mt-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Weekly Trend Analysis
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {(() => {
                      const weeklyData =
                        chartData.sundayAttendance.weeklyTrend.slice(0, 4);
                      const firstWeek = weeklyData[0];
                      const lastWeek = weeklyData[weeklyData.length - 1];
                      const difference = lastWeek.total - firstWeek.total;
                      const percentage = (
                        (difference / firstWeek.total) *
                        100
                      ).toFixed(1);

                      return difference > 0
                        ? `Weekly attendance has increased by ${Math.abs(difference)} people over the month. Strong weekly growth!`
                        : `Weekly attendance has decreased by ${Math.abs(difference)} people. Consider weekly engagement strategies.`;
                    })()}
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
