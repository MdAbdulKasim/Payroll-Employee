"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PersonalDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    age: "",
    fatherName: "",
    pan: "",
    differentlyAbledType: "None",
    personalEmail: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
  });

  /* ---------------- LOAD DRAFT ---------------- */

  useEffect(() => {
    const savedData = localStorage.getItem("employeeFormData");
    if (savedData) {
      const allData = JSON.parse(savedData);
      setFormData(allData.personalDetails || formData);
    }
  }, []);

  /* ---------------- HELPERS ---------------- */

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return "";
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleDateOfBirthChange = (value: string) => {
    setFormData({
      ...formData,
      dateOfBirth: value,
      age: calculateAge(value),
    });
  };

  /* ---------------- SAVE & CONTINUE ---------------- */

  const handleSaveAndContinue = () => {
    // 🔒 REQUIRED FIELD VALIDATION (ONLY ADDITION)
    if (!formData.dateOfBirth || !formData.fatherName) {
      alert("Please fill all mandatory fields");
      return;
    }

    const existingData = localStorage.getItem("employeeFormData");
    const allData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "employeeFormData",
      JSON.stringify({
        ...allData,
        personalDetails: formData,
      })
    );

    router.push("/admin/employee/payment");
  };

  /* ---------------- NAVIGATION ---------------- */

  const handleBack = () => {
    router.push("/admin/employee/salary");
  };

  const handleCancel = () => {
    localStorage.removeItem("employeeFormData");
    router.push("/admin/employee");
  };

  const steps = [
    { number: 1, title: "Basic Details", completed: true },
    { number: 2, title: "Salary Details", completed: true },
    { number: 3, title: "Personal Details", active: true },
    { number: 4, title: "Payment Information", active: false },
  ];

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">sdfghn's Profile</h2>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : step.active
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.completed ? "✓" : step.number}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        step.completed ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Date of Birth and Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  placeholder="dd/MM/yyyy"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleDateOfBirthChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  value={formData.age}
                  readOnly
                />
              </div>
            </div>

            {/* Father's Name and PAN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Father's Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">PAN</label>
                <input
                  type="text"
                  placeholder="AAAAA0000A"
                  maxLength={10}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  value={formData.pan}
                  onChange={(e) =>
                    setFormData({ ...formData, pan: e.target.value.toUpperCase() })
                  }
                />
              </div>
            </div>

            {/* Differently Abled Type and Personal Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Differently Abled Type
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.differentlyAbledType}
                  onChange={(e) =>
                    setFormData({ ...formData, differentlyAbledType: e.target.value })
                  }
                >
                  <option value="None">None</option>
                  <option value="Visual">Visual Impairment</option>
                  <option value="Hearing">Hearing Impairment</option>
                  <option value="Mobility">Mobility Impairment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Personal Email Address
                </label>
                <input
                  type="email"
                  placeholder="abc@xyz.com"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, personalEmail: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <label className="block text-sm font-medium mb-2">Residential Address</label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine2: e.target.value })
                  }
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                  <select
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  >
                    <option value="">State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi">Delhi</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                  <input
                    type="text"
                    placeholder="PIN Code"
                    maxLength={6}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.pinCode}
                    onChange={(e) =>
                      setFormData({ ...formData, pinCode: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <p className="text-sm text-gray-500">* indicates mandatory fields</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSaveAndContinue}
              >
                Save and Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
