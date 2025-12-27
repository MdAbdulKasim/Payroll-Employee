"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload, CheckCircle2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ImportLeaveProps {
    onComplete?: () => void;
}

export default function ImportLeave({ onComplete }: ImportLeaveProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewData, setPreviewData] = useState<any[]>([]);

    const downloadTemplate = (format: 'csv' | 'excel') => {
        const headers = [
            'Name',
            'Email',
            'Department',
            'Organization',
            'Month',
            'Loss of Pay'
        ];

        const sampleData = [
            ['John Doe', 'john.doe@company.com', 'Engineering', 'Tech Corp', 'January 2025', '2'],
            ['Jane Smith', 'jane.smith@company.com', 'Marketing', 'Tech Corp', 'January 2025', '0'],
            ['Mike Johnson', 'mike.johnson@company.com', 'Sales', 'Business Inc', 'February 2025', '1'],
            ['Sarah Williams', 'sarah.williams@company.com', 'HR', 'Tech Corp', 'February 2025', '3']
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
            link.setAttribute('download', 'leave_template.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('CSV template downloaded successfully');
        } else {
            const csvContent = [
                headers.join(','),
                ...sampleData.map(row => row.map(cell => `"${cell}"`).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'leave_template.xlsx');
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

                const expectedHeaders = [
                    'Name',
                    'Email',
                    'Department',
                    'Organization',
                    'Month',
                    'Loss of Pay'
                ];

                const hasValidHeaders = expectedHeaders.every(header => 
                    headers.some(h => h.toLowerCase() === header.toLowerCase())
                );

                if (!hasValidHeaders) {
                    toast.error('Invalid file format. Please use the provided template.');
                    return;
                }

                const data = lines.slice(1).filter(line => line.trim()).map(line => {
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
                toast.success(`File processed successfully. Found ${data.length} leave records`);
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
            await new Promise(resolve => setTimeout(resolve, 1500));

            const importedLeaveRecords = previewData.map((row, index) => ({
                id: `LEAVE_${Date.now()}_${index}`,
                name: row['Name'] || '',
                email: row['Email'] || '',
                department: row['Department'] || '',
                organization: row['Organization'] || '',
                month: row['Month'] || '',
                lossOfPay: parseInt(row['Loss of Pay'] || '0')
            }));

            // Get existing leave records from localStorage
            const existingLeave = localStorage.getItem('leaveRequests');
            let leaveRecords = [];
            
            if (existingLeave) {
                try {
                    leaveRecords = JSON.parse(existingLeave);
                } catch (error) {
                    console.error('Error parsing existing leave records:', error);
                }
            }

            // Merge and save
            const updatedLeaveRecords = [...leaveRecords, ...importedLeaveRecords];
            localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaveRecords));

            setUploadedFile(null);
            setPreviewData([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            toast.success(`Successfully imported ${importedLeaveRecords.length} leave records`);

            if (onComplete) {
                onComplete();
            } else {
                router.push('/admin/employee');
            }
        } catch (error) {
            toast.error('Failed to import leave records');
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Import Leave Records</h2>
                <p className="text-gray-600">
                    Bulk import leave records using a CSV or Excel file. Download our template to get started.
                </p>
            </div>

            {/* Template Download Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Step 1: Download Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Download one of our templates to see the required format for importing leave records.
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
                            Preview ({previewData.length} leave records)
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
                                        <th className="px-4 py-2 text-left">Organization</th>
                                        <th className="px-4 py-2 text-left">Month</th>
                                        <th className="px-4 py-2 text-left">Loss of Pay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewData.map((row, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{row['Name']}</td>
                                            <td className="px-4 py-2">{row['Email']}</td>
                                            <td className="px-4 py-2">{row['Department']}</td>
                                            <td className="px-4 py-2">{row['Organization']}</td>
                                            <td className="px-4 py-2">{row['Month']}</td>
                                            <td className="px-4 py-2">
                                                <span className={parseInt(row['Loss of Pay'] || '0') > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                                                    {row['Loss of Pay']} days
                                                </span>
                                            </td>
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
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-3 text-sm">Leave Information</h4>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Name</strong> - Employee's full name</span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Email</strong> - Employee's work email address</span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Department</strong> - Department name (e.g., Engineering, HR, Marketing)</span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Organization</strong> - Organization name (e.g., Tech Corp, Business Inc)</span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Month</strong> - Month and year (e.g., January 2025, February 2025)</span>
                                </li>
                                <li className="flex gap-2 text-sm">
                                    <span className="text-red-600 font-bold">*</span>
                                    <span><strong>Loss of Pay</strong> - Number of days without pay (numeric value, e.g., 0, 1, 2, 3)</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-sm text-blue-900">Important Notes:</h4>
                            <ul className="space-y-1 text-sm text-blue-800">
                                <li>• All fields marked with <span className="text-red-600">*</span> are required</li>
                                <li>• Loss of Pay must be a number (0 for no loss, or positive numbers for days)</li>
                                <li>• Month format should be consistent (e.g., "January 2025")</li>
                                <li>• Make sure email addresses are valid and properly formatted</li>
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
                    {isProcessing ? 'Importing...' : 'Import Leave Records'}
                </Button>
            </div>
        </div>
    );
}