"use client";

import { useState, useEffect } from "react";
import LocalDashboardLayout from "../../components/LocalDashboardLayout";
import AttendanceSummaryCards from "../../components/AttendanceSummaryCards";
import AttendanceForDayCard from "../../components/AttendanceForDayCard";
import WeeklyAttendanceCards from "../../components/WeeklyAttendanceCards";
import YearlyAttendanceCards from "../../components/YearlyAttendanceCards";
import AttendanceFilter from "../../components/AttendanceFilter";
import LogAttendanceModal from "../../components/LogAttendanceModal";
import JointProgramModal from "../../components/JointProgramModal";
import PinModal from "../../components/PinModal";
import ToastContainer from "../../components/ToastContainer";
import getDataStore from "../../utils/dataStore";

export default function LocalAttendancePage() {
  const [mounted, setMounted] = useState(false);
  const [congregationId, setCongregationId] = useState(null);
  const [congregationName, setCongregationName] = useState(null);

  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showJointProgramModal, setShowJointProgramModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'log' or 'joint'
  const [pendingDeleteAction, setPendingDeleteAction] = useState(null); // 'week', 'month', 'day'
  const [pendingEditAction, setPendingEditAction] = useState(null); // 'week', 'month', 'day'
  const [logForm, setLogForm] = useState({
    week: "",
    month: "",
    year: "",
    date: "",
    male: 0,
    female: 0,
    total: 0,
    loggedBy: "",
    position: "",
    congregation: congregationName || "Local Congregation", // Dynamic congregation
  });
  const [jointProgramForm, setJointProgramForm] = useState({
    week: "",
    month: "",
    year: "",
    date: "",
    programTitle: "",
    location: "",
    loggedBy: "",
    position: "",
    congregation: congregationName || "Local Congregation", // Dynamic congregation
  });

  // Get attendance records from data store
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    totalMale: 0,
    totalFemale: 0,
    weeksLogged: 0,
    totalWeeks: 52,
  });
  const [loading, setLoading] = useState(true);

  // Helper function to get week number from date
  const getWeekNumber = (date) => {
    const d = new Date(date);
    const dayOfMonth = d.getDate();

    // Simple calculation: Week 1 = Days 1-7, Week 2 = Days 8-14, Week 3 = Days 15-21, etc.
    const weekNumber = Math.ceil(dayOfMonth / 7);

    return weekNumber;
  };

  // Helper function to get month name
  const getMonthName = (date) => {
    return new Date(date).toLocaleString("default", { month: "long" });
  };

  // Helper function to get year
  const getYear = (date) => {
    return new Date(date).getFullYear();
  };

  // Generate current month data dynamically from records
  const generateCurrentMonthData = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get all records and group by month/year to show all available data
    const allRecords = attendanceRecords;

    // Find the most recent month with data, or use current month
    let targetMonth = currentMonth;
    let targetYear = currentYear;

    if (allRecords.length > 0) {
      const latestRecord = allRecords.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0];
      const latestDate = new Date(latestRecord.date);
      targetMonth = latestDate.getMonth();
      targetYear = latestDate.getFullYear();
    }

    // Filter records for the target month and year
    const monthRecords = allRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === targetMonth &&
        recordDate.getFullYear() === targetYear
      );
    });

    // Group by week
    const weeksMap = new Map();
    monthRecords.forEach((record) => {
      const weekNumber = getWeekNumber(record.date);
      console.log(`Date: ${record.date}, Calculated Week: ${weekNumber}`);
      if (!weeksMap.has(weekNumber)) {
        weeksMap.set(weekNumber, {
          week: `Week ${weekNumber}`,
          male: 0,
          female: 0,
          total: 0,
          isJointProgram: false,
          programTitle: "",
          location: "",
        });
      }
      const week = weeksMap.get(weekNumber);
      week.male += record.male;
      week.female += record.female;
      week.total += record.total;
    });

    // Convert weeksMap to array and sort by week number
    const weeks = Array.from(weeksMap.values()).sort((a, b) => {
      const weekA = parseInt(a.week.replace("Week ", ""));
      const weekB = parseInt(b.week.replace("Week ", ""));
      return weekA - weekB;
    });

    // Calculate totals
    const totalMale = weeks.reduce((sum, week) => sum + week.male, 0);
    const totalFemale = weeks.reduce((sum, week) => sum + week.female, 0);
    const totalAttendance = totalMale + totalFemale;

    return {
      month: getMonthName(currentDate),
      year: currentYear.toString(),
      totalAttendance,
      totalMale,
      totalFemale,
      weeks,
    };
  };

  // Generate current year data dynamically from records
  const generateCurrentYearData = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Get all records and find the most recent year with data
    const allRecords = attendanceRecords;
    let targetYear = currentYear;

    if (allRecords.length > 0) {
      const latestRecord = allRecords.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0];
      const latestDate = new Date(latestRecord.date);
      targetYear = latestDate.getFullYear();
    }

    // Filter records for the target year
    const yearRecords = allRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getFullYear() === targetYear;
    });

    // Group by month
    const monthsMap = new Map();
    yearRecords.forEach((record) => {
      const recordDate = new Date(record.date);
      const monthName = getMonthName(record.date);
      if (!monthsMap.has(monthName)) {
        monthsMap.set(monthName, {
          month: monthName,
          male: 0,
          female: 0,
          total: 0,
        });
      }
      const month = monthsMap.get(monthName);
      month.male += record.male;
      month.female += record.female;
      month.total += record.total;
    });

    // Convert monthsMap to array and sort by month order
    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const months = Array.from(monthsMap.values()).sort((a, b) => {
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

    // Calculate totals
    const totalMale = months.reduce((sum, month) => sum + month.male, 0);
    const totalFemale = months.reduce((sum, month) => sum + month.female, 0);
    const totalAttendance = totalMale + totalFemale;

    return {
      year: currentYear.toString(),
      totalAttendance,
      totalMale,
      totalFemale,
      months,
    };
  };

  // Handle mounting and data loading
  useEffect(() => {
    setMounted(true);

    // Load congregation data from localStorage
    const storedCongregationId = localStorage.getItem("congregationId");
    const storedCongregationName = localStorage.getItem("congregationName");

    setCongregationId(storedCongregationId);
    setCongregationName(storedCongregationName);

    // Load data if congregation is available
    if (storedCongregationName) {
      loadAttendanceData(storedCongregationName);
    }
  }, []);

  const loadAttendanceData = async (congregationName) => {
    try {
      setLoading(true);
      const dataStore = getDataStore();

      // Fetch attendance records from API
      const records = await dataStore.getAttendanceRecords({
        congregation: congregationName,
      });

      setAttendanceRecords(records);
      console.log("Loaded attendance records:", records);
      if (records.length > 0) {
        console.log("First record details:", records[0]);
        console.log("First record date:", records[0].date);
        console.log("Looking for date:", selectedDate);
        console.log("Date match:", records[0].date === selectedDate);
      }

      // Update stats for congregation only
      const totalMale = records.reduce((sum, r) => sum + (r.male || 0), 0);
      const totalFemale = records.reduce((sum, r) => sum + (r.female || 0), 0);
      const weeksLogged = new Set(
        records.map((r) => `${r.year}-${r.month}-${r.week}`)
      ).size;

      setAttendanceStats({
        totalMale: totalMale,
        totalFemale: totalFemale,
        weeksLogged: weeksLogged,
        totalWeeks: 52,
      });

      // Update form congregation
      setLogForm((prev) => ({ ...prev, congregation: congregationName }));
      setJointProgramForm((prev) => ({
        ...prev,
        congregation: congregationName,
      }));
    } catch (error) {
      // Show error toast
      if (typeof window !== "undefined" && window.showToast) {
        window.showToast("Error loading attendance data", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate current month and year data
  const currentMonthData = generateCurrentMonthData();
  const currentYearData = generateCurrentYearData();

  // Get attendance data for the selected date
  const getAttendanceForDate = (date) => {
    console.log("Looking for attendance for date:", date);
    console.log("Available attendance records:", attendanceRecords);

    // First try to find exact date match
    let record = attendanceRecords.find((r) => r.date === date);

    // If no exact match, get the most recent record
    if (!record && attendanceRecords.length > 0) {
      record = attendanceRecords[0]; // Records are already sorted by date desc
      console.log("No exact date match, using most recent record:", record);
    }

    console.log("Found record for date:", record);
    if (record) {
      return {
        male: record.male || 0,
        female: record.female || 0,
        total: record.total || 0,
      };
    }
    return { male: 0, female: 0, total: 0 };
  };

  const selectedDateAttendance = getAttendanceForDate(selectedDate);

  useEffect(() => {
    setLogForm((prev) => ({
      ...prev,
      total: prev.male + prev.female,
    }));
  }, [logForm.male, logForm.female]);

  const handleInputChange = (field, value) => {
    setLogForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleJointProgramInputChange = (field, value) => {
    setJointProgramForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogAttendance = () => {
    setPendingAction("log");
    setShowPinModal(true);
  };

  const handleJointProgram = () => {
    setPendingAction("joint");
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    if (pendingDeleteAction) {
      // Handle delete operations
      switch (pendingDeleteAction) {
        case "week":
          window.showToast("PIN verified for week delete operation", "success");
          break;
        case "month":
          window.showToast(
            "PIN verified for month delete operation",
            "success"
          );
          break;
        case "day":
          window.showToast("PIN verified for day delete operation", "success");
          break;
        default:
          break;
      }
      setPendingDeleteAction(null);
    } else if (pendingEditAction) {
      // Handle edit operations
      switch (pendingEditAction) {
        case "week":
          window.showToast("PIN verified for week edit operation", "success");
          break;
        case "month":
          window.showToast("PIN verified for month edit operation", "success");
          break;
        case "day":
          window.showToast("PIN verified for day edit operation", "success");
          break;
        default:
          break;
      }
      setPendingEditAction(null);
    } else if (pendingAction === "log") {
      // Handle log attendance
      window.showToast("PIN verified for attendance logging", "success");
      setShowLogModal(true);
    } else if (pendingAction === "joint") {
      // Handle joint program
      window.showToast("PIN verified for joint program", "success");
      setShowJointProgramModal(true);
    }
    setShowPinModal(false);
  };

  const handleClosePinModal = () => {
    setShowPinModal(false);
    setPendingAction(null);
    setPendingDeleteAction(null);
    setPendingEditAction(null);
  };

  const handleCloseLogModal = () => {
    setShowLogModal(false);
    setLogForm({
      week: "",
      month: "",
      year: "",
      date: "",
      male: 0,
      female: 0,
      total: 0,
      loggedBy: "",
      position: "",
      congregation: "Emmanuel Congregation Ahinsan",
    });
  };

  const handleCloseJointProgramModal = () => {
    setShowJointProgramModal(false);
    setJointProgramForm({
      week: "",
      month: "",
      year: "",
      date: "",
      programTitle: "",
      location: "",
      loggedBy: "",
      position: "",
      congregation: "Emmanuel Congregation Ahinsan",
    });
  };

  const handleSubmitLog = async () => {
    try {
      const dataStore = getDataStore();

      const attendanceData = {
        date: logForm.date,
        male: logForm.male,
        female: logForm.female,
        total: logForm.total,
        congregation: logForm.congregation,
        week: logForm.week,
        month: logForm.month,
        year: logForm.year,
        loggedBy: logForm.loggedBy,
        position: logForm.position,
      };

      // Use the new API endpoint
      const newRecord = await dataStore.addAttendanceRecord(attendanceData);

      // Update local state
      setAttendanceRecords((prev) => [...prev, newRecord]);

      // Update stats
      const updatedStats = {
        totalMale: attendanceStats.totalMale + logForm.male,
        totalFemale: attendanceStats.totalFemale + logForm.female,
        weeksLogged: attendanceStats.weeksLogged + 1,
        totalWeeks: attendanceStats.totalWeeks,
      };
      setAttendanceStats(updatedStats);

      if (typeof window !== "undefined" && window.showToast) {
        window.showToast("Attendance logged successfully!", "success");
      }

      handleCloseLogModal();
    } catch (error) {
      if (typeof window !== "undefined" && window.showToast) {
        window.showToast(
          "Error logging attendance. Please try again.",
          "error"
        );
      }
    }
  };

  const handleSubmitJointProgram = async () => {
    try {
      const dataStore = getDataStore();

      const jointProgramData = {
        date: jointProgramForm.date,
        programTitle: jointProgramForm.programTitle,
        location: jointProgramForm.location,
        loggedBy: jointProgramForm.loggedBy,
        position: jointProgramForm.position,
        week: jointProgramForm.week,
        month: jointProgramForm.month,
        year: jointProgramForm.year,
        congregation: jointProgramForm.congregation,
        isJointProgram: true,
      };

      // Use the API endpoint
      const newJointProgram =
        await dataStore.addAttendanceRecord(jointProgramData);

      // Update local state
      setAttendanceRecords((prev) => [...prev, newJointProgram]);

      if (typeof window !== "undefined" && window.showToast) {
        window.showToast("Joint program logged successfully!", "success");
      } else {
        // Fallback for when toast is not available
      }
      handleCloseJointProgramModal();
    } catch (error) {
      // Error logging joint program
      if (typeof window !== "undefined" && window.showToast) {
        window.showToast(
          "Error logging joint program. Please try again.",
          "error"
        );
      }
    }
  };

  // Function to get CSRF token from cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <LocalDashboardLayout currentPage="Attendance">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </LocalDashboardLayout>
    );
  }

  return (
    <LocalDashboardLayout currentPage="Attendance">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 rounded-xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-check text-white text-2xl lg:text-3xl mr-3"></i>
                  <h1 className="text-xl lg:text-3xl font-bold text-white">
                    Attendance Management
                  </h1>
                </div>
                <p className="text-white/90 text-sm lg:text-base">
                  Track and manage member attendance for services and events
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-white text-xs opacity-90">Today</div>
                  <div className="text-white font-semibold">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-white text-xs opacity-90">Day</div>
                  <div className="text-green-300 font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AttendanceSummaryCards attendanceStats={attendanceStats} />
        <AttendanceFilter
          handleLogAttendance={handleLogAttendance}
          handleJointProgram={handleJointProgram}
          onFilterChange={(filters) => {
            // Handle filter changes here if needed
          }}
        />
        <AttendanceForDayCard
          selectedDate={selectedDate}
          attendanceData={selectedDateAttendance}
          onEdit={() => {
            setPendingEditAction("day");
            setShowPinModal(true);
          }}
          onDelete={() => {
            setPendingDeleteAction("day");
            setShowPinModal(true);
          }}
        />
        <WeeklyAttendanceCards
          currentMonthData={currentMonthData}
          onDeleteWeek={(week) => {
            setPendingDeleteAction("week");
            setShowPinModal(true);
          }}
          onEditWeek={(week) => {
            setPendingEditAction("week");
            setShowPinModal(true);
          }}
        />
        <YearlyAttendanceCards
          currentYearData={currentYearData}
          onEditMonth={(month) => {
            setPendingEditAction("month");
            setShowPinModal(true);
          }}
          onDeleteMonth={(month) => {
            setPendingDeleteAction("month");
            setShowPinModal(true);
          }}
        />
      </div>

      <LogAttendanceModal
        showLogModal={showLogModal}
        logForm={logForm}
        handleInputChange={handleInputChange}
        handleCloseLogModal={handleCloseLogModal}
        handleSubmitLog={handleSubmitLog}
      />

      <JointProgramModal
        showJointProgramModal={showJointProgramModal}
        jointProgramForm={jointProgramForm}
        handleJointProgramInputChange={handleJointProgramInputChange}
        handleCloseJointProgramModal={handleCloseJointProgramModal}
        handleSubmitJointProgram={handleSubmitJointProgram}
      />

      <PinModal
        isOpen={showPinModal}
        onClose={handleClosePinModal}
        onPinSuccess={handlePinSuccess}
        title={
          pendingDeleteAction
            ? "Enter PIN for Delete Operation"
            : pendingEditAction
              ? "Enter PIN for Edit Operation"
              : pendingAction === "log"
                ? "Enter PIN to Log Attendance"
                : "Enter PIN for Joint Program"
        }
        description={
          pendingDeleteAction
            ? "Please enter your PIN to confirm the delete operation"
            : pendingEditAction
              ? "Please enter your PIN to confirm the edit operation"
              : pendingAction === "log"
                ? "Please enter your PIN to log attendance"
                : "Please enter your PIN to schedule joint program"
        }
        type={pendingDeleteAction ? "delete" : "edit"}
      />

      <ToastContainer />
    </LocalDashboardLayout>
  );
}
