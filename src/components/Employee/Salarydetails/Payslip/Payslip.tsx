"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Eye, FileDown, ChevronDown } from "lucide-react"
import SalaryTabs from "@/components/Employee/Salarydetails/Tabs"
import { useRouter } from "next/navigation"
import jsPDF from "jspdf"

export default function Payslip() {
  const router = useRouter()
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

  /* ================= PDF DOWNLOAD ================= */
  const handleDownload = (month: string) => {
    const data = payslipData.find(item => item.month === month)
    if (!data) return

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 15
    let yPos = margin

    const drawText = (text: string, x: number, y: number, options: any = {}) => {
      doc.setFontSize(options.fontSize || 10)
      doc.setFont("helvetica", options.fontStyle || "normal")
      doc.setTextColor(options.color || "#000000")
      doc.text(text, x, y, options.align ? { align: options.align } : undefined)
    }

    const drawRect = (x: number, y: number, width: number, height: number, options: any = {}) => {
      if (options.fill) {
        doc.setFillColor(options.fill)
        doc.rect(x, y, width, height, "F")
      }
      if (options.stroke) {
        doc.setDrawColor(options.stroke)
        doc.rect(x, y, width, height, "S")
      }
    }

    // Company Header
    drawText("Your Company Name", margin, yPos, { fontSize: 18, fontStyle: "bold" })
    yPos += 6
    drawText("www.yourcompany.com", margin, yPos, { fontSize: 9, color: "#666666" })
    yPos += 5
    drawText("123 Business Street, Suite 100, City, State 10001", margin, yPos, { fontSize: 8, color: "#666666" })
    yPos += 10

    // Payslip Title - Right aligned
    const titleY = margin
    drawRect(pageWidth - 70, titleY, 55, 10, { fill: "#1a5662" })
    drawText("PAYROLL PAYSLIP", pageWidth - 42.5, titleY + 6.5, {
      fontSize: 11,
      fontStyle: "bold",
      color: "#ffffff",
      align: "center"
    })

    // Employee Information Header
    drawRect(margin, yPos, pageWidth - 2 * margin, 8, { fill: "#1a5662" })
    drawText("EMPLOYEE INFORMATION", margin + 3, yPos + 5.5, {
      fontSize: 10,
      fontStyle: "bold",
      color: "#ffffff"
    })

    yPos += 12

    // Employee Details
    const col1X = margin + 3
    const col2X = pageWidth / 2 + 5
    const lineHeight = 6

    drawText("Name", col1X, yPos, { fontSize: 8, color: "#666666" })
    drawText(": John Doe", col1X + 22, yPos, { fontSize: 9 })
    drawText("ID Number", col2X, yPos, { fontSize: 8, color: "#666666" })
    drawText(": EMP-2024-089", col2X + 22, yPos, { fontSize: 9 })
    yPos += lineHeight

    drawText("Position", col1X, yPos, { fontSize: 8, color: "#666666" })
    drawText(": Software Engineer", col1X + 22, yPos, { fontSize: 9 })
    drawText("Department", col2X, yPos, { fontSize: 8, color: "#666666" })
    drawText(": Engineering", col2X + 22, yPos, { fontSize: 9 })
    yPos += lineHeight

    drawText("Pay Period", col1X, yPos, { fontSize: 8, color: "#666666" })
    drawText(`: ${month}`, col1X + 22, yPos, { fontSize: 9 })
    drawText("PAN", col2X, yPos, { fontSize: 8, color: "#666666" })
    drawText(": ABCDE1234F", col2X + 22, yPos, { fontSize: 9 })
    yPos += lineHeight + 8

    // Earnings and Deductions Table
    const colWidth = (pageWidth - 2 * margin) / 4

    // Table Header
    drawRect(margin, yPos, pageWidth - 2 * margin, 8, { fill: "#1a5662" })
    drawText("EARNINGS", margin + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    })
    drawText("AMOUNT", margin + colWidth - 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff",
      align: "right"
    })
    drawText("DEDUCTIONS", margin + 2 * colWidth + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    })
    drawText("AMOUNT", pageWidth - margin - 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff",
      align: "right"
    })

    yPos += 8

    // Parse amounts
    const grossPayValue = parseFloat(data.grossPay.replace(/₹|,/g, ''))
    const reimbursementValue = parseFloat(data.reimbursement.replace(/₹|,/g, ''))
    const deductionsValue = parseFloat(data.deductions.replace(/₹|,/g, ''))
    const basicSalary = grossPayValue - reimbursementValue

    const earnings = [
      { label: "Basic Salary", amount: basicSalary },
      { label: "Allowances", amount: reimbursementValue }
    ]

    const deductions = [
      { label: "Tax (TDS)", amount: deductionsValue * 0.6 },
      { label: "PF", amount: deductionsValue * 0.4 }
    ]

    const maxRows = Math.max(earnings.length, deductions.length)
    
    for (let i = 0; i < maxRows; i++) {
      const rowHeight = 7
      
      // Draw borders
      doc.setDrawColor("#e0e0e0")
      doc.line(margin, yPos, pageWidth - margin, yPos)
      doc.line(margin, yPos, margin, yPos + rowHeight)
      doc.line(margin + colWidth, yPos, margin + colWidth, yPos + rowHeight)
      doc.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + rowHeight)
      doc.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + rowHeight)
      doc.line(pageWidth - margin, yPos, pageWidth - margin, yPos + rowHeight)

      // Earnings
      if (i < earnings.length) {
        drawText(earnings[i].label, margin + 2, yPos + 5, { fontSize: 9 })
        drawText(
          `₹${earnings[i].amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          margin + colWidth - 2,
          yPos + 5,
          { fontSize: 9, align: "right" }
        )
      }

      // Deductions
      if (i < deductions.length) {
        drawText(deductions[i].label, margin + 2 * colWidth + 2, yPos + 5, { fontSize: 9 })
        drawText(
          `₹${deductions[i].amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          pageWidth - margin - 2,
          yPos + 5,
          { fontSize: 9, align: "right" }
        )
      }

      yPos += rowHeight
    }

    // Total row
    doc.line(margin, yPos, pageWidth - margin, yPos)
    const totalRowHeight = 8
    drawRect(margin, yPos, pageWidth - 2 * margin, totalRowHeight, { fill: "#1a5662" })

    drawText("GROSS PAY", margin + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    })
    drawText(
      data.grossPay,
      margin + colWidth - 2,
      yPos + 5.5,
      { fontSize: 9, fontStyle: "bold", color: "#ffffff", align: "right" }
    )
    drawText("TOTAL DEDUCTIONS", margin + 2 * colWidth + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    })
    drawText(
      data.deductions,
      pageWidth - margin - 2,
      yPos + 5.5,
      { fontSize: 9, fontStyle: "bold", color: "#ffffff", align: "right" }
    )

    // Draw borders
    doc.line(margin, yPos + totalRowHeight, pageWidth - margin, yPos + totalRowHeight)
    doc.line(margin, yPos, margin, yPos + totalRowHeight)
    doc.line(margin + colWidth, yPos, margin + colWidth, yPos + totalRowHeight)
    doc.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + totalRowHeight)
    doc.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + totalRowHeight)
    doc.line(pageWidth - margin, yPos, pageWidth - margin, yPos + totalRowHeight)

    yPos += totalRowHeight + 10

    // Net Pay Box
    drawRect(margin, yPos, pageWidth - 2 * margin, 15, {
      fill: "#1a5662"
    })
    drawText("NET PAY (TAKE HOME)", margin + 3, yPos + 9, {
      fontSize: 10,
      fontStyle: "bold",
      color: "#ffffff"
    })
    drawText(
      data.takeHome,
      pageWidth - margin - 3,
      yPos + 9,
      { fontSize: 16, fontStyle: "bold", color: "#ffffff", align: "right" }
    )

    yPos += 20

    // Footer Note
    drawText("This is a computer-generated payslip and does not require a signature.", margin, yPos, {
      fontSize: 8,
      color: "#666666"
    })

    yPos += 15

    // Signatures
    const sigWidth = (pageWidth - 3 * margin) / 2
    
    // Employer signature
    doc.line(margin, yPos, margin + sigWidth, yPos)
    drawText("Employer Signature / Date", margin + sigWidth / 2, yPos + 5, {
      fontSize: 8,
      align: "center"
    })

    // Employee signature
    doc.line(margin + sigWidth + margin, yPos, pageWidth - margin, yPos)
    drawText("Employee Signature / Date", margin + sigWidth + margin + sigWidth / 2, yPos + 5, {
      fontSize: 8,
      align: "center"
    })

    // Save PDF
    doc.save(`Payslip_${month.replace(/\s+/g, '_')}.pdf`)
  }
  /* ================================================= */

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
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium">Month</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Gross Pay</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Reimbursement</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Deductions</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Take Home</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Payslip</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {payslipData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm">{item.month}</td>
                      <td className="px-4 py-3 text-sm">{item.grossPay}</td>
                      <td className="px-4 py-3 text-sm">{item.reimbursement}</td>
                      <td className="px-4 py-3 text-sm text-red-600">{item.deductions}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-blue-600">{item.takeHome}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => router.push("/employee/salary/payslip/view")}
                          className="flex items-center gap-1 text-sm"
                        >
                          <Eye className="h-4 w-4" /> View
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDownload(item.month)}
                          className="flex items-center gap-1 text-sm"
                        >
                          <FileDown className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="md:hidden divide-y">
              {payslipData.map((item, index) => (
                <div key={index} className="p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{item.month}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Pay Period</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm sm:text-base text-blue-600">{item.takeHome}</p>
                      <p className="text-xs text-gray-500">Take Home</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Gross Pay</p>
                      <p className="text-sm font-medium">{item.grossPay}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reimbursement</p>
                      <p className="text-sm font-medium">{item.reimbursement}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Deductions</p>
                      <p className="text-sm font-medium text-red-600">{item.deductions}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <button
                      onClick={() => router.push("/employee/salary/payslip/view")}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-xs sm:text-sm font-medium transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDownload(item.month)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs sm:text-sm font-medium transition-colors"
                    >
                      <FileDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>Download</span>
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