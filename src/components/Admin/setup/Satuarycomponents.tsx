"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface StatutoryComponentsProps {
  onComplete?: () => void;
}

interface StatutoryComponent {
  enabled: boolean;
  employerContribution?: string;
  employeeContribution?: string;
  bonusPercentage?: string;
  state?: string;
}

interface StatutoryComponentsConfig {
  epf: StatutoryComponent;
  esi: StatutoryComponent;
  lwf: StatutoryComponent;
  professionalTax: StatutoryComponent;
  statutoryBonus: StatutoryComponent;
}

const defaultComponents: StatutoryComponentsConfig = {
  epf: {
    enabled: false,
    employerContribution: "12",
    employeeContribution: "12",
  },
  esi: {
    enabled: false,
    employerContribution: "3.25",
    employeeContribution: "0.75",
  },
  lwf: {
    enabled: false,
  },
  professionalTax: {
    enabled: false,
    state: "tamil-nadu",
  },
  statutoryBonus: {
    enabled: false,
    bonusPercentage: "8.33",
  },
};

export default function StatutoryComponents({
  onComplete,
}: StatutoryComponentsProps) {
  const [components, setComponents] =
    useState<StatutoryComponentsConfig>(defaultComponents);

  // Load saved configuration from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("statutoryComponents");
    if (saved) {
      try {
        setComponents(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading statutory components:", error);
      }
    }
  }, []);

  const handleToggle = (component: keyof StatutoryComponentsConfig) => {
    setComponents((prev) => ({
      ...prev,
      [component]: { ...prev[component], enabled: !prev[component].enabled },
    }));
  };

  const handleInputChange = (
    component: keyof StatutoryComponentsConfig,
    field: string,
    value: string
  ) => {
    setComponents((prev) => ({
      ...prev,
      [component]: { ...prev[component], [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("statutoryComponents", JSON.stringify(components));

    // Mark step as complete
    if (onComplete) {
      onComplete();
    }

    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes("statutory-components")) {
      completedSteps.push("statutory-components");
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    toast.success("Statutory components configured successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* EPF Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-base font-medium text-gray-900">
              Employee Provident Fund (EPF)
            </label>
            <p className="text-sm text-gray-500">
              Mandatory for organizations with 20+ employees
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={components.epf.enabled}
            onClick={() => handleToggle("epf")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              components.epf.enabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                components.epf.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {components.epf.enabled && (
          <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Employer Contribution (%)
              </label>
              <input
                type="number"
                placeholder="12"
                value={components.epf.employerContribution}
                onChange={(e) =>
                  handleInputChange("epf", "employerContribution", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Employee Contribution (%)
              </label>
              <input
                type="number"
                placeholder="12"
                value={components.epf.employeeContribution}
                onChange={(e) =>
                  handleInputChange("epf", "employeeContribution", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* ESI Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-base font-medium text-gray-900">
              Employee State Insurance (ESI)
            </label>
            <p className="text-sm text-gray-500">
              Applicable for employees earning up to ₹21,000/month
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={components.esi.enabled}
            onClick={() => handleToggle("esi")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              components.esi.enabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                components.esi.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {components.esi.enabled && (
          <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Employer Contribution (%)
              </label>
              <input
                type="number"
                placeholder="3.25"
                value={components.esi.employerContribution}
                onChange={(e) =>
                  handleInputChange("esi", "employerContribution", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Employee Contribution (%)
              </label>
              <input
                type="number"
                placeholder="0.75"
                value={components.esi.employeeContribution}
                onChange={(e) =>
                  handleInputChange("esi", "employeeContribution", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Labour Welfare Fund */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-base font-medium text-gray-900">
              Labour Welfare Fund (LWF)
            </label>
            <p className="text-sm text-gray-500">State-specific contribution</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={components.lwf.enabled}
            onClick={() => handleToggle("lwf")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              components.lwf.enabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                components.lwf.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Professional Tax */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-base font-medium text-gray-900">
              Professional Tax
            </label>
            <p className="text-sm text-gray-500">State-specific tax deduction</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={components.professionalTax.enabled}
            onClick={() => handleToggle("professionalTax")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              components.professionalTax.enabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                components.professionalTax.enabled
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {components.professionalTax.enabled && (
          <div className="ml-6 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select State
              </label>
              <select
                value={components.professionalTax.state}
                onChange={(e) =>
                  handleInputChange("professionalTax", "state", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="karnataka">Karnataka</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="west-bengal">West Bengal</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Statutory Bonus */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-base font-medium text-gray-900">
              Statutory Bonus
            </label>
            <p className="text-sm text-gray-500">
              Minimum 8.33% of salary, maximum ₹7,000
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={components.statutoryBonus.enabled}
            onClick={() => handleToggle("statutoryBonus")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              components.statutoryBonus.enabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                components.statutoryBonus.enabled
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {components.statutoryBonus.enabled && (
          <div className="ml-6 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bonus Percentage (%)
              </label>
              <input
                type="number"
                placeholder="8.33"
                value={components.statutoryBonus.bonusPercentage}
                onChange={(e) =>
                  handleInputChange(
                    "statutoryBonus",
                    "bonusPercentage",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Statutory compliance is mandatory based on your
          location and organization size. Consult with your legal team if you're
          unsure.
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
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}