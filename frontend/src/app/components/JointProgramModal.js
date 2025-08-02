"us client";
export default function JointProgramModal({
  showJointProgramModal,
  jointProgramForm,
  handleJointProgramInputChange,
  handleCloseJointProgramModal,
  handleSubmitJointProgram,
}) {
  if (!showJointProgramModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              <i className="fas fa-handshake text-purple-500 mr-2"></i>
              Log Joint Program
            </h3>
            <button
              onClick={handleCloseJointProgramModal}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="space-y-4">
            {/* Week Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Week
              </label>
              <select
                value={jointProgramForm.week}
                onChange={(e) =>
                  handleJointProgramInputChange("week", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Week</option>
                <option value="week-1">Week 1</option>
                <option value="week-2">Week 2</option>
                <option value="week-3">Week 3</option>
                <option value="week-4">Week 4</option>
                <option value="week-5">Week 5</option>
              </select>
            </div>

            {/* Month Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Month
              </label>
              <select
                value={jointProgramForm.month}
                onChange={(e) =>
                  handleJointProgramInputChange("month", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Month</option>
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

            {/* Year Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <select
                value={jointProgramForm.year}
                onChange={(e) =>
                  handleJointProgramInputChange("year", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Year</option>
                <option value="2025">2025</option>
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={jointProgramForm.date}
                onChange={(e) =>
                  handleJointProgramInputChange("date", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Program Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Program Title
              </label>
              <input
                type="text"
                value={jointProgramForm.programTitle}
                onChange={(e) =>
                  handleJointProgramInputChange("programTitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Joint Youth Conference"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={jointProgramForm.location}
                onChange={(e) =>
                  handleJointProgramInputChange("location", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Central Convention Center"
              />
            </div>

            {/* Logged By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logged By
              </label>
              <input
                type="text"
                value={jointProgramForm.loggedBy}
                onChange={(e) =>
                  handleJointProgramInputChange("loggedBy", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., John Doe"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position <span className="text-red-500">*</span>
              </label>
              <select
                value={jointProgramForm.position}
                onChange={(e) =>
                  handleJointProgramInputChange("position", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Position</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Secretary">Secretary</option>
                <option value="Assistant Secretary">Assistant Secretary</option>
                <option value="Financial Secretary">Financial Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Organizer">Organizer</option>
                <option value="Evangelism Coordinator">
                  Evangelism Coordinator
                </option>
              </select>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
              <div className="text-sm text-purple-800 dark:text-purple-200">
                <p className="font-medium mb-1">No Attendance Recorded</p>
                <p>
                  This week will be marked as a joint program with no attendance
                  count. The program details will be stored for reference.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleCloseJointProgramModal}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitJointProgram}
              className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Log Joint Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
