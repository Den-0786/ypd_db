"use client";
import Link from "next/link";
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function DashboardPage() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizPassword, setQuizPassword] = useState("youth2024");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    startTime: "",
    endTime: "",
  });
  const [quizSubmissions, setQuizSubmissions] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const generateRandomPassword = () => {
    const numbers = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const allChars = numbers + letters + specialChars;

    let password = "";
    // Ensure at least one of each type
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += letters[Math.floor(Math.random() * letters.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest randomly
    for (let i = 3; i < 8; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setQuizPassword(password);
    showToast("New password generated successfully!", "success");
  };

  const handleCreateQuiz = () => {
    if (
      !newQuestion.question ||
      !newQuestion.optionA ||
      !newQuestion.optionB ||
      !newQuestion.optionC ||
      !newQuestion.optionD ||
      !newQuestion.correctAnswer ||
      !newQuestion.startTime ||
      !newQuestion.endTime
    ) {
      showToast("Please fill in all fields", "error");
      return;
    }

    const quiz = {
      id: Date.now(),
      ...newQuestion,
      status: "active",
      submissions: [],
      createdAt: new Date().toISOString(),
    };

    setActiveQuiz(quiz);
    setNewQuestion({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
      startTime: "",
      endTime: "",
    });
    setShowQuizModal(false);
    showToast("Quiz created successfully!", "success");
  };

  const handleEndQuiz = () => {
    if (activeQuiz) {
      setActiveQuiz({ ...activeQuiz, status: "ended" });
      showToast("Quiz ended successfully!", "success");
    }
  };

  const handleDeleteQuiz = () => {
    setActiveQuiz(null);
    setQuizSubmissions([]);
    showToast("Quiz deleted successfully!", "success");
  };

  const handlePasswordSubmit = (password) => {
    if (password === quizPassword) {
      setShowPasswordModal(false);
      setShowQuizModal(true);
    } else {
      showToast("Incorrect password!", "error");
    }
  };

  const handleQuizSubmission = (submission) => {
    // Check if phone number already exists
    const existingSubmission = quizSubmissions.find(
      (sub) => sub.phoneNumber === submission.phoneNumber
    );

    if (existingSubmission) {
      showToast("You have already submitted an answer!", "error");
      return;
    }

    const isNameInDatabase = Math.random() > 0.3; 

    if (!isNameInDatabase) {
      showToast("Name not found in database. Submission rejected.", "error");
      return;
    }

    const newSubmission = {
      id: Date.now(),
      ...submission,
      submittedAt: new Date().toISOString(),
      isCorrect: submission.selectedAnswer === activeQuiz.correctAnswer,
    };

    setQuizSubmissions([...quizSubmissions, newSubmission]);
    showToast(
      "Quiz answer submitted successfully! List of winners will be posted here. Stay tuned. Thank you.",
      "success"
    );
  };

  const getWinners = () => {
    return quizSubmissions.filter((sub) => sub.isCorrect);
  };

  const getTotalParticipants = () => {
    return quizSubmissions.length;
  };

  return (
    <DashboardLayout currentPage="Dashboard">
     
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
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              <i className="fas fa-question-circle text-blue-600 mr-3"></i>
              Quiz Management
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>
                Create Quiz
              </button>
              {activeQuiz && activeQuiz.status === "active" && (
                <button
                  onClick={handleEndQuiz}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center"
                >
                  <i className="fas fa-stop mr-2"></i>
                  End Quiz
                </button>
              )}
              {activeQuiz && (
                <button
                  onClick={handleDeleteQuiz}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Delete Quiz
                </button>
              )}
            </div>
          </div>

          {/* Active Quiz Display */}
          {activeQuiz && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Current Quiz
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Question:</strong> {activeQuiz.question}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <strong>A:</strong> {activeQuiz.optionA}
                    </div>
                    <div>
                      <strong>B:</strong> {activeQuiz.optionB}
                    </div>
                    <div>
                      <strong>C:</strong> {activeQuiz.optionC}
                    </div>
                    <div>
                      <strong>D:</strong> {activeQuiz.optionD}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activeQuiz.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {activeQuiz.status === "active" ? "Active" : "Ended"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Start Time:</strong>{" "}
                  {new Date(activeQuiz.startTime).toLocaleString()}
                </div>
                <div>
                  <strong>End Time:</strong>{" "}
                  {new Date(activeQuiz.endTime).toLocaleString()}
                </div>
                <div>
                  <strong>Submissions:</strong> {quizSubmissions.length}
                </div>
              </div>
            </div>
          )}

          {/* Quiz Statistics */}
          {activeQuiz && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="fas fa-users text-blue-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Total Participants
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {getTotalParticipants()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="fas fa-trophy text-green-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Winners
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {getWinners().length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="fas fa-percentage text-purple-600 text-2xl mr-3"></i>
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {getTotalParticipants() > 0
                        ? Math.round(
                            (getWinners().length / getTotalParticipants()) * 100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Submissions Table */}
          {activeQuiz && quizSubmissions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quiz Submissions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Congregation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Answer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Result
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {quizSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {submission.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {submission.congregation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {submission.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {submission.selectedAnswer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              submission.isCorrect
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {submission.isCorrect ? "Correct" : "Incorrect"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(submission.submittedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Password Management */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            <i className="fas fa-key text-blue-600 mr-2"></i>
            Quiz Password Management
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Quiz Password
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={quizPassword}
                  onChange={(e) => setQuizPassword(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                  placeholder="Enter quiz password"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(quizPassword);
                    showToast("Password copied to clipboard!", "success");
                  }}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
                  title="Copy password"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            </div>
            <button
              onClick={generateRandomPassword}
              className="bg-purple-600 hover:bg-purple-700 mt-6 text-white px-3 py-2 rounded-md font-medium transition-colors duration-200 flex items-center"
            >
              <i className="fas fa-sync-alt mr-2"></i>
              G N P
            </button>
          </div>
        </div>

        {/* Original Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Statistics Cards */}
          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  Total Members
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  1,247
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-users text-xl lg:text-2xl text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  Active Congregations
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  12
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-church text-xl lg:text-2xl text-green-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  This Week&apos;s Attendance
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  892
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-calendar-check text-xl lg:text-2xl text-purple-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  New Members This Month
                </p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  23
                </p>
              </div>
              <div className="ml-3 lg:ml-4">
                <i className="fas fa-user-plus text-xl lg:text-2xl text-orange-600 group-hover:scale-110 transition-transform duration-200"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            <i className="fas fa-bolt text-blue-600 mr-2"></i>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:space-y-3">
            <div className="bg-blue-50 dark:bg-gray-700 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group rounded-lg p-3 lg:p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-blue-400/10 dark:to-blue-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between group-hover:scale-110 transition-transform duration-200">
                <span className="text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                  Add New Member
                </span>
                <i className="fas fa-user-plus text-lg lg:text-base text-blue-600"></i>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-gray-700 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group rounded-lg p-3 lg:p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between group-hover:scale-110 transition-transform duration-200">
                <span className="text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                  Record Attendance
                </span>
                <i className="fas fa-clipboard-check text-lg lg:text-base text-green-600"></i>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-gray-700 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group rounded-lg p-3 lg:p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between group-hover:scale-110 transition-transform duration-200">
                <span className="text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                  View Analytics
                </span>
                <i className="fas fa-chart-bar text-lg lg:text-base text-purple-600"></i>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-gray-700 shadow-lg dark:shadow-orange-500/20 relative overflow-hidden group rounded-lg p-3 lg:p-3">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-between group-hover:scale-110 transition-transform duration-200">
                <span className="text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                  Bulk Registration
                </span>
                <i className="fas fa-users text-lg lg:text-base text-orange-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enter Admin Password
            </h3>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700 mb-4"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handlePasswordSubmit(e.target.value);
                }
              }}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handlePasswordSubmit(
                    document.querySelector('input[type="password"]').value
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Create New Quiz
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question
                </label>
                <textarea
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                  rows="3"
                  placeholder="Enter your question here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Option A
                  </label>
                  <input
                    type="text"
                    value={newQuestion.optionA}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        optionA: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                    placeholder="Option A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Option B
                  </label>
                  <input
                    type="text"
                    value={newQuestion.optionB}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        optionB: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                    placeholder="Option B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Option C
                  </label>
                  <input
                    type="text"
                    value={newQuestion.optionC}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        optionC: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                    placeholder="Option C"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Option D
                  </label>
                  <input
                    type="text"
                    value={newQuestion.optionD}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        optionD: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                    placeholder="Option D"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Correct Answer
                  </label>
                  <select
                    value={newQuestion.correctAnswer}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        correctAnswer: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                  >
                    <option value="">Select correct answer</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newQuestion.startTime}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newQuestion.endTime}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowQuizModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateQuiz}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
