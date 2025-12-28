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

  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  // Get the actual payrun data or null
  const payrun = payruns.find(p => p.id === id)

  // Handle case where payrun is not found
  if (!payrun) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Payrun not found</h2>
          <p className="text-gray-600 mb-4">The requested payrun could not be found.</p>
          <Button onClick={() => router.push("/admin/payrun")}>
            Back to Payruns
          </Button>
        </div>
      </div>
    )
  }

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
            <p className="text-2xl font-semibold">₹{payrun.totalAmount?.toLocaleString() || 0}</p>
            <p className="text-xs text-gray-500">PAYROLL COST</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">₹{payrun.totalAmount?.toLocaleString() || 0}</p>
            <p className="text-xs text-gray-500">TOTAL NET PAY</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">PAY DAY</p>
            <p className="text-2xl font-semibold">{payrun.paymentDate?.split(' ')[0] || "N/A"}</p>
            <p className="text-xs text-gray-500">{payrun.month?.slice(0, 3).toUpperCase()}, {payrun.year}</p>
            <p className="text-xs text-gray-500 mt-1">{payrun.employeeCount || 0} Employees</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <EmployeeSummaryTab 
          payrunId={id} 
          employeeIds={payrun.employeeIds || []} 
          totalAmount={payrun.totalAmount || 0} 
          employeeCount={payrun.employeeCount || 0} 
        />
      </div>
    </div>
  )
}

/* ================= EMPLOYEE SUMMARY TAB ================= */

function EmployeeSummaryTab({ 
  payrunId, 
  employeeIds, 
  totalAmount, 
  employeeCount 
}: { 
  payrunId: string | null
  employeeIds: string[]
  totalAmount: number
  employeeCount: number 
}) {
  const { employees, updatePayRun } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("All Departments")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const payrunEmployees = employees.filter(emp => employeeIds.includes(emp.id))

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
    if (!payrunId) return
    
    let newIds = [...employeeIds]
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

        {/* BUTTON GROUP */}
        <div className="flex items-center border rounded-md overflow-hidden">
          {/* Add Employee */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-none border-0">
                Add Employee <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-64 overflow-y-auto">
              {employees.length === 0 ? (
                <div className="px-2 py-4 text-center text-sm text-gray-500">
                  No employees available
                </div>
              ) : (
                employees.map(emp => (
                  <DropdownMenuCheckboxItem
                    key={emp.id}
                    checked={employeeIds.includes(emp.id)}
                    onCheckedChange={() => handleToggleEmployee(emp.id)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {emp.name}
                  </DropdownMenuCheckboxItem>
                ))
              )}
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