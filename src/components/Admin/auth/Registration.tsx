"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, FileText, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function RegistrationPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !formData.fullName ||
      !formData.organizationName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/payroll/auth/register", {
        fullName: formData.fullName,
        organizationName: formData.organizationName,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Account created successfully!");

        // Store authentication state and session info for OTP page
        localStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userEmail", formData.email);
        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("orgId", response.data.orgId);
        sessionStorage.setItem("organizationName", response.data.organizationName || formData.organizationName);
        sessionStorage.setItem("redirectTo", "/login");

        // Redirect to OTP page
        router.push("/admin/auth/otp");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.fullName &&
    formData.organizationName &&
    formData.email &&
    formData.phone &&
    formData.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">PayrollPro</h1>
            <p className="text-[10px] font-semibold text-gray-400 tracking-[0.2em] uppercase">
              Financial Suite
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">
            Streamline your business payroll and manage team payments with confidence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Martha Nielsen"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Organization Name */}
          <div className="space-y-1.5">
            <label htmlFor="organizationName" className="text-sm font-semibold text-gray-700">
              Organization Name
            </label>
            <input
              id="organizationName"
              type="text"
              placeholder="Acme Inc."
              value={formData.organizationName}
              onChange={(e) => handleChange("organizationName", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="martha.nielsen@company.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:shadow-none mt-4 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-[#2563EB] font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}