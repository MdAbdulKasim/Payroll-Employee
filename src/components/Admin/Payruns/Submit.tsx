"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { ArrowLeft, ChevronDown, Filter, Upload, X } from "lucide-react"

export default function PayrunSubmitPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")

  const [activeTab, setActiveTab] = useState("employee")
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)

  const payrun = {
    period: "December 2025",
    payDay: "15 Dec 2025",
    employees: 1,
    payrollCost: 2000,
    netPay: 2000,
    status: "Draft",
  }

  const title =
    type === "onetime"
      ? "One Time Payout"
      : type === "offcycle"
      ? "Off Cycle Payroll"
      : "Regular Payroll"

  const handleApprovalSubmit = () => {
    // Close dialog and navigate
    setShowApprovalDialog(false)
    router.push("/admin/payrun/record") // Change this to your desired route
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">{title}</h1>
          <Badge variant="outline">{payrun.status}</Badge>
        </div>

        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowApprovalDialog(true)}
        >
          Submit and Approve
        </Button>
      </div>

      {/* SUMMARY */}
      <div className="container mx-auto px-6 py-4">
        <div className="bg-gray-100 rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Period: December 2025</p>
            <p className="text-2xl font-semibold">₹2,000.00</p>
            <p className="text-xs text-gray-500">PAYROLL COST</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">₹2,000.00</p>
            <p className="text-xs text-gray-500">TOTAL NET PAY</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">PAY DAY</p>
            <p className="text-2xl font-semibold">15</p>
            <p className="text-xs text-gray-500">DEC, 2025</p>
            <p className="text-xs text-gray-500 mt-1">1 Employees</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Taxes & Deductions</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Benefits</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Donations</span>
                <span>₹0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="container mx-auto px-6">
        <div className="border-b bg-white">
          <div className="flex gap-8 px-6">
            {["employee", "taxes", "insights"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "employee"
                  ? "Employee Summary"
                  : tab === "taxes"
                  ? "Taxes & Deductions"
                  : "Overall Insights"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="container mx-auto px-6 py-6">
        {activeTab === "employee" && <EmployeeSummaryTab />}
        {activeTab === "taxes" && <TaxesDeductionsTab />}
        {activeTab === "insights" && <OverallInsightsTab />}
      </div>

      {/* APPROVAL DIALOG */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Payroll</DialogTitle>
          </DialogHeader>
          <DialogDescription className="py-4">
            You are about to approve this {type === "offcycle" ? "Off Cycle Payroll" : type === "onetime" ? "One Time Payout" : "Regular Payroll"}. Once you approve it, you can make payments for all your employee(s) on the paydate 19/01/2026.
          </DialogDescription>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowApprovalDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleApprovalSubmit}
            >
              Submit and Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ================= EMPLOYEE SUMMARY TAB ================= */

function EmployeeSummaryTab() {
  return (
    <div className="bg-white border rounded-lg">
      {/* TOOLBAR */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select className="border rounded px-3 py-1.5 text-sm">
            <option>All Employees</option>
          </select>
          <input
            type="text"
            placeholder="Search Employee"
            className="border rounded px-3 py-1.5 text-sm w-64"
          />
        </div>

        {/* SHADCN BUTTON GROUP */}
        <div className="flex items-center border rounded-md overflow-hidden">
          {/* Add Employee */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-none">
                Add Employee <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Add Existing Employee</DropdownMenuItem>
              <DropdownMenuItem>Add New Employee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter */}
          <Button variant="outline" size="sm" className="rounded-none border-l-0">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>

          {/* Import / Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-l-0"
              >
                <Upload className="h-4 w-4 mr-1" />
                Import / Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Import Employees</DropdownMenuItem>
              <DropdownMenuItem>Export Payroll</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">EMPLOYEE NAME</th>
              <th className="px-4 py-3 text-left">GROSS PAY</th>
              <th className="px-4 py-3 text-left">DEDUCTIONS</th>
              <th className="px-4 py-3 text-left">TAXES</th>
              <th className="px-4 py-3 text-left">BENEFITS</th>
              <th className="px-4 py-3 text-left">REIMBURSEMENTS</th>
              <th className="px-4 py-3 text-left">NET PAY</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-4">
                Mohamed Faizul M
                <div className="text-xs text-gray-500">(EMP-0012416)</div>
              </td>
              <td className="px-4 py-4">₹2,000.00</td>
              <td className="px-4 py-4">₹0.00</td>
              <td className="px-4 py-4">₹0.00</td>
              <td className="px-4 py-4">₹0.00</td>
              <td className="px-4 py-4">₹0.00</td>
              <td className="px-4 py-4 font-medium">₹2,000.00</td>
              <td className="px-4 py-4">⊖</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------- TAXES & DEDUCTIONS TAB ---------- */
function TaxesDeductionsTab() {
  return (
    <div className="space-y-6">
      {/* TAX DETAILS */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Tax Details</h3>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3 font-medium">TAX NAME</th>
              <th className="text-right py-3 font-medium">PAID BY EMPLOYER</th>
              <th className="text-right py-3 font-medium">PAID BY EMPLOYEE</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">Income Tax</td>
              <td className="text-right py-3">₹0.00</td>
              <td className="text-right py-3">₹0.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-3">TN Professional Tax (Head Office)</td>
              <td className="text-right py-3">₹0.00</td>
              <td className="text-right py-3">₹0.00</td>
            </tr>
            <tr className="font-medium">
              <td className="py-3">Total</td>
              <td className="text-right py-3">₹0.00</td>
              <td className="text-right py-3">₹0.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BENEFITS */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Benefits</h3>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3 font-medium">BENEFIT NAME</th>
              <th className="text-right py-3 font-medium">EMPLOYER'S CONTRIBUTION</th>
              <th className="text-right py-3 font-medium">EMPLOYEES' CONTRIBUTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="text-center py-8 text-gray-500">
                There are no deductions present in this payrun.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DONATIONS */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Donations</h3>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3 font-medium">DEDUCTION NAME</th>
              <th className="text-right py-3 font-medium">EMPLOYEES' CONTRIBUTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="text-center py-8 text-gray-500">
                There are no donations present in this payrun.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------- OVERALL INSIGHTS TAB ---------- */
function OverallInsightsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Insights for December 2025 Payrun</h2>

      {/* EMPLOYEE BREAKDOWN */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-6">Employee Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="text-sm text-gray-500">Active Employees</div>
            <div className="text-2xl font-semibold">1</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Paid Employees</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Skipped Employees</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">New Joiners Skipped</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Salary Withheld Employees</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">New Joiner's Arrear Released</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Salary Released Employees</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Lop Reversed Employees</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
        </div>
      </div>

      {/* STATUTORY & PAYMENT MODE */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* STATUTORY SUMMARY */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Statutory Summary</h3>
          <div className="text-center py-8 text-gray-500">No data to display</div>
        </div>

        {/* PAYMENT MODE SUMMARY */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Payment Mode Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span>Direct Deposit Payment Mode</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Bank Transfer Payment Mode</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Cheque Payment Mode</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Cash Payment Mode</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* COMPONENT WISE BREAKDOWN */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Component Wise Breakdown</h3>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3 font-medium">COMPONENTS</th>
              <th className="text-right py-3 font-medium">EMPLOYEES INVOLVED</th>
              <th className="text-right py-3 font-medium">TOTAL AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">
                <button className="text-blue-600">▼ One Time Earning</button>
              </td>
              <td className="text-right py-3"></td>
              <td className="text-right py-3 font-medium">₹2,000.00</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="py-3 pl-8">Bonus</td>
              <td className="text-right py-3">1</td>
              <td className="text-right py-3">₹2,000.00</td>
            </tr>
            <tr className="font-medium">
              <td className="py-3">Total Earnings</td>
              <td className="text-right py-3"></td>
              <td className="text-right py-3">₹2,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}