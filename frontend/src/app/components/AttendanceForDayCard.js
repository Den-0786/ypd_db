"use client";
export default function AttendanceForDayCard({ selectedDate }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <i className="fas fa-calendar-day text-green-500 mr-2"></i>
          Attendance for {new Date(selectedDate).toLocaleDateString()}
        </h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 gap-4 min-w-[400px]">
            {/* Male Attendance */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-2 mr-3">
                    <i className="fas fa-male text-blue-600 dark:text-blue-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Male
                    </div>
                    <div className="text-gray-900 dark:text-white text-xl font-bold">
                      45
                    </div>
                  </div>
                </div>
                <div className="text-blue-600 dark:text-blue-400 text-xs">
                  <i className="fas fa-users mr-1"></i>
                  Present
                </div>
              </div>
            </div>

            {/* Female Attendance */}
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3 border border-pink-200 dark:border-pink-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-pink-100 dark:bg-pink-800 rounded-lg p-2 mr-3">
                    <i className="fas fa-female text-pink-600 dark:text-pink-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-pink-600 dark:text-pink-400 text-sm font-medium">
                      Female
                    </div>
                    <div className="text-gray-900 dark:text-white text-xl font-bold">
                      67
                    </div>
                  </div>
                </div>
                <div className="text-pink-600 dark:text-pink-400 text-xs">
                  <i className="fas fa-users mr-1"></i>
                  Present
                </div>
              </div>
            </div>

            {/* Total Attendance */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-800 rounded-lg p-2 mr-3">
                    <i className="fas fa-users text-green-600 dark:text-green-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                      Total
                    </div>
                    <div className="text-gray-900 dark:text-white text-xl font-bold">
                      112
                    </div>
                  </div>
                </div>
                <div className="text-green-600 dark:text-green-400 text-xs">
                  <i className="fas fa-calendar-check mr-1"></i>
                  Today
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center justify-center">
              <i className="fas fa-clock mr-2 text-blue-500"></i>
              <span>Service Time: 9:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
