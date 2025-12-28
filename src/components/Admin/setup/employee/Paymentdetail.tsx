"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaymentInformationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    paymentMethod: "bank-transfer",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "Savings",
  });

  /* ---------------- LOAD DRAFT ---------------- */

  useEffect(() => {
    const savedData = localStorage.getItem("employeeFormData");
    if (savedData) {
      const allData = JSON.parse(savedData);
      setFormData(allData.paymentInfo || formData);
    }
  }, []);

  /* ---------------- PAYMENT METHODS ---------------- */

  const paymentMethods = [
    {
      id: "direct-deposit",
      title: "Direct Deposit (Automated Process)",
      description: "Initiate payment in Zoho Payroll once the pay run is approved",
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

  /* ---------------- SAVE & CONTINUE (FINAL STEP) ---------------- */

  const handleSaveAndContinue = async () => {
    const draft = localStorage.getItem("employeeFormData");

    if (!draft) {
      toast.error("Employee data missing");
      return;
    }

    const allData = JSON.parse(draft);

    if (formData.paymentMethod === 'bank-transfer' && (!formData.accountHolderName || !formData.accountNumber || !formData.bankName || !formData.ifscCode)) {
      toast.error("Please fill all bank details");
      return;
    }

    setIsLoading(true);

    try {
      // Map frontend data to backend payload
      const payload = {
        fullName: `${allData.basicDetails.firstName} ${allData.basicDetails.middleName ? allData.basicDetails.middleName + ' ' : ''}${allData.basicDetails.lastName || ""}`.trim(),
        employeeId: allData.basicDetails.employeeId,
        dateOfJoining: allData.basicDetails.dateOfJoining,
        workEmail: allData.basicDetails.workEmail,
        personalEmail: allData.personalDetails.personalEmail,
        mobileNumber: allData.basicDetails.mobileNumber,
        gender: allData.basicDetails.gender,
        workLocation: allData.basicDetails.workLocation,
        designation: allData.basicDetails.designation,
        department: allData.basicDetails.department,
        annualCTC: Number(allData.salaryDetails.annualCtc),
        basicPercentage: Number(allData.salaryDetails.basicPercentage),
        hraPercentage: Number(allData.salaryDetails.hraPercentage),
        pan: allData.personalDetails.pan,
        dateOfBirth: allData.personalDetails.dateOfBirth,
        paymentMethod: formData.paymentMethod === 'bank-transfer' ? 'Bank Transfer' :
          formData.paymentMethod === 'direct-deposit' ? 'Direct Deposit' :
            formData.paymentMethod === 'cheque' ? 'Cheque' : 'Cash',
        accountHolderName: formData.accountHolderName,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        accountType: formData.accountType
      };

      const response = await axios.post("http://localhost:4000/api/payroll/employees", payload);

      if (response.status === 201 || response.status === 200) {
        toast.success("Employee created successfully!");
        localStorage.removeItem("employeeFormData");
        router.push("/admin/employee");
      }
    } catch (error: any) {
      console.error("Error creating employee:", error);
      toast.error(error.response?.data?.message || "Failed to create employee");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- NAVIGATION ---------------- */

  const handleBack = () => {
    router.push("/admin/employee/personal");
  };

  const handleSkip = () => {
    localStorage.removeItem("employeeFormData");
    router.push("/admin/employee");
  };

  const steps = [
    { number: 1, title: "Basic Details", completed: true },
    { number: 2, title: "Salary Details", completed: true },
    { number: 3, title: "Personal Details", completed: true },
    { number: 4, title: "Payment Information", active: true },
  ];

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">sdfghn's Profile</h2>
            <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700">
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step.completed
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
                    <div className="flex-1 h-0.5 mx-2 bg-green-500" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-4">
                How would you like to pay this employee?
                <span className="text-red-500">*</span>
              </label>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.paymentMethod === method.id
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
                              Configure Now
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
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method.id
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
                ))}
              </div>
            </div>

            {/* Bank Details (Conditional) */}
            {formData.paymentMethod === "bank-transfer" && (
              <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2 mb-4">Bank Account Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="accountHolderName">Account Holder Name<span className="text-red-500">*</span></Label>
                    <Input
                      id="accountHolderName"
                      placeholder="As per bank records"
                      value={formData.accountHolderName}
                      onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bankName">Bank Name<span className="text-red-500">*</span></Label>
                    <Input
                      id="bankName"
                      placeholder="e.g. HDFC Bank"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="accountNumber">Account Number<span className="text-red-500">*</span></Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter account number"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ifscCode">IFSC Code<span className="text-red-500">*</span></Label>
                    <Input
                      id="ifscCode"
                      placeholder="e.g. HDFC0001234"
                      className="uppercase"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                    />
                  </div>
                </div>
                <div className="w-1/2 space-y-1.5">
                  <Label htmlFor="accountType">Account Type<span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) => setFormData({ ...formData, accountType: value })}
                  >
                    <SelectTrigger id="accountType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings">Savings</SelectItem>
                      <SelectItem value="Current">Current</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Notes */}
            {formData.paymentMethod === "direct-deposit" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Make sure you have configured your bank
                  account details and enabled direct deposit in Zoho Payroll
                  settings before using this option.
                </p>
              </div>
            )}

            {formData.paymentMethod === "bank-transfer" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>Note:</strong> You'll need to manually process the
                  payment through your bank after downloading the bank advice
                  file.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <p className="text-sm text-gray-500">* indicates mandatory fields</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                Back
              </Button>
              <Button variant="outline" onClick={handleSkip} disabled={isLoading}>
                Skip
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                onClick={handleSaveAndContinue}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finishing...
                  </>
                ) : (
                  "Finish & Create Employee"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
