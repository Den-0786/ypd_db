"use client";

import { useState, useEffect } from "react";
import LocalDashboardLayout from "../../components/LocalDashboardLayout";
import AttendanceSummaryCards from "../../components/AttendanceSummaryCards";
import AttendanceForDayCard from "../../components/AttendanceForDayCard";
import WeeklyAttendanceCards from "../../components/WeeklyAttendanceCards";
import MonthlyAttendanceTable from "../../components/MonthlyAttendanceTable";
import AttendanceFilter from "../../components/AttendanceFilter";
import LogAttendanceModal from "../../components/LogAttendanceModal";
import JointProgramModal from "../../components/JointProgramModal";
import ToastContainer from "../../components/ToastContainer";

export default function LocalAttendancePage() {
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showJointProgramModal, setShowJointProgramModal] = useState(false);
  const [logForm, setLogForm] = useState({
    week: "",
    month: "",
    year: "",
    date: "",
    male: 0,
    female: 0,
    total: 0,
  });
  const [jointProgramForm, setJointProgramForm] = useState({
    week: "",
    month: "",
    year: "",
    date: "",
    programTitle: "",
    location: "",
  });

  const [attendanceStats, setAttendanceStats] = useState({
    totalMale: 0,
    totalFemale: 0,
    weeksLogged: 0,
    totalWeeks: 52,
  });

  const [currentMonthData, setCurrentMonthData] = useState({
    month: "July",
    year: "2025",
    totalAttendance: 0,
    totalMale: 0,
    totalFemale: 0,
    weeks: [
      { week: "Week 1", male: 0, female: 0, total: 0, isJointProgram: false },
      { week: "Week 2", male: 0, female: 0, total: 0, isJointProgram: false },
      { week: "Week 3", male: 0, female: 0, total: 0, isJointProgram: false },
      { week: "Week 4", male: 0, female: 0, total: 0, isJointProgram: false },
    ],
  });

  const [currentYearData, setCurrentYearData] = useState({
    year: "2025",
    totalAttendance: 0,
    totalMale: 0,
    totalFemale: 0,
    months: [
      { month: "January", male: 0, female: 0, total: 0 },
      { month: "February", male: 0, female: 0, total: 0 },
      { month: "March", male: 0, female: 0, total: 0 },
      { month: "April", male: 0, female: 0, total: 0 },
      { month: "May", male: 0, female: 0, total: 0 },
      { month: "June", male: 0, female: 0, total: 0 },
      { month: "July", male: 0, female: 0, total: 0 },
      { month: "August", male: 0, female: 0, total: 0 },
      { month: "September", male: 0, female: 0, total: 0 },
      { month: "October", male: 0, female: 0, total: 0 },
      { month: "November", male: 0, female: 0, total: 0 },
      { month: "December", male: 0, female: 0, total: 0 },
    ],
  });

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

  const handleLogAttendance = () => setShowLogModal(true);
  const handleJointProgram = () => setShowJointProgramModal(true);

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
    });
  };

  const handleSubmitLog = () => {
    const weekIndex = parseInt(logForm.week.split("-")[1]) - 1;
    const monthIndex = parseInt(logForm.month) - 1;

    setAttendanceStats((prev) => ({
      ...prev,
      totalMale: prev.totalMale + logForm.male,
      totalFemale: prev.totalFemale + logForm.female,
      weeksLogged: prev.weeksLogged + 1,
    }));

    setCurrentMonthData((prev) => ({
      ...prev,
      totalMale: prev.totalMale + logForm.male,
      totalFemale: prev.totalFemale + logForm.female,
      totalAttendance: prev.totalAttendance + logForm.total,
      weeks: prev.weeks.map((week, index) =>
        index === weekIndex
          ? {
              ...week,
              male: logForm.male,
              female: logForm.female,
              total: logForm.total,
            }
          : week
      ),
    }));

    setCurrentYearData((prev) => ({
      ...prev,
      totalMale: prev.totalMale + logForm.male,
      totalFemale: prev.totalFemale + logForm.female,
      totalAttendance: prev.totalAttendance + logForm.total,
      months: prev.months.map((month, index) =>
        index === monthIndex
          ? {
              ...month,
              male: month.male + logForm.male,
              female: month.female + logForm.female,
              total: month.total + logForm.total,
            }
          : month
      ),
    }));

    window.showToast("Attendance logged successfully!", "success");
    handleCloseLogModal();
  };

  const handleSubmitJointProgram = () => {
    const weekIndex = parseInt(jointProgramForm.week.split("-")[1]) - 1;

    setCurrentMonthData((prev) => ({
      ...prev,
      weeks: prev.weeks.map((week, index) =>
        index === weekIndex
          ? {
              ...week,
              isJointProgram: true,
              programTitle: jointProgramForm.programTitle,
              location: jointProgramForm.location,
            }
          : week
      ),
    }));

    window.showToast("Joint program logged successfully!", "success");
    handleCloseJointProgramModal();
  };

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
                  <div className="text-white text-xs opacity-90">Status</div>
                  <div className="text-green-300 font-semibold">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AttendanceSummaryCards attendanceStats={attendanceStats} />
        <AttendanceFilter
          handleLogAttendance={handleLogAttendance}
          handleJointProgram={handleJointProgram}
        />
        <AttendanceForDayCard selectedDate={selectedDate} />
        <WeeklyAttendanceCards currentMonthData={currentMonthData} />
        <MonthlyAttendanceTable currentYearData={currentYearData} />
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

      <ToastContainer />
    </LocalDashboardLayout>
  );
}
