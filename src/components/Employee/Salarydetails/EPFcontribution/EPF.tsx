"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import SalaryTabs from "@/components/Employee/Salarydetails/Tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Gift, Wallet, Users, ChevronDown } from "lucide-react"

export default function EPFContributionPage() {
  const [selectedFY, setSelectedFY] = useState("2024-25")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const fyOptions = [
    { value: "2024-25", label: "FY 2024-25" },
    { value: "2023-24", label: "FY 2023-24" },
  ]

  const fyData: Record<string, any> = {
    "2024-25": {
      monthly: [
        { month: "Apr", yourContribution: 1800, employerContribution: 1800 },
        { month: "May", yourContribution: 1800, employerContribution: 1800 },
        { month: "Jun", yourContribution: 1800, employerContribution: 1800 },
        { month: "Jul", yourContribution: 1800, employerContribution: 1800 },
        { month: "Aug", yourContribution: 1800, employerContribution: 1800 },
        { month: "Sep", yourContribution: 1800, employerContribution: 1800 },
        { month: "Oct", yourContribution: 1800, employerContribution: 1800 },
        { month: "Nov", yourContribution: 1800, employerContribution: 1800 },
        { month: "Dec", yourContribution: 1800, employerContribution: 1800 },
      ],
    },
    "2023-24": {
      monthly: [
        { month: "Apr", yourContribution: 1600, employerContribution: 1600 },
        { month: "May", yourContribution: 1600, employerContribution: 1600 },
        { month: "Jun", yourContribution: 1600, employerContribution: 1600 },
        { month: "Jul", yourContribution: 1600, employerContribution: 1600 },
        { month: "Aug", yourContribution: 1600, employerContribution: 1600 },
        { month: "Sep", yourContribution: 1600, employerContribution: 1600 },
        { month: "Oct", yourContribution: 1600, employerContribution: 1600 },
        { month: "Nov", yourContribution: 1600, employerContribution: 1600 },
        { month: "Dec", yourContribution: 1600, employerContribution: 1600 },
      ],
    },
  }

  const chartData = fyData[selectedFY].monthly

  const totals = useMemo(() => {
    const your = chartData.reduce((sum: number, m: any) => sum + m.yourContribution, 0)
    const employer = chartData.reduce(
      (sum: number, m: any) => sum + m.employerContribution,
      0
    )
    return {
      your,
      employer,
      total: your + employer,
    }
  }, [chartData])

  const selectedLabel = fyOptions.find((opt) => opt.value === selectedFY)?.label || ""

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Salary Details
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            View your complete salary information and documents.
          </p>
        </div>

        {/* Tabs */}
        <SalaryTabs />

        {/* EPF Title + FY */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg md:text-xl font-semibold">
            EPF Contribution Summary
          </h2>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full sm:w-36 md:w-40 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
            >
              <span>{selectedLabel}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 z-20 mt-1 w-full sm:w-36 md:w-40 rounded-md border border-gray-200 bg-white shadow-lg">
                  {fyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedFY(option.value)
                        setIsDropdownOpen(false)
                      }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card className="bg-blue-50 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Contribution</p>
                <p className="mt-1 text-xl font-bold text-blue-700">
                  ₹{totals.total.toLocaleString()}
                </p>
                <span className="mt-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">
                  FY {selectedFY}
                </span>
              </div>
              <Gift className="h-8 w-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Your Contribution</p>
                <p className="mt-1 text-xl font-bold">
                  ₹{totals.your.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">↗ 50% of total</p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Employer Contribution</p>
                <p className="mt-1 text-xl font-bold">
                  ₹{totals.employer.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600">50% of total</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Monthly EPF Graph */}
        <Card className="mt-5 p-4 sm:p-5">
          <h3 className="mb-4 text-sm sm:text-base font-semibold">
            Monthly EPF Contributions
          </h3>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Legend />
                <Bar
                  dataKey="yourContribution"
                  fill="#3b82f6"
                  name="Your Contribution"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="employerContribution"
                  fill="#22c55e"
                  name="Employer Contribution"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Monthly Breakdown */}
        <Card className="mt-5 p-4 sm:p-5">
          <h3 className="mb-4 text-sm sm:text-base font-semibold">
            Monthly Breakdown
          </h3>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-500">
                  <th className="py-2">Month</th>
                  <th>Your Contribution</th>
                  <th>Employer Contribution</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((m: any) => (
                  <tr key={m.month} className="border-b text-xs">
                    <td className="py-2">{m.month}</td>
                    <td>₹{m.yourContribution}</td>
                    <td>₹{m.employerContribution}</td>
                    <td className="text-right font-semibold text-blue-600">
                      ₹{m.yourContribution + m.employerContribution}
                    </td>
                  </tr>
                ))}

                <tr className="font-semibold">
                  <td className="py-2">Total</td>
                  <td>₹{totals.your}</td>
                  <td>₹{totals.employer}</td>
                  <td className="text-right text-blue-700">
                    ₹{totals.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-3">
            {chartData.map((m: any) => (
              <div key={m.month} className="border rounded-lg p-3 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{m.month}</span>
                  <span className="font-bold text-blue-600">
                    ₹{m.yourContribution + m.employerContribution}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Contribution</span>
                    <span className="font-medium">₹{m.yourContribution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employer Contribution</span>
                    <span className="font-medium">₹{m.employerContribution}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile Total Card */}
            <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">Total</span>
                <span className="font-bold text-blue-700 text-base">
                  ₹{totals.total}
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-700">Your Total</span>
                  <span className="font-semibold">₹{totals.your}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Employer Total</span>
                  <span className="font-semibold">₹{totals.employer}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}