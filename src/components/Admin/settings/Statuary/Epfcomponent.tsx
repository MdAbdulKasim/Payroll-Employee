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
    employeeContributionRate: "12% of Actual PF Wage",
    employerContributionRate: "12% of Actual PF Wage",
    includeEmployerInSalary: true,
    includeEmployerEDLI: false,
    includeAdminCharges: false,
    overridePFContribution: false,
    proRateRestrictedPF: false,
    considerAllComponents: true,
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
        <div className="w-48 h-48 relative">
          {/* <img
            src="/api/placeholder/200/200"
            alt="EPF Illustration"
            className="w-full h-full object-contain"
          /> */}
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
              EPF Number
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
              Employee Contribution Rate
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
              <option>12% of Actual PF Wage</option>
              <option>10% of Actual PF Wage</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Employer Contribution Rate
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
              <option>12% of Actual PF Wage</option>
              <option>10% of Actual PF Wage</option>
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

        {/* Right Column - Sample Calculation */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 h-fit">
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            Sample EPF Calculation
          </h4>
          <p className="text-sm text-gray-700 mb-4">
            Let's assume the PF wage is ₹ 20,000. The breakup of contribution will be:
          </p>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-2">
                Employee's Contribution
              </h5>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">EPF (12% of 20000)</span>
                <span className="font-medium">₹ 2400</span>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-2">
                Employer's Contribution
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    EPS (8.33% of 20000 (Max of ₹ 15,000))
                  </span>
                  <span className="font-medium">₹ 1250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">EPF (12% of 20000 - EPS)</span>
                  <span className="font-medium">₹ 1150</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-orange-300">
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>₹ 2400</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-white rounded border border-orange-200">
            <p className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-orange-500">💡</span>
              Do you want to preview EPF calculation for multiple cases, based on the
              preferences you have configured?
            </p>
            <button
              type="button"
              className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              👁 Preview EPF Calculation
            </button>
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