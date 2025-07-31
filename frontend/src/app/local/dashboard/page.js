"use client";
import LocalDashboardLayout from "../../components/LocalDashboardLayout";

export default function LocalDashboardPage() {
  // Example statistics - replace with real data fetching later
    const stats = {
        totalMembers: 1247,
        thisWeeksAttendance: 892,
        newMembersThisMonth: 23,
        numberOfExecutives: 9,
    };

    return (
        <LocalDashboardLayout currentPage="Dashboard">
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-blue-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
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
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-green-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 dark:from-green-400/10 dark:to-green-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                <div>
                    <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    This Week&apos;s Attendance
                    </p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.thisWeeksAttendance}
                    </p>
                </div>
                <div className="ml-3 lg:ml-4">
                    <i className="fas fa-calendar-check text-xl lg:text-2xl text-green-600 group-hover:scale-110 transition-transform duration-200"></i>
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
                    {stats.newMembersThisMonth}
                    </p>
                </div>
                <div className="ml-3 lg:ml-4">
                    <i className="fas fa-user-plus text-xl lg:text-2xl text-orange-600 group-hover:scale-110 transition-transform duration-200"></i>
                </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-500/20 relative overflow-hidden group rounded-lg p-4 lg:p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 dark:from-purple-400/10 dark:to-purple-600/10 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-between">
                <div>
                    <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    Number of Executives
                    </p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.numberOfExecutives}
                    </p>
                </div>
                <div className="ml-3 lg:ml-4">
                    <i className="fas fa-user-tie text-xl lg:text-2xl text-purple-600 group-hover:scale-110 transition-transform duration-200"></i>
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
        </LocalDashboardLayout>
    );
}
