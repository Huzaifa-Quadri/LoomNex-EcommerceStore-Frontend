import { createContext, useState, useEffect } from "react";
import { login as loginApi, register as registerApi, logout as logoutApi } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // We don't have a /auth/me endpoint, so we trust a localStorage flag
  // for UI representations. The actual security is handled by HttpOnly cookies.
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("loomnex_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("loomnex_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("loomnex_user");
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const data = await loginApi(credentials);
      // Because /login might return user info, or just success.
      // We store a minimal user proxy in state to signal "logged in".
      setUser(data || { email: credentials.email, id: "1" });
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerApi(userData);
      setUser(data || { email: userData.email, name: userData.firstName, id: "1" });
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
