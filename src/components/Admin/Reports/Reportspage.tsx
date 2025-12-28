"use client";
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportCardProps {
  title: string;
  description: string;
  reportType: string;
  onViewReport: (reportType: string) => void;
  onDownload: (reportType: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, reportType, onViewReport, onDownload }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex-1 text-xs sm:text-sm"
            onClick={() => onViewReport(reportType)}
          >
            View Report
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="shrink-0"
            onClick={() => onDownload(reportType)}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ReportsPage: React.FC = () => {
  const handleViewReport = async (reportType: string) => {
    // TODO: Implement report viewing
    // 1. Fetch raw data from backend: const response = await fetch(`/api/data?type=${reportType}`);
    // 2. Navigate to report viewer: router.push(`/admin/reports/view?type=${reportType}`);
    alert(`Viewing ${reportType} report. TODO: Implement report viewer page.`);
  };

  const handleDownload = async (reportType: string) => {
    // TODO: Implement report download
    // 1. Fetch raw data from backend
    // 2. Generate PDF/Excel based on reportType
    // 3. Trigger download
    alert(`Downloading ${reportType} report. TODO: Implement download functionality.`);
  };

  const handleCreateCustomReport = () => {
    // TODO: Navigate to custom report builder
    alert('Opening custom report builder. TODO: Implement custom report page.');
  };

  const reports = [
    {
      title: 'Payroll Summary',
      description: 'Monthly payroll summary with earnings and deductions',
      reportType: 'payroll-summary',
    },
    {
      title: 'Employee Salary Register',
      description: 'Detailed salary breakdown for all employees',
      reportType: 'salary-register',
    },
    {
      title: 'Statutory Reports',
      description: 'EPF, ESI, PT and other statutory compliance reports',
      reportType: 'statutory-reports',
    },
    {
      title: 'Tax Deduction Report',
      description: 'Income tax and TDS reports for employees',
      reportType: 'tax-deduction',
    },
    {
      title: 'Leave and Attendance',
      description: 'Employee attendance and leave records',
      reportType: 'leave-attendance',
    },
    {
      title: 'Loan Report',
      description: 'Outstanding loans and recovery details',
      reportType: 'loan-report',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-1 sm:mb-2">
            Reports
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Generate and export payroll reports
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {reports.map((report, index) => (
            <ReportCard
              key={index}
              title={report.title}
              description={report.description}
              reportType={report.reportType}
              onViewReport={handleViewReport}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Custom Reports Section */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Custom Reports</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Need a specific report? Create a custom report with your own parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleCreateCustomReport}
              className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto text-xs sm:text-sm"
            >
              Create Custom Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;