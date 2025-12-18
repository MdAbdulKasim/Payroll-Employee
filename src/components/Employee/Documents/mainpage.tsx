"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

const DocumentsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Determine active tab based on current path
  const isPayslipsActive = pathname.includes("/documents/payslips");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Documents
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Access and download your payroll documents.
          </p>
        </div>

        {/* Single Rounded Tab */}
        <div className="flex gap-2 mb-8">
          <Link
            href="/documents/payslips"
            className={`flex items-center gap-2 px-5 py-2 font-medium text-sm transition-all rounded-full ${
              isPayslipsActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            Payslips
          </Link>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default DocumentsLayout;
