'use client';

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

  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString('en-IN')}`;

  /* ================= DOWNLOAD FUNCTION ================= */
  const handleDownload = (payslip: Payslip) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const margin = 20;
    let y = margin;

    doc.setFontSize(16);
    doc.text('PAYSLIP', margin, y);

    y += 10;
    doc.setFontSize(10);
    doc.text(`Month: ${payslip.month} ${payslip.year}`, margin, y);

    y += 8;
    doc.text(`Take Home Pay: ${formatCurrency(payslip.takeHome)}`, margin, y);

    y += 15;
    doc.setFontSize(9);
    doc.text(
      'This is a system generated payslip and does not require signature.',
      margin,
      y
    );

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

          {/* ✅ RESPONSIVE SELECT (ONLY CHANGE MADE) */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="
              px-4 py-2
              border border-gray-300
              rounded-lg
              text-sm font-medium text-gray-700
              bg-white
              hover:border-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent
              w-40
              sm:w-44
              md:w-48
              lg:w-auto
            "
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
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Month
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Take Home
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {payslips.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-gray-50">
                  <td className="px-6 py-5 font-medium">
                    {payslip.month} {payslip.year}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {formatCurrency(payslip.takeHome)}
                  </td>

                  <td className="px-6 py-5">
                    <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Available
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push('/employee/documents/payslips/view')
                        }
                        className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        View
                      </button>

                      <button
                        onClick={() => handleDownload(payslip)}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4 inline mr-1" />
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
              className="bg-white rounded-lg shadow-sm border p-4"
            >
              <div className="flex justify-between mb-3">
                <div>
                  <h3 className="font-bold">
                    {payslip.month} {payslip.year}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Take Home: {formatCurrency(payslip.takeHome)}
                  </p>
                </div>
                <FileText className="text-blue-600" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    router.push('/employee/documents/payslips/view')
                  }
                  className="flex-1 border py-2 rounded-lg text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => handleDownload(payslip)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
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
