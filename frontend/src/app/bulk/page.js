"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import PersonalInfoSection from "./components/PersonalInfoSection";
import ChurchInfoSection from "./components/ChurchInfoSection";
import MemberList from "./components/MemberList";
import ModeToggle from "./components/ModeToggle";
import ToastNotification from "./components/ToastNotification";

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
      <ToastNotification toast={toast} />

      <div className="space-y-6">
        {/* Page Header */}
        <div className="neumorphic-light dark:neumorphic-dark p-6">
          <div>
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text flex items-center">
              <i className="fas fa-users text-light-accent dark:text-dark-accent mr-3"></i>
              <span className="whitespace-nowrap">
                {isBulkMode
                  ? "Bulk Member Registration"
                  : "Single Member Registration"}
              </span>
            </h1>
            <div className="flex justify-between items-center mt-2">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {isBulkMode
                  ? "Add multiple members to the system at once"
                  : "Add a single member to the system"}
              </p>
              <ModeToggle
                isBulkMode={isBulkMode}
                setIsBulkMode={setIsBulkMode}
              />
            </div>
          </div>
        </div>

        {/* Form Sections */}
        {currentSection === "personal" && (
          <PersonalInfoSection
            currentMember={currentMember}
            setCurrentMember={setCurrentMember}
            onNext={handleNextSection}
          />
        )}

        {currentSection === "church" && (
          <ChurchInfoSection
            currentMember={currentMember}
            setCurrentMember={setCurrentMember}
            onPrev={handlePrevSection}
            onAddToList={handleAddToList}
            isBulkMode={isBulkMode}
          />
        )}

        {/* Members List */}
        {isBulkMode && members.length > 0 && (
          <MemberList
            members={members}
            onRemoveMember={handleRemoveMember}
            onSubmitBulk={handleSubmit}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
