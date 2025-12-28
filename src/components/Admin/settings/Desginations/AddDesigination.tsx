"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AddDesignationPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    designation: '',
    department: '',
    level: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    // TODO: Add API call here to save designation data
    // Example:
    // const saveDesignation = async () => {
    //   await fetch('/api/designations', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    // };
    // saveDesignation();
    
    router.back();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-start justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-200 mt-4 sm:mt-8 md:mt-12">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-gray-200">
          <div className="flex-1">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              New Designation
            </h1>
          </div>
          <button
            onClick={handleCancel}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors ml-4"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
          {/* Row 1: Designation Title and Department Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Designation Title */}
            <div>
              <label 
                htmlFor="designation" 
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Designation Title<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label 
                htmlFor="department" 
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Department Code
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 2: Level (Description as textarea) */}
          <div>
            <label 
              htmlFor="level" 
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
            >
              Level
            </label>
            <textarea
              id="level"
              name="level"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              placeholder="Max 250 characters"
              rows={4}
              maxLength={250}
              className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 md:p-6 border-t border-gray-200">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <button
              onClick={handleSubmit}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors min-w-[70px]"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors min-w-[70px]"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-red-500 order-1 sm:order-2">
            * indicates mandatory fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddDesignationPage;