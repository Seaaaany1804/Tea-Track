/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { MdEmail, MdLock } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import BgCircle from '../components/bg-circle'

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('http://localhost:8081/users');
      const users = await response.json();

      const user = users.find(u => 
        (u.email_address === email || u.username === email) && 
        u.password === password
      );

      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', user.id);
        navigate('/dashboard');
      } else {
        setError('Invalid email/username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function to handle logout (you can use it in other components)
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }

  return (
    <div className="h-screen bg-[#14463A]">
      <div className="absolute inset-0 overflow-hidden">
        <BgCircle />
      </div>
      {/* Centered Login Card */}
      <div className="h-screen bg-opacity-10 backdrop-filter backdrop-blur-[70px] flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-xl w-full max-w-md bg-[#0D2F26]">
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
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full pl-10 pr-4 py-2 rounded bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="password"
                placeholder="••••••••••••••••"
                className="w-full pl-10 pr-4 py-2 rounded bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-gray-300 underline hover:text-white text-sm">
                Forgot Password?
              </Link>
            </div>

            {/* Updated Button to Use handleLogin */}
            <button
              className="w-full bg-[#E39E05] hover:bg-[#d99900] text-white py-2 rounded transition-colors"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
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
  