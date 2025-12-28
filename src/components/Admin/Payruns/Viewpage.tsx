"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, AlertTriangle, ChevronDown, Filter, Upload, Search, ChevronLeft, ChevronRight } from "lucide-react"

import { useApp } from "@/context/AppContext"

export default function PayrunDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { payruns } = useApp()
  const id = searchParams.get("id")
  const type = searchParams.get("type") // regular | onetime | offcycle

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

  // EDIT STATE
  const [netPay, setNetPay] = useState(payrun.totalAmount || 0)
  const [grossPay, setGrossPay] = useState(payrun.totalAmount || 0)
  const [openEdit, setOpenEdit] = useState(false)
  const [tempNet, setTempNet] = useState(netPay)
  const [tempGross, setTempGross] = useState(grossPay)

  const handleSave = () => {
    setNetPay(tempNet)
    setGrossPay(tempGross)
    setOpenEdit(false)
    // TODO: Update payrun with new amounts via updatePayRun
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

        {payrun.status !== 'paid' && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push(`/admin/payrun/submit?id=${id}&type=${type}`)}>
            Submit and Approve
          </Button>
        )}
      </div>

      {/* OVERDUE WARNING */}
      {/* Uncomment when overdue property is added to PayRun type
      {payrun.overdue && (
        <div className="container mx-auto px-6">
          <div className="flex gap-2 items-center bg-red-50 text-red-700 p-3 rounded-md">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm">
              This payment is overdue.
            </p>
          </div>
        </div>
      )}
      */}

      {/* SUMMARY */}
      <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard label="Period" value={`${payrun.month} ${payrun.year}`} />
        <SummaryCard label="Payroll Cost" value={`₹${payrun.totalAmount?.toLocaleString() || 0}`} />
        <SummaryCard label="Net Pay" value={`₹${payrun.totalAmount?.toLocaleString() || 0}`} />
        <SummaryCard label="Pay Day" value={payrun.paymentDate || "N/A"} />
      </div>

      <div className="container mx-auto px-6 py-6">
        <EmployeeSummaryTab 
          payrunId={id} 
          employeeIds={payrun.employeeIds || []} 
          totalAmount={payrun.totalAmount || 0} 
          employeeCount={payrun.employeeCount || 0} 
          readOnly={payrun.status === 'paid'} 
        />
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pay Amount</DialogTitle>
          </DialogHeader>

          {type !== "onetime" && (
            <div className="space-y-2">
              <label className="text-sm">Gross Pay</label>
              <Input
                type="number"
                value={tempGross}
                onChange={(e) => setTempGross(Number(e.target.value))}
              />
            </div>
          )}

          <div className="space-y-2 mt-3">
            <label className="text-sm">Net Pay</label>
            <Input
              type="number"
              value={tempNet}
              onChange={(e) => setTempNet(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ------------------ COMPONENT ------------------ */

function EmployeeSummaryTab({ 
  payrunId, 
  employeeIds, 
  totalAmount, 
  employeeCount, 
  readOnly 
}: { 
  payrunId: string | null
  employeeIds: string[]
  totalAmount: number
  employeeCount: number
  readOnly?: boolean 
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
    if (readOnly || !payrunId) return
    
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
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select
            className="border rounded px-3 py-1.5 text-sm font-medium outline-none focus:ring-1 focus:ring-blue-500"
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

        <div className="flex items-center border rounded-md overflow-hidden">
          {!readOnly && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-none border-none">
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
          )}

          <Button variant="outline" size="sm" className={`rounded-none border-y-none border-r-none h-9 ${!readOnly ? 'border-l' : ''}`}>
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>

          <Button variant="outline" size="sm" className="rounded-none border-l border-y-none border-r-none h-9">
            <Upload className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">EMPLOYEE NAME</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">EMPLOYEE ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">DEPARTMENT</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">NET PAY</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map(emp => (
              <tr key={emp.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-900">{emp.name}</td>
                <td className="px-4 py-4 text-gray-600">{emp.id}</td>
                <td className="px-4 py-4 text-gray-600">{emp.department || "N/A"}</td>
                <td className="px-4 py-4 font-semibold text-blue-600">₹{amountPerEmployee.toLocaleString()}</td>
              </tr>
            ))}
            {paginatedEmployees.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
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

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}