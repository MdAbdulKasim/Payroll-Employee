"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditBasicDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

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

  useEffect(() => {
    if (employeeId) {
      const employees = localStorage.getItem("employees");
      if (employees) {
        const employeeList = JSON.parse(employees);
        const employee = employeeList.find((e: any) => e.id === employeeId);
        if (employee && employee.basicDetails) {
          setFormData(employee.basicDetails);
        }
      }
    }
  }, [employeeId]);

  const handleSave = () => {
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

    const employees = localStorage.getItem("employees");
    if (employees) {
      const employeeList = JSON.parse(employees);
      const index = employeeList.findIndex((e: any) => e.id === employeeId);
      
      if (index !== -1) {
        employeeList[index] = {
          ...employeeList[index],
          basicDetails: formData,
          name: `${formData.firstName} ${formData.lastName || ""}`.trim(),
          email: formData.workEmail,
          department: formData.department,
          designation: formData.designation,
          joiningDate: formData.dateOfJoining,
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

          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            {formData.firstName || "Employee"}'s basic information
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Employee Name<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Middle Name"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.middleName}
                  onChange={(e) =>
                    setFormData({ ...formData, middleName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Employee ID and DOJ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Employee ID<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeId: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Date of Joining<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dateOfJoining}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfJoining: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Work Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Work Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.workEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, workEmail: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Director Checkbox */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDirector}
                  onChange={(e) =>
                    setFormData({ ...formData, isDirector: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded flex-shrink-0"
                />
                <span className="text-xs sm:text-sm">
                  Employee is a Director/person with substantial interest in the
                  company.
                </span>
              </label>
            </div>

            {/* Gender & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Gender<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Work Location<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.workLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, workLocation: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Head Office</option>
                  <option>Chennai</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Delhi</option>
                </select>
              </div>
            </div>

            {/* Designation & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Designation<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>developer</option>
                  <option>Manager</option>
                  <option>Senior Developer</option>
                  <option>Junior Developer</option>
                  <option>HR Manager</option>
                  <option>Team Lead</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2">
                  Department<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>it</option>
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>

            {/* Portal Access */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enablePortalAccess}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      enablePortalAccess: e.target.checked,
                    })
                  }
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded flex-shrink-0"
                />
                <div>
                  <span className="text-xs sm:text-sm font-medium block">Enable Portal Access</span>
                  <p className="text-xs text-gray-600 mt-1">
                    The employee will be able to view payslips, submit their IT
                    declaration and create reimbursement claims through the employee
                    portal.
                  </p>
                </div>
              </label>
            </div>

            {/* Statutory Components */}
            <div className="border-t pt-4">
              <h3 className="text-sm sm:text-base font-semibold mb-3">Statutory Components</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                Enable the necessary benefits and tax applicable for this employee.
              </p>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Professional Tax</span>
              </label>
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