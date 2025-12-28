"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface LabourWelfareFundComponentProps {
  onComplete?: () => void;
}

export default function LabourWelfareFundComponent({
  onComplete,
}: LabourWelfareFundComponentProps) {
  const [formData, setFormData] = useState({
    state: "",
    employeeContribution: "",
    employerContribution: "",
    deductionCycle: "Yearly",
    status: "Disabled",
  });

  useEffect(() => {
    const saved = localStorage.getItem("labourWelfareFundConfig");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setFormData({ ...formData, ...config });
      } catch (error) {
        console.error("Error loading Labour Welfare Fund configuration:", error);
      }
    }
  }, []);

  const handleEnable = () => {
    if (!formData.state) {
      toast.error("Please configure state information first");
      return;
    }

    if (!formData.employeeContribution) {
      toast.error("Please configure employee contribution");
      return;
    }

    if (!formData.employerContribution) {
      toast.error("Please configure employer contribution");
      return;
    }

    const config = {
      ...formData,
      status: "Enabled",
    };

    localStorage.setItem("labourWelfareFundConfig", JSON.stringify(config));
    setFormData(config);
    toast.success("Labour Welfare Fund enabled successfully");

    if (onComplete) {
      onComplete();
    }
  };

  const handleComplete = () => {
    const config = {
      ...formData,
      isConfigured: true,
    };

    localStorage.setItem("labourWelfareFundConfig", JSON.stringify(config));
    toast.success("Labour Welfare Fund configuration saved");

    if (onComplete) {
      onComplete();
    }
  };

  const handleConfigure = () => {
    toast.info("Configuration functionality - to be implemented");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Labour Welfare Fund
        </h3>
        <p className="text-sm text-gray-600">
          Labour Welfare Fund act ensures social security and improves working
          conditions for employees.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">
            {formData.state || "Not Configured"}
          </h4>
          {!formData.state && (
            <button
              onClick={handleConfigure}
              className="text-sm text-blue-600 hover:underline"
            >
              Configure State
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700">
              Employees' Contribution
            </span>
            <span className="text-sm text-gray-900">
              {formData.employeeContribution ? `₹ ${formData.employeeContribution}` : "Not configured"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">
              Employer's Contribution
            </span>
            <span className="text-sm text-gray-900">
              {formData.employerContribution ? `₹ ${formData.employerContribution}` : "Not configured"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">
              Deduction Cycle
            </span>
            <span className="text-sm text-gray-900">{formData.deductionCycle}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <span
              className={`text-sm font-medium ${
                formData.status === "Enabled" ? "text-green-600" : "text-red-600"
              }`}
            >
              {formData.status}{" "}
              {formData.status === "Disabled" && formData.state && (
                <button
                  onClick={handleEnable}
                  className="text-blue-600 hover:underline ml-1"
                >
                  (Enable)
                </button>
              )}
            </span>
          </div>
        </div>

        {!formData.state && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Configuration Required:</strong> Please configure state-specific Labour Welfare Fund details including contribution amounts.
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-6">
        <button
          onClick={handleComplete}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}