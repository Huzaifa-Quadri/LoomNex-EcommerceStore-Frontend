import { Routes, Route } from "react-router-dom";
import MainLayout from "./features/ecommerce/components/layout/MainLayout";
import HomePage from "./features/ecommerce/pages/HomePage";
import ElectronicsPage from "./features/ecommerce/pages/ElectronicsPage";
import ClothingPage from "./features/ecommerce/pages/ClothingPage";
import CartPage from "./features/ecommerce/pages/CartPage";
import AboutPage from "./features/ecommerce/pages/AboutPage";
import LoginPage from "./features/auth/pages/LoginPage";
import SignUpPage from "./features/auth/pages/SignUpPage";

/**
 * Centralised route configuration for the entire app.
 * New feature routes (e.g. auth) can be added here as separate <Route> groups.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Ecommerce routes ── */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/electronics" element={<ElectronicsPage />} />
        <Route path="/clothing" element={<ClothingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* ── Auth routes ── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}
