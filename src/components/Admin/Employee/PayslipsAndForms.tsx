"use client";
import React, { useState, useRef } from "react";
import { Download, Printer, Eye, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PayslipData {
  id: string;
  paymentDate: string;
  month: string;
  year: string;
  status: "BONUS" | "PAID" | "PENDING";
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
}

interface EmployeeData {
  name: string;
  employeeId: string;
  designation: string;
  dateOfJoining: string;
  companyAddress: string;
}

interface PayslipsAndFormsProps {
  employeeId: string;
  employeeData?: EmployeeData;
}

export default function PayslipsAndForms({
  employeeId,
  employeeData,
}: PayslipsAndFormsProps) {
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [viewingPayslip, setViewingPayslip] = useState<PayslipData | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadPassword, setDownloadPassword] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  // Mock payslip data
  const [payslips, setPayslips] = useState<PayslipData[]>([
    {
      id: "1",
      paymentDate: "01/01/2026",
      month: "January 2026",
      year: "2025-26",
      status: "BONUS",
      grossEarnings: 9000,
      totalDeductions: 0,
      netPay: 9000,
    },
  ]);

  const [form16Generated, setForm16Generated] = useState(false);

  const handleViewPayslip = (payslip: PayslipData) => {
    setViewingPayslip(payslip);
  };

  const handleDownloadPayslip = (payslip: PayslipData) => {
    setViewingPayslip(payslip);
    setShowDownloadModal(true);
  };

  const handlePrintPayslip = (payslip: PayslipData) => {
    setViewingPayslip(payslip);
    // Wait for the modal to render, then trigger print
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const confirmDownload = () => {
    if (!viewingPayslip) return;

    // Create payslip HTML content
    const payslipContent = generatePayslipHTML(viewingPayslip);

    // Create a blob and download
    const blob = new Blob([payslipContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payslip_${viewingPayslip.month.replace(" ", "_")}.html`;
    link.click();
    URL.revokeObjectURL(url);

    setShowDownloadModal(false);
    setDownloadPassword("");
  };

  const generatePayslipHTML = (payslip: PayslipData) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Payslip for ${payslip.month}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            padding: 30px;
            max-width: 850px;
            margin: 0 auto;
            color: #000;
            background: white;
        }
        .header {
            margin-bottom: 25px;
        }
        .company-name {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        .company-address {
            font-size: 11px;
            color: #000;
            margin-bottom: 20px;
            line-height: 1.4;
        }
        .payslip-title {
            font-size: 13px;
            text-align: right;
            margin-top: -40px;
        }
        .payslip-title strong {
            display: block;
            font-size: 15px;
            margin-top: 3px;
        }
        .employee-summary {
            border: 1px solid #000;
            margin-bottom: 20px;
        }
        .summary-title {
            background: #f5f5f5;
            padding: 8px 12px;
            font-weight: 700;
            font-size: 13px;
            border-bottom: 1px solid #000;
        }
        .summary-content {
            padding: 12px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 40px;
        }
        .summary-row {
            display: flex;
            font-size: 12px;
            line-height: 1.8;
        }
        .summary-label {
            color: #000;
            min-width: 130px;
        }
        .summary-value {
            font-weight: 500;
        }
        .net-pay-box {
            background: #d4f4dd;
            border: 1px solid #4caf50;
            padding: 15px 20px;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .net-pay-left {
            flex: 1;
        }
        .net-pay-amount {
            font-size: 28px;
            font-weight: bold;
            color: #000;
            margin-bottom: 3px;
        }
        .net-pay-label {
            font-size: 13px;
            color: #000;
            font-weight: 500;
        }
        .days-info {
            font-size: 11px;
            color: #000;
            line-height: 1.6;
        }
        .earnings-deductions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .section {
            border: 1px solid #000;
        }
        .section-title {
            font-weight: bold;
            padding: 8px 12px;
            background: #f5f5f5;
            border-bottom: 1px solid #000;
            font-size: 13px;
        }
        .section-content {
            padding: 0;
        }
        .amount-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 12px;
            font-size: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        .amount-row:last-child {
            border-bottom: none;
        }
        .amount-header {
            font-weight: 600;
            background: #fafafa;
            font-size: 11px;
            text-transform: uppercase;
        }
        .total-row {
            background: #f5f5f5;
            font-weight: bold;
            border-top: 1px solid #000;
        }
        .net-payable {
            background: #d4f4dd;
            border: 1px solid #4caf50;
            padding: 12px 20px;
            margin: 20px 0;
        }
        .net-payable-row {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 3px;
        }
        .net-payable-formula {
            font-size: 11px;
            color: #000;
            font-weight: normal;
        }
        .amount-in-words {
            text-align: center;
            font-size: 12px;
            margin: 25px 0;
            color: #000;
            font-weight: 500;
        }
        .footer {
            text-align: center;
            font-size: 10px;
            color: #666;
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #ccc;
        }
        @media print {
            body { 
                padding: 15px; 
                margin: 0;
            }
            @page {
                size: A4;
                margin: 0;
            }
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">${employeeData?.companyAddress?.split(",")[0] || "abc"}</div>
        <div class="company-address">${employeeData?.companyAddress || "4.13.15 Arunachalapuram Batlagundu Dindigul Tamil Nadu 624302 India"}</div>
        <div class="payslip-title">
            Payslip For the Month<br>
            <strong>${payslip.month}</strong>
        </div>
    </div>

    <div class="employee-summary">
        <div class="summary-title">EMPLOYEE SUMMARY</div>
        <div class="summary-content">
            <div class="summary-grid">
                <div class="summary-row">
                    <span class="summary-label">Employee Name</span>
                    <span class="summary-value">: ${employeeData?.name || "qwe qwe we"}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Designation</span>
                    <span class="summary-value">: ${employeeData?.designation || "Team Lead"}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Employee ID</span>
                    <span class="summary-value">: ${employeeData?.employeeId || "123"}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Date of Joining</span>
                    <span class="summary-value">: ${employeeData?.dateOfJoining || "18/12/2025"}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Pay Period</span>
                    <span class="summary-value">: ${payslip.month}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Pay Date</span>
                    <span class="summary-value">: ${payslip.paymentDate}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="net-pay-box">
        <div class="net-pay-left">
            <div class="net-pay-amount">₹${payslip.netPay.toLocaleString('en-IN')}.00</div>
            <div class="net-pay-label">Total Net Pay</div>
        </div>
        <div class="days-info">
            <div>Paid Days : 0</div>
            <div>LOP Days : 0</div>
        </div>
    </div>

    <div class="earnings-deductions">
        <div class="section">
            <div class="section-title">EARNINGS</div>
            <div class="section-content">
                <div class="amount-row amount-header">
                    <span>Component</span>
                    <span>AMOUNT</span>
                </div>
                <div class="amount-row">
                    <span>Bonus</span>
                    <span>₹${payslip.grossEarnings.toLocaleString('en-IN')}.00</span>
                </div>
                <div class="amount-row total-row">
                    <span>Gross Earnings</span>
                    <span>₹${payslip.grossEarnings.toLocaleString('en-IN')}.00</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">DEDUCTIONS</div>
            <div class="section-content">
                <div class="amount-row amount-header">
                    <span>Component</span>
                    <span>AMOUNT</span>
                </div>
                <div class="amount-row total-row">
                    <span>Total Deductions</span>
                    <span>₹${payslip.totalDeductions.toLocaleString('en-IN')}.00</span>
                </div>
            </div>
        </div>
    </div>

    <div class="net-payable">
        <div class="net-payable-row">
            <span>TOTAL NET PAYABLE</span>
            <span>₹${payslip.netPay.toLocaleString('en-IN')}.00</span>
        </div>
        <div class="net-payable-formula">Gross Earnings - Total Deductions</div>
    </div>

    <div class="amount-in-words">
        Amount In Words: Indian Rupee Nine Thousand Only
    </div>

    <div class="footer">
        -- This is a system generated document. --
    </div>
</body>
</html>
    `;
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body * {
            visibility: hidden;
          }
          #payslip-print-area,
          #payslip-print-area * {
            visibility: visible;
          }
          #payslip-print-area {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .print-break-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>

      <div className="space-y-6">

        {/* Payslips and TDS Sheets Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Payslips and TDS Sheets</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Financial Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2025-26">2025 - 26</option>
                <option value="2024-25">2024 - 25</option>
                <option value="2023-24">2023 - 24</option>
              </select>
            </div>
          </div>

          {/* Payslips Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Payslips
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    TDS Sheet
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payslips
                  .filter((p) => p.year === selectedYear)
                  .map((payslip) => (
                    <tr key={payslip.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{payslip.paymentDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="flex items-center gap-2">
                          {payslip.month}
                          {payslip.status === "BONUS" && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                              BONUS
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewPayslip(payslip)}
                            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadPayslip(payslip)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handlePrintPayslip(payslip)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">-</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form 16 Section */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Form 16</h3>
          <div className="text-center py-8">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Form 16 hasn't been generated for this employee yet!
            </p>
            {!form16Generated && (
              <Button
                onClick={() => setForm16Generated(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Generate Form 16
              </Button>
            )}
          </div>
        </div>

        {/* Download Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Download Payslip</h3>
                <button
                  onClick={() => {
                    setShowDownloadModal(false);
                    setDownloadPassword("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                You can protect the payslip with a password to keep the data secure.
              </p>
              <div className="mb-4">
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Protect this file with a password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={downloadPassword}
                  onChange={(e) => setDownloadPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDownloadModal(false);
                    setDownloadPassword("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDownload}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payslip Viewer Modal */}
        {viewingPayslip && !showDownloadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10 shadow-sm">
                <h3 className="text-lg font-semibold">
                  Payslip for {viewingPayslip.month}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePrintPayslip(viewingPayslip)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={() => {
                      setShowDownloadModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setViewingPayslip(null)}
                    className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div 
                id="payslip-print-area"
                className="flex-1 overflow-auto bg-gray-50 p-8"
                dangerouslySetInnerHTML={{
                  __html: generatePayslipHTML(viewingPayslip),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}