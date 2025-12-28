"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useApp } from "@/context/AppContext"

export default function OneTimePayoutPage() {
  const router = useRouter()
  const { addPayRun, employees } = useApp()

  const [component, setComponent] = useState<string>("")
  const [paymentDate, setPaymentDate] = useState<string>("")
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [remarks, setRemarks] = useState<string>("")
  const [isTaxable, setIsTaxable] = useState<boolean>(true)

  const handleSubmit = async () => {
    if (!component || !paymentDate || !selectedEmployeeId || !amount) return

    const now = new Date()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const employee = employees.find(e => e.id === selectedEmployeeId)

    const newPayRun: any = {
      id: '', // Will be assigned by backend
      month: monthNames[now.getMonth()],
      year: now.getFullYear(),
      status: 'draft' as const,
      type: 'onetime' as const,
      totalAmount: parseFloat(amount),
      employeeCount: 1,
      createdAt: now.toISOString(),
      paymentDate: paymentDate,
      description: `${component.charAt(0).toUpperCase() + component.slice(1)} for ${employee?.name || "Employee"}`,
      remarks: remarks,
      isTaxable: isTaxable,
      reasonType: component.charAt(0).toUpperCase() + component.slice(1) as any,
      employeeIds: [selectedEmployeeId]
    }

    // TODO: Replace with actual API call
    // const response = await fetch('/api/payruns/onetime', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newPayRun)
    // });
    // const data = await response.json();
    // router.push(`/admin/payrun/record?id=${data.id}&type=onetime`)

    addPayRun(newPayRun)
    router.push(`/admin/payrun/record?id=${newPayRun.id}&type=onetime`)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {/* Modal */}
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Create One Time Payrun</h2>
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          <div className="space-y-2">
            <Label>
              Employee Name <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setSelectedEmployeeId} value={selectedEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>
              Amount <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Select Component */}
          <div className="space-y-2">
            <Label>
              Select One Time Component <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setComponent}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="incentive">Incentive</SelectItem>
                <SelectItem value="arrears">Arrears</SelectItem>
                <SelectItem value="reimbursement">Reimbursement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label>
              When would you like to pay?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input
              type="text"
              placeholder="Add any remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          {/* Taxable Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isTaxable"
              checked={isTaxable}
              onChange={(e) => setIsTaxable(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <Label htmlFor="isTaxable" className="cursor-pointer">
              Is this payout taxable?
            </Label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-start gap-3 px-6 py-4 border-t">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={!component || !paymentDate || !selectedEmployeeId || !amount}
          >
            Save and Continue
          </Button>

          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}