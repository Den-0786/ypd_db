"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Fragment } from "react";

export default function BulkRegistrationPage() {
  const [selectedCongregation, setSelectedCongregation] = useState("");
  const [members, setMembers] = useState([]);
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
    executive_level: "", // 'branch', 'district', or 'both'
  });
  const [showListModal, setShowListModal] = useState(false);

  const handleAddMember = () => {
    // Check all required fields
    const requiredFields = [
      "first_name",
      "last_name",
      "phone_number",
      "gender",
      "place_of_residence",
      "hometown",
      "relative_contact",
      "membership_status",
    ];

    // If executive, also check executive fields
    if (currentMember.is_executive) {
      requiredFields.push("executive_position", "executive_level");
    }

    const missingFields = requiredFields.filter(
      (field) => !currentMember[field]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

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
    });
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
      evangelism_coordinator: "Evangelism Coordinator",
    };
    return positionMap[position] || position;
  };

  const handleSubmit = async () => {
    if (members.length === 0) {
      alert("Please add at least one member");
      return;
    }

    if (!selectedCongregation) {
      alert("Please select a congregation");
      return;
    }

    // TODO: Submit to Django API
    console.log("Submitting bulk members:", {
      congregation: selectedCongregation,
      members,
    });
    alert(`${members.length} members added successfully!`);
    setMembers([]);
    setSelectedCongregation("");
  };

  return (
    <DashboardLayout
      currentPage="Bulk Add"
      headerAction={
        <button
          className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow transition relative"
          onClick={() => setShowListModal(true)}
          aria-label="Show added members list"
        >
          <i className="fas fa-list"></i>
          <span>Added: </span>
          <span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-7 h-7 text-base font-bold ml-1">
            {members.length}
          </span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900">
            <i className="fas fa-users text-blue-600 mr-3"></i>
            Bulk Member Registration
          </h1>
          <p className="text-gray-600 mt-2">
            Add multiple members to the system at once
          </p>
        </div>

        {/* Congregation Selection */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Select Congregation
          </h3>
          <select
            value={selectedCongregation}
            onChange={(e) => setSelectedCongregation(e.target.value)}
            className="w-full sm:w-1/2 lg:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="" className="text-gray-800">
              Choose Congregation
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

        {/* Add Member Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Add New Member
          </h3>

          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Note:</span> Fields marked with{" "}
              <span className="text-red-500 font-bold">*</span> are required and
              must be filled.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500 font-bold">*</span>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="+233XXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                value={currentMember.gender}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, gender: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                <option value="" className="text-gray-800">
                  Select Gender
                </option>
                <option value="Male" className="text-gray-800">
                  Male
                </option>
                <option value="Female" className="text-gray-800">
                  Female
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={currentMember.email}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="City/Town"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Student, Teacher, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Hometown"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relative Contact{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                value={currentMember.relative_contact}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    relative_contact: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Emergency contact"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membership Status{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                value={currentMember.membership_status}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    membership_status: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                <option value="Active" className="text-gray-800">
                  Active
                </option>
                <option value="Distant" className="text-gray-800">
                  Distant
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Member position"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentMember.is_executive}
                  onChange={(e) => {
                    const isExecutive = e.target.checked;
                    setCurrentMember({
                      ...currentMember,
                      is_executive: isExecutive,
                      // Clear executive fields if unchecking
                      executive_level: isExecutive
                        ? currentMember.executive_level
                        : "",
                      executive_position: isExecutive
                        ? currentMember.executive_position
                        : "",
                      position: isExecutive ? currentMember.position : "",
                    });
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Is Executive</span>
              </label>
            </div>

            {currentMember.is_executive && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Executive Level{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={currentMember.executive_level}
                    onChange={(e) => {
                      setCurrentMember({
                        ...currentMember,
                        executive_level: e.target.value,
                        executive_position: "", // Reset position when level changes
                        position: "", // Also clear the regular position field
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                  >
                    <option value="" className="text-gray-800">
                      Select Level
                    </option>
                    <option value="branch" className="text-gray-800">
                      Branch Only
                    </option>
                    <option value="district" className="text-gray-800">
                      District Only
                    </option>
                    <option value="both" className="text-gray-800">
                      Both Branch & District
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Executive Position{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    value={currentMember.executive_position}
                    onChange={(e) => {
                      const selectedPosition = e.target.value;
                      setCurrentMember({
                        ...currentMember,
                        executive_position: selectedPosition,
                        position: selectedPosition
                          ? getExecutivePositionDisplay(selectedPosition)
                          : "",
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                    disabled={!currentMember.executive_level}
                  >
                    <option value="" className="text-gray-800">
                      Select Position
                    </option>
                    {currentMember.executive_level === "branch" && (
                      <>
                        <option value="president" className="text-gray-800">
                          President
                        </option>
                        <option
                          value="vice_president"
                          className="text-gray-800"
                        >
                          Vice President
                        </option>
                        <option value="secretary" className="text-gray-800">
                          Secretary
                        </option>
                        <option
                          value="assistant_secretary"
                          className="text-gray-800"
                        >
                          Assistant Secretary
                        </option>
                        <option
                          value="financial_secretary"
                          className="text-gray-800"
                        >
                          Financial Secretary
                        </option>
                        <option value="treasurer" className="text-gray-800">
                          Treasurer
                        </option>
                        <option value="organizer" className="text-gray-800">
                          Organizer
                        </option>
                        <option
                          value="evangelism_coordinator"
                          className="text-gray-800"
                        >
                          Evangelism Coordinator
                        </option>
                      </>
                    )}
                    {currentMember.executive_level === "district" && (
                      <>
                        <option value="president" className="text-gray-800">
                          President
                        </option>
                        <option
                          value="presidents_rep"
                          className="text-gray-800"
                        >
                          President's Rep
                        </option>
                        <option value="secretary" className="text-gray-800">
                          Secretary
                        </option>
                        <option
                          value="assistant_secretary"
                          className="text-gray-800"
                        >
                          Assistant Secretary
                        </option>
                        <option
                          value="financial_secretary"
                          className="text-gray-800"
                        >
                          Financial Secretary
                        </option>
                        <option value="treasurer" className="text-gray-800">
                          Treasurer
                        </option>
                        <option value="organizer" className="text-gray-800">
                          Organizer
                        </option>
                        <option
                          value="evangelism_coordinator"
                          className="text-gray-800"
                        >
                          Evangelism Coordinator
                        </option>
                      </>
                    )}
                    {currentMember.executive_level === "both" && (
                      <>
                        <option value="president" className="text-gray-800">
                          President
                        </option>
                        <option
                          value="presidents_rep"
                          className="text-gray-800"
                        >
                          President's Rep
                        </option>
                        <option
                          value="vice_president"
                          className="text-gray-800"
                        >
                          Vice President
                        </option>
                        <option value="secretary" className="text-gray-800">
                          Secretary
                        </option>
                        <option
                          value="assistant_secretary"
                          className="text-gray-800"
                        >
                          Assistant Secretary
                        </option>
                        <option
                          value="financial_secretary"
                          className="text-gray-800"
                        >
                          Financial Secretary
                        </option>
                        <option value="treasurer" className="text-gray-800">
                          Treasurer
                        </option>
                        <option value="organizer" className="text-gray-800">
                          Organizer
                        </option>
                        <option
                          value="evangelism_coordinator"
                          className="text-gray-800"
                        >
                          Evangelism Coordinator
                        </option>
                      </>
                    )}
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddMember}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              <i className="fas fa-plus mr-2"></i>
              Add to List
            </button>
          </div>
        </div>

        {/* Members List */}
        {members.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Members to Add ({members.length})
              </h3>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200"
              >
                <i className="fas fa-save mr-2"></i>
                Save All Members
              </button>
            </div>

            <div className="overflow-x-auto w-full">
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.first_name} {member.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.membership_status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {member.membership_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.is_executive ? (
                          <div>
                            <div className="font-medium text-gray-700">
                              {member.executive_position}
                            </div>
                            <div className="text-xs text-gray-600">
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
                          className="text-red-600 hover:text-red-900"
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
      {/* Added Members List Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowListModal(false)}
              aria-label="Close list modal"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-list text-blue-500 mr-2"></i>
              Added Members List
            </h2>
            {members.length === 0 ? (
              <div className="text-gray-500 text-center py-12">
                <i className="fas fa-user-friends text-4xl mb-2"></i>
                <div>No members have been added yet.</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {member.first_name} {member.last_name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {member.phone_number}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {member.gender}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {member.membership_status}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {member.is_executive
                            ? member.executive_position
                            : member.position || "Member"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
