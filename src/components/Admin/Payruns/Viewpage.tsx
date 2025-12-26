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
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default function PayrunDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") // regular | onetime | offcycle

  // 🔹 Mock data
  const payrun = {
    period: "December 2025",
    payDay: "15 Dec 2025",
    employees: 1,
    payrollCost: 2000,
    netPay: 2000,
    status: "Draft",
    overdue: true,
  }

  const title =
    type === "onetime"
      ? "One Time Payout"
      : type === "offcycle"
      ? "Off Cycle Payroll"
      : "Regular Payroll"

  // 🔹 EDIT STATE
  const [netPay, setNetPay] = useState(2000)
  const [grossPay, setGrossPay] = useState(2000)
  const [openEdit, setOpenEdit] = useState(false)
  const [tempNet, setTempNet] = useState(netPay)
  const [tempGross, setTempGross] = useState(grossPay)

  const handleSave = () => {
    setNetPay(tempNet)
    setGrossPay(tempGross)
    setOpenEdit(false)
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

        <Button className="bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => router.push("/admin/payrun/submit")}>
          Submit and Approve
        </Button>
      </div>

      {/* OVERDUE WARNING */}
      {payrun.overdue && (
        <div className="container mx-auto px-6">
          <div className="flex gap-2 items-center bg-red-50 text-red-700 p-3 rounded-md">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm">
              This payment is overdue by 11 day(s).
            </p>
          </div>
        </div>
      )}

      {/* SUMMARY */}
      <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard label="Period" value={payrun.period} />
        <SummaryCard label="Payroll Cost" value={`₹${grossPay}`} />
        <SummaryCard label="Net Pay" value={`₹${netPay}`} />
        <SummaryCard label="Pay Day" value={payrun.payDay} />
      </div>

      {/* TAX SUMMARY */}
      {type !== "onetime" && (
        <div className="container mx-auto px-6">
          <div className="bg-white border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Taxes</p>
              <p className="font-medium">₹0.00</p>
            </div>
            <div>
              <p className="text-gray-500">Benefits</p>
              <p className="font-medium">₹0.00</p>
            </div>
            <div>
              <p className="text-gray-500">Donations</p>
              <p className="font-medium">₹0.00</p>
            </div>
          </div>
        </div>
      )}

      {/* EMPLOYEE TABLE */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Employee</th>

                {type !== "onetime" && (
                  <th className="px-4 py-3 text-left">Gross Pay</th>
                )}

                {type !== "onetime" && (
                  <th className="px-4 py-3 text-left">Deductions</th>
                )}

                {type !== "onetime" && (
                  <th className="px-4 py-3 text-left">Taxes</th>
                )}

                <th className="px-4 py-3 text-left">Net Pay</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="px-4 py-4">
                  Mohamed Faizul M <br />
                  <span className="text-xs text-gray-500">EMP-0012416</span>
                </td>

                {type !== "onetime" && (
                  <td className="px-4 py-4">
                    ₹{grossPay}
                    <button
                      onClick={() => setOpenEdit(true)}
                      className="ml-2 text-blue-600 text-xs"
                    >
                      Edit
                    </button>
                  </td>
                )}

                {type !== "onetime" && <td className="px-4 py-4">₹0</td>}
                {type !== "onetime" && <td className="px-4 py-4">₹0</td>}

                <td className="px-4 py-4 font-medium">
                  ₹{netPay}
                  <button
                    onClick={() => setOpenEdit(true)}
                    className="ml-2 text-blue-600 text-xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}
