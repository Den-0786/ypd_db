"use client";

import { useState, useEffect } from "react";
import ToastContainer from "../components/ToastContainer";
import autoLogout from "../utils/autoLogout";
import { authenticateCongregation } from "../utils/congregationAuth";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });
  const [showCredentials, setShowCredentials] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    setMounted(true);

    // Set up global toast function
    if (typeof window !== "undefined") {
      window.showToast = (message, type = "success", duration = 3000) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), duration);
      };
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        alert("Password reset link sent to your email!");
        setShowForgotPassword(false);
      }, 1500);
    } catch (err) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Authenticate using congregation credentials
      const authResult = authenticateCongregation(
        formData.username,
        formData.password
      );

      if (authResult.success) {
        // Set auth token and congregation info

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: formData.username,
            congregationId: authResult.congregation.id,
            congregationName: authResult.congregation.name,
          })
        );
        localStorage.setItem("congregationId", authResult.congregation.id);
        localStorage.setItem("congregationName", authResult.congregation.name);

        autoLogout.updateLoginStatus(true);

        setToastMessage(`Welcome back, ${authResult.congregation.name}!`);
        setToastType("success");
        setShowToast(true);

        // Redirect congregation users to local dashboard, district users to main dashboard
        setTimeout(() => {
          if (authResult.congregation.id === "district") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/local/dashboard";
          }
        }, 1500);
      } else {
        setError(authResult.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/landing.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-purple-600/70"></div>
        </div>

        <div className="relative h-full w-full flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-0">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center shadow-lg relative z-20">
                <i className="fas fa-key text-white text-2xl"></i>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 -mt-8 border border-white/20">
              <h3 className="text-white text-xl font-semibold text-center mb-6">
                Reset Password
              </h3>
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>

                <button
                  type="button"
                  className="w-full text-white/80 hover:text-white transition-colors text-sm text-center"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/landing.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-purple-600/70"></div>
      </div>
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-0">
            <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center shadow-lg relative z-20">
              <i className="fas fa-user text-white text-2xl"></i>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4 -mt-6 border border-white/20">
            <div className="text-center mb-4 mt-4">
              <h1 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                Login
              </h1>
              <p className="text-white/90 text-sm drop-shadow-md">
                Enter your credentials
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 pr-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-white text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2 w-4 h-4 text-blue-800 bg-transparent border-white rounded focus:ring-blue-500 focus:ring-1"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-white/70 hover:text-white transition-colors text-xs"
                  onClick={() => setShowForgotPassword(true)}
                >
                  <span>Forgot Password?</span>
                </button>
              </div>
              {error && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="w-full bg-transparent hover:bg-white/10 text-white/80 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40 text-sm"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Home
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="text-white/70 hover:text-white transition-colors text-xs underline"
                >
                  <i className="fas fa-info-circle mr-1"></i>
                  View Congregation Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />

      {/* Credentials Modal */}
      {showCredentials && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Congregation Login Credentials
                </h3>
                <button
                  onClick={() => setShowCredentials(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      Emmanuel Congregation Ahinsan
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username: <span className="font-mono">emmanuel</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">emmanuel123</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      Peniel Congregation Esreso No1
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username: <span className="font-mono">peniel</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">peniel123</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3 bg-blue-50">
                    <h4 className="font-semibold text-sm mb-2 text-blue-800">
                      District Admin
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username:{" "}
                      <span className="font-mono">district_admin</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">district2024</span>
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Access to all congregations
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      Mizpah Congregation Odagya No1
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username:{" "}
                      <span className="font-mono">mizpah_odagya1</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">mizpah2024</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      Christ Congregation Ahinsan Estate
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username:{" "}
                      <span className="font-mono">christ_ahinsan</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">christ2024</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      Ebenezer Congregation Dompoase Aprabo
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username:{" "}
                      <span className="font-mono">ebenezer_dompoase</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">ebenezer2024</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      Favour Congregation Esreso No2
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username:{" "}
                      <span className="font-mono">favour_esreso2</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">favour2024</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      Liberty Congregation Esreso High Tension
                    </h4>
                    <p className="text-xs text-gray-600">
                      Username:{" "}
                      <span className="font-mono">liberty_esreso</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">liberty2024</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">Odagya No2</h4>
                    <p className="text-xs text-gray-600">
                      Username: <span className="font-mono">odagya2</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">odagya2024</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">NOM</h4>
                    <p className="text-xs text-gray-600">
                      Username:{" "}
                      <span className="font-mono">nom_congregation</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">nom2024</span>
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">Kokobriko</h4>
                    <p className="text-xs text-gray-600">
                      Username: <span className="font-mono">kokobriko</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Password: <span className="font-mono">kokobriko2024</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowCredentials(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
