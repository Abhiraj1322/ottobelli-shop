import axios from "axios";

// Base axios instance — all API calls use this
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // sends cookies (accessToken, refreshToken) with every request
});

// ─── Request Interceptor ───────────────────────────────────────────────────
// Runs before every request is sent
api.interceptors.request.use(
  (config) => {
    // Nothing extra needed — cookies are sent automatically via withCredentials
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ──────────────────────────────────────────────────
// Runs after every response comes back
api.interceptors.response.use(
  // Success — just return the response
  (response) => response,

  // Error — check if access token expired (401)
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to get a new access token using refresh token
        await api.post("/api/auth/refresh");

        // Retry the original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token also expired — force logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;