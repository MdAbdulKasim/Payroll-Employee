"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface EPFComponentProps {
  onComplete?: () => void;
}

export default function EPFComponent({ onComplete }: EPFComponentProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    epfNumber: "",
    deductionCycle: "Monthly",
    employeeContributionRate: "",
    employerContributionRate: "",
    includeEmployerInSalary: false,
    includeEmployerEDLI: false,
    includeAdminCharges: false,
    overridePFContribution: false,
    proRateRestrictedPF: false,
    considerAllComponents: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("epfConfig");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setIsEnabled(config.isEnabled || false);
        setFormData({ ...formData, ...config });
      } catch (error) {
        console.error("Error loading EPF configuration:", error);
      }
    }
  }, []);

  const handleEnableClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.epfNumber) {
      toast.error("Please enter EPF Number");
      return;
    }

    if (!formData.employeeContributionRate) {
      toast.error("Please select Employee Contribution Rate");
      return;
    }

    if (!formData.employerContributionRate) {
      toast.error("Please select Employer Contribution Rate");
      return;
    }

    const config = {
      ...formData,
      isEnabled: true,
    };

    localStorage.setItem("epfConfig", JSON.stringify(config));
    setIsEnabled(true);
    setShowForm(false);
    toast.success("EPF configuration saved successfully");

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
        <div className="w-48 h-48 relative flex items-center justify-center bg-gray-100 rounded-lg">
          <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Are you registered for EPF?
        </h3>
        <p className="text-center text-gray-600 max-w-2xl">
          Any organisation with 20 or more employees must register for the Employee
          Provident Fund (EPF) scheme, a retirement benefit plan for all salaried
          employees.
        </p>
        <button
          onClick={handleEnableClick}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Enable EPF
        </button>
      </div>
    );
  }

  if (!showForm && isEnabled) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">EPF Enabled</h3>
          <p className="text-gray-600">EPF has been configured for your organization.</p>
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl">
      <h3 className="text-xl font-semibold text-gray-900">
        Employees' Provident Fund
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              EPF Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="AA/AAA/0000000/XXX"
              value={formData.epfNumber}
              onChange={(e) =>
                setFormData({ ...formData, epfNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500">Format: AA/AAA/0000000/XXX</p>
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
              Employee Contribution Rate <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.employeeContributionRate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employeeContributionRate: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Rate</option>
              <option value="12">12% of Actual PF Wage</option>
              <option value="10">10% of Actual PF Wage</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Employer Contribution Rate <span className="text-red-500">*</span>
              <button type="button" className="ml-2 text-blue-600 text-sm hover:underline">
                View Splitup
              </button>
            </label>
            <select
              value={formData.employerContributionRate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employerContributionRate: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Rate</option>
              <option value="12">12% of Actual PF Wage</option>
              <option value="10">10% of Actual PF Wage</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="includeEmployer"
                checked={formData.includeEmployerInSalary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    includeEmployerInSalary: e.target.checked,
                  })
                }
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="includeEmployer" className="text-sm text-gray-700">
                Include employer's contribution in employee's salary structure.
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="includeEDLI"
                checked={formData.includeEmployerEDLI}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    includeEmployerEDLI: e.target.checked,
                  })
                }
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="includeEDLI" className="text-sm text-gray-700">
                Include employer's EDLI contribution in employee's salary structure.{" "}
                <span className="text-gray-400 cursor-help">ⓘ</span>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="includeAdmin"
                checked={formData.includeAdminCharges}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    includeAdminCharges: e.target.checked,
                  })
                }
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="includeAdmin" className="text-sm text-gray-700">
                Include admin charges in employee's salary structure.{" "}
                <span className="text-gray-400 cursor-help">ⓘ</span>
              </label>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="overridePF"
              checked={formData.overridePFContribution}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  overridePFContribution: e.target.checked,
                })
              }
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="overridePF" className="text-sm text-gray-700">
              Override PF contribution rate at employee level
            </label>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">
              PF Configuration when LOP Applied
            </h4>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="proRate"
                checked={formData.proRateRestrictedPF}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    proRateRestrictedPF: e.target.checked,
                  })
                }
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="proRate" className="text-sm text-gray-700">
                Pro-rate Restricted PF Wage
                <p className="text-xs text-gray-500 mt-1">
                  PF contribution will be pro-rated based on the number of days worked
                  by the employee.
                </p>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="considerAll"
                checked={formData.considerAllComponents}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    considerAllComponents: e.target.checked,
                  })
                }
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="considerAll" className="text-sm text-gray-700">
                Consider all applicable salary components if PF wage is less than ₹15,000
                after Loss of Pay
                <p className="text-xs text-gray-500 mt-1">
                  PF wage will be computed using the salary earned in that particular
                  month (based on LOP) rather than the actual amount mentioned in the
                  salary structure.
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 h-fit">
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            EPF Calculation Information
          </h4>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Employee Contribution:</strong> Deducted from employee salary based on selected rate.
            </p>
            <p>
              <strong>Employer Contribution:</strong> Split between EPF and EPS (Employee Pension Scheme).
            </p>
            <p>
              <strong>EPS:</strong> 8.33% of PF wage (maximum of ₹15,000)
            </p>
            <p>
              <strong>EPF:</strong> Remaining amount from employer contribution after EPS
            </p>
          </div>

          <div className="mt-6 p-3 bg-white rounded border border-blue-200">
            <p className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-blue-500">💡</span>
              Configure the rates above and save to apply EPF deductions to employee salaries.
            </p>
          </div>
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