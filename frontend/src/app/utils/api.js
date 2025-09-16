// API Configuration and utility functions for Dashboard
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001";

export const apiFetch = async (path, options = {}) => {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  return fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
};

// Quiz API functions
export const quizAPI = {
  // Get active quiz
  getActiveQuiz: () => apiFetch("/api/quizzes/active/"),

  // Get all quizzes
  getQuizzes: () => apiFetch("/api/quizzes/"),

  // Get quiz results
  getQuizResults: () => apiFetch("/api/quizzes/results/"),

  // Create quiz
  createQuiz: (quizData) =>
    apiFetch("/api/quizzes/create/", {
      method: "POST",
      body: JSON.stringify(quizData),
    }),

  // End quiz
  endQuiz: (quizId) =>
    apiFetch(`/api/quizzes/${quizId}/end/`, {
      method: "POST",
    }),

  // Delete quiz
  deleteQuiz: (quizId) =>
    apiFetch(`/api/quizzes/${quizId}/delete/`, {
      method: "DELETE",
    }),

  // Submit quiz answer
  submitQuiz: (quizData) =>
    apiFetch("/api/quizzes/submit/", {
      method: "POST",
      body: JSON.stringify(quizData),
    }),
};

// Events API functions
export const eventAPI = {
  getEvents: () => apiFetch("/api/events/"),
  getEventDetail: (eventId) => apiFetch(`/api/events/${eventId}/`),
  createEvent: (eventData) =>
    apiFetch("/api/events/create/", {
      method: "POST",
      body: JSON.stringify(eventData),
    }),
  updateEvent: (eventId, eventData) =>
    apiFetch(`/api/events/${eventId}/update/`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    }),
  deleteEvent: (eventId) =>
    apiFetch(`/api/events/${eventId}/delete/`, {
      method: "DELETE",
    }),
};

// Team API functions
export const teamAPI = {
  getTeamMembers: () => apiFetch("/api/team/"),
  getTeamMemberDetail: (memberId) => apiFetch(`/api/team/${memberId}/`),
  createTeamMember: (memberData) =>
    apiFetch("/api/team/create/", {
      method: "POST",
      body: JSON.stringify(memberData),
    }),
  updateTeamMember: (memberId, memberData) =>
    apiFetch(`/api/team/${memberId}/update/`, {
      method: "PUT",
      body: JSON.stringify(memberData),
    }),
  deleteTeamMember: (memberId) =>
    apiFetch(`/api/team/${memberId}/delete/`, {
      method: "DELETE",
    }),
};

// Donations API functions
export const donationAPI = {
  getDonations: () => apiFetch("/api/donations/"),
  submitDonation: (donationData) =>
    apiFetch("/api/donations/submit/", {
      method: "POST",
      body: JSON.stringify(donationData),
    }),
  verifyDonation: (donationId) =>
    apiFetch(`/api/donations/${donationId}/verify/`, {
      method: "POST",
    }),
  deleteDonation: (donationId) =>
    apiFetch(`/api/donations/${donationId}/delete/`, {
      method: "DELETE",
    }),
};

// Contact API functions
export const contactAPI = {
  getContactMessages: () => apiFetch("/api/contact/"),
  submitContact: (contactData) =>
    apiFetch("/api/contact/submit/", {
      method: "POST",
      body: JSON.stringify(contactData),
    }),
  markContactRead: (messageId) =>
    apiFetch(`/api/contact/${messageId}/read/`, {
      method: "POST",
    }),
  deleteContact: (messageId) =>
    apiFetch(`/api/contact/${messageId}/delete/`, {
      method: "DELETE",
    }),
};

// Ministry API functions
export const ministryAPI = {
  getMinistryRegistrations: () => apiFetch("/api/ministry/"),
  submitMinistryRegistration: (registrationData) =>
    apiFetch("/api/ministry/register/", {
      method: "POST",
      body: JSON.stringify(registrationData),
    }),
  approveMinistryRegistration: (registrationId) =>
    apiFetch(`/api/ministry/${registrationId}/approve/`, {
      method: "POST",
    }),
  deleteMinistryRegistration: (registrationId) =>
    apiFetch(`/api/ministry/${registrationId}/delete/`, {
      method: "DELETE",
    }),
};

// Blog API functions
export const blogAPI = {
  getBlogPosts: () => apiFetch("/api/blog/"),
  getBlogPostDetail: (slug) => apiFetch(`/api/blog/${slug}/`),
  createBlogPost: (postData) =>
    apiFetch("/api/blog/create/", {
      method: "POST",
      body: JSON.stringify(postData),
    }),
  updateBlogPost: (slug, postData) =>
    apiFetch(`/api/blog/${slug}/update/`, {
      method: "PUT",
      body: JSON.stringify(postData),
    }),
  deleteBlogPost: (slug) =>
    apiFetch(`/api/blog/${slug}/delete/`, {
      method: "DELETE",
    }),
};

// Testimonials API functions
export const testimonialAPI = {
  getTestimonials: () => apiFetch("/api/testimonials/"),
  createTestimonial: (testimonialData) =>
    apiFetch("/api/testimonials/create/", {
      method: "POST",
      body: JSON.stringify(testimonialData),
    }),
  updateTestimonial: (testimonialId, testimonialData) =>
    apiFetch(`/api/testimonials/${testimonialId}/update/`, {
      method: "PUT",
      body: JSON.stringify(testimonialData),
    }),
  deleteTestimonial: (testimonialId) =>
    apiFetch(`/api/testimonials/${testimonialId}/delete/`, {
      method: "DELETE",
    }),
};

// Gallery API functions
export const galleryAPI = {
  getGalleryItems: () => apiFetch("/api/gallery/"),
  createGalleryItem: (itemData) =>
    apiFetch("/api/gallery/create/", {
      method: "POST",
      body: JSON.stringify(itemData),
    }),
  updateGalleryItem: (itemId, itemData) =>
    apiFetch(`/api/gallery/${itemId}/update/`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    }),
  deleteGalleryItem: (itemId) =>
    apiFetch(`/api/gallery/${itemId}/delete/`, {
      method: "DELETE",
    }),
};

// Congregations API functions
export const congregationAPI = {
  getCongregations: () => apiFetch("/api/congregations/"),
  createCongregation: (congregationData) =>
    apiFetch("/api/congregations/create/", {
      method: "POST",
      body: JSON.stringify(congregationData),
    }),
  updateCongregation: (congregationId, congregationData) =>
    apiFetch(`/api/congregations/${congregationId}/update/`, {
      method: "PUT",
      body: JSON.stringify(congregationData),
    }),
  deleteCongregation: (congregationId) =>
    apiFetch(`/api/congregations/${congregationId}/delete/`, {
      method: "DELETE",
    }),
};

// Analytics API functions
export const analyticsAPI = {
  getAnalytics: () => apiFetch("/api/analytics/"),
  trackAnalytics: (analyticsData) =>
    apiFetch("/api/analytics/track/", {
      method: "POST",
      body: JSON.stringify(analyticsData),
    }),
};
