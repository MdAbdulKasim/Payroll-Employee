"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Save as: src/components/Admin/Employee/EditPayment.tsx

export default function EditPaymentInformation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [formData, setFormData] = useState({
    paymentMethod: "direct-deposit",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    reenterAccountNumber: "",
    ifsc: "",
    accountType: "savings",
  });

  useEffect(() => {
    if (employeeId) {
      const employees = localStorage.getItem("employees");
      if (employees) {
        const employeeList = JSON.parse(employees);
        const employee = employeeList.find((e: any) => e.id === employeeId);
        if (employee && employee.paymentInfo) {
          setFormData(employee.paymentInfo);
        }
      }
    }
  }, [employeeId]);

  const paymentMethods = [
    {
      id: "direct-deposit",
      title: "Direct Deposit (Automated Process)",
      description: "Initiate payment in Payroll once the pay run is approved",
      icon: "💳",
    },
    {
      id: "bank-transfer",
      title: "Bank Transfer (Manual Process)",
      description: "Download Bank Advice and process the payment through your bank's website",
      icon: "🏦",
    },
    {
      id: "cheque",
      title: "Cheque",
      description: "",
      icon: "📝",
    },
    {
      id: "cash",
      title: "Cash",
      description: "",
      icon: "💵",
    },
  ];

  const handleSave = () => {
    // Validate bank account fields if direct-deposit or bank-transfer is selected
    if (
      formData.paymentMethod === "bank-transfer" ||
      formData.paymentMethod === "direct-deposit"
    ) {
      if (
        !formData.accountHolderName ||
        !formData.bankName ||
        !formData.accountNumber ||
        !formData.reenterAccountNumber ||
        !formData.ifsc
      ) {
        alert("Please fill all bank account details");
        return;
      }
      if (formData.accountNumber !== formData.reenterAccountNumber) {
        alert("Account numbers do not match");
        return;
      }
    }

    const employees = localStorage.getItem("employees");
    if (employees) {
      const employeeList = JSON.parse(employees);
      const index = employeeList.findIndex((e: any) => e.id === employeeId);

      if (index !== -1) {
        employeeList[index] = {
          ...employeeList[index],
          paymentInfo: formData,
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Back Button */}
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Employee Details</span>
          </button>

          <h2 className="text-2xl font-bold mb-6">Edit Payment Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-4">
                How would you like to pay this employee?
                <span className="text-red-500">*</span>
              </label>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <React.Fragment key={method.id}>
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: method.id })
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{method.title}</h3>
                            {method.id === "direct-deposit" && (
                              <a
                                href="#"
                                className="text-sm text-blue-600 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                              </a>
                            )}
                          </div>
                          {method.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {method.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.paymentMethod === method.id
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.paymentMethod === method.id && (
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Account Fields */}
                    {formData.paymentMethod === method.id &&
                      (method.id === "direct-deposit" ||
                        method.id === "bank-transfer") && (
                        <div className="space-y-4 bg-gray-50 border rounded-lg p-4 ml-12">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Account Holder Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.accountHolderName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  accountHolderName: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              placeholder="Enter account holder name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Bank Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.bankName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bankName: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              placeholder="Enter bank name"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Account Number<span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.accountNumber}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    accountNumber: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                placeholder="Enter account number"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Re-enter Account Number
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.reenterAccountNumber}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    reenterAccountNumber: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                placeholder="Re-enter account number"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                IFSC<span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.ifsc}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    ifsc: e.target.value.toUpperCase(),
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                placeholder="AAAA0000000"
                                maxLength={11}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Account Type<span className="text-red-500">*</span>
                              </label>
                              <div className="flex items-center gap-6 mt-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="accountType"
                                    value="current"
                                    checked={formData.accountType === "current"}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        accountType: e.target.value,
                                      })
                                    }
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <span className="text-sm">Current</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="accountType"
                                    value="savings"
                                    checked={formData.accountType === "savings"}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        accountType: e.target.value,
                                      })
                                    }
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <span className="text-sm">Savings</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Notes */}
            {formData.paymentMethod === "direct-deposit" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Make sure you have configured your bank
                  account details and enabled direct deposit in Payroll settings
                  before using this option.
                </p>
              </div>
            )}

            {formData.paymentMethod === "bank-transfer" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>Note:</strong> You'll need to manually process the
                  payment through your bank after downloading the bank advice file.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
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