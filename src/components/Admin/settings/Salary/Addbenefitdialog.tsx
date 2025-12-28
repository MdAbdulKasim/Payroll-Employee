import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddBenefitDialogProps {
    onClose: () => void;
    onSave: (component: any) => void;
    initialData?: any;
}

export default function AddBenefitDialog({ onClose, onSave, initialData }: AddBenefitDialogProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        benefitType: initialData?.benefitType || '',
        coverage: initialData?.coverage || 'Employee Only',
        contributionType: initialData?.contributionType || 'Company Paid'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const component = {
            id: Date.now().toString(),
            name: formData.name,
            type: formData.benefitType,
            benefitType: formData.benefitType,
            frequency: 'Recurring',
            considerForEPF: false,
            considerForESI: false,
            status: 'Active' as const
        };

        onSave(component);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {initialData ? "Edit Benefit Component" : "Add Benefit Component"}
                        </h2>
                        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Benefit Type *</label>
                            <select
                                value={formData.benefitType}
                                onChange={(e) => setFormData({ ...formData, benefitType: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Benefit Type</option>
                                <option value="Health Insurance">Health Insurance</option>
                                <option value="Life Insurance">Life Insurance</option>
                                <option value="Gratuity">Gratuity</option>
                                <option value="Provident Fund">Provident Fund</option>
                                <option value="Voluntary Provident Fund">Voluntary Provident Fund</option>
                                <option value="ESOP">Employee Stock Options</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Coverage</label>
                            <select
                                value={formData.coverage}
                                onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Employee Only</option>
                                <option>Employee + Spouse</option>
                                <option>Employee + Family</option>
                                <option>Senior Employees</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Type</label>
                            <select
                                value={formData.contributionType}
                                onChange={(e) => setFormData({ ...formData, contributionType: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Company Paid</option>
                                <option>Employee Paid</option>
                                <option>Shared</option>
                                <option>Voluntary</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4 justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}