"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, FileText, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function PayrollLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/payroll/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Login successful!");

        // Store in localStorage/sessionStorage
        localStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userRole", response.data.role || "admin");

        // Store token in cookies (7 days)
        if (response.data.token) {
          const expires = new Date();
          expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
          document.cookie = `token=${response.data.token};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
        }

        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Invalid credentials or server error.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">PayrollPro</h1>
          <p className="text-gray-600 mt-1">Financial Suite</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm mb-6">
            Securely access your payroll dashboard and manage team finances.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="w-full h-11 pl-10 pr-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-right">
            <button
              onClick={() => router.push("/login/forgotpassword")}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-11 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Register */}
          <div className="text-center text-sm text-gray-600 mb-4">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/admin/auth/registration")}
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          © 2024 PayrollPro. All rights reserved.
        </div>
      </div>
    </div>
  );
}