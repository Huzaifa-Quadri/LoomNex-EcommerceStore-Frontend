import axiosClient from "../../ecommerce/api/axiosClient";

/**
 * Auth API endpoints wrapping the Axios client configured with
 * withCredentials: true.
 */

export const login = async (credentials) => {
  const response = await axiosClient.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosClient.post("/auth/register", userData);
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axiosClient.post("/auth/logout");
    return response.data;
  } catch (err) {
    console.warn("Logout failed or endpoint doesn't exist", err);
    return null;
  }
};
