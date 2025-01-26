import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import LogoutModal from '../components/modals/LogoutModal';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Helper function to determine active link styling
    const getLinkStyle = (path) => {
        return location.pathname === path
            ? 'text-[#E39E05] font-semibold'  // Active page - Yellow
            : 'text-white hover:text-yellow-300'; // Inactive page - White
    };

    // Logout Functions
    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        // Clear all stored user data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        
        // Close modal and redirect
        setIsModalOpen(false);
        navigate('/login'); // Redirect to login page
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-green-900 text-white px-40 py-4 flex items-center justify-between shadow-lg">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src="/assets/images/icons/Logo-Yellow.png" alt="Logo" className="h-12" />
                    <span className="ml-2 font-bold text-2xl">TEA TRACK</span>
                </div>

                {/* Navigation Links */}
                <ul className="flex items-center space-x-12">
                    <li>
                        <Link to="/dashboard" className={getLinkStyle('/dashboard')}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/inventory" className={getLinkStyle('/inventory')}>
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" className={getLinkStyle('/orders')}>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/logs" className={getLinkStyle('/logs')}>
                            Logs
                        </Link>
                    </li>
                    <li>
                        <Link to="/notifications" className={getLinkStyle('/notifications')}>
                            Notifications
                        </Link>
                    </li>
                    {/* Logout Button with Modal Trigger */}
                    <button
                        className="bg-white text-[#0D2F26] rounded-full px-8 py-2 hover:text-black"
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </button>
                </ul>
            </nav>

            {/* Logout Modal Component */}
            <LogoutModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirmLogout} 
            />
        </>
    );
}

export default Navbar;
