'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Sample notifications
  const notifications = [
    { id: 1, message: 'New member registration pending approval', time: '2 min ago', type: 'info' },
    { id: 2, message: 'Weekly attendance report is ready', time: '1 hour ago', type: 'success' },
    { id: 3, message: 'System backup completed successfully', time: '3 hours ago', type: 'success' },
    { id: 4, message: 'Database maintenance scheduled for tonight', time: '5 hours ago', type: 'warning' }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-600'} shadow-lg w-full px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between fixed top-0 left-0 z-20`}>
        <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-blue-200 transition-colors mr-2"
          >
            <i className="fas fa-bars text-lg"></i>
          </button>
          <i className="fas fa-database text-white text-lg sm:text-2xl"></i>
          <span className="text-white text-lg sm:text-2xl font-bold">YPG Database</span>
        </div>
      </header>

      {/* Mobile menu dropdown with overlay */}
      {mobileMenuOpen && (
        <>
          {/* Blur overlay to close menu when clicking outside */}
          <div
            className="fixed inset-0 z-10 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Mobile menu itself */}
          <div className="sm:hidden fixed left-0 right-0 top-[56px] z-20 bg-blue-700 shadow-lg border-t border-blue-600">
            <nav className="flex flex-col py-2 space-y-2">
              <Link href="/dashboard" className="mx-2 rounded-md bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center font-medium px-4 py-3 hover:bg-blue-800 transition-colors">
                <i className="fas fa-tachometer-alt mr-3"></i>Dashboard
              </Link>
              <Link href="/members" className="mx-2 rounded-md bg-blue-600 text-white shadow-md border-b-2 border-transparent flex items-center font-medium px-4 py-3 hover:bg-blue-700 transition-colors">
                <i className="fas fa-users mr-3"></i>Members
              </Link>
              <Link href="/attendance" className="mx-2 rounded-md bg-blue-600 text-white shadow-md border-b-2 border-transparent flex items-center font-medium px-4 py-3 hover:bg-blue-700 transition-colors">
                <i className="fas fa-calendar-check mr-3"></i>Attendance
              </Link>
              <Link href="/analytics" className="mx-2 rounded-md bg-blue-600 text-white shadow-md border-b-2 border-transparent flex items-center font-medium px-4 py-3 hover:bg-blue-700 transition-colors">
                <i className="fas fa-chart-bar mr-3"></i>Analytics
              </Link>
              <Link href="/bulk" className="mx-2 rounded-md bg-blue-600 text-white shadow-md border-b-2 border-transparent flex items-center font-medium px-4 py-3 hover:bg-blue-700 transition-colors">
                <i className="fas fa-user-plus mr-3"></i>Bulk Add
              </Link>
            </nav>
          </div>
        </>
      )}

      {/* Settings Modal */}
      {settingsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSettingsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <div className="flex h-96">
                {/* Settings Sidebar */}
                <div className="w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <nav className="p-4 space-y-2">
                    <button
                      onClick={() => setActiveSettingsTab('profile')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === 'profile'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="fas fa-user mr-2"></i>Profile
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('security')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === 'security'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="fas fa-shield-alt mr-2"></i>Security
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('notifications')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === 'notifications'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="fas fa-bell mr-2"></i>Notifications
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('appearance')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === 'appearance'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="fas fa-palette mr-2"></i>Appearance
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('data')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === 'data'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="fas fa-database mr-2"></i>Data Management
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('about')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSettingsTab === 'about'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="fas fa-info-circle mr-2"></i>About
                    </button>
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {activeSettingsTab === 'profile' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                          <input type="text" defaultValue="Admin User" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                          <input type="email" defaultValue="admin@ypg.com" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                          <input type="tel" defaultValue="+233 20 123 4567" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            <option>System Administrator</option>
                            <option>Data Manager</option>
                            <option>Viewer</option>
                          </select>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Update Profile
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'security' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                          <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                          <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                          <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="2fa" className="rounded" />
                          <label htmlFor="2fa" className="text-sm text-gray-700 dark:text-gray-300">Enable Two-Factor Authentication</label>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Update Security Settings
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'notifications' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">New Member Alerts</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when new members register</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Weekly Reports</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive weekly summary reports</p>
                          </div>
                          <input type="checkbox" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">System Updates</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Notifications about system maintenance</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'appearance' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                          <select 
                            value={theme} 
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          >
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                            <option value="auto">Auto (System)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            <option>English</option>
                            <option>Twi</option>
                            <option>Ga</option>
                            <option>Ewe</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                          </select>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Apply Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'data' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Management</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Export Data</h4>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">Download your data in various formats</p>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-700">
                              <i className="fas fa-download mr-2"></i>Export as CSV
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-700">
                              <i className="fas fa-file-excel mr-2"></i>Export as Excel
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-700">
                              <i className="fas fa-file-pdf mr-2"></i>Export as PDF
                            </button>
                          </div>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                          <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">Backup & Restore</h4>
                          <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">Manage your data backups</p>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-700">
                              <i className="fas fa-save mr-2"></i>Create Backup
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-700">
                              <i className="fas fa-upload mr-2"></i>Restore from Backup
                            </button>
                          </div>
                        </div>
                        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                          <h4 className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">Danger Zone</h4>
                          <p className="text-xs text-red-700 dark:text-red-300 mb-3">Irreversible actions</p>
                          <button className="w-full text-left px-3 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-700">
                            <i className="fas fa-trash mr-2"></i>Clear All Data
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'about' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About YPG Database</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Version Information</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Version: 1.0.0</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Build: 2024.1.1</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Last Updated: January 2024</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            YPG Database Management System is a comprehensive solution for managing Young People&apos;s Group data, 
                            attendance tracking, and analytics. Built with modern web technologies to provide a seamless 
                            experience for church administrators and youth leaders.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features</h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Member Management & Registration</li>
                            <li>• Attendance Tracking & Reporting</li>
                            <li>• Analytics & Insights</li>
                            <li>• Bulk Data Import/Export</li>
                            <li>• Multi-language Support</li>
                            <li>• Dark/Light Theme</li>
                            <li>• Mobile Responsive Design</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Support</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            For technical support or feature requests, please contact the development team.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-16 h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 z-10 ${sidebarOpen ? 'w-64' : 'w-16'} ${sidebarOpen ? 'translate-x-0' : '-translate-x-0'} overflow-y-auto`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              {sidebarOpen && <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Navigation</h2>}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              >
                <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-sm`}></i>
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-4 space-y-2">
            <Link href="/dashboard" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700'} rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors`}>
              <i className="fas fa-tachometer-alt text-lg"></i>
              {sidebarOpen && <span className="font-medium">Dashboard</span>}
            </Link>
            
            <Link href="/members" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <i className="fas fa-users text-lg"></i>
              {sidebarOpen && <span className="font-medium">Members</span>}
            </Link>
            
            <Link href="/attendance" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <i className="fas fa-calendar-check text-lg"></i>
              {sidebarOpen && <span className="font-medium">Attendance</span>}
            </Link>
            
            <Link href="/analytics" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <i className="fas fa-chart-bar text-lg"></i>
              {sidebarOpen && <span className="font-medium">Analytics</span>}
            </Link>
            
            <Link href="/bulk" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <i className="fas fa-user-plus text-lg"></i>
              {sidebarOpen && <span className="font-medium">Bulk Add</span>}
            </Link>

            {/* Theme Toggle - moved here under Bulk Add */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center space-x-3 p-3 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-lg`}></i>
              {sidebarOpen && <span className="font-medium">Theme</span>}
            </button>

            {/* Home Link - moved here in navigation section */}
            <Link href="/" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <i className="fas fa-home text-lg"></i>
              {sidebarOpen && <span className="font-medium">Home</span>}
            </Link>
          </nav>

          {/* Notifications */}
          <div className={`p-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`w-full flex items-center space-x-3 p-2 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors relative`}
                title="Notifications"
              >
                <i className="fas fa-bell text-lg"></i>
                {sidebarOpen && <span className="font-medium text-sm">Notifications</span>}
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && sidebarOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 max-h-48 overflow-y-auto">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-2 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-start space-x-2">
                          <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-1 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-900 dark:text-white">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className={`p-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`w-full flex items-center space-x-3 p-2 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-xs text-white"></i>
                </div>
                {sidebarOpen && (
                  <>
                    <span className="font-medium text-sm">Admin</span>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </>
                )}
              </button>

              {/* User Menu Dropdown */}
              {userMenuOpen && sidebarOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">admin@ypg.com</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSettingsOpen(true);
                        setUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <i className="fas fa-cog text-sm"></i>
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <i className="fas fa-sign-out-alt text-sm"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Dashboard</h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Welcome to the YPG Database Management System</p>
          </div>

          {/* Quick stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 border-l-4 border-blue-500`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-users text-blue-500 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Members</p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>1,247</p>
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 border-l-4 border-green-500`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-church text-green-500 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Sunday Attendance</p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>89</p>
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 border-l-4 border-purple-500`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-building text-purple-500 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Congregations</p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>12</p>
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 border-l-4 border-yellow-500`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-star text-yellow-500 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Executive Members</p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>45</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
                <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Recent Activity</h2>
                <div className="space-y-4">
                  <div className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex-shrink-0">
                      <i className="fas fa-user-plus text-green-500"></i>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>New member registered</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>John Doe joined Ahinsan District</p>
                    </div>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>2 hours ago</span>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex-shrink-0">
                      <i className="fas fa-calendar-check text-blue-500"></i>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Attendance recorded</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Sunday service attendance updated</p>
                    </div>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>1 day ago</span>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex-shrink-0">
                      <i className="fas fa-edit text-purple-500"></i>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Member profile updated</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Contact information modified</p>
                    </div>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>3 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
                <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/members" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-50 hover:bg-blue-100'} rounded-lg transition-colors`}>
                    <i className="fas fa-user-plus text-blue-500"></i>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-gray-900'}`}>Add New Member</span>
                  </Link>
                  <Link href="/attendance" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-green-900 hover:bg-green-800' : 'bg-green-50 hover:bg-green-100'} rounded-lg transition-colors`}>
                    <i className="fas fa-calendar-check text-green-500"></i>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-green-300' : 'text-gray-900'}`}>Record Attendance</span>
                  </Link>
                  <Link href="/bulk" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-purple-900 hover:bg-purple-800' : 'bg-purple-50 hover:bg-purple-100'} rounded-lg transition-colors`}>
                    <i className="fas fa-users text-purple-500"></i>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-gray-900'}`}>Bulk Import</span>
                  </Link>
                  <Link href="/analytics" className={`flex items-center space-x-3 p-3 ${theme === 'dark' ? 'bg-yellow-900 hover:bg-yellow-800' : 'bg-yellow-50 hover:bg-yellow-100'} rounded-lg transition-colors`}>
                    <i className="fas fa-chart-bar text-yellow-500"></i>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-yellow-300' : 'text-gray-900'}`}>View Reports</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 