import axios from "axios";

const BASE_URL = "https://loomnex-ecommercestore-backend.onrender.com";

// Create instance with credentials for HttpOnly cookies
const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for standardized Spring Boot error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the error originates from our Spring Boot global exception handler
    if (error.response && error.response.data) {
      const data = error.response.data;
      
      // Look for standardized Spring Boot error format
      if (data.status || data.error || data.fieldErrors) {
        return Promise.reject({
          message: data.message || data.error || "An unexpected error occurred",
          status: data.status,
          fieldErrors: data.fieldErrors || {}, // e.g. {"email": "Invalid format"}
          timestamp: data.timestamp,
        });
      }
    }
    
    // Fallback for network errors (API sleeping, offline, etc.)
    return Promise.reject({
      message: error.message || "Network error. The server might be unreachable.",
      status: error.response?.status || 500,
      fieldErrors: {},
    });
  }
);

export default axiosClient;
