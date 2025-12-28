"use client"

import React, { useState, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { X, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/* ---------------- TYPES ---------------- */

interface FormData {
  loanName: string
  employeeName: string
  loanAmount: string
  disbursementDate: Date | null
  reason: string
  exemptFromPerquisite: boolean
}

/* ---------------- PAGE ---------------- */

export default function EditLoan() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    loanName: "",
    employeeName: "",
    loanAmount: "",
    disbursementDate: null,
    reason: "",
    exemptFromPerquisite: false,
  })

  /* -------- HELPERS -------- */

  const formatDate = (date: Date | null) => {
    if (!date) return "dd/MM/yyyy"
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`
  }

  /* -------- SAVE -------- */

  const handleUpdate = () => {
    console.log("Updated Loan:", formData)
    alert("Loan updated successfully")
    router.push("/admin/loans")
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-[800px] bg-white rounded-lg border shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-semibold">Edit Loan</h2>
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">

          {/* Loan Name */}
          <div>
            <label className="text-sm font-medium">
              Loan Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.loanName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, loanName: e.target.value })
              }
            />
          </div>

          {/* Employee Name */}
          <div>
            <label className="text-sm font-medium">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.employeeName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, employeeName: e.target.value })
              }
            />
          </div>

          {/* Loan Amount */}
          <div>
            <label className="text-sm font-medium">
              Loan Amount <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.loanAmount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, loanAmount: e.target.value })
              }
            />
          </div>

          {/* Disbursement Date */}
          <div>
            <label className="text-sm font-medium">
              Disbursement Date <span className="text-red-500">*</span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    !formData.disbursementDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(formData.disbursementDate)}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0">
                <CalendarComponent
                  mode="single"
                  /* ✅ FIX: null → undefined */
                  selected={formData.disbursementDate ?? undefined}
                  onSelect={(date) =>
                    setFormData({
                      ...formData,
                      disbursementDate: date ?? null,
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm font-medium">
              Reason <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>

          {/* Exemption */}
          <div className="flex gap-2 items-start bg-blue-50 p-4 rounded-md">
            <Checkbox
              checked={formData.exemptFromPerquisite}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  exemptFromPerquisite: checked === true,
                })
              }
            />
            <span className="text-sm">
              Exempt this loan from perquisite calculation
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 border-t bg-gray-50">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Update Loan
          </Button>
        </div>
      </div>
    </div>
  )
}