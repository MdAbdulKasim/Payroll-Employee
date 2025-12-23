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
    state: "Tamil Nadu",
    ptNumber: "",
    deductionCycle: "Half Yearly",
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
    // This would typically open a modal or navigate to an edit page
    toast.info("PT Number update functionality");
  };

  const handleViewTaxSlabs = () => {
    // This would typically open a modal or navigate to view tax slabs
    toast.info("View tax slabs functionality");
  };

  const handleComplete = () => {
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
            <button
              type="button"
              onClick={handleUpdatePTNumber}
              className="text-sm text-blue-600 hover:underline"
            >
              Update PT Number
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">State</span>
            <span className="text-sm text-gray-900">{formData.state}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">
              Deduction Cycle
            </span>
            <span className="text-sm text-gray-900">{formData.deductionCycle}</span>
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