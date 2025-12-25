"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
  firstPayrollDate?: string;
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

export default function Payschedule({ onComplete }: SetupConfigurationProps) {
  const [workWeek, setWorkWeek] = useState<string[]>([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [salaryCalculation, setSalaryCalculation] =
    useState<"actual" | "working">("actual");
  const [organizationWorkingDays, setOrganizationWorkingDays] = useState("");
  const [payDay, setPayDay] = useState("specific-day");
  const [specificPayDay, setSpecificPayDay] = useState("1");
  const [firstPayrollMonth, setFirstPayrollMonth] = useState("June-2025");

  const [firstPayrollDate, setFirstPayrollDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 1));

  useEffect(() => {
    const saved = localStorage.getItem("workWeekConfig");
    if (saved) {
      const config: WorkWeekConfig = JSON.parse(saved);
      setWorkWeek(config.workWeek || workWeek);
      setSalaryCalculation(config.salaryCalculation || "actual");
      setOrganizationWorkingDays(config.organizationWorkingDays || "");
      setPayDay(config.payDay || "specific-day");
      setSpecificPayDay(config.specificPayDay || "1");
      setFirstPayrollMonth(config.firstPayrollMonth || "June-2025");

      if (config.firstPayrollDate) {
        setFirstPayrollDate(
          new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            Number(config.firstPayrollDate)
          )
        );
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

    if (workWeek.length === 0) {
      toast.error("Please select at least one working day");
      return;
    }

    if (salaryCalculation === "working" && !organizationWorkingDays) {
      toast.error("Please select organization working days");
      return;
    }

    if (!firstPayrollDate) {
      toast.error("Please select a pay date for your first payroll");
      return;
    }

    const config: WorkWeekConfig = {
      workWeek,
      salaryCalculation,
      organizationWorkingDays:
        salaryCalculation === "working" ? organizationWorkingDays : undefined,
      payDay,
      specificPayDay: payDay === "specific-day" ? specificPayDay : undefined,
      firstPayrollMonth,
      firstPayrollDate: firstPayrollDate.getDate().toString(),
    };

    localStorage.setItem("workWeekConfig", JSON.stringify(config));

    if (onComplete) onComplete();

    toast.success("Pay schedule configuration saved successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 w-full px-6 py-6 bg-white border rounded-lg mx-4"
    >
      <h2 className="text-xl font-semibold">Pay Schedule</h2>

      {/* Work Week */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
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

      {/* Payroll Month */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Start your first payroll from<span className="text-red-500">*</span>
        </label>
        <select
          value={firstPayrollMonth}
          onChange={(e) => {
            setFirstPayrollMonth(e.target.value);
            const [month, year] = e.target.value.split("-");
            const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
            setCurrentMonth(new Date(Number(year), monthIndex, 1));
            setFirstPayrollDate(undefined);
          }}
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option>June-2025</option>
          <option>July-2025</option>
          <option>August-2025</option>
          <option>September-2025</option>
          <option>October-2025</option>
          <option>November-2025</option>
          <option>December-2025</option>
        </select>
      </div>

      {/* Shadcn Calendar */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Select a pay date for your first payroll
          <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600">
          Pay Period: {firstPayrollMonth}
        </p>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[280px] justify-start text-left border-blue-500"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {firstPayrollDate
                ? format(firstPayrollDate, "PPP")
                : "Select a pay date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={firstPayrollDate}
              onSelect={setFirstPayrollDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Save */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
        <p className="text-sm text-red-500">All fields are mandatory</p>
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