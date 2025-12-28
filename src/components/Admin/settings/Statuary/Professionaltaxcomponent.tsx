"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProfessionalTaxComponentProps {
  onComplete?: () => void;
}

export default function ProfessionalTaxComponent({
  onComplete,
}: ProfessionalTaxComponentProps) {
  const [formData, setFormData] = useState({
    state: "",
    ptNumber: "",
    deductionCycle: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("professionalTaxConfig");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setFormData({ ...formData, ...config });
      } catch (error) {
        console.error("Error loading Professional Tax configuration:", error);
      }
    }
  }, []);

  const handleUpdatePTNumber = () => {
    toast.info("PT Number update functionality - to be implemented");
  };

  const handleViewTaxSlabs = () => {
    toast.info("View tax slabs functionality - to be implemented");
  };

  const handleComplete = () => {
    if (!formData.state) {
      toast.error("State information is required");
      return;
    }

    const config = {
      ...formData,
      isConfigured: true,
    };

    localStorage.setItem("professionalTaxConfig", JSON.stringify(config));
    toast.success("Professional Tax configuration saved");

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Professional Tax
        </h3>
        <p className="text-sm text-gray-600">
          This tax is levied on an employee's income by the State Government. Tax slabs
          differ in each state.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Head Office</h4>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700">PT Number</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-900">
                {formData.ptNumber || "Not configured"}
              </span>
              <button
                type="button"
                onClick={handleUpdatePTNumber}
                className="text-sm text-blue-600 hover:underline"
              >
                {formData.ptNumber ? "Update" : "Add"} PT Number
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">State</span>
            <span className="text-sm text-gray-900">
              {formData.state || "Not configured"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">
              Deduction Cycle
            </span>
            <span className="text-sm text-gray-900">
              {formData.deductionCycle || "Not configured"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">PT Slabs</span>
            <button
              type="button"
              onClick={handleViewTaxSlabs}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              View Tax Slabs
              <span className="text-xs">↗</span>
            </button>
          </div>
        </div>

        {!formData.state && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Configure Required:</strong> Please configure your state and PT details to enable Professional Tax deductions.
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