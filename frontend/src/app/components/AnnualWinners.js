"use client";
import { useState, useEffect } from "react";

export default function AnnualWinners({ year = 2024 }) {
  const [annualData, setAnnualData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching annual winners data
    const fetchAnnualData = async () => {
      setLoading(true);

      try {
        // Fetch real data from API
        const response = await fetch("http://localhost:8001/api/home-stats/");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Use real data from API
            const realData = {
              year: year,
              congregations: data.data.leaderboardTop || [],
              totalCongregations: data.data.totalCongregations || 0,
              totalMonths: 12,
            };
            setAnnualData(realData);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching annual data:", error);
      }

      // Fallback to empty data if API fails
      const emptyData = {
        year: year,
        congregations: [],
        totalCongregations: 0,
        totalMonths: 12,
      };

      setTimeout(() => {
        setAnnualData(emptyData);
        setLoading(false);
      }, 1000);
    };

    fetchAnnualData();
  }, [year]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!annualData) {
    return null;
  }

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center">
            <i className="fas fa-crown text-yellow-500 text-sm sm:text-base"></i>
            <span className="text-yellow-600 dark:text-yellow-400 font-bold text-xs sm:text-sm">
              1st
            </span>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center">
            <i className="fas fa-medal text-gray-400 text-sm sm:text-base"></i>
            <span className="text-gray-600 dark:text-gray-400 font-bold text-xs sm:text-sm">
              2nd
            </span>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center">
            <i className="fas fa-gem text-blue-500 text-sm sm:text-base"></i>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
              3rd
            </span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 font-bold text-xs sm:text-sm">
              {rank}th
            </span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          <i className="fas fa-trophy text-yellow-500 mr-3"></i>
          Annual Attendance Champions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
          {annualData.year} Winners
        </p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>
            <i className="fas fa-church mr-1"></i>
            {annualData.totalCongregations} Congregations
          </span>
          <span>
            <i className="fas fa-calendar mr-1"></i>
            {annualData.totalMonths} Months
          </span>
        </div>
      </div>

      {/* Winners List */}
      <div className="space-y-4">
        {annualData.congregations.map((winner, index) => (
          <div
            key={winner.congregation}
            className={`p-4 sm:p-6 rounded-lg border-2 ${
              winner.rank === 1
                ? "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20"
                : winner.rank === 2
                  ? "border-gray-300 bg-gray-50 dark:bg-gray-700"
                  : winner.rank === 3
                    ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 bg-white dark:bg-gray-700"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex-shrink-0">
                  {getRankBadge(winner.rank)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                    {winner.congregation}
                  </h3>
                  <div className="mt-2">
                    <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                      <i className="fas fa-calendar-alt mr-1"></i>
                      Won in: {winner.months.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side with stats */}
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm justify-end">
                <span className="text-green-600 dark:text-green-400 font-semibold whitespace-nowrap">
                  <i className="fas fa-trophy mr-1"></i>
                  {winner.wins} Win{winner.wins > 1 ? "s" : ""}
                </span>
                <span className="text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  <i className="fas fa-users mr-1"></i>
                  {winner.total_attendance.toLocaleString()} Total
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            <i className="fas fa-info-circle mr-1"></i>
            Annual winners are calculated based on monthly attendance totals
          </p>
          <p className="mt-1">
            <i className="fas fa-calendar-check mr-1"></i>
            Updated annually on December 31st at 10:00 AM
          </p>
        </div>
      </div>
    </div>
  );
}
