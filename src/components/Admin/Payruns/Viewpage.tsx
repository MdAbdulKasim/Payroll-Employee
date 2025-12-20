"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

export default function PayrunDetailsPage() {
  const router = useRouter()

  // 🔹 Static / temporary data (replace later)
  const payrun = {
    period: "May 2025",
    paymentDate: "30/06/2025",
    employees: 12,
    type: "Regular Payroll",
    status: "Yet to Process",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">Pay Run Details</h1>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white border rounded-xl p-6 space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Pay Period</p>
              <p className="font-medium">{payrun.period}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Date</p>
              <p className="font-medium">{payrun.paymentDate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Employees</p>
              <p className="font-medium">{payrun.employees}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{payrun.type}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge className="bg-yellow-100 text-yellow-700">
                {payrun.status}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Process Payroll
            </Button>

            <Button variant="outline">
              Download Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
