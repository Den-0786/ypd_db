'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Card data for rotation
  const cardSets = [
    // Set 1
    {
      left: [
        { title: "Total Members", value: "1,247", subtitle: "Active YPG Members", icon: "fas fa-users", color: "from-blue-500 to-blue-600" },
        { title: "Sunday Attendance", value: "89%", subtitle: "Average Weekly", icon: "fas fa-church", color: "from-green-500 to-green-600" },
        { title: "Congregations", value: "12", subtitle: "Active Branches", icon: "fas fa-building", color: "from-purple-500 to-purple-600" }
      ],
      right: [
        { title: "Executive Members", value: "45", subtitle: "Leadership Team", icon: "fas fa-star", color: "from-yellow-500 to-yellow-600" },
        { title: "Events This Month", value: "8", subtitle: "Activities Planned", icon: "fas fa-calendar", color: "from-red-500 to-red-600" },
        { title: "Growth Rate", value: "+12%", subtitle: "Monthly Increase", icon: "fas fa-chart-line", color: "from-teal-500 to-teal-600" }
      ]
    },
    // Set 2
    {
      left: [
        { title: "Youth Programs", value: "15", subtitle: "Active Initiatives", icon: "fas fa-lightbulb", color: "from-indigo-500 to-indigo-600" },
        { title: "Volunteer Hours", value: "2,340", subtitle: "This Quarter", icon: "fas fa-clock", color: "from-orange-500 to-orange-600" },
        { title: "Bible Study Groups", value: "23", subtitle: "Weekly Sessions", icon: "fas fa-book-open", color: "from-pink-500 to-pink-600" }
      ],
      right: [
        { title: "Community Outreach", value: "156", subtitle: "People Reached", icon: "fas fa-hands-helping", color: "from-cyan-500 to-cyan-600" },
        { title: "Prayer Requests", value: "89", subtitle: "This Week", icon: "fas fa-pray", color: "from-emerald-500 to-emerald-600" },
        { title: "Digital Engagement", value: "94%", subtitle: "Online Activity", icon: "fas fa-mobile-alt", color: "from-violet-500 to-violet-600" }
      ]
    },
    // Set 3
    {
      left: [
        { title: "Leadership Training", value: "32", subtitle: "Sessions Completed", icon: "fas fa-graduation-cap", color: "from-rose-500 to-rose-600" },
        { title: "Worship Teams", value: "7", subtitle: "Active Groups", icon: "fas fa-music", color: "from-lime-500 to-lime-600" },
        { title: "Mission Trips", value: "4", subtitle: "This Year", icon: "fas fa-plane", color: "from-amber-500 to-amber-600" }
      ],
      right: [
        { title: "Small Groups", value: "18", subtitle: "Weekly Meetings", icon: "fas fa-users-cog", color: "from-sky-500 to-sky-600" },
        { title: "Discipleship", value: "67", subtitle: "Active Mentees", icon: "fas fa-heart", color: "from-fuchsia-500 to-fuchsia-600" },
        { title: "Innovation Score", value: "A+", subtitle: "Digital Excellence", icon: "fas fa-rocket", color: "from-slate-500 to-slate-600" }
      ]
    }
  ];

  // Auto-rotate cards every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cardSets.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const currentCards = cardSets[currentCardIndex];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Church-themed background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-10"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-400 rounded-full opacity-10"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-green-400 rounded-full opacity-10"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">YPG Database System</h1>
              <p className="text-blue-100 text-lg drop-shadow-md">Young People's Guild Management</p>
            </div>
            <Link 
              href="/login" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-base transition-all duration-300 border border-blue-500 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Login
            </Link>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-7xl mx-auto w-full">
            {/* Welcome section */}
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
                Welcome to YPG Database
              </h2>
              <p className="text-2xl text-blue-100 max-w-2xl mx-auto drop-shadow-md">
                Empowering young people through comprehensive data management and analytics
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left column */}
              <div className="space-y-6">
                {currentCards.left.map((card, index) => (
                  <div
                    key={`left-${index}`}
                    className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 border border-gray-600 border-opacity-50 hover:bg-opacity-90 transition-all duration-500 transform hover:scale-105 shadow-xl"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white text-xl font-bold mb-2 drop-shadow-md">{card.title}</h3>
                        <p className="text-gray-200 text-base drop-shadow-sm">{card.subtitle}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}>
                        <i className={`${card.icon} text-white text-xl`}></i>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white drop-shadow-lg">{card.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {currentCards.right.map((card, index) => (
                  <div
                    key={`right-${index}`}
                    className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 border border-gray-600 border-opacity-50 hover:bg-opacity-90 transition-all duration-500 transform hover:scale-105 shadow-xl"
                    style={{
                      animationDelay: `${(index + 3) * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white text-xl font-bold mb-2 drop-shadow-md">{card.title}</h3>
                        <p className="text-gray-200 text-base drop-shadow-sm">{card.subtitle}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}>
                        <i className={`${card.icon} text-white text-xl`}></i>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white drop-shadow-lg">{card.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card rotation indicator */}
            <div className="text-center mt-8">
              <div className="flex justify-center space-x-2">
                {cardSets.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCardIndex 
                        ? 'bg-white' 
                        : 'bg-white bg-opacity-30'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-blue-100 text-base mt-2 drop-shadow-sm">Cards auto-rotate every 20 seconds</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-blue-100 text-base drop-shadow-sm">
            © 2024 YPG Database System - Empowering Youth Ministry
          </p>
        </footer>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
