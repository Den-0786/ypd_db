/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardPositions, setCardPositions] = useState({
    left: [0, 1, 2],
    right: [0, 1, 2]
  });
  const [countingNumbers, setCountingNumbers] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Card data for rotation
  const cardSets = [
    // Set 1
    {
      left: [
        { title: "Total Members", value: 1247, subtitle: "Active YPG Members", icon: "fas fa-users", color: "from-blue-500 to-blue-600" },
        { title: "Sunday Attendance", value: 89, subtitle: "Average Weekly", icon: "fas fa-church", color: "from-green-500 to-green-600" },
        { title: "Congregations", value: 12, subtitle: "Active Branches", icon: "fas fa-building", color: "from-purple-500 to-purple-600" }
      ],
      right: [
        { title: "Executive Members", value: 45, subtitle: "Leadership Team", icon: "fas fa-star", color: "from-yellow-500 to-yellow-600" },
        { title: "Events This Month", value: 8, subtitle: "Activities Planned", icon: "fas fa-calendar", color: "from-red-500 to-red-600" },
        { title: "Growth Rate", value: 12, subtitle: "Monthly Increase", icon: "fas fa-chart-line", color: "from-teal-500 to-teal-600" }
      ]
    },
    // Set 2
    {
      left: [
        { title: "Youth Programs", value: 15, subtitle: "Active Initiatives", icon: "fas fa-lightbulb", color: "from-indigo-500 to-indigo-600" },
        { title: "Volunteer Hours", value: 2340, subtitle: "This Quarter", icon: "fas fa-clock", color: "from-orange-500 to-orange-600" },
        { title: "Bible Study Groups", value: 23, subtitle: "Weekly Sessions", icon: "fas fa-book-open", color: "from-pink-500 to-pink-600" }
      ],
      right: [
        { title: "Community Outreach", value: 156, subtitle: "People Reached", icon: "fas fa-hands-helping", color: "from-cyan-500 to-cyan-600" },
        { title: "Prayer Requests", value: 89, subtitle: "This Week", icon: "fas fa-pray", color: "from-emerald-500 to-emerald-600" },
        { title: "Digital Engagement", value: 94, subtitle: "Online Activity", icon: "fas fa-mobile-alt", color: "from-violet-500 to-violet-600" }
      ]
    },
    // Set 3
    {
      left: [
        { title: "Leadership Training", value: 32, subtitle: "Sessions Completed", icon: "fas fa-graduation-cap", color: "from-rose-500 to-rose-600" },
        { title: "Worship Teams", value: 7, subtitle: "Active Groups", icon: "fas fa-music", color: "from-lime-500 to-lime-600" },
        { title: "Mission Trips", value: 4, subtitle: "This Year", icon: "fas fa-plane", color: "from-amber-500 to-amber-600" }
      ],
      right: [
        { title: "Small Groups", value: 18, subtitle: "Weekly Meetings", icon: "fas fa-users-cog", color: "from-sky-500 to-sky-600" },
        { title: "Discipleship", value: 67, subtitle: "Active Mentees", icon: "fas fa-heart", color: "from-fuchsia-500 to-fuchsia-600" },
        { title: "Innovation Score", value: "A+", subtitle: "Digital Excellence", icon: "fas fa-rocket", color: "from-slate-500 to-slate-600" }
      ]
    }
  ];

  // Rotate card positions (climbing effect)
  const rotateCardPositions = () => {
    setCardPositions(prev => ({
      left: [prev.left[2], prev.left[0], prev.left[1]], // Bottom moves to top, others shift down
      right: [prev.right[2], prev.right[0], prev.right[1]]
    }));
  };

  // Auto-rotate cards every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cardSets.length);
      rotateCardPositions();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Number counting animation
  useEffect(() => {
    const currentCards = cardSets[currentCardIndex];
    const allCards = [...currentCards.left, ...currentCards.right];
    
    allCards.forEach((card, index) => {
      if (typeof card.value === 'number') {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = card.value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= card.value) {
            current = card.value;
            clearInterval(timer);
          }
          
          setCountingNumbers(prev => ({
            ...prev,
            [`${currentCardIndex}-${index}`]: Math.floor(current)
          }));
        }, duration / steps);
      }
    });
  }, [currentCardIndex]);

  const currentCards = cardSets[currentCardIndex];

  // Get display value for a card
  const getDisplayValue = (card, index) => {
    if (typeof card.value === 'string') return card.value;
    const key = `${currentCardIndex}-${index}`;
    return countingNumbers[key] || 0;
  };

  // Format number with commas
  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen h-screen w-screen relative overflow-hidden">
      {/* Prevent scrollbars */}
      <style jsx global>{`
        html, body, #__next {
          height: 100%;
          width: 100%;
          overflow: hidden !important;
        }
      `}</style>
      {/* Background image and overlay - always cover full viewport */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <img
          src="/land.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#e9d8c3]/60 to-[#bfae9e]/40 pointer-events-none" style={{zIndex: 1}}></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between w-full">
        {/* Single blue header for the home page */}
        <header className="bg-blue-600 shadow-lg w-full px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between fixed top-0 left-0 z-20">
          <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-6">
            <i className="fas fa-database text-white text-lg sm:text-2xl"></i>
            <span className="text-white text-lg sm:text-2xl font-bold">YPG Database</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="px-3 sm:px-6 py-1 sm:py-2 bg-white text-blue-600 hover:bg-blue-100 rounded-lg font-semibold text-xs sm:text-base transition-all duration-300 border border-blue-500 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => window.location.href = '/login'}
            >
              <i className="fas fa-sign-in-alt mr-1 sm:mr-2"></i>
              <span className="hidden sm:inline">Login</span>
              <span className="sm:hidden">Login</span>
            </button>
            <nav className="hidden sm:flex space-x-2 sm:space-x-3 pr-2 sm:pr-6">
              <Link href="/dashboard" className="px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center hover:bg-blue-800 transition-colors">
                <i className="fas fa-tachometer-alt mr-1"></i><span className="hidden lg:inline">Dashboard</span>
              </Link>
              <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center cursor-default">
                <i className="fas fa-users mr-1"></i><span className="hidden lg:inline">Members</span>
              </span>
              <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center cursor-default">
                <i className="fas fa-calendar-check mr-1"></i><span className="hidden lg:inline">Attendance</span>
              </span>
              <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center cursor-default">
                <i className="fas fa-chart-bar mr-1"></i><span className="hidden lg:inline">Analytics</span>
              </span>
              <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center cursor-default">
                <i className="fas fa-user-plus mr-1"></i><span className="hidden lg:inline">Bulk Add</span>
              </span>
            </nav>
            {/* Mobile menu button */}
            <button 
              className="sm:hidden px-2 py-1 text-white hover:text-blue-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-sm`}></i>
            </button>
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
                <span className="mx-2 rounded-md bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center font-medium px-4 py-3 cursor-default">
                  <i className="fas fa-users mr-3"></i>Members
                </span>
                <span className="mx-2 rounded-md bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center font-medium px-4 py-3 cursor-default">
                  <i className="fas fa-calendar-check mr-3"></i>Attendance
                </span>
                <span className="mx-2 rounded-md bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center font-medium px-4 py-3 cursor-default">
                  <i className="fas fa-chart-bar mr-3"></i>Analytics
                </span>
                <span className="mx-2 rounded-md bg-blue-700 text-white shadow-md border-b-2 border-white flex items-center font-medium px-4 py-3 cursor-default">
                  <i className="fas fa-user-plus mr-3"></i>Bulk Add
                </span>
              </nav>
            </div>
          </>
        )}
        
        {/* Welcome message below the header */}
        <div className="text-center mt-10 sm:mt-14 mb-0 p-2 sm:p-0">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg px-2">
            Welcome to Ahinsan District YPG Database Management System
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-blue-100 max-w-2xl mx-auto drop-shadow-md mb-0 px-2">
            Empowering young people through comprehensive data management and analytics
          </p>
        </div>
        
        <main className="flex-1 flex flex-col items-center justify-start p-0 w-full mt-0">
          <div className="w-full max-w-6xl flex flex-col items-center h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl mx-auto items-center justify-items-center flex-1 mt-0 overflow-hidden">
              {/* Left column cards with position rotation */}
              {cardPositions.left.map((positionIndex, displayIndex) => {
                const card = currentCards.left[positionIndex];
                const originalIndex = currentCards.left.indexOf(card);
                return (
                  <div
                    key={`left-${positionIndex}-${displayIndex}`}
                    className="bg-[#f5e9da]/70 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-[#e9d8c3] border-opacity-60 hover:bg-[#f5e9da]/90 transition-all duration-500 transform hover:scale-105 shadow-lg flex flex-col items-center justify-center w-full min-w-[150px] sm:min-w-[180px] lg:min-w-[220px] min-h-[80px] sm:min-h-[100px] lg:min-h-[140px] max-w-[250px] sm:max-w-[280px] lg:max-w-[320px] max-h-[120px] sm:max-h-[140px] lg:max-h-[180px]"
                    style={{
                      animationDelay: `${displayIndex * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1">
                        <h3 className="text-[#6b4f27] text-xs sm:text-sm lg:text-base font-bold mb-1 drop-shadow-md">{card.title}</h3>
                        <p className="text-[#a68a64] text-xs drop-shadow-sm">{card.subtitle}</p>
                      </div>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-md ml-2`}>
                        <i className={`${card.icon} text-white text-xs sm:text-sm lg:text-base`}></i>
                      </div>
                    </div>
                    <div className="mt-1">
                      <span className="text-base sm:text-lg lg:text-xl font-bold text-[#6b4f27] drop-shadow-lg">{formatNumber(getDisplayValue(card, originalIndex))}</span>
                    </div>
                  </div>
                );
              })}
              
              {/* Right column cards with position rotation */}
              {cardPositions.right.map((positionIndex, displayIndex) => {
                const card = currentCards.right[positionIndex];
                const originalIndex = currentCards.right.indexOf(card) + 3; // +3 because right cards start after left cards
                return (
                  <div
                    key={`right-${positionIndex}-${displayIndex}`}
                    className="bg-[#f5e9da]/70 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-[#e9d8c3] border-opacity-60 hover:bg-[#f5e9da]/90 transition-all duration-500 transform hover:scale-105 shadow-lg flex flex-col items-center justify-center w-full min-w-[150px] sm:min-w-[180px] lg:min-w-[220px] min-h-[80px] sm:min-h-[100px] lg:min-h-[140px] max-w-[250px] sm:max-w-[280px] lg:max-w-[320px] max-h-[120px] sm:max-h-[140px] lg:max-h-[180px]"
                    style={{
                      animationDelay: `${(displayIndex + 3) * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1">
                        <h3 className="text-[#6b4f27] text-xs sm:text-sm lg:text-base font-bold mb-1 drop-shadow-md">{card.title}</h3>
                        <p className="text-[#a68a64] text-xs drop-shadow-sm">{card.subtitle}</p>
                      </div>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-md ml-2`}>
                        <i className={`${card.icon} text-white text-xs sm:text-sm lg:text-base`}></i>
                      </div>
                    </div>
                    <div className="mt-1">
                      <span className="text-base sm:text-lg lg:text-xl font-bold text-[#6b4f27] drop-shadow-lg">{formatNumber(getDisplayValue(card, originalIndex))}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card rotation indicator */}
            <div className="text-center mt-4">
              <div className="flex justify-center space-x-2">
                {cardSets.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCardIndex 
                        ? 'bg-[#6b4f27]' 
                        : 'bg-[#6b4f27] bg-opacity-30'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <div className="flex flex-col items-center w-full mb-1">
          <footer className="p-0 text-center w-full">
            <p className="text-[#a68a64] text-xs drop-shadow-sm">
              © 2024 YPG Database System - Empowering Youth Ministry
            </p>
          </footer>
        </div>
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
