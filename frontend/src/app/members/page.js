"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import ExecutivesTable from "../components/ExecutivesTable";
import MembersTable from "../components/MembersTable";
import PinModal from "../components/PinModal";
import ToastContainer from "../components/ToastContainer";
import getDataStore from "../utils/dataStore";

export default function MembersPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedExecutives, setSelectedExecutives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [congregationFilter, setCongregationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinModalConfig, setPinModalConfig] = useState({});
  const [pendingAction, setPendingAction] = useState(null);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [deleteConfirmConfig, setDeleteConfirmConfig] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Statistics
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [totalCongregations, setTotalCongregations] = useState(0);

  // Executive toggle state
  const [executiveView, setExecutiveView] = useState("district"); // "district" or "local"

  // Congregation data
  const [congregationName, setCongregationName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("congregationName");
    }
    return null;
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  // Get congregation name from localStorage
  useEffect(() => {
    const storedCongregationName = localStorage.getItem("congregationName");
    if (storedCongregationName) {
      setCongregationName(storedCongregationName);
    }
  }, []);

  // Force refresh mock data on component mount
  useEffect(() => {
    // Clear existing data and force refresh
    if (typeof window !== "undefined") {
      localStorage.removeItem("membersData");
    }
    const dataStore = getDataStore();
    dataStore.clearAllData();
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      // Get congregation name from localStorage
      const storedCongregationName = localStorage.getItem("congregationName");

      // Get members from data store (no mock data)
      const allMembers = await getDataStore().getMembers();

      // Filter members based on logged-in congregation (except for District Admin)
      let filteredMembers = allMembers;
      if (
        storedCongregationName &&
        storedCongregationName !== "District Admin"
      ) {
        filteredMembers = allMembers.filter(
          (member) =>
            member.congregation === storedCongregationName ||
            member.congregation === "District Office" // Always show district executives
        );
      }

      // Separate executives and regular members
      const executivesList = filteredMembers.filter(
        (member) => member.is_executive
      );
      const regularMembers = filteredMembers.filter(
        (member) => !member.is_executive
      );

      setExecutives(executivesList);
      setMembers(regularMembers);

      // Calculate statistics
      setTotalMembers(filteredMembers.length);
      setTotalMale(filteredMembers.filter((m) => m.gender === "Male").length);
      setTotalFemale(
        filteredMembers.filter((m) => m.gender === "Female").length
      );

      // Count unique congregations (for local congregations, this will be 1 or 2)
      const congregations = new Set(filteredMembers.map((m) => m.congregation));
      setTotalCongregations(congregations.size);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setLoading(false);
    }
  };

  // Filter executives based on current view
  const getFilteredExecutives = () => {
    if (executiveView === "district") {
      const districtExecs = executives.filter(
        (exec) => exec.executive_level === "District"
      );
      return districtExecs;
    } else {
      const localExecs = executives.filter(
        (exec) => exec.executive_level === "Local"
      );
      return localExecs;
    }
  };

  // Group local executives by congregation
  const getGroupedLocalExecutives = () => {
    const localExecutives = executives.filter(
      (exec) => exec.executive_level === "Local"
    );
    const grouped = {};

    localExecutives.forEach((exec) => {
      if (!grouped[exec.congregation]) {
        grouped[exec.congregation] = [];
      }
      grouped[exec.congregation].push(exec);
    });

    return grouped;
  };

  // Handle executive view toggle
  const handleExecutiveViewToggle = () => {
    setExecutiveView(executiveView === "district" ? "local" : "district");
  };

  // Handle member selection
  const handleSelectMember = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Handle select all members
  const handleSelectAll = () => {
    const currentExecutives = getFilteredExecutives();
    if (selectedMembers.length === currentExecutives.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(currentExecutives.map((member) => member.id));
    }
  };

  // Handle view details
  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  // Handle edit member
  const handleEditMember = (member) => {
    setSelectedMember(member);
    setPendingAction("edit");
    setPinModalConfig({
      title: "Enter PIN for Edit Operation",
      description: "Please enter your PIN to confirm the edit operation",
      type: "edit",
    });
    setShowPinModal(true);
  };

  // Handle delete member
  const handleDeleteMember = (member) => {
    setSelectedMember(member);
    setPendingAction("delete");
    setPinModalConfig({
      title: "Enter PIN for Delete Operation",
      description: "Please enter your PIN to confirm the delete operation",
      type: "delete",
    });
    setShowPinModal(true);
  };

  // Handle PIN success
  const handlePinSuccess = () => {
    if (pendingAction === "edit") {
      setShowEditModal(true);
      setShowPinModal(false);
      if (typeof window !== "undefined" && window.showToast) {
        window.showToast(
          "PIN verified! You can now edit the member.",
          "success"
        );
      }
    } else if (pendingAction === "delete") {
      setDeleteConfirmConfig({
        title: "Confirm Delete",
        message: `Are you sure you want to delete ${selectedMember?.name}? This action cannot be undone.`,
        onConfirm: () => {
          // Handle delete logic here
          if (typeof window !== "undefined" && window.showToast) {
            window.showToast("Member deleted successfully!", "success");
          }
          setDeleteConfirmModalOpen(false);
        },
      });
      setDeleteConfirmModalOpen(true);
      setShowPinModal(false);
    }
  };

  // Handle close PIN modal
  const handleClosePinModal = () => {
    setShowPinModal(false);
    setPendingAction(null);
    setSelectedMember(null);
  };

  // Handle close view modal
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedMember(null);
  };

  // Handle close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedMember(null);
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get color for avatar
  const getInitialsColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <DashboardLayout currentPage="Members">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="Members">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center mb-2">
                  <i className="fas fa-users text-white text-2xl lg:text-3xl mr-3"></i>
                  <h1 className="text-xl lg:text-3xl font-bold text-white">
                    {congregationName
                      ? `${congregationName} Members`
                      : "Members Management"}
                    {/* Debug: {congregationName || 'null'} */}
                  </h1>
                </div>
                <p className="text-white/90 text-sm lg:text-base">
                  {congregationName
                    ? `Manage ${congregationName} members and executives`
                    : "Manage congregation members and executives"}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-white text-xs opacity-90">Total</div>
                  <div className="text-white font-semibold">{totalMembers}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-white text-xs opacity-90">
                    Congregations
                  </div>
                  <div className="text-blue-300 font-semibold">
                    {totalCongregations}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max md:grid md:grid-cols-4 md:min-w-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[280px] md:min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <i className="fas fa-users text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Members
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {totalMembers}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[280px] md:min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center w-12 h-12">
                    <i className="fas fa-male text-green-600 dark:text-green-400 text-lg"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Male
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {totalMale}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[280px] md:min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center w-12 h-12">
                    <i className="fas fa-female text-pink-600 dark:text-pink-400 text-lg"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Female
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {totalFemale}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[280px] md:min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <i className="fas fa-church text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Congregations
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    10
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Toggle */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {executiveView === "district"
                ? "District Executives"
                : "Local Executives"}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                District
              </span>
              <button
                onClick={handleExecutiveViewToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  executiveView === "local"
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    executiveView === "local"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Local
              </span>
            </div>
          </div>

          {/* Executives Table */}
          {executiveView === "district" ? (
            <ExecutivesTable
              executives={getFilteredExecutives()}
              onView={handleViewDetails}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
              onSelect={handleSelectMember}
              selectedMembers={selectedMembers}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              membersPerPage={membersPerPage}
            />
          ) : (
            <div>
              {Object.keys(getGroupedLocalExecutives()).length > 0 ? (
                Object.entries(getGroupedLocalExecutives()).map(
                  ([congregation, execs]) => (
                    <div key={congregation} className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {congregation}
                      </h3>
                      <ExecutivesTable
                        executives={execs}
                        onView={handleViewDetails}
                        onEdit={handleEditMember}
                        onDelete={handleDeleteMember}
                        onSelect={handleSelectMember}
                        selectedMembers={selectedMembers}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        membersPerPage={membersPerPage}
                      />
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-users text-gray-400 text-4xl mb-4"></i>
                  <p className="text-gray-500 dark:text-gray-400">
                    No Local Executives Found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Members Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Congregation Members
          </h2>
          <MembersTable
            members={members}
            onView={handleViewDetails}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
            onSelect={handleSelectMember}
            selectedMembers={selectedMembers}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            membersPerPage={membersPerPage}
            handleSelectAll={handleSelectAll}
          />
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  View Member Details
                </h3>
                <button
                  onClick={handleCloseViewModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Section A: Personal Information */}
                <div className="space-y-4 neumorphic-light dark:neumorphic-dark p-6">
                  <h4 className="text-md font-semibold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
                    Section A: Personal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        First Name
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.first_name ||
                          selectedMember.name?.split(" ")[0] ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Last Name
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.last_name ||
                          selectedMember.name?.split(" ").slice(1).join(" ") ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Phone Number
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.phone_number ||
                          selectedMember.phone ||
                          "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Gender
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.gender || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Email
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.email || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Date of Birth
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.date_of_birth || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Marital Status
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.marital_status || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Occupation
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.occupation || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Address
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.address || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Emergency Contact Name
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.emergency_contact_name || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Emergency Contact Phone
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.emergency_contact_phone || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Emergency Contact Relationship
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.emergency_contact_relationship || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section B: Church Information */}
                <div className="space-y-4 neumorphic-light dark:neumorphic-dark p-6">
                  <h4 className="text-md font-semibold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
                    Section B: Church Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Congregation
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.congregation || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Position
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.position || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Communicant
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.communicant || "N/A"}
                      </p>
                    </div>
                    {selectedMember.is_executive && (
                      <>
                        <div className="sm:col-span-1">
                          <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Executive Position
                          </label>
                          <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                            {selectedMember.executive_position || "N/A"}
                          </p>
                        </div>
                        <div className="sm:col-span-1">
                          <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Executive Level
                          </label>
                          <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                            {selectedMember.executive_level || "N/A"}
                          </p>
                        </div>
                      </>
                    )}
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Baptism Date
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.baptism_date || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Confirmation Date
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.confirmation_date || "N/A"}
                      </p>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Membership Date
                      </label>
                      <p className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset">
                        {selectedMember.membership_date || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Member Details
                </h3>
                <button
                  onClick={handleCloseEditModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Section A: Personal Information */}
                <div className="space-y-4 neumorphic-light dark:neumorphic-dark p-6">
                  <h4 className="text-md font-semibold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
                    Section A: Personal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        First Name{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={
                          selectedMember.first_name ||
                          selectedMember.name?.split(" ")[0] ||
                          ""
                        }
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Last Name{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={
                          selectedMember.last_name ||
                          selectedMember.name?.split(" ").slice(1).join(" ") ||
                          ""
                        }
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Phone Number{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        defaultValue={
                          selectedMember.phone_number ||
                          selectedMember.phone ||
                          ""
                        }
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="0XXXXXXXXX"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Gender <span className="text-red-500 font-bold">*</span>
                      </label>
                      <select
                        defaultValue={selectedMember.gender || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        required
                      >
                        <option
                          value=""
                          className="text-light-text dark:text-dark-text"
                        >
                          Select Gender
                        </option>
                        <option
                          value="Male"
                          className="text-light-text dark:text-dark-text"
                        >
                          Male
                        </option>
                        <option
                          value="Female"
                          className="text-light-text dark:text-dark-text"
                        >
                          Female
                        </option>
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={selectedMember.email || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="Email"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        defaultValue={selectedMember.date_of_birth || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Marital Status
                      </label>
                      <select
                        defaultValue={selectedMember.marital_status || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                      >
                        <option
                          value=""
                          className="text-light-text dark:text-dark-text"
                        >
                          Select Marital Status
                        </option>
                        <option
                          value="Single"
                          className="text-light-text dark:text-dark-text"
                        >
                          Single
                        </option>
                        <option
                          value="Married"
                          className="text-light-text dark:text-dark-text"
                        >
                          Married
                        </option>
                        <option
                          value="Divorced"
                          className="text-light-text dark:text-dark-text"
                        >
                          Divorced
                        </option>
                        <option
                          value="Widowed"
                          className="text-light-text dark:text-dark-text"
                        >
                          Widowed
                        </option>
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Occupation
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedMember.occupation || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="Occupation"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedMember.address || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="Address"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        defaultValue={
                          selectedMember.emergency_contact_name || ""
                        }
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="Emergency Contact Name"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue={
                          selectedMember.emergency_contact_phone || ""
                        }
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="0XXXXXXXXX"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Emergency Contact Relationship
                      </label>
                      <input
                        type="text"
                        defaultValue={
                          selectedMember.emergency_contact_relationship || ""
                        }
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="Relationship"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Church Information */}
                <div className="space-y-4 neumorphic-light dark:neumorphic-dark p-6">
                  <h4 className="text-md font-semibold text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">
                    Section B: Church Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Congregation{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <select
                        defaultValue={selectedMember.congregation || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        required
                      >
                        <option
                          value=""
                          className="text-light-text dark:text-dark-text"
                        >
                          Select Congregation
                        </option>
                        <option
                          value="Ahinsan Branch"
                          className="text-light-text dark:text-dark-text"
                        >
                          Ahinsan Branch
                        </option>
                        <option
                          value="Kokomlemle Branch"
                          className="text-light-text dark:text-dark-text"
                        >
                          Kokomlemle Branch
                        </option>
                        <option
                          value="Adabraka Branch"
                          className="text-light-text dark:text-dark-text"
                        >
                          Adabraka Branch
                        </option>
                        <option
                          value="Kaneshie Branch"
                          className="text-light-text dark:text-dark-text"
                        >
                          Kaneshie Branch
                        </option>
                        <option
                          value="Mamprobi Branch"
                          className="text-light-text dark:text-dark-text"
                        >
                          Mamprobi Branch
                        </option>
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedMember.position || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                        placeholder="Position"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Communicant
                      </label>
                      <select
                        defaultValue={selectedMember.communicant || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                      >
                        <option
                          value=""
                          className="text-light-text dark:text-dark-text"
                        >
                          Select Communicant Status
                        </option>
                        <option
                          value="Yes"
                          className="text-light-text dark:text-dark-text"
                        >
                          Yes
                        </option>
                        <option
                          value="No"
                          className="text-light-text dark:text-dark-text"
                        >
                          No
                        </option>
                      </select>
                    </div>
                    {selectedMember.is_executive && (
                      <>
                        <div className="sm:col-span-1">
                          <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Executive Position
                          </label>
                          <select
                            defaultValue={
                              selectedMember.executive_position || ""
                            }
                            className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                          >
                            <option
                              value=""
                              className="text-light-text dark:text-dark-text"
                            >
                              Select Executive Position
                            </option>
                            <option
                              value="president"
                              className="text-light-text dark:text-dark-text"
                            >
                              President
                            </option>
                            <option
                              value="vice_president"
                              className="text-light-text dark:text-dark-text"
                            >
                              Vice President
                            </option>
                            <option
                              value="secretary"
                              className="text-light-text dark:text-dark-text"
                            >
                              Secretary
                            </option>
                            <option
                              value="assistant_secretary"
                              className="text-light-text dark:text-dark-text"
                            >
                              Assistant Secretary
                            </option>
                            <option
                              value="financial_secretary"
                              className="text-light-text dark:text-dark-text"
                            >
                              Financial Secretary
                            </option>
                            <option
                              value="treasurer"
                              className="text-light-text dark:text-dark-text"
                            >
                              Treasurer
                            </option>
                            <option
                              value="organizer"
                              className="text-light-text dark:text-dark-text"
                            >
                              Organizer
                            </option>
                            <option
                              value="evangelism"
                              className="text-light-text dark:text-dark-text"
                            >
                              Evangelism
                            </option>
                          </select>
                        </div>
                        <div className="sm:col-span-1">
                          <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            Executive Level
                          </label>
                          <select
                            defaultValue={selectedMember.executive_level || ""}
                            className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                          >
                            <option
                              value=""
                              className="text-light-text dark:text-dark-text"
                            >
                              Select Executive Level
                            </option>
                            <option
                              value="District"
                              className="text-light-text dark:text-dark-text"
                            >
                              District
                            </option>
                            <option
                              value="Local"
                              className="text-light-text dark:text-dark-text"
                            >
                              Local
                            </option>
                          </select>
                        </div>
                      </>
                    )}
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Baptism Date
                      </label>
                      <input
                        type="date"
                        defaultValue={selectedMember.baptism_date || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Confirmation Date
                      </label>
                      <input
                        type="date"
                        defaultValue={selectedMember.confirmation_date || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Membership Date
                      </label>
                      <input
                        type="date"
                        defaultValue={selectedMember.membership_date || ""}
                        className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-light-border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface text-sm lg:text-base neumorphic-light-inset dark:neumorphic-dark-inset"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <button
                  onClick={handleCloseEditModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle save logic here
                    handleCloseEditModal();
                    // Show success toast
                    // setToastMessage("Member updated successfully!"); // This line was removed from the new_code, so it's removed here.
                    // setShowToast(true); // This line was removed from the new_code, so it's removed here.
                    // setTimeout(() => setShowToast(false), 3000); // This line was removed from the new_code, so it's removed here.
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PIN Modal */}
      <PinModal
        isOpen={showPinModal}
        onClose={handleClosePinModal}
        onSuccess={handlePinSuccess}
        config={pinModalConfig}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmModalOpen}
        onClose={() => setDeleteConfirmModalOpen(false)}
        config={deleteConfirmConfig}
      />

      {/* Toast Container */}
      <ToastContainer />
    </DashboardLayout>
  );
}
