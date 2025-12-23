"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoanViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loanNumber = searchParams.get("loanNumber");

  // Mock data - in real app, fetch based on loanNumber
  const loansData = [
    {
      employeeName: "Mohamed Faizul M",
      employeeId: "EMP-0012416",
      loanNumber: "LOAN-00001",
      loanName: "BUISNESS",
      status: "Open",
      loanAmount: "₹40,000.00",
      amountRepaid: "₹0.00",
      remainingAmount: "₹40,000.00",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      interestRate: "8%",
      installmentAmount: "₹3,500.00",
      frequency: "Monthly",
      description: "Business expansion loan for equipment purchase",
      repaymentHistory: [
        { date: "2024-02-15", amount: "₹0.00", status: "Pending" },
        { date: "2024-03-15", amount: "₹0.00", status: "Pending" },
      ],
    },
    {
      employeeName: "Shahrukh K",
      employeeId: "EMP-0012417",
      loanNumber: "LOAN-00002",
      loanName: "Personal",
      status: "Open",
      loanAmount: "₹25,000.00",
      amountRepaid: "₹5,000.00",
      remainingAmount: "₹20,000.00",
      startDate: "2024-02-01",
      endDate: "2024-12-01",
      interestRate: "10%",
      installmentAmount: "₹2,500.00",
      frequency: "Monthly",
      description: "Personal loan for emergency medical expenses",
      repaymentHistory: [
        { date: "2024-03-01", amount: "₹2,500.00", status: "Paid" },
        { date: "2024-04-01", amount: "₹2,500.00", status: "Paid" },
        { date: "2024-05-01", amount: "₹0.00", status: "Pending" },
      ],
    },
  ];

  const loan = loansData.find((l) => l.loanNumber === loanNumber);

  if (!loan) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Loan Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The loan you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push("/admin/loans")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Loans
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/loans")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Loans
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Loan Details
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {loan.loanNumber} - {loan.loanName}
              </p>
            </div>

            {/* <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/admin/loans/edit?loanNumber=${loan.loanNumber}`)
                }
              >
                Edit Loan
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure you want to delete loan ${loan.loanNumber}?`
                    )
                  ) {
                    alert("Loan deleted (mock)");
                    router.push("/admin/loans");
                  }
                }}
              >
                Delete Loan
              </Button>
            </div> */}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Loan Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loan.loanAmount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Amount Repaid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loan.amountRepaid}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Remaining Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {loan.remainingAmount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                {loan.status}
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Employee Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Employee Name
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {loan.employeeName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Employee ID
                </label>
                <p className="text-base text-gray-900">{loan.employeeId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Loan Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Loan Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Loan Type
                </label>
                <p className="text-base text-gray-900">{loan.loanName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Loan Number
                </label>
                <p className="text-base font-medium text-blue-600">
                  {loan.loanNumber}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Interest Rate
                </label>
                <p className="text-base text-gray-900">{loan.interestRate}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Repayment Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Repayment Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Start Date
                  </label>
                  <p className="text-base text-gray-900">{loan.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    End Date
                  </label>
                  <p className="text-base text-gray-900">{loan.endDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Installment Amount
                  </label>
                  <p className="text-base font-semibold text-gray-900">
                    {loan.installmentAmount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Frequency
                  </label>
                  <p className="text-base text-gray-900">{loan.frequency}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{loan.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Repayment History */}
        <Card>
          <CardHeader>
            <CardTitle>Repayment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loan.repaymentHistory.map((payment, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{payment.date}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        {payment.amount}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            payment.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}