"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Briefcase, Gift, Download } from "lucide-react"
import SalaryTabs from "@/components/Employee/Salarydetails/Tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function SalaryDetailsPage() {
  const earningsData = [
    { label: "Basic", amount: 50000 },
    { label: "House Rent Allowance", amount: 25000 },
    { label: "Fixed Allowance", amount: 35000 },
  ]

  const totalEarnings = earningsData.reduce(
    (sum, item) => sum + item.amount,
    0
  )

  // Comprehensive salary breakdown data
  const salaryBreakdown = [
    { category: "Basic", amount: 50000, type: "Earnings" },
    { category: "House Rent Allowance", amount: 25000, type: "Earnings" },
    { category: "Fixed Allowance", amount: 35000, type: "Earnings" },
    { category: "Reimbursement", amount: 5000, type: "Reimbursement" },
    { category: "Employee EPF Contribution", amount: 1800, type: "Benefits" },
    { category: "Employer EPF Contribution", amount: 1800, type: "Benefits" },
  ]

  // Data for pie chart
  const pieChartData = [
    { name: "Earnings", value: 110000, color: "#3b82f6" },
    { name: "Reimbursement", value: 5000, color: "#f97316" },
    { name: "Benefits", value: 3600, color: "#22c55e" },
  ]

  const COLORS = ["#3b82f6", "#f97316", "#22c55e"]

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
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <Card className="bg-blue-50 p-4 sm:p-5 md:p-6 relative">
              <FileText className="absolute top-4 right-4 h-5 w-5 text-blue-600" />
              <p className="text-xs sm:text-sm text-gray-600">Monthly CTC</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                ₹125,000
              </h2>
            </Card>

            <Card className="bg-green-50 p-4 sm:p-5 md:p-6 relative">
              <FileText className="absolute top-4 right-4 h-5 w-5 text-green-600" />
              <p className="text-xs sm:text-sm text-gray-600">Yearly CTC</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                ₹1,500,000
              </h2>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 h-7 sm:h-9 md:h-10">
              <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              <span className="hidden min-[350px]:inline">Download Salary Structure</span>
              <span className="min-[350px]:hidden">Download</span>
            </Button>
          </div>

          {/* New Combined Table and Pie Chart Section */}
          <Card className="p-4 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Table Section */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Salary Breakdown
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 sm:py-3 px-2 font-semibold text-gray-700">Component</th>
                        <th className="text-left py-2 sm:py-3 px-2 font-semibold text-gray-700">Type</th>
                        <th className="text-right py-2 sm:py-3 px-2 font-semibold text-gray-700">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaryBreakdown.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 sm:py-3 px-2 text-gray-700">{item.category}</td>
                          <td className="py-2 sm:py-3 px-2">
                            <span className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${item.type === "Earnings" ? "bg-blue-100 text-blue-700" :
                                item.type === "Reimbursement" ? "bg-orange-100 text-orange-700" :
                                  "bg-green-100 text-green-700"
                              }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-2 sm:py-3 px-2 text-right font-semibold">
                            ₹{item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50 font-bold">
                        <td className="py-3 px-2 text-gray-900" colSpan={2}>Total Monthly CTC</td>
                        <td className="py-3 px-2 text-right text-blue-600">₹118,600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pie Chart Section */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-600" />
                  Salary Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                {/* Summary Cards Below Chart */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-[10px] text-gray-600">Earnings</p>
                    <p className="text-sm font-bold text-blue-600">₹110K</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <p className="text-[10px] text-gray-600">Reimbursement</p>
                    <p className="text-sm font-bold text-orange-600">₹5K</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-[10px] text-gray-600">Benefits</p>
                    <p className="text-sm font-bold text-green-600">₹3.6K</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}