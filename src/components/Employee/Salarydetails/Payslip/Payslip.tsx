"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Eye, FileDown, ChevronDown } from "lucide-react"
import SalaryTabs from "@/components/Employee/Salarydetails/Tabs"
import { useRouter } from "next/navigation"

export default function Payslip() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("FY 2024-25")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const years = ["FY 2024-25", "FY 2023-24", "FY 2022-23"]

  const payslipData = [
    {
      month: "December 2024",
      grossPay: "₹110,000",
      reimbursement: "₹5,000",
      deductions: "₹2,000",
      takeHome: "₹108,000",
    },
    {
      month: "November 2024",
      grossPay: "₹110,000",
      reimbursement: "₹5,000",
      deductions: "₹2,000",
      takeHome: "₹108,000",
    },
    {
      month: "October 2024",
      grossPay: "₹106,452",
      reimbursement: "₹5,000",
      deductions: "₹2,000",
      takeHome: "₹104,452",
    },
    {
      month: "September 2024",
      grossPay: "₹110,000",
      reimbursement: "₹5,000",
      deductions: "₹2,000",
      takeHome: "₹108,000",
    },
    {
      month: "August 2024",
      grossPay: "₹110,000",
      reimbursement: "₹5,000",
      deductions: "₹2,000",
      takeHome: "₹108,000",
    },
    {
      month: "July 2024",
      grossPay: "₹110,000",
      reimbursement: "₹5,000",
      deductions: "₹2,000",
      takeHome: "₹108,000",
    },
  ]

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

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between gap-2 sm:gap-3">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              Payslips
            </h2>

            <div className="relative w-full min-[400px]:w-auto">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full min-[400px]:w-36 sm:w-40 items-center justify-between rounded-md border border-gray-300 bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm hover:bg-gray-50"
              >
                <span>{selectedYear}</span>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 z-20 mt-1 w-full min-[400px]:w-36 sm:w-40 rounded-md border border-gray-200 bg-white shadow-lg">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year)
                          setIsDropdownOpen(false)
                        }}
                        className="block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left text-[10px] sm:text-xs md:text-sm hover:bg-gray-50"
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Month
                    </th>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Gross Pay
                    </th>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Reimbursement
                    </th>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Deductions
                    </th>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Take Home
                    </th>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Payslip
                    </th>
                    <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium text-gray-700">
                      Tax Worksheet
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payslipData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">
                        {item.month}
                      </td>
                      <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">
                        {item.grossPay}
                      </td>
                      <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-gray-900">
                        {item.reimbursement}
                      </td>
                      <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-red-600">
                        {item.deductions}
                      </td>
                      <td className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm text-blue-600 font-semibold">
                        {item.takeHome}
                      </td>
                      <td className="px-3 lg:px-4 py-3 lg:py-4">
                        <button className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-700 hover:text-blue-600"
                          onClick={() => router.push("/salary/payslip/view")}>
                          <Eye className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                          View
                        </button>
                      </td>
                      <td className="px-3 lg:px-4 py-3 lg:py-4">
                        <button className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-700 hover:text-blue-600">
                          <FileDown className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-200">
              {payslipData.map((item, index) => (
                <div key={index} className="p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                      {item.month}
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {item.takeHome}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 sm:gap-y-2 mb-3">
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Gross Pay</p>
                      <p className="text-[11px] sm:text-sm font-medium">{item.grossPay}</p>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Reimbursement</p>
                      <p className="text-[11px] sm:text-sm font-medium">{item.reimbursement}</p>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Deductions</p>
                      <p className="text-[11px] sm:text-sm font-medium text-red-600">{item.deductions}</p>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Take Home</p>
                      <p className="text-[11px] sm:text-sm font-medium text-blue-600">{item.takeHome}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      Payslip
                    </button >
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs bg-gray-100 hover:bg-gray-200 rounded">
                      <FileDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      Tax Sheet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}