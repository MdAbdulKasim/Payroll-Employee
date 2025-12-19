"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddReimbursementDialogProps {
  onClose: () => void;
  onSave: (component: any) => void;
  initialData?: any;
}

export default function AddReimbursementDialog({ onClose, onSave, initialData }: AddReimbursementDialogProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    limit: initialData?.limit || "",
    frequency: initialData?.frequency || "Monthly",
    requiresApproval: initialData?.requiresApproval || "Yes",
    description: initialData?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const component = {
      id: initialData?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
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
              {initialData ? "Edit Reimbursement Component" : "Add Reimbursement Component"}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Type</option>
                <option value="Medical">Medical</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Communication">Communication</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Limit Amount</label>
                <input
                  type="number"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  placeholder="e.g., 5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  <option>One-time</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requires Approval</label>
              <select
                value={formData.requiresApproval}
                onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details about this reimbursement"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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