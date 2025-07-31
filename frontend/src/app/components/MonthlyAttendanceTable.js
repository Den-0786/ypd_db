'use client'
export default function MonthlyAttendanceTable({ currentYearData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <i className="fas fa-calendar-alt text-green-500 mr-2"></i>
          {currentYearData.year} - Monthly Attendance Overview
        </h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Month
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Male
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Female
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {currentYearData.months.map((monthData, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                    {monthData.month}
                  </td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-white">
                    {monthData.male}
                  </td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-white">
                    {monthData.female}
                  </td>
                  <td className="py-3 px-4 text-sm text-center font-semibold text-gray-900 dark:text-white">
                    {monthData.total}
                  </td>
                  <td className="py-3 px-4 text-sm text-center">
                    <div className="flex items-center justify-center">
                      {index > 0 && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            monthData.total >
                            currentYearData.months[index - 1].total
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : monthData.total <
                                  currentYearData.months[index - 1].total
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {monthData.total >
                          currentYearData.months[index - 1].total
                            ? "↗"
                            : monthData.total <
                                currentYearData.months[index - 1].total
                              ? "↘"
                              : "→"}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Year Summary */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-chart-line text-green-500 mr-3"></i>
              <div>
                <div className="text-gray-900 dark:text-white font-semibold">
                  {currentYearData.year} Annual Summary
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Total Attendance: {currentYearData.totalAttendance}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-900 dark:text-white font-bold text-lg">
                {currentYearData.totalMale + currentYearData.totalFemale}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {currentYearData.totalMale}M / {currentYearData.totalFemale}F
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
