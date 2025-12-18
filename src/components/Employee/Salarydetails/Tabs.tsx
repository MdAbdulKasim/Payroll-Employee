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
    <div className="mb-4 md:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const active = isActive(tab.path)

        return (
          <Button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 h-7 sm:h-9 md:h-10 flex-shrink-0 ${
              active
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : ""
            }`}
            variant={active ? "default" : "outline"}
          >
            <Icon className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            <span className="hidden min-[350px]:inline">{tab.label}</span>
            <span className="min-[350px]:hidden">{tab.shortLabel}</span>
          </Button>
        )
      })}
    </div>
  )
}