"use client";
import React, { useState } from "react";
import { Download, Calendar, X } from "lucide-react";
import jsPDF from "jspdf";

interface PayslipsAndFormsProps {
  employeeId: string;
  employeeData: {
    name: string;
    employeeId: string;
    designation: string;
    dateOfJoining: string;
    companyAddress: string;
  };
}

interface Payslip {
  id: string;
  paymentDate: string;
  month: string;
  year: string;
  status: string;
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
  paidDays: number;
  lopDays: number;
  earnings: {
    bonus?: number;
    basic?: number;
    hra?: number;
    conveyance?: number;
    fixedAllowance?: number;
  };
}

const MOCK_PAYSLIPS: Payslip[] = [
  {
    id: "1",
    paymentDate: "01/01/2026",
    month: "January",
    year: "2026",
    status: "BONUS",
    grossEarnings: 9000.0,
    totalDeductions: 0.0,
    netPay: 9000.0,
    paidDays: 0,
    lopDays: 0,
    earnings: {
      bonus: 9000.0,
    },
  },
];

export default function PayslipsAndForms({
  employeeId,
  employeeData,
}: PayslipsAndFormsProps) {
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewPdf, setPreviewPdf] = useState<string | null>(null);
  const [currentPayslip, setCurrentPayslip] = useState<Payslip | null>(null);

  const numberToWords = (num: number): string => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

    if (num === 0) return "Zero";

    const convert = (n: number): string => {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
      if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
      if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
      return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
    };

    return "Indian Rupee " + convert(Math.floor(num)) + " Only";
  };

  const generatePayslipPDF = (payslip: Payslip): jsPDF => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    let yPos = margin;

    const formatCurrency = (amount: number): string => {
      return `INR ${amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };

    const drawText = (text: string, x: number, y: number, options: any = {}) => {
      pdf.setFontSize(options.fontSize || 10);
      pdf.setFont("helvetica", options.fontStyle || "normal");
      pdf.setTextColor(options.color || "#000000");
      pdf.text(text, x, y, options.align ? { align: options.align } : undefined);
    };

    const drawRect = (x: number, y: number, width: number, height: number, options: any = {}) => {
      if (options.fill) {
        pdf.setFillColor(options.fill);
        pdf.rect(x, y, width, height, "F");
      }
      if (options.stroke) {
        pdf.setDrawColor(options.stroke);
        pdf.rect(x, y, width, height, "S");
      }
    };

    drawText("abc", margin, yPos, { fontSize: 20, fontStyle: "bold" });
    yPos += 5;
    pdf.setFontSize(8);
    const addressLines = pdf.splitTextToSize(employeeData.companyAddress, 100);
    addressLines.forEach((line: string) => {
      drawText(line, margin, yPos, { fontSize: 8, color: "#666666" });
      yPos += 3.5;
    });

    const monthTextY = margin;
    drawText("Payslip For the Month", pageWidth - margin, monthTextY, {
      fontSize: 9,
      color: "#666666",
      align: "right",
    });
    drawText(`${payslip.month} ${payslip.year}`, pageWidth - margin, monthTextY + 5, {
      fontSize: 14,
      fontStyle: "bold",
      align: "right",
    });

    yPos += 5;

    drawRect(margin, yPos, pageWidth - 2 * margin, 50, {
      stroke: "#e0e0e0",
    });
    drawRect(margin, yPos, pageWidth - 2 * margin, 8, {
      fill: "#f5f5f5",
    });
    drawText("EMPLOYEE SUMMARY", margin + 3, yPos + 5.5, {
      fontSize: 10,
      fontStyle: "bold",
    });

    yPos += 12;

    const col1X = margin + 3;
    const col2X = pageWidth / 2 + 5;
    const lineHeight = 6;

    const details = [
      [
        { label: "Employee Name", value: employeeData.name },
        { label: "Paid Days", value: payslip.paidDays.toString() },
      ],
      [
        { label: "Designation", value: employeeData.designation },
        { label: "LOP Days", value: payslip.lopDays.toString() },
      ],
      [
        { label: "Employee ID", value: employeeData.employeeId },
        { label: "", value: "" },
      ],
      [
        { label: "Date of Joining", value: employeeData.dateOfJoining },
        { label: "", value: "" },
      ],
      [
        { label: "Pay Period", value: `${payslip.month} ${payslip.year}` },
        { label: "", value: "" },
      ],
      [
        { label: "Pay Date", value: payslip.paymentDate },
        { label: "", value: "" },
      ],
    ];

    details.forEach((row) => {
      if (row[0].label) {
        drawText(row[0].label, col1X, yPos, {
          fontSize: 8,
          color: "#666666",
        });
        drawText(`: ${row[0].value}`, col1X + 30, yPos, { fontSize: 9 });
      }
      if (row[1].label) {
        drawText(row[1].label, col2X, yPos, {
          fontSize: 8,
          color: "#666666",
        });
        drawText(`: ${row[1].value}`, col2X + 20, yPos, { fontSize: 9 });
      }
      yPos += lineHeight;
    });

    yPos += 5;

    const netPayBoxHeight = 20;
    drawRect(margin, yPos, pageWidth - 2 * margin, netPayBoxHeight, {
      fill: "#e8f5e9",
      stroke: "#a5d6a7",
    });
    drawText(
      formatCurrency(payslip.netPay),
      pageWidth / 2,
      yPos + 10,
      { fontSize: 18, fontStyle: "bold", color: "#2e7d32", align: "center" }
    );
    drawText("Total Net Pay", pageWidth / 2, yPos + 16, {
      fontSize: 9,
      color: "#558b2f",
      align: "center",
    });

    yPos += netPayBoxHeight + 8;

    const tableStartY = yPos;
    const colWidth = (pageWidth - 2 * margin) / 4;

    drawRect(margin, yPos, pageWidth - 2 * margin, 8, {
      fill: "#f5f5f5",
    });
    drawText("EARNINGS", margin + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
    });
    drawText("AMOUNT", margin + colWidth - 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      align: "right",
    });
    drawText("DEDUCTIONS", margin + 2 * colWidth + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
    });
    drawText("AMOUNT", pageWidth - margin - 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      align: "right",
    });

    pdf.setDrawColor("#e0e0e0");
    pdf.line(margin, tableStartY, margin, yPos + 8);
    pdf.line(margin + colWidth, tableStartY, margin + colWidth, yPos + 8);
    pdf.line(margin + 2 * colWidth, tableStartY, margin + 2 * colWidth, yPos + 8);
    pdf.line(margin + 3 * colWidth, tableStartY, margin + 3 * colWidth, yPos + 8);
    pdf.line(pageWidth - margin, tableStartY, pageWidth - margin, yPos + 8);
    pdf.line(margin, yPos + 8, pageWidth - margin, yPos + 8);

    yPos += 8;

    const earningsEntries = Object.entries(payslip.earnings).filter(
      ([_, value]) => value && value > 0
    );

    earningsEntries.forEach(([key, value]) => {
      const rowHeight = 7;
      const labelMap: { [key: string]: string } = {
        bonus: "Bonus",
        basic: "Basic",
        hra: "HRA",
        conveyance: "Conveyance Allowance",
        fixedAllowance: "Fixed Allowance",
      };

      drawText(labelMap[key] || key, margin + 2, yPos + 5, { fontSize: 9 });
      drawText(
        formatCurrency(value),
        margin + colWidth - 2,
        yPos + 5,
        { fontSize: 9, align: "right" }
      );

      pdf.line(margin, yPos, margin, yPos + rowHeight);
      pdf.line(margin + colWidth, yPos, margin + colWidth, yPos + rowHeight);
      pdf.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + rowHeight);
      pdf.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + rowHeight);
      pdf.line(pageWidth - margin, yPos, pageWidth - margin, yPos + rowHeight);
      pdf.line(margin, yPos + rowHeight, pageWidth - margin, yPos + rowHeight);

      yPos += rowHeight;
    });

    const totalRowHeight = 8;
    drawRect(margin, yPos, pageWidth - 2 * margin, totalRowHeight, {
      fill: "#f9f9f9",
    });

    drawText("Gross Earnings", margin + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
    });
    drawText(
      formatCurrency(payslip.grossEarnings),
      margin + colWidth - 2,
      yPos + 5.5,
      { fontSize: 9, fontStyle: "bold", align: "right" }
    );
    drawText("Total Deductions", margin + 2 * colWidth + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
    });
    drawText(
      formatCurrency(payslip.totalDeductions),
      pageWidth - margin - 2,
      yPos + 5.5,
      { fontSize: 9, fontStyle: "bold", align: "right" }
    );

    pdf.line(margin, yPos, margin, yPos + totalRowHeight);
    pdf.line(margin + colWidth, yPos, margin + colWidth, yPos + totalRowHeight);
    pdf.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + totalRowHeight);
    pdf.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + totalRowHeight);
    pdf.line(pageWidth - margin, yPos, pageWidth - margin, yPos + totalRowHeight);
    pdf.line(margin, yPos + totalRowHeight, pageWidth - margin, yPos + totalRowHeight);

    yPos += totalRowHeight + 8;

    drawRect(margin, yPos, pageWidth - 2 * margin, 15, {
      fill: "#fafafa",
      stroke: "#e0e0e0",
    });
    drawText("TOTAL NET PAYABLE", margin + 3, yPos + 6, {
      fontSize: 10,
      fontStyle: "bold",
    });
    drawText("Gross Earnings - Total Deductions", margin + 3, yPos + 11, {
      fontSize: 8,
      color: "#666666",
    });
    drawText(
      formatCurrency(payslip.netPay),
      pageWidth - margin - 3,
      yPos + 9,
      { fontSize: 14, fontStyle: "bold", color: "#2e7d32", align: "right" }
    );

    yPos += 20;

    const amountInWords = numberToWords(payslip.netPay);
    drawText(`Amount In Words: `, pageWidth / 2 - 40, yPos, {
      fontSize: 9,
      color: "#666666",
    });
    drawText(amountInWords, pageWidth / 2 + 10, yPos, {
      fontSize: 9,
      fontStyle: "bold",
    });

    yPos += 10;

    pdf.setDrawColor("#e0e0e0");
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;
    drawText("~ This is a system-generated document. ~", pageWidth / 2, yPos, {
      fontSize: 8,
      color: "#999999",
      align: "center",
    });

    return pdf;
  };

  const handleViewPayslip = async (payslip: Payslip) => {
    setIsDownloading(true);
    setCurrentPayslip(payslip);

    try {
      const pdf = generatePayslipPDF(payslip);
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPreviewPdf(pdfUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (currentPayslip) {
      const pdf = generatePayslipPDF(currentPayslip);
      pdf.save(
        `Payslip_${employeeData.employeeId}_${currentPayslip.month}_${currentPayslip.year}.pdf`
      );
    }
  };

  const handleClosePreview = () => {
    const urlToRevoke = previewPdf;
    setPreviewPdf(null);
    setCurrentPayslip(null);
    
    if (urlToRevoke) {
      setTimeout(() => {
        URL.revokeObjectURL(urlToRevoke);
      }, 100);
    }
  };

  const years = ["2025-26", "2024-25", "2023-24", "2022-23"];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* PDF Preview Modal - Fully Responsive */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full h-[95vh] sm:h-[90vh] sm:max-w-5xl sm:rounded-lg shadow-xl flex flex-col sm:mx-4">
            {/* Header */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-b flex items-center justify-between gap-2 flex-shrink-0">
              <h3 className="text-sm sm:text-lg font-semibold truncate flex-1">
                Payslip - {currentPayslip?.month} {currentPayslip?.year}
              </h3>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">Download</span>
                </button>
                <button
                  onClick={handleClosePreview}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={previewPdf}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}

      {/* Payslips Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Payslips
          </h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Financial Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-3">
          {MOCK_PAYSLIPS.map((payslip) => (
            <div key={payslip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Month</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {payslip.month} {payslip.year}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        {payslip.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-600 mb-1">Payment Date</p>
                  <p className="text-sm text-gray-900">{payslip.paymentDate}</p>
                </div>

                <button
                  onClick={() => handleViewPayslip(payslip)}
                  disabled={isDownloading}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'View Payslip'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Payslips
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_PAYSLIPS.map((payslip) => (
                  <tr key={payslip.id} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-900">
                      {payslip.paymentDate}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">
                          {payslip.month} {payslip.year}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          {payslip.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewPayslip(payslip)}
                        disabled={isDownloading}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'View'
                        )}
                      </button>
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