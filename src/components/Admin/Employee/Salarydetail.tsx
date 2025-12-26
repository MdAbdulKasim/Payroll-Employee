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

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Employee's Profile</h2>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-b bg-gray-50 overflow-x-auto">
            <div className="flex items-center justify-between min-w-max sm:min-w-0">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : step.active
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.completed ? "✓" : step.number}
                    </div>
                    <span className="text-[10px] sm:text-xs mt-1 text-gray-600 whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 sm:mx-2 min-w-[20px] ${
                        step.completed ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Annual CTC */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Annual CTC<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">₹</span>
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  value={formData.annualCtc || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, annualCtc: Number(e.target.value) })
                  }
                />
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">per year</span>
              </div>
            </div>

             {/* Salary Components Table - Responsive */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-700 uppercase">
                        Salary Components
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-700 uppercase">
                        Calculation Type
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-700 uppercase">
                        Monthly
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-700 uppercase">
                        Annual
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm">
                        Earnings
                      </td>
                    </tr>

                    <tr>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">Basic</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <input
                            type="number"
                            className="w-12 sm:w-20 px-1 sm:px-2 py-1 border rounded text-xs sm:text-sm"
                            value={formData.basicPercentage}
                            onChange={(e) =>
                              setFormData({ ...formData, basicPercentage: Number(e.target.value) })
                            }
                          />
                          <span className="text-xs sm:text-sm text-gray-600">% of CTC</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                        {calculateMonthlyAmount(formData.basicPercentage, "ctc")}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                        {calculateAnnualAmount(formData.basicPercentage, "ctc")}
                      </td>
                    </tr>

                    <tr>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">HRA</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <input
                            type="number"
                            className="w-12 sm:w-20 px-1 sm:px-2 py-1 border rounded text-xs sm:text-sm"
                            value={formData.hraPercentage}
                            onChange={(e) =>
                              setFormData({ ...formData, hraPercentage: Number(e.target.value) })
                            }
                          />
                          <span className="text-xs sm:text-sm text-gray-600">% of Basic</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                        {calculateMonthlyAmount(formData.hraPercentage, "basic")}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                        {calculateAnnualAmount(formData.hraPercentage, "basic")}
                      </td>
                    </tr>

                    <tr>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">Conveyance</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="text-xs sm:text-sm text-gray-600">Fixed</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right">
                        <input
                          type="number"
                          className="w-16 sm:w-24 px-1 sm:px-2 py-1 border rounded text-xs sm:text-sm text-right"
                          value={formData.conveyanceAllowance || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, conveyanceAllowance: Number(e.target.value) })
                          }
                        />
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                        {formData.conveyanceAllowance * 12}
                      </td>
                    </tr>

                    <tr>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">Fixed Allowance</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="text-xs sm:text-sm text-gray-600">Fixed</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                        {formData.fixedAllowance}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm">
                        {formData.fixedAllowance * 12}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cost to Company Summary */}
            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-base sm:text-lg font-semibold">
                <span>Cost to Company</span>
                <div className="flex gap-4 sm:gap-8 w-full sm:w-auto">
                  <div className="text-left sm:text-right flex-1 sm:flex-none">
                    <div className="text-xs sm:text-sm text-gray-600 font-normal">Monthly</div>
                    <div>₹{monthlyCtc.toLocaleString()}</div>
                  </div>
                  <div className="text-left sm:text-right flex-1 sm:flex-none">
                    <div className="text-xs sm:text-sm text-gray-600 font-normal">Annual</div>
                    <div>₹{totalCostToCompany.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-6 border-t bg-gray-50">
            <p className="text-xs sm:text-sm text-gray-500">* indicates mandatory fields</p>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={handleBack} className="flex-1 sm:flex-none text-sm">
                Back
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none text-sm">
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none text-sm"
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