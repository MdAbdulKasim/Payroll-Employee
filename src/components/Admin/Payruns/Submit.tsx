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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { ArrowLeft, ChevronDown, Filter, Upload, X, ChevronLeft, ChevronRight, Search } from "lucide-react"

import { useApp } from "@/context/AppContext"

export default function PayrunSubmitPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { payruns, updatePayRun } = useApp()
  const id = searchParams.get("id")
  const type = searchParams.get("type")

  const [activeTab, setActiveTab] = useState("employee")
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)

  const payrun = payruns.find(p => p.id === id) || {
    id: "mock",
    month: "December",
    year: 2025,
    employeeCount: 1,
    totalAmount: 2000,
    status: "draft",
    type: "regular",
    paymentDate: "15 Dec 2025",
    employeeIds: []
  }

  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const title =
    type === "onetime"
      ? "One Time Payout"
      : type === "offcycle"
        ? "Off Cycle Payroll"
        : "Regular Payroll"

  const handleProcessFinish = () => {
    router.push("/admin/payrun")
  }

  const handleReject = () => {
    if (id) {
      updatePayRun(id, { status: 'draft' })
    }
    setShowRejectDialog(false)
    router.push("/admin/payrun")
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
          <Badge variant="secondary" className={
            payrun.status === 'paid'
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }>
            {payrun.status === 'draft' ? 'Draft' : payrun.status === 'paid' ? 'Paid' : payrun.status}
          </Badge>
        </div>

        <div className="flex gap-3">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              router.push(`/admin/payrun/record?id=${id}&type=${type}`)
            }}
            disabled={payrun.status === 'paid'}
          >
            Record Payment
          </Button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="container mx-auto px-6 py-4">
        <div className="bg-gray-100 rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Period: {payrun.month} {payrun.year}</p>
            <p className="text-2xl font-semibold">₹{payrun.totalAmount?.toLocaleString()}</p>
            <p className="text-xs text-gray-500">PAYROLL COST</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">₹{payrun.totalAmount?.toLocaleString()}</p>
            <p className="text-xs text-gray-500">TOTAL NET PAY</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">PAY DAY</p>
            <p className="text-2xl font-semibold">{payrun.paymentDate?.split(' ')[0] || "N/A"}</p>
            <p className="text-xs text-gray-500">{payrun.month?.slice(0, 3).toUpperCase()}, {payrun.year}</p>
            <p className="text-xs text-gray-500 mt-1">{payrun.employeeCount} Employees</p>
          </div>
          {/* <div>
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
          </div> */}
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <EmployeeSummaryTab payrunId={id!} employeeIds={payrun.employeeIds} totalAmount={payrun.totalAmount || 0} employeeCount={payrun.employeeCount || 0} />
      </div>

    </div>
  )
}

/* ================= EMPLOYEE SUMMARY TAB ================= */

