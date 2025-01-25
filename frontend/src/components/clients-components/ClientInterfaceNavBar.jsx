import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ClientInterfaceNavBar = () => {
    const location = useLocation();

    // Helper function to determine active link styling
    const getLinkStyle = (path) => {
        return location.pathname === path
            ? 'text-[#E39E05] font-semibold'  // Active page - Yellow
            : 'text-white hover:text-yellow-300'; // Inactive page - White
    };

    return (
        <div className='flex items-center justify-between p-5 px-24 text-white bg-[#0D2F26] shadow-xl'>
            <div className='flex items-center gap-3'>
                <img src="/assets/images/icons/Logo-Yellow.png" alt="error" className='h-16' />
                <h1 className='text-[25px] font-bold'><span className='text-[#E39E05]'>TEA</span> TRACK</h1>
            </div>

            <div className='flex items-center gap-[70px]'>
                <ul className='flex gap-[70px]'>
                    <li>
                        <Link to="/client" className={getLinkStyle('/client')}>Home</Link>
                    </li>
                    <li>
                        <a href="#ourstore" className="text-white hover:text-yellow-300">Store</a>
                    </li>
                    <li>
                        <Link to="/clientorders" className={getLinkStyle('/clientorders')}>Orders</Link>
                    </li>
                    <li>
                        <Link to="/clientcart" className={getLinkStyle('/clientcart')}>Cart</Link>
                    </li>
                    <li>
                        <Link to="/clienthistory" className={getLinkStyle('/clienthistory')}>History</Link>
                    </li>
                </ul>
                <Link to='/login' className='bg-white text-black p-2 px-7 rounded-[20px] font-medium'>Logout</Link>
            </div>
        </div>
    );
};

export default ClientInterfaceNavBar;
