/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { MdPerson, MdEmail, MdLock, MdPhone, MdEventNote } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import EmailVerificationModal from '../components/modals/email-verification-modal' // Import the modal component
import BgCircle from '../components/bg-circle';

function RegisterPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [registeredUserId, setRegisteredUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const suffixOptions = ["", "Jr.", "Sr.", "I", "II", "III", "IV", "V"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, phoneNumber, firstName, middleName, lastName, suffix, email, password, confirmPassword, agreeTerms } = formData;

    // Add debug log
    console.log('Form data before submission:', formData);

    // Form validation
    if (!username || !phoneNumber || !firstName || !lastName || !email || !password || !confirmPassword || !agreeTerms) {
      alert('Please fill out all required fields and accept the terms.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          phoneNumber,
          firstName,
          middleName,
          lastName,
          suffix,
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful, showing modal with:', {
          email: formData.email,
          userId: data.userId
        });

        setRegisteredUserId(data.userId);
        setShowModal(true);

        // Don't clear form data until after modal is shown
        // Move the form clearing after verification is complete
        /*setFormData({
          username: '',
          phoneNumber: '',
          firstName: '',
          middleName: '',
          lastName: '',
          suffix: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
        });*/
        
      } else {
        alert(`Registration failed: ${data.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Failed to register. Please try again later.');
    }
  };

  return (
    <div className="h-screen bg-[#14463A] relative">
      <div className="absolute inset-0 overflow-hidden">
        <BgCircle />
      </div>

      <div className="h-screen bg-opacity-10 backdrop-filter backdrop-blur-[70px] flex items-center justify-center">
        <form 
          onSubmit={handleSubmit}
          className="p-8 rounded-lg shadow-xl w-full max-w-2xl bg-[#0D2F26]"
        >
          <div className="flex justify-center mb-6">
            <img 
              src="/assets/images/icons/Logo-Yellow.png" 
              alt="Tea Track Logo" 
              className="w-16 h-16"
            />
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            CREATE YOUR ACCOUNT
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Fill in the details below to create a new account
          </p>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username *"
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                  required
                />
              </div>
              <div className="relative">
                <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name *"
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                  required
                />
              </div>
              <div className="relative">
                <MdEventNote className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Middle Name"
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name *"
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                  required
                />
              </div>

              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <select
                  name="suffix"
                  value={formData.suffix}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                >
                  {suffixOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className="w-full pl-10 pr-4 py-2 rounded bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password *"
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                  required
                />
              </div>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Your Password *"
                  className="w-full pl-10 pr-4 py-2 rounded bg-white"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="terms" 
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms" className="text-gray-300 text-sm">
                I agree to the <a href="#" className="underline text-white">Terms and Conditions</a> and <a href="#" className="underline text-white">Privacy Policy</a>.
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#E39E05] hover:bg-[#d99900] text-white py-2 rounded transition-colors"
            >
              Register
            </button>

            <p className="text-center text-gray-300 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <EmailVerificationModal 
          email={formData.email}
          userId={registeredUserId}
          onClose={() => {
            setShowModal(false);
            // Clear form data after modal is closed
            setFormData({
              username: '',
              phoneNumber: '',
              firstName: '',
              middleName: '',
              lastName: '',
              suffix: '',
              email: '',
              password: '',
              confirmPassword: '',
              agreeTerms: false,
            });
          }} 
        />
      )}
    </div>
  )
}

export default RegisterPage;