"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SetupConfigurationProps {
  onComplete?: () => void;
}

interface WorkWeekConfig {
  workWeek: string[];
  salaryCalculation: "actual" | "working";
  organizationWorkingDays?: string;
  payDay: string;
  specificPayDay?: string;
  firstPayrollMonth?: string;
  firstPayrollYear?: string;
}

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const fullDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
  const [organizationWorkingDays, setOrganizationWorkingDays] = useState("");
  const [payDay, setPayDay] = useState("specific-day");
  const [specificPayDay, setSpecificPayDay] = useState("1");
  const [firstPayrollMonth, setFirstPayrollMonth] = useState("June");
  const [firstPayrollYear, setFirstPayrollYear] = useState("2025");

  // Generate year options (current year and next 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear + i);

  // Load saved configuration from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("workWeekConfig");
    if (saved) {
      try {
        const config: WorkWeekConfig = JSON.parse(saved);
        setWorkWeek(config.workWeek || workWeek);
        setSalaryCalculation(config.salaryCalculation || "actual");
        setOrganizationWorkingDays(config.organizationWorkingDays || "");
        setPayDay(config.payDay || "specific-day");
        setSpecificPayDay(config.specificPayDay || "1");
        setFirstPayrollMonth(config.firstPayrollMonth || "June");
        setFirstPayrollYear(config.firstPayrollYear || "2025");
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

    if (
      salaryCalculation === "working" &&
      (!organizationWorkingDays || organizationWorkingDays === "")
    ) {
      toast.error("Please select organization working days");
      return;
    }

    if (!firstPayrollMonth || !firstPayrollYear) {
      toast.error("Please select a month and year for your first payroll");
      return;
    }

    // Save configuration
    const config: WorkWeekConfig = {
      workWeek,
      salaryCalculation,
      organizationWorkingDays:
        salaryCalculation === "working" ? organizationWorkingDays : undefined,
      payDay,
      specificPayDay: payDay === "specific-day" ? specificPayDay : undefined,
      firstPayrollMonth,
      firstPayrollYear,
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

    toast.success("Pay schedule configuration saved successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Pay Schedule</h2>

      {/* Select Your Work Week */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          Select your work week<span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500">
          The days worked in a calendar week
        </p>
        <div className="flex gap-2">
          {daysOfWeek.map((day, index) => {
            const fullDay = fullDays[index];
            const isSelected = workWeek.includes(fullDay);
            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(fullDay)}
                className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculate Monthly Salary Based On */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-900">
          Calculate monthly salary based on
          <span className="text-red-500">*</span>
          <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
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
              className="text-sm font-normal text-gray-700 cursor-pointer select-none"
            >
              Actual days in a month
            </label>
          </div>
          <div className="flex items-start space-x-3">
            <input
              type="radio"
              id="working"
              name="salaryCalculation"
              value="working"
              checked={salaryCalculation === "working"}
              onChange={(e) =>
                setSalaryCalculation(e.target.value as "actual" | "working")
              }
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer mt-0.5"
            />
            <div className="flex items-center gap-2 flex-wrap">
              <label
                htmlFor="working"
                className="text-sm font-normal text-gray-700 cursor-pointer select-none"
              >
                Organisation working days -
              </label>
              <select
                value={organizationWorkingDays}
                onChange={(e) => setOrganizationWorkingDays(e.target.value)}
                disabled={salaryCalculation !== "working"}
                className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((days) => (
                  <option key={days} value={days.toString()}>
                    {days}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">days per month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pay On */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-900">
          Pay on<span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="last-working-day"
              name="payDay"
              value="last-working-day"
              checked={payDay === "last-working-day"}
              onChange={(e) => setPayDay(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="last-working-day"
              className="text-sm font-normal text-gray-700 cursor-pointer select-none"
            >
              the last working day of every month
            </label>
          </div>
          <div className="flex items-start space-x-3">
            <input
              type="radio"
              id="specific-day"
              name="payDay"
              value="specific-day"
              checked={payDay === "specific-day"}
              onChange={(e) => setPayDay(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer mt-0.5"
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor="specific-day"
                className="text-sm font-normal text-gray-700 cursor-pointer select-none"
              >
                day
              </label>
              <select
                value={specificPayDay}
                onChange={(e) => setSpecificPayDay(e.target.value)}
                disabled={payDay !== "specific-day"}
                className="w-20 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day.toString()}>
                    {day}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">of every month</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Note:</strong> When payday falls on a non-working day or a
          holiday, employees will get paid on the previous working day.
        </p>
      </div>

      {/* Start Your First Payroll From - Month and Year Picker */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          Start your first payroll from<span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Month</label>
            <select
              value={firstPayrollMonth}
              onChange={(e) => setFirstPayrollMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Year</label>
            <select
              value={firstPayrollYear}
              onChange={(e) => setFirstPayrollYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Selected: {firstPayrollMonth} {firstPayrollYear}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
        <p className="text-sm text-red-500">All fields are mandatory</p>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}