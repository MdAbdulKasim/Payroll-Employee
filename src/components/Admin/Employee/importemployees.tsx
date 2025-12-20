
"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ImportEmployeesProps {
    onComplete?: () => void;
}

export default function ImportEmployees({ onComplete }: ImportEmployeesProps) {
    const router = useRouter();
    const { employees, addEmployees, markStepComplete } = useApp();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewData, setPreviewData] = useState<any[]>([]);

    const downloadTemplate = (format: 'csv' | 'excel') => {
        const headers = [
            'First Name',
            'Last Name',
            'Email',
            'Phone',
            'Department',
            'Designation',
            'Date of Joining',
            'Salary',
            'Employee ID'
        ];

        const sampleData = [
            ['John', 'Doe', 'john.doe@company.com', '9876543210', 'Engineering', 'Senior Developer', '2024-01-15', '75000', 'EMP001'],
            ['Jane', 'Smith', 'jane.smith@company.com', '9876543211', 'Marketing', 'Marketing Manager', '2024-02-20', '65000', 'EMP002'],
            ['Mike', 'Johnson', 'mike.johnson@company.com', '9876543212', 'Sales', 'Sales Executive', '2024-03-10', '55000', 'EMP003']
        ];

        if (format === 'csv') {
            const csvContent = [
                headers.join(','),
                ...sampleData.map(row => row.map(cell => `"${cell}"`).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'employee_template.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('CSV template downloaded successfully');
        } else {
            // For Excel, we'll create a simple CSV that can be opened in Excel
            const csvContent = [
                headers.join(','),
                ...sampleData.map(row => row.map(cell => `"${cell}"`).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'employee_template.xlsx');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('Excel template downloaded successfully');
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a CSV or Excel file');
            return;
        }

        setUploadedFile(file);
        parseFile(file);
    };

    const parseFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const lines = text.split('\n');
                const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

                const data = lines.slice(1).filter(line => line.trim()).map(line => {
                    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
                    const row: any = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index] || '';
                    });
                    return row;
                });

                setPreviewData(data);
                toast.success(`File processed successfully. Found ${data.length} employees`);
            } catch (error) {
                toast.error('Error parsing file. Please check the format');
                console.error('File parse error:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleImport = async () => {
        if (previewData.length === 0) {
            toast.error('No data to import');
            return;
        }

        setIsProcessing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const importedEmployees = previewData.map((row, index) => ({
                id: `EMP_${Date.now()}_${index}`,
                name: `${row['First Name'] || ''} ${row['Last Name'] || ''}`.trim(),
                firstName: row['First Name'] || '',
                lastName: row['Last Name'] || '',
                email: row['Email'] || '',
                phone: row['Phone'] || '',
                department: row['Department'] || '',
                designation: row['Designation'] || '',
                dateOfJoining: row['Date of Joining'] || '',
                salary: row['Salary'] || '',
                employeeId: row['Employee ID'] || '',
                status: 'Active'
            }));

            // Add employees to context
            addEmployees(importedEmployees);
            markStepComplete('add-employees');

            setUploadedFile(null);
            setPreviewData([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            toast.success(`Successfully imported ${importedEmployees.length} employees`);

            // Redirect back to employees or complete
            if (onComplete) {
                onComplete();
            } else {
                router.push('/admin/employees');
            }
        } catch (error) {
            toast.error('Failed to import employees');
            console.error('Import error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Import Employees</h2>
                <p className="text-gray-600">
                    Bulk import your employees using a CSV or Excel file. Download our template to get started.
                </p>
            </div>

            {/* Template Download Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Step 1: Download Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Download one of our templates to see the required format for importing employees.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Button
                            onClick={() => downloadTemplate('csv')}
                            variant="outline"
                            className="w-full"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download CSV Template
                        </Button>
                        <Button
                            onClick={() => downloadTemplate('excel')}
                            variant="outline"
                            className="w-full"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download Excel Template
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Upload Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Step 2: Upload Your File</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Click to upload or drag and drop
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            CSV or Excel file (max. 5MB)
                        </p>
                        {uploadedFile && (
                            <p className="text-sm text-green-600 font-medium">
                                ✓ {uploadedFile.name}
                            </p>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </CardContent>
            </Card>

            {/* Preview Section */}
            {previewData.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            Preview ({previewData.length} employees)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Email</th>
                                        <th className="px-4 py-2 text-left">Department</th>
                                        <th className="px-4 py-2 text-left">Designation</th>
                                        <th className="px-4 py-2 text-left">Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewData.map((row, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">
                                                {row['First Name']} {row['Last Name']}
                                            </td>
                                            <td className="px-4 py-2">{row['Email']}</td>
                                            <td className="px-4 py-2">{row['Department']}</td>
                                            <td className="px-4 py-2">{row['Designation']}</td>
                                            <td className="px-4 py-2">{row['Salary']}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Instructions Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Required Fields
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex gap-2 text-sm">
                            <span className="text-red-600 font-bold">*</span>
                            <span><strong>First Name</strong> - Employee's first name</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span className="text-red-600 font-bold">*</span>
                            <span><strong>Last Name</strong> - Employee's last name</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span className="text-red-600 font-bold">*</span>
                            <span><strong>Email</strong> - Valid email address</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span><strong>Phone</strong> - Contact number</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span><strong>Department</strong> - Department name</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span><strong>Designation</strong> - Job title</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span><strong>Date of Joining</strong> - YYYY-MM-DD format</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span><strong>Salary</strong> - Annual salary amount</span>
                        </li>
                        <li className="flex gap-2 text-sm">
                            <span><strong>Employee ID</strong> - Unique employee identifier</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleImport}
                    disabled={previewData.length === 0 || isProcessing}
                >
                    {isProcessing ? 'Importing...' : 'Import Employees'}
                </Button>
            </div>
        </div>
    );
}