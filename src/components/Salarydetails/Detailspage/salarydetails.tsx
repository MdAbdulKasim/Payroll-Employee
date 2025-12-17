"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Briefcase, Gift, Download } from "lucide-react"
import SalaryTabs from "@/components/Salarydetails/Tabs"

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

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            <Card className="p-4 sm:p-5 md:p-6">
              <FileText className="mb-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <p className="text-xs sm:text-sm text-gray-600">Earnings</p>
              <h3 className="text-xl sm:text-2xl font-bold">₹110,000</h3>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6">
              <Briefcase className="mb-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              <p className="text-xs sm:text-sm text-gray-600">Reimbursement</p>
              <h3 className="text-xl sm:text-2xl font-bold">₹5,000</h3>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6">
              <Gift className="mb-2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <p className="text-xs sm:text-sm text-gray-600">Benefits</p>
              <h3 className="text-xl sm:text-2xl font-bold">₹1,800</h3>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <Card className="p-4 sm:p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <h3 className="text-base sm:text-lg font-semibold">Earnings</h3>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {earningsData.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between text-xs sm:text-sm"
                  >
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-semibold">
                      ₹{item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between bg-blue-50 p-2 sm:p-3 mt-3 font-bold text-xs sm:text-sm rounded">
                  <span>Total Earnings</span>
                  <span className="text-blue-600">₹{totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <h3 className="text-base sm:text-lg font-semibold">Benefits & EPF</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">EPF Contribution</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-700">Employee Contribution (Restricted to)</span>
                      <span className="font-semibold">₹1,800</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-700">Your Contribution</span>
                      <span className="font-semibold">₹1,800</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-2 sm:p-3 rounded">
                  <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                    <span>Monthly CTC (Incl. EPF)</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm sm:text-base">
                    <span>Employee contribution included.</span>
                    <span className="text-green-600">₹125,000</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Other Benefits</p>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">EPF Employer Contribution</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-medium">Benefit</span>
                    </div>
                    <span className="font-semibold">₹1,800</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}