"use client"

import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SalaryTabs from "@/components/Salarydetails/Tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AnnualEarningsPage() {
  const chartData = [
    { month: "Jul", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Aug", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Sep", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Oct", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Nov", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
    { month: "Dec", Basic: 50000, HRA: 25000, "Fixed Allowance": 35000 },
  ]

  const monthlyDetails = [
    { month: "December", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "November", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "October", basic: 44387, hra: 24194, fixedAllowance: 33871, epf: 1800, profTax: 200, takeHome: 106452 },
    { month: "September", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "August", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
    { month: "July", basic: 50000, hra: 25000, fixedAllowance: 35000, epf: 1800, profTax: 200, takeHome: 108000 },
  ]

  const totals = monthlyDetails.reduce(
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
            <Select defaultValue="2024-25">
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
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Basic" stackId="a" fill="#4F46E5" />
                <Bar dataKey="HRA" stackId="a" fill="#06B6D4" />
                <Bar dataKey="Fixed Allowance" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="overflow-hidden">
            <div className="p-4 sm:p-5 md:p-6">
              <h3 className="text-sm sm:text-base font-semibold mb-4">
                Monthly Details
              </h3>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                      Month
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                      Basic
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                      HRA
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                      Fixed Allowance
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                      EPF
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                      Prof. Tax
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                      Take Home
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {monthlyDetails.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {item.month}
                      </td>
                      <td className="px-4 py-3 text-xs text-right text-gray-900">
                        ₹{item.basic.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-right text-gray-900">
                        ₹{item.hra.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-right text-gray-900">
                        ₹{item.fixedAllowance.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-right text-red-600">
                        ₹{item.epf.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-right text-red-600">
                        ₹{item.profTax.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-right font-semibold text-gray-900">
                        ₹{item.takeHome.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold border-t-2">
                    <td className="px-4 py-3 text-xs">Total</td>
                    <td className="px-4 py-3 text-xs text-right">
                      ₹{totals.basic.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-right">
                      ₹{totals.hra.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-right">
                      ₹{totals.fixedAllowance.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-right text-red-600">
                      ₹{totals.epf.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-right text-red-600">
                      ₹{totals.profTax.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-right">
                      ₹{totals.takeHome.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-200">
              {monthlyDetails.map((item, index) => (
                <div key={index} className="p-4">
                  <div className="font-semibold text-sm mb-3">{item.month}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Basic</span>
                      <span>₹{item.basic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">HRA</span>
                      <span>₹{item.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Fixed Allowance</span>
                      <span>₹{item.fixedAllowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">EPF</span>
                      <span className="text-red-600">₹{item.epf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Prof. Tax</span>
                      <span className="text-red-600">₹{item.profTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold pt-2 border-t">
                      <span>Take Home</span>
                      <span>₹{item.takeHome.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 bg-blue-50 font-bold">
                <div className="font-semibold text-sm mb-3">Total</div>
                <div className="flex justify-between text-xs">
                  <span>Take Home</span>
                  <span>₹{totals.takeHome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}