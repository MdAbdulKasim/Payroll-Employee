"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditPersonalDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

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

  useEffect(() => {
    if (employeeId) {
      const employees = localStorage.getItem("employees");
      if (employees) {
        const employeeList = JSON.parse(employees);
        const employee = employeeList.find((e: any) => e.id === employeeId);
        if (employee && employee.personalDetails) {
          setFormData(employee.personalDetails);
        }
      }
    }
  }, [employeeId]);

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

  const handleSave = () => {
    if (!formData.dateOfBirth || !formData.fatherName) {
      alert("Please fill all mandatory fields");
      return;
    }

    const employees = localStorage.getItem("employees");
    if (employees) {
      const employeeList = JSON.parse(employees);
      const index = employeeList.findIndex((e: any) => e.id === employeeId);

      if (index !== -1) {
        employeeList[index] = {
          ...employeeList[index],
          personalDetails: formData,
        };

        localStorage.setItem("employees", JSON.stringify(employeeList));
        router.push(`/admin/employee/view?id=${employeeId}`);
      }
    }
  };

  const handleCancel = () => {
    router.push(`/admin/employee/view?id=${employeeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {/* Back Button */}
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Employee Details</span>
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Edit Personal Information</h2>

          <div className="space-y-4 sm:space-y-6">
            {/* Date of Birth and Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Date of Birth<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleDateOfBirthChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">Age</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg bg-gray-50"
                  value={formData.age}
                  readOnly
                />
              </div>
            </div>

            {/* Father's Name and PAN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Father's Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fatherName}
                  onChange={(e) =>
                    setFormData({ ...formData, fatherName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">PAN</label>
                <input
                  type="text"
                  placeholder="AAAAA0000A"
                  maxLength={10}
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  value={formData.pan}
                  onChange={(e) =>
                    setFormData({ ...formData, pan: e.target.value.toUpperCase() })
                  }
                />
              </div>
            </div>

            {/* Differently Abled Type and Personal Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Differently Abled Type
                </label>
                <select
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.differentlyAbledType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      differentlyAbledType: e.target.value,
                    })
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
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Personal Email Address
                </label>
                <input
                  type="email"
                  placeholder="abc@xyz.com"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, personalEmail: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">
                Residential Address
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine2: e.target.value })
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                  <select
                    className="px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-6 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}