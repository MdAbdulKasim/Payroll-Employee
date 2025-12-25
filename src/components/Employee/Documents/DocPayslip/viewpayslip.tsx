"use client"

import { useState } from "react"
import { Building2, Download, ArrowLeft } from "lucide-react"

type TemplateId = "corporate-teal" | "professional-brown" | "minimal-clean" | "modern-gradient"

export default function PayslipTemplatesPage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("corporate-teal")

  const templates = [
    { id: "corporate-teal" as TemplateId, name: "Corporate Teal" },
    { id: "professional-brown" as TemplateId, name: "Professional Brown" },
    { id: "minimal-clean" as TemplateId, name: "Minimal Clean" },
    { id: "modern-gradient" as TemplateId, name: "Modern Gradient" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Choose from a wide variety of templates</h1>

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

        {/* Template Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
              className={`bg-white rounded-lg border-2 cursor-pointer overflow-hidden transition-all hover:shadow-lg ${
                activeTemplate === template.id ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="p-2 border-b bg-gray-50">
                <p className="text-sm font-medium text-center">{template.name}</p>
              </div>
              <div className="p-3 overflow-hidden">
                <div className="origin-top-left scale-[0.15] w-[666%] h-[300px]">
                  <PayslipTemplate variant={template.id} isPreview={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Preview */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-12">
        <PayslipTemplate variant={activeTemplate} isPreview={true} />
      </div>
    </div>
  )
}

function PayslipTemplate({ variant, isPreview }: { variant: TemplateId; isPreview: boolean }) {
  switch (variant) {
    case "corporate-teal":
      return <CorporateTealTemplate />
    case "professional-brown":
      return <ProfessionalBrownTemplate />
    case "minimal-clean":
      return <MinimalCleanTemplate />
    case "modern-gradient":
      return <ModernGradientTemplate />
    default:
      return <CorporateTealTemplate />
  }
}

// Template 1: Corporate Teal (Based on first screenshot)
function CorporateTealTemplate() {
  return (
    <div className="bg-white print-area">
      {/* Header with Company Logo and Payslip Title */}
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
          <div className="bg-[#1a5662] text-white px-8 py-2 text-xl font-bold tracking-wider">PAYSLIP</div>
          <div className="mt-2">
            <h1 className="text-lg font-bold">Star Well Inc</h1>
            <p className="text-xs text-gray-600">123 Business Street, Suite 100</p>
            <p className="text-xs text-gray-600">New York, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Employee Info Section */}
      <div className="bg-[#1a5662] text-white px-4 py-1.5 text-xs font-bold mb-2">EMPLOYEE INFORMATION</div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500">Name</p>
          <p className="font-semibold">Jane Doe</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">ID Number</p>
          <p className="font-semibold">EMP-2024-089</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Pay Period</p>
          <p className="font-semibold">01/01/2025 - 01/15/2025</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Position</p>
          <p className="font-semibold">Senior Developer</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Department</p>
          <p className="font-semibold">Engineering</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">SSN</p>
          <p className="font-semibold">***-**-1234</p>
        </div>
      </div>

      {/* Earnings & Deductions Table */}
      <div className="border border-gray-300 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1a5662] text-white">
              <th className="text-left px-4 py-2 font-bold text-xs">EARNINGS</th>
              <th className="text-center px-4 py-2 font-bold text-xs">HOURS</th>
              <th className="text-center px-4 py-2 font-bold text-xs">RATE</th>
              <th className="text-right px-4 py-2 font-bold text-xs">AMOUNT</th>
              <th className="text-left px-4 py-2 font-bold text-xs border-l-2 border-white">DEDUCTIONS</th>
              <th className="text-right px-4 py-2 font-bold text-xs">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Regular Pay</td>
              <td className="text-center px-4 py-2">160</td>
              <td className="text-center px-4 py-2">$</td>
              <td className="text-right px-4 py-2">4,800.00</td>
              <td className="px-4 py-2 border-l">Federal Tax</td>
              <td className="text-right px-4 py-2">720.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Holiday Pay</td>
              <td className="text-center px-4 py-2">8</td>
              <td className="text-center px-4 py-2">$</td>
              <td className="text-right px-4 py-2">240.00</td>
              <td className="px-4 py-2 border-l">State Tax</td>
              <td className="text-right px-4 py-2">240.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Overtime Pay</td>
              <td className="text-center px-4 py-2">5</td>
              <td className="text-center px-4 py-2">1.5x$</td>
              <td className="text-right px-4 py-2">225.00</td>
              <td className="px-4 py-2 border-l">Social Security</td>
              <td className="text-right px-4 py-2">310.35</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Bonus</td>
              <td className="text-center px-4 py-2">-</td>
              <td className="text-center px-4 py-2">-</td>
              <td className="text-right px-4 py-2">500.00</td>
              <td className="px-4 py-2 border-l">Medicare</td>
              <td className="text-right px-4 py-2">72.59</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Other Taxable Pay</td>
              <td className="text-center px-4 py-2">-</td>
              <td className="text-center px-4 py-2">-</td>
              <td className="text-right px-4 py-2">1,234.56</td>
              <td className="px-4 py-2 border-l">401(k)</td>
              <td className="text-right px-4 py-2">300.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Commission Pay</td>
              <td className="text-center px-4 py-2">-</td>
              <td className="text-center px-4 py-2">-</td>
              <td className="text-right px-4 py-2">150.00</td>
              <td className="px-4 py-2 border-l">Health Insurance</td>
              <td className="text-right px-4 py-2">200.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Sick Pay</td>
              <td className="text-center px-4 py-2">8</td>
              <td className="text-center px-4 py-2">$</td>
              <td className="text-right px-4 py-2">240.00</td>
              <td className="px-4 py-2 border-l"></td>
              <td className="text-right px-4 py-2"></td>
            </tr>
            <tr className="bg-[#1a5662] text-white font-bold">
              <td className="px-4 py-2 text-xs" colSpan={3}>
                GROSS PAY
              </td>
              <td className="text-right px-4 py-2">$ 7,389.56</td>
              <td className="px-4 py-2 text-xs border-l-2 border-white">TOTAL DEDUCTIONS</td>
              <td className="text-right px-4 py-2">$ 1,842.94</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Net Pay */}
      <div className="bg-[#1a5662] text-white p-4 flex justify-between items-center mb-6">
        <span className="font-bold text-sm">NET PAY</span>
        <span className="text-2xl font-bold">$ 5,546.62</span>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t">
        <div>
          <div className="border-b border-gray-400 mb-2 h-12"></div>
          <p className="text-xs text-center font-semibold">Employer Signature/Date</p>
        </div>
        <div>
          <div className="border-b border-gray-400 mb-2 h-12"></div>
          <p className="text-xs text-center font-semibold">Employee Signature/Date</p>
        </div>
      </div>
    </div>
  )
}

