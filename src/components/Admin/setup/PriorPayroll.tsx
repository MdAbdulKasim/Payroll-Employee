"use client";

import { FileText, SkipForward } from "lucide-react";
import { toast } from "sonner";

interface PriorPayrollProps {
  onComplete?: () => void;
}

export default function PriorPayroll({ onComplete }: PriorPayrollProps) {
  const handleSkip = () => {
    // Mark step as complete
    if (onComplete) {
      onComplete();
    }
    
    // Save to localStorage
    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes("prior-payroll")) {
      completedSteps.push("prior-payroll");
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    toast.info("You can configure prior payroll data later from Settings");
  };

  const handleSetup = () => {
    toast.info("Setup prior payroll - This would open a detailed form");
    
    // Mark step as complete
    if (onComplete) {
      onComplete();
    }
    
    // Save to localStorage
    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes("prior-payroll")) {
      completedSteps.push("prior-payroll");
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }
  };

  const requiredData = [
    "Basic Salary",
    "HRA (House Rent Allowance)",
    "Other Earnings",
    "Allowances",
    "Statutory Components (EPF, ESI, etc.)",
    "Deductions",
    "Loans",
    "LOP Days (Loss of Pay)",
    "Income Tax",
    "Reimbursements",
    "Arrears",
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Configure Prior Payroll Data
        </h3>
        <p className="text-sm text-blue-800">
          The following data from your past payroll are required to ensure
          accurate calculation and compliance in the current payroll period.
        </p>
      </div>

      {/* Required Data Points Card */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Required Data Points
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            You need to enter these details to reach to the following payroll
            periods
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {requiredData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Setup Prior Payroll Card */}
        <div
          className="bg-white rounded-lg shadow border-2 border-gray-200 hover:border-blue-400 transition-colors cursor-pointer"
          onClick={handleSetup}
        >
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Setup Prior Payroll
            </h3>
            <p className="text-sm text-gray-600">
              Configure your historical payroll data for accurate calculations
            </p>
          </div>
        </div>

        {/* Skip for Now Card */}
        <div
          className="bg-white rounded-lg shadow border-2 border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
          onClick={handleSkip}
        >
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <SkipForward className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Skip for Now
            </h3>
            <p className="text-sm text-gray-600">
              You can configure this later from the Settings page
            </p>
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> Without prior payroll data, tax
          calculations and year-to-date reports may not be accurate for the
          current financial year.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          onClick={handleSkip}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Skip for Now
        </button>
        <button
          type="button"
          onClick={handleSetup}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Setup Prior Payroll
        </button>
      </div>
    </div>
  );
}