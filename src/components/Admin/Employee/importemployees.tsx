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
            'Employee Name',
            'Employee ID',
            'Work Email',
            'Mobile Number',
            'Gender',
            'Work Location',
            'Designation',
            'Department',
            'Date of Joining',
            'Annual CTC',
            'Date of Birth',
            'Father\'s Name',
            'PAN',
            'Differently Abled Type',
            'Personal Email Address',
            'Residential Address',
            'City',
            'State',
            'PIN Code',
            'Account Holder Name',
            'Bank Name',
            'Account Number',
            'IFSC',
            'Account Type'
        ];

        const sampleData = [
            ['John Doe', 'EMP001', 'john.doe@company.com', '9876543210', 'Male', 'Mumbai', 'Senior Developer', 'Engineering', '01/15/2024', '900000', '05/20/1990', 'Robert Doe', 'ABCDE1234F', 'None', 'john.personal@gmail.com', '123 Main St, Apt 4B', 'Mumbai', 'Maharashtra', '400001', 'John Doe', 'HDFC Bank', '12345678901234', 'HDFC0001234', 'Savings'],
            ['Jane Smith', 'EMP002', 'jane.smith@company.com', '9876543211', 'Female', 'Bangalore', 'Marketing Manager', 'Marketing', '02/20/2024', '800000', '08/15/1988', 'Michael Smith', 'BCDEF2345G', 'None', 'jane.personal@gmail.com', '456 Park Ave, Floor 2', 'Bangalore', 'Karnataka', '560001', 'Jane Smith', 'ICICI Bank', '23456789012345', 'ICIC0002345', 'Current'],
            ['Mike Johnson', 'EMP003', 'mike.johnson@company.com', '9876543212', 'Male', 'Delhi', 'Sales Executive', 'Sales', '03/10/2024', '700000', '12/10/1992', 'David Johnson', 'CDEFG3456H', 'None', 'mike.personal@gmail.com', '789 Lake Road', 'Delhi', 'Delhi', '110001', 'Mike Johnson', 'SBI', '34567890123456', 'SBIN0003456', 'Savings']
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
        if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
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

                // Validate headers match expected format
                const expectedHeaders = [
                    'Employee Name',
                    'Employee ID',
                    'Work Email',
                    'Mobile Number',
                    'Gender',
                    'Work Location',
                    'Designation',
                    'Department',
                    'Date of Joining',
                    'Annual CTC',
                    'Date of Birth',
                    'Father\'s Name',
                    'PAN',
                    'Differently Abled Type',
                    'Personal Email Address',
                    'Residential Address',
                    'City',
                    'State',
                    'PIN Code',
                    'Account Holder Name',
                    'Bank Name',
                    'Account Number',
                    'IFSC',
                    'Account Type'
                ];

                const hasValidHeaders = expectedHeaders.every(header => 
                    headers.some(h => h.toLowerCase() === header.toLowerCase())
                );

                if (!hasValidHeaders) {
                    toast.error('Invalid file format. Please use the provided template.');
                    return;
                }

                const data = lines.slice(1).filter(line => line.trim()).map(line => {
                    // Handle CSV parsing with quoted values
                    const values: string[] = [];
                    let currentValue = '';
                    let insideQuotes = false;
                    
                    for (let i = 0; i < line.length; i++) {
                        const char = line[i];
                        
                        if (char === '"') {
                            insideQuotes = !insideQuotes;
                        } else if (char === ',' && !insideQuotes) {
                            values.push(currentValue.trim());
                            currentValue = '';
                        } else {
                            currentValue += char;
                        }
                    }
                    values.push(currentValue.trim());

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
                name: row['Employee Name'] || '',
                employeeId: row['Employee ID'] || '',
                email: row['Work Email'] || '',
                phone: row['Mobile Number'] || '',
                gender: row['Gender'] || '',
                workLocation: row['Work Location'] || '',
                designation: row['Designation'] || '',
                department: row['Department'] || '',
                dateOfJoining: row['Date of Joining'] || '',
                annualCTC: row['Annual CTC'] || '',
                dateOfBirth: row['Date of Birth'] || '',
                fatherName: row['Father\'s Name'] || row['Father\'s Name'] || '',
                pan: row['PAN'] || '',
                differentlyAbledType: row['Differently Abled Type'] || '',
                personalEmail: row['Personal Email Address'] || '',
                residentialAddress: row['Residential Address'] || '',
                city: row['City'] || '',
                state: row['State'] || '',
                pinCode: row['PIN Code'] || '',
                accountHolderName: row['Account Holder Name'] || '',
                bankName: row['Bank Name'] || '',
                accountNumber: row['Account Number'] || '',
                ifsc: row['IFSC'] || '',
                accountType: row['Account Type'] || '',
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
                                        <th className="px-4 py-2 text-left">Employee ID</th>
                                        <th className="px-4 py-2 text-left">Email</th>
                                        <th className="px-4 py-2 text-left">Department</th>
                                        <th className="px-4 py-2 text-left">Designation</th>
                                        <th className="px-4 py-2 text-left">CTC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewData.map((row, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{row['Employee Name']}</td>
                                            <td className="px-4 py-2">{row['Employee ID']}</td>
                                            <td className="px-4 py-2">{row['Work Email']}</td>
                                            <td className="px-4 py-2">{row['Department']}</td>
                                            <td className="px-4 py-2">{row['Designation']}</td>
                                            <td className="px-4 py-2">{row['Annual CTC']}</td>
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
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Personal Information</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Employee Name</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Employee ID</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Work Email</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Mobile Number</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Gender</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Date of Birth</strong> (mm/dd/yyyy)</span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Father's Name</strong></span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Work Information</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Work Location</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Designation</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Department</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Date of Joining</strong> (mm/dd/yyyy)</span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Annual CTC</strong></span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Bank Details</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Account Holder Name</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Bank Name</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Account Number</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>IFSC</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Account Type</strong> (Current/Savings)</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Other Details</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-sm">
                                    <span><strong>PAN</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Differently Abled Type</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Personal Email Address</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>Residential Address</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>City</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>State</strong></span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span><strong>PIN Code</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
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