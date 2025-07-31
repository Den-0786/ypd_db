
/**
 * Calculate weekly winners from attendance data
 * @param {Array} attendanceRecords 
 * @param {Date} targetDate 
 * @returns {Array} 
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
 * @param {Array} attendanceRecords 
 * @param {Date} targetMonth 
 * @returns {Array} 
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
 * @param {Array} monthlyWinners 
 * @returns {Array} 
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
 * @param {Date} currentDate 
 * @returns {Date} 
 */
export function getPreviousSunday(currentDate = new Date()) {
  const date = new Date(currentDate);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -7 : 0); 
  return new Date(date.setDate(diff));
}

/**
 
 * @param {Date} currentDate 
 * @returns {Date} 
 */
export function getPreviousMonth(currentDate = new Date()) {
  const date = new Date(currentDate);
  date.setMonth(date.getMonth() - 1);
  return date;
}

/**

 * @param {Date} currentDate 
 * @returns {boolean} 
 */
export function shouldUpdateWeeklyLeaderboard(currentDate = new Date()) {
  const now = new Date(currentDate);
  const dayOfWeek = now.getDay(); 
  const hour = now.getHours();

  return dayOfWeek === 1 && hour >= 10; 
}

/**
 
 * @param {Date} currentDate 
 */

export function shouldUpdateMonthlyLeaderboard(currentDate = new Date()) {
  const now = new Date(currentDate);
  const dayOfMonth = now.getDate();
  const hour = now.getHours();

  return dayOfMonth === 1 && hour >= 10; 
}

/**
 
 * @param {Date} currentDate
 * @returns {boolean} 
 */
export function shouldUpdateAnnualLeaderboard(currentDate = new Date()) {
  const now = new Date(currentDate);
  const month = now.getMonth(); 
  const dayOfMonth = now.getDate();
  const hour = now.getHours();

  return month === 11 && dayOfMonth === 31 && hour >= 10; 
}

/**

 * @param {Date} lastUpdateDate 
 * @param {string} type 
 * @param {Date} currentDate 
 * @returns {boolean} 
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
    return diffDays >= 2; 
  } else if (type === "monthly") {
    return diffDays >= 5;
  }

  return false;
}

/**
 * Format date for display
 * @param {Date} date 
 * @param {string} type 
 * @returns {string} 
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
