"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function PayrollProOTPVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const router = useRouter();

  useEffect(() => {
    // Get user email and role from sessionStorage
    const email = sessionStorage.getItem('userEmail');
    const userRole = sessionStorage.getItem('userRole');

    if (email) {
      setUserEmail(email);
    } else {
      // If no email found, redirect back to login
      router.push('/login');
      return;
    }

    // If user is an employee, they shouldn't be here - redirect to dashboard
    if (userRole === 'employee') {
      const redirectTo = sessionStorage.getItem('redirectTo') || '/employee/dashboard';
      router.push(redirectTo);
      return;
    }

    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const digits = pastedData.split('').filter(char => /^\d$/.test(char));

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);

      // Redirect to appropriate dashboard after 2 seconds
      setTimeout(() => {
        const redirectTo = sessionStorage.getItem('redirectTo');
        const userRole = sessionStorage.getItem('userRole');

        // Redirect based on role
        if (redirectTo) {
          router.push(redirectTo);
        } else if (userRole === 'admin') {
          router.push('/login');
        }

        // Clear session storage after redirection (or just before)
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('redirectTo');
      }, 2000);
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    alert(`OTP has been resent to ${userEmail}`);
  };

  const handleChangeEmail = () => {
    // Clear session storage and redirect to login
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('redirectTo');
    router.push('/login');
  };

  // Success Screen
  if (isVerified) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 xs:p-4">
        <div className="w-full max-w-[280px] xs:max-w-sm sm:max-w-md">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center mb-6 xs:mb-8">
            <div className="bg-blue-600 rounded-xl p-2.5 xs:p-3 shadow-lg">
              <FileText className="w-6 h-6 xs:w-7 xs:h-7 text-white" />
            </div>
            <div className="ml-3 xs:ml-4">
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                PayrollPro
              </h1>
              <p className="text-[10px] xs:text-xs text-gray-500">
                Employee Portal
              </p>
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-xl p-8 xs:p-10 sm:p-12">
            {/* Success Icon with Animation */}
            <div className="flex justify-center mb-5 xs:mb-6">
              <div className="bg-teal-50 rounded-full p-4 xs:p-5 animate-pulse">
                <CheckCircle2 className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-teal-500" />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 mb-2 xs:mb-3">
                Verification Successful!
              </h2>
              <p className="text-xs xs:text-sm text-gray-600 leading-relaxed">
                Redirecting to your dashboard...
              </p>
            </div>

            {/* Loading Dots Animation */}
            <div className="flex justify-center mt-6 space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>

          {/* Footer Help Text */}
          <div className="mt-4 xs:mt-6 text-center">
            <p className="text-[10px] xs:text-xs text-gray-500">
              Need help? Contact your HR department
            </p>
          </div>
        </div>
      </div>
    );
  }

  // OTP Verification Screen
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 xs:p-4">
      <div className="w-full max-w-[280px] xs:max-w-sm sm:max-w-md">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 rounded-xl p-3 shadow-lg shadow-blue-500/20">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div className="ml-4 text-left">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
              PayrollPro
            </h1>
            <p className="text-[10px] font-semibold text-gray-400 tracking-[0.2em] uppercase">
              Financial Suite
            </p>
          </div>
        </div>

        {/* OTP Verification Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-50 rounded-full p-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify OTP
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              To secure your payroll data, please enter the 6-digit code sent to
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {userEmail || 'your email'}
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-1.5 xs:gap-2 mb-5 xs:mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-9 h-10 xs:w-11 xs:h-12 sm:w-12 sm:h-14 text-center text-base xs:text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full h-10 xs:h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs xs:text-sm sm:text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4 xs:mb-5"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify & Continue'
            )}
          </button>

          {/* Links */}
          <div className="space-y-2 xs:space-y-2.5">
            <div className="text-center">
              <button
                onClick={handleChangeEmail}
                className="text-xs xs:text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Change email address
              </button>
            </div>
            <div className="text-center">
              <span className="text-xs xs:text-sm text-gray-600">
                Didn't receive the code?{' '}
              </span>
              <button
                onClick={handleResendOTP}
                className="text-xs xs:text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>

        {/* Footer Help Text */}
        <div className="mt-4 xs:mt-6 text-center">
          <p className="text-[10px] xs:text-xs text-gray-500">
            Need help? Contact your HR department
          </p>
        </div>
      </div>
    </div>
  );
}