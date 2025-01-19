import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import InventoryPage from "./pages/Admin/InventoryPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import OrderPage from "./pages/Admin/OrderPage";
import LogPage from "./pages/Admin/LogPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/inventory" element={<InventoryPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/orders" element={<OrderPage />} />

        <Route path="/logs" element={<LogPage />} />
        {/* Redirect to /login by default */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
