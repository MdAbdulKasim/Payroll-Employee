"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AddUserPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
  });

  const handleCancel = () => {
    router.push('/admin/settings/users');
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form data:', formData);
    // After successful submission, redirect to users page
    router.push('/admin/settings/users');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-full">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-gray-200">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Add User
            </h1>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Form Content */}
          <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <div className="space-y-6">
              {/* Row 1: Full Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-900">
                    Full Name<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    placeholder=""
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Row 2: Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-900">
                  Role<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                >
                  <SelectTrigger className="w-full h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-gray-500">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="hr-manager">HR Manager</SelectItem>
                    <SelectItem value="payroll-manager">Payroll Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 h-10"
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 h-10"
              >
                Cancel
              </Button>
              <div className="flex-1"></div>
              <p className="text-xs sm:text-sm text-red-500 w-full sm:w-auto text-center sm:text-right">
                * indicates mandatory fields
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;