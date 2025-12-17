"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SetupConfigurationProps {
  onComplete?: () => void;
}

interface WorkWeekConfig {
  workWeek: string[];
  salaryCalculation: "actual" | "working";
  payDay: string;
  specificPayDay?: string;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function SetupConfiguration({
  onComplete,
}: SetupConfigurationProps) {
  const [workWeek, setWorkWeek] = useState<string[]>([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [salaryCalculation, setSalaryCalculation] = useState<
    "actual" | "working"
  >("actual");
  const [payDay, setPayDay] = useState("last-day");
  const [specificPayDay, setSpecificPayDay] = useState("1");

  // Load saved configuration from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("workWeekConfig");
    if (saved) {
      try {
        const config: WorkWeekConfig = JSON.parse(saved);
        setWorkWeek(config.workWeek || workWeek);
        setSalaryCalculation(config.salaryCalculation || "actual");
        setPayDay(config.payDay || "last-day");
        setSpecificPayDay(config.specificPayDay || "1");
      } catch (error) {
        console.error("Error loading work week configuration:", error);
      }
    }
  }, []);

  const handleDayToggle = (day: string) => {
    setWorkWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (workWeek.length === 0) {
      toast.error("Please select at least one working day");
      return;
    }

    // Save configuration
    const config: WorkWeekConfig = {
      workWeek,
      salaryCalculation,
      payDay,
      specificPayDay: payDay === "specific-day" ? specificPayDay : undefined,
    };

    localStorage.setItem("workWeekConfig", JSON.stringify(config));

    // Mark step as complete
    if (onComplete) {
      onComplete();
    }

    const completedSteps = JSON.parse(
      localStorage.getItem("completedSteps") || "[]"
    );
    if (!completedSteps.includes("setup-configuration")) {
      completedSteps.push("setup-configuration");
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    }

    toast.success("Work week configuration saved successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Select Your Work Week */}
      <div className="space-y-4">
        <label className="block text-base font-medium text-gray-900">
          1. Select Your Work Week*
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={day}
                checked={workWeek.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor={day}
                className="text-sm font-medium text-gray-700 cursor-pointer select-none"
              >
                {day}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Calculate Monthly Salary Based On */}
      <div className="space-y-4">
        <label className="block text-base font-medium text-gray-900">
          2. Calculate Monthly Salary Based On*
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="actual"
              name="salaryCalculation"
              value="actual"
              checked={salaryCalculation === "actual"}
              onChange={(e) =>
                setSalaryCalculation(e.target.value as "actual" | "working")
              }
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="actual"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Actual days in a month (30/31 days)
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="working"
              name="salaryCalculation"
              value="working"
              checked={salaryCalculation === "working"}
              onChange={(e) =>
                setSalaryCalculation(e.target.value as "actual" | "working")
              }
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="working"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Organization working days
            </label>
          </div>
        </div>
      </div>

      {/* 3. Pay On */}
      <div className="space-y-4">
        <label className="block text-base font-medium text-gray-900">
          3. Pay On*
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="last-day"
              name="payDay"
              value="last-day"
              checked={payDay === "last-day"}
              onChange={(e) => setPayDay(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="last-day"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              The last day of every month
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="specific-day"
              name="payDay"
              value="specific-day"
              checked={payDay === "specific-day"}
              onChange={(e) => setPayDay(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="specific-day"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Specific day of the month
            </label>
          </div>
        </div>

        {/* Specific Day Selector */}
        {payDay === "specific-day" && (
          <div className="ml-7 mt-3">
            <select
              value={specificPayDay}
              onChange={(e) => setSpecificPayDay(e.target.value)}
              className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day.toString()}>
                  Day {day}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These settings will be applied to all payroll
          calculations. You can modify them later from Settings.
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