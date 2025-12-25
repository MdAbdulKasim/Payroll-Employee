import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import AddEmployeeDialog from '@/components/Admin/dialogs/AddEmployeeDialog';

interface AddEmployeesProps {
    onComplete?: () => void;
}

export default function AddEmployees({ onComplete }: AddEmployeesProps) {
    const { employees, markStepComplete } = useApp();
    const [showAddEmployee, setShowAddEmployee] = useState(false);

    const handleSkip = () => {
        markStepComplete('add-employees');
        if (onComplete) onComplete();
        toast.info('You can add employees later from the Employees page');
    };

    const handleBulkImport = () => {
        toast.info('Bulk import feature - Upload CSV or Excel file');
    };

    return (
        <div className="space-y-6">
            <p className="text-gray-600">
                Add your employees to get started with payroll processing. You can add them individually or bulk import via CSV/Excel.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed hover:border-blue-400 transition-colors cursor-pointer" onClick={() => setShowAddEmployee(true)}>
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg mb-2">Add Employee</h3>
                        <p className="text-sm text-gray-600">
                            Add employees one at a time with complete details
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-dashed hover:border-blue-400 transition-colors cursor-pointer" onClick={handleBulkImport}>
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg mb-2">Bulk Import</h3>
                        <p className="text-sm text-gray-600">
                            Import multiple employees using CSV or Excel file
                        </p>
                    </CardContent>
                </Card>
            </div>

            {employees.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                        ✓ You have added {employees.length} employee{employees.length > 1 ? 's' : ''}
                    </p>
                </div>
            )}

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You can skip this step and add employees later. However, you'll need at least one employee to run payroll.
                </p>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleSkip}>
                    Skip for Now
                </Button>
                <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                        if (employees.length > 0) {
                            markStepComplete('add-employees');
                            if (onComplete) onComplete();
                        }
                    }}
                    disabled={employees.length === 0}
                >
                    Continue
                </Button>
            </div>

            {showAddEmployee && (
                <AddEmployeeDialog
                    open={showAddEmployee}
                    onClose={() => setShowAddEmployee(false)}
                />
            )}
        </div>
    );
}
