"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export default function AnnualEarningsPage() {
  const [selectedYear, setSelectedYear] = useState("2024-25")

  const chartData = [
    { month: "Jul", year: "2024-25", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Aug", year: "2024-25", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Sep", year: "2024-25", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Oct", year: "2024-25", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Nov", year: "2024-25", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Dec", year: "2024-25", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
  ]

  const monthlyDetails = [
    { month: "December", year: "2024-25", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "November", year: "2024-25", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "October", year: "2024-25", basic: 44387, hra: 24194, fixedAllowance: 33871, epf: 1800, profTax: 200, takeHome: 106452 },
    { month: "September", year: "2024-25", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "August", year: "2024-25", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "July", year: "2024-25", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
  ]

  // ✅ FY FILTER (SAME METHOD AS PAYSLIP)
  const filteredChartData = useMemo(
    () => chartData.filter(item => item.year === selectedYear),
    [selectedYear]
  )

  const filteredMonthlyDetails = useMemo(
    () => monthlyDetails.filter(item => item.year === selectedYear),
    [selectedYear]
  )

  const totals = filteredMonthlyDetails.reduce(
    (acc, item) => ({
      basic: acc.basic + item.basic,
      hra: acc.hra + item.hra,
      fixedAllowance: acc.fixedAllowance + item.fixedAllowance,
      epf: acc.epf + item.epf,
      profTax: acc.profTax + item.profTax,
      takeHome: acc.takeHome + item.takeHome,
    }),
    { basic: 0, hra: 0, fixedAllowance: 0, epf: 0, profTax: 0, takeHome: 0 }
  )

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-3 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Salary Details
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            View your complete salary information and documents.
          </p>
        </div>

        <SalaryTabs />

        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              Annual Earnings
            </h2>
            <Select
              value={selectedYear}
              onValueChange={setSelectedYear}
            >
              <SelectTrigger className="w-[140px] text-xs sm:text-sm">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-25">FY 2024-25</SelectItem>
                <SelectItem value="2023-24">FY 2023-24</SelectItem>
                <SelectItem value="2022-23">FY 2022-23</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="p-4 sm:p-5 md:p-6">
            <h3 className="text-sm sm:text-base font-semibold mb-4">
              Monthly Earnings Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="Basic" stackId="a" fill="#4F46E5" />
                <Bar dataKey="HRA" stackId="a" fill="#06B6D4" />
                <Bar dataKey="Fixed Allowance" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {filteredMonthlyDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-xs">{item.month}</td>
                      <td className="px-4 py-3 text-xs text-right">₹{item.basic.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-right">₹{item.hra.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-right">₹{item.fixedAllowance.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-right text-red-600">₹{item.epf.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-right text-red-600">₹{item.profTax.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-right font-semibold">₹{item.takeHome.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td className="px-4 py-3 text-xs">Total</td>
                    <td className="px-4 py-3 text-xs text-right">₹{totals.basic.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right">₹{totals.hra.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right">₹{totals.fixedAllowance.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right text-red-600">₹{totals.epf.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right text-red-600">₹{totals.profTax.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right">₹{totals.takeHome.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
