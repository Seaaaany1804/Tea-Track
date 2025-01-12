/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { MdEmail, MdLock } from 'react-icons/md'
import { Link } from 'react-router-dom'
import BgCircle from '../components/bg-circle'

function LoginPage() {
  return (
    <div className="h-screen bg-[#14463A]">
      <div className="absolute inset-0 overflow-hidden">
        <BgCircle />
      </div>
      {/* Centered Login Card */}
      <div className="h-screen bg-opacity-10 backdrop-filter backdrop-blur-[70px] flex items-center justify-center ">
        <div className='p-8 rounded-lg shadow-xl w-full max-w-md bg-[#0D2F26]'>
          <div className="flex justify-center mb-6">
            <img 
              src="/assets/images/icons/Logo-Yellow.png" 
              alt="Tea Track Logo" 
              className="w-16 h-16"
            />
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            WELCOME TO TEA TRACK
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Please enter your credentials
          </p>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full pl-10 pr-4 py-2 rounded bg-white"
              />
            </div>

            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="password"
                placeholder="••••••••••••••••"
                className="w-full pl-10 pr-4 py-2 rounded bg-white"
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-gray-300 hover:text-white text-sm">
                Forgot Password?
              </Link>
            </div>

            <button className="w-full bg-[#E39E05] hover:bg-[#d99900] text-white py-2 rounded transition-colors">
              Login
            </button>

            <p className="text-center text-gray-300 text-sm">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-white hover:underline">
                Sign Up Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
