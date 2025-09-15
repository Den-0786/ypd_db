// Congregation-specific authentication system (updated to match actual database IDs)
const congregationCredentials = {
  "Emmanuel Congregation Ahinsan": {
    username: "emmanuel",
    password: "emmanuel123",
    id: "2",
  },
  "Peniel Congregation Esreso No1": {
    username: "peniel",
    password: "peniel123",
    id: "3",
  },
  "District Admin": {
    username: "district_admin",
    password: "district2024",
    id: "1",
  },
  "Mizpah Congregation Odagya No1": {
    username: "mizpah_odagya1",
    password: "mizpah2024",
    id: "4",
  },
  "Christ Congregation Ahinsan Estate": {
    username: "christ_ahinsan",
    password: "christ2024",
    id: "5",
  },
  "Ebenezer Congregation Dompoase Aprabo": {
    username: "ebenezer_dompoase",
    password: "ebenezer2024",
    id: "6",
  },
  "Favour Congregation Esreso No2": {
    username: "favour_esreso2",
    password: "favour2024",
    id: "7",
  },
  "Liberty Congregation Esreso High Tension": {
    username: "liberty_esreso",
    password: "liberty2024",
    id: "8",
  },
  "Odagya No2": {
    username: "odagya2",
    password: "odagya2024",
    id: "9",
  },
  NOM: {
    username: "nom_congregation",
    password: "nom2024",
    id: "10",
  },
  Kokobriko: {
    username: "kokobriko",
    password: "kokobriko2024",
    id: "11",
  },
};

// Function to authenticate congregation
export const authenticateCongregation = (username, password) => {
  for (const [congregationName, credentials] of Object.entries(
    congregationCredentials
  )) {
    if (
      credentials.username === username &&
      credentials.password === password
    ) {
      return {
        success: true,
        congregation: {
          id: credentials.id,
          name: congregationName,
          username: credentials.username,
        },
      };
    }
  }

  return {
    success: false,
    message: "Invalid username or password",
  };
};

// Function to get congregation by ID
export const getCongregationById = (id) => {
  for (const [congregationName, credentials] of Object.entries(
    congregationCredentials
  )) {
    if (credentials.id === id) {
      return {
        id: credentials.id,
        name: congregationName,
        username: credentials.username,
      };
    }
  }
  return null;
};

// Function to get all congregations for display
export const getAllCongregations = () => {
  return Object.entries(congregationCredentials).map(([name, credentials]) => ({
    id: credentials.id,
    name: name,
    username: credentials.username,
  }));
};

// Function to validate if user is logged in to specific congregation
export const validateCongregationAccess = (congregationId) => {
  const storedCongregationId = localStorage.getItem("congregationId");
  const storedCongregationName = localStorage.getItem("congregationName");

  if (!storedCongregationId || !storedCongregationName) {
    return false;
  }

  const congregation = getCongregationById(congregationId);
  if (!congregation) {
    return false;
  }

  return (
    storedCongregationId === congregationId &&
    storedCongregationName === congregation.name
  );
};

export default {
  authenticateCongregation,
  getCongregationById,
  getAllCongregations,
  validateCongregationAccess,
};
