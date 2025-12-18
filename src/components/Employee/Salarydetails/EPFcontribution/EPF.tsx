"use client"

import { Card } from "@/components/ui/card"
import SalaryTabs from "@/components/Employee/Salarydetails/Tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  Gift,
  Wallet,
  Users,
} from "lucide-react"

export default function EPFContributionPage() {
  const chartData = [
    { month: "Apr", yourContribution: 1800, employerContribution: 1800 },
    { month: "May", yourContribution: 1800, employerContribution: 1800 },
    { month: "Jun", yourContribution: 1800, employerContribution: 1800 },
    { month: "Jul", yourContribution: 1800, employerContribution: 1800 },
    { month: "Aug", yourContribution: 1800, employerContribution: 1800 },
    { month: "Sep", yourContribution: 1800, employerContribution: 1800 },
    { month: "Oct", yourContribution: 1800, employerContribution: 1800 },
    { month: "Nov", yourContribution: 1800, employerContribution: 1800 },
    { month: "Dec", yourContribution: 1800, employerContribution: 1800 },
  ]

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

        {/* Tabs (UNCHANGED) */}
        <SalaryTabs />

        {/* EPF Title + FY */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold">
            EPF Contribution Summary
          </h2>

          <select className="rounded-md border bg-white px-3 py-1.5 text-sm">
            <option>FY 2024-25</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card className="bg-blue-50 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Contribution</p>
                <p className="mt-1 text-xl font-bold text-blue-700">
                  ₹32,400
                </p>
                <span className="mt-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">
                  FY 2024-25
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
                  ₹16,200
                </p>
                <p className="text-xs text-green-600">
                  ↗ 50% of total
                </p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">
                  Employer Contribution
                </p>
                <p className="mt-1 text-xl font-bold">
                  ₹16,200
                </p>
                <p className="text-xs text-blue-600">
                  50% of total
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Monthly EPF Graph (Now with Recharts) */}
        <Card className="mt-5 p-4 sm:p-5">
          <h3 className="mb-4 text-sm sm:text-base font-semibold">
            Monthly EPF Contributions
          </h3>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => `₹${value}`}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  iconType="square"
                />
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

        {/* Monthly Breakdown Table */}
        <Card className="mt-5 p-4 sm:p-5">
          <h3 className="mb-4 text-sm sm:text-base font-semibold">
            Monthly Breakdown
          </h3>

          <div className="overflow-x-auto">
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
                {[
                  "December 2024",
                  "November 2024",
                  "October 2024",
                  "September 2024",
                  "August 2024",
                  "July 2024",
                  "June 2024",
                  "May 2024",
                  "April 2024",
                ].map((month) => (
                  <tr key={month} className="border-b text-xs">
                    <td className="py-2">{month}</td>
                    <td>₹1,800</td>
                    <td>₹1,800</td>
                    <td className="text-right font-semibold text-blue-600">
                      ₹3,600
                    </td>
                  </tr>
                ))}

                <tr className="font-semibold">
                  <td className="py-2">Total</td>
                  <td>₹16,200</td>
                  <td>₹16,200</td>
                  <td className="text-right text-blue-700">
                    ₹32,400
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}