"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SalaryDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    annualCtc: 0,
    basicPercentage: 50,
    hraPercentage: 50,
    conveyanceAllowance: 0,
    fixedAllowance: 0,
  });

  /* ---------------- LOAD DRAFT ---------------- */

  useEffect(() => {
    const savedData = localStorage.getItem("employeeFormData");
    if (savedData) {
      const allData = JSON.parse(savedData);
      setFormData(allData.salaryDetails || formData);
    }
  }, []);

  /* ---------------- CALCULATIONS ---------------- */

  const calculateMonthlyAmount = (percentage: number, type: "ctc" | "basic") => {
    if (type === "ctc") {
      return Math.round((formData.annualCtc * percentage) / 100 / 12);
    } else {
      const basicMonthly = Math.round(
        (formData.annualCtc * formData.basicPercentage) / 100 / 12
      );
      return Math.round((basicMonthly * percentage) / 100);
    }
  };

  const calculateAnnualAmount = (percentage: number, type: "ctc" | "basic") => {
    if (type === "ctc") {
      return Math.round((formData.annualCtc * percentage) / 100);
    } else {
      const basicAnnual = Math.round(
        (formData.annualCtc * formData.basicPercentage) / 100
      );
      return Math.round((basicAnnual * percentage) / 100);
    }
  };

  const monthlyCtc = Math.round(
    calculateMonthlyAmount(formData.basicPercentage, "ctc") +
      calculateMonthlyAmount(formData.hraPercentage, "basic") +
      formData.conveyanceAllowance +
      formData.fixedAllowance
  );

  const totalCostToCompany = Math.round(
    calculateAnnualAmount(formData.basicPercentage, "ctc") +
      calculateAnnualAmount(formData.hraPercentage, "basic") * 12 +
      formData.conveyanceAllowance * 12 +
      formData.fixedAllowance * 12
  );

  /* ---------------- SAVE & CONTINUE ---------------- */

  const handleSaveAndContinue = () => {
    // 🔒 REQUIRED FIELD VALIDATION (ONLY ADDITION)
    if (!formData.annualCtc || formData.annualCtc <= 0) {
      alert("Please enter Annual CTC");
      return;
    }

    const existingData = localStorage.getItem("employeeFormData");
    const allData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "employeeFormData",
      JSON.stringify({
        ...allData,
        salaryDetails: formData,
      })
    );

    router.push("/admin/employee/personal");
  };

  /* ---------------- NAVIGATION ---------------- */

  const handleBack = () => {
    router.push("/admin/employee/basic");
  };

  const handleCancel = () => {
    localStorage.removeItem("employeeFormData");
    router.push("/admin/employee");
  };

  const steps = [
    { number: 1, title: "Basic Details", completed: true },
    { number: 2, title: "Salary Details", active: true },
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
            {/* Annual CTC */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Annual CTC<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">₹</span>
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.annualCtc || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, annualCtc: Number(e.target.value) })
                  }
                />
                <span className="text-sm text-gray-600">per year</span>
              </div>
            </div>

             {/* Salary Components Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Salary Components
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Calculation Type
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Monthly Amount
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Annual Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-4 py-2 font-semibold text-sm">
                      Earnings
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">Basic</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border rounded text-sm"
                          value={formData.basicPercentage}
                          onChange={(e) =>
                            setFormData({ ...formData, basicPercentage: Number(e.target.value) })
                          }
                        />
                        <span className="text-sm text-gray-600">% of CTC</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {calculateMonthlyAmount(formData.basicPercentage, "ctc")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {calculateAnnualAmount(formData.basicPercentage, "ctc")}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">House Rent Allowance</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border rounded text-sm"
                          value={formData.hraPercentage}
                          onChange={(e) =>
                            setFormData({ ...formData, hraPercentage: Number(e.target.value) })
                          }
                        />
                        <span className="text-sm text-gray-600">% of Basic</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {calculateMonthlyAmount(formData.hraPercentage, "basic")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {calculateAnnualAmount(formData.hraPercentage, "basic")}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">Conveyance Allowance</td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">Fixed amount</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border rounded text-sm text-right"
                        value={formData.conveyanceAllowance || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, conveyanceAllowance: Number(e.target.value) })
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right">{formData.conveyanceAllowance * 12}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        Fixed Allowance <span className="text-blue-600 cursor-pointer">ℹ</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Monthly CTC - Sum of all other components
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">Fixed amount</span>
                    </td>
                    <td className="px-4 py-3 text-right">{formData.fixedAllowance}</td>
                    <td className="px-4 py-3 text-right">{formData.fixedAllowance * 12}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cost to Company Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Cost to Company</span>
                <div className="flex gap-8">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 font-normal">Monthly</div>
                    <div>₹{monthlyCtc.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 font-normal">Annual</div>
                    <div>₹{totalCostToCompany.toLocaleString()}</div>
                  </div>
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
