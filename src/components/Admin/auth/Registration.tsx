"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    state: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !formData.companyName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.country ||
      !formData.state
    ) {
      return;
    }

    // Store authentication state (you can use cookies, localStorage, or a state management solution)
    localStorage.setItem("isAuthenticated", "true");
    
    // Redirect to dashboard or home page
    router.push("/admin/auth/organisation_setup");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.companyName &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.country &&
    formData.state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md shadow-xl bg-white rounded-lg">
        <div className="p-6 space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">P</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-900">
            Welcome to Payroll
          </h1>
          <p className="text-center text-gray-500">
            Enter your details to get started
          </p>
        </div>

        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="companyName"
                className="text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country"
                className="text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Select country</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="state"
                className="text-sm font-medium text-gray-700"
              >
                State
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Select state</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="karnataka">Karnataka</option>
                <option value="maharashtra">Maharashtra</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!isFormValid}
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}