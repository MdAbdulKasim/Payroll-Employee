"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddEarningDialogProps {
    onClose: () => void;
    onSave: (component: any) => void;
    initialData?: any;
}

export default function AddEarningDialog({ onClose, onSave, initialData }: AddEarningDialogProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        earningType: initialData?.earningType || "",
        calculationType: initialData?.calculationType || "Fixed; Flat Amount",
        considerForEPF: initialData?.considerForEPF || false,
        considerForESI: initialData?.considerForESI || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const component = {
            id: initialData?.id || Date.now().toString(),
            name: formData.name,
            type: formData.earningType,
            earningType: formData.earningType,
            calculationType: formData.calculationType,
            considerForEPF: formData.considerForEPF,
            considerForESI: formData.considerForESI,
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
                            {initialData ? "Edit Earning Component" : "Add Earning Component"}
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Earning Type *</label>
                            <select
                                value={formData.earningType}
                                onChange={(e) => setFormData({ ...formData, earningType: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Earning Type</option>
                                <option value="Basic">Basic</option>
                                <option value="House Rent Allowance">House Rent Allowance</option>
                                <option value="Conveyance Allowance">Conveyance Allowance</option>
                                <option value="Fixed Allowance">Fixed Allowance</option>
                                <option value="Bonus">Bonus</option>
                                <option value="Commission">Commission</option>
                                <option value="Overtime Allowance">Overtime Allowance</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
                            <input
                                type="text"
                                value={formData.calculationType}
                                onChange={(e) => setFormData({ ...formData, calculationType: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="considerForEPF"
                                    checked={formData.considerForEPF}
                                    onChange={(e) => setFormData({ ...formData, considerForEPF: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="considerForEPF" className="text-sm text-gray-700">
                                    Consider for EPF
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="considerForESI"
                                    checked={formData.considerForESI}
                                    onChange={(e) => setFormData({ ...formData, considerForESI: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="considerForESI" className="text-sm text-gray-700">
                                    Consider for ESI
                                </label>
                            </div>
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