"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, FileText, Shield } from "lucide-react"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { useState } from "react"

const barChartData = [
  { month: "Jul", takeHome: 108000, deductions: 2000, grossPay: 110000 },
  { month: "Aug", takeHome: 108000, deductions: 2000, grossPay: 110000 },
  { month: "Sep", takeHome: 108000, deductions: 2000, grossPay: 110000 },
  { month: "Oct", takeHome: 108000, deductions: 2000, grossPay: 110000 },
  { month: "Nov", takeHome: 108000, deductions: 2000, grossPay: 110000 },
  { month: "Dec", takeHome: 108000, deductions: 2000, grossPay: 110000 },
]

const donutChartData = [
  { name: "Take Home", value: 108000, color: "#3b82f6" },
  { name: "Deductions", value: 2000, color: "#ef4444" },
  { name: "Gross Pay", value: 110000, color: "#10b981" },
]

const chartConfig = {
  takeHome: { label: "Take Home", color: "#3b82f6" },
  deductions: { label: "Deductions", color: "#ef4444" },
  grossPay: { label: "Gross Pay", color: "#10b981" },
}

export default function Dashboard() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white p-2 ">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Dashboard</h1>
            <p className="text-xs text-gray-500 sm:text-sm">Welcome back! Here&apos;s your salary overview.</p>
          </div>
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            View Payslip
          </Button>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {/* Take Home Card */}
          <Card className="bg-white p-4 sm:p-5">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-600 sm:text-sm">Take Home (Net)</p>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">₹1,08,000</h2>
                </div>
                <div className="rounded-full bg-blue-50 p-2">
                  <FileText className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>+1.23% from last month</span>
              </div>
            </div>
          </Card>

          {/* Total Deductions Card */}
          <Card className="bg-white p-4 sm:p-5">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-600 sm:text-sm">Total Deductions</p>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">₹2,000</h2>
                </div>
                <div className="rounded-full bg-red-50 p-2">
                  <ArrowDownRight className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <span className="text-red-600">% EPF</span>
                <span className="mx-1">+</span>
                <span>Professional Tax</span>
              </div>
            </div>
          </Card>

          {/* Gross Pay Card */}
          <Card className="bg-white p-4 sm:p-5">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-600 sm:text-sm">Gross Pay</p>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">₹1,10,000</h2>
                </div>
                <div className="rounded-full bg-green-50 p-2">
                  <ArrowUpRight className="h-4 w-4 text-green-600 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="text-xs text-gray-500">Monthly CTC</div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          {/* Bar Chart */}
          <Card className="bg-white p-4 sm:p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Monthly Salary Breakdown</h3>
            <ChartContainer config={chartConfig} className="h-[280px] w-full sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={barChartData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
                  onMouseMove={(state) => {
                    if (state.isTooltipActive) {
                      setHoveredBar(state.activeLabel || null)
                    } else {
                      setHoveredBar(null)
                    }
                  }}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || payload.length === 0) return null
                      const data = payload[0].payload
                      return (
                        <div className="rounded-lg border bg-white p-3 shadow-lg">
                          <p className="mb-2 font-semibold text-gray-900">{data.month}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-600">Take Home:</span>
                              <span className="font-semibold text-blue-600">₹{data.takeHome.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-600">Deductions:</span>
                              <span className="font-semibold text-red-600">₹{data.deductions.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-600">Gross Pay:</span>
                              <span className="font-semibold text-green-600">₹{data.grossPay.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }}
                  />
                  <Bar dataKey="takeHome" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  <Bar dataKey="grossPay" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          {/* Donut Chart */}
          <Card className="bg-white p-4 sm:p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Current Month Distribution</h3>
            <ChartContainer config={chartConfig} className="h-[280px] w-full sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || payload.length === 0) return null
                      const data = payload[0]
                      return (
                        <div className="rounded-lg border bg-white p-2 shadow-lg">
                          <p className="text-sm font-semibold" style={{ color: data.payload.color }}>
                            {data.name}
                          </p>
                          <p className="text-sm text-gray-600">₹{data.value?.toLocaleString()}</p>
                        </div>
                      )
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    content={({ payload }) => {
                      return (
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs sm:gap-4 sm:text-sm">
                          {payload?.map((entry, index) => (
                            <div key={`legend-${index}`} className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                              <span className="text-gray-700">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      )
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          {/* Tax Summary */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
            <div className="mb-3 flex items-start gap-3">
              <div className="rounded-full bg-white p-2">
                <Shield className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 sm:text-base">Tax Summary - FY 2024-25</h3>
                <p className="text-xs text-gray-600">Your annual tax overview</p>
              </div>
            </div>
            <div className="flex min-h-[100px] items-center justify-center rounded-lg bg-white/50 p-4 sm:min-h-[120px]">
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 sm:h-16 sm:w-16">
                    <Shield className="h-6 w-6 text-green-600 sm:h-8 sm:w-8" />
                  </div>
                </div>
                <p className="mb-1 text-base font-bold text-green-600 sm:text-lg">You are Tax Free! 🎉</p>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Since your taxable income is within the tax slab, you don&apos;t have to pay any income tax this
                  financial year.
                </p>
              </div>
            </div>
          </Card>

          {/* EPF Summary */}
          <Card className="bg-white p-4 sm:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-50 p-2">
                <FileText className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 sm:text-base">EPF Summary</h3>
                <p className="text-xs text-gray-600">Your provident fund contributions</p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-xs font-medium text-gray-700 sm:text-sm">Total Contribution</span>
                <span className="text-base font-bold text-blue-600 sm:text-lg">₹32,400</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-600">Your Contribution</p>
                  <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">₹16,200</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-600">Employer Contribution</p>
                  <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">₹16,200</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
