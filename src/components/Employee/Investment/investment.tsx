import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, FileText, Info } from 'lucide-react';

const InvestmentDeclarations: React.FC = () => {
  const investmentOptions = [
    {
      name: 'Public Provident Fund (PPF)',
      section: 'Section 80C',
      status: 'Verified',
      statusColor: 'bg-green-500',
      amount: '₹50,000',
      limit: '₹1,50,000',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />
    },
    {
      name: 'Life Insurance Premium',
      section: 'Section 80C',
      status: 'Pending',
      statusColor: 'bg-orange-500',
      amount: '₹25,000',
      limit: '₹1,50,000',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />
    },
    {
      name: 'ELSS Mutual Funds',
      section: 'Section 80C',
      status: 'Verified',
      statusColor: 'bg-green-500',
      amount: '₹40,000',
      limit: '₹1,50,000',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />
    },
    {
      name: 'Health Insurance Premium',
      section: 'Section 80D',
      status: 'Verified',
      statusColor: 'bg-green-500',
      amount: '₹15,000',
      limit: '₹25,000',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />
    },
    {
      name: 'Home Loan Interest',
      section: 'Section 80EEA',
      status: 'Not Declared',
      statusColor: 'bg-gray-400',
      amount: '-',
      limit: '₹1,50,000',
      icon: <RefreshCw className="w-5 h-5 text-blue-500" />
    }
  ];

  return (
    <div className="min-w-[280px] w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Investment Declarations
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Manage your tax-saving investments for the financial year.
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm w-full sm:w-auto">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Submit Declaration
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Section 80C */}
          <Card className="p-3 sm:p-4 md:p-5 bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Section 80C</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                  ₹1,15,000
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  of ₹1,50,000 limit
                </p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center ml-2">
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                style={{ width: '76.67%' }}
              ></div>
            </div>
          </Card>

          {/* Section 80D */}
          <Card className="p-3 sm:p-4 md:p-5 bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Section 80D</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                  ₹15,000
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  of ₹25,000 limit
                </p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-full flex items-center justify-center ml-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                style={{ width: '60%' }}
              ></div>
            </div>
          </Card>

          {/* Total Tax Savings */}
          <Card className="p-3 sm:p-4 md:p-5 bg-white border border-gray-200 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Total Tax Savings</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                  ₹1,30,000
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  FY 2024-25
                </p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-50 rounded-full flex items-center justify-between ml-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mx-auto" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-orange-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                style={{ width: '100%' }}
              ></div>
            </div>
          </Card>
        </div>

        {/* Investment Options */}
        <Card className="p-3 sm:p-4 md:p-6 bg-white border border-gray-200">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            Investment Options
          </h2>
          
          <div className="space-y-2 sm:space-y-3">
            {investmentOptions.map((option, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-2 sm:gap-3"
              >
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 truncate">
                      {option.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                      <span className="text-[10px] sm:text-xs text-gray-600">
                        {option.section}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full text-white ${option.statusColor}`}>
                        {option.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 pl-10 sm:pl-0">
                  <div className="text-right">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                      {option.amount}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">
                      Limit: {option.limit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-2 sm:gap-3">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">
                Important Notice
              </h3>
              <p className="text-[10px] sm:text-xs text-blue-800 leading-relaxed">
                Please ensure all investment proofs are submitted before the deadline to avoid higher TDS deductions. The last date for proof submission for FY 2024-25 is January 31, 2025.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentDeclarations;