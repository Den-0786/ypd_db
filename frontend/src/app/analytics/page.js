'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [tooltip, setTooltip] = useState({ show: false, data: null, x: 0, y: 0 });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      
      const mockData = {
        
        sundayAttendance: {
          totalAttendance: 3456,
          averageAttendance: 81.7,
          congregationsCount: 3, 
          growth: 12.5, 
          weeklyTrend: [
            { date: '2024-01-07', male: 25, female: 30, total: 55 },
            { date: '2024-01-14', male: 28, female: 32, total: 60 },
            { date: '2024-01-21', male: 22, female: 35, total: 57 },
            { date: '2024-01-28', male: 30, female: 38, total: 68 },
            { date: '2024-02-04', male: 26, female: 34, total: 60 },
            { date: '2024-02-11', male: 29, female: 37, total: 66 },
            { date: '2024-02-18', male: 24, female: 33, total: 57 },
            { date: '2024-02-25', male: 31, female: 39, total: 70 }
          ],
          monthlyTrend: [
            { month: 'Jan', male: 105, female: 135, total: 240 },
            { month: 'Feb', male: 110, female: 143, total: 253 },
            { month: 'Mar', male: 98, female: 128, total: 226 },
            { month: 'Apr', male: 115, female: 145, total: 260 },
            { month: 'May', male: 108, female: 138, total: 246 },
            { month: 'Jun', male: 112, female: 142, total: 254 },
            { month: 'Jul', male: 118, female: 148, total: 266 },
            { month: 'Aug', male: 125, female: 155, total: 280 },
            { month: 'Sep', male: 132, female: 162, total: 294 },
            { month: 'Oct', male: 140, female: 170, total: 310 },
            { month: 'Nov', male: 145, female: 175, total: 320 },
            { month: 'Dec', male: 150, female: 180, total: 330 }
          ],
          yearlyTrend: [
            { year: '2019', male: 1000, female: 1200, total: 2200 },
            { year: '2020', male: 1050, female: 1250, total: 2300 },
            { year: '2021', male: 1100, female: 1300, total: 2400 },
            { year: '2022', male: 1200, female: 1500, total: 2700 },
            { year: '2023', male: 1350, female: 1650, total: 3000 },
            { year: '2024', male: 1450, female: 1750, total: 3200 }
          ]
        },
        
        membersDatabase: {
          totalMembers: 127,
          congregations: [
            { name: 'Emmanuel Congregation Ahinsan', count: 45, color: '#3B82F6' },
            { name: 'Peniel Congregation Esreso No1', count: 32, color: '#10B981' },
            { name: 'Mizpah Congregation Odagya No1', count: 28, color: '#F59E0B' },
            { name: 'Christ Congregation Ahinsan Estate', count: 22, color: '#EF4444' },
            { name: 'Ebenezer Congregation Dompoase Aprabo', count: 18, color: '#8B5CF6' },
            { name: 'Favour Congregation Esreso No2', count: 15, color: '#06B6D4' },
            { name: 'Liberty Congregation Esreso High Tension', count: 12, color: '#F97316' },
            { name: 'Odagya No2', count: 10, color: '#EC4899' },
            { name: 'NOM', count: 8, color: '#84CC16' },
            { name: 'Kokobriko', count: 6, color: '#6B7280' }
          ],
          genderDistribution: [
            { congregation: 'Emmanuel Congregation Ahinsan', male: 20, female: 25 },
            { congregation: 'Peniel Congregation Esreso No1', male: 15, female: 17 },
            { congregation: 'Mizpah Congregation Odagya No1', male: 12, female: 16 },
            { congregation: 'Christ Congregation Ahinsan Estate', male: 10, female: 12 },
            { congregation: 'Ebenezer Congregation Dompoase Aprabo', male: 8, female: 10 },
            { congregation: 'Favour Congregation Esreso No2', male: 7, female: 8 },
            { congregation: 'Liberty Congregation Esreso High Tension', male: 6, female: 6 },
            { congregation: 'Odagya No2', male: 5, female: 5 },
            { congregation: 'NOM', male: 4, female: 4 },
            { congregation: 'Kokobriko', male: 3, female: 3 }
          ]
        }
      };
      setChartData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900">
          <i className="fas fa-chart-bar text-blue-600 mr-3"></i>
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Comprehensive insights into YPG attendance and membership data</p>
      </div>


      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
          Sunday Attendance Analytics
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-100">Total Attendance</p>
                <p className="text-2xl font-bold">{chartData.sundayAttendance.totalAttendance}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-100">Average Attendance</p>
                <p className="text-2xl font-bold">{chartData.sundayAttendance.averageAttendance}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-church text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-100">Congregations</p>
                <p className="text-2xl font-bold">{chartData.sundayAttendance.congregationsCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-arrow-up text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-100">Growth</p>
                <p className="text-2xl font-bold">{chartData.sundayAttendance.growth}%</p>
              </div>
            </div>
          </div>
        </div>

                  
          <div className="space-y-4">
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h3>
              <div className="space-y-4">
                                
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <div className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-calendar-week text-blue-500 mr-2"></i>
                    January 2025
                  </div>
                  <div className="flex items-end justify-center space-x-4">
                    {chartData.sundayAttendance.weeklyTrend.slice(0, 4).map((week, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex space-x-0 h-48 mb-1 items-end">
                          <div 
                            className="w-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(week.male / Math.max(...chartData.sundayAttendance.weeklyTrend.map(w => Math.max(w.male, w.female, w.total)))) * 100}%` }}
                          >
                            M: {week.male}
                          </div>
                          <div 
                            className="w-8 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(week.female / Math.max(...chartData.sundayAttendance.weeklyTrend.map(w => Math.max(w.male, w.female, w.total)))) * 100}%` }}
                          >
                            F: {week.female}
                          </div>
                          <div 
                            className="w-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(week.total / Math.max(...chartData.sundayAttendance.weeklyTrend.map(w => Math.max(w.male, w.female, w.total)))) * 100}%` }}
                          >
                            <span className="transform -rotate-90 whitespace-nowrap">Total: {week.total}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 font-medium">
                          {new Date(week.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                {/* Weekly Trend Line Graph */}
          <div className="mt-6 p-4 h-[30rem] bg-gray-900 rounded-lg border border-gray-700 shadow-lg" style={{ boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-white text-lg font-semibold">Weekly Trend</h4>
                <p className="text-gray-300 text-sm">Total Attendance: {chartData.sundayAttendance.weeklyTrend.slice(0, 4).reduce((sum, week) => sum + week.total, 0)}</p>
              </div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-orange-400 shadow-lg" style={{ boxShadow: '0 0 10px rgba(249, 115, 22, 0.6)' }}>
                <i className="fas fa-chart-line text-white text-sm"></i>
              </div>
            </div>
            
            <div className="relative h-[16rem] bg-gray-800 rounded-lg p-4 border border-gray-600">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-b border-gray-600 opacity-30"></div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                {[10, 8, 6, 4, 2, 0].map((num) => (
                  <span key={num}>{num}</span>
                ))}
              </div>
              
              {/* Line Graph */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ padding: '0.2rem' }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background Gray Line */}
                <polyline
                  fill="none"
                  stroke="rgba(156, 163, 175, 0.3)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  points={chartData.sundayAttendance.weeklyTrend.slice(0, 4).map((week, index) => {
                    const x = 10 + (index * 30);
                    const y = 90 - (week.total / 10) * 5;
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Main Orange/Red Line */}
                <polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  points={chartData.sundayAttendance.weeklyTrend.slice(0, 4).map((week, index) => {
                    const x = 10 + (index * 25); 
                    const y = 90 - (week.total / 10) * 6;
                    return `${x},${y}`;
                  }).join(' ')}
                  filter="url(#glow)"
                />
                
                {/* Data Points */}
                {chartData.sundayAttendance.weeklyTrend.slice(0, 4).map((week, index) => {
                  const x = 10 + (index * 25); 
                  const y = 90 - (week.total / 10) * 6;
                  const prevWeek = index > 0 ? chartData.sundayAttendance.weeklyTrend[index - 1] : null;
                  const difference = prevWeek ? week.total - prevWeek.total : 0;
                  
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="1.2"
                      fill="#f97316"
                      stroke="#ffffff"
                      strokeWidth="0.3"
                      className="cursor-pointer hover:r-2.5 transition-all duration-200"
                      onMouseEnter={(e) => {
                        const rect = e.target.closest('svg').getBoundingClientRect();
                        const graphContainer = e.target.closest('.relative');
                        const containerRect = graphContainer.getBoundingClientRect();
                        
                        
                        const tooltipX = (x / 100 * rect.width);
                        const tooltipY = (y / 100 * rect.height) - 40; 
                        
                        setTooltip({
                          show: true,
                          data: { week, index, difference, prevWeek, type: 'weekly' },
                          x: containerRect.left + tooltipX,
                          y: containerRect.left + tooltipY
                        });
                      }}
                      onMouseLeave={() => setTooltip({ show: false, data: null, x: 0, y: 0 })}
                    />
                  );
                })}
              </svg>
              
              {/* Custom Tooltip */}
              {tooltip.show && tooltip.data && (
                <div 
                  className="fixed z-10 bg-gray-900 border border-gray-600 rounded-xl p-3 shadow-xl"
                  style={{ 
                    left: tooltip.x, 
                    top: tooltip.y,
                    transform: 'translateX(-50%)',
                    maxWidth: '140px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {tooltip.data.type === 'weekly' && (
                    <>
                      <div className="text-white text-xs font-medium mb-1">
                        Week {tooltip.data.index + 1}: {tooltip.data.week.total} people
                      </div>
                      {tooltip.data.prevWeek && (
                        <div className={`text-xs ${tooltip.data.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tooltip.data.difference >= 0 ? '+' : ''}{tooltip.data.difference} vs Week {tooltip.data.index}
                        </div>
                      )}
                      <div className="text-gray-400 text-xs mt-1">
                        M: {tooltip.data.week.male} | F: {tooltip.data.week.female}
                      </div>
                    </>
                  )}
                  
                  {tooltip.data.type === 'monthly' && (
                    <>
                      <div className="text-white text-xs font-medium mb-1">
                        {tooltip.data.month.month}: {tooltip.data.month.total} people
                      </div>
                      {tooltip.data.prevMonth && (
                        <div className={`text-xs ${tooltip.data.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tooltip.data.difference >= 0 ? '+' : ''}{tooltip.data.difference} vs {tooltip.data.prevMonth.month}
                        </div>
                      )}
                      <div className="text-gray-400 text-xs mt-1">
                        M: {tooltip.data.month.male} | F: {tooltip.data.month.female}
                      </div>
                    </>
                  )}
                  
                  {tooltip.data.type === 'yearly' && (
                    <>
                      <div className="text-white text-xs font-medium mb-1">
                        {tooltip.data.year.year}: {tooltip.data.year.total} people
                      </div>
                      {tooltip.data.prevYear && (
                        <div className={`text-xs ${tooltip.data.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tooltip.data.difference >= 0 ? '+' : ''}{tooltip.data.difference} vs {tooltip.data.prevYear.year}
                        </div>
                      )}
                      <div className="text-gray-400 text-xs mt-1">
                        M: {tooltip.data.year.male} | F: {tooltip.data.year.female}
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400" style={{ padding: '0 10px 0px 10px' }}>
                {chartData.sundayAttendance.weeklyTrend.slice(0, 4).map((week, index) => (
                  <span key={index} style={{ width: '30%', textAlign: 'center' }}>Week {index + 1}</span>
                ))}
              </div>
            </div>
            
            {/* Trend Analysis */}
            <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-arrow-up text-green-400"></i>
                  <span className="text-white text-sm font-medium">
                    {(() => {
                      const weeks = chartData.sundayAttendance.weeklyTrend.slice(0, 4);
                      const firstWeek = weeks[0].total;
                      const lastWeek = weeks[weeks.length - 1].total;
                      const difference = lastWeek - firstWeek;
                      const percentage = ((difference / firstWeek) * 100).toFixed(1);
                      return `${difference > 0 ? '+' : ''}${difference} (${percentage}%)`;
                    })()}
                  </span>
                </div>
                <span className="text-gray-300 text-xs">vs Week 1</span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                {(() => {
                  const weeks = chartData.sundayAttendance.weeklyTrend.slice(0, 4);
                  const firstWeek = weeks[0].total;
                  const lastWeek = weeks[weeks.length - 1].total;
                  const difference = lastWeek - firstWeek;
                  return difference > 0 
                    ? `Attendance has increased by ${Math.abs(difference)} people over the month. Great momentum!`
                    : `Attendance has decreased by ${Math.abs(difference)} people. Consider strategies to boost engagement.`;
                })()}
              </p>
            </div>
          </div>
          </div>
          </div>
          </div>
            {/* Monthly Trend Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trend</h3>
              
              {/* Large Screen - All months in one card */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-end justify-between space-x-2">
                    {chartData.sundayAttendance.monthlyTrend.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex space-x-0 h-48 mb-1 items-end">
                          <div 
                            className="w-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.male / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            M: {month.male}
                          </div>
                          <div 
                            className="w-6 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.female / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            F: {month.female}
                          </div>
                          <div 
                            className="w-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.total / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            <span className="transform -rotate-90 whitespace-nowrap">Total: {month.total}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {month.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Small Screen - Two separate cards */}
              <div className="lg:hidden space-y-4">
                {/* January to June */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-end justify-between space-x-2">
                    {chartData.sundayAttendance.monthlyTrend.slice(0, 6).map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex space-x-0 h-48 mb-1 items-end">
                          <div 
                            className="w-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.male / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            M: {month.male}
                          </div>
                          <div 
                            className="w-6 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.female / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            F: {month.female}
                          </div>
                          <div 
                            className="w-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.total / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            <span className="transform -rotate-90 whitespace-nowrap">Total: {month.total}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {month.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* July to December */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-end justify-between space-x-2">
                    {chartData.sundayAttendance.monthlyTrend.slice(6, 12).map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex space-x-0 h-48 mb-1 items-end">
                          <div 
                            className="w-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.male / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            M: {month.male}
                          </div>
                          <div 
                            className="w-6 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.female / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            F: {month.female}
                          </div>
                          <div 
                            className="w-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                            style={{ height: `${(month.total / Math.max(...chartData.sundayAttendance.monthlyTrend.map(m => Math.max(m.male, m.female, m.total)))) * 100}%` }}
                          >
                            <span className="transform -rotate-90 whitespace-nowrap">Total: {month.total}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {month.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Trend Analytics Card */}
              <div className="mt-6 p-4 h-[30rem] bg-gray-900 rounded-lg border border-gray-700 shadow-lg" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-white text-lg font-semibold">Monthly Trend</h4>
                    <p className="text-gray-300 text-sm">Total Attendance: {chartData.sundayAttendance.monthlyTrend.reduce((sum, month) => sum + month.total, 0)}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-400 shadow-lg" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)' }}>
                    <i className="fas fa-chart-line text-white text-sm"></i>
                  </div>
                </div>
                
                <div className="relative h-[16rem] bg-gray-800 rounded-lg p-4 border border-gray-600">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-b border-gray-600 opacity-30"></div>
                    ))}
                  </div>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                    {[10, 8, 6, 4, 2, 0].map((num) => (
                      <span key={num}>{num}</span>
                    ))}
                  </div>
                  
                  {/* Line Graph */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ padding: '0.2rem' }}>
                    <defs>
                      <linearGradient id="monthlyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <filter id="monthlyGlow">
                        <feGaussianBlur stdDeviation="0" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background Gray Line */}
                    <polyline
                      fill="none"
                      stroke="rgba(156, 163, 175, 0.3)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={chartData.sundayAttendance.monthlyTrend.map((month, index) => {
                        const x = 5 + (index * 8);
                        const y = 90 - (month.total / 330) * 50;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                    
                    {/* Main Blue Line */}
                    <polyline
                      fill="none"
                      stroke="url(#monthlyLineGradient)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={chartData.sundayAttendance.monthlyTrend.map((month, index) => {
                        const x = 5 + (index * 8);
                        const y = 90 - (month.total / 330) * 45;
                        return `${x},${y}`;
                      }).join(' ')}
                      filter="url(#monthlyGlow)"
                    />
                    
                    {/* Data Points */}
                    {chartData.sundayAttendance.monthlyTrend.map((month, index) => {
                      const x = 5 + (index * 8);
                      const y = 90 - (month.total / 330) * 45;
                      const prevMonth = index > 0 ? chartData.sundayAttendance.monthlyTrend[index - 1] : null;
                      const difference = prevMonth ? month.total - prevMonth.total : 0;
                      
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="1.2"
                          fill="#3b82f6"
                          stroke="#ffffff"
                          strokeWidth="0.3"
                          className="cursor-pointer hover:r-2.5 transition-all duration-200"
                          onMouseEnter={(e) => {
                            const rect = e.target.closest('svg').getBoundingClientRect();
                            const graphContainer = e.target.closest('.relative');
                            const containerRect = graphContainer.getBoundingClientRect();
                            
                            const tooltipX = (x / 100 * rect.width);
                            const tooltipY = (y / 100 * rect.height) - 45;
                            
                            setTooltip({
                              show: true,
                              data: { month, index, difference, prevMonth, type: 'monthly' },
                              x: containerRect.left + tooltipX,
                              y: containerRect.left + tooltipY
                            });
                          }}
                          onMouseLeave={() => setTooltip({ show: false, data: null, x: 0, y: 0 })}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400" style={{ padding: '0 10px 0px 10px' }}>
                    {chartData.sundayAttendance.monthlyTrend.map((month, index) => (
                      <span key={index} style={{ width: '8%', textAlign: 'center' }}>{month.month}</span>
                    ))}
                  </div>
                </div>
                
                {/* Monthly Trend Analysis */}
                <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-arrow-up text-green-400"></i>
                      <span className="text-white text-sm font-medium">
                        {(() => {
                          const months = chartData.sundayAttendance.monthlyTrend;
                          const firstMonth = months[0].total;
                          const lastMonth = months[months.length - 1].total;
                          const difference = lastMonth - firstMonth;
                          const percentage = ((difference / firstMonth) * 100).toFixed(1);
                          return `${difference > 0 ? '+' : ''}${difference} (${percentage}%)`;
                        })()}
                      </span>
                    </div>
                    <span className="text-gray-300 text-xs">vs January</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    {(() => {
                      const months = chartData.sundayAttendance.monthlyTrend;
                      const firstMonth = months[0].total;
                      const lastMonth = months[months.length - 1].total;
                      const difference = lastMonth - firstMonth;
                      return difference > 0 
                        ? `Monthly attendance has increased by ${Math.abs(difference)} people over the year. Strong growth!`
                        : `Monthly attendance has decreased by ${Math.abs(difference)} people. Consider engagement strategies.`;
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Yearly Trend Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yearly Attendance Trend</h3>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-end justify-between space-x-2">
                  {chartData.sundayAttendance.yearlyTrend.map((year, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex space-x-0 h-48 mb-1 items-end">
                        <div 
                          className="w-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{ height: `${(year.male / Math.max(...chartData.sundayAttendance.yearlyTrend.map(y => Math.max(y.male, y.female, y.total)))) * 100}%` }}
                        >
                          M: {year.male}
                        </div>
                        <div 
                          className="w-6 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{ height: `${(year.female / Math.max(...chartData.sundayAttendance.yearlyTrend.map(y => Math.max(y.male, y.female, y.total)))) * 100}%` }}
                        >
                          F: {year.female}
                        </div>
                        <div 
                          className="w-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{ height: `${(year.total / Math.max(...chartData.sundayAttendance.yearlyTrend.map(y => Math.max(y.male, y.female, y.total)))) * 100}%` }}
                        >
                          <span className="transform -rotate-90 whitespace-nowrap">Total: {year.total}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        {year.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yearly Trend Analytics Card */}
              <div className="mt-6 p-4 h-[30rem] bg-gray-900 rounded-lg border border-gray-700 shadow-lg" style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-white text-lg font-semibold">Yearly Trend</h4>
                    <p className="text-gray-300 text-sm">Total Attendance: {chartData.sundayAttendance.yearlyTrend.reduce((sum, year) => sum + year.total, 0)}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-green-400 shadow-lg" style={{ boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' }}>
                    <i className="fas fa-chart-line text-white text-sm"></i>
                  </div>
                </div>
                
                <div className="relative h-[16rem] bg-gray-800 rounded-lg p-4 border border-gray-600">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-b border-gray-600 opacity-30"></div>
                    ))}
                  </div>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                    {[10, 8, 6, 4, 2, 0].map((num) => (
                      <span key={num}>{num}</span>
                    ))}
                  </div>
                  
                  {/* Line Graph */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ padding: '0.2rem' }}>
                    <defs>
                      <linearGradient id="yearlyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <filter id="yearlyGlow">
                        <feGaussianBlur stdDeviation="0" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background Gray Line */}
                    <polyline
                      fill="none"
                      stroke="rgba(156, 163, 175, 0.3)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={chartData.sundayAttendance.yearlyTrend.map((year, index) => {
                        const x = 10 + (index * 16);
                        const y = 90 - (year.total / 3200) * 48;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                    
                    {/* Main Green Line */}
                    <polyline
                      fill="none"
                      stroke="url(#yearlyLineGradient)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      points={chartData.sundayAttendance.yearlyTrend.map((year, index) => {
                        const x = 10 + (index * 16);
                        const y = 90 - (year.total / 3200) * 50;
                        return `${x},${y}`;
                      }).join(' ')}
                      filter="url(#yearlyGlow)"
                    />
                    
                    {/* Data Points */}
                    {chartData.sundayAttendance.yearlyTrend.map((year, index) => {
                      const x = 10 + (index * 16);
                      const y = 90 - (year.total / 3200) * 50;
                      const prevYear = index > 0 ? chartData.sundayAttendance.yearlyTrend[index - 1] : null;
                      const difference = prevYear ? year.total - prevYear.total : 0;
                      
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="1.2"
                          fill="#10b981"
                          stroke="#ffffff"
                          strokeWidth="0.3"
                          className="cursor-pointer hover:r-2.5 transition-all duration-200"
                          onMouseEnter={(e) => {
                            const rect = e.target.closest('svg').getBoundingClientRect();
                            const graphContainer = e.target.closest('.relative');
                            const containerRect = graphContainer.getBoundingClientRect();
                            
                            const tooltipX = (x / 100 * rect.width);
                            const tooltipY = (y / 100 * rect.height) - 40;
                            
                            setTooltip({
                              show: true,
                              data: { year, index, difference, prevYear, type: 'yearly' },
                              x: containerRect.left + tooltipX,
                              y: containerRect.left + tooltipY
                            });
                          }}
                          onMouseLeave={() => setTooltip({ show: false, data: null, x: 0, y: 0 })}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400" style={{ padding: '0 10px 0px 10px' }}>
                    {chartData.sundayAttendance.yearlyTrend.map((year, index) => (
                      <span key={index} style={{ width: '16%', textAlign: 'center' }}>{year.year}</span>
                    ))}
                  </div>
                </div>
                
                {/* Yearly Trend Analysis */}
                <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-arrow-up text-green-400"></i>
                      <span className="text-white text-sm font-medium">
                        {(() => {
                          const years = chartData.sundayAttendance.yearlyTrend;
                          const firstYear = years[0].total;
                          const lastYear = years[years.length - 1].total;
                          const difference = lastYear - firstYear;
                          const percentage = ((difference / firstYear) * 100).toFixed(1);
                          return `${difference > 0 ? '+' : ''}${difference} (${percentage}%)`;
                        })()}
                      </span>
                    </div>
                    <span className="text-gray-300 text-xs">vs First Year</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    {(() => {
                      const years = chartData.sundayAttendance.yearlyTrend;
                      const firstYear = years[0].total;
                      const lastYear = years[years.length - 1].total;
                      const difference = lastYear - firstYear;
                      return difference > 0 
                        ? `Yearly attendance has increased by ${Math.abs(difference)} people over the years. Excellent long-term growth!`
                        : `Yearly attendance has decreased by ${Math.abs(difference)} people. Consider long-term engagement strategies.`;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Members Database Analytics Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          <i className="fas fa-database text-green-600 mr-3"></i>
          Members Database Analytics
        </h2>

        {/* Members Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-100">Total Members</p>
                <p className="text-2xl font-bold">{chartData.membersDatabase.totalMembers}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-mars text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-100">Male Members</p>
                <p className="text-2xl font-bold">
                  {chartData.membersDatabase.genderDistribution.reduce((sum, item) => sum + item.male, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-venus text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-pink-100">Female Members</p>
                <p className="text-2xl font-bold">
                  {chartData.membersDatabase.genderDistribution.reduce((sum, item) => sum + item.female, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-church text-2xl"></i>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-100">Congregations</p>
                <p className="text-2xl font-bold">{chartData.membersDatabase.congregations.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Members Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Congregation Distribution */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Members by Congregation</h3>
            <div className="space-y-3">
              {chartData.membersDatabase.congregations.map((congregation, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{congregation.name}</span>
                    <span className="text-sm font-bold text-gray-900">{congregation.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${(congregation.count / Math.max(...chartData.membersDatabase.congregations.map(c => c.count))) * 100}%`,
                        backgroundColor: congregation.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution by Congregation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {chartData.membersDatabase.genderDistribution.map((item, index) => (
                <div key={index} className="text-center">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">{item.congregation}</h4>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-mars text-white text-lg"></i>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.male}</div>
                      <div className="text-xs text-gray-500">Male</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-venus text-white text-lg"></i>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.female}</div>
                      <div className="text-xs text-gray-500">Female</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            <i className="fas fa-download mr-2"></i>
            Export Analytics Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
            <i className="fas fa-chart-line mr-2"></i>
            Generate Trend Report
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200">
            <i className="fas fa-file-pdf mr-2"></i>
            Create PDF Report
          </button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-200">
            <i className="fas fa-calendar mr-2"></i>
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}