// Leaderboard utility functions for frontend calculations and scheduling

/**
 * Calculate weekly winners from attendance data
 * @param {Array} attendanceRecords - Array of attendance records
 * @param {Date} targetDate - The Sunday date to calculate for
 * @returns {Array} Top 3 congregations with their attendance data
 */
export function calculateWeeklyWinners(attendanceRecords, targetDate) {
  // Get the Sunday date (targetDate should be a Sunday)
  const sundayDate = new Date(targetDate);

  // Filter records for the specific Sunday
  const sundayRecords = attendanceRecords.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate.toDateString() === sundayDate.toDateString();
  });

  // Group by congregation and sum attendance
  const congregationTotals = {};

  sundayRecords.forEach((record) => {
    const congregationName = record.congregation.name;

    if (!congregationTotals[congregationName]) {
      congregationTotals[congregationName] = {
        congregation: congregationName,
        male_count: 0,
        female_count: 0,
        total_count: 0,
      };
    }

    congregationTotals[congregationName].male_count += record.male_count;
    congregationTotals[congregationName].female_count += record.female_count;
    congregationTotals[congregationName].total_count += record.total_count;
  });

  // Convert to array and sort by total attendance
  const sortedCongregations = Object.values(congregationTotals)
    .sort((a, b) => b.total_count - a.total_count)
    .slice(0, 3)
    .map((congregation, index) => ({
      ...congregation,
      rank: index + 1,
    }));

  return sortedCongregations;
}

/**
 * Calculate monthly winners from attendance data
 * @param {Array} attendanceRecords - Array of attendance records
 * @param {Date} targetMonth - The month to calculate for
 * @returns {Array} Top 3 congregations with their attendance data
 */
export function calculateMonthlyWinners(attendanceRecords, targetMonth) {
  const startOfMonth = new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth() + 1,
    0
  );

  // Filter records for the specific month
  const monthRecords = attendanceRecords.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= startOfMonth && recordDate <= endOfMonth;
  });

  // Group by congregation and sum attendance
  const congregationTotals = {};

  monthRecords.forEach((record) => {
    const congregationName = record.congregation.name;

    if (!congregationTotals[congregationName]) {
      congregationTotals[congregationName] = {
        congregation: congregationName,
        male_count: 0,
        female_count: 0,
        total_count: 0,
      };
    }

    congregationTotals[congregationName].male_count += record.male_count;
    congregationTotals[congregationName].female_count += record.female_count;
    congregationTotals[congregationName].total_count += record.total_count;
  });

  // Convert to array and sort by total attendance
  const sortedCongregations = Object.values(congregationTotals)
    .sort((a, b) => b.total_count - a.total_count)
    .slice(0, 3)
    .map((congregation, index) => ({
      ...congregation,
      rank: index + 1,
    }));

  return sortedCongregations;
}

/**
 * Calculate annual winners from monthly winners data
 * @param {Array} monthlyWinners - Array of monthly winners for the year
 * @returns {Array} Annual winners with win counts and months
 */
export function calculateAnnualWinners(monthlyWinners) {
  const congregationWins = {};

  // Count wins for each congregation
  monthlyWinners.forEach((monthData) => {
    monthData.winners.forEach((winner) => {
      const congregationName = winner.congregation;

      if (!congregationWins[congregationName]) {
        congregationWins[congregationName] = {
          congregation: congregationName,
          wins: 0,
          months: [],
          total_attendance: 0,
        };
      }

      congregationWins[congregationName].wins += 1;
      congregationWins[congregationName].months.push(monthData.month);
      congregationWins[congregationName].total_attendance += winner.total_count;
    });
  });

  // Convert to array and sort by wins, then by total attendance
  const sortedCongregations = Object.values(congregationWins)
    .sort((a, b) => {
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }
      return b.total_attendance - a.total_attendance;
    })
    .map((congregation, index) => ({
      ...congregation,
      rank: index + 1,
    }));

  return sortedCongregations;
}

/**
 * Get the previous week's Sunday date
 * @param {Date} currentDate - Current date
 * @returns {Date} Previous Sunday's date
 */
export function getPreviousSunday(currentDate = new Date()) {
  const date = new Date(currentDate);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -7 : 0); // Previous Sunday
  return new Date(date.setDate(diff));
}

/**
 * Get the previous month's date
 * @param {Date} currentDate - Current date
 * @returns {Date} Previous month's date
 */
export function getPreviousMonth(currentDate = new Date()) {
  const date = new Date(currentDate);
  date.setMonth(date.getMonth() - 1);
  return date;
}

/**
 * Check if it's time to update weekly leaderboard (Monday 10:00 AM)
 * @param {Date} currentDate - Current date
 * @returns {boolean} True if it's time to update
 */
export function shouldUpdateWeeklyLeaderboard(currentDate = new Date()) {
  const now = new Date(currentDate);
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday
  const hour = now.getHours();

  return dayOfWeek === 1 && hour >= 10; // Monday 10:00 AM or later
}

/**
 * Check if it's time to update monthly leaderboard (1st of month 10:00 AM)
 * @param {Date} currentDate - Current date
 * @returns {boolean} True if it's time to update
 */
export function shouldUpdateMonthlyLeaderboard(currentDate = new Date()) {
  const now = new Date(currentDate);
  const dayOfMonth = now.getDate();
  const hour = now.getHours();

  return dayOfMonth === 1 && hour >= 10; // 1st of month 10:00 AM or later
}

/**
 * Check if it's time to update annual leaderboard (December 31st 10:00 AM)
 * @param {Date} currentDate - Current date
 * @returns {boolean} True if it's time to update
 */
export function shouldUpdateAnnualLeaderboard(currentDate = new Date()) {
  const now = new Date(currentDate);
  const month = now.getMonth(); // 0-11 (December = 11)
  const dayOfMonth = now.getDate();
  const hour = now.getHours();

  return month === 11 && dayOfMonth === 31 && hour >= 10; // December 31st 10:00 AM or later
}

/**
 * Check if comparison data should be removed (2 days after weekly update, 5 days after monthly update)
 * @param {Date} lastUpdateDate - Date of last leaderboard update
 * @param {string} type - 'weekly' or 'monthly'
 * @param {Date} currentDate - Current date
 * @returns {boolean} True if comparison should be removed
 */
export function shouldRemoveComparison(
  lastUpdateDate,
  type,
  currentDate = new Date()
) {
  const lastUpdate = new Date(lastUpdateDate);
  const now = new Date(currentDate);
  const diffTime = now - lastUpdate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (type === "weekly") {
    return diffDays >= 2; // Remove after 2 days
  } else if (type === "monthly") {
    return diffDays >= 5; // Remove after 5 days
  }

  return false;
}

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @param {string} type - 'weekly' or 'monthly'
 * @returns {string} Formatted date string
 */
export function formatLeaderboardDate(date, type) {
  const d = new Date(date);

  if (type === "weekly") {
    const startOfWeek = new Date(d);
    startOfWeek.setDate(d.getDate() - d.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  } else if (type === "monthly") {
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  return d.toLocaleDateString();
}
