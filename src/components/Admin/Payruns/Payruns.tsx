"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, ChevronDownIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type PayrollType = "all" | "regular" | "onetime" | "offcycle"

import { useApp } from "@/context/AppContext"

export default function RunPayrollPage() {
  const router = useRouter()
  const { payruns } = useApp()
  const [activeFilter, setActiveFilter] = useState<PayrollType>("all")

  const filteredData = payruns.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.type === activeFilter
    const isPending = item.status !== "paid"
    return matchesFilter && isPending
  })
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">Pay Runs</h1>

        {/* Button Group Dropdown */}
        <ButtonGroup>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Pay Run
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white !pl-2"
                aria-label="More options"
              >
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="[--radius:1rem] w-48">
              <DropdownMenuItem
                onClick={() => router.push("/admin/payrun/regular")}
              >
                Regular Payrun
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push("/admin/payrun/onetime")}
              >
                One Time Payout
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push("/admin/payrun/offcycle")}
              >
                Off Cycle Payrun
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6">
        <div className="flex gap-2 py-3">
          <button className="rounded-full px-4 py-2 text-sm font-medium bg-blue-600 text-white">
            Run Payroll
          </button>

          <button
            onClick={() => router.push("/admin/payrun/history")}
            className="rounded-full px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700"
          >
            Payroll History
          </button>
        </div>
      </div>

      {/* FILTER PILLS (NOW WORKING) */}
      <div className="container mx-auto px-6 py-4 flex gap-3 flex-wrap">
        <Button
          variant="outline"
          onClick={() => setActiveFilter("all")}
          className={`rounded-full ${activeFilter === "all"
            ? "border-blue-600 text-blue-600 bg-blue-50"
            : ""
            }`}
        >
          All Pending
          <Badge className="ml-2 bg-blue-600 text-white rounded-full h-5 w-5 p-0 flex items-center justify-center">
            {filteredData.length}
          </Badge>
        </Button>

        <Button
          variant="outline"
          onClick={() => setActiveFilter("regular")}
          className={`rounded-full ${activeFilter === "regular"
            ? "border-blue-600 text-blue-600 bg-blue-50"
            : ""
            }`}
        >
          Regular Payroll
        </Button>

        <Button
          variant="outline"
          onClick={() => setActiveFilter("onetime")}
          className={`rounded-full ${activeFilter === "onetime"
            ? "border-blue-600 text-blue-600 bg-blue-50"
            : ""
            }`}
        >
          One Time Payout
        </Button>

        <Button
          variant="outline"
          onClick={() => setActiveFilter("offcycle")}
          className={`rounded-full ${activeFilter === "offcycle"
            ? "border-blue-600 text-blue-600 bg-blue-50"
            : ""
            }`}
        >
          Off Cycle Payroll
        </Button>
      </div>

      {/* Table */}
      <div className="container mx-auto px-6">
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Pay Period</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Payment Date</th>
                <th className="px-4 py-3 text-left">Employees</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="px-4 py-4">{row.month} {row.year}</td>
                  <td className="px-4 py-4">
                    <Badge variant="outline" className="capitalize">
                      {row.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">{row.paymentDate || "N/A"}</td>
                  <td className="px-4 py-4">{row.employeeCount}</td>
                  <td className="px-4 py-4">
                    <Badge className={
                      row.status === 'paid'
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }>
                      {row.status === 'paid' ? 'Paid' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => router.push(`/admin/payrun/${row.status === 'paid' ? 'view' : 'record'}?id=${row.id}&type=${row.type}`)}
                    >
                      {row.status === 'paid' ? 'View Details' : 'Continue'}
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No payroll records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Info */}

      </div>
    </div>
  )
}