function EmployeeSummaryTab({ payrunId, employeeIds, totalAmount, employeeCount }: { payrunId: string, employeeIds?: string[], totalAmount: number, employeeCount: number }) {
  const { employees, updatePayRun } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("All Departments")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const payrunEmployees = employees.filter(emp => employeeIds?.includes(emp.id))

  // Get unique departments for the filter
  const departments = ["All Departments", ...Array.from(new Set(payrunEmployees.map(emp => emp.department).filter(Boolean) as string[]))]

  // Filter employees based on search and department
  const filteredEmployees = payrunEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === "All Departments" || emp.department === selectedDept
    return matchesSearch && matchesDept
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  const amountPerEmployee = employeeCount > 0 ? totalAmount / employeeCount : 0

  const handleToggleEmployee = (id: string) => {
    let newIds = employeeIds ? [...employeeIds] : []
    if (newIds.includes(id)) {
      newIds = newIds.filter(eid => eid !== id)
    } else {
      newIds.push(id)
    }
    updatePayRun(payrunId, {
      employeeIds: newIds,
      employeeCount: newIds.length
    })
  }

  return (
    <div className="bg-white border rounded-lg">
      {/* TOOLBAR */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select
            className="border rounded px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value)
              setCurrentPage(1)
            }}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Employee"
              className="border rounded pl-9 pr-3 py-1.5 text-sm w-64 outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        {/* SHADCN BUTTON GROUP */}
        <div className="flex items-center border rounded-md overflow-hidden">
          {/* Add Employee */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-none border-0">
                Add Employee <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-64 overflow-y-auto">
              {employees.map(emp => (
                <DropdownMenuCheckboxItem
                  key={emp.id}
                  checked={employeeIds?.includes(emp.id)}
                  onCheckedChange={() => handleToggleEmployee(emp.id)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {emp.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter */}
          <Button variant="outline" size="sm" className="rounded-none border-l h-9">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>

          {/* Export */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-none border-l h-9"
          >
            <Upload className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">EMPLOYEE NAME</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">EMPLOYEE ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">DEPARTMENT</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">NET PAY</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map(emp => (
              <tr key={emp.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-900">{emp.name}</td>
                <td className="px-4 py-4 text-gray-600">{emp.id}</td>
                <td className="px-4 py-4 text-gray-600">{emp.department || "N/A"}</td>
                <td className="px-4 py-4 font-semibold text-blue-600">₹{amountPerEmployee.toLocaleString()}</td>
                <td className="px-4 py-4 text-gray-400">
                  <button
                    className="hover:text-red-500 transition-colors"
                    onClick={() => handleToggleEmployee(emp.id)}
                    title="Remove from payrun"
                  >
                    ⊖
                  </button>
                </td>
              </tr>
            ))}
            {paginatedEmployees.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg">No employees found</span>
                    <span className="text-xs">Try adjusting your search or filters</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between bg-gray-50">
          <p className="text-xs text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 p-0 ${currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
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
// function OverallInsightsTab() {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-lg font-semibold">Insights for December 2025 Payrun</h2>

//       {/* EMPLOYEE BREAKDOWN */}
//       <div className="bg-white border rounded-lg p-6">
//         <h3 className="font-semibold mb-6">Employee Breakdown</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
//           <div className="text-center">
//             <div className="text-3xl mb-2">👤</div>
//             <div className="text-sm text-gray-500">Active Employees</div>
//             <div className="text-2xl font-semibold">1</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-500">Paid Employees</div>
//             <div className="text-2xl font-semibold">0</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-500">Skipped Employees</div>
//             <div className="text-2xl font-semibold">0</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-500">New Joiners Skipped</div>
//             <div className="text-2xl font-semibold">0</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-500">Salary Withheld Employees</div>
//             <div className="text-2xl font-semibold">0</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-500">New Joiner's Arrear Released</div>
//             <div className="text-2xl font-semibold">0</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-500">Salary Released Employees</div>
//             <div className="text-2xl font-semibold">0</div>
//           </div>
//           <div className="text-center">
//             <div className="text-sm text-gray-500">Lop Reversed Employees</div>
//             <div className="text-2xl font-semibold">0</div>
//           </div>
//         </div>
//       </div>

//       {/* STATUTORY & PAYMENT MODE */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* STATUTORY SUMMARY */}
//         <div className="bg-white border rounded-lg p-6">
//           <h3 className="font-semibold mb-4">Statutory Summary</h3>
//           <div className="text-center py-8 text-gray-500">No data to display</div>
//         </div>

//         {/* PAYMENT MODE SUMMARY */}
//         <div className="bg-white border rounded-lg p-6">
//           <h3 className="font-semibold mb-4">Payment Mode Summary</h3>
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between py-2 border-b">
//               <span>Direct Deposit Payment Mode</span>
//               <span className="font-medium">0</span>
//             </div>
//             <div className="flex justify-between py-2 border-b">
//               <span>Bank Transfer Payment Mode</span>
//               <span className="font-medium">0</span>
//             </div>
//             <div className="flex justify-between py-2 border-b">
//               <span>Cheque Payment Mode</span>
//               <span className="font-medium">1</span>
//             </div>
//             <div className="flex justify-between py-2">
//               <span>Cash Payment Mode</span>
//               <span className="font-medium">0</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* COMPONENT WISE BREAKDOWN */}
//       <div className="bg-white border rounded-lg p-6">
//         <h3 className="font-semibold mb-4">Component Wise Breakdown</h3>
//         <table className="w-full text-sm">
//           <thead className="border-b">
//             <tr>
//               <th className="text-left py-3 font-medium">COMPONENTS</th>
//               <th className="text-right py-3 font-medium">EMPLOYEES INVOLVED</th>
//               <th className="text-right py-3 font-medium">TOTAL AMOUNT</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-3">
//                 <button className="text-blue-600">▼ One Time Earning</button>
//               </td>
//               <td className="text-right py-3"></td>
//               <td className="text-right py-3 font-medium">₹2,000.00</td>
//             </tr>
//             <tr className="border-b bg-gray-50">
//               <td className="py-3 pl-8">Bonus</td>
//               <td className="text-right py-3">1</td>
//               <td className="text-right py-3">₹2,000.00</td>
//             </tr>
//             <tr className="font-medium">
//               <td className="py-3">Total Earnings</td>
//               <td className="text-right py-3"></td>
//               <td className="text-right py-3">₹2,000.00</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }