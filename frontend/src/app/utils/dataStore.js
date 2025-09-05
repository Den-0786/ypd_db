// Centralized data store for managing data flow between local and district pages
class DataStore {
  constructor() {
    // Check if we're in the browser environment
    this.isClient = typeof window !== "undefined";

    this.attendanceRecords = this.loadFromStorage("attendanceRecords") || [];
    this.membersData = this.loadFromStorage("membersData") || [];
    this.analyticsData = this.loadFromStorage("analyticsData") || {};
    this.leaderboardData = this.loadFromStorage("leaderboardData") || {};

    // Initialize with some mock data if no data exists
    if (this.membersData.length === 0) {
      this.initializeMockData();
    }
  }

  // Initialize with mock data for demonstration
  initializeMockData() {
    this.membersData = [
      {
        id: 1,
        name: "John Doe",
        phone: "+233123456789",
        email: "john@example.com",
        gender: "Male",
        congregation: "Ahinsan Central",
        status: "Active",
        is_executive: true,
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Jane Smith",
        phone: "+233987654321",
        email: "jane@example.com",
        gender: "Female",
        congregation: "Ahinsan Central",
        status: "Active",
        is_executive: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Michael Johnson",
        phone: "+233555666777",
        email: "michael@example.com",
        gender: "Male",
        congregation: "Ahinsan North",
        status: "Active",
        is_executive: true,
        timestamp: new Date().toISOString(),
      },
      {
        id: 4,
        name: "Sarah Wilson",
        phone: "+233444555666",
        email: "sarah@example.com",
        gender: "Female",
        congregation: "Ahinsan South",
        status: "Active",
        is_executive: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: 5,
        name: "David Brown",
        phone: "+233777888999",
        email: "david@example.com",
        gender: "Male",
        congregation: "Ahinsan East",
        status: "Active",
        is_executive: true,
        timestamp: new Date().toISOString(),
      },
    ];

    this.attendanceRecords = [
      {
        id: 1,
        date: "2024-01-07",
        male: 25,
        female: 30,
        total: 55,
        congregation: "Ahinsan Central",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        date: "2024-01-14",
        male: 28,
        female: 32,
        total: 60,
        congregation: "Ahinsan Central",
        timestamp: new Date().toISOString(),
      },
      {
        id: 3,
        date: "2024-01-21",
        male: 30,
        female: 35,
        total: 65,
        congregation: "Ahinsan Central",
        timestamp: new Date().toISOString(),
      },
    ];

    this.saveToStorage("membersData", this.membersData);
    this.saveToStorage("attendanceRecords", this.attendanceRecords);
  }

