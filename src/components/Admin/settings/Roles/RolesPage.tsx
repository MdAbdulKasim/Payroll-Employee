"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export default function RolesPage() {
  const router = useRouter();
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch roles from API
    // Example:
    // const fetchRoles = async () => {
    //   const response = await fetch('/api/roles');
    //   const data = await response.json();
    //   setRoles(data);
    // };
    // fetchRoles();
  }, []);

  const handleEdit = (roleId: string) => {
    router.push(`/admin/settings/roles/edit/${roleId}`);
  };

  const handleDeleteClick = (roleId: string) => {
    setRoleToDelete(roleId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (roleToDelete) {
      // TODO: Add API call here to delete role
      // Example:
      // await fetch(`/api/roles/${roleToDelete}`, {
      //   method: 'DELETE'
      // });
      
      setRoles(roles.filter(role => role.id !== roleToDelete));
      setRoleToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleCreateRole = () => {
    router.push('/admin/settings/roles/add');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header inside card */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Roles
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Manage system users and their access roles
              </p>
            </div>
            <Button
              onClick={handleCreateRole}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto whitespace-nowrap"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Create Role
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="text-left font-semibold text-gray-700 text-xs sm:text-sm py-3 px-4 sm:px-6">
                    Role Name
                  </th>
                  <th className="text-left font-semibold text-gray-700 text-xs sm:text-sm py-3 px-4 sm:px-6 hidden sm:table-cell">
                    Description
                  </th>
                  <th className="text-left font-semibold text-gray-700 text-xs sm:text-sm py-3 px-4 sm:px-6 hidden md:table-cell">
                    Permissions
                  </th>
                  <th className="text-right font-semibold text-gray-700 text-xs sm:text-sm py-3 px-4 sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {roles.map((role) => (
                  <tr
                    key={role.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 border-gray-300 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-gray-900 break-words">
                          {role.name}
                        </span>
                      </div>
                      {/* Mobile: Show description below name */}
                      <div className="sm:hidden mt-1 ml-5 text-xs text-gray-600">
                        {role.description}
                      </div>
                      {/* Mobile: Show permissions below */}
                      <div className="md:hidden mt-1 ml-5 flex flex-wrap gap-1">
                        {role.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6 hidden sm:table-cell">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {role.description}
                      </span>
                      {/* Tablet: Show permissions below if hidden */}
                      <div className="md:hidden mt-1 flex flex-wrap gap-1">
                        {role.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {role.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded text-xs bg-gray-100 text-gray-700"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEdit(role.id)}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Edit role"
                        >
                          <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(role.id)}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Delete role"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base sm:text-lg">
              Delete Role
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm">
              Are you sure you want to delete this role? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="text-xs sm:text-sm mt-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}