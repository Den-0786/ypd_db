"use client";

import { useState } from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import ChurchInfoSection from "./ChurchInfoSection";

export default function BulkAddForm({
  isBulkMode,
  onAddMember,
  onSubmitSingle,
}) {
  const [currentSection, setCurrentSection] = useState("personal");
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
    local_executive_position: "",
    district_executive_position: "",
    congregation: "",
    confirmation: "",
    baptism: "",
    communicant: "",
  });

  const resetForm = () => {
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
      local_executive_position: "",
      district_executive_position: "",
      congregation: "",
      confirmation: "",
      baptism: "",
      communicant: "",
    });
    setCurrentSection("personal");
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
      onSubmitSingle(
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
      onSubmitSingle(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
        "error"
      );
      return;
    }

    if (isBulkMode) {
      onAddMember(currentMember);
      resetForm();
    } else {
      handleSubmitSingle();
    }
  };

  const handleSubmitSingle = async () => {
    try {
      const response = await fetch("/api/members/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(currentMember),
      });

      if (response.ok) {
        const result = await response.json();
        onSubmitSingle("Single member added successfully!", "success");
        resetForm();
      } else {
        const errorData = await response.json();
        onSubmitSingle(errorData.message || "Error adding member", "error");
      }
    } catch (error) {
      onSubmitSingle("Error adding member. Please try again.", "error");
    }
  };

  // Function to get CSRF token from cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  };

  return (
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
        <PersonalInfoSection
          currentMember={currentMember}
          setCurrentMember={setCurrentMember}
          onNext={handleNextSection}
        />
      )}

      {/* Section B: Church Information */}
      {currentSection === "church" && (
        <ChurchInfoSection
          currentMember={currentMember}
          setCurrentMember={setCurrentMember}
          onPrev={handlePrevSection}
          onAddToList={handleAddToList}
          isBulkMode={isBulkMode}
        />
      )}
    </div>
  );
}
