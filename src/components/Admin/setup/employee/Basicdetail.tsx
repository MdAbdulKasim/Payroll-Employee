"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BasicDetailsPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    employeeId: "",
    dateOfJoining: "",
    workEmail: "",
    mobileNumber: "",
    isDirector: false,
    gender: "",
    workLocation: "",
    designation: "",
    department: "",
    enablePortalAccess: false,
  });

  /* ---------------- LOAD DRAFT ---------------- */

  useEffect(() => {
    const savedData = localStorage.getItem("employeeFormData");
    if (savedData) {
      const allData = JSON.parse(savedData);
      if (allData.basicDetails) {
        setFormData(allData.basicDetails);
      }
    }
  }, []);

  /* ---------------- SAVE & CONTINUE ---------------- */

  const handleSaveAndContinue = () => {
    // 🔒 Mandatory validation
    if (
      !formData.firstName ||
      !formData.employeeId ||
      !formData.dateOfJoining ||
      !formData.workEmail ||
      !formData.gender ||
      !formData.workLocation ||
      !formData.designation ||
      !formData.department
    ) {
      alert("Please fill all mandatory fields");
      return;
    }

    const existingData = localStorage.getItem("employeeFormData");
    const allData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "employeeFormData",
      JSON.stringify({
        ...allData,
        basicDetails: formData,
      })
    );

    // 👉 Go to next step
    router.push("/admin/employee/salary");
  };

  /* ---------------- CANCEL ---------------- */

  const handleCancel = () => {
    localStorage.removeItem("employeeFormData");
    router.push("/admin/employee");
  };

  const steps = [
    { number: 1, title: "Basic Details", active: true },
    { number: 2, title: "Salary Details", active: false },
    { number: 3, title: "Personal Details", active: false },
    { number: 4, title: "Payment Information", active: false },
  ];

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">Add Employee</h2>
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
                        step.active
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 bg-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Employee Name<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Middle Name"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.middleName}
                  onChange={(e) =>
                    setFormData({ ...formData, middleName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Employee ID and DOJ */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Employee ID<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeId: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Joining<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.dateOfJoining}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfJoining: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Work Email & Mobile */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Work Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.workEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, workEmail: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Gender & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gender<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Work Location<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.workLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, workLocation: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Chennai</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Delhi</option>
                </select>
              </div>
            </div>

            {/* Designation & Department */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Designation<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Manager</option>
                  <option>Senior Developer</option>
                  <option>Junior Developer</option>
                  <option>HR Manager</option>
                  <option>Team Lead</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Department<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <p className="text-sm text-gray-500">* indicates mandatory fields</p>
            <div className="flex gap-2">
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
