"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, FileText, ArrowRight } from "lucide-react";

export default function PayrollLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Admin
      if (email === "admin@company.com" && password === "admin123") {
        // Store user info in sessionStorage to identify role in OTP page
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("redirectTo", "/admin/setup");
        router.push("/admin/setup");

        return;
      }

      // Employee
      if (email === "employee@company.com" && password === "emp123") {
        // Store user info in sessionStorage to identify role in OTP page
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userRole", "employee");
        sessionStorage.setItem("redirectTo", "/employee/dashboard");
        router.push("/employee/dashboard");

        return;
      }

      alert("Invalid credentials");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#2563EB] p-3 rounded-xl shadow-lg shadow-blue-500/20">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 tracking-tight">
            PayrollPro
          </h1>
          <p className="text-[10px] font-semibold text-gray-400 tracking-[0.2em] uppercase">
            Financial Suite
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-8 py-10">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Securely access your payroll dashboard and manage team finances.
          </p>

          <div className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-md bg-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Login"}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Register */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/admin/auth/registration")}
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </button>
            </p>
          </div>

          {/* Help */}
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-center text-gray-500">
              Need help?{" "}
              <button
                onClick={() =>
                  alert("Please contact your HR department for assistance")
                }
                className="text-blue-600 hover:underline"
              >
                Contact your HR department
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-gray-400">
          © 2024 PayrollPro. All rights reserved.
        </p>
      </div>
    </div>
  );
}