"use client";
import React, { useState } from "react";
import { X, Edit, TrendingUp } from "lucide-react";
import PayslipsAndForms from "./PayslipsAndForms"; // Adjust path as needed

interface EmployeeData {
  id: string;
  basicDetails: {
    firstName: string;
    middleName?: string;
    lastName?: string;
    employeeId: string;
    dateOfJoining: string;
    workEmail: string;
    mobileNumber?: string;
    gender: string;
    workLocation: string;
    designation: string;
    department: string;
    enablePortalAccess: boolean;
  };
  personalDetails: {
    dateOfBirth: string;
    age: string;
    fatherName: string;
    pan?: string;
    differentlyAbledType: string;
    personalEmail?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pinCode?: string;
  };
  salaryDetails: {
    annualCtc: number;
    basicPercentage: number;
    hraPercentage: number;
    conveyanceAllowance: number;
    fixedAllowance: number;
  };
  paymentInfo: {
    paymentMethod: string;
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    ifsc?: string;
    accountType?: string;
  };
}

const EMPLOYEE_DATA: EmployeeData = {
  id: "1",
  basicDetails: {
    firstName: "Ajees",
    middleName: "Kumar",
    lastName: "Rahman",
    employeeId: "EMP001",
    dateOfJoining: "2025-01-15",
    workEmail: "ajees@company.com",
    mobileNumber: "+91 9876543210",
    gender: "Male",
    workLocation: "Chennai Office",
    designation: "HR Manager",
    department: "Human Resources",
    enablePortalAccess: true,
  },
  personalDetails: {
    dateOfBirth: "1990-05-15",
    age: "34",
    fatherName: "Abdul Rahman",
    pan: "ABCDE1234F",
    differentlyAbledType: "None",
    personalEmail: "ajees.personal@gmail.com",
    addressLine1: "123, Main Street",
    addressLine2: "Sector 12",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600001",
  },
  salaryDetails: {
    annualCtc: 600000,
    basicPercentage: 40,
    hraPercentage: 50,
    conveyanceAllowance: 1600,
    fixedAllowance: 2000,
  },
  paymentInfo: {
    paymentMethod: "direct-deposit",
    accountHolderName: "Ajees Kumar Rahman",
    bankName: "HDFC Bank",
    accountNumber: "12345678901234",
    ifsc: "HDFC0001234",
    accountType: "savings",
  },
};

interface EmployeeViewProps {
  employeeId?: string;
}

