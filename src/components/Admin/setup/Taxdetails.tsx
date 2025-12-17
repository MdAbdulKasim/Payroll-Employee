"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface TaxDetailsProps {
  onComplete?: () => void;
}

interface TaxDetailsForm {
  pan: string;
  tan: string;
  tdsCircleAoCode: string;
  taxPaymentFrequency: string;
  deductorType: string;
}

export default function TaxDetails({ onComplete }: TaxDetailsProps) {
  const [formData, setFormData] = useState<TaxDetailsForm>({
    pan: "",
    tan: "",
    tdsCircleAoCode: "",
    taxPaymentFrequency: "",
    deductorType: "",
  });

  // Load saved tax details from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("taxDetails");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading tax details:", error);
      }
    }
  }, []);

  const handleChange = (field: keyof TaxDetailsForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePAN = (pan: string): boolean => {
    // PAN format: 5 letters, 4 digits, 1 letter (e.g., AAAAA0000A)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateTAN = (tan: string): boolean => {
    // TAN format: 4 letters, 5 digits, 1 letter (e.g., AAAA00000A)
    const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
    return tanRegex.test(tan);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate PAN
    if (!validatePAN(formData.pan)) {
      toast.error("Invalid PAN format. Expected format: AAAAA0000A");
      return;
    }

    // Validate TAN
    if (!validateTAN(formData.tan)) {
      toast.error("Invalid TAN format. Expected format: AAAA00000A");
      return;
    }

    // Validate all required fields
    if (
      !formData.pan ||
      !formData.tan ||
      !formData.tdsCircleAoCode ||
      !formData.taxPaymentFrequency ||
      !formData.deductorType
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Save to localStorage
    localStorage.setItem("taxDetails", JSON.stringify(formData));

    // Mark step as complete
    if (onComplete) {
      onComplete();
    }

    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes("tax-details")) {
      completedSteps.push("tax-details");
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    toast.success("Tax details saved successfully");
  };

  const isFormValid =
    formData.pan &&
    formData.tan &&
    formData.tdsCircleAoCode &&
    formData.taxPaymentFrequency &&
    formData.deductorType;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PAN */}
        <div className="space-y-2">
          <label
            htmlFor="pan"
            className="block text-sm font-medium text-gray-700"
          >
            PAN*
          </label>
          <input
            id="pan"
            type="text"
            placeholder="AAAAA0000A"
            value={formData.pan}
            onChange={(e) => handleChange("pan", e.target.value.toUpperCase())}
            maxLength={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
            required
          />
          <p className="text-xs text-gray-500">10-character alphanumeric code</p>
        </div>

        {/* TAN */}
        <div className="space-y-2">
          <label
            htmlFor="tan"
            className="block text-sm font-medium text-gray-700"
          >
            TAN*
          </label>
          <input
            id="tan"
            type="text"
            placeholder="AAAA00000A"
            value={formData.tan}
            onChange={(e) => handleChange("tan", e.target.value.toUpperCase())}
            maxLength={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
            required
          />
          <p className="text-xs text-gray-500">10-character alphanumeric code</p>
        </div>

        {/* TDS Circle/AO Code */}
        <div className="space-y-2">
          <label
            htmlFor="tdsCircleAoCode"
            className="block text-sm font-medium text-gray-700"
          >
            TDS Circle/AO Code*
          </label>
          <input
            id="tdsCircleAoCode"
            type="text"
            placeholder="AAA/AA/000/00"
            value={formData.tdsCircleAoCode}
            onChange={(e) => handleChange("tdsCircleAoCode", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500">Format: AAA/AA/000/00</p>
        </div>

        {/* Tax Payment Frequency */}
        <div className="space-y-2">
          <label
            htmlFor="taxPaymentFrequency"
            className="block text-sm font-medium text-gray-700"
          >
            Tax Payment Frequency*
          </label>
          <select
            id="taxPaymentFrequency"
            value={formData.taxPaymentFrequency}
            onChange={(e) =>
              handleChange("taxPaymentFrequency", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            required
          >
            <option value="">Select frequency</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        {/* Deductor Type */}
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label
            htmlFor="deductorType"
            className="block text-sm font-medium text-gray-700"
          >
            Deductor Type*
          </label>
          <select
            id="deductorType"
            value={formData.deductorType}
            onChange={(e) => handleChange("deductorType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            required
          >
            <option value="">Select deductor type</option>
            <option value="company">Company</option>
            <option value="individual">Individual</option>
            <option value="government">Government</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> These tax details will be used for all
          statutory compliance and reporting. Please ensure all information is
          accurate.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}