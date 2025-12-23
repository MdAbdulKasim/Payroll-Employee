"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye } from "lucide-react"

export default function PayrollHistoryDetailPage() {
  const router = useRouter()

  // 🔹 Static completed payroll data
  const payrollHistory = {
    period: "April 2025",
    paymentDate: "30/05/2025",
    processedDate: "28/05/2025",
    employees: 12,
    type: "Regular Payroll",
    status: "Completed",
    totalGrossPay: "₹8,45,000",
    totalDeductions: "₹1,12,000",
    totalNetPay: "₹7,33,000",
  }

  // 🔹 Employee payroll details
  const employeePayrolls = [
    {
      id: 1,
      name: "Rajesh Kumar",
      employeeId: "EMP001",
      grossPay: "₹75,000",
      deductions: "₹10,500",
      netPay: "₹64,500",
    },
    {
      id: 2,
      name: "Priya Sharma",
      employeeId: "EMP002",
      grossPay: "₹68,000",
      deductions: "₹9,200",
      netPay: "₹58,800",
    },
    {
      id: 3,
      name: "Amit Patel",
      employeeId: "EMP003",
      grossPay: "₹82,000",
      deductions: "₹11,800",
      netPay: "₹70,200",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      employeeId: "EMP004",
      grossPay: "₹71,000",
      deductions: "₹9,800",
      netPay: "₹61,200",
    },
    {
      id: 5,
      name: "Vikram Singh",
      employeeId: "EMP005",
      grossPay: "₹79,000",
      deductions: "₹10,900",
      netPay: "₹68,100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">Payroll History Details</h1>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Summary Card */}
        <div className="bg-white border rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Payroll Summary</h2>
            <Badge className="bg-green-100 text-green-700">
              {payrollHistory.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Pay Period</p>
              <p className="font-medium">{payrollHistory.period}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Date</p>
              <p className="font-medium">{payrollHistory.paymentDate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Processed Date</p>
              <p className="font-medium">{payrollHistory.processedDate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Number of Employees</p>
              <p className="font-medium">{payrollHistory.employees}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payroll Type</p>
              <p className="font-medium">{payrollHistory.type}</p>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-semibold mb-4">Financial Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Gross Pay</p>
                <p className="text-xl font-bold text-blue-700">
                  {payrollHistory.totalGrossPay}
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Deductions</p>
                <p className="text-xl font-bold text-red-700">
                  {payrollHistory.totalDeductions}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Net Pay</p>
                <p className="text-xl font-bold text-green-700">
                  {payrollHistory.totalNetPay}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Payslips
            </Button>

            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Tax Summary
            </Button>
          </div>
        </div>

        {/* Employee Details Table */}
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Employee Payroll Details</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Employee ID
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Employee Name
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">
                    Gross Pay
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">
                    Deductions
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">
                    Net Pay
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {employeePayrolls.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4">{employee.employeeId}</td>
                    <td className="px-4 py-4 font-medium">{employee.name}</td>
                    <td className="px-4 py-4 text-right">{employee.grossPay}</td>
                    <td className="px-4 py-4 text-right text-red-600">
                      {employee.deductions}
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-green-600">
                      {employee.netPay}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}