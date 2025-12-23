"use client";
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DesignationsTable = () => {
  const router = useRouter();

  const [designations, setDesignations] = useState([
    {
      id: 1,
      designation: 'Software Engineer',
      department: 'Engineering',
      level: 'Junior',
      employees: 0
    },
    {
      id: 2,
      designation: 'HR Manager',
      department: 'Human Resources',
      level: 'Senior',
      employees: 0
    }
  ]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleAddDesignation = () => {
    router.push('/admin/settings/desginations/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/settings/desginations/edit`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setDesignations(prev =>
      prev.filter(item => item.id !== selectedId)
    );
    setShowDeleteDialog(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setSelectedId(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Designations
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Manage job designations and positions
              </p>
            </div>
            <button
              onClick={handleAddDesignation}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Designation</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Designation
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Department
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Level
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Employees
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {designations.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                      {item.designation}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                      {item.department}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                      {item.level}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                      {item.employees}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="w-8 h-8 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="w-8 h-8 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {designations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No designations found</p>
          </div>
        )}
      </div>

      {/* 🔴 Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={cancelDelete}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Designation?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this designation?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignationsTable;
