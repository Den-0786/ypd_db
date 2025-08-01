"use client";
import { useState, useEffect } from "react";
import LocalDashboardLayout from "../../components/LocalDashboardLayout";

export default function LocalMembersPage() {
  const [mounted, setMounted] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock data for statistics
  const stats = {
    totalMembers: 1247,
    totalMale: 678,
    totalFemale: 569,
    communicant: 892,
    confirmed: 756,
    baptism: 634,
  };

  // Mock data for executives
  const executives = [
    {
      id: 1,
      name: "John Doe",
      phone: "+233 24 123 4567",
      position: "President",
      communicant: "Yes",
      email: "john.doe@example.com",
      hometown: "Accra",
      residentialAddress: "123 Main Street, Accra",
      residence: "Accra",
      confirmant: "Yes",
      baptism: "Yes",
      gender: "Male",
      status: "Active",
      dateOfBirth: "1990-05-15",
      phoneNumber: "+233 24 123 4567",
      emailAddress: "john.doe@example.com",
      emergencyContact: "Jane Doe",
      emergencyPhone: "+233 24 987 6543",
      occupation: "Software Engineer",
      education: "Bachelor's Degree",
      maritalStatus: "Married",
      spouseName: "Jane Doe",
      children: "2",
      dateJoined: "2020-01-15",
      previousChurch: "None",
      skills: "Leadership, Public Speaking",
      interests: "Music, Reading",
      notes: "Dedicated member with strong leadership skills",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+233 20 987 6543",
      position: "Vice President",
      communicant: "Yes",
      email: "jane.smith@example.com",
      hometown: "Kumasi",
      residentialAddress: "456 Oak Avenue, Kumasi",
      residence: "Kumasi",
      confirmant: "Yes",
      baptism: "Yes",
      gender: "Female",
      status: "Active",
      dateOfBirth: "1988-12-03",
      phoneNumber: "+233 20 987 6543",
      emailAddress: "jane.smith@example.com",
      emergencyContact: "John Smith",
      emergencyPhone: "+233 20 123 4567",
      occupation: "Teacher",
      education: "Master's Degree",
      maritalStatus: "Married",
      spouseName: "John Smith",
      children: "1",
      dateJoined: "2019-06-20",
      previousChurch: "Methodist Church",
      skills: "Teaching, Counseling",
      interests: "Cooking, Traveling",
      notes: "Excellent teacher and mentor",
    },
    {
      id: 3,
      name: "Michael Johnson",
      phone: "+233 26 555 1234",
      position: "Secretary",
      communicant: "No",
      email: "michael.johnson@example.com",
      hometown: "Tamale",
      residentialAddress: "789 Pine Street, Tamale",
      residence: "Tamale",
      confirmant: "No",
      baptism: "No",
      gender: "Male",
      status: "Active",
      dateOfBirth: "1995-08-22",
      phoneNumber: "+233 26 555 1234",
      emailAddress: "michael.johnson@example.com",
      emergencyContact: "Sarah Johnson",
      emergencyPhone: "+233 26 444 5678",
      occupation: "Accountant",
      education: "Bachelor's Degree",
      maritalStatus: "Single",
      spouseName: "",
      children: "0",
      dateJoined: "2021-03-10",
      previousChurch: "Presbyterian Church",
      skills: "Accounting, Organization",
      interests: "Sports, Photography",
      notes: "New member showing great potential",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      phone: "+233 27 777 8888",
      position: "Treasurer",
      communicant: "Yes",
      email: "sarah.wilson@example.com",
      hometown: "Cape Coast",
      residentialAddress: "321 Beach Road, Cape Coast",
      residence: "Cape Coast",
      confirmant: "Yes",
      baptism: "Yes",
      gender: "Female",
      status: "Active",
      dateOfBirth: "1985-03-10",
      phoneNumber: "+233 27 777 8888",
      emailAddress: "sarah.wilson@example.com",
      emergencyContact: "David Wilson",
      emergencyPhone: "+233 27 666 9999",
      occupation: "Banker",
      education: "Bachelor's Degree",
      maritalStatus: "Married",
      spouseName: "David Wilson",
      children: "3",
      dateJoined: "2018-09-15",
      previousChurch: "Anglican Church",
      skills: "Financial Management, Planning",
      interests: "Reading, Gardening",
      notes: "Excellent financial management skills",
    },
  ];

  // Mock data for members
  const members = [
    {
      id: 1,
      name: "David Brown",
      phone: "+233 24 111 2222",
      communicant: "Yes",
      email: "david.brown@example.com",
      hometown: "Accra",
      residentialAddress: "123 Church Street, Accra",
      residence: "Accra",
      confirmant: "Yes",
      baptism: "Yes",
      gender: "Male",
      status: "Active",
      dateOfBirth: "1992-07-15",
      phoneNumber: "+233 24 111 2222",
      emailAddress: "david.brown@example.com",
      emergencyContact: "Mary Brown",
      emergencyPhone: "+233 24 333 4444",
      occupation: "Engineer",
      education: "Bachelor's Degree",
      maritalStatus: "Married",
      spouseName: "Mary Brown",
      children: "1",
      dateJoined: "2020-03-15",
      previousChurch: "None",
      skills: "Technical Skills, Problem Solving",
      interests: "Technology, Music",
      notes: "Active member with technical expertise",
    },
    {
      id: 2,
      name: "Emily Davis",
      phone: "+233 20 555 6666",
      communicant: "No",
      email: "emily.davis@example.com",
      hometown: "Kumasi",
      residentialAddress: "456 Faith Avenue, Kumasi",
      residence: "Kumasi",
      confirmant: "No",
      baptism: "No",
      gender: "Female",
      status: "Active",
      dateOfBirth: "1998-11-20",
      phoneNumber: "+233 20 555 6666",
      emailAddress: "emily.davis@example.com",
      emergencyContact: "Robert Davis",
      emergencyPhone: "+233 20 777 8888",
      occupation: "Student",
      education: "High School",
      maritalStatus: "Single",
      spouseName: "",
      children: "0",
      dateJoined: "2022-01-10",
      previousChurch: "None",
      skills: "Learning, Adaptability",
      interests: "Reading, Art",
      notes: "Young member eager to learn",
    },
    {
      id: 3,
      name: "Robert Wilson",
      phone: "+233 26 999 0000",
      communicant: "Yes",
      email: "robert.wilson@example.com",
      hometown: "Tamale",
      residentialAddress: "789 Hope Street, Tamale",
      residence: "Tamale",
      confirmant: "Yes",
      baptism: "Yes",
      gender: "Male",
      status: "Active",
      dateOfBirth: "1987-04-12",
      phoneNumber: "+233 26 999 0000",
      emailAddress: "robert.wilson@example.com",
      emergencyContact: "Lisa Wilson",
      emergencyPhone: "+233 26 111 2222",
      occupation: "Doctor",
      education: "Medical Degree",
      maritalStatus: "Married",
      spouseName: "Lisa Wilson",
      children: "2",
      dateJoined: "2019-08-25",
      previousChurch: "Catholic Church",
      skills: "Medical, Communication",
      interests: "Healthcare, Travel",
      notes: "Dedicated medical professional",
    },
    {
      id: 4,
      name: "Lisa Anderson",
      phone: "+233 27 333 4444",
      communicant: "Yes",
      email: "lisa.anderson@example.com",
      hometown: "Cape Coast",
      residentialAddress: "321 Grace Road, Cape Coast",
      residence: "Cape Coast",
      confirmant: "Yes",
      baptism: "Yes",
      gender: "Female",
      status: "Active",
      dateOfBirth: "1990-09-08",
      phoneNumber: "+233 27 333 4444",
      emailAddress: "lisa.anderson@example.com",
      emergencyContact: "Robert Anderson",
      emergencyPhone: "+233 27 555 6666",
      occupation: "Nurse",
      education: "Nursing Degree",
      maritalStatus: "Married",
      spouseName: "Robert Anderson",
      children: "1",
      dateJoined: "2021-05-12",
      previousChurch: "Methodist Church",
      skills: "Nursing, Care",
      interests: "Healthcare, Cooking",
      notes: "Compassionate healthcare worker",
    },
    {
      id: 5,
      name: "James Taylor",
      phone: "+233 24 777 8888",
      communicant: "No",
      email: "james.taylor@example.com",
      hometown: "Accra",
      residentialAddress: "654 Peace Street, Accra",
      residence: "Accra",
      confirmant: "No",
      baptism: "No",
      gender: "Male",
      status: "Active",
      dateOfBirth: "1995-12-25",
      phoneNumber: "+233 24 777 8888",
      emailAddress: "james.taylor@example.com",
      emergencyContact: "Sarah Taylor",
      emergencyPhone: "+233 24 999 0000",
      occupation: "Teacher",
      education: "Education Degree",
      maritalStatus: "Single",
      spouseName: "",
      children: "0",
      dateJoined: "2022-03-20",
      previousChurch: "None",
      skills: "Teaching, Communication",
      interests: "Education, Sports",
      notes: "New member with teaching background",
    },
  ];

  const [selectedMember, setSelectedMember] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 15;

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  const handleEditMember = (member) => {
    // Handle edit functionality
    console.log("Edit member:", member);
  };

  const handleDeleteMember = (member) => {
    if (confirm(`Are you sure you want to delete ${member.name}?`)) {
      // Handle delete functionality
      console.log("Delete member:", member);
    }
  };

  // Handle checkbox selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedMembers(executives.map((member) => member.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers((prev) => {
      if (prev.includes(memberId)) {
        return prev.filter((id) => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleDeleteSelected = () => {
    if (selectedMembers.length === 0) return;

    const selectedNames = executives
      .filter((member) => selectedMembers.includes(member.id))
      .map((member) => member.name)
      .join(", ");

    if (
      confirm(
        `Are you sure you want to delete the selected members: ${selectedNames}?`
      )
    ) {
      // Handle bulk delete functionality
      console.log("Delete selected members:", selectedMembers);
      setSelectedMembers([]);
    }
  };

  // Filter and search executives
  const filteredExecutives = executives.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.gender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender =
      genderFilter === "all" || member.gender.toLowerCase() === genderFilter;
    return matchesSearch && matchesGender;
  });

  // Filter and search members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.gender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender =
      genderFilter === "all" || member.gender.toLowerCase() === genderFilter;
    return matchesSearch && matchesGender;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to get color based on name
  const getInitialsColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Mock congregation data
  const [congregation, setCongregation] = useState({
    name: "Emmanuel Congregation Ahinsan",
    location: "Ahinsan, Kumasi",
    established: "1995",
    pastor: "Rev. John Mensah",
    contact: "+233 24 123 4567",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    established: "",
    pastor: "",
    contact: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditClick = () => {
    setEditForm(congregation);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setCongregation(editForm);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <LocalDashboardLayout
      currentPage="Members"
      selectedMembers={selectedMembers}
      onDeleteSelected={handleDeleteSelected}
    >
      <div className="space-y-6">
        {/* Congregation Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl shadow-xl overflow-hidden relative">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center mb-2">
                  <i className="fas fa-church text-white text-2xl lg:text-3xl mr-3"></i>
                  <h1 className="text-xl lg:text-3xl font-bold text-white">
                    {congregation.name}
                  </h1>
                  <button
                    onClick={handleEditClick}
                    className="ml-3 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                    title="Edit congregation information"
                  >
                    <i className="fas fa-edit text-white text-sm"></i>
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 text-white/90 text-sm lg:text-base">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>{congregation.location}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span>Est. {congregation.established}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-user-tie mr-2"></i>
                    <span>{congregation.pastor}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    <span>{congregation.contact}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-white text-xs opacity-90">Local</div>
                  <div className="text-white font-semibold">Dashboard</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-white text-xs opacity-90">Status</div>
                  <div className="text-green-300 font-semibold">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="flex gap-4 min-w-max">
            {/* Total Members */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6 min-w-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    Total Members
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalMembers}
                  </p>
                </div>
                <div className="ml-3 lg:ml-4">
                  <i className="fas fa-users text-xl lg:text-2xl text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>

            {/* Total Male */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6 min-w-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    Total Male
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalMale}
                  </p>
                </div>
                <div className="ml-3 lg:ml-4">
                  <i className="fas fa-male text-xl lg:text-2xl text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>

            {/* Total Female */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-pink-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6 min-w-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-pink-600/20 dark:from-pink-400/10 dark:to-pink-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    Total Female
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalFemale}
                  </p>
                </div>
                <div className="ml-3 lg:ml-4">
                  <i className="fas fa-female text-xl lg:text-2xl text-pink-600 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>

            {/* Communicant */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6 min-w-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    Communicant
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.communicant}
                  </p>
                </div>
                <div className="ml-3 lg:ml-4">
                  <i className="fas fa-cross text-xl lg:text-2xl text-purple-600 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>

            {/* Confirmed */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6 min-w-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    Confirmed
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.confirmed}
                  </p>
                </div>
                <div className="ml-3 lg:ml-4">
                  <i className="fas fa-hands text-xl lg:text-2xl text-orange-600 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>

            {/* Baptism */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-indigo-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6 min-w-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 dark:from-indigo-400/10 dark:to-indigo-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    Baptism
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.baptism}
                  </p>
                </div>
                <div className="ml-3 lg:ml-4">
                  <i className="fas fa-water text-xl lg:text-2xl text-indigo-600 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Section */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search by name or gender..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter:
              </span>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
                <button
                  onClick={() => setGenderFilter("all")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    genderFilter === "all"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setGenderFilter("male")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    genderFilter === "male"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <i className="fas fa-male mr-1"></i>
                  Male
                </button>
                <button
                  onClick={() => setGenderFilter("female")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    genderFilter === "female"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <i className="fas fa-female mr-1"></i>
                  Female
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Executives Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              <i className="fas fa-users text-blue-500 mr-2"></i>
              Congregation Executives
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedMembers.length === executives.length &&
                          executives.length > 0
                        }
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Name
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Communicant
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredExecutives.length > 0 ? (
                  filteredExecutives.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => handleSelectMember(member.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                          />
                          <div
                            className={`flex-shrink-0 h-10 w-10 rounded-full ${getInitialsColor(member.name)} flex items-center justify-center mr-3`}
                          >
                            <span className="text-sm font-medium text-white">
                              {getInitials(member.name)}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {member.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {member.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            member.communicant === "Yes"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {member.communicant}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(member)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                          title="View Details"
                        >
                          <i className="fas fa-eye mr-1"></i>View
                        </button>
                        <button
                          onClick={() => handleEditMember(member)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3"
                          title="Edit Member"
                        >
                          <i className="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Member"
                        >
                          <i className="fas fa-trash mr-1"></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No results found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          No executives match your search criteria. Try
                          adjusting your search terms or filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              <i className="fas fa-users text-green-500 mr-2"></i>
              Congregation Members
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedMembers.length === filteredMembers.length &&
                          filteredMembers.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers(
                              filteredMembers.map((member) => member.id)
                            );
                          } else {
                            setSelectedMembers([]);
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Name
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Communicant
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentMembers.length > 0 ? (
                  currentMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => handleSelectMember(member.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                          />
                          <div
                            className={`flex-shrink-0 h-10 w-10 rounded-full ${getInitialsColor(member.name)} flex items-center justify-center mr-3`}
                          >
                            <span className="text-sm font-medium text-white">
                              {getInitials(member.name)}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {member.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            member.communicant === "Yes"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {member.communicant}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(member)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                          title="View Details"
                        >
                          <i className="fas fa-eye mr-1"></i>View
                        </button>
                        <button
                          onClick={() => handleEditMember(member)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3"
                          title="Edit Member"
                        >
                          <i className="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Member"
                        >
                          <i className="fas fa-trash mr-1"></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No results found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          No members match your search criteria. Try adjusting
                          your search terms or filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {filteredMembers.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredMembers.length)} of{" "}
                {filteredMembers.length} members
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentPage === 1
                      ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <i className="fas fa-chevron-left mr-1"></i>
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentPage === totalPages
                      ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Next
                  <i className="fas fa-chevron-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Member Details Modal */}
        {showDetailsModal && selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Member Details - {selectedMember.name}
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
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
                                {selectedMember.name.split(" ")[0]}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Last Name:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.name
                                  .split(" ")
                                  .slice(1)
                                  .join(" ")}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Date of Birth:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.dateOfBirth}
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
                                {selectedMember.phoneNumber}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Email Address:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.emailAddress}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Relative Contact:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.emergencyContact}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Relative Phone:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.emergencyPhone}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address & Professional Information */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-4 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Address Information */}
                      <div>
                        <div className="flex items-center mb-3 sm:mb-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                            <i className="fas fa-map-marker-alt text-purple-600 dark:text-purple-400 text-sm sm:text-base"></i>
                          </div>
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                            Address Information
                          </h4>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Hometown:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.hometown}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Place of Residence:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.residence}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Residential Address:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.residentialAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Professional Information */}
                      <div>
                        <div className="flex items-center mb-3 sm:mb-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                            <i className="fas fa-briefcase text-orange-600 dark:text-orange-400 text-sm sm:text-base"></i>
                          </div>
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                            Professional Information
                          </h4>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Profession:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.occupation}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Education:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.education}
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
                                Emmanuel Congregation Ahinsan
                              </p>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                              <label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Position:
                              </label>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {selectedMember.position}
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
                                  selectedMember.status === "Active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {selectedMember.status}
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
                                Confirmation:
                              </label>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  selectedMember.confirmant === "Yes"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {selectedMember.confirmant}
                              </span>
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
                        onClick={() => handleEditMember(selectedMember)}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:flex-1"
                      >
                        <i className="fas fa-edit mr-2"></i>
                        Edit Member
                      </button>

                      <button
                        onClick={() =>
                          window.open(
                            `tel:${selectedMember.phoneNumber}`,
                            "_blank"
                          )
                        }
                        className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:flex-1"
                      >
                        <i className="fas fa-phone mr-2"></i>
                        Call Member
                      </button>

                      <button
                        onClick={() =>
                          window.open(
                            `sms:${selectedMember.phoneNumber}`,
                            "_blank"
                          )
                        }
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

        {/* Edit Congregation Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Congregation Information
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Congregation Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Established Year
                  </label>
                  <input
                    type="text"
                    value={editForm.established}
                    onChange={(e) =>
                      setEditForm({ ...editForm, established: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pastor
                  </label>
                  <input
                    type="text"
                    value={editForm.pastor}
                    onChange={(e) =>
                      setEditForm({ ...editForm, pastor: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={editForm.contact}
                    onChange={(e) =>
                      setEditForm({ ...editForm, contact: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LocalDashboardLayout>
  );
}
