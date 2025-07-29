"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import React from "react"; // Added missing import for React.Fragment

// Helper functions for week/month/year
function getWeekOfMonth(date) {
  const d = new Date(date);
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  return Math.ceil((d.getDate() + firstDay.getDay()) / 7);
}
function getMonthName(date) {
  return new Date(date).toLocaleString("default", { month: "short" });
}
function getYear(date) {
  return new Date(date).getFullYear();
}

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogForm, setShowLogForm] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    congregation: "",
    date: new Date().toISOString().split("T")[0],
    male_count: 0,
    female_count: 0,
  });
  const [selectedCongregation, setSelectedCongregation] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  // Custom toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  }
  // Custom confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    message: "",
    onConfirm: null,
  });
  function openConfirmDialog(message, onConfirm) {
    setConfirmDialog({ show: true, message, onConfirm });
  }
  function closeConfirmDialog() {
    setConfirmDialog({ show: false, message: "", onConfirm: null });
  }

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      // Mock data for now
      const mockRecords = [
        {
          id: 1,
          congregation: { name: "Emmanuel Congregation Ahinsan" },
          date: "2025-01-05",
          male_count: 25,
          female_count: 30,
          total_count: 55,
        },
        {
          id: 2,
          congregation: { name: "Peniel Congregation Esreso No1" },
          date: "2025-01-05",
          male_count: 18,
          female_count: 22,
          total_count: 40,
        },
        {
          id: 3,
          congregation: { name: "Mizpah Congregation Odagya No1" },
          date: "2025-01-05",
          male_count: 15,
          female_count: 20,
          total_count: 35,
        },
        {
          id: 4,
          congregation: { name: "Christ Congregation Ahinsan Estate" },
          date: "2025-01-05",
          male_count: 12,
          female_count: 18,
          total_count: 30,
        },
        {
          id: 5,
          congregation: { name: "Ebenezer Congregation Dompoase Aprabo" },
          date: "2025-01-05",
          male_count: 10,
          female_count: 14,
          total_count: 24,
        },
        {
          id: 6,
          congregation: { name: "Favour Congregation Esreso No2" },
          date: "2025-01-05",
          male_count: 8,
          female_count: 12,
          total_count: 20,
        },
        {
          id: 7,
          congregation: { name: "Liberty Congregation Esreso High Tension" },
          date: "2025-01-05",
          male_count: 7,
          female_count: 9,
          total_count: 16,
        },
        {
          id: 8,
          congregation: { name: "Odagya No2" },
          date: "2025-01-05",
          male_count: 6,
          female_count: 8,
          total_count: 14,
        },
        {
          id: 9,
          congregation: { name: "NOM" },
          date: "2025-01-05",
          male_count: 5,
          female_count: 7,
          total_count: 12,
        },
        {
          id: 10,
          congregation: { name: "Kokobriko" },
          date: "2025-01-05",
          male_count: 4,
          female_count: 6,
          total_count: 10,
        },
        // Add a second week for each congregation
        {
          id: 11,
          congregation: { name: "Emmanuel Congregation Ahinsan" },
          date: "2025-01-12",
          male_count: 28,
          female_count: 32,
          total_count: 60,
        },
        {
          id: 12,
          congregation: { name: "Peniel Congregation Esreso No1" },
          date: "2025-01-12",
          male_count: 20,
          female_count: 25,
          total_count: 45,
        },
        {
          id: 13,
          congregation: { name: "Mizpah Congregation Odagya No1" },
          date: "2025-01-12",
          male_count: 16,
          female_count: 21,
          total_count: 37,
        },
        {
          id: 14,
          congregation: { name: "Christ Congregation Ahinsan Estate" },
          date: "2025-01-12",
          male_count: 13,
          female_count: 19,
          total_count: 32,
        },
        {
          id: 15,
          congregation: { name: "Ebenezer Congregation Dompoase Aprabo" },
          date: "2025-01-12",
          male_count: 11,
          female_count: 15,
          total_count: 26,
        },
        {
          id: 16,
          congregation: { name: "Favour Congregation Esreso No2" },
          date: "2025-01-12",
          male_count: 9,
          female_count: 13,
          total_count: 22,
        },
        {
          id: 17,
          congregation: { name: "Liberty Congregation Esreso High Tension" },
          date: "2025-01-12",
          male_count: 8,
          female_count: 10,
          total_count: 18,
        },
        {
          id: 18,
          congregation: { name: "Odagya No2" },
          date: "2025-01-12",
          male_count: 7,
          female_count: 9,
          total_count: 16,
        },
        {
          id: 19,
          congregation: { name: "NOM" },
          date: "2025-01-12",
          male_count: 6,
          female_count: 8,
          total_count: 14,
        },
        {
          id: 20,
          congregation: { name: "Kokobriko" },
          date: "2025-01-12",
          male_count: 5,
          female_count: 7,
          total_count: 12,
        },
      ];
      setAttendanceRecords(mockRecords);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Submit to Django API
    console.log("Submitting attendance:", formData);
    setShowLogForm(false);
    setFormData({
      congregation: "",
      date: new Date().toISOString().split("T")[0],
      male_count: 0,
      female_count: 0,
    });
    showToast("Attendance logged successfully!", "success");
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRecords([]);
      setSelectAll(false);
    } else {
      setSelectedRecords(attendanceRecords.map((record) => record.id));
      setSelectAll(true);
    }
  };

  const handleSelectRecord = (recordId) => {
    if (selectedRecords.includes(recordId)) {
      setSelectedRecords(selectedRecords.filter((id) => id !== recordId));
      setSelectAll(false);
    } else {
      setSelectedRecords([...selectedRecords, recordId]);
      if (selectedRecords.length + 1 === attendanceRecords.length) {
        setSelectAll(true);
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedRecords.length === 0) {
      showToast("Please select records to delete", "error");
      return;
    }
    openConfirmDialog(
      `Are you sure you want to delete ${selectedRecords.length} attendance record(s)?`,
      () => {
        // Remove selected records from the state
        const updatedRecords = attendanceRecords.filter(
          (record) => !selectedRecords.includes(record.id)
        );
        setAttendanceRecords(updatedRecords);
        setSelectedRecords([]);
        setSelectAll(false);
        showToast("Selected records deleted successfully!", "success");
        closeConfirmDialog();
      }
    );
  };

  const handleBulkExport = () => {
    if (selectedRecords.length === 0) {
      alert("Please select records to export");
      return;
    }
    // TODO: Implement bulk export
    console.log("Exporting records:", selectedRecords);
  };

  // Export CSV (bulk)
  function exportSelectedToCSV() {
    if (selectedRecords.length === 0) return;
    const headers = ["Date", "Congregation", "Male", "Female", "Total"];
    const selected = filteredRecords.filter((r) =>
      selectedRecords.includes(r.id)
    );
    if (selected.length === 0) return;
    const rows = selected.map((r) => [
      r.date,
      r.congregation.name,
      r.male_count,
      r.female_count,
      r.total_count,
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-selected.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Selected records exported as CSV!", "success");
  }

  // Print Table
  function printTable() {
    const printContents = document.getElementById(
      "attendance-table-area"
    ).innerHTML;
    const win = window.open("", "", "height=700,width=900");
    win.document.write("<html><head><title>Print Attendance</title>");
    win.document.write(
      "<style>table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:8px;}th{background:#f3f4f6;}</style>"
    );
    win.document.write("</head><body>");
    win.document.write(printContents);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get all years, months, weeks from data
  const allYears = Array.from(
    new Set(attendanceRecords.map((r) => getYear(r.date)))
  );
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const allWeeks = [1, 2, 3, 4, 5];
  const congregationNames = Array.from(
    new Set(attendanceRecords.map((r) => r.congregation.name))
  );

  // Filter records by congregation, year, month, week
  let filteredRecords = attendanceRecords;
  if (selectedCongregation) {
    filteredRecords = filteredRecords.filter(
      (r) => r.congregation.name === selectedCongregation
    );
  }
  if (selectedYear !== "All") {
    filteredRecords = filteredRecords.filter(
      (r) => getYear(r.date) === Number(selectedYear)
    );
  }
  if (selectedMonth !== "All") {
    filteredRecords = filteredRecords.filter(
      (r) => getMonthName(r.date) === selectedMonth
    );
  }
  if (selectedWeek !== "All") {
    filteredRecords = filteredRecords.filter(
      (r) => getWeekOfMonth(r.date) === Number(selectedWeek)
    );
  }

  // Aggregates for cards
  const totalMale = filteredRecords.reduce((sum, r) => sum + r.male_count, 0);
  const totalFemale = filteredRecords.reduce(
    (sum, r) => sum + r.female_count,
    0
  );
  const grandTotal = filteredRecords.reduce((sum, r) => sum + r.total_count, 0);

  // Progress for week/month/year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "short",
  });
  const currentYear = currentDate.getFullYear();
  const currentWeek = getWeekOfMonth(currentDate);
  const weekProgress =
    selectedMonth === "All"
      ? ""
      : `${selectedWeek !== "All" ? selectedWeek : currentWeek}/${4}`;
  const monthProgress = `${selectedMonth !== "All" ? allMonths.indexOf(selectedMonth) + 1 : currentDate.getMonth() + 1}/12`;
  const yearProgress = `${selectedYear !== "All" ? allYears.indexOf(Number(selectedYear)) + 1 : allYears.indexOf(currentYear) + 1}/${allYears.length}`;

  // Find current Sunday (today or most recent Sunday)
  function getCurrentSunday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? 0 : 7); // last Sunday if today is not Sunday
    const sunday = new Date(today.setDate(diff));
    return sunday.toISOString().split("T")[0];
  }
  const currentSunday = getCurrentSunday();
  // All congregation names
  const allCongNames = [
    "Emmanuel Congregation Ahinsan",
    "Peniel Congregation Esreso No1",
    "Mizpah Congregation Odagya No1",
    "Christ Congregation Ahinsan Estate",
    "Ebenezer Congregation Dompoase Aprabo",
    "Favour Congregation Esreso No2",
    "Liberty Congregation Esreso High Tension",
    "Odagya No2",
    "NOM",
    "Kokobriko",
  ];
  // Congregations that have submitted for current Sunday
  const submittedCongregations = attendanceRecords
    .filter((r) => r.date === currentSunday)
    .map((r) => r.congregation.name);
  const notSubmittedCongregations = allCongNames.filter(
    (name) => !submittedCongregations.includes(name)
  );
  const sundayProgress = `${submittedCongregations.length}/${allCongNames.length}`;

  return (
    <DashboardLayout currentPage="Attendance">
      {/* Custom Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white text-sm font-semibold transition-all duration-300
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          role="alert"
          aria-live="assertive"
          tabIndex={0}
        >
          {toast.message}
        </div>
      )}
      {/* Custom Confirmation Dialog */}
      {confirmDialog.show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="mb-4 text-gray-800 font-semibold">
              {confirmDialog.message}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeConfirmDialog}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmDialog.onConfirm && confirmDialog.onConfirm();
                  closeConfirmDialog();
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                aria-label="Confirm delete"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-6">
        {/* Attendance Management Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
                Attendance Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Track Sunday attendance across congregations
              </p>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold mr-2">
                  This Sunday Progress: {sundayProgress}
                </span>
              </div>
              <div className="mt-2 flex flex-col md:flex-row gap-2">
                <div className="bg-green-50 dark:bg-gray-700 border border-green-200 dark:border-gray-600 rounded-lg p-3 flex-1">
                  <div className="font-semibold text-green-700 dark:text-green-300 text-xs mb-1">
                    Submitted ({submittedCongregations.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {submittedCongregations.length > 0 ? (
                      submittedCongregations.map((name) => (
                        <span
                          key={name}
                          className="bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-200 px-2 py-0.5 rounded text-xs font-medium"
                        >
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 text-xs">
                        None
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-gray-700 border border-red-200 dark:border-gray-600 rounded-lg p-3 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-red-700 dark:text-red-300 text-xs">
                      Not Submitted ({notSubmittedCongregations.length})
                    </div>
                    {notSubmittedCongregations.length > 0 && (
                      <button
                        onClick={() =>
                          showToast(
                            "Reminders sent to all non-submitting congregations!",
                            "success"
                          )
                        }
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-red-700 transition"
                        aria-label="Remind all non-submitting congregations"
                      >
                        <i className="fas fa-bell mr-1" aria-hidden="true"></i>{" "}
                        Remind All
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {notSubmittedCongregations.length > 0 ? (
                      notSubmittedCongregations.map((name) => (
                        <span
                          key={name}
                          className="bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200 px-2 py-0.5 rounded text-xs font-medium"
                        >
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 text-xs">
                        None
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowLogForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
            >
              <i className="fas fa-plus mr-2"></i>
              Log Attendance
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col sm:flex-row flex-wrap gap-2 items-center">
          <div className="w-full max-w-xs sm:w-40">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Congregation
            </label>
            <select
              value={selectedCongregation}
              onChange={(e) => setSelectedCongregation(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
              aria-label="Filter by congregation"
            >
              <option value="" className="text-gray-800 dark:text-white">
                All Congregations
              </option>
              {congregationNames.map((name) => (
                <option
                  key={name}
                  value={name}
                  className="text-gray-800 dark:text-white"
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <div className="w-full max-w-xs sm:w-28">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Week
              </label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                aria-label="Filter by week"
              >
                <option value="All" className="text-gray-800 dark:text-white">
                  All
                </option>
                {allWeeks.map((week) => (
                  <option
                    key={week}
                    value={week}
                    className="text-gray-800 dark:text-white"
                  >{`Week ${week}`}</option>
                ))}
              </select>
            </div>
            <div className="w-full max-w-xs sm:w-28">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                aria-label="Filter by month"
              >
                <option value="All" className="text-gray-800 dark:text-white">
                  All
                </option>
                {allMonths.map((month) => (
                  <option
                    key={month}
                    value={month}
                    className="text-gray-800 dark:text-white"
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full max-w-xs sm:w-28">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white text-xs bg-white dark:bg-gray-700"
                aria-label="Filter by year"
              >
                <option value="All" className="text-gray-800 dark:text-white">
                  All
                </option>
                {allYears.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className="text-gray-800 dark:text-white"
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Colored Summary Cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Each card is min-w-[180px] to fit horizontally and whitespace-nowrap for scroll */}
          <div className="bg-blue-500 dark:bg-gray-800 text-white rounded-lg p-3 min-w-[180px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Total Male</p>
                <p className="text-lg font-bold">{totalMale}</p>
              </div>
              <i className="fas fa-mars text-xl opacity-80"></i>
            </div>
            <div className="text-[10px] mt-1">
              Week: {weekProgress || "All"} | Month: {monthProgress} | Year:{" "}
              {yearProgress}
            </div>
          </div>
          <div className="bg-pink-500 dark:bg-gray-800 text-white rounded-lg p-3 min-w-[180px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Total Female</p>
                <p className="text-lg font-bold">{totalFemale}</p>
              </div>
              <i className="fas fa-venus text-xl opacity-80"></i>
            </div>
            <div className="text-[10px] mt-1">
              Week: {weekProgress || "All"} | Month: {monthProgress} | Year:{" "}
              {yearProgress}
            </div>
          </div>
          <div className="bg-green-500 dark:bg-gray-800 text-white rounded-lg p-3 min-w-[180px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Grand Total</p>
                <p className="text-lg font-bold">{grandTotal}</p>
              </div>
              <i className="fas fa-users text-xl opacity-80"></i>
            </div>
            <div className="text-[10px] mt-1">
              Week: {weekProgress || "All"} | Month: {monthProgress} | Year:{" "}
              {yearProgress}
            </div>
          </div>
          <div className="bg-purple-500 dark:bg-gray-800 text-white rounded-lg p-3 min-w-[180px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Congregations</p>
                <p className="text-lg font-bold">
                  {selectedCongregation ? 1 : congregationNames.length}
                </p>
              </div>
              <i className="fas fa-church text-xl opacity-80"></i>
            </div>
            <div className="text-[10px] mt-1">
              {selectedCongregation
                ? selectedCongregation
                : "All Congregations"}
            </div>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Table Area for Print */}
          <div id="attendance-table-area">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Recent Attendance Records
                </h3>
                {selectedRecords.length > 0 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200 text-sm"
                      title="Delete selected records"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Delete ({selectedRecords.length})
                    </button>
                    <button
                      onClick={handleBulkExport}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition duration-200 text-sm"
                      title="Export selected records"
                    >
                      <i className="fas fa-download mr-1"></i>
                      Export ({selectedRecords.length})
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        title="Select all records"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                      Congregation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                      Male
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                      Female
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-16 text-center text-gray-400 dark:text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <i className="fas fa-folder-open text-4xl mb-2"></i>
                          <div className="text-lg font-semibold mb-1">
                            No attendance records found
                          </div>
                          <div className="text-sm">
                            Try adjusting your filters or add a new attendance
                            record.
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <React.Fragment>
                      {filteredRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedRecords.includes(record.id)}
                              onChange={() => handleSelectRecord(record.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {record.congregation.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {record.male_count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {record.female_count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              {record.total_count}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                title="View attendance details"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                                title="Edit attendance record"
                                disabled
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                title="Delete attendance record"
                                onClick={() => {
                                  openConfirmDialog(
                                    "Are you sure you want to delete this attendance record?",
                                    () => {
                                      // Remove the record from the state
                                      const updatedRecords =
                                        attendanceRecords.filter(
                                          (r) => r.id !== record.id
                                        );
                                      setAttendanceRecords(updatedRecords);
                                      showToast(
                                        "Attendance record deleted successfully!",
                                        "success"
                                      );
                                      closeConfirmDialog();
                                    }
                                  );
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )}
                </tbody>
              </table>
            </div>
            {/* Export/Print Buttons at Bottom */}
            <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-gray-200 dark:border-gray-700 justify-end">
              <button
                onClick={printTable}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                aria-label="Print attendance table"
              >
                <i className="fas fa-print mr-1" aria-hidden="true"></i> Print
                Table
              </button>
              <button
                onClick={exportSelectedToCSV}
                disabled={selectedRecords.length === 0}
                className={`bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm ${selectedRecords.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Export selected attendance records to CSV"
              >
                <i className="fas fa-file-csv mr-1" aria-hidden="true"></i>{" "}
                Export Selected
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={selectedRecords.length === 0}
                className={`bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm ${selectedRecords.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Delete selected attendance records"
              >
                <i className="fas fa-trash mr-1" aria-hidden="true"></i> Delete
                Selected
              </button>
            </div>
          </div>
          {/* end #attendance-table-area */}
        </div>

        {/* Log Attendance Form Modal */}
        {showLogForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Log Sunday Attendance
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Congregation
                    </label>
                    <select
                      value={formData.congregation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          congregation: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      required
                    >
                      <option value="" className="text-gray-800">
                        Select Congregation
                      </option>
                      <option
                        value="Emmanuel Congregation Ahinsan"
                        className="text-gray-800"
                      >
                        Emmanuel Congregation Ahinsan
                      </option>
                      <option
                        value="Peniel Congregation Esreso No1"
                        className="text-gray-800"
                      >
                        Peniel Congregation Esreso No1
                      </option>
                      <option
                        value="Mizpah Congregation Odagya No1"
                        className="text-gray-800"
                      >
                        Mizpah Congregation Odagya No1
                      </option>
                      <option
                        value="Christ Congregation Ahinsan Estate"
                        className="text-gray-800"
                      >
                        Christ Congregation Ahinsan Estate
                      </option>
                      <option
                        value="Ebenezer Congregation Dompoase Aprabo"
                        className="text-gray-800"
                      >
                        Ebenezer Congregation Dompoase Aprabo
                      </option>
                      <option
                        value="Favour Congregation Esreso No2"
                        className="text-gray-800"
                      >
                        Favour Congregation Esreso No2
                      </option>
                      <option
                        value="Liberty Congregation Esreso High Tension"
                        className="text-gray-800"
                      >
                        Liberty Congregation Esreso High Tension
                      </option>
                      <option value="Odagya No2" className="text-gray-800">
                        Odagya No2
                      </option>
                      <option value="NOM" className="text-gray-800">
                        NOM
                      </option>
                      <option value="Kokobriko" className="text-gray-800">
                        Kokobriko
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Male Count
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.male_count}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            male_count: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Female Count
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.female_count}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            female_count: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowLogForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Log Attendance
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
