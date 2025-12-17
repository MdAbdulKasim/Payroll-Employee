"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, File } from 'lucide-react';

const DocumentsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();

    // Determine active tab based on current path
    const isPayslipsActive = pathname.includes('/documents/payslips');
    const isForm16Active = pathname.includes('/documents/form16');

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

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-200">
                    <Link
                        href="/documents/payslips"
                        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative ${isPayslipsActive
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Payslips
                        {isPayslipsActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                        )}
                    </Link>
                    <Link
                        href="/documents/form16"
                        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative ${isForm16Active
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <File className="w-4 h-4" />
                        Form 16
                        {isForm16Active && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                        )}
                    </Link>
                </div>

                {/* Content */}
                {children}
            </div>
        </div>
    );
};

export default DocumentsLayout;