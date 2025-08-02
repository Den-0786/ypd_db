"use client";
import { useState } from "react";

export default function PinModal({ isOpen, onClose, onConfirm, title, message, type = "edit" }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock PIN - in a real app, this would be fetched from the server
  const CORRECT_PIN = "1234";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (pin === CORRECT_PIN) {
      setIsLoading(false);
      onConfirm();
      handleClose();
    } else {
      setError("Incorrect PIN. Please try again.");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPin("");
    setError("");
    setIsLoading(false);
    onClose();
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setPin(value);
      setError(""); // Clear error when user starts typing
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <i className={`fas ${type === "edit" ? "fa-edit" : "fa-trash"} text-red-500 mr-2`}></i>
              {title}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter PIN <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={pin}
                onChange={handlePinChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                }`}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                required
                autoFocus
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  type === "edit"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-600 hover:bg-red-700"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading || !pin}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <i className={`fas ${type === "edit" ? "fa-edit" : "fa-trash"} mr-2`}></i>
                    {type === "edit" ? "Edit" : "Delete"}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
