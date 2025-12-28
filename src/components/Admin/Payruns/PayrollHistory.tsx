"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye } from "lucide-react"

import { useApp } from "@/context/AppContext"
import { useState } from "react"

export default function PayrollHistoryPage() {
  const router = useRouter()
  const { payruns, employees } = useApp()
  const [selectedPayrunId, setSelectedPayrunId] = useState<string | null>(null)

  const paidPayruns = payruns.filter(p => p.status === 'paid')

  const selectedPayrun = payruns.find(p => p.id === selectedPayrunId)

  if (!selectedPayrunId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/admin/payrun")}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Payruns
          </Button>
          <h1 className="text-xl font-semibold">Payroll History</h1>
        </div>

        <div className="container mx-auto px-6 py-6">
          <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Pay Period</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Payment Date</th>
                  <th className="px-4 py-3 text-left">Employees</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {paidPayruns.map((run) => (
                  <tr key={run.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4">{run.month} {run.year}</td>
                    <td className="px-4 py-4 capitalize">{run.type}</td>
                    <td className="px-4 py-4">{run.paymentDate || "N/A"}</td>
                    <td className="px-4 py-4">{run.employeeCount}</td>
                    <td className="px-4 py-4">
                      <Badge className="bg-green-100 text-green-700">Paid</Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button size="sm" variant="outline" onClick={() => setSelectedPayrunId(run.id)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
                {paidPayruns.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                      No payroll history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Detail View
  const payrollHistory = {
    period: `${selectedPayrun?.month} ${selectedPayrun?.year}`,
    paymentDate: selectedPayrun?.paymentDate || "N/A",
    processedDate: selectedPayrun?.createdAt ? new Date(selectedPayrun.createdAt).toLocaleDateString() : "N/A",
    employees: selectedPayrun?.employeeCount || 0,
    type: selectedPayrun?.type === 'regular' ? "Regular Payroll" : selectedPayrun?.type === 'onetime' ? "One Time Payout" : "Off Cycle Payroll",
    status: "Paid",
    totalGrossPay: `₹${selectedPayrun?.totalAmount?.toLocaleString()}`,
    totalDeductions: "₹0",
    totalNetPay: `₹${selectedPayrun?.totalAmount?.toLocaleString()}`,
  }

  const payrunEmployeeIds = selectedPayrun?.employeeIds || []
  const payrunEmployees = employees.filter(emp => payrunEmployeeIds.includes(emp.id))

  const employeePayrolls = payrunEmployees.map(emp => ({
    id: emp.id,
    name: emp.name,
    employeeId: emp.id,
    department: emp.department || "N/A",
    grossPay: `₹${((selectedPayrun?.totalAmount || 0) / (selectedPayrun?.employeeCount || 1)).toLocaleString()}`,
    deductions: "₹0",
    netPay: `₹${((selectedPayrun?.totalAmount || 0) / (selectedPayrun?.employeeCount || 1)).toLocaleString()}`,
  }))

  const handleDownloadPayslip = async (employee: any) => {
    try {
      // TODO: Replace with actual API call to get detailed payslip data
      // const response = await fetch(`/api/payslips/${selectedPayrunId}/${employee.id}`);
      // const payslipData = await response.json();
      // Then generate PDF with the actual data
      
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()
      doc.setFontSize(20)
      doc.text("PAYSLIP", 105, 20, { align: "center" })
      doc.setFontSize(12)
      doc.text(`Employee Name: ${employee.name}`, 20, 40)
      doc.text(`Employee ID: ${employee.id}`, 20, 50)
      doc.text(`Department: ${employee.department}`, 20, 60)
      doc.text(`Month: ${selectedPayrun?.month} ${selectedPayrun?.year}`, 20, 70)
      doc.text(`Payment Date: ${selectedPayrun?.paymentDate}`, 20, 80)
      doc.line(20, 90, 190, 90)
      doc.text("Earnings", 20, 100)
      doc.text(`${employee.grossPay}`, 170, 100, { align: "right" })
      doc.text("Deductions", 20, 110)
      doc.text(`${employee.deductions}`, 170, 110, { align: "right" })
      doc.line(20, 120, 190, 120)
      doc.setFont("helvetica", "bold")
      doc.text("Net Pay", 20, 130)
      doc.text(`${employee.netPay}`, 170, 130, { align: "right" })
      doc.save(`Payslip_${employee.name}_${selectedPayrun?.month}.pdf`)
    } catch (error) {
      console.error('Error downloading payslip:', error)
    }
  }

  const handleDownloadReport = async () => {
    try {
      // TODO: Replace with actual API call to get detailed payroll report data
      // const response = await fetch(`/api/payroll-reports/${selectedPayrunId}`);
      // const reportData = await response.json();
      // Then generate PDF with the actual data
      
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()
      doc.setFontSize(18)
      doc.text("Payroll Report", 105, 20, { align: "center" })
      doc.setFontSize(10)
      doc.text(`Period: ${payrollHistory.period}`, 20, 40)
      doc.text(`Type: ${payrollHistory.type}`, 20, 50)
      doc.text(`Payment Date: ${payrollHistory.paymentDate}`, 20, 60)
      doc.text(`Processed Date: ${payrollHistory.processedDate}`, 20, 70)

      doc.text(`Total Gross Pay: ${payrollHistory.totalGrossPay}`, 20, 90)
      doc.text(`Total Deductions: ${payrollHistory.totalDeductions}`, 20, 100)
      doc.text(`Total Net Pay: ${payrollHistory.totalNetPay}`, 20, 110)

      doc.text("Employee Breakdown", 20, 130)
      let y = 140
      doc.setFont("helvetica", "bold")
      doc.text("Name", 20, y)
      doc.text("ID", 70, y)
      doc.text("Net Pay", 170, y, { align: "right" })
      doc.line(20, y + 2, 190, y + 2)
      y += 10
      doc.setFont("helvetica", "normal")

      employeePayrolls.forEach(emp => {
        doc.text(emp.name, 20, y)
        doc.text(emp.id, 70, y)
        doc.text(emp.netPay, 170, y, { align: "right" })
        y += 10
      })

      doc.save(`Payroll_Report_${selectedPayrun?.month}_${selectedPayrun?.year}.pdf`)
    } catch (error) {
      console.error('Error downloading report:', error)
    }
  }

  const handleDownloadAllPayslips = async () => {
    try {
      // TODO: Replace with actual API call to get all payslips data
      // const response = await fetch(`/api/payslips/${selectedPayrunId}/all`);
      // const payslipsData = await response.json();
      // Then generate PDF with the actual data
      
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()
      employeePayrolls.forEach((employee, index) => {
        if (index > 0) doc.addPage()
        doc.setFontSize(20)
        doc.text("PAYSLIP", 105, 20, { align: "center" })
        doc.setFontSize(12)
        doc.text(`Employee Name: ${employee.name}`, 20, 40)
        doc.text(`Employee ID: ${employee.id}`, 20, 50)
        doc.text(`Department: ${employee.department}`, 20, 60)
        doc.text(`Month: ${selectedPayrun?.month} ${selectedPayrun?.year}`, 20, 70)
        doc.text(`Payment Date: ${selectedPayrun?.paymentDate}`, 20, 80)
        doc.line(20, 90, 190, 90)
        doc.text("Earnings", 20, 100)
        doc.text(`${employee.grossPay}`, 170, 100, { align: "right" })
        doc.text("Deductions", 20, 110)
        doc.text(`${employee.deductions}`, 170, 110, { align: "right" })
        doc.line(20, 120, 190, 120)
        doc.setFont("helvetica", "bold")
        doc.text("Net Pay", 20, 130)
        doc.text(`${employee.netPay}`, 170, 130, { align: "right" })
      })
      doc.save(`All_Payslips_${selectedPayrun?.month}.pdf`)
    } catch (error) {
      console.error('Error downloading all payslips:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setSelectedPayrunId(null)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to History
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>

            <Button variant="outline" onClick={handleDownloadAllPayslips}>
              <Download className="h-4 w-4 mr-2" />
              Download Payslips
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
                      <Button size="sm" variant="outline" onClick={() => handleDownloadPayslip(employee)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
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