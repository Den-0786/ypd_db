"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Fragment } from "react";

export default function BulkRegistrationPage() {
  const [selectedCongregation, setSelectedCongregation] = useState("");
  const [members, setMembers] = useState([]);
  const [currentSection, setCurrentSection] = useState("personal");
  const [isBulkMode, setIsBulkMode] = useState(true); // true for bulk, false for single
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [currentMember, setCurrentMember] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    email: "",
    date_of_birth: "",
    place_of_residence: "",
    residential_address: "",
    profession: "",
    hometown: "",
    relative_contact: "",
    membership_status: "Active",
    position: "",
    is_executive: false,
    executive_position: "",
    executive_level: "",
    congregation: "",
    confirmation: "",
    baptism: "",
    communicant: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const handleNextSection = () => {
    const personalFields = [
      "first_name",
      "last_name",
      "phone_number",
      "gender",
      "place_of_residence",
      "hometown",
      "relative_contact",
    ];
    const missingFields = personalFields.filter(
      (field) => !currentMember[field]
    );

    if (missingFields.length > 0) {
      showToast(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
        "error"
      );
      return;
    }

    setCurrentSection("church");
  };

  const handlePrevSection = () => {
    setCurrentSection("personal");
  };

  const handleAddToList = () => {
    const churchFields = [
      "congregation",
      "confirmation",
      "baptism",
      "communicant",
    ];
    const missingFields = churchFields.filter((field) => !currentMember[field]);

    if (missingFields.length > 0) {
      showToast(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
        "error"
      );
      return;
    }

    if (isBulkMode) {
      // Add to list for bulk submission
      setMembers([...members, { ...currentMember, id: Date.now() }]);
      setCurrentMember({
        first_name: "",
        last_name: "",
        phone_number: "",
        gender: "",
        email: "",
        date_of_birth: "",
        place_of_residence: "",
        residential_address: "",
        profession: "",
        hometown: "",
        relative_contact: "",
        membership_status: "Active",
        position: "",
        is_executive: false,
        executive_position: "",
        executive_level: "",
        congregation: "",
        confirmation: "",
        baptism: "",
        communicant: "",
      });
      setCurrentSection("personal");
      showToast("Member added to list successfully!", "success");
    } else {
      // Submit single member immediately
      handleSubmitSingle();
    }
  };

  const handleSubmitSingle = async () => {
    try {
      // TODO: Submit single member to Django API
      console.log("Submitting single member:", currentMember);
      showToast("Single member added successfully!", "success");
      setCurrentMember({
        first_name: "",
        last_name: "",
        phone_number: "",
        gender: "",
        email: "",
        date_of_birth: "",
        place_of_residence: "",
        residential_address: "",
        profession: "",
        hometown: "",
        relative_contact: "",
        membership_status: "Active",
        position: "",
        is_executive: false,
        executive_position: "",
        executive_level: "",
        congregation: "",
        confirmation: "",
        baptism: "",
        communicant: "",
      });
      setCurrentSection("personal");
    } catch (error) {
      console.error("Error submitting single member:", error);
      showToast("Error adding member. Please try again.", "error");
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  // Function to convert executive position value to display name
  const getExecutivePositionDisplay = (position) => {
    const positionMap = {
      president: "President",
      presidents_rep: "President's Rep",
      vice_president: "Vice President",
      secretary: "Secretary",
      assistant_secretary: "Assistant Secretary",
      financial_secretary: "Financial Secretary",
      treasurer: "Treasurer",
      organizer: "Organizer",
      youth_leader: "Youth Leader",
      choir_master: "Choir Master",
      usher: "Usher",
      protocol: "Protocol",
      security: "Security",
      maintenance: "Maintenance",
      welfare: "Welfare",
      education: "Education",
      evangelism: "Evangelism",
      children_ministry: "Children Ministry",
      women_fellowship: "Women Fellowship",
      men_fellowship: "Men Fellowship",
    };
    return positionMap[position] || position;
  };

  const handleSubmit = async () => {
    if (members.length === 0) {
      showToast("Please add at least one member before submitting", "error");
      return;
    }

    try {
      // TODO: Submit to Django API
      console.log("Submitting members:", members);
      showToast("Members submitted successfully!", "success");
      setMembers([]);
    } catch (error) {
      console.error("Error submitting members:", error);
      showToast("Error submitting members. Please try again.", "error");
    }
  };

  return (
    <DashboardLayout
      currentPage="Bulk Add"
      headerAction={
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 transition-all duration-200 hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-blue-200 font-medium">Added</span>
              <span className="text-lg font-bold text-blue-500">
                {members.length}
              </span>
              <i className="fas fa-user-plus text-white text-sm"></i>
            </div>
          </div>
        </div>
      }
    >
      {/* Toast Notification */}
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

      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <i className="fas fa-users text-blue-600 mr-3"></i>
              <span className="whitespace-nowrap">
                {isBulkMode
                  ? "Bulk Member Registration"
                  : "Single Member Registration"}
              </span>
            </h1>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600 dark:text-gray-300">
                {isBulkMode
                  ? "Add multiple members to the system at once"
                  : "Add a single member to the system"}
              </p>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setIsBulkMode(false)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                    //sourcery skip: invert-ternary
                    !isBulkMode
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <i className="fas fa-user mr-1"></i>
                  <span>Single</span>
                </button>
                <button
                  onClick={() => setIsBulkMode(true)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                    isBulkMode
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <i className="fas fa-users mr-1"></i>
                  <span>Bulk</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Member Form */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Add New Members
          </h3>

          {/* Section Navigation */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentSection === "personal" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
              >
                <span className="text-sm font-medium">Section A</span>
                <span className="text-xs">Personal Info</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentSection === "church" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
              >
                <span className="text-sm font-medium">Section B</span>
                <span className="text-xs">Church Info</span>
              </div>
            </div>
          </div>

          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <span className="font-medium">Note:</span> Fields marked with{" "}
              <span className="text-red-500 font-bold">*</span> are required and
              must be filled.
            </p>
          </div>

          {/* Section A: Personal Information */}
          {currentSection === "personal" && (
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Section A: Personal Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentMember.first_name}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        first_name: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="First Name"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentMember.last_name}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        last_name: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="Last Name"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    value={currentMember.phone_number}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        phone_number: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="+233XXXXXXXXX"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={currentMember.gender}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        gender: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    required
                  >
                    <option value="" className="text-gray-800 dark:text-white">
                      Select Gender
                    </option>
                    <option
                      value="Male"
                      className="text-gray-800 dark:text-white"
                    >
                      Male
                    </option>
                    <option
                      value="Female"
                      className="text-gray-800 dark:text-white"
                    >
                      Female
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={currentMember.email}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        email: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={currentMember.date_of_birth}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        date_of_birth: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Place of Residence{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentMember.place_of_residence}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        place_of_residence: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="City/Town"
                    required
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profession
                  </label>
                  <input
                    type="text"
                    value={currentMember.profession}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        profession: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="Student, Teacher, etc."
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hometown <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentMember.hometown}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        hometown: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="Hometown"
                    required
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relative Contact{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    value={currentMember.relative_contact}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        relative_contact: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="+233XXXXXXXXX"
                    required
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={currentMember.residential_address}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        residential_address: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="Full residential address"
                  />
                </div>
              </div>

              {/* Navigation Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNextSection}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Section B: Church Information */}
          {currentSection === "church" && (
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Section B: Church Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Congregation{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={currentMember.congregation}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        congregation: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    required
                  >
                    <option value="" className="text-gray-800 dark:text-white">
                      Select Congregation
                    </option>
                    <option
                      value="Emmanuel Congregation Ahinsan"
                      className="text-gray-800 dark:text-white"
                    >
                      Emmanuel Congregation Ahinsan
                    </option>
                    <option
                      value="Peniel Congregation Esreso No1"
                      className="text-gray-800 dark:text-white"
                    >
                      Peniel Congregation Esreso No1
                    </option>
                    <option
                      value="Mizpah Congregation Odagya No1"
                      className="text-gray-800 dark:text-white"
                    >
                      Mizpah Congregation Odagya No1
                    </option>
                    <option
                      value="Christ Congregation Ahinsan Estate"
                      className="text-gray-800 dark:text-white"
                    >
                      Christ Congregation Ahinsan Estate
                    </option>
                    <option
                      value="Ebenezer Congregation Dompoase Aprabo"
                      className="text-gray-800 dark:text-white"
                    >
                      Ebenezer Congregation Dompoase Aprabo
                    </option>
                    <option
                      value="Favour Congregation Esreso No2"
                      className="text-gray-800 dark:text-white"
                    >
                      Favour Congregation Esreso No2
                    </option>
                    <option
                      value="Liberty Congregation Esreso High Tension"
                      className="text-gray-800 dark:text-white"
                    >
                      Liberty Congregation Esreso High Tension
                    </option>
                    <option
                      value="Odagya No2"
                      className="text-gray-800 dark:text-white"
                    >
                      Odagya No2
                    </option>
                    <option
                      value="NOM"
                      className="text-gray-800 dark:text-white"
                    >
                      NOM
                    </option>
                    <option
                      value="Kokobriko"
                      className="text-gray-800 dark:text-white"
                    >
                      Kokobriko
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmation{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={currentMember.confirmation}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        confirmation: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    required
                  >
                    <option value="" className="text-gray-800 dark:text-white">
                      Select Confirmation Status
                    </option>
                    <option
                      value="Yes"
                      className="text-gray-800 dark:text-white"
                    >
                      Yes
                    </option>
                    <option
                      value="No"
                      className="text-gray-800 dark:text-white"
                    >
                      No
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Baptism <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={currentMember.baptism}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        baptism: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    required
                  >
                    <option value="" className="text-gray-800 dark:text-white">
                      Select Baptism Status
                    </option>
                    <option
                      value="Yes"
                      className="text-gray-800 dark:text-white"
                    >
                      Yes
                    </option>
                    <option
                      value="No"
                      className="text-gray-800 dark:text-white"
                    >
                      No
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Communicant{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={currentMember.communicant}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        communicant: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    required
                  >
                    <option value="" className="text-gray-800 dark:text-white">
                      Select Communicant Status
                    </option>
                    <option
                      value="Yes"
                      className="text-gray-800 dark:text-white"
                    >
                      Yes
                    </option>
                    <option
                      value="No"
                      className="text-gray-800 dark:text-white"
                    >
                      No
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Membership Status
                  </label>
                  <select
                    value={currentMember.membership_status}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        membership_status: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                  >
                    <option
                      value="Active"
                      className="text-gray-800 dark:text-white"
                    >
                      Active
                    </option>
                    <option
                      value="Inactive"
                      className="text-gray-800 dark:text-white"
                    >
                      Inactive
                    </option>
                    <option
                      value="Suspended"
                      className="text-gray-800 dark:text-white"
                    >
                      Suspended
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={currentMember.position}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        position: e.target.value,
                      })
                    }
                    className="w-full max-w-xs lg:max-w-none px-2 py-1.5 lg:px-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 text-sm lg:text-base"
                    placeholder="Member, Elder, etc."
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevSection}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-200 flex items-center space-x-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddToList}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  {isBulkMode ? "Add to List" : "Add Member"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Members List */}
        {isBulkMode && members.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Members to Add ({members.length})
              </h3>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200"
              >
                Submit All Members
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Congregation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {member.first_name} {member.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {member.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {member.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {member.congregation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.membership_status === "Active"
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                              : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          }`}
                        >
                          {member.membership_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {member.is_executive ? (
                          <div>
                            <div className="font-medium text-gray-700 dark:text-gray-300">
                              {member.executive_position}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {member.executive_level === "both"
                                ? "Branch & District"
                                : member.executive_level === "district"
                                  ? "District"
                                  : "Branch"}
                            </div>
                          </div>
                        ) : (
                          member.position
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
