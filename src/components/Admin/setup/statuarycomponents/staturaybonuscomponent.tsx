"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface StatutoryBonusComponentProps {
  onComplete?: () => void;
}

export default function StatutoryBonusComponent({
  onComplete,
}: StatutoryBonusComponentProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    paymentFrequency: "Monthly",
    monthlyPercentage: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("statutoryBonusConfig");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setIsEnabled(config.isEnabled || false);
        setFormData({ ...formData, ...config });
      } catch (error) {
        console.error("Error loading Statutory Bonus configuration:", error);
      }
    }
  }, []);

  const handleEnableClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.monthlyPercentage) {
      toast.error("Please enter monthly percentage of bonus");
      return;
    }

    const percentage = parseFloat(formData.monthlyPercentage);
    if (percentage < 8.33 || percentage > 20) {
      toast.error("Statutory Bonus rate should be between 8.33% and 20%");
      return;
    }

    const config = {
      ...formData,
      isEnabled: true,
    };

    localStorage.setItem("statutoryBonusConfig", JSON.stringify(config));
    setIsEnabled(true);
    setShowForm(false);
    toast.success("Statutory Bonus configuration saved successfully");

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
            alt="Statutory Bonus Illustration"
            className="w-full h-full object-contain"
          /> */}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Are your employees eligible to receive statutory bonus?
        </h3>
        <p className="text-center text-gray-600 max-w-2xl">
          According to the Payment of Bonus Act, 1965, an eligible employee can receive
          a statutory bonus of 8.33% (min) to 20% (max) of their salary earned during a
          financial year. Configure statutory bonus of your organisation and start paying
          your employees.
        </p>
        <button
          onClick={handleEnableClick}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Enable Statutory Bonus
        </button>
      </div>
    );
  }

  if (!showForm && isEnabled) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Statutory Bonus Enabled
          </h3>
          <p className="text-gray-600">
            Statutory Bonus has been configured for your organization.
          </p>
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
      <h3 className="text-xl font-semibold text-gray-900">Statutory Bonus</h3>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-900">
            Payment Frequency
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="monthly"
                name="paymentFrequency"
                value="Monthly"
                checked={formData.paymentFrequency === "Monthly"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentFrequency: e.target.value,
                  })
                }
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="monthly" className="text-sm text-gray-700">
                Monthly
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="yearly"
                name="paymentFrequency"
                value="Yearly"
                checked={formData.paymentFrequency === "Yearly"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentFrequency: e.target.value,
                  })
                }
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="yearly" className="text-sm text-gray-700">
                Yearly
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Monthly Percentage of Bonus <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.01"
              min="8.33"
              max="20"
              placeholder=""
              value={formData.monthlyPercentage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyPercentage: e.target.value,
                })
              }
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              % of salary or minimum wage earned this year
            </span>
          </div>
          <p className="text-xs text-gray-500 flex items-start gap-1">
            <span className="text-gray-400">ⓘ</span>
            Statutory Bonus rate should be in-between 8.33% and 20%, based on the
            Statutory Bonus Act.
          </p>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 space-y-2">
          <p className="text-sm font-semibold text-gray-900">NOTE:</p>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>
              The payment frequency of this statutory bonus is monthly and taxable.
            </li>
            <li>
              Once you've associated the statutory bonus with an employee, you can
              change the bonus percentage only at the beginning of the next fiscal year.
            </li>
          </ul>
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
          Save
        </button>
      </div>
    </form>
  );
}