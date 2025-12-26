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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ChevronDown, Filter, Upload, X, Calendar, AlertCircle, Info } from "lucide-react"

export default function RecordPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")

  const [activeTab, setActiveTab] = useState("employee")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentDate, setPaymentDate] = useState("14/01/2026")
  const [sendPayslipNotification, setSendPayslipNotification] = useState(true)

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

  const handleConfirmPayment = () => {
    // Close dialog and navigate
    setShowPaymentDialog(false)
    router.push("/payroll") // Navigate to payroll page after confirming
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
          onClick={() => setShowPaymentDialog(true)}
        >
          Record Payment
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

      {/* RECORD PAYMENT DIALOG */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Record Payment</DialogTitle>
            <DialogDescription className="text-gray-600 pt-2">
              Based on your preferences, payments will be recorded and payslip notifications will be sent accordingly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Payment Date */}
            <div className="space-y-2">
              <Label htmlFor="payment-date" className="text-sm font-medium flex items-center gap-2">
                Payment Date
                <Info className="h-4 w-4 text-gray-400" />
              </Label>
              <div className="relative">
                <Input
                  id="payment-date"
                  type="text"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Payment Mode Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Payment Mode</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Employees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">Cheque</td>
                    <td className="px-4 py-3">1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Send Payslip Notification */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="payslip-notification"
                  checked={sendPayslipNotification}
                  onCheckedChange={(checked) => setSendPayslipNotification(checked === true)}
                  className="mt-1"
                />
                <div className="space-y-2 flex-1">
                  <Label 
                    htmlFor="payslip-notification" 
                    className="text-sm font-medium cursor-pointer flex items-center gap-2"
                  >
                    Send payslip notification to all employees
                    <Info className="h-4 w-4 text-gray-400" />
                  </Label>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    The email sent to employees will contain a link that redirects them to the portal to view the payslips. 
                    For those without portal access, payslips will be available for download directly from the email.
                  </p>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">
                  Regardless of whether you choose to send payslip notification email or not, 
                  the payslip will be displayed in the Portal once you record the payment.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleConfirmPayment}
            >
              Confirm
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
                 Export
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