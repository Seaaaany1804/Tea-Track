import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { Link } from 'react-router-dom';
import BgCircle from '../components/bg-circle';

function ForgotPassword() {
  // State to toggle between forms
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Switch to the new password form
    setIsResettingPassword(true);
  };

  return (
    <div className="h-screen bg-[#14463A] relative ">
    {/* Background Shapes for Glassmorphism */}
    <div className="absolute inset-0 overflow-hidden">
        <BgCircle />
    </div>

      <div className='h-screen flex items-center justify-center bg-opacity-10 backdrop-filter backdrop-blur-[70px]'> 
          {/* Forgot Password Card */}
          <div className="relative z-10 bg-[#0D2F26] p-8 rounded-lg shadow-xl w-full max-w-md border border-white border-opacity-20">
              {/* Logo */}
              <div className="flex justify-center mb-6">
              <img 
                  src="/assets/images/icons/Logo-Yellow.png" 
                  alt="Tea Track Logo" 
                  className="w-16 h-16"
              />
              </div>

              {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-300 text-center mb-6">
          {isResettingPassword
            ? 'Please enter your new credentials'
            : 'Please enter your credentials'}
        </p>

        {/* Conditional Rendering for Forms */}
        {!isResettingPassword ? (
          // First Step: Email Entry Form
          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="email"
                placeholder="Enter your Username or Email address"
                className="w-full pl-10 pr-4 py-2 rounded bg-white text-black focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E39E05] hover:bg-[#d99900] text-white py-2 rounded transition-all"
            >
              Enter
            </button>
          </form>
        ) : (
          // Second Step: New Password Form
          <form>
            <div className="relative mb-4">
              <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="password"
                placeholder="Enter your New Password"
                className="w-full pl-10 pr-4 py-2 rounded bg-white text-black focus:outline-none"
                required
              />
            </div>
            <div className="relative mb-6">
              <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="password"
                placeholder="Confirm your New Password"
                className="w-full pl-10 pr-4 py-2 rounded bg-white text-black focus:outline-none"
                required
              />
            </div>

            {/* Submit Button for New Password */}
            <button className="w-full bg-[#E39E05] hover:bg-[#d99900] text-white py-2 rounded transition-all">
              Submit
            </button>
          </form>
        )}

        {/* Return to Login Link */}
        <p className="text-center text-gray-300 text-sm mt-4">
          Remember your password?{' '}
          <Link to="/login" className="text-white hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
</div>
  )
}

export default ForgotPassword
