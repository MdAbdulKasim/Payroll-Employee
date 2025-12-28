"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Upload,
  Download,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Loan {
  employeeName: string;
  employeeId: string;
  loanNumber: string;
  loanName: string;
  status: string;
  loanAmount: string;
  amountRepaid: string;
  remainingAmount: string;
}

export default function LoansPage() {
  const router = useRouter();

  const [loans, setLoans] = useState<Loan[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState<string | null>(null);

  /* =========================
     FUNCTIONALITY
  ========================== */

  // Bulk Upload
  const handleBulkUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx";
    input.onchange = () => {
      alert("Bulk upload file selected (mock)");
    };
    input.click();
  };

  // Export
  const handleExport = (type: "csv" | "pdf" | "excel") => {
    alert(`Exported as ${type.toUpperCase()} (mock)`);
  };

  // Filter
  const handleFilter = () => {
    if (filtered) {
      setLoans([]);
    } else {
      setLoans(loans.filter((loan) => loan.status === "Open"));
    }
    setFiltered(!filtered);
  };

  // Search
  const filteredLoans = loans.filter(
    (loan) =>
      loan.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      loan.loanNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateLoan = () => {
    router.push("/admin/loans/create");
  };

  // View Loan
  const handleViewLoan = (loanNumber: string) => {
    router.push(`/admin/loans/view?loanNumber=${loanNumber}`);
  };

  // Edit Loan
  const handleEditLoan = (loanNumber: string) => {
    router.push(`/admin/loans/edit?loanNumber=${loanNumber}`);
  };

  // Delete Loan - Open Dialog
  const handleDeleteClick = (loanNumber: string) => {
    setLoanToDelete(loanNumber);
    setDeleteDialogOpen(true);
  };

  // Delete Loan - Confirm
  const handleDeleteConfirm = () => {
    if (loanToDelete) {
      setLoans(loans.filter((loan) => loan.loanNumber !== loanToDelete));
      setDeleteDialogOpen(false);
      setLoanToDelete(null);
      
      // Show success message
      alert(`Loan ${loanToDelete} has been deleted successfully`);
    }
  };

  // Delete Loan - Cancel
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setLoanToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Loans
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your organization's employee loans
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Button Group */}
            <ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleBulkUpload}
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Bulk Upload</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild suppressHydrationWarning>
                  <Button variant="outline" size="sm" className="gap-2" suppressHydrationWarning>
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("pdf")}>
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("excel")}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* <Button
                variant="outline"
                size="sm" 
                className="gap-2"
                onClick={handleFilter}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button> */}
            </ButtonGroup>

            {/* Create Loan */}
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

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search loans..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Loan Number
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Loan Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Loan Amount
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Amount Repaid
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Remaining Amount
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No loans found
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{loan.employeeName}</div>
                        <div className="text-xs text-gray-500">
                          {loan.employeeId}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-blue-600 font-medium">
                        {loan.loanNumber}
                      </td>
                      <td className="px-4 py-3">{loan.loanName}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          {loan.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {loan.loanAmount}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {loan.amountRepaid}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {loan.remainingAmount}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewLoan(loan.loanNumber)}
                            title="View Loan"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditLoan(loan.loanNumber)}
                            title="Edit Loan"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(loan.loanNumber)}
                            title="Delete Loan"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                loan <span className="font-semibold">{loanToDelete}</span> and
                remove all associated data from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}