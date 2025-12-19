"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OffCyclePayrunPage() {
  const router = useRouter()
  const [paymentDate, setPaymentDate] = useState("")

  const handleSubmit = () => {
    if (!paymentDate) return
    // future API / state logic goes here
    router.push("/admin/payrun")
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
            disabled={!paymentDate}
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
