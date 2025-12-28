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
    // TODO: Fetch pay schedule configuration from API
    // Example:
    // const fetchConfig = async () => {
    //   const response = await fetch('/api/payschedule/config');
    //   const config = await response.json();
    //   setWorkWeek(config.workWeek || workWeek);
    //   setSalaryCalculation(config.salaryCalculation || "actual");
    //   setOrganizationWorkingDays(config.organizationWorkingDays || "");
    //   setPayDay(config.payDay || "specific-day");
    //   setSpecificPayDay(config.specificPayDay || "1");
    //   setFirstPayrollMonth(config.firstPayrollMonth || "June-2025");
    //   if (config.firstPayrollDate) {
    //     setFirstPayrollDate(
    //       new Date(
    //         currentMonth.getFullYear(),
    //         currentMonth.getMonth(),
    //         Number(config.firstPayrollDate)
    //       )
    //     );
    //   }
    // };
    // fetchConfig();
  }, []);

  const handleDayToggle = (day: string) => {
    setWorkWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    // TODO: Add API call here to save pay schedule configuration
    // Example:
    // try {
    //   await fetch('/api/payschedule/config', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(config)
    //   });
    //   toast.success("Pay schedule configuration saved successfully");
    //   if (onComplete) onComplete();
    // } catch (error) {
    //   toast.error("Failed to save configuration");
    // }

    if (onComplete) onComplete();
    toast.success("Pay schedule configuration saved successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 sm:space-y-8 w-full px-3 xs:px-4 sm:px-6 py-4 sm:py-6 bg-white border rounded-lg mx-auto max-w-full overflow-hidden"
      style={{ maxWidth: "calc(100vw - 16px)" }}
    >
      <h2 className="text-lg sm:text-xl font-semibold">Pay Schedule</h2>

      {/* Work Week */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm font-medium block">
          Select your work week<span className="text-red-500">*</span>
        </label>
        <p className="text-xs sm:text-sm text-gray-500">
          The days worked in a calendar week
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {daysOfWeek.map((day, index) => {
            const fullDay = fullDays[index];
            const isSelected = workWeek.includes(fullDay);
            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(fullDay)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded text-xs sm:text-sm font-medium transition-colors min-w-[50px] xs:min-w-[60px] sm:min-w-0 flex-1 xs:flex-none ${
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
      <div className="space-y-3 sm:space-y-4">
        <label className="block text-sm font-medium text-gray-900">
          Calculate monthly salary based on
          <span className="text-red-500">*</span>
          <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
        </label>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
            <input
              type="radio"
              id="actual"
              name="salaryCalculation"
              value="actual"
              checked={salaryCalculation === "actual"}
              onChange={(e) =>
                setSalaryCalculation(e.target.value as "actual" | "working")
              }
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer mt-0.5 sm:mt-0"
            />
            <label
              htmlFor="actual"
              className="text-xs sm:text-sm font-normal text-gray-700 cursor-pointer select-none leading-tight sm:leading-normal"
            >
              Actual days in a month
            </label>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3">
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
            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 flex-wrap">
              <label
                htmlFor="working"
                className="text-xs sm:text-sm font-normal text-gray-700 cursor-pointer select-none whitespace-nowrap"
              >
                Organisation working days -
              </label>
              <div className="flex items-center gap-1 xs:gap-2">
                <select
                  value={organizationWorkingDays}
                  onChange={(e) => setOrganizationWorkingDays(e.target.value)}
                  disabled={salaryCalculation !== "working"}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-xs sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed min-w-[80px] xs:min-w-0"
                >
                  <option value="">Select</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((days) => (
                    <option key={days} value={days.toString()}>
                      {days}
                    </option>
                  ))}
                </select>
                <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                  days per month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pay On */}
      <div className="space-y-3 sm:space-y-4">
        <label className="block text-sm font-medium text-gray-900">
          Pay on<span className="text-red-500">*</span>
        </label>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
            <input
              type="radio"
              id="last-working-day"
              name="payDay"
              value="last-working-day"
              checked={payDay === "last-working-day"}
              onChange={(e) => setPayDay(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer mt-0.5 sm:mt-0"
            />
            <label
              htmlFor="last-working-day"
              className="text-xs sm:text-sm font-normal text-gray-700 cursor-pointer select-none leading-tight sm:leading-normal"
            >
              the last working day of every month
            </label>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3">
            <input
              type="radio"
              id="specific-day"
              name="payDay"
              value="specific-day"
              checked={payDay === "specific-day"}
              onChange={(e) => setPayDay(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer mt-0.5"
            />
            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
              <label
                htmlFor="specific-day"
                className="text-xs sm:text-sm font-normal text-gray-700 cursor-pointer select-none whitespace-nowrap"
              >
                day
              </label>
              <div className="flex items-center gap-1 xs:gap-2">
                <select
                  value={specificPayDay}
                  onChange={(e) => setSpecificPayDay(e.target.value)}
                  disabled={payDay !== "specific-day"}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-xs sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed min-w-[60px] sm:w-20"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day.toString()}>
                      {day}
                    </option>
                  ))}
                </select>
                <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                  of every month
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 leading-relaxed">
          <strong>Note:</strong> When payday falls on a non-working day or a
          holiday, employees will get paid on the previous working day.
        </p>
      </div>

      {/* Payroll Month */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm font-medium block">
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
          className="w-full max-w-full sm:max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
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
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm font-medium block">
          Select a pay date for your first payroll
          <span className="text-red-500">*</span>
        </label>
        <p className="text-xs sm:text-sm text-gray-600">
          Pay Period: {firstPayrollMonth}
        </p>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[280px] justify-start text-left border-blue-500 text-xs sm:text-sm px-3 py-2 h-auto"
            >
              <CalendarIcon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">
                {firstPayrollDate
                  ? format(firstPayrollDate, "PPP")
                  : "Select a pay date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] sm:w-auto p-0" align="start">
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
        <p className="text-xs sm:text-sm text-red-500">
          All fields are mandatory
        </p>
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm w-full sm:w-auto"
        >
          Save
        </button>
      </div>
    </form>
  );
}