"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Calendar, AlertCircle, Info, ChevronDown, Filter, Upload, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useApp } from "@/context/AppContext"

export default function RecordPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { payruns, employees, updatePayRun } = useApp()
  const id = searchParams.get("id")
  const type = searchParams.get("type")

  const [activeTab, setActiveTab] = useState("employee")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentDate, setPaymentDate] = useState("14/01/2026")
  const [sendPayslipNotification, setSendPayslipNotification] = useState(true)
  const [payrun, setPayrun] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPayrunDetails()
  }, [id])

  const fetchPayrunDetails = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/payruns/${id}`);
      // const data = await response.json();
      // setPayrun(data);
      
      // Temporary: Use context data
      const foundPayrun = payruns.find(p => p.id === id)
      setPayrun(foundPayrun)
    } catch (error) {
      console.error('Error fetching payrun details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const title =
    type === "onetime"
      ? "One Time Payout"
      : type === "offcycle"
        ? "Off Cycle Payroll"
        : "Regular Payroll"

  const handleConfirmPayment = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/payruns/${id}/record-payment`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     paymentDate,
      //     sendPayslipNotification
      //   })
      // });
      // const data = await response.json();
      
      if (id) {
        updatePayRun(id, { status: 'paid' })
      }
      setShowPaymentDialog(false)
      router.push("/admin/payrun")
    } catch (error) {
      console.error('Error recording payment:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading payrun details...</p>
      </div>
    )
  }

  if (!payrun) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Payrun not found</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
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
            <p className="text-2xl font-semibold">{payrun.paymentDate?.split(' ')[0]}</p>
            <p className="text-xs text-gray-500">{payrun.month?.toUpperCase()}, {payrun.year}</p>
            <p className="text-xs text-gray-500 mt-1">{payrun.employeeCount} Employees</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <EmployeeSummaryTab 
          payrunId={id!} 
          employeeIds={payrun.employeeIds} 
          totalAmount={payrun.totalAmount || 0} 
          employeeCount={payrun.employeeCount || 0} 
        />
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
                    <td className="px-4 py-3">{payrun.employeeCount}</td>
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
                  </p>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">
                  Regardless of whether you choose to send notification email or not,
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

function EmployeeSummaryTab({ payrunId, employeeIds, totalAmount, employeeCount }: { payrunId: string, employeeIds?: string[], totalAmount: number, employeeCount: number }) {
  const { employees, updatePayRun } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("All Departments")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const payrunEmployees = employees.filter(emp => employeeIds?.includes(emp.id))

  const departments = ["All Departments", ...Array.from(new Set(payrunEmployees.map(emp => emp.department).filter(Boolean) as string[]))]

  const filteredEmployees = payrunEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = selectedDept === "All Departments" || emp.department === selectedDept
    return matchesSearch && matchesDept
  })

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
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select
            className="border rounded px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500 font-medium"
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-none border-none">
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

          <Button variant="outline" size="sm" className="rounded-none border-l border-y-none border-r-none h-9">
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