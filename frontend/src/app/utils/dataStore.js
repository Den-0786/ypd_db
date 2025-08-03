// Centralized data store for managing data flow between local and district pages
class DataStore {
  constructor() {
    this.attendanceRecords = this.loadFromStorage('attendanceRecords') || [];
    this.membersData = this.loadFromStorage('membersData') || [];
    this.analyticsData = this.loadFromStorage('analyticsData') || {};
    this.leaderboardData = this.loadFromStorage('leaderboardData') || {};
    
    // Initialize with sample data if empty
    this.initializeSampleData();
  }

  // Storage utilities
  loadFromStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error);
      return null;
    }
  }

  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  }

  // Attendance Records Management
  addAttendanceRecord(record) {
    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...record
    };
    this.attendanceRecords.push(newRecord);
    this.saveToStorage('attendanceRecords', this.attendanceRecords);
    this.updateAnalytics();
    this.updateLeaderboard();
    return newRecord;
  }

  getAttendanceRecords(filters = {}) {
    let records = [...this.attendanceRecords];
    
    if (filters.congregation) {
      records = records.filter(r => r.congregation === filters.congregation);
    }
    
    if (filters.date) {
      records = records.filter(r => r.date === filters.date);
    }
    
    if (filters.week) {
      records = records.filter(r => r.week === filters.week);
    }
    
    if (filters.month) {
      records = records.filter(r => r.month === filters.month);
    }
    
    if (filters.year) {
      records = records.filter(r => r.year === filters.year);
    }
    
    return records;
  }

  // Members Data Management
  addMember(member) {
    const newMember = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...member
    };
    this.membersData.push(newMember);
    this.saveToStorage('membersData', this.membersData);
    this.updateAnalytics();
    return newMember;
  }

  updateMember(memberId, updates) {
    const index = this.membersData.findIndex(m => m.id === memberId);
    if (index !== -1) {
      this.membersData[index] = { ...this.membersData[index], ...updates };
      this.saveToStorage('membersData', this.membersData);
      this.updateAnalytics();
    }
  }

  deleteMember(memberId) {
    this.membersData = this.membersData.filter(m => m.id !== memberId);
    this.saveToStorage('membersData', this.membersData);
    this.updateAnalytics();
  }

  getMembers(filters = {}) {
    let members = [...this.membersData];
    
    if (filters.congregation) {
      members = members.filter(m => m.congregation === filters.congregation);
    }
    
    if (filters.gender) {
      members = members.filter(m => m.gender === filters.gender);
    }
    
    if (filters.isExecutive !== undefined) {
      members = members.filter(m => m.is_executive === filters.isExecutive);
    }
    
    return members;
  }

  // Analytics Data Management
  updateAnalytics() {
    const analytics = {
      sundayAttendance: this.calculateAttendanceAnalytics(),
      membersDatabase: this.calculateMembersAnalytics(),
      leaderboard: this.calculateLeaderboardData()
    };
    
    this.analyticsData = analytics;
    this.saveToStorage('analyticsData', this.analyticsData);
  }

  calculateAttendanceAnalytics() {
    const records = this.attendanceRecords;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Filter current year records
    const yearRecords = records.filter(r => {
      const recordDate = new Date(r.date);
      return recordDate.getFullYear() === currentYear;
    });

    // Calculate totals
    const totalAttendance = yearRecords.reduce((sum, r) => sum + (r.total || 0), 0);
    const totalMale = yearRecords.reduce((sum, r) => sum + (r.male || 0), 0);
    const totalFemale = yearRecords.reduce((sum, r) => sum + (r.female || 0), 0);

    // Group by congregation
    const congregations = {};
    yearRecords.forEach(record => {
      if (!congregations[record.congregation]) {
        congregations[record.congregation] = {
          total: 0,
          male: 0,
          female: 0,
          records: []
        };
      }
      congregations[record.congregation].total += record.total || 0;
      congregations[record.congregation].male += record.male || 0;
      congregations[record.congregation].female += record.female || 0;
      congregations[record.congregation].records.push(record);
    });

    // Weekly trends
    const weeklyTrend = yearRecords
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-8) // Last 8 weeks
      .map(record => ({
        date: record.date,
        male: record.male || 0,
        female: record.female || 0,
        total: record.total || 0,
        congregation: record.congregation
      }));

    // Monthly trends
    const monthlyTrend = [];
    for (let month = 0; month < 12; month++) {
      const monthRecords = yearRecords.filter(r => {
        const recordDate = new Date(r.date);
        return recordDate.getMonth() === month;
      });
      
      const monthTotal = monthRecords.reduce((sum, r) => sum + (r.total || 0), 0);
      const monthMale = monthRecords.reduce((sum, r) => sum + (r.male || 0), 0);
      const monthFemale = monthRecords.reduce((sum, r) => sum + (r.female || 0), 0);
      
      monthlyTrend.push({
        month: new Date(currentYear, month).toLocaleString('default', { month: 'short' }),
        male: monthMale,
        female: monthFemale,
        total: monthTotal
      });
    }

    return {
      totalAttendance,
      averageAttendance: yearRecords.length > 0 ? totalAttendance / yearRecords.length : 0,
      congregationsCount: Object.keys(congregations).length,
      growth: this.calculateGrowth(yearRecords),
      weeklyTrend,
      monthlyTrend,
      yearlyTrend: [{
        year: currentYear.toString(),
        male: totalMale,
        female: totalFemale,
        total: totalAttendance
      }]
    };
  }

  calculateMembersAnalytics() {
    const members = this.membersData;
    
    // Group by congregation
    const congregations = {};
    members.forEach(member => {
      if (!congregations[member.congregation]) {
        congregations[member.congregation] = {
          count: 0,
          male: 0,
          female: 0,
          executives: 0
        };
      }
      congregations[member.congregation].count++;
      if (member.gender === 'Male') congregations[member.congregation].male++;
      if (member.gender === 'Female') congregations[member.congregation].female++;
      if (member.is_executive) congregations[member.congregation].executives++;
    });

    // Gender distribution
    const genderDistribution = [];
    Object.keys(congregations).forEach(congregation => {
      genderDistribution.push({
        congregation,
        male: congregations[congregation].male,
        female: congregations[congregation].female
      });
    });

    return {
      totalMembers: members.length,
      congregations: Object.keys(congregations).map(name => ({
        name,
        count: congregations[name].count,
        color: this.getCongregationColor(name)
      })),
      genderDistribution
    };
  }

  calculateLeaderboardData() {
    const records = this.attendanceRecords;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = this.getWeekOfMonth(currentDate);

    // Weekly leaderboard
    const weeklyRecords = records.filter(r => {
      const recordDate = new Date(r.date);
      const recordWeek = this.getWeekOfMonth(recordDate);
      return recordDate.getFullYear() === currentYear && 
             recordDate.getMonth() === currentMonth && 
             recordWeek === currentWeek;
    });

    // Monthly leaderboard
    const monthlyRecords = records.filter(r => {
      const recordDate = new Date(r.date);
      return recordDate.getFullYear() === currentYear && 
             recordDate.getMonth() === currentMonth;
    });

    // Group by congregation and calculate totals
    const weeklyLeaderboard = this.calculateLeaderboard(weeklyRecords);
    const monthlyLeaderboard = this.calculateLeaderboard(monthlyRecords);

    return {
      weekly: weeklyLeaderboard,
      monthly: monthlyLeaderboard
    };
  }

  calculateLeaderboard(records) {
    const congregations = {};
    
    records.forEach(record => {
      if (!congregations[record.congregation]) {
        congregations[record.congregation] = {
          male_count: 0,
          female_count: 0,
          total_count: 0
        };
      }
      congregations[record.congregation].male_count += record.male || 0;
      congregations[record.congregation].female_count += record.female || 0;
      congregations[record.congregation].total_count += record.total || 0;
    });

    // Sort by total count and add ranks
    return Object.keys(congregations)
      .map(congregation => ({
        congregation,
        ...congregations[congregation]
      }))
      .sort((a, b) => b.total_count - a.total_count)
      .slice(0, 3)
      .map((item, index) => ({
        ...item,
        rank: index + 1
      }));
  }

  calculateGrowth(records) {
    if (records.length < 2) return 0;
    
    const sortedRecords = records.sort((a, b) => new Date(a.date) - new Date(b.date));
    const recent = sortedRecords.slice(-1)[0];
    const previous = sortedRecords.slice(-2)[0];
    
    if (!recent || !previous) return 0;
    
    const recentTotal = recent.total || 0;
    const previousTotal = previous.total || 0;
    
    if (previousTotal === 0) return 0;
    
    return ((recentTotal - previousTotal) / previousTotal) * 100;
  }

  getWeekOfMonth(date) {
    const d = new Date(date);
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    return Math.ceil((d.getDate() + firstDay.getDay()) / 7);
  }

  getCongregationColor(congregationName) {
    const colors = [
      "#3B82F6", "#10B981", "#F59E0B", "#EF4444", 
      "#8B5CF6", "#06B6D4", "#F97316", "#EC4899"
    ];
    const index = congregationName.length % colors.length;
    return colors[index];
  }

  // Get analytics data
  getAnalyticsData() {
    return this.analyticsData;
  }

  // Get leaderboard data
  getLeaderboardData(type = 'weekly') {
    return this.analyticsData.leaderboard?.[type] || [];
  }

  // Initialize sample data for demonstration
  initializeSampleData() {
    // Only initialize if no data exists
    if (this.membersData.length === 0) {
      const sampleMembers = [
        {
          id: 1,
          name: "John Doe",
          gender: "Male",
          congregation: "Emmanuel Congregation Ahinsan",
          is_executive: true,
          status: "Active",
          phone: "0201234567",
          email: "john.doe@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          name: "Jane Smith",
          gender: "Female",
          congregation: "Emmanuel Congregation Ahinsan",
          is_executive: false,
          status: "Active",
          phone: "0202345678",
          email: "jane.smith@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 3,
          name: "Mike Johnson",
          gender: "Male",
          congregation: "Peniel Congregation Esreso No1",
          is_executive: true,
          status: "Active",
          phone: "0203456789",
          email: "mike.johnson@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 4,
          name: "Sarah Wilson",
          gender: "Female",
          congregation: "Mizpah Congregation Odagya No1",
          is_executive: false,
          status: "Active",
          phone: "0204567890",
          email: "sarah.wilson@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 5,
          name: "David Brown",
          gender: "Male",
          congregation: "Christ Congregation Ahinsan Estate",
          is_executive: false,
          status: "Active",
          phone: "0205678901",
          email: "david.brown@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 6,
          name: "Mary Johnson",
          gender: "Female",
          congregation: "Ebenezer Congregation Dompoase Aprabo",
          is_executive: true,
          status: "Active",
          phone: "0206789012",
          email: "mary.johnson@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 7,
          name: "James Wilson",
          gender: "Male",
          congregation: "Favour Congregation Esreso No2",
          is_executive: false,
          status: "Active",
          phone: "0207890123",
          email: "james.wilson@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 8,
          name: "Sarah Davis",
          gender: "Female",
          congregation: "Liberty Congregation Esreso High Tension",
          is_executive: true,
          status: "Active",
          phone: "0208901234",
          email: "sarah.davis@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 9,
          name: "Robert Miller",
          gender: "Male",
          congregation: "Odagya No2",
          is_executive: false,
          status: "Active",
          phone: "0209012345",
          email: "robert.miller@example.com",
          timestamp: new Date().toISOString()
        },
        {
          id: 10,
          name: "Lisa Garcia",
          gender: "Female",
          congregation: "NOM",
          is_executive: true,
          status: "Active",
          phone: "0200123456",
          email: "lisa.garcia@example.com",
          timestamp: new Date().toISOString()
        }
      ];
      
      this.membersData = sampleMembers;
      this.saveToStorage('membersData', this.membersData);
    }

    // Initialize sample attendance records if empty
    if (this.attendanceRecords.length === 0) {
      const currentDate = new Date();
      const congregations = [
        "Emmanuel Congregation Ahinsan",
        "Peniel Congregation Esreso No1", 
        "Mizpah Congregation Odagya No1",
        "Christ Congregation Ahinsan Estate",
        "Ebenezer Congregation Dompoase Aprabo",
        "Favour Congregation Esreso No2",
        "Liberty Congregation Esreso High Tension",
        "Odagya No2",
        "NOM",
        "Kokobriko"
      ];
      
      const sampleAttendance = [];
      let recordId = 1;
      
             // Generate data for each congregation for the current month (4 weeks)
       congregations.forEach((congregation, index) => {
         for (let week = 1; week <= 4; week++) {
           const maleCount = 30 + Math.floor(Math.random() * 20) + (index * 2); // Vary by congregation
           const femaleCount = 25 + Math.floor(Math.random() * 15) + (index * 2);
           const total = maleCount + femaleCount;
           
           // Calculate current Sunday and past Sundays
           const today = new Date();
           const day = today.getDay();
           const diff = today.getDate() - day + (day === 0 ? 0 : 7);
           const currentSunday = new Date(today.setDate(diff));
           
           // Generate dates for past weeks including current Sunday
           const recordDate = new Date(currentSunday);
           recordDate.setDate(currentSunday.getDate() - ((week - 1) * 7));
           
           sampleAttendance.push({
             id: recordId++,
             date: recordDate.toISOString().split('T')[0],
             congregation: congregation,
             male: maleCount,
             female: femaleCount,
             total: total,
             week: week,
             month: currentDate.toLocaleString("default", { month: "long" }),
          year: currentDate.getFullYear(),
          timestamp: new Date().toISOString()
           });
         }
        
                 // Generate data for previous month (4 weeks)
         for (let week = 1; week <= 4; week++) {
           const maleCount = 28 + Math.floor(Math.random() * 18) + (index * 2);
           const femaleCount = 23 + Math.floor(Math.random() * 14) + (index * 2);
           const total = maleCount + femaleCount;
           
           // Calculate Sundays for previous month
           const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
           const prevMonthDay = prevMonthDate.getDay();
           const prevMonthDiff = prevMonthDate.getDate() - prevMonthDay + (prevMonthDay === 0 ? 0 : 7);
           const prevMonthSunday = new Date(prevMonthDate.setDate(prevMonthDiff));
           
           // Generate dates for previous month weeks
           const recordDate = new Date(prevMonthSunday);
           recordDate.setDate(prevMonthSunday.getDate() - ((week - 1) * 7));
           
           sampleAttendance.push({
             id: recordId++,
             date: recordDate.toISOString().split('T')[0],
             congregation: congregation,
             male: maleCount,
             female: femaleCount,
             total: total,
             week: week,
             month: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1).toLocaleString("default", { month: "long" }),
          year: currentDate.getFullYear(),
          timestamp: new Date().toISOString()
           });
         }
        
                 // Generate data for 2 months ago (4 weeks)
         for (let week = 1; week <= 4; week++) {
           const maleCount = 26 + Math.floor(Math.random() * 16) + (index * 2);
           const femaleCount = 21 + Math.floor(Math.random() * 13) + (index * 2);
           const total = maleCount + femaleCount;
           
           // Calculate Sundays for 2 months ago
           const twoMonthsAgoDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
           const twoMonthsAgoDay = twoMonthsAgoDate.getDay();
           const twoMonthsAgoDiff = twoMonthsAgoDate.getDate() - twoMonthsAgoDay + (twoMonthsAgoDay === 0 ? 0 : 7);
           const twoMonthsAgoSunday = new Date(twoMonthsAgoDate.setDate(twoMonthsAgoDiff));
           
           // Generate dates for 2 months ago weeks
           const recordDate = new Date(twoMonthsAgoSunday);
           recordDate.setDate(twoMonthsAgoSunday.getDate() - ((week - 1) * 7));
           
           sampleAttendance.push({
             id: recordId++,
             date: recordDate.toISOString().split('T')[0],
             congregation: congregation,
             male: maleCount,
             female: femaleCount,
             total: total,
             week: week,
             month: new Date(currentDate.getFullYear(), currentDate.getMonth() - 2).toLocaleString("default", { month: "long" }),
          year: currentDate.getFullYear(),
          timestamp: new Date().toISOString()
           });
         }
      });
      
      this.attendanceRecords = sampleAttendance;
      this.saveToStorage('attendanceRecords', this.attendanceRecords);
    }

    // Update analytics with sample data
    this.updateAnalytics();
  }

  // Clear all data (for testing)
  clearAllData() {
    this.attendanceRecords = [];
    this.membersData = [];
    this.analyticsData = {};
    this.leaderboardData = {};
    localStorage.clear();
  }

  // Force regenerate mockup data
  regenerateMockupData() {
    localStorage.clear();
    this.attendanceRecords = [];
    this.membersData = [];
    this.analyticsData = {};
    this.leaderboardData = {};
    this.initializeSampleData();
  }
}

// Create singleton instance
const dataStore = new DataStore();

export default dataStore; 