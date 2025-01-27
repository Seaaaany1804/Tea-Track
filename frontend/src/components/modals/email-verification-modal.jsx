import React, { useState, useEffect, useRef } from 'react';
import { MdMarkEmailRead, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function EmailVerificationModal({ email, userId, onClose }) {
  const [timer, setTimer] = useState(300); // 5 minutes countdown
  const [code, setCode] = useState(new Array(6).fill(""));
  const [showSuccessModal, setShowSuccessModal] = useState(false); // To show the new modal
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const isInitialMount = useRef(true);  // Add this ref

  // Generate a random 6-digit code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Generate new verification code and store it
      const newCode = generateVerificationCode();
      setVerificationCode(newCode);

      console.log('Sending verification request:', {
        email: email,
        code: newCode
      });
      
      const response = await fetch('http://localhost:8081/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          code: newCode
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }
    } catch (error) {
      setError('Failed to send verification code');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      sendVerificationCode();
    }

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
    const newCode = [...code];

    // Handle backspace
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      newCode[index] = '';
      setCode(newCode);
      // Focus previous input if exists
      if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
      return;
    }

    // Handle number input
    if (!isNaN(value) && value.length <= 1) {
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input if exists
      if (value && index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace when input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const enteredCode = code.join('');
    
    if (enteredCode === verificationCode) {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8081/api/verify-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId,
            email,
            code: enteredCode
          })
        });

        if (!response.ok) {
          throw new Error('Failed to verify user');
        }

        setShowSuccessModal(true);
      } catch (error) {
        setError('Verification failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Invalid verification code!');
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
            You have successfully registered your account.
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
          <span className="text-[#E39E05] font-bold">{email}</span>
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
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border border-[#E39E05] bg-transparent rounded-lg text-white"
            />
          ))}
        </div>

        {/* Countdown Timer */}
        <p className="text-gray-300 text-sm mb-4">Expires in: <span className="text-white">{formatTime()}</span></p>

        {/* Resend Code Button */}
        <button 
          className="text-white underline mb-4"
          onClick={sendVerificationCode} // Reset timer
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
