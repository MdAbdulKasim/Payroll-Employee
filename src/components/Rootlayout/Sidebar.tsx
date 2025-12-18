"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileCheck,
  Banknote,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [approvalsOpen, setApprovalsOpen] = useState(false);

  // Helper function to combine class names
  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/setup",
    },
    { label: "Employees", icon: Users, href: "/employees" },
    { label: "Pay Runs", icon: CalendarCheck, href: "/payruns" },
    { label: "Loans", icon: Banknote, href: "/loans" },
    {
      label: "Documents",
      icon: FileText,
      href: "",
    },
    { label: "Reports", icon: BarChart3, href: "/reports" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  const approvalItems = [
    { label: "Reimbursements", href: "/approvals/reimbursements" },
    { label: "Proof of Investment", href: "/approvals/investment" },
    { label: "Salary Revision", href: "/approvals/salary-revision" },
  ];

  // Check if any approval item is active
  const isApprovalsActive =
    pathname?.startsWith("/approvals") || false;

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto z-40",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <nav className="p-4 space-y-2">
          {/* Regular Navigation Items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  active
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Collapsible Approvals Section */}
          <div>
            <button
              onClick={() => setApprovalsOpen(!approvalsOpen)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isApprovalsActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <FileCheck className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1 text-left">Approvals</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  approvalsOpen && "transform rotate-180"
                )}
              />
            </button>

            {/* Collapsible Content */}
            {approvalsOpen && (
              <div className="pl-12 mt-1 space-y-1">
                {approvalItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md transition-colors",
                      pathname === item.href
                        ? "text-blue-700 bg-blue-50 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
          style={{ top: '5rem' }} // Start overlay below header
        />
      )}
    </>
  );
}