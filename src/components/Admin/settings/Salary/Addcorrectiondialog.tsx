"use client";

import { useState } from "react";

interface AddCorrectionDialogProps {
    onClose: () => void;
    onSave: (component: any) => void;
    initialData?: any;
}

export default function AddCorrectionDialog({ onClose, onSave, initialData }: AddCorrectionDialogProps) {
    const [formData, setFormData] = useState({
        createCorrectionFor: initialData?.calculationType?.replace("Correction for ", "") || "",
        earningName: initialData?.name || "",
        isTaxable: true,
        considerForEPF: initialData?.considerForEPF || false,
        considerForESI: initialData?.considerForESI || true,
        showInPayslip: true,
        markAsActive: initialData?.status === "Active" || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const component = {
            id: Date.now().toString(),
            name: formData.earningName,
            type: "Correction",
            earningType: "Correction",
            calculationType: "Correction for " + formData.createCorrectionFor,
            considerForEPF: formData.considerForEPF,
            considerForESI: formData.considerForESI,
            status: formData.markAsActive ? "Active" : "Inactive",
        };

        onSave(component);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        New Correction Component
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Create Correction for */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-900">
                                Create Correction for <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.createCorrectionFor}
                                onChange={(e) =>
                                    setFormData({ ...formData, createCorrectionFor: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                required
                            >
                                <option value="">Overtime Allowance</option>
                                <option value="Basic">Basic</option>
                                <option value="House Rent Allowance">House Rent Allowance</option>
                                <option value="Conveyance Allowance">Conveyance Allowance</option>
                                <option value="Fixed Allowance">Fixed Allowance</option>
                                <option value="Bonus">Bonus</option>
                                <option value="Commission">Commission</option>
                                <option value="Overtime Allowance">Overtime Allowance</option>
                            </select>

                            {/* Info Box */}
                            <div className="p-3 bg-blue-50 rounded border border-blue-200 flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">ℹ</span>
                                <p className="text-sm text-gray-700">
                                    You can use this correction component to make corrections to{" "}
                                    <strong>Overtime Allowance</strong> in a pay run. It will have the same
                                    configuration as Overtime Allowance.
                                </p>
                            </div>
                        </div>

                        {/* Earning Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-900">
                                Earning Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.earningName}
                                onChange={(e) =>
                                    setFormData({ ...formData, earningName: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {/* Note */}
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-sm text-gray-700">
                                    <strong>Note:</strong> You will only be able to edit the Earning Name once
                                    the correction component is created. The change will be reflected in both new
                                    and existing employees.
                                </p>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="isTaxable"
                                    checked={formData.isTaxable}
                                    onChange={(e) =>
                                        setFormData({ ...formData, isTaxable: e.target.checked })
                                    }
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="isTaxable" className="text-sm text-gray-700">
                                    This is a taxable earning
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="considerForEPF"
                                    checked={formData.considerForEPF}
                                    onChange={(e) =>
                                        setFormData({ ...formData, considerForEPF: e.target.checked })
                                    }
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="considerForEPF" className="text-sm text-gray-700">
                                    Consider for EPF Contribution
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="considerForESI"
                                    checked={formData.considerForESI}
                                    onChange={(e) =>
                                        setFormData({ ...formData, considerForESI: e.target.checked })
                                    }
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="considerForESI" className="text-sm text-gray-700">
                                    Consider for ESI Contribution
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="showInPayslip"
                                    checked={formData.showInPayslip}
                                    onChange={(e) =>
                                        setFormData({ ...formData, showInPayslip: e.target.checked })
                                    }
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="showInPayslip" className="text-sm text-gray-700">
                                    Show this component in payslip
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="markAsActive"
                                    checked={formData.markAsActive}
                                    onChange={(e) =>
                                        setFormData({ ...formData, markAsActive: e.target.checked })
                                    }
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="markAsActive" className="text-sm text-gray-700">
                                    Mark this as Active
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                            >
                                Save
                            </button>
                        </div>

                        {/* Mandatory fields note */}
                        <p className="text-sm text-red-500 text-right">* indicates mandatory fields</p>
                    </form>
                </div>
            </div>
        </div>
    );
}