// Template 2: Professional Brown (Based on second screenshot)
function ProfessionalBrownTemplate() {
  return (
    <div className="bg-white print-area">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-[#8B6F47]">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg bg-[#8B6F47] flex items-center justify-center">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Star Well Inc</h1>
            <p className="text-xs text-gray-600">Employee Payroll System</p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-[#8B6F47] text-white px-6 py-1 text-sm font-bold inline-block mb-2">PAYSLIP</div>
          <p className="text-xs text-gray-600">Pay Date: January 15, 2025</p>
        </div>
      </div>

      {/* Employee Details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="bg-[#8B6F47] text-white px-3 py-1 text-xs font-bold">EMPLOYEE INFO</div>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="text-gray-600 w-32">Name:</span>
              <span className="font-semibold">Jane Doe</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Employee ID:</span>
              <span className="font-semibold">EMP-089</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Department:</span>
              <span className="font-semibold">Engineering</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Position:</span>
              <span className="font-semibold">Senior Developer</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-100 border border-gray-300 p-4 rounded">
            <div className="text-right mb-1">
              <p className="text-xs text-gray-600">TOTAL PAY</p>
              <p className="text-2xl font-bold text-[#8B6F47]">$ 2,840.00</p>
            </div>
            <div className="text-right text-xs text-gray-600">
              <p>Gross Pay: $3,200.00</p>
              <p>Total Ded: $360.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="mb-4">
        <div className="bg-[#8B6F47] text-white px-3 py-1.5 text-xs font-bold mb-2">EARNINGS</div>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2 border-b font-semibold text-xs">Description</th>
              <th className="text-center px-4 py-2 border-b font-semibold text-xs">Hours</th>
              <th className="text-right px-4 py-2 border-b font-semibold text-xs">Rate</th>
              <th className="text-right px-4 py-2 border-b font-semibold text-xs">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Regular Salary</td>
              <td className="text-center px-4 py-2">160</td>
              <td className="text-right px-4 py-2">$18.75</td>
              <td className="text-right px-4 py-2 font-semibold">$3,000.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Overtime</td>
              <td className="text-center px-4 py-2">4</td>
              <td className="text-right px-4 py-2">$28.13</td>
              <td className="text-right px-4 py-2 font-semibold">$112.50</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Bonus</td>
              <td className="text-center px-4 py-2">-</td>
              <td className="text-right px-4 py-2">-</td>
              <td className="text-right px-4 py-2 font-semibold">$87.50</td>
            </tr>
            <tr className="bg-gray-100 font-bold">
              <td className="px-4 py-2" colSpan={3}>
                Gross Pay
              </td>
              <td className="text-right px-4 py-2">$3,200.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deductions Table */}
      <div className="mb-6">
        <div className="bg-gray-700 text-white px-3 py-1.5 text-xs font-bold mb-2">DEDUCTIONS</div>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2 border-b font-semibold text-xs">Description</th>
              <th className="text-right px-4 py-2 border-b font-semibold text-xs">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Federal Tax</td>
              <td className="text-right px-4 py-2 text-red-600 font-semibold">-$240.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">State Tax</td>
              <td className="text-right px-4 py-2 text-red-600 font-semibold">-$80.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Health Insurance</td>
              <td className="text-right px-4 py-2 text-red-600 font-semibold">-$40.00</td>
            </tr>
            <tr className="bg-gray-100 font-bold">
              <td className="px-4 py-2">Total Deductions</td>
              <td className="text-right px-4 py-2 text-red-600">-$360.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Net Pay Banner */}
      <div className="bg-[#8B6F47] text-white p-4 rounded flex justify-between items-center">
        <div>
          <p className="text-xs opacity-90">NET PAY (Take Home)</p>
          <p className="text-xs opacity-75 mt-1">Paid via Direct Deposit</p>
        </div>
        <p className="text-3xl font-bold">$ 2,840.00</p>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        This is a computer-generated payslip and does not require a signature.
      </p>
    </div>
  )
}

// Template 3: Minimal Clean (Based on third screenshot)
function MinimalCleanTemplate() {
  return (
    <div className="bg-white print-area max-w-2xl mx-auto">
      {/* Logo and Company Info */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
          <div className="w-8 h-8 border-2 border-blue-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        <p className="text-xs text-gray-600 uppercase tracking-wide">
          MIAMI, FL 33101 | TEL: (305) 123-4567 | EMAIL: INFO@COMPANY.COM | EMPLOYER TAX # 222 XXX 777
        </p>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-2">Domestic Worker Payslip</h1>
      <p className="text-sm text-center text-gray-600 mb-6">
        <span className="font-semibold">Pay Period:</span> January 1, 2025 to January 15, 2025 |
        <span className="font-semibold"> Pay Date:</span> January 16, 2025
      </p>

      {/* Employee Info Table */}
      <table className="w-full mb-6 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 font-semibold">Employee Name</th>
            <th className="text-left px-4 py-2 font-semibold">Position</th>
            <th className="text-left px-4 py-2 font-semibold">SS Number</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-3">Drake Feeney</td>
            <td className="px-4 py-3">Domestic Worker</td>
            <td className="px-4 py-3">522-05-4030</td>
          </tr>
        </tbody>
      </table>

      {/* Earnings Table */}
      <div className="mb-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 font-semibold" colSpan={2}>
                Earnings
              </th>
              <th className="text-right px-4 py-2 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Base Salary</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$2,500.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Overtime Pay</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$150.00</td>
            </tr>
            <tr className="border-b bg-gray-50 font-semibold">
              <td className="px-4 py-2">Gross Salary</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$2,650.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deductions Table */}
      <div className="mb-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 font-semibold" colSpan={2}>
                Deductions
              </th>
              <th className="text-right px-4 py-2 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Taxes</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$265.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Late Penalties</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$0.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Insurances</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$75.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Absences</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$0.00</td>
            </tr>
            <tr className="border-b bg-gray-50 font-semibold">
              <td className="px-4 py-2">Total Deductions</td>
              <td className="px-4 py-2"></td>
              <td className="text-right px-4 py-2">$340.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Net Pay */}
      <div className="mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 font-semibold" colSpan={2}>
                Net Pay
              </th>
              <th className="text-right px-4 py-2 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td className="px-4 py-3 font-bold">Net Pay</td>
              <td className="px-4 py-3"></td>
              <td className="text-right px-4 py-3 font-bold text-lg text-blue-600">$2,310.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-center text-gray-500 italic">
        For questions or further assistance, please feel free to contact us at [Your Email].
      </p>
    </div>
  )
}

// Template 4: Modern Gradient
function ModernGradientTemplate() {
  return (
    <div className="bg-white print-area">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-1">PAYSLIP</h1>
            <p className="text-sm opacity-90">Payment Statement</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Period Ending</p>
            <p className="text-lg font-semibold">January 15, 2025</p>
          </div>
        </div>
      </div>

      {/* Company and Employee Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
          <h3 className="text-xs font-bold text-purple-900 uppercase mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Company Information
          </h3>
          <div className="space-y-1 text-sm">
            <p className="font-bold text-gray-900">TechCorp Industries</p>
            <p className="text-gray-700">789 Innovation Drive</p>
            <p className="text-gray-700">San Francisco, CA 94105</p>
            <p className="text-gray-700">EIN: 12-3456789</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg">
          <h3 className="text-xs font-bold text-blue-900 uppercase mb-3">Employee Information</h3>
          <div className="space-y-1 text-sm">
            <p className="font-bold text-gray-900">Jane Doe</p>
            <p className="text-gray-700">ID: EMP-2024-089</p>
            <p className="text-gray-700">Position: Senior Developer</p>
            <p className="text-gray-700">Department: Engineering</p>
          </div>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-xs text-green-700 font-semibold uppercase mb-1">Gross Pay</p>
          <p className="text-2xl font-bold text-green-900">$8,500</p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-xs text-red-700 font-semibold uppercase mb-1">Deductions</p>
          <p className="text-2xl font-bold text-red-900">$2,125</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-xs text-blue-700 font-semibold uppercase mb-1">Net Pay</p>
          <p className="text-2xl font-bold text-blue-900">$6,375</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Earnings */}
        <div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-t-lg">
            <h3 className="font-bold text-sm">EARNINGS</h3>
          </div>
          <div className="border border-t-0 rounded-b-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b bg-gray-50">
                  <td className="px-4 py-2">Base Salary</td>
                  <td className="px-4 py-2 text-right font-semibold">$7,000</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Overtime (10 hrs)</td>
                  <td className="px-4 py-2 text-right font-semibold">$500</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="px-4 py-2">Performance Bonus</td>
                  <td className="px-4 py-2 text-right font-semibold">$1,000</td>
                </tr>
                <tr className="bg-green-100 font-bold">
                  <td className="px-4 py-2">Total Earnings</td>
                  <td className="px-4 py-2 text-right">$8,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Deductions */}
        <div>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-t-lg">
            <h3 className="font-bold text-sm">DEDUCTIONS</h3>
          </div>
          <div className="border border-t-0 rounded-b-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b bg-gray-50">
                  <td className="px-4 py-2">Federal Tax</td>
                  <td className="px-4 py-2 text-right font-semibold">$1,275</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">State Tax</td>
                  <td className="px-4 py-2 text-right font-semibold">$425</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="px-4 py-2">Social Security</td>
                  <td className="px-4 py-2 text-right font-semibold">$255</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Medicare</td>
                  <td className="px-4 py-2 text-right font-semibold">$85</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="px-4 py-2">Health Insurance</td>
                  <td className="px-4 py-2 text-right font-semibold">$85</td>
                </tr>
                <tr className="bg-red-100 font-bold">
                  <td className="px-4 py-2">Total Deductions</td>
                  <td className="px-4 py-2 text-right">$2,125</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Net Pay Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm opacity-90 mb-1">Net Amount Payable</p>
          <p className="text-xs opacity-75">Transferred to account ending in ****1234</p>
        </div>
        <p className="text-4xl font-bold">$6,375.00</p>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        This is an electronically generated payslip. For queries, contact HR at hr@techcorp.com
      </p>
    </div>
  )
}
