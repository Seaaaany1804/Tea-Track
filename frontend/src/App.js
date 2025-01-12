import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect to /login by default */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
