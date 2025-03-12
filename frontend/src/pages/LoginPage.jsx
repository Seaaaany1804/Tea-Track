/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { MdEmail, MdLock } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import BgCircle from '../components/bg-circle'
import EmailVerificationModal from '../components/modals/email-verification-modal'

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [unverifiedUserId, setUnverifiedUserId] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');  
    if (isLoggedIn === 'true') {
      if (userType === 'admin') {
        navigate('/dashboard');
      } else if (userType === 'client') {
        navigate('/client');
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://teatrackbackend.vercel.app/users');
      const users = await response.json();

      const user = users.find(u => 
        (u.email_address === email || u.username === email) && 
        u.password === password
      );

      if (user) {
        if (!user.is_verified && user.user_type === 'client') {
          setUnverifiedUserId(user.id);
          setShowVerificationModal(true);
          return;
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userType', user.user_type);

        if (user.user_type === 'admin') {
          navigate('/dashboard');
        } else if (user.user_type === 'client') {
          navigate('/client');
        }
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

      {/* Add Verification Modal */}
      {showVerificationModal && (
        <EmailVerificationModal 
          email={email}
          userId={unverifiedUserId}
          onClose={() => {
            setShowVerificationModal(false);
            setError('');
          }}
        />
      )}
    </div>
  )
}

export default LoginPage
  