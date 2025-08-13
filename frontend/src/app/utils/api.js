// API Configuration and utility functions for Dashboard
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Generic API request function with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error occurred",
    };
  }
};

// Quiz API functions
export const quizAPI = {
  // Get active quiz
  getActiveQuiz: () => apiRequest("/api/quizzes/active/"),

  // Get all quizzes
  getQuizzes: () => apiRequest("/api/quizzes/"),

  // Get quiz results
  getQuizResults: () => apiRequest("/api/quizzes/results/"),

  // Create quiz
  createQuiz: (quizData) =>
    apiRequest("/api/quizzes/create/", {
      method: "POST",
      body: JSON.stringify(quizData),
    }),

  // End quiz
  endQuiz: (quizId) =>
    apiRequest(`/api/quizzes/${quizId}/end/`, {
      method: "POST",
    }),

  // Delete quiz
  deleteQuiz: (quizId) =>
    apiRequest(`/api/quizzes/${quizId}/delete/`, {
      method: "DELETE",
    }),

  // Submit quiz answer
  submitQuiz: (quizData) =>
    apiRequest("/api/quizzes/submit/", {
      method: "POST",
      body: JSON.stringify(quizData),
    }),
};

// Events API functions
export const eventAPI = {
  getEvents: () => apiRequest("/api/events/"),
  getEventDetail: (eventId) => apiRequest(`/api/events/${eventId}/`),
  createEvent: (eventData) =>
    apiRequest("/api/events/create/", {
      method: "POST",
      body: JSON.stringify(eventData),
    }),
  updateEvent: (eventId, eventData) =>
    apiRequest(`/api/events/${eventId}/update/`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    }),
  deleteEvent: (eventId) =>
    apiRequest(`/api/events/${eventId}/delete/`, {
      method: "DELETE",
    }),
};

// Team API functions
export const teamAPI = {
  getTeamMembers: () => apiRequest("/api/team/"),
  getTeamMemberDetail: (memberId) => apiRequest(`/api/team/${memberId}/`),
  createTeamMember: (memberData) =>
    apiRequest("/api/team/create/", {
      method: "POST",
      body: JSON.stringify(memberData),
    }),
  updateTeamMember: (memberId, memberData) =>
    apiRequest(`/api/team/${memberId}/update/`, {
      method: "PUT",
      body: JSON.stringify(memberData),
    }),
  deleteTeamMember: (memberId) =>
    apiRequest(`/api/team/${memberId}/delete/`, {
      method: "DELETE",
    }),
};

// Donations API functions
export const donationAPI = {
  getDonations: () => apiRequest("/api/donations/"),
  submitDonation: (donationData) =>
    apiRequest("/api/donations/submit/", {
      method: "POST",
      body: JSON.stringify(donationData),
    }),
  verifyDonation: (donationId) =>
    apiRequest(`/api/donations/${donationId}/verify/`, {
      method: "POST",
    }),
  deleteDonation: (donationId) =>
    apiRequest(`/api/donations/${donationId}/delete/`, {
      method: "DELETE",
    }),
};

// Contact API functions
export const contactAPI = {
  getContactMessages: () => apiRequest("/api/contact/"),
  submitContact: (contactData) =>
    apiRequest("/api/contact/submit/", {
      method: "POST",
      body: JSON.stringify(contactData),
    }),
  markContactRead: (messageId) =>
    apiRequest(`/api/contact/${messageId}/read/`, {
      method: "POST",
    }),
  deleteContact: (messageId) =>
    apiRequest(`/api/contact/${messageId}/delete/`, {
      method: "DELETE",
    }),
};

// Ministry API functions
export const ministryAPI = {
  getMinistryRegistrations: () => apiRequest("/api/ministry/"),
  submitMinistryRegistration: (registrationData) =>
    apiRequest("/api/ministry/register/", {
      method: "POST",
      body: JSON.stringify(registrationData),
    }),
  approveMinistryRegistration: (registrationId) =>
    apiRequest(`/api/ministry/${registrationId}/approve/`, {
      method: "POST",
    }),
  deleteMinistryRegistration: (registrationId) =>
    apiRequest(`/api/ministry/${registrationId}/delete/`, {
      method: "DELETE",
    }),
};

// Blog API functions
export const blogAPI = {
  getBlogPosts: () => apiRequest("/api/blog/"),
  getBlogPostDetail: (slug) => apiRequest(`/api/blog/${slug}/`),
  createBlogPost: (postData) =>
    apiRequest("/api/blog/create/", {
      method: "POST",
      body: JSON.stringify(postData),
    }),
  updateBlogPost: (slug, postData) =>
    apiRequest(`/api/blog/${slug}/update/`, {
      method: "PUT",
      body: JSON.stringify(postData),
    }),
  deleteBlogPost: (slug) =>
    apiRequest(`/api/blog/${slug}/delete/`, {
      method: "DELETE",
    }),
};

// Testimonials API functions
export const testimonialAPI = {
  getTestimonials: () => apiRequest("/api/testimonials/"),
  createTestimonial: (testimonialData) =>
    apiRequest("/api/testimonials/create/", {
      method: "POST",
      body: JSON.stringify(testimonialData),
    }),
  updateTestimonial: (testimonialId, testimonialData) =>
    apiRequest(`/api/testimonials/${testimonialId}/update/`, {
      method: "PUT",
      body: JSON.stringify(testimonialData),
    }),
  deleteTestimonial: (testimonialId) =>
    apiRequest(`/api/testimonials/${testimonialId}/delete/`, {
      method: "DELETE",
    }),
};

// Gallery API functions
export const galleryAPI = {
  getGalleryItems: () => apiRequest("/api/gallery/"),
  createGalleryItem: (itemData) =>
    apiRequest("/api/gallery/create/", {
      method: "POST",
      body: JSON.stringify(itemData),
    }),
  updateGalleryItem: (itemId, itemData) =>
    apiRequest(`/api/gallery/${itemId}/update/`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    }),
  deleteGalleryItem: (itemId) =>
    apiRequest(`/api/gallery/${itemId}/delete/`, {
      method: "DELETE",
    }),
};

// Congregations API functions
export const congregationAPI = {
  getCongregations: () => apiRequest("/api/congregations/"),
  createCongregation: (congregationData) =>
    apiRequest("/api/congregations/create/", {
      method: "POST",
      body: JSON.stringify(congregationData),
    }),
  updateCongregation: (congregationId, congregationData) =>
    apiRequest(`/api/congregations/${congregationId}/update/`, {
      method: "PUT",
      body: JSON.stringify(congregationData),
    }),
  deleteCongregation: (congregationId) =>
    apiRequest(`/api/congregations/${congregationId}/delete/`, {
      method: "DELETE",
    }),
};

// Analytics API functions
export const analyticsAPI = {
  getAnalytics: () => apiRequest("/api/analytics/"),
  trackAnalytics: (analyticsData) =>
    apiRequest("/api/analytics/track/", {
      method: "POST",
      body: JSON.stringify(analyticsData),
    }),
};

export default apiRequest;