  // Storage utilities
  loadFromStorage(key) {
    if (!this.isClient) {
      return null;
    }

    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error);
      return null;
    }
  }

  saveToStorage(key, data) {
    if (!this.isClient) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  }

  // Attendance Records Management
  async addAttendanceRecord(record) {
    try {
      const response = await fetch("/api/attendance/log/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: record.date,
          male_count: record.male,
          female_count: record.female,
          congregation: record.congregation,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Also add to local storage for immediate UI updates
        const newRecord = {
          id: data.attendance_id,
          timestamp: new Date().toISOString(),
          ...record,
        };
        this.attendanceRecords.push(newRecord);
        this.saveToStorage("attendanceRecords", this.attendanceRecords);
        this.updateAnalytics();
        this.updateLeaderboard();
        return newRecord;
      } else {
        throw new Error(data.error || "Failed to log attendance");
      }
    } catch (error) {
      console.error("Error logging attendance:", error);
      throw error;
    }
  }

  async getAttendanceRecords(filters = {}) {
    try {
      // Try to get from API first
      let url = "http://localhost:8001/api/attendance/records/";
      const params = new URLSearchParams();

      if (filters.congregation) {
        params.append("congregation", filters.congregation);
      }
      if (filters.date_from) {
        params.append("date_from", filters.date_from);
      }
      if (filters.date_to) {
        params.append("date_to", filters.date_to);
      }

      if (params.toString()) {
        url += "?" + params.toString();
      }

      const response = await fetch(url);

      if (!response.ok) {
        console.warn(
          `Attendance records API request failed with status ${response.status}, using local data`
        );
        return this.getLocalAttendanceRecords(filters);
      }

      const data = await response.json();

      if (data.success && data.records && Array.isArray(data.records)) {
        // Update local storage with API data
        this.attendanceRecords = data.records.map((record) => ({
          id: record.id,
          date: record.date,
          male: record.male_count,
          female: record.female_count,
          total: record.total_count,
          congregation: record.congregation,
          timestamp: record.created_at || new Date().toISOString(),
        }));
        this.saveToStorage("attendanceRecords", this.attendanceRecords);
        return this.attendanceRecords;
      } else {
        // Fallback to local storage
        console.warn(
          "API returned invalid data, using local data:",
          data.error
        );
        return this.getLocalAttendanceRecords(filters);
      }
    } catch (error) {
      console.warn(
        "Error fetching attendance records from API, using local data:",
        error.message
      );
      // Fallback to local storage
      return this.getLocalAttendanceRecords(filters);
    }
  }

  getLocalAttendanceRecords(filters = {}) {
    let records = [...this.attendanceRecords];

    if (filters.congregation) {
      records = records.filter((r) => r.congregation === filters.congregation);
    }

    if (filters.date) {
      records = records.filter((r) => r.date === filters.date);
    }

    if (filters.week) {
      records = records.filter((r) => r.week === filters.week);
    }

    if (filters.month) {
      records = records.filter((r) => r.month === filters.month);
    }

    if (filters.year) {
      records = records.filter((r) => r.year === filters.year);
    }

    return records;
  }

  // Members Data Management
  async addMember(member) {
    try {
      const requestData = {
        first_name: member.name.split(" ")[0],
        last_name: member.name.split(" ").slice(1).join(" ") || "",
        phone_number: member.phone_number || member.phone,
        email: member.email || "",
        gender: member.gender,
        congregation: member.congregation,
        membership_status:
          member.membership_status || member.status || "Active",
        is_executive: member.is_executive || false,
        executive_position: member.is_executive ? member.position : "",
        executive_level: member.is_executive ? "local" : "",
        date_of_birth: member.date_of_birth || "1990-01-01",
        place_of_residence: member.place_of_residence || "Accra",
        residential_address:
          member.residential_address || "123 Main Street, Accra",
        hometown: member.hometown || "Accra",
      };

      const response = await fetch("/api/members/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success) {
        // Also add to local storage for immediate UI updates
        const newMember = {
          id: data.member_id,
          timestamp: new Date().toISOString(),
          ...member,
        };
        this.membersData.push(newMember);
        this.saveToStorage("membersData", this.membersData);
        this.updateAnalytics();
        return newMember;
      } else {
        // API Error occurred
        throw new Error(data.error || data.errors || "Failed to add member");
      }
    } catch (error) {
      console.error(
        "Error adding member via API, falling back to local storage:",
        error
      );

      // Fallback to local storage if API fails
      const newMember = {
        id: Date.now(), // Generate a temporary ID
        timestamp: new Date().toISOString(),
        ...member,
      };
      this.membersData.push(newMember);
      this.saveToStorage("membersData", this.membersData);
      this.updateAnalytics();
      return newMember;
    }
  }

  async getMembers(filters = {}) {
    try {
      // Try to get from API first
      let url = "http://localhost:8001/api/members/";
      const params = new URLSearchParams();

      // Note: API expects congregation_id, but we're sending congregation name
      // For now, we'll get all members and filter on the frontend
      if (filters.search) {
        params.append("search", filters.search);
      }

      if (params.toString()) {
        url += "?" + params.toString();
      }

      const response = await fetch(url);

      if (!response.ok) {
        console.warn(
          `API request failed with status ${response.status}, falling back to local data`
        );
        return this.getLocalMembers(filters);
      }

      const data = await response.json();

      if (data.members && Array.isArray(data.members)) {
        // Update local storage with API data
        let members = data.members.map((member) => ({
          id: member.id,
          name: `${member.first_name} ${member.last_name}`,
          phone: member.phone_number,
          email: member.email || "",
          gender: member.gender || "Male",
          congregation: member.congregation,
          status: member.membership_status || "Active",
          is_executive: false, // Would need to be determined from executive fields
          timestamp: new Date().toISOString(),
        }));

        // Filter by congregation name on the frontend
        if (filters.congregation) {
          members = members.filter(
            (m) => m.congregation === filters.congregation
          );
        }

        this.membersData = members;
        this.saveToStorage("membersData", this.membersData);
        return this.membersData;
      } else {
        // Fallback to local storage
        console.warn("API returned invalid data, using local data");
        return this.getLocalMembers(filters);
      }
    } catch (error) {
      console.warn(
        "Error fetching members from API, using local data:",
        error.message
      );
      // Fallback to local storage
      return this.getLocalMembers(filters);
    }
  }

  getLocalMembers(filters = {}) {
    let members = [...this.membersData];

    if (filters.congregation) {
      members = members.filter((m) => m.congregation === filters.congregation);
    }

    if (filters.gender) {
      members = members.filter((m) => m.gender === filters.gender);
    }

    if (filters.isExecutive !== undefined) {
      members = members.filter((m) => m.is_executive === filters.isExecutive);
    }

    return members;
  }

  // Analytics Data Management
  updateAnalytics() {
    const analytics = {
      sundayAttendance: this.calculateAttendanceAnalytics(),
      membersDatabase: this.calculateMembersAnalytics(),
      leaderboard: this.calculateLeaderboardData(),
    };

    this.analyticsData = analytics;
    this.saveToStorage("analyticsData", this.analyticsData);
  }

  calculateAttendanceAnalytics() {
    const records = this.attendanceRecords;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Filter current year records
    const yearRecords = records.filter((r) => {
      const recordDate = new Date(r.date);
      return recordDate.getFullYear() === currentYear;
    });

    // Calculate totals
    const totalAttendance = yearRecords.reduce(
      (sum, r) => sum + (r.total || 0),
      0
    );
    const totalMale = yearRecords.reduce((sum, r) => sum + (r.male || 0), 0);
    const totalFemale = yearRecords.reduce(
      (sum, r) => sum + (r.female || 0),
      0
    );

    // Group by congregation
    const congregations = {};
    yearRecords.forEach((record) => {
      if (!congregations[record.congregation]) {
        congregations[record.congregation] = {
          total: 0,
          male: 0,
          female: 0,
          records: [],
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
      .map((record) => ({
        date: record.date,
        male: record.male || 0,
        female: record.female || 0,
        total: record.total || 0,
        congregation: record.congregation,
      }));

    // Monthly trends
    const monthlyTrend = [];
    for (let month = 0; month < 12; month++) {
      const monthRecords = yearRecords.filter((r) => {
        const recordDate = new Date(r.date);
        return recordDate.getMonth() === month;
      });

      const monthTotal = monthRecords.reduce(
        (sum, r) => sum + (r.total || 0),
        0
      );
      const monthMale = monthRecords.reduce((sum, r) => sum + (r.male || 0), 0);
      const monthFemale = monthRecords.reduce(
        (sum, r) => sum + (r.female || 0),
        0
      );

      monthlyTrend.push({
        month: new Date(currentYear, month).toLocaleString("default", {
          month: "short",
        }),
        male: monthMale,
        female: monthFemale,
        total: monthTotal,
      });
    }

    return {
      totalAttendance,
      averageAttendance:
        yearRecords.length > 0 ? totalAttendance / yearRecords.length : 0,
      congregationsCount: Object.keys(congregations).length,
      growth: this.calculateGrowth(yearRecords),
      weeklyTrend,
      monthlyTrend,
      yearlyTrend: [
        {
          year: currentYear.toString(),
          male: totalMale,
          female: totalFemale,
          total: totalAttendance,
        },
      ],
    };
  }

  calculateMembersAnalytics() {
    const members = this.membersData;

    // Group by congregation
    const congregations = {};
    members.forEach((member) => {
      if (!congregations[member.congregation]) {
        congregations[member.congregation] = {
          count: 0,
          male: 0,
          female: 0,
          executives: 0,
        };
      }
      congregations[member.congregation].count++;
      if (member.gender === "Male") congregations[member.congregation].male++;
      if (member.gender === "Female")
        congregations[member.congregation].female++;
      if (member.is_executive) congregations[member.congregation].executives++;
    });

    // Gender distribution
    const genderDistribution = [];
    Object.keys(congregations).forEach((congregation) => {
      genderDistribution.push({
        congregation,
        male: congregations[congregation].male,
        female: congregations[congregation].female,
      });
    });

    return {
      totalMembers: members.length,
      congregations: Object.keys(congregations).map((name) => ({
        name,
        count: congregations[name].count,
        color: this.getCongregationColor(name),
      })),
      genderDistribution,
    };
  }

  calculateLeaderboardData() {
    const records = this.attendanceRecords;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = this.getWeekOfMonth(currentDate);

    // Weekly leaderboard
    const weeklyRecords = records.filter((r) => {
      const recordDate = new Date(r.date);
      const recordWeek = this.getWeekOfMonth(recordDate);
      return (
        recordDate.getFullYear() === currentYear &&
        recordDate.getMonth() === currentMonth &&
        recordWeek === currentWeek
      );
    });

    // Monthly leaderboard
    const monthlyRecords = records.filter((r) => {
      const recordDate = new Date(r.date);
      return (
        recordDate.getFullYear() === currentYear &&
        recordDate.getMonth() === currentMonth
      );
    });

    // Group by congregation and calculate totals
    const weeklyLeaderboard = this.calculateLeaderboard(weeklyRecords);
    const monthlyLeaderboard = this.calculateLeaderboard(monthlyRecords);

    return {
      weekly: weeklyLeaderboard,
      monthly: monthlyLeaderboard,
    };
  }

  calculateLeaderboard(records) {
    const congregations = {};

    records.forEach((record) => {
      if (!congregations[record.congregation]) {
        congregations[record.congregation] = {
          male_count: 0,
          female_count: 0,
          total_count: 0,
        };
      }
      congregations[record.congregation].male_count += record.male || 0;
      congregations[record.congregation].female_count += record.female || 0;
      congregations[record.congregation].total_count += record.total || 0;
    });

    // Sort by total count and add ranks
    return Object.keys(congregations)
      .map((congregation) => ({
        congregation,
        ...congregations[congregation],
      }))
      .sort((a, b) => b.total_count - a.total_count)
      .slice(0, 3)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  }

  calculateGrowth(records) {
    if (records.length < 2) return 0;

    const sortedRecords = records.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
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
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#06B6D4",
      "#F97316",
      "#EC4899",
    ];
    const index = congregationName.length % colors.length;
    return colors[index];
  }

  // Get analytics data
  getAnalyticsData() {
    return this.analyticsData;
  }

  // Get leaderboard data
  getLeaderboardData(type = "weekly") {
    return this.analyticsData.leaderboard?.[type] || [];
  }

  // Fetch real data from API for home page
  async fetchHomeStats() {
    if (!this.isClient) {
      return null;
    }

    try {
      // Use the Django backend URL directly
      const response = await fetch("http://localhost:8001/api/home-stats/");

      if (!response.ok) {
        console.warn(
          `Home stats API request failed with status ${response.status}`
        );
        return null;
      }

      const data = await response.json();

      if (data.success && data.data) {
        return data.data;
      } else {
        console.warn("Home stats API returned invalid data");
        return null;
      }
    } catch (error) {
      console.warn("Error fetching home stats from API:", error.message);
      return null;
    }
  }

  // Clear all data (for testing)
  clearAllData() {
    this.attendanceRecords = [];
    this.membersData = [];
    this.analyticsData = {};
    this.leaderboardData = {};
    localStorage.clear();
  }
}

// Create singleton instance with lazy initialization
let dataStoreInstance = null;

const getDataStore = () => {
  if (typeof window === "undefined") {
    // Return a mock instance for SSR
    return {
      attendanceRecords: [],
      membersData: [],
      analyticsData: {},
      leaderboardData: {},
      getMembers: () => [],
      getAttendanceRecords: () => [],
      getAnalyticsData: () => ({}),
      getLeaderboardData: () => ({}),
      addAttendanceRecord: () => {},
      addMember: () => {},
      updateMember: () => {},
      deleteMember: () => {},
      updateAnalytics: () => {},
      clearAllData: () => {},
    };
  }

  if (!dataStoreInstance) {
    dataStoreInstance = new DataStore();
  }

  return dataStoreInstance;
};

// Export a function that returns the dataStore instance
export default getDataStore;
