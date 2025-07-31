export default function WeeklyAttendanceCards({ currentMonthData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <i className="fas fa-calendar-week text-blue-500 mr-2"></i>
          {currentMonthData.month} {currentMonthData.year} - Weekly Attendance
        </h3>
      </div>
      <div className="p-6">
        {/* Month Summary - Fixed at top */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-chart-bar text-blue-500 mr-3"></i>
              <div>
                <div className="text-gray-900 dark:text-white font-semibold">
                  {currentMonthData.month} {currentMonthData.year} Summary
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Total Attendance: {currentMonthData.totalAttendance}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-900 dark:text-white font-bold text-lg">
                {currentMonthData.totalMale + currentMonthData.totalFemale}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {currentMonthData.totalMale}M / {currentMonthData.totalFemale}F
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Cards - Horizontal scroll */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 gap-4 min-w-[500px]">
            {currentMonthData.weeks.map((week, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 border ${
                  week.isJointProgram
                    ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                    : index === 0
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      : index === 1
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : index === 2
                          ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                          : "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-sm font-medium mb-2 ${
                      week.isJointProgram
                        ? "text-purple-600 dark:text-purple-400"
                        : index === 0
                          ? "text-blue-600 dark:text-blue-400"
                          : index === 1
                            ? "text-green-600 dark:text-green-400"
                            : index === 2
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {week.isJointProgram
                      ? "Joint Program"
                      : `Week ${index + 1}`}
                  </div>
                  <div className="text-gray-900 dark:text-white text-xl font-bold mb-1">
                    {week.isJointProgram ? "—" : week.total || 0}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">
                    {week.isJointProgram
                      ? week.programTitle || "Program"
                      : `${week.male || 0}M / ${week.female || 0}F`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
