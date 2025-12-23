"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CreateRolePage() {
  const router = useRouter();
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    router.push('/admin/settings/roles');
  };

  const handleCreateRole = () => {
    if (!roleName.trim() || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically save the role data
    console.log('Creating role:', { roleName, description });
    
    // Navigate back
    router.push('/admin/settings/roles');
  };

  const handleCancel = () => {
    router.push('/admin/settings/roles');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                New Role
              </h1>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
            {/* Row 1: Role Name and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Role Name Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="roleName" 
                  className="text-sm font-medium text-gray-700"
                >
                  Role Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="roleName"
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder=""
                  className="w-full text-sm h-10"
                />
              </div>

              {/* Description Field */}
              {/* <div className="space-y-2">
                <Label 
                  htmlFor="roleCode" 
                  className="text-sm font-medium text-gray-700"
                >
                  Role Code
                </Label>
                <Input
                  id="roleCode"
                  type="text"
                  placeholder=""
                  className="w-full text-sm h-10"
                />
              </div> */}
            </div>

            {/* Row 2: Permissions/Level Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="description" 
                className="text-sm font-medium text-gray-700"
              >
                Description<span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Max 250 characters"
                className="w-full text-sm min-h-[120px] resize-none"
                maxLength={250}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleCreateRole}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9 px-5"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="text-sm h-9 px-5"
              >
                Cancel
              </Button>
            </div>
            <div className="text-xs sm:text-sm text-red-500">
              * indicates mandatory fields
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}