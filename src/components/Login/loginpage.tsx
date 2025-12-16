"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowRight, FileText } from 'lucide-react';

export default function PayrollLogin() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // Navigate to OTP page
      router.push("/login/otp");
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendOTP();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 xs:p-4">
      <div className="w-full max-w-[280px] xs:max-w-sm sm:max-w-md">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-6 xs:mb-8">
          <div className="bg-blue-600 rounded-xl p-2.5 xs:p-3 mb-3 xs:mb-4 shadow-lg">
            <FileText className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900">
            PayrollPro
          </h1>
          <p className="text-xs xs:text-sm text-gray-500 mt-1">
            Employee Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
          <div className="text-center mb-4 xs:mb-6">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5 xs:mb-2">
              Welcome Back
            </h2>
            <p className="text-xs xs:text-sm text-gray-600 leading-relaxed">
              Enter your email to receive a verification code
            </p>
          </div>

          <div className="space-y-4 xs:space-y-5">
            <div className="space-y-1.5 xs:space-y-2">
              <Label
                htmlFor="email"
                className="text-xs xs:text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-9 xs:pl-10 h-10 xs:h-11 sm:h-12 text-xs xs:text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={isLoading}
              className="w-full h-10 xs:h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs xs:text-sm sm:text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Send OTP
                  <ArrowRight className="ml-2 w-4 h-4 xs:w-5 xs:h-5" />
                </span>
              )}
            </Button>
          </div>

          <div className="mt-5 xs:mt-6 pt-4 xs:pt-5 border-t border-gray-200">
            <p className="text-center text-[10px] xs:text-xs text-gray-600 leading-relaxed">
              Need help?{' '}
              <button
                type="button"
                onClick={() =>
                  alert('Please contact your HR department for assistance')
                }
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Contact your HR department
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 xs:mt-6 text-center">
          <p className="text-[10px] xs:text-xs text-gray-500">
            © 2024 PayrollPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
