"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Briefcase, Gift } from "lucide-react"

export default function SalaryTabs() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      label: "Salary Structure",
      shortLabel: "Salary",
      icon: FileText,
      path: "/employee/salary",
    },
    {
      label: "Payslips",
      shortLabel: "Payslips",
      icon: FileText,
      path: "/employee/salary/payslip",
    },
    {
      label: "Annual Earnings",
      shortLabel: "Annual",
      icon: Briefcase,
      path: "/employee/salary/annual",
    },
    {
      label: "EPF Contribution",
      shortLabel: "EPF",
      icon: Gift,
      path: "/employee/salary/epf",
    },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="mb-4 md:mb-6">
      {/* Mobile: Scrollable horizontal tabs */}
      <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 min-w-max pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.path)

            return (
              <Button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className={`text-xs px-3 h-9 whitespace-nowrap ${
                  active
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ""
                }`}
                variant={active ? "default" : "outline"}
              >
                <Icon className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="xs:hidden">{tab.shortLabel}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Desktop: Wrapped tabs */}
      <div className="hidden md:flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = isActive(tab.path)

          return (
            <Button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`text-sm px-4 h-10 ${
                active
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : ""
              }`}
              variant={active ? "default" : "outline"}
            >
              <Icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}