export default function EmployeeView({ employeeId = "1" }: EmployeeViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const employeeData = EMPLOYEE_DATA;

  const handleClose = () => {
    window.location.href = "/admin/employee";
  };

  const handleEdit = (section: string) => {
    window.location.href = `/admin/employee/edit/${section}?id=${employeeId}`;
  };

  const handleSalaryRevision = () => {
    window.location.href = `/admin/employee/salary-revision?id=${employeeId}`;
  };

  const basic = employeeData.basicDetails;
  const personal = employeeData.personalDetails;
  const salary = employeeData.salaryDetails;
  const payment = employeeData.paymentInfo;

  const fullName = `${basic.firstName} ${basic.middleName || ""} ${basic.lastName || ""}`.trim();

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-xl sm:text-2xl font-semibold text-white shadow-lg flex-shrink-0">
                {basic.firstName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold break-words">
                      {basic.employeeId} - {fullName}
                    </h2>
                    <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                      Active
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">{basic.designation}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                onClick={() => handleEdit("basic")}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b bg-gray-50 overflow-x-auto">
            <div className="flex gap-1 px-4 sm:px-6">
              <button
                className={`py-3 px-3 sm:px-4 border-b-2 font-medium transition-colors text-sm whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`py-3 px-3 sm:px-4 border-b-2 font-medium transition-colors text-sm whitespace-nowrap ${
                  activeTab === "salary"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("salary")}
              >
                <span className="hidden sm:inline">Salary Details</span>
                <span className="sm:hidden">Salary</span>
              </button>
              <button
                className={`py-3 px-3 sm:px-4 border-b-2 font-medium transition-colors text-sm whitespace-nowrap ${
                  activeTab === "payslips"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("payslips")}
              >
                <span className="hidden sm:inline">Payslips & Forms</span>
                <span className="sm:hidden">Payslips</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {activeTab === "overview" && (
              <div className="space-y-4 sm:space-y-6">
                {/* Basic Information */}
                <div className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold">Basic Information</h3>
                    <button 
                      onClick={() => handleEdit("basic")}
                      className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Name</p>
                      <p className="text-sm sm:text-base font-medium">{fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Work Location</p>
                      <p className="text-sm sm:text-base font-medium">{basic.workLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Email Address</p>
                      <p className="text-sm sm:text-base font-medium text-blue-600 break-all">{basic.workEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Designation</p>
                      <p className="text-sm sm:text-base font-medium">{basic.designation}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Mobile Number</p>
                      <p className="text-sm sm:text-base font-medium">{basic.mobileNumber || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Department</p>
                      <p className="text-sm sm:text-base font-medium">{basic.department}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Date of Joining</p>
                      <p className="text-sm sm:text-base font-medium">{basic.dateOfJoining}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Portal Access</p>
                      <p className="text-sm sm:text-base font-medium">
                        {basic.enablePortalAccess ? (
                          <span className="text-green-600">✓ Enabled</span>
                        ) : (
                          <span className="text-red-600">✗ Disabled</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Gender</p>
                      <p className="text-sm sm:text-base font-medium">{basic.gender}</p>
                    </div>
                  </div>
                </div>

                {/* Statutory Information */}
                <div className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-base sm:text-lg font-semibold mb-4">
                    Statutory Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Professional Tax</p>
                      <p className="text-sm sm:text-base font-medium text-green-600">✓ Enabled</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Personal Information
                    </h3>
                    <button 
                      onClick={() => handleEdit("personal")}
                      className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Date of Birth</p>
                      <p className="text-sm sm:text-base font-medium">{personal.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Age</p>
                      <p className="text-sm sm:text-base font-medium">{personal.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Personal Email</p>
                      <p className="text-sm sm:text-base font-medium text-blue-600 break-all">
                        {personal.personalEmail || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Father's Name</p>
                      <p className="text-sm sm:text-base font-medium">{personal.fatherName}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Residential Address
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        {[
                          personal.addressLine1,
                          personal.addressLine2,
                          personal.city,
                          personal.state,
                          personal.pinCode,
                        ]
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">PAN</p>
                      <p className="text-sm sm:text-base font-medium font-mono">{personal.pan || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Differently Abled Type
                      </p>
                      <p className="text-sm sm:text-base font-medium">{personal.differentlyAbledType}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Payment Information
                    </h3>
                    <button 
                      onClick={() => handleEdit("payment")}
                      className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Payment Mode</p>
                      <p className="text-sm sm:text-base font-medium">
                        {payment.paymentMethod === "direct-deposit"
                          ? "Direct Deposit"
                          : payment.paymentMethod === "bank-transfer"
                          ? "Bank Transfer"
                          : payment.paymentMethod === "cheque"
                          ? "Cheque"
                          : "Cash"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Bank Name</p>
                      <p className="text-sm sm:text-base font-medium">{payment.bankName || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Account Holder Name
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        {payment.accountHolderName || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Account Type</p>
                      <p className="text-sm sm:text-base font-medium capitalize">
                        {payment.accountType || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Account Number
                      </p>
                      <p className="text-sm sm:text-base font-medium font-mono">
                        {payment.accountNumber
                          ? `****${payment.accountNumber.slice(-4)}`
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">IFSC Code</p>
                      <p className="text-sm sm:text-base font-medium font-mono">
                        {payment.ifsc || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "salary" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-base sm:text-lg font-semibold">Salary Details</h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleSalaryRevision}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span className="hidden sm:inline">Salary Revision</span>
                        <span className="sm:hidden">Revision</span>
                      </button>
                      <button 
                        onClick={() => handleEdit("salary")}
                        className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">
                        Annual CTC
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-900">
                        ₹{salary.annualCtc.toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">per year</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-xs sm:text-sm text-green-600 font-medium mb-1">
                        Monthly CTC
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-900">
                        ₹{Math.round(salary.annualCtc / 12).toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600 mt-1">per month</p>
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-semibold mb-4 text-gray-700">
                    Salary Breakdown
                  </h4>
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Component
                              </th>
                              <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Monthly
                              </th>
                              <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Annual
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y bg-white">
                            <tr className="bg-gray-50">
                              <td
                                colSpan={3}
                                className="px-3 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-gray-700"
                              >
                                Earnings
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                                Basic ({salary.basicPercentage}% of CTC)
                              </td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                ₹
                                {Math.round(
                                  (salary.annualCtc * salary.basicPercentage) / 100 / 12
                                ).toLocaleString()}
                              </td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                ₹
                                {Math.round(
                                  (salary.annualCtc * salary.basicPercentage) / 100
                                ).toLocaleString()}
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                                HRA ({salary.hraPercentage}% of Basic)
                              </td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                ₹
                                {Math.round(
                                  ((salary.annualCtc * salary.basicPercentage) /
                                    100 /
                                    12) *
                                    (salary.hraPercentage / 100)
                                ).toLocaleString()}
                              </td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                ₹
                                {Math.round(
                                  ((salary.annualCtc * salary.basicPercentage) / 100) *
                                    (salary.hraPercentage / 100)
                                ).toLocaleString()}
                              </td>
                            </tr>
                            {salary.conveyanceAllowance > 0 && (
                              <tr className="hover:bg-gray-50">
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                                  Conveyance Allowance
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                  ₹{salary.conveyanceAllowance.toLocaleString()}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                  ₹{(salary.conveyanceAllowance * 12).toLocaleString()}
                                </td>
                              </tr>
                            )}
                            {salary.fixedAllowance > 0 && (
                              <tr className="hover:bg-gray-50">
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">Fixed Allowance</td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                  ₹{salary.fixedAllowance.toLocaleString()}
                                </td>
                                <td className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">
                                  ₹{(salary.fixedAllowance * 12).toLocaleString()}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perquisites Section */}
                <div className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-700">Perquisites</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Benefits received by this employee in addition to salary
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-xs sm:text-sm text-gray-700">Additional Benefits</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm font-medium">₹0.00</span>
                      <button
                        onClick={() => window.location.href = `/admin/employee/perquisites?id=${employeeId}`}
                        className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm whitespace-nowrap"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payslips" && (
              <PayslipsAndForms
                employeeId={employeeId}
                employeeData={{
                  name: fullName,
                  employeeId: basic.employeeId,
                  designation: basic.designation,
                  dateOfJoining: basic.dateOfJoining,
                  companyAddress: "4.13.15 Arunachalapuram Batlagundu Dindigul Tamil Nadu 624302 India"
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}