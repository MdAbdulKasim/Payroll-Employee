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
            <Card className="bg-blue-50 p-4 sm:p-5 md:p-6">
              <p className="text-xs sm:text-sm text-blue-700">Monthly CTC</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
                ₹125,000
              </h2>
            </Card> 

            <Card className="bg-green-50 p-4 sm:p-5 md:p-6">
              <p className="text-xs sm:text-sm text-green-700">Yearly CTC</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">
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

          <Card className="p-4 sm:p-5 md:p-6">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
              Earnings Breakdown
            </h3>

            <div className="space-y-2 sm:space-y-3">
              {earningsData.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between border-b pb-2 text-xs sm:text-sm"
                >
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-semibold">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="flex justify-between rounded bg-blue-50 p-2 sm:p-3 font-bold text-xs sm:text-sm">
                <span>Total Earnings</span>
                <span>₹{totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}