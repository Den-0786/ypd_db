export default function AttendanceFilter({
  handleLogAttendance,
  handleJointProgram,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <i className="fas fa-filter text-blue-500 mr-2"></i>
          Filter Attendance
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Filter attendance data by week, month, and year
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Week
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All</option>
            <option value="week-1">Week 1</option>
            <option value="week-2">Week 2</option>
            <option value="week-3">Week 3</option>
            <option value="week-4">Week 4</option>
            <option value="week-5">Week 5</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Month
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Year
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleLogAttendance}
          className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-semibold"
        >
          <i className="fas fa-plus mr-2"></i>
          Log Attendance
        </button>
        <button
          onClick={handleJointProgram}
          className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-semibold"
        >
          <i className="fas fa-handshake mr-2"></i>
          Joint Program
        </button>
      </div>
    </div>
  );
}
