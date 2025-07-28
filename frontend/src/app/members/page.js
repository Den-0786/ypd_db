"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCongregation, setSelectedCongregation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(20);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      // Mock data with more comprehensive information
      const mockMembers = [
        // District Executives
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
    setCurrentPage(1); // Reset to first page when filtering
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
    const printContents =
      document.getElementById("members-table-area").innerHTML;
    const win = window.open("", "", "height=700,width=900");
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

  return (
    <DashboardLayout currentPage="Members">
      <div
        className={`space-y-6${viewModalOpen ? " modal-blur pointer-events-none select-none" : ""}`}
      >
        {/* Statistics Cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3 min-w-[160px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Total Members</p>
                <p className="text-lg font-bold">{totalMembers}</p>
              </div>
              <i className="fas fa-users text-xl opacity-80"></i>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-3 min-w-[160px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Male Members</p>
                <p className="text-lg font-bold">{totalMale}</p>
              </div>
              <i className="fas fa-mars text-xl opacity-80"></i>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg p-3 min-w-[160px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Female Members</p>
                <p className="text-lg font-bold">{totalFemale}</p>
              </div>
              <i className="fas fa-venus text-xl opacity-80"></i>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-3 min-w-[160px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Congregations</p>
                <p className="text-lg font-bold">{totalCongregations}</p>
              </div>
              <i className="fas fa-church text-xl opacity-80"></i>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-3 min-w-[160px] flex-shrink-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Communicants</p>
                <p className="text-lg font-bold">{totalCommunicants}</p>
              </div>
              <i className="fas fa-wine-glass text-xl opacity-80"></i>
            </div>
          </div>
        </div>

        {/* District Executives Section - Only show when no congregation is selected */}
        {!selectedCongregation && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                <i className="fas fa-crown text-yellow-500 mr-2"></i>
                District Executive Committee
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {districtExecutives.map((executive) => (
                    <tr key={executive.id} className="hover:bg-yellow-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {executive.first_name[0]}
                                {executive.last_name[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {executive.first_name} {executive.last_name}
                            </div>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <i className="fas fa-crown mr-1"></i>
                              District Executive
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
                      <td className="px-6 py-4 whitespace-nowrap">
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
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                            title="View member details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <a
                            href={`/members/${executive.id}/edit`}
                            className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                            title="Edit member"
                          >
                            <i className="fas fa-edit"></i>
                          </a>
                          <button
                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
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
                            <i className="fas fa-trash"></i>
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

        {/* Congregation Search and Filter */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            <i className="fas fa-search text-blue-500 mr-2"></i>
            Search & Filter
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Search Members
              </label>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Filter by Congregation
              </label>
              <select
                value={selectedCongregation}
                onChange={(e) => handleCongregationSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Congregations</option>
                {[
                  ...new Set(members.map((member) => member.congregation.name)),
                ].map((congregation) => (
                  <option key={congregation} value={congregation}>
                    {congregation}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Congregation Statistics (when congregation is selected) */}
        {selectedCongregation && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">
                          Total Members
                        </p>
                        <p className="text-2xl font-bold text-blue-900">
                          {congregationTotal}
                        </p>
                      </div>
                      <i className="fas fa-users text-blue-500 text-xl"></i>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">
                          Male
                        </p>
                        <p className="text-2xl font-bold text-green-900">
                          {congregationMale}
                        </p>
                      </div>
                      <i className="fas fa-mars text-green-500 text-xl"></i>
                    </div>
                  </div>

                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-pink-600 font-medium">
                          Female
                        </p>
                        <p className="text-2xl font-bold text-pink-900">
                          {congregationFemale}
                        </p>
                      </div>
                      <i className="fas fa-venus text-pink-500 text-xl"></i>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-600 font-medium">
                          Communicants
                        </p>
                        <p className="text-2xl font-bold text-yellow-900">
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
                  <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900">
                        <i className="fas fa-star text-blue-500 mr-2"></i>
                        {selectedCongregation} Branch Executives
                      </h4>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Gender
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
                        <tbody className="bg-white divide-y divide-gray-200">
                          {congregationExecutives.map((executive) => (
                            <tr key={executive.id} className="hover:bg-blue-50">
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
                                    <div className="text-sm font-medium text-gray-900">
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
                                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                    title="View member details"
                                  >
                                    <i className="fas fa-eye"></i>
                                  </button>
                                  <a
                                    href={`/members/${executive.id}/edit`}
                                    className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                                    title="Edit member"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </a>
                                  <button
                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
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
                                    <i className="fas fa-trash"></i>
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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Members ({filteredMembers.length} total)
              </h3>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {/* Top Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstMember + 1} to{" "}
                  {Math.min(indexOfLastMember, filteredMembers.length)} of{" "}
                  {filteredMembers.length} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
                    }`}
                  >
                    <i className="fas fa-chevron-left mr-1"></i>
                    Previous
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
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
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
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
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
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {member.first_name[0]}
                              {member.last_name[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.first_name} {member.last_name}
                          </div>
                          {member.is_district_executive && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <i className="fas fa-crown mr-1"></i>
                              District Executive
                            </span>
                          )}
                          {member.is_executive &&
                            !member.is_district_executive && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <i className="fas fa-star mr-1"></i>
                                Local Executive
                              </span>
                            )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{
                          backgroundColor: member.congregation.background_color,
                        }}
                      >
                        {member.congregation.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          title="View member details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <a
                          href={`/members/${member.id}/edit`}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                          title="Edit member"
                        >
                          <i className="fas fa-edit"></i>
                        </a>
                        <button
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
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
                          <i className="fas fa-trash"></i>
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
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstMember + 1} to{" "}
                  {Math.min(indexOfLastMember, filteredMembers.length)} of{" "}
                  {filteredMembers.length} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
                    }`}
                  >
                    <i className="fas fa-chevron-left mr-1"></i>
                    Previous
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
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
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
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
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
          <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-gray-200 justify-end">
            <button
              onClick={printTable}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              <i className="fas fa-print mr-1"></i> Print Table
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <a
              href="/members/add"
              className="flex items-center justify-center bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition text-xs font-medium shadow-sm"
            >
              <i className="fas fa-user-plus mr-2 text-sm"></i>
              Add New Member
            </a>
            <a
              href="/bulk"
              className="flex items-center justify-center bg-green-600 text-white px-2 py-2 rounded-lg hover:bg-green-700 transition text-xs font-medium shadow-sm"
            >
              <i className="fas fa-users mr-2 text-sm"></i>
              Bulk Import
            </a>
            <button className="flex items-center justify-center bg-purple-600 text-white px-2 py-2 rounded-lg hover:bg-purple-700 transition text-xs font-medium shadow-sm">
              <i className="fas fa-download mr-2 text-sm"></i>
              Export Data
            </button>
            <a
              href="/analytics"
              className="flex items-center justify-center bg-yellow-600 text-white px-2 py-2 rounded-lg hover:bg-yellow-700 transition text-xs font-medium shadow-sm"
            >
              <i className="fas fa-chart-bar mr-2 text-sm"></i>
              View Analytics
            </a>
          </div>
        </div>
      </div>
      {/* Member Details Modal */}
      {viewModalOpen && selectedMember && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50"
            style={{ background: "rgba(0,0,0,0.15)" }}
            onClick={() => setViewModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    <i className="fas fa-user-circle text-blue-500 mr-3"></i>
                    Member Details
                  </h2>
                  <button
                    onClick={() => setViewModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                      <span className="text-3xl font-bold text-white">
                        {selectedMember.first_name[0]}
                        {selectedMember.last_name[0]}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedMember.first_name} {selectedMember.last_name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      {selectedMember.is_district_executive && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          <i className="fas fa-crown mr-1"></i>
                          District Executive
                        </span>
                      )}
                      {selectedMember.is_executive &&
                        !selectedMember.is_district_executive && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            <i className="fas fa-star mr-1"></i>
                            Branch Executive
                          </span>
                        )}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedMember.gender === "Male"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        <i
                          className={`fas fa-${selectedMember.gender === "Male" ? "mars" : "venus"} mr-1`}
                        ></i>
                        {selectedMember.gender}
                      </span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-phone text-blue-500 mr-2"></i>
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-phone text-blue-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.phone_number}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-church text-green-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Congregation</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.congregation.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-envelope text-purple-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.email || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-map-marker-alt text-orange-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.address || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Membership Details */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-id-card text-green-500 mr-2"></i>
                      Membership Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-user-check text-green-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              selectedMember.membership_status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {selectedMember.membership_status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-user-tie text-purple-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Position</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.executive_position
                              ? selectedMember.executive_position
                                  .replace("_", " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())
                              : "Member"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-calendar-plus text-blue-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.date_of_birth || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-graduation-cap text-indigo-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Education Level
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.education_level || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-briefcase text-teal-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Occupation</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.occupation || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-heart text-pink-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Marital Status
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.marital_status || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-info-circle text-purple-500 mr-2"></i>
                      Additional Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-wine-glass text-purple-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Communion Status
                          </p>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              selectedMember.attends_communion
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <i className={`fas fa-wine-glass mr-1`}></i>
                            {selectedMember.attends_communion
                              ? "Attends"
                              : "Does Not Attend"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-calendar-alt text-orange-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.member_since || "January 2024"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-users text-yellow-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Emergency Contact
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.emergency_contact || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-phone-alt text-red-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Emergency Phone
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.emergency_phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-notes-medical text-cyan-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Medical Info</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.medical_info || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center">
                          <i className="fas fa-comment text-lime-600"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Notes</p>
                          <p className="font-medium text-gray-900">
                            {selectedMember.notes || "No notes"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-tools text-gray-500 mr-2"></i>
                      Quick Actions
                    </h4>
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <i className="fas fa-edit mr-2"></i>
                        Edit Member
                      </button>
                      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                        <i className="fas fa-phone mr-2"></i>
                        Call Member
                      </button>
                      <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                        <i className="fas fa-envelope mr-2"></i>
                        Send SMS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
