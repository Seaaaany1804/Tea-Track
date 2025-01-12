import React, { useState, useEffect } from 'react';
import { MdMarkEmailRead, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function EmailVerificationModal({ onClose }) {
  const [timer, setTimer] = useState(300); // 5 minutes countdown
  const [code, setCode] = useState(new Array(6).fill(""));
  const [showSuccessModal, setShowSuccessModal] = useState(false); // To show the new modal
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join('');
    if (enteredCode === "123456") { // Example verification logic
      setShowSuccessModal(true);
    } else {
      alert("Invalid verification code!");
    }
  };

  if (showSuccessModal) {
    // New modal for successful submission
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#0D2F26] p-8 rounded-lg shadow-lg max-w-sm w-full relative text-center text-white">
          
          {/* Success Icon */}
          <MdLock className="text-[#E39E05] text-5xl mx-auto mb-4" />

          {/* Success Message */}
          <p className="mb-4 text-lg">
            You have successfully changed your password.
          </p>

          {/* Login Button */}
          <button
            onClick={() => navigate('/login')} // Navigate to login page
            className="w-full bg-[#E39E05] hover:bg-[#d99900] py-2 rounded-lg text-white font-semibold transition"
          >
            Login Here
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0D2F26] p-8 rounded-lg shadow-lg max-w-sm w-full relative text-center text-white">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white text-lg">
          ✕
        </button>

        {/* Verification Icon */}
        <MdMarkEmailRead className="text-[#E39E05] text-5xl mx-auto mb-4" />

        {/* Verification Message */}
        <p className="mb-4 text-lg">
          Your verification code is sent by Email to <br />
          <span className="text-[#E39E05] font-bold">example@gmail.com</span>
        </p>

        {/* Verification Code Inputs */}
        <div className="flex justify-center space-x-2 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleInputChange(e, index)}
              className="w-12 h-12 text-center text-xl border border-[#E39E05] bg-transparent rounded-lg text-white"
            />
          ))}
        </div>

        {/* Countdown Timer */}
        <p className="text-gray-300 text-sm mb-4">Expires in: <span className="text-white">{formatTime()}</span></p>

        {/* Resend Code Button */}
        <button 
          className="text-white underline mb-4"
          onClick={() => setTimer(300)} // Reset timer
        >
          Send Again
        </button>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit} 
          className="w-full bg-[#E39E05] hover:bg-[#d99900] py-2 rounded-lg text-white font-semibold transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EmailVerificationModal;
