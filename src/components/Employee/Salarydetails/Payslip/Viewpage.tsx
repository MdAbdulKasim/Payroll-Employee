"use client"

import { Building2, Download, ArrowLeft } from "lucide-react"
import { useState, useRef } from "react"

export default function PayslipTemplatesPage() {
  const [isDownloading, setIsDownloading] = useState(false)
  const printAreaRef = useRef<HTMLDivElement>(null)

  const payslipData = {
    company: {
      name: "Zendev",
      website: "www.example.com",
      address: "123 Business Street, Suite 100, New York, NY 10001"
    },
    employee: {
      name: "Jane Doe",
      id: "EMP-2024-089",
      position: "Senior Developer",
      department: "Engineering",
      ssn: "***-**-1234"
    },
    payPeriod: "01/01/2025 - 01/15/2025",
    earnings: [
      { label: "Basic Salary", amount: 4800.00 },
      { label: "Bonus", amount: 500.00 },
      { label: "Allowance", amount: 1200.00 }
    ],
    deductions: [
      { label: "Tax", amount: 720.00 },
      { label: "PF", amount: 300.00 },
      { label: "Insurance", amount: 200.00 }
    ],
    grossPay: 6500.00,
    totalDeductions: 1220.00,
    netPay: 5280.00
  }

  const numberToWords = (num: number): string => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]

    if (num === 0) return "Zero"

    const convert = (n: number): string => {
      if (n < 10) return ones[n]
      if (n < 20) return teens[n - 10]
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "")
      if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "")
      if (n < 1000000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "")
      return convert(Math.floor(n / 1000000)) + " Million" + (n % 1000000 ? " " + convert(n % 1000000) : "")
    }

    return "US Dollar " + convert(Math.floor(num)) + " Only"
  }

  const generatePayslipPDF = async () => {
    setIsDownloading(true)

    try {
      // Dynamically import jsPDF
      const { default: jsPDF } = await import('jspdf')
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const margin = 15
      let yPos = margin

      const formatCurrency = (amount: number): string => {
        return `$${amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      }

      const drawText = (text: string, x: number, y: number, options: any = {}) => {
        pdf.setFontSize(options.fontSize || 10)
        pdf.setFont("helvetica", options.fontStyle || "normal")
        pdf.setTextColor(options.color || "#000000")
        pdf.text(text, x, y, options.align ? { align: options.align } : undefined)
      }

      const drawRect = (x: number, y: number, width: number, height: number, options: any = {}) => {
        if (options.fill) {
          pdf.setFillColor(options.fill)
          pdf.rect(x, y, width, height, "F")
        }
        if (options.stroke) {
          pdf.setDrawColor(options.stroke)
          pdf.rect(x, y, width, height, "S")
        }
      }

      // Header
      drawText(payslipData.company.name, margin, yPos, { fontSize: 18, fontStyle: "bold" })
      yPos += 6
      drawText(payslipData.company.website, margin, yPos, { fontSize: 9, color: "#666666" })
      yPos += 5
      const addressLines = pdf.splitTextToSize(payslipData.company.address, 100)
      addressLines.forEach((line: string) => {
        drawText(line, margin, yPos, { fontSize: 8, color: "#666666" })
        yPos += 4
      })

      // Payslip Title - Right aligned
      const titleY = margin
      drawRect(pageWidth - 70, titleY, 55, 10, { fill: "#1a5662" })
      drawText("PAYROLL PAYSLIP", pageWidth - 42.5, titleY + 6.5, {
        fontSize: 11,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center"
      })

      yPos += 5

      // Employee Information Header
      drawRect(margin, yPos, pageWidth - 2 * margin, 8, { fill: "#1a5662" })
      drawText("EMPLOYEE INFORMATION", margin + 3, yPos + 5.5, {
        fontSize: 10,
        fontStyle: "bold",
        color: "#ffffff"
      })

      yPos += 12

      // Employee details
      const col1X = margin + 3
      const col2X = pageWidth / 2 + 5
      const lineHeight = 6

      const details = [
        [
          { label: "Name", value: payslipData.employee.name },
          { label: "ID Number", value: payslipData.employee.id }
        ],
        [
          { label: "Position", value: payslipData.employee.position },
          { label: "Department", value: payslipData.employee.department }
        ],
        [
          { label: "Pay Period", value: payslipData.payPeriod },
          { label: "SSN", value: payslipData.employee.ssn }
        ]
      ]

      details.forEach((row) => {
        drawText(row[0].label, col1X, yPos, { fontSize: 8, color: "#666666" })
        drawText(`: ${row[0].value}`, col1X + 22, yPos, { fontSize: 9 })
        drawText(row[1].label, col2X, yPos, { fontSize: 8, color: "#666666" })
        drawText(`: ${row[1].value}`, col2X + 22, yPos, { fontSize: 9 })
        yPos += lineHeight
      })

      yPos += 8

      // Earnings and Deductions Table
      const tableStartY = yPos
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

      // Table rows
      const maxRows = Math.max(payslipData.earnings.length, payslipData.deductions.length)
      
      for (let i = 0; i < maxRows; i++) {
        const rowHeight = 7
        
        // Draw borders
        pdf.setDrawColor("#e0e0e0")
        pdf.line(margin, yPos, pageWidth - margin, yPos)
        pdf.line(margin, yPos, margin, yPos + rowHeight)
        pdf.line(margin + colWidth, yPos, margin + colWidth, yPos + rowHeight)
        pdf.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + rowHeight)
        pdf.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + rowHeight)
        pdf.line(pageWidth - margin, yPos, pageWidth - margin, yPos + rowHeight)

        // Earnings
        if (i < payslipData.earnings.length) {
          drawText(payslipData.earnings[i].label, margin + 2, yPos + 5, { fontSize: 9 })
          drawText(
            formatCurrency(payslipData.earnings[i].amount),
            margin + colWidth - 2,
            yPos + 5,
            { fontSize: 9, align: "right" }
          )
        }

        // Deductions
        if (i < payslipData.deductions.length) {
          drawText(payslipData.deductions[i].label, margin + 2 * colWidth + 2, yPos + 5, { fontSize: 9 })
          drawText(
            formatCurrency(payslipData.deductions[i].amount),
            pageWidth - margin - 2,
            yPos + 5,
            { fontSize: 9, align: "right" }
          )
        }

        yPos += rowHeight
      }

      // Total row
      pdf.line(margin, yPos, pageWidth - margin, yPos)
      const totalRowHeight = 8
      drawRect(margin, yPos, pageWidth - 2 * margin, totalRowHeight, { fill: "#1a5662" })

      drawText("GROSS PAY", margin + 2, yPos + 5.5, {
        fontSize: 9,
        fontStyle: "bold",
        color: "#ffffff"
      })
      drawText(
        formatCurrency(payslipData.grossPay),
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
        formatCurrency(payslipData.totalDeductions),
        pageWidth - margin - 2,
        yPos + 5.5,
        { fontSize: 9, fontStyle: "bold", color: "#ffffff", align: "right" }
      )

      // Draw borders
      pdf.line(margin, yPos + totalRowHeight, pageWidth - margin, yPos + totalRowHeight)
      pdf.line(margin, yPos, margin, yPos + totalRowHeight)
      pdf.line(margin + colWidth, yPos, margin + colWidth, yPos + totalRowHeight)
      pdf.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + totalRowHeight)
      pdf.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + totalRowHeight)
      pdf.line(pageWidth - margin, yPos, pageWidth - margin, yPos + totalRowHeight)

      yPos += totalRowHeight + 10

      // Net Pay Box
      drawRect(margin, yPos, pageWidth - 2 * margin, 15, {
        fill: "#1a5662"
      })
      drawText("NET PAY", margin + 3, yPos + 9, {
        fontSize: 10,
        fontStyle: "bold",
        color: "#ffffff"
      })
      drawText(
        formatCurrency(payslipData.netPay),
        pageWidth - margin - 3,
        yPos + 9,
        { fontSize: 16, fontStyle: "bold", color: "#ffffff", align: "right" }
      )

      yPos += 20

      // Amount in Words
      const amountInWords = numberToWords(payslipData.netPay)
      drawText("Amount In Words:", margin, yPos, {
        fontSize: 9,
        color: "#666666"
      })
      yPos += 5
      drawText(amountInWords, margin, yPos, {
        fontSize: 9,
        fontStyle: "bold"
      })

      yPos += 15

      // Signatures
      const sigWidth = (pageWidth - 3 * margin) / 2
      
      // Employer signature
      pdf.line(margin, yPos, margin + sigWidth, yPos)
      drawText("Employer Signature / Date", margin + sigWidth / 2, yPos + 5, {
        fontSize: 8,
        align: "center"
      })

      // Employee signature
      pdf.line(margin + sigWidth + margin, yPos, pageWidth - margin, yPos)
      drawText("Employee Signature / Date", margin + sigWidth + margin + sigWidth / 2, yPos + 5, {
        fontSize: 8,
        align: "center"
      })

      // Save PDF
      pdf.save(`Payslip_${payslipData.employee.id}_${payslipData.payPeriod.split(' - ')[0].replace(/\//g, '-')}.pdf`)

    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            Choose from a wide variety of templates
          </h1>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition-colors flex-1 sm:flex-none justify-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>

            <button
              onClick={generatePayslipPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none justify-center"
            >
              {isDownloading ? (
                <>
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="hidden xs:inline">Generating...</span>
                  <span className="xs:hidden">Wait...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Download
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full Preview (Single Template Only) */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-12 print-area" ref={printAreaRef}>
        <CorporateTealTemplate />
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

/* ===============================
   SINGLE PAYSLIP TEMPLATE
   =============================== */

function CorporateTealTemplate() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-[#1a5662] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#1a5662]" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase">Online Information</p>
            <h2 className="text-xs sm:text-sm font-semibold">www.example.com</h2>
          </div>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <div className="bg-[#1a5662] text-white px-4 sm:px-8 py-1.5 sm:py-2 text-base sm:text-xl font-bold inline-block">
            PAYROLL PAYSLIP
          </div>
          <div className="mt-2">
            <h1 className="text-base sm:text-lg font-bold">Zendev</h1>
            <p className="text-[10px] sm:text-xs text-gray-600">123 Business Street, Suite 100</p>
            <p className="text-[10px] sm:text-xs text-gray-600">New York, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div className="bg-[#1a5662] text-white px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold mb-2">
        EMPLOYEE INFORMATION
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
        <Info label="Name" value="Jane Doe" />
        <Info label="ID Number" value="EMP-2024-089" />
        <Info label="Pay Period" value="01/01/2025 - 01/15/2025" />
        <Info label="Position" value="Senior Developer" />
        <Info label="Department" value="Engineering" />
        <Info label="SSN" value="***-**-1234" />
      </div>

      {/* Earnings & Deductions */}
      <div className="border border-gray-300 mb-4 sm:mb-6 overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-[500px]">
          <thead>
            <tr className="bg-[#1a5662] text-white">
              <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-left text-[10px] sm:text-xs">EARNINGS</th>
              <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs">AMOUNT</th>
              <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-left text-[10px] sm:text-xs border-l">DEDUCTIONS</th>
              <th className="px-2 sm:px-4 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <Row left="Basic Salary" leftAmt="4,800.00" right="Tax" rightAmt="720.00" />
            <Row left="Bonus" leftAmt="500.00" right="PF" rightAmt="300.00" />
            <Row left="Allowance" leftAmt="1,200.00" right="Insurance" rightAmt="200.00" />

            <tr className="bg-[#1a5662] text-white font-bold">
              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">GROSS PAY</td>
              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-right text-xs sm:text-sm">$6,500.00</td>
              <td className="px-2 sm:px-4 py-1.5 sm:py-2 border-l text-xs sm:text-sm">TOTAL DEDUCTIONS</td>
              <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-right text-xs sm:text-sm">$1,220.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Net Pay */}
      <div className="bg-[#1a5662] text-white p-3 sm:p-4 flex justify-between items-center mb-4 sm:mb-6">
        <span className="font-bold text-xs sm:text-sm">NET PAY</span>
        <span className="text-xl sm:text-2xl font-bold">$5,280.00</span>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t">
        <Signature label="Employer Signature / Date" />
        <Signature label="Employee Signature / Date" />
      </div>
    </div>
  )
}

/* ===============================
   SMALL HELPERS (UI SAME)
   =============================== */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] sm:text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-xs sm:text-sm break-words">{value}</p>
    </div>
  )
}

function Row({
  left,
  leftAmt,
  right,
  rightAmt,
}: {
  left: string
  leftAmt: string
  right: string
  rightAmt: string
}) {
  return (
    <tr className="border-b">
      <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">{left}</td>
      <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-right text-xs sm:text-sm">{leftAmt}</td>
      <td className="px-2 sm:px-4 py-1.5 sm:py-2 border-l text-xs sm:text-sm">{right}</td>
      <td className="px-2 sm:px-4 py-1.5 sm:py-2 text-right text-xs sm:text-sm">{rightAmt}</td>
    </tr>
  )
}

function Signature({ label }: { label: string }) {
  return (
    <div>
      <div className="border-b border-gray-400 mb-2 h-8 sm:h-12"></div>
      <p className="text-[10px] sm:text-xs text-center font-semibold">{label}</p>
    </div>
  )
}