"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddDeductionDialogProps {
    onClose: () => void;
    onSave: (component: any) => void;
    initialData?: any;
}

export default function AddDeductionDialog({ onClose, onSave, initialData }: AddDeductionDialogProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        deductionType: initialData?.deductionType || "",
        frequency: initialData?.frequency || "Monthly",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const component = {
            id: initialData?.id || Date.now().toString(),
            name: formData.name,
            type: formData.deductionType,
            deductionType: formData.deductionType,
            frequency: formData.frequency,
            considerForEPF: false,
            considerForESI: false,
            status: initialData?.status || "Active" as const,
        };

        onSave(component);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {initialData ? "Edit Deduction Component" : "Add Deduction Component"}
                        </h2>
                        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deduction Type *</label>
                            <select
                                value={formData.deductionType}
                                onChange={(e) => setFormData({ ...formData, deductionType: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Deduction Type</option>
                                <option value="Professional Tax">Professional Tax</option>
                                <option value="EPF">EPF</option>
                                <option value="ESI">ESI</option>
                                <option value="Income Tax">Income Tax</option>
                                <option value="Notice Pay Deduction">Notice Pay Deduction</option>
                                <option value="Withheld Salary">Withheld Salary</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                            <select
                                value={formData.frequency}
                                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Monthly</option>
                                <option>Quarterly</option>
                                <option>Annually</option>
                                <option>One Time</option>
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
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}