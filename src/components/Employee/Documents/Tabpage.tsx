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
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Documents
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            Access and download your payroll documents.
          </p>
        </div>

        {/* Single Rounded Tab */}
        <div className="flex gap-2 mb-4 sm:mb-6 md:mb-8">
          <button
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 font-medium text-xs sm:text-sm transition-all rounded-full ${
              isPayslipsActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Payslips
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default DocumentsLayout;