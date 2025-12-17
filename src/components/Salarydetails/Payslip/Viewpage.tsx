"use client"

import { Building2, Download, ArrowLeft } from "lucide-react"

export default function PayslipTemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Choose from a wide variety of templates
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Full Preview (Single Template Only) */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-12 print-area">
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
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-[#1a5662] flex items-center justify-center">
            <Building2 className="w-8 h-8 text-[#1a5662]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Online Information</p>
            <h2 className="text-sm font-semibold">www.example.com</h2>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-[#1a5662] text-white px-8 py-2 text-xl font-bold">
            PAYROLL PAYSLIP
          </div>
          <div className="mt-2">
            <h1 className="text-lg font-bold">Zendev</h1>
            <p className="text-xs text-gray-600">123 Business Street, Suite 100</p>
            <p className="text-xs text-gray-600">New York, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div className="bg-[#1a5662] text-white px-4 py-1.5 text-xs font-bold mb-2">
        EMPLOYEE INFORMATION
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Info label="Name" value="Jane Doe" />
        <Info label="ID Number" value="EMP-2024-089" />
        <Info label="Pay Period" value="01/01/2025 - 01/15/2025" />
        <Info label="Position" value="Senior Developer" />
        <Info label="Department" value="Engineering" />
        <Info label="SSN" value="***-**-1234" />
      </div>

      {/* Earnings & Deductions */}
      <div className="border border-gray-300 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1a5662] text-white">
              <th className="px-4 py-2 text-left text-xs">EARNINGS</th>
              <th className="px-4 py-2 text-right text-xs">AMOUNT</th>
              <th className="px-4 py-2 text-left text-xs border-l">DEDUCTIONS</th>
              <th className="px-4 py-2 text-right text-xs">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <Row left="Basic Salary" leftAmt="4,800.00" right="Tax" rightAmt="720.00" />
            <Row left="Bonus" leftAmt="500.00" right="PF" rightAmt="300.00" />
            <Row left="Allowance" leftAmt="1,200.00" right="Insurance" rightAmt="200.00" />

            <tr className="bg-[#1a5662] text-white font-bold">
              <td className="px-4 py-2">GROSS PAY</td>
              <td className="px-4 py-2 text-right">$6,500.00</td>
              <td className="px-4 py-2 border-l">TOTAL DEDUCTIONS</td>
              <td className="px-4 py-2 text-right">$1,220.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Net Pay */}
      <div className="bg-[#1a5662] text-white p-4 flex justify-between items-center mb-6">
        <span className="font-bold text-sm">NET PAY</span>
        <span className="text-2xl font-bold">$5,280.00</span>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t">
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
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
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
      <td className="px-4 py-2">{left}</td>
      <td className="px-4 py-2 text-right">{leftAmt}</td>
      <td className="px-4 py-2 border-l">{right}</td>
      <td className="px-4 py-2 text-right">{rightAmt}</td>
    </tr>
  )
}

function Signature({ label }: { label: string }) {
  return (
    <div>
      <div className="border-b border-gray-400 mb-2 h-12"></div>
      <p className="text-xs text-center font-semibold">{label}</p>
    </div>
  )
}
