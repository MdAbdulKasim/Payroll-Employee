"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PayrollHistoryPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">Pay Runs</h1>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6">
        <div className="flex gap-2 py-3">
          <button
            onClick={() => router.push("/admin/payrun")}
            className="rounded-full px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700"
          >
            Run Payroll
          </button>

          <button className="rounded-full px-4 py-2 text-sm font-medium bg-blue-600 text-white">
            Payroll History
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Pay Period</th>
                <th className="px-4 py-3 text-left">Payment Date</th>
                <th className="px-4 py-3 text-left">Employees</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="px-4 py-4">April 2025</td>
                <td className="px-4 py-4">30/05/2025</td>
                <td className="px-4 py-4">12</td>
                <td className="px-4 py-4">
                  <Badge className="bg-green-100 text-green-700">
                    Completed
                  </Badge>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
