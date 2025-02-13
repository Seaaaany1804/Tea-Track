import React from 'react';
import BgCircle from '../components/bg-circle';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SuperAdmin = () => {
  return (
    <div className="h-screen bg-[#14463A]">
      <div className="absolute inset-0 overflow-hidden">
        <BgCircle />
      </div>
      
      {/* Centered Login Card */}
      <div className="h-screen bg-opacity-10 backdrop-filter backdrop-blur-[80px] flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-xl w-full max-w-md bg-[#0D2F26] px-14">
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
          You have successfully created the account
        </div>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/images/icons/Logo-Yellow.png"
              alt="Tea Track Logo"
              className="w-16 h-16"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-5">
           Create New User
          </h1>
          
          {/* Input Fields */}
          <div className="space-y-4">
            {/* Full Name Field */}
            <div>
                <label className="block text-gray-300 text-sm mb-2">
                    Full Name
                </label>
                <div className="relative">
                  <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2F26]" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 p-3 rounded bg-white"
                  />
                </div>
            </div>
            
            {/* Email Field */}
            <div>
                <label className="block text-gray-300 text-sm mb-2">
                    Email
                </label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2F26]" />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full pl-10 p-3 rounded bg-white"
                  />
                </div>
            </div>
            
            {/* Password Field */}
            <div>
                <label className="block text-gray-300 text-sm mb-2">
                    Password
                </label>
                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2F26]" />
                  <input
                    type="password"
                    placeholder="••••••••••••••••"
                    className="w-full pl-10 p-3 rounded bg-white"
                  />
                </div>
            </div>
            
            {/* Role Dropdown */}
            <div className='text-[#0D2F26]'>
                <label className="block text-gray-300 text-sm mb-2">
                    Role
                </label>
                <div className="relative">
                  <select className="w-full pl-4 pr-4 py-2 rounded bg-white appearance-none">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="cashier">Cashier</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
            </div>
            
            <div className="text-right">
              <Link to="/superadminchange" className="text-gray-300 underline hover:text-white text-sm">
                Forgot Password?
              </Link>
            </div>
            
            <button
              className="w-full bg-[#E39E05]  py-2 rounded transition-colors text-[#0D2F26] font-semibold"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;