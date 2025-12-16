"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, Calendar } from "lucide-react"
import SalaryTabs from "@/components/Salarydetails/Tabs"

export default function AnnualEarningsPage() {
  const monthlyData = [
    { month: "April 2024", earnings: 110000 },
    { month: "May 2024", earnings: 110000 },
    { month: "June 2024", earnings: 110000 },
    { month: "July 2024", earnings: 110000 },
    { month: "August 2024", earnings: 110000 },
    { month: "September 2024", earnings: 110000 },
    { month: "October 2024", earnings: 106452 },
    { month: "November 2024", earnings: 110000 },
    { month: "December 2024", earnings: 110000 },
  ]

  const totalEarnings = monthlyData.reduce((sum, item) => sum + item.earnings, 0)
  const averageEarnings = Math.round(totalEarnings / monthlyData.length)

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
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
            Annual Earnings
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            <Card className="p-4 sm:p-5 md:p-6">
              <DollarSign className="mb-2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <p className="text-xs sm:text-sm text-gray-600">Total Earnings (YTD)</p>
              <h3 className="text-xl sm:text-2xl font-bold">₹{totalEarnings.toLocaleString()}</h3>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6">
              <TrendingUp className="mb-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <p className="text-xs sm:text-sm text-gray-600">Average Monthly</p>
              <h3 className="text-xl sm:text-2xl font-bold">₹{averageEarnings.toLocaleString()}</h3>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6">
              <Calendar className="mb-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <p className="text-xs sm:text-sm text-gray-600">Months Paid</p>
              <h3 className="text-xl sm:text-2xl font-bold">{monthlyData.length}</h3>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Month
                    </th>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-right text-xs font-medium text-gray-700">
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {monthlyData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">
                        {item.month}
                      </td>
                      <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-right font-semibold text-gray-900">
                        ₹{item.earnings.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm">
                      Total
                    </td>
                    <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-right">
                      ₹{totalEarnings.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sm:hidden divide-y divide-gray-200">
              {monthlyData.map((item, index) => (
                <div key={index} className="p-3 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-900">{item.month}</span>
                  <span className="text-xs font-bold text-gray-900">₹{item.earnings.toLocaleString()}</span>
                </div>
              ))}
              <div className="p-3 flex justify-between items-center bg-blue-50 font-bold">
                <span className="text-xs">Total</span>
                <span className="text-xs">₹{totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}