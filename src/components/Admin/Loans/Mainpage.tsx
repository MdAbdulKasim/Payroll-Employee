"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Upload, Download, Filter, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export default function LoansPage() {
  const router = useRouter();
  
  const loans = [
    {
      employeeName: 'Mohamed Faizul M',
      employeeId: 'EMP-0012416',
      loanNumber: 'LOAN-00001',
      loanName: 'BUISNESS',
      status: 'Open',
      loanAmount: '₹40,000.00',
      amountRepaid: '₹0.00',
      remainingAmount: '₹40,000.00'
    },
    {
      employeeName: 'Shahrukh K',
      employeeId: 'EMP-0012417',
      loanNumber: 'LOAN-00002',
      loanName: 'Personal',
      status: 'Open',
      loanAmount: '₹25,000.00',
      amountRepaid: '₹5,000.00',
      remainingAmount: '₹20,000.00'
    }
  ];

  const handleCreateLoan = () => {
    router.push('/admin/loans/create');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header Section */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Loans</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your organization's employee loans</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Bulk Upload</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button 
              size="sm" 
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateLoan}
            >
              <Plus className="w-4 h-4" />
              Create Loan
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search loans..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Loan Number</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Loan Name</th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-right text-xs sm:text-sm font-semibold text-gray-700">Loan Amount</th>
                  <th className="px-4 py-3 text-right text-xs sm:text-sm font-semibold text-gray-700">Amount Repaid</th>
                  <th className="px-4 py-3 text-right text-xs sm:text-sm font-semibold text-gray-700">Remaining Amount</th>
                  <th className="px-4 py-3 text-right text-xs sm:text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900 text-xs sm:text-sm">{loan.employeeName}</div>
                        <div className="text-xs text-gray-500">{loan.employeeId}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a href="#" className="text-blue-600 hover:underline font-medium text-xs sm:text-sm">
                        {loan.loanNumber}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-900 text-xs sm:text-sm">{loan.loanName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-900 text-xs sm:text-sm">{loan.loanAmount}</td>
                    <td className="px-4 py-3 text-right text-gray-900 text-xs sm:text-sm">{loan.amountRepaid}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-medium text-xs sm:text-sm">{loan.remainingAmount}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}