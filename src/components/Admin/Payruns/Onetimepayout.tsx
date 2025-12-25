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

export default function OneTimePayoutPage() {
  const router = useRouter()

  const [component, setComponent] = useState<string>("")
  const [paymentDate, setPaymentDate] = useState<string>("")
  const [employeeName, setEmployeeName] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  const handleSubmit = () => {
    if (!component || !paymentDate || !employeeName || !amount) return
    // You can store this in state / API later
    router.push("/admin/payrun")
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
          {/* Employee Name */}
          <div className="space-y-2">
            <Label>
              Employee Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-start gap-3 px-6 py-4 border-t">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={!component || !paymentDate || !employeeName || !amount}
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