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

export default function RunPayrollPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<PayrollType>("all")

  // ✅ Mock table data (replace with API later)
  const payrollData = [
    {
      id: 1,
      period: "May 2025",
      date: "30/06/2025",
      employees: 0,
      status: "Yet to Process",
      type: "regular",
    },
    {
      id: 2,
      period: "Bonus – May 2025",
      date: "15/06/2025",
      employees: 12,
      status: "Yet to Process",
      type: "onetime",
    },
    {
      id: 3,
      period: "Off Cycle – June 2025",
      date: "10/06/2025",
      employees: 3,
      status: "Yet to Process",
      type: "offcycle",
    },
  ]

  const filteredData =
    activeFilter === "all"
      ? payrollData
      : payrollData.filter((item) => item.type === activeFilter)

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
          className={`rounded-full ${
            activeFilter === "all"
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
          className={`rounded-full ${
            activeFilter === "regular"
              ? "border-blue-600 text-blue-600 bg-blue-50"
              : ""
          }`}
        >
          Regular Payroll
        </Button>

        <Button
          variant="outline"
          onClick={() => setActiveFilter("onetime")}
          className={`rounded-full ${
            activeFilter === "onetime"
              ? "border-blue-600 text-blue-600 bg-blue-50"
              : ""
          }`}
        >
          One Time Payout
        </Button>

        <Button
          variant="outline"
          onClick={() => setActiveFilter("offcycle")}
          className={`rounded-full ${
            activeFilter === "offcycle"
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
                <th className="px-4 py-3 text-left">Payment Date</th>
                <th className="px-4 py-3 text-left">Employees</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="px-4 py-4">{row.period}</td>
                  <td className="px-4 py-4">{row.date}</td>
                  <td className="px-4 py-4">{row.employees}</td>
                  <td className="px-4 py-4">
                    <Badge className="bg-yellow-100 text-yellow-700">
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => router.push("/admin/payrun/submit")}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
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
        <div className="mt-4 flex gap-2 bg-blue-50 p-3 rounded-md">
          <InfoIcon className="h-4 w-4 text-blue-600 mt-0.5" />
          <p className="text-sm">
            There are no{" "}
            <span className="text-blue-600 font-medium">employees</span>{" "}
            with completed profiles.
          </p>
        </div>
      </div>
    </div>
  )
}
