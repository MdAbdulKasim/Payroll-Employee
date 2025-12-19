"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ESIComponentProps {
  onComplete?: () => void;
}

export default function ESIComponent({ onComplete }: ESIComponentProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    esiNumber: "",
    deductionCycle: "Monthly",
    employeeContribution: "0.75",
    employerContribution: "3.25",
    includeEmployerInSalary: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("esiConfig");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setIsEnabled(config.isEnabled || false);
        setFormData({ ...formData, ...config });
      } catch (error) {
        console.error("Error loading ESI configuration:", error);
      }
    }
  }, []);

  const handleEnableClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.esiNumber) {
      toast.error("Please enter ESI Number");
      return;
    }

    const config = {
      ...formData,
      isEnabled: true,
    };

    localStorage.setItem("esiConfig", JSON.stringify(config));
    setIsEnabled(true);
    setShowForm(false);
    toast.success("ESI configuration saved successfully");

    if (onComplete) {
      onComplete();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (!showForm && !isEnabled) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-48 h-48 relative">
          {/* <img
            src="/api/placeholder/200/200"
            alt="ESI Illustration"
            className="w-full h-full object-contain"
          /> */}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Are you registered for ESI?
        </h3>
        <p className="text-center text-gray-600 max-w-2xl">
          Organisations having 10 or more employees must register for Employee State
          Insurance (ESI). This scheme provides cash allowances and medical benefits for
          employees whose monthly salary is less than ₹21,000.
        </p>
        <button
          onClick={handleEnableClick}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Enable ESI
        </button>
      </div>
    );
  }

  if (!showForm && isEnabled) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">ESI Enabled</h3>
          <p className="text-gray-600">ESI has been configured for your organization.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Edit Configuration
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-900">
        Employees' State Insurance
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ESI Number
          </label>
          <input
            type="text"
            placeholder="00-00-000000-000-0000"
            value={formData.esiNumber}
            onChange={(e) =>
              setFormData({ ...formData, esiNumber: e.target.value })
            }
            className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500">Format: 00-00-000000-000-0000</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Deduction Cycle{" "}
            <span className="text-gray-400 cursor-help">ⓘ</span>
          </label>
          <input
            type="text"
            value={formData.deductionCycle}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Employees' Contribution
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formData.employeeContribution}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employeeContribution: e.target.value,
                })
              }
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">of Gross Pay</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Employer's Contribution
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formData.employerContribution}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employerContribution: e.target.value,
                })
              }
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">of Gross Pay</span>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="includeEmployerESI"
            checked={formData.includeEmployerInSalary}
            onChange={(e) =>
              setFormData({
                ...formData,
                includeEmployerInSalary: e.target.checked,
              })
            }
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="includeEmployerESI" className="text-sm text-gray-700">
            Include employer's contribution in employee's salary structure.
          </label>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> ESI deductions will be made only if the employee's
            monthly salary is less than or equal to ₹21,000. If the employee gets a
            salary revision which increases their monthly salary above ₹21,000, they
            would have to continue making ESI contributions till the end of the
            contribution period in which the salary was revised (April-September or
            October-March).
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Enable
        </button>
      </div>
    </form>
  );
}