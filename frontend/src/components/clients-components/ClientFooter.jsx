import React from 'react';
import { Link } from 'react-router-dom';

const ClientFooter = () => {
  const NavBar = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/ourstore' },
    { name: 'Orders', path: '/orders' },
    { name: 'Cart', path: '/cart' },
    { name: 'History', path: '/history' },
  ];

  return (
    <div className="relative bg-[#0D2F26] shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col items-center justify-center gap-5 py-5">
        <div className="flex items-center gap-3">
          <img src="/assets/images/icons/Logo-Yellow.png" alt="error" className="h-16" />
          <h1 className="text-[25px] font-bold text-white">
            <span className="text-[#E39E05]">TEA</span> TRACK
          </h1>
        </div>

        <p className="text-white">
          Our goal is to create unforgettable moments by serving premium milk teas that delight every customer.
        </p>

        <div className="flex items-center gap-[70px]">
          <ul className="flex gap-[70px] text-white">
            {NavBar.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="w-[80%] border-2 border-[#E39E05]" />
      </div>

      <div className="px-[188px]">
        <h1 className="text-white">© 2025 Tea Track. All Rights Reserved.</h1>
      </div>
    </div>
  );
};

export default ClientFooter;
