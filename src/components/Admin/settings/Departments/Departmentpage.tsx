"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  head: string;
  employees: number;
}

export default function DepartmentsManager() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    // TODO: Fetch departments from API
    // Example:
    // const fetchDepartments = async () => {
    //   const response = await fetch('/api/departments');
    //   const data = await response.json();
    //   setDepartments(data);
    // };
    // fetchDepartments();
  }, []);

  const handleAddDepartment = () => {
    router.push('/admin/settings/departments/add');
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      // TODO: Add API call here to delete department
      // Example:
      // await fetch(`/api/departments/${deleteId}`, {
      //   method: 'DELETE'
      // });
      
      setDepartments(prev => prev.filter(d => d.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">

          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Departments
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage organizational departments
                </p>
              </div>
              <Button
                onClick={handleAddDepartment}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Department Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Head
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Employees
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                      {dept.name}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-500">
                      {dept.head}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-500">
                      {dept.employees}
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex gap-3">
                        <Pencil
                          className="w-4 h-4 text-gray-600 cursor-pointer hover:text-green-600"
                          onClick={() =>
                            router.push(`/admin/settings/departments/edit/${dept.id}`)
                          }
                        />
                        <Trash2
                          className="w-4 h-4 text-gray-600 cursor-pointer hover:text-red-600"
                          onClick={() => setDeleteId(dept.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden divide-y divide-gray-200">
            {departments.map((dept) => (
              <div key={dept.id} className="p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium text-sm">{dept.name}</div>
                    <div className="text-xs text-gray-500">Head: {dept.head}</div>
                    <div className="text-xs text-gray-500">Employees: {dept.employees}</div>
                  </div>
                  <div className="flex gap-3">
                    <Pencil
                      className="w-4 h-4 cursor-pointer hover:text-green-600"
                      onClick={() =>
                        router.push(`/admin/settings/departments/edit/${dept.id}`)
                      }
                    />
                    <Trash2
                      className="w-4 h-4 cursor-pointer hover:text-red-600"
                      onClick={() => setDeleteId(dept.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-sm font-semibold">Delete Department?</h2>
              <X
                className="w-4 h-4 cursor-pointer text-gray-500"
                onClick={() => setDeleteId(null)}
              />
            </div>

            <div className="px-5 py-4 text-sm text-gray-600">
              Are you sure you want to delete this department?
            </div>

            <div className="flex justify-end gap-2 px-5 py-4 border-t">
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}