import React, { useState } from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

interface Payslip {
  id: string;
  month: string;
  year: number;
  takeHome: number;
}

const PayslipsPage: React.FC = () => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState('FY 2024-25');

  const payslips: Payslip[] = [
    { id: '1', month: 'December', year: 2024, takeHome: 108000 },
    { id: '2', month: 'November', year: 2024, takeHome: 108000 },
    { id: '3', month: 'October', year: 2024, takeHome: 104452 },
    { id: '4', month: 'September', year: 2024, takeHome: 108000 },
    { id: '5', month: 'August', year: 2024, takeHome: 108000 },
    { id: '6', month: 'July', year: 2024, takeHome: 108000 },
  ];

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  /* ================= DOWNLOAD FUNCTION ================= */
  const handleDownload = (payslip: Payslip) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPos = margin;

    const drawText = (text: string, x: number, y: number, options: any = {}) => {
      doc.setFontSize(options.fontSize || 10);
      doc.setFont("helvetica", options.fontStyle || "normal");
      doc.setTextColor(options.color || "#000000");
      doc.text(text, x, y, options.align ? { align: options.align } : undefined);
    };

    const drawRect = (x: number, y: number, width: number, height: number, options: any = {}) => {
      if (options.fill) {
        doc.setFillColor(options.fill);
        doc.rect(x, y, width, height, "F");
      }
      if (options.stroke) {
        doc.setDrawColor(options.stroke);
        doc.rect(x, y, width, height, "S");
      }
    };

    // Company Header
    drawText("Your Company Name", margin, yPos, { fontSize: 18, fontStyle: "bold" });
    yPos += 6;
    drawText("www.yourcompany.com", margin, yPos, { fontSize: 9, color: "#666666" });
    yPos += 5;
    drawText("123 Business Street, Suite 100, City, State 10001", margin, yPos, { fontSize: 8, color: "#666666" });
    yPos += 10;

    // Payslip Title - Right aligned
    const titleY = margin;
    drawRect(pageWidth - 70, titleY, 55, 10, { fill: "#1a5662" });
    drawText("PAYROLL PAYSLIP", pageWidth - 42.5, titleY + 6.5, {
      fontSize: 11,
      fontStyle: "bold",
      color: "#ffffff",
      align: "center"
    });

    // Employee Information Header
    drawRect(margin, yPos, pageWidth - 2 * margin, 8, { fill: "#1a5662" });
    drawText("EMPLOYEE INFORMATION", margin + 3, yPos + 5.5, {
      fontSize: 10,
      fontStyle: "bold",
      color: "#ffffff"
    });

    yPos += 12;

    // Employee Details
    const col1X = margin + 3;
    const col2X = pageWidth / 2 + 5;
    const lineHeight = 6;

    drawText("Name", col1X, yPos, { fontSize: 8, color: "#666666" });
    drawText(": John Doe", col1X + 22, yPos, { fontSize: 9 });
    drawText("ID Number", col2X, yPos, { fontSize: 8, color: "#666666" });
    drawText(": EMP-2024-089", col2X + 22, yPos, { fontSize: 9 });
    yPos += lineHeight;

    drawText("Position", col1X, yPos, { fontSize: 8, color: "#666666" });
    drawText(": Software Engineer", col1X + 22, yPos, { fontSize: 9 });
    drawText("Department", col2X, yPos, { fontSize: 8, color: "#666666" });
    drawText(": Engineering", col2X + 22, yPos, { fontSize: 9 });
    yPos += lineHeight;

    drawText("Pay Period", col1X, yPos, { fontSize: 8, color: "#666666" });
    drawText(`: ${payslip.month} ${payslip.year}`, col1X + 22, yPos, { fontSize: 9 });
    drawText("PAN", col2X, yPos, { fontSize: 8, color: "#666666" });
    drawText(": ABCDE1234F", col2X + 22, yPos, { fontSize: 9 });
    yPos += lineHeight + 8;

    // Calculate values based on take home
    const takeHomeValue = payslip.takeHome;
    const deductionsValue = 2000;
    const reimbursementValue = 5000;
    const grossPayValue = takeHomeValue + deductionsValue;
    const basicSalary = grossPayValue - reimbursementValue;

    // Earnings and Deductions Table
    const colWidth = (pageWidth - 2 * margin) / 4;

    // Table Header
    drawRect(margin, yPos, pageWidth - 2 * margin, 8, { fill: "#1a5662" });
    drawText("EARNINGS", margin + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    });
    drawText("AMOUNT", margin + colWidth - 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff",
      align: "right"
    });
    drawText("DEDUCTIONS", margin + 2 * colWidth + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    });
    drawText("AMOUNT", pageWidth - margin - 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff",
      align: "right"
    });

    yPos += 8;

    const earnings = [
      { label: "Basic Salary", amount: basicSalary },
      { label: "Allowances", amount: reimbursementValue }
    ];

    const deductions = [
      { label: "Tax (TDS)", amount: deductionsValue * 0.6 },
      { label: "PF", amount: deductionsValue * 0.4 }
    ];

    const maxRows = Math.max(earnings.length, deductions.length);
    
    for (let i = 0; i < maxRows; i++) {
      const rowHeight = 7;
      
      // Draw borders
      doc.setDrawColor("#e0e0e0");
      doc.line(margin, yPos, pageWidth - margin, yPos);
      doc.line(margin, yPos, margin, yPos + rowHeight);
      doc.line(margin + colWidth, yPos, margin + colWidth, yPos + rowHeight);
      doc.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + rowHeight);
      doc.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + rowHeight);
      doc.line(pageWidth - margin, yPos, pageWidth - margin, yPos + rowHeight);

      // Earnings
      if (i < earnings.length) {
        drawText(earnings[i].label, margin + 2, yPos + 5, { fontSize: 9 });
        drawText(
          `₹${earnings[i].amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          margin + colWidth - 2,
          yPos + 5,
          { fontSize: 9, align: "right" }
        );
      }

      // Deductions
      if (i < deductions.length) {
        drawText(deductions[i].label, margin + 2 * colWidth + 2, yPos + 5, { fontSize: 9 });
        drawText(
          `₹${deductions[i].amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          pageWidth - margin - 2,
          yPos + 5,
          { fontSize: 9, align: "right" }
        );
      }

      yPos += rowHeight;
    }

    // Total row
    doc.line(margin, yPos, pageWidth - margin, yPos);
    const totalRowHeight = 8;
    drawRect(margin, yPos, pageWidth - 2 * margin, totalRowHeight, { fill: "#1a5662" });

    drawText("GROSS PAY", margin + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    });
    drawText(
      formatCurrency(grossPayValue),
      margin + colWidth - 2,
      yPos + 5.5,
      { fontSize: 9, fontStyle: "bold", color: "#ffffff", align: "right" }
    );
    drawText("TOTAL DEDUCTIONS", margin + 2 * colWidth + 2, yPos + 5.5, {
      fontSize: 9,
      fontStyle: "bold",
      color: "#ffffff"
    });
    drawText(
      formatCurrency(deductionsValue),
      pageWidth - margin - 2,
      yPos + 5.5,
      { fontSize: 9, fontStyle: "bold", color: "#ffffff", align: "right" }
    );

    // Draw borders
    doc.line(margin, yPos + totalRowHeight, pageWidth - margin, yPos + totalRowHeight);
    doc.line(margin, yPos, margin, yPos + totalRowHeight);
    doc.line(margin + colWidth, yPos, margin + colWidth, yPos + totalRowHeight);
    doc.line(margin + 2 * colWidth, yPos, margin + 2 * colWidth, yPos + totalRowHeight);
    doc.line(margin + 3 * colWidth, yPos, margin + 3 * colWidth, yPos + totalRowHeight);
    doc.line(pageWidth - margin, yPos, pageWidth - margin, yPos + totalRowHeight);

    yPos += totalRowHeight + 10;

    // Net Pay Box
    drawRect(margin, yPos, pageWidth - 2 * margin, 15, {
      fill: "#1a5662"
    });
    drawText("NET PAY (TAKE HOME)", margin + 3, yPos + 9, {
      fontSize: 10,
      fontStyle: "bold",
      color: "#ffffff"
    });
    drawText(
      formatCurrency(takeHomeValue),
      pageWidth - margin - 3,
      yPos + 9,
      { fontSize: 16, fontStyle: "bold", color: "#ffffff", align: "right" }
    );

    yPos += 20;

    // Footer Note
    drawText("This is a computer-generated payslip and does not require a signature.", margin, yPos, {
      fontSize: 8,
      color: "#666666"
    });

    yPos += 15;

    // Signatures
    const sigWidth = (pageWidth - 3 * margin) / 2;
    
    // Employer signature
    doc.line(margin, yPos, margin + sigWidth, yPos);
    drawText("Employer Signature / Date", margin + sigWidth / 2, yPos + 5, {
      fontSize: 8,
      align: "center"
    });

    // Employee signature
    doc.line(margin + sigWidth + margin, yPos, pageWidth - margin, yPos);
    drawText("Employee Signature / Date", margin + sigWidth + margin + sigWidth / 2, yPos + 5, {
      fontSize: 8,
      align: "center"
    });

    // Save PDF
    doc.save(`Payslip_${payslip.month}_${payslip.year}.pdf`);
  };
  /* ===================================================== */

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-2">
      <div className="max-w-7xl mx-auto">

        {/* Title and Year Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Monthly Payslips
          </h2>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
          >
            <option>FY 2024-25</option>
            <option>FY 2023-24</option>
            <option>FY 2022-23</option>
          </select>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Take Home
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payslips.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-gray-900">
                      {payslip.month} {payslip.year}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600">
                      {formatCurrency(payslip.takeHome)}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          router.push('/employee/documents/payslips/view')
                        }
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => handleDownload(payslip)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {payslips.map((payslip) => (
            <div
              key={payslip.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {payslip.month} {payslip.year}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Take Home: {formatCurrency(payslip.takeHome)}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                  PDF
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    router.push('/employee/documents/payslips/view')
                  }
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => handleDownload(payslip)}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PayslipsPage;