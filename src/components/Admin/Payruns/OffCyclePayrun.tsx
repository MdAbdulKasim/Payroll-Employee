"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useApp, PayRun } from "@/context/AppContext"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function OffCyclePayrunPage() {
  const router = useRouter()
  const { addPayRun, employees } = useApp()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [reason, setReason] = useState<string>("")
  const [remarks, setRemarks] = useState<string>("")
  const [revisedAmount, setRevisedAmount] = useState<string>("")
  const [previousAmount, setPreviousAmount] = useState<string>("")

  const handleSubmit = async () => {
    if (!selectedEmployeeId || !reason || (!amount && !revisedAmount) || !paymentDate) return

    const now = new Date()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const employee = employees.find(e => e.id === selectedEmployeeId)
    const finalAmount = parseFloat(revisedAmount) - parseFloat(previousAmount)

    const newPayRun: PayRun = {
      id: '', // Will be assigned by backend
      month: monthNames[now.getMonth()],
      year: now.getFullYear(),
      status: 'draft',
      type: 'offcycle',
      totalAmount: isNaN(finalAmount) ? parseFloat(amount) : finalAmount,
      employeeCount: 1,
      createdAt: now.toISOString(),
      paymentDate: paymentDate,
      description: `Off-cycle (${reason}) for ${employee?.name || "Employee"}`,
      remarks: remarks,
      reasonType: reason as any,
      employeeIds: [selectedEmployeeId]
    }

    // TODO: Replace with actual API call
    // const response = await fetch('/api/payruns/offcycle', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newPayRun)
    // });
    // const data = await response.json();
    // router.push(`/admin/payrun/record?id=${data.id}&type=offcycle`)

    addPayRun(newPayRun)
    router.push(`/admin/payrun/record?id=${newPayRun.id}&type=offcycle`)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Initiate Off Cycle Pay Run
          </h2>

          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
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

          {/* Reason Selector */}
          <div className="space-y-2">
            <Label>
              Reason <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arrears">Arrears</SelectItem>
                <SelectItem value="Correction">Correction</SelectItem>
                <SelectItem value="F&F">Full & Final settlement</SelectItem>
                <SelectItem value="Missed Salary">Missed Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount / Calculations */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Previously Paid</Label>
              <Input
                type="number"
                placeholder="0"
                value={previousAmount}
                onChange={(e) => setPreviousAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Revised Amount</Label>
              <Input
                type="number"
                placeholder="0"
                value={revisedAmount}
                onChange={(e) => setRevisedAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center text-sm">
            <span className="text-blue-700 font-medium">Difference to Pay:</span>
            <span className="text-blue-900 font-bold">
              ₹ {(parseFloat(revisedAmount || "0") - parseFloat(previousAmount || "0")).toLocaleString()}
            </span>
          </div>

          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input
              type="text"
              placeholder="Add any additional info"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          {/* Payment Date */}
          <div className="space-y-2">
            <Label>
              When would you like to pay?{" "}
              <span className="text-red-500">*</span>
            </Label>

            <Input
              type="date"
              placeholder="dd/MM/yyyy"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={!selectedEmployeeId || !reason || (!revisedAmount && !amount) || !paymentDate}
          >
            Create Draft
          </Button>

          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}