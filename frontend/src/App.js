import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import InventoryPage from "./pages/Admin/InventoryPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import OrderPage from "./pages/Admin/OrderPage";
import LogPage from "./pages/Admin/LogPage";
import LandingPage from "./pages/Client/LandingPage";
import ClientsInterface from "./pages/ClientsAccount/ClientsInterface";
import Orders from "./pages/ClientsAccount/Orders";
import Cart from "./pages/ClientsAccount/Cart";
import History from "./pages/ClientsAccount/History";
import BuyItem from "./pages/ClientsAccount/BuyItem";
import Error404 from "./Error/Error404";
import SuperAdmin from "./pages/SuperAdmin";
import ChangePassword from "./pages/ChangePassword";
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

        {/* Landing Page */}
        <Route path="/landingpage" element={<LandingPage/>}/>
        
        {/* Clients Interface */}
        <Route path='/client' element={<ClientsInterface/>}/>
        <Route path='/clientorders' element={<Orders/>}/>
        <Route path='/clientcart' element={<Cart/>}/>
        <Route path='/clienthistory' element={<History/>}/>
        <Route path='/buyitem' element={<BuyItem/>} />
        <Route path='/error' element={<Error404/>}/>
        <Route path='/superadmin' element={<SuperAdmin/>}/>
        <Route path='/superadminchange' element={<ChangePassword/>}/>
      </Routes>
    </Router>
  );
}
