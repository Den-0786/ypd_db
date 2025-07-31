"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCongregation, setSelectedCongregation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExecutives, setSelectedExecutives] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [membersPerPage] = useState(20);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const mockMembers = [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          phone_number: "+233123456789",
          gender: "Male",
          congregation: {
            name: "Emmanuel Congregation Ahinsan",
            background_color: "#3B82F6",
          },
          membership_status: "Active",
          executive_position: "District President",
          is_executive: true,
          is_district_executive: true,
          attends_communion: true,
        },
        {
          id: 2,
          first_name: "Jane",
          last_name: "Smith",
          phone_number: "+233987654321",
          gender: "Female",
          congregation: {
            name: "Peniel Congregation Esreso No1",
            background_color: "#10B981",
          },
          membership_status: "Active",
          executive_position: "District Secretary",
          is_executive: true,
          is_district_executive: true,
          attends_communion: true,
        },
        {
          id: 3,
          first_name: "Michael",
          last_name: "Johnson",
          phone_number: "+233555123456",
          gender: "Male",
          congregation: {
            name: "Mizpah Congregation Odagya No1",
            background_color: "#8B5CF6",
          },
          membership_status: "Active",
          executive_position: "District Treasurer",
          is_executive: true,
          is_district_executive: true,
          attends_communion: true,
        },
        // Regular Members
        {
          id: 4,
          first_name: "Sarah",
          last_name: "Wilson",
          phone_number: "+233777888999",
          gender: "Female",
          congregation: {
            name: "Emmanuel Congregation Ahinsan",
            background_color: "#3B82F6",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 5,
          first_name: "David",
          last_name: "Brown",
          phone_number: "+233666555444",
          gender: "Male",
          congregation: {
            name: "Peniel Congregation Esreso No1",
            background_color: "#10B981",
          },
          membership_status: "Active",
          executive_position: "Local President",
          is_executive: true,
          is_district_executive: false,
          attends_communion: false,
        },
        {
          id: 6,
          first_name: "Emily",
          last_name: "Davis",
          phone_number: "+233444333222",
          gender: "Female",
          congregation: {
            name: "Christ Congregation Ahinsan Estate",
            background_color: "#F59E0B",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 7,
          first_name: "Robert",
          last_name: "Miller",
          phone_number: "+233333222111",
          gender: "Male",
          congregation: {
            name: "Ebenezer Congregation Dompoase Aprabo",
            background_color: "#EF4444",
          },
          membership_status: "Active",
          executive_position: "Local Secretary",
          is_executive: true,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 8,
          first_name: "Lisa",
          last_name: "Garcia",
          phone_number: "+233222111000",
          gender: "Female",
          congregation: {
            name: "Favour Congregation Esreso No2",
            background_color: "#06B6D4",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: false,
        },
        {
          id: 9,
          first_name: "James",
          last_name: "Taylor",
          phone_number: "+233111000999",
          gender: "Male",
          congregation: {
            name: "Liberty Congregation Esreso High Tension",
            background_color: "#84CC16",
          },
          membership_status: "Active",
          executive_position: "Local Treasurer",
          is_executive: true,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 10,
          first_name: "Amanda",
          last_name: "Anderson",
          phone_number: "+233000999888",
          gender: "Female",
          congregation: { name: "Odagya No2", background_color: "#EC4899" },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 11,
          first_name: "Robert",
          last_name: "Wilson",
          phone_number: "+233111222333",
          gender: "Male",
          congregation: { name: "Kokobriko", background_color: "#6B7280" },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 12,
          first_name: "Jennifer",
          last_name: "Taylor",
          phone_number: "+233222333444",
          gender: "Female",
          congregation: { name: "NOM", background_color: "#059669" },
          membership_status: "Active",
          executive_position: "Local Secretary",
          is_executive: true,
          is_district_executive: false,
          attends_communion: false,
        },
        {
          id: 13,
          first_name: "Christopher",
          last_name: "Martinez",
          phone_number: "+233333444555",
          gender: "Male",
          congregation: {
            name: "Emmanuel Congregation Ahinsan",
            background_color: "#3B82F6",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 14,
          first_name: "Jessica",
          last_name: "Garcia",
          phone_number: "+233444555666",
          gender: "Female",
          congregation: {
            name: "Peniel Congregation Esreso No1",
            background_color: "#10B981",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 15,
          first_name: "Daniel",
          last_name: "Rodriguez",
          phone_number: "+233555666777",
          gender: "Male",
          congregation: {
            name: "Mizpah Congregation Odagya No1",
            background_color: "#8B5CF6",
          },
          membership_status: "Active",
          executive_position: "Local Treasurer",
          is_executive: true,
          is_district_executive: false,
          attends_communion: false,
        },
        {
          id: 16,
          first_name: "Ashley",
          last_name: "Lee",
          phone_number: "+233666777888",
          gender: "Female",
          congregation: {
            name: "Christ Congregation Ahinsan Estate",
            background_color: "#F59E0B",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 17,
          first_name: "Matthew",
          last_name: "White",
          phone_number: "+233777888999",
          gender: "Male",
          congregation: {
            name: "Ebenezer Congregation Dompoase Aprabo",
            background_color: "#EF4444",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 18,
          first_name: "Nicole",
          last_name: "Harris",
          phone_number: "+233888999000",
          gender: "Female",
          congregation: {
            name: "Favour Congregation Esreso No2",
            background_color: "#06B6D4",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: false,
        },
        {
          id: 19,
          first_name: "Andrew",
          last_name: "Clark",
          phone_number: "+233999000111",
          gender: "Male",
          congregation: {
            name: "Liberty Congregation Esreso High Tension",
            background_color: "#84CC16",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 20,
          first_name: "Samantha",
          last_name: "Lewis",
          phone_number: "+233000111222",
          gender: "Female",
          congregation: { name: "Odagya No2", background_color: "#EC4899" },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 21,
          first_name: "Joshua",
          last_name: "Robinson",
          phone_number: "+233111222333",
          gender: "Male",
          congregation: { name: "Kokobriko", background_color: "#6B7280" },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: false,
        },
        {
          id: 22,
          first_name: "Megan",
          last_name: "Walker",
          phone_number: "+233222333444",
          gender: "Female",
          congregation: { name: "NOM", background_color: "#059669" },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 23,
          first_name: "Ryan",
          last_name: "Perez",
          phone_number: "+233333444555",
          gender: "Male",
          congregation: {
            name: "Emmanuel Congregation Ahinsan",
            background_color: "#3B82F6",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
        {
          id: 24,
          first_name: "Lauren",
          last_name: "Hall",
          phone_number: "+233444555666",
          gender: "Female",
          congregation: {
            name: "Peniel Congregation Esreso No1",
            background_color: "#10B981",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: false,
        },
        {
          id: 25,
          first_name: "Kevin",
          last_name: "Young",
          phone_number: "+233555666777",
          gender: "Male",
          congregation: {
            name: "Mizpah Congregation Odagya No1",
            background_color: "#8B5CF6",
          },
          membership_status: "Active",
          executive_position: null,
          is_executive: false,
          is_district_executive: false,
          attends_communion: true,
        },
      ];
      setMembers(mockMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const districtExecutives = members.filter(
    (member) => member.is_district_executive
  );
  const localExecutives = members.filter(
    (member) => member.is_executive && !member.is_district_executive
  );
  const regularMembers = members.filter((member) => !member.is_executive);

  const totalMembers = members.length;
  const totalMale = members.filter((member) => member.gender === "Male").length;
  const totalFemale = members.filter(
    (member) => member.gender === "Female"
  ).length;
  const totalCongregations = [
    ...new Set(members.map((member) => member.congregation.name)),
  ].length;
  const totalCommunicants = members.filter(
    (member) => member.attends_communion
  ).length;
  const totalConfirmants = members.filter(
    (member) => member.confirmation === "Yes"
  ).length;
  const totalBaptisms = members.filter(
    (member) => member.baptism === "Yes"
  ).length;

  // Filter members based on search and congregation
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone_number.includes(searchTerm);
    const matchesCongregation =
      !selectedCongregation ||
      member.congregation.name === selectedCongregation;

    // Exclude district executives from regular members list
    const isDistrictExecutive = member.is_district_executive;

    // Exclude branch executives from regular members list when their congregation is selected
    const isBranchExecutive =
      member.is_executive && !member.is_district_executive;
    const shouldExcludeBranchExecutive =
      selectedCongregation &&
      isBranchExecutive &&
      member.congregation.name === selectedCongregation;

    return (
      matchesSearch &&
      matchesCongregation &&
      !isDistrictExecutive &&
      !shouldExcludeBranchExecutive
    );
  });

  // Pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCongregationSelect = (congregation) => {
    setSelectedCongregation(congregation);
    setCurrentPage(1);
  };

  const handleSelectAllExecutives = () => {
    if (selectedExecutives.length === districtExecutives.length) {
      setSelectedExecutives([]);
    } else {
      setSelectedExecutives(districtExecutives.map((exec) => exec.id));
    }
  };

  const handleSelectExecutive = (executiveId) => {
    setSelectedExecutives((prev) =>
      prev.includes(executiveId)
        ? prev.filter((id) => id !== executiveId)
        : [...prev, executiveId]
    );
  };

  const handleSelectAllMembers = () => {
    if (selectedMembers.length === currentMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(currentMembers.map((member) => member.id));
    }
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleDeleteSelectedMembers = () => {
    if (selectedMembers.length === 0) {
      alert("Please select members to delete");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to delete ${selectedMembers.length} selected member(s)?`
    );

    if (confirmDelete) {
      const updatedMembers = members.filter(
        (member) => !selectedMembers.includes(member.id)
      );
      setMembers(updatedMembers);
      setSelectedMembers([]);
      alert(`${selectedMembers.length} member(s) deleted successfully!`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout currentPage="Members">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Print Table for Members
  function printTable() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return; // Don't execute on server side
    }

    const printContents =
      document.getElementById("members-table-area").innerHTML;
    const win = window.open("", "", "height=700,width=900");
    if (win) {
      win.document.write("<html><head><title>Print Members</title>");
      win.document.write(
        "<style>table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:8px;}th{background:#f3f4f6;}</style>"
      );
      win.document.write("</head><body>");
      win.document.write(printContents);
      win.document.write("</body></html>");
      win.document.close();
      win.print();
    }
  }

  return (
    <DashboardLayout currentPage="Members">
      <div
        className={`space-y-6${viewModalOpen ? " modal-blur pointer-events-none select-none" : ""}`}
      >
        {/* Statistics Cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="bg-blue-500 dark:bg-gray-800 text-white rounded-lg p-4 min-w-[180px] flex-shrink-0 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Total Members</p>
                <p className="text-lg font-bold">{totalMembers}</p>
              </div>
              <i className="fas fa-users text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
            </div>
          </div>
          <div className="bg-green-500 dark:bg-gray-800 text-white rounded-lg p-4 min-w-[180px] flex-shrink-0 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Male Members</p>
                <p className="text-lg font-bold">{totalMale}</p>
              </div>
              <i className="fas fa-mars text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
            </div>
          </div>
          <div className="bg-pink-500 dark:bg-gray-800 text-white rounded-lg p-4 min-w-[180px] flex-shrink-0 shadow-lg dark:shadow-pink-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-pink-600/20 dark:from-pink-400/10 dark:to-pink-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Female Members</p>
                <p className="text-lg font-bold">{totalFemale}</p>
              </div>
              <i className="fas fa-venus text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
            </div>
          </div>
          <div className="bg-purple-500 dark:bg-gray-800 text-white rounded-lg p-4 min-w-[180px] flex-shrink-0 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Congregations</p>
                <p className="text-lg font-bold">{totalCongregations}</p>
              </div>
              <i className="fas fa-church text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
            </div>
          </div>
          <div className="bg-yellow-500 dark:bg-gray-800 text-white rounded-lg p-4 min-w-[180px] flex-shrink-0 shadow-lg dark:shadow-yellow-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 dark:from-yellow-400/10 dark:to-yellow-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Communicants</p>
                <p className="text-lg font-bold">{totalCommunicants}</p>
              </div>
              <i className="fas fa-wine-glass text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
            </div>
          </div>
          <div className="bg-amber-500 dark:bg-gray-800 text-white rounded-lg p-4 min-w-[180px] flex-shrink-0 shadow-lg dark:shadow-amber-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 dark:from-amber-400/10 dark:to-amber-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Confirmants</p>
                <p className="text-lg font-bold">{totalConfirmants}</p>
              </div>
              <i className="fas fa-cross text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
            </div>
          </div>
          <div className="bg-orange-500 dark:bg-gray-800 text-white rounded-lg p-4 min-w-[180px] flex-shrink-0 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Baptisms</p>
                <p className="text-lg font-bold">{totalBaptisms}</p>
              </div>
              <i className="fas fa-water text-xl opacity-80 group-hover:scale-110 transition-transform duration-200"></i>
            </div>
          </div>
        </div>
        {/* District Executives Section - Only show when no congregation is selected */}
        {!selectedCongregation && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                <i className="fas fa-crown text-blue-500 mr-2"></i>
                District Executive Committee
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-blue-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-[7rem] py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center justify-end">
                        <input
                          type="checkbox"
                          checked={
                            selectedExecutives.length ===
                              districtExecutives.length &&
                            districtExecutives.length > 0
                          }
                          onChange={handleSelectAllExecutives}
                          className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Congregation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Communicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {districtExecutives.map((executive) => (
                    <tr
                      key={executive.id}
                      className="hover:bg-blue-50 dark:hover:bg-gray-600 relative overflow-hidden group bg-gradient-to-r from-blue-400/5 to-blue-600/5 dark:from-blue-400/3 dark:to-blue-600/3 animate-pulse"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="flex items-center justify-start">
                          <input
                            type="checkbox"
                            checked={selectedExecutives.includes(executive.id)}
                            onChange={() => handleSelectExecutive(executive.id)}
                            className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                          />
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {executive.first_name[0]}
                                {executive.last_name[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white text-right">
                              {executive.first_name} {executive.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-center">
                        {executive.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            executive.gender === "Male"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-pink-100 text-pink-800"
                          }`}
                        >
                          <i
                            className={`fas fa-${executive.gender === "Male" ? "mars" : "venus"} mr-1`}
                          ></i>
                          {executive.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                          style={{
                            backgroundColor:
                              executive.congregation.background_color,
                          }}
                        >
                          {executive.congregation.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {executive.executive_position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            executive.attends_communion
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <i className={`fas fa-wine-glass mr-1`}></i>
                          {executive.attends_communion ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedMember(executive);
                              setViewModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                            title="View member details"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-600/10 dark:from-blue-400/5 dark:to-blue-600/5 animate-pulse"></div>
                            <i className="fas fa-eye relative z-10"></i>
                          </button>
                          <a
                            href={`/members/${executive.id}/edit`}
                            className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                            title="Edit member"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 dark:from-yellow-400/5 dark:to-yellow-600/5 animate-pulse"></div>
                            <i className="fas fa-edit relative z-10"></i>
                          </a>
                          <button
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                            title="Delete member"
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this member?"
                                )
                              ) {
                                const updatedMembers = members.filter(
                                  (m) => m.id !== executive.id
                                );
                                setMembers(updatedMembers);
                                alert("Member deleted successfully!");
                              }
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 dark:from-red-400/5 dark:to-red-600/5 animate-pulse"></div>
                            <i className="fas fa-trash relative z-10"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              <i className="fas fa-search text-blue-500 mr-2"></i>
              Search & Filter
            </h2>
          </div>

          <div className="flex flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                Search Members
              </label>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
                Filter by Congregation
              </label>
              <select
                value={selectedCongregation}
                onChange={(e) => handleCongregationSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="" className="dark:text-white">
                  All Congregations
                </option>
                {[
                  ...new Set(members.map((member) => member.congregation.name)),
                ].map((congregation) => (
                  <option
                    key={congregation}
                    value={congregation}
                    className="dark:text-white"
                  >
                    {congregation}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Congregation Statistics (when congregation is selected) */}
        {selectedCongregation && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <i className="fas fa-church text-purple-500 mr-2"></i>
              {selectedCongregation} Statistics
            </h3>
            {(() => {
              const congregationMembers = members.filter(
                (member) => member.congregation.name === selectedCongregation
              );
              const congregationMale = congregationMembers.filter(
                (member) => member.gender === "Male"
              ).length;
              const congregationFemale = congregationMembers.filter(
                (member) => member.gender === "Female"
              ).length;
              const congregationTotal = congregationMembers.length;
              const congregationCommunicants = congregationMembers.filter(
                (member) => member.attends_communion
              ).length;
              const congregationExecutives = congregationMembers.filter(
                (member) => member.is_executive && !member.is_district_executive
              );

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                          Total Members
                        </p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                          {congregationTotal}
                        </p>
                      </div>
                      <i className="fas fa-users text-blue-500 text-xl"></i>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 dark:text-green-300 font-medium">
                          Male
                        </p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                          {congregationMale}
                        </p>
                      </div>
                      <i className="fas fa-mars text-green-500 text-xl"></i>
                    </div>
                  </div>

                  <div className="bg-pink-50 dark:bg-pink-900 border border-pink-200 dark:border-pink-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-pink-600 dark:text-pink-300 font-medium">
                          Female
                        </p>
                        <p className="text-2xl font-bold text-pink-900 dark:text-pink-100">
                          {congregationFemale}
                        </p>
                      </div>
                      <i className="fas fa-venus text-pink-500 text-xl"></i>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-600 dark:text-yellow-300 font-medium">
                          Communicants
                        </p>
                        <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                          {congregationCommunicants}
                        </p>
                      </div>
                      <i className="fas fa-wine-glass text-yellow-500 text-xl"></i>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Branch Executives for selected congregation */}
            {(() => {
              const congregationExecutives = members.filter(
                (member) =>
                  member.congregation.name === selectedCongregation &&
                  member.is_executive &&
                  !member.is_district_executive
              );

              if (congregationExecutives.length > 0) {
                return (
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        <i className="fas fa-star text-blue-500 mr-2"></i>
                        {selectedCongregation} Branch Executives
                      </h4>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-blue-50 dark:bg-blue-900">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                              Gender
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                              Position
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                              Communicant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-200 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {congregationExecutives.map((executive) => (
                            <tr
                              key={executive.id}
                              className="hover:bg-blue-50 dark:hover:bg-blue-900 relative overflow-hidden group bg-gradient-to-r from-blue-400/5 to-blue-600/5 dark:from-blue-400/3 dark:to-blue-600/3 animate-pulse"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                      <span className="text-sm font-medium text-white">
                                        {executive.first_name[0]}
                                        {executive.last_name[0]}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {executive.first_name}{" "}
                                      {executive.last_name}
                                    </div>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      <i className="fas fa-star mr-1"></i>
                                      Branch Executive
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {executive.phone_number}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    executive.gender === "Male"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-pink-100 text-pink-800"
                                  }`}
                                >
                                  <i
                                    className={`fas fa-${executive.gender === "Male" ? "mars" : "venus"} mr-1`}
                                  ></i>
                                  {executive.gender}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {executive.executive_position}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    executive.attends_communion
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  <i className={`fas fa-wine-glass mr-1`}></i>
                                  {executive.attends_communion ? "Yes" : "No"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => {
                                      setSelectedMember(executive);
                                      setViewModalOpen(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                                    title="View member details"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-600/10 dark:from-blue-400/5 dark:to-blue-600/5 animate-pulse"></div>
                                    <i className="fas fa-eye relative z-10"></i>
                                  </button>
                                  <a
                                    href={`/members/${executive.id}/edit`}
                                    className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                                    title="Edit member"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 dark:from-yellow-400/5 dark:to-yellow-600/5 animate-pulse"></div>
                                    <i className="fas fa-edit relative z-10"></i>
                                  </a>
                                  <button
                                    className="text-red-600 hover:text-red-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                                    title="Delete member"
                                    onClick={() => {
                                      if (
                                        confirm(
                                          "Are you sure you want to delete this member?"
                                        )
                                      ) {
                                        const updatedMembers = members.filter(
                                          (m) => m.id !== executive.id
                                        );
                                        setMembers(updatedMembers);
                                        alert("Member deleted successfully!");
                                      }
                                    }}
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 dark:from-red-400/5 dark:to-red-600/5 animate-pulse"></div>
                                    <i className="fas fa-trash relative z-10"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* Members List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Members ({filteredMembers.length} total)
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {/* Top Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {indexOfFirstMember + 1} to{" "}
                  {Math.min(indexOfLastMember, filteredMembers.length)} of{" "}
                  {filteredMembers.length} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm"
                    }`}
                  >
                    <i className="fas fa-chevron-left mr-1"></i>
                    Prev
                  </button>

                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm"
                    }`}
                  >
                    Next
                    <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto" id="members-table-area">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-[7rem] py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center justify-end">
                      <input
                        type="checkbox"
                        checked={
                          selectedMembers.length === currentMembers.length &&
                          currentMembers.length > 0
                        }
                        onChange={handleSelectAllMembers}
                        className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Name
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Congregation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Communicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 relative overflow-hidden group bg-gradient-to-r from-gray-400/5 to-gray-600/5 dark:from-gray-400/3 dark:to-gray-600/3 animate-pulse"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center justify-start">
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => handleSelectMember(member.id)}
                          className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                        />
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {member.first_name[0]}
                              {member.last_name[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white text-right">
                            {member.first_name} {member.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-center">
                      {member.phone_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.gender === "Male"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        <i
                          className={`fas fa-${member.gender === "Male" ? "mars" : "venus"} mr-1`}
                        ></i>
                        {member.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{
                          backgroundColor: member.congregation.background_color,
                        }}
                      >
                        {member.congregation.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {member.executive_position
                        ? member.executive_position
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())
                        : "Member"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.attends_communion
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <i className={`fas fa-wine-glass mr-1`}></i>
                        {member.attends_communion ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedMember(member);
                            setViewModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                          title="View member details"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-600/10 dark:from-blue-400/5 dark:to-blue-600/5 animate-pulse"></div>
                          <i className="fas fa-eye relative z-10"></i>
                        </button>
                        <a
                          href={`/members/${member.id}/edit`}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                          title="Edit member"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 dark:from-yellow-400/5 dark:to-yellow-600/5 animate-pulse"></div>
                          <i className="fas fa-edit relative z-10"></i>
                        </a>
                        <button
                          className="text-red-600 hover:text-red-900 transition-colors duration-200 relative overflow-hidden group p-1 rounded"
                          title="Delete member"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this member?"
                              )
                            ) {
                              const updatedMembers = members.filter(
                                (m) => m.id !== member.id
                              );
                              setMembers(updatedMembers);
                              alert("Member deleted successfully!");
                            }
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 dark:from-red-400/5 dark:to-red-600/5 animate-pulse"></div>
                          <i className="fas fa-trash relative z-10"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {indexOfFirstMember + 1} to{" "}
                  {Math.min(indexOfLastMember, filteredMembers.length)} of{" "}
                  {filteredMembers.length} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm"
                    }`}
                  >
                    <i className="fas fa-chevron-left mr-1"></i>
                    Prev
                  </button>
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm"
                    }`}
                  >
                    Next
                    <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Print Table Button at Bottom */}
          <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-gray-200 justify-between">
            <div className="flex gap-2">
              {selectedMembers.length > 0 && (
                <button
                  onClick={handleDeleteSelectedMembers}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors flex items-center text-xs font-medium relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 dark:from-red-400/10 dark:to-red-600/10 animate-pulse"></div>
                  <i className="fas fa-trash mr-1.5 relative z-10"></i>
                  <span className="relative z-10">
                    Delete Selected ({selectedMembers.length})
                  </span>
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={printTable}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-xs font-medium relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
                <i className="fas fa-print mr-1.5 relative z-10"></i>
                <span className="relative z-10">Print Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Member Details Modal */}
      {viewModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Member Details - {selectedMember.first_name}{" "}
                {selectedMember.last_name}
              </h3>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Personal & Contact Information */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                          <i className="fas fa-user text-blue-600 dark:text-blue-400 text-sm sm:text-base"></i>
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          Personal Information
                        </h4>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              First Name:
                            </label>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMember.first_name}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Last Name:
                            </label>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMember.last_name}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Gender:
                            </label>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                selectedMember.gender === "Male"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                              }`}
                            >
                              {selectedMember.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                          <i className="fas fa-phone text-green-600 dark:text-green-400 text-sm sm:text-base"></i>
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          Contact Information
                        </h4>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Phone Number:
                            </label>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMember.phone_number}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Email Address:
                            </label>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMember.email || "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Address:
                            </label>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMember.address || "Not provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Church & Religious Information */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Church Information */}
                    <div>
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                          <i className="fas fa-church text-indigo-600 dark:text-indigo-400 text-sm sm:text-base"></i>
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          Church Information
                        </h4>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Congregation:
                            </label>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMember.congregation.name}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Position:
                            </label>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                              {selectedMember.executive_position || "Member"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Membership Status:
                            </label>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                selectedMember.membership_status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {selectedMember.membership_status}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Executive Level:
                            </label>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                selectedMember.is_district_executive
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : selectedMember.is_executive
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                              }`}
                            >
                              {selectedMember.is_district_executive
                                ? "District Executive"
                                : selectedMember.is_executive
                                  ? "Branch Executive"
                                  : "Regular Member"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Religious Information */}
                    <div>
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                          <i className="fas fa-cross text-red-600 dark:text-red-400 text-sm sm:text-base"></i>
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          Religious Information
                        </h4>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                              Communicant:
                            </label>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                selectedMember.attends_communion
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {selectedMember.attends_communion ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                          <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                            Baptism:
                          </label>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              selectedMember.baptism === "Yes"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {selectedMember.baptism}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                          <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                            Communicant:
                          </label>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              selectedMember.communicant === "Yes"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {selectedMember.communicant}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Section */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 sm:p-6 mt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-tools text-gray-600 dark:text-gray-400 text-sm sm:text-base"></i>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      Quick Actions
                    </h4>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <button
                      onClick={() => {
                        // Handle edit member
                        setViewModalOpen(false);
                      }}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:flex-1"
                    >
                      <i className="fas fa-edit mr-2"></i>
                      Edit Member
                    </button>

                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.open(
                            `tel:${selectedMember.phone_number}`,
                            "_blank"
                          );
                        }
                      }}
                      className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:flex-1"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      Call Member
                    </button>

                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.open(
                            `sms:${selectedMember.phone_number}`,
                            "_blank"
                          );
                        }
                      }}
                      className="flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:flex-1"
                    >
                      <i className="fas fa-envelope mr-2"></i>
                      Send SMS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
