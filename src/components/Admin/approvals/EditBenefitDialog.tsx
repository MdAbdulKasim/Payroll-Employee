'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Types
interface Benefit {
  id: string;
  name: string;
  type: string;
  limitAmount: number;
  frequency: string;
  requiresApproval: boolean;
  description: string;
  assignedEmployees: number;
  totalAmount: number;
  status: 'active' | 'inactive';
  selectedEmployees?: string[];
}

interface EditBenefitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (benefit: Omit<Benefit, 'id' | 'assignedEmployees' | 'totalAmount'>) => void;
  benefit: Benefit | null;
}

export const EditBenefitDialog: React.FC<EditBenefitDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  benefit 
}) => {
  const [formData, setFormData] = useState({
    selectedEmployees: [] as string[],
    name: '',
    type: '',
    status: 'active' as 'active' | 'inactive',
    limitAmount: 0,
    frequency: 'Monthly',
    requiresApproval: true,
    description: ''
  });

  const [employeeSearch, setEmployeeSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const allEmployees = [
    { id: '1', name: 'Rajesh Kumar' },
    { id: '2', name: 'Priya Sharma' },
    { id: '3', name: 'Amit Patel' },
    { id: '4', name: 'Sneha Reddy' },
    { id: '5', name: 'Vikram Singh' },
    { id: '6', name: 'Deepika Iyer' },
    { id: '7', name: 'Arjun Mehta' },
    { id: '8', name: 'Kavita Nair' },
    { id: '9', name: 'Rahul Gupta' },
    { id: '10', name: 'Anjali Desai' }
  ];

  useEffect(() => {
    if (benefit && open) {
      setFormData({
        selectedEmployees: benefit.selectedEmployees || [],
        name: benefit.name,
        type: benefit.type,
        status: benefit.status,
        limitAmount: benefit.limitAmount,
        frequency: benefit.frequency,
        requiresApproval: benefit.requiresApproval,
        description: benefit.description
      });
      setNameSearch(benefit.name);
      setTypeSearch(benefit.type);
      setEmployeeSearch('');
    }
  }, [benefit, open]);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowEmployeeDropdown(false);
      setShowNameDropdown(false);
      setShowTypeDropdown(false);
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const benefitNames = [
    'Petrol Allowance', 'Housing Allowance', 'Travel Allowance', 'Meal Allowance',
    'Internet Allowance', 'Health Insurance', 'Education Allowance', 'Phone Allowance',
    'Fitness Allowance', 'Transportation Allowance', 'Medical Allowance', 'Book Allowance',
    'Uniform Allowance', 'Parking Allowance', 'Child Care Allowance'
  ];

  const benefitTypes = [
    'Travel', 'Accommodation', 'Food', 'Utility', 'Insurance', 'Education',
    'Communication', 'Health & Wellness', 'Transportation', 'Personal Development',
    'Family Support', 'Entertainment'
  ];

  const frequencies = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly', 'One-time'];
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const filteredEmployees = allEmployees.filter(emp => 
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const filteredNames = benefitNames.filter(name => 
    name.toLowerCase().includes(nameSearch.toLowerCase())
  );

  const filteredTypes = benefitTypes.filter(type => 
    type.toLowerCase().includes(typeSearch.toLowerCase())
  );

  const handleEmployeeToggle = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter(id => id !== employeeId)
        : [...prev.selectedEmployees, employeeId]
    }));
  };

  const handleSelectAllEmployees = () => {
    if (formData.selectedEmployees.length === allEmployees.length) {
      setFormData(prev => ({ ...prev, selectedEmployees: [] }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        selectedEmployees: allEmployees.map(emp => emp.id) 
      }));
    }
  };

  const handleSubmit = () => {
    if (formData.selectedEmployees.length === 0) {
      alert('Please select at least one employee');
      return;
    }
    if (!formData.name.trim()) {
      alert('Please enter a benefit name');
      return;
    }
    if (!formData.type.trim()) {
      alert('Please select a benefit type');
      return;
    }
    if (formData.limitAmount <= 0) {
      alert('Please enter a valid limit amount');
      return;
    }

    onSubmit(formData);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  if (!open || !benefit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={handleCancel}
      />
      
      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Benefit
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Update benefit details for {benefit.id}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Employee Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => {
                    setEmployeeSearch(e.target.value);
                    setShowEmployeeDropdown(true);
                  }}
                  onClick={() => setShowEmployeeDropdown(true)}
                  placeholder="Start typing..."
                  className="w-full px-3 py-2.5 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.25em 1.25em'
                  }}
                />
                {showEmployeeDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                    <div 
                      className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center gap-3"
                      onClick={handleSelectAllEmployees}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedEmployees.length === allEmployees.length && allEmployees.length > 0}
                        onChange={handleSelectAllEmployees}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-900">Select All</span>
                    </div>
                    
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <div
                          key={employee.id}
                          onClick={() => handleEmployeeToggle(employee.id)}
                          className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer text-sm transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                        >
                          <input
                            type="checkbox"
                            checked={formData.selectedEmployees.includes(employee.id)}
                            onChange={() => handleEmployeeToggle(employee.id)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{employee.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-3 text-sm text-gray-500 text-center">
                        No employees found
                      </div>
                    )}
                  </div>
                )}
              </div>
              {formData.selectedEmployees.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {allEmployees
                    .filter(emp => formData.selectedEmployees.includes(emp.id))
                    .map(emp => (
                      <span 
                        key={emp.id}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                      >
                        {emp.name}
                        <button
                          onClick={() => handleEmployeeToggle(emp.id)}
                          className="hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Benefit Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefit Name <span className="text-red-500">*</span>
              </label>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={nameSearch}
                  onChange={(e) => {
                    setNameSearch(e.target.value);
                    setFormData({ ...formData, name: e.target.value });
                    setShowNameDropdown(true);
                  }}
                  onClick={() => setShowNameDropdown(true)}
                  placeholder="Start typing..."
                  className="w-full px-3 py-2.5 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.25em 1.25em'
                  }}
                />
                {showNameDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                    {filteredNames.length > 0 ? (
                      filteredNames.map((name) => (
                        <div
                          key={name}
                          onClick={() => {
                            setNameSearch(name);
                            setFormData({ ...formData, name });
                            setShowNameDropdown(false);
                          }}
                          className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer text-sm transition-colors"
                        >
                          {name}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-3 text-sm text-gray-500 text-center">
                        No benefits found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Benefit Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefit Type <span className="text-red-500">*</span>
              </label>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={typeSearch}
                  onChange={(e) => {
                    setTypeSearch(e.target.value);
                    setFormData({ ...formData, type: e.target.value });
                    setShowTypeDropdown(true);
                  }}
                  onClick={() => setShowTypeDropdown(true)}
                  placeholder="Start typing..."
                  className="w-full px-3 py-2.5 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.25em 1.25em'
                  }}
                />
                {showTypeDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                    {filteredTypes.length > 0 ? (
                      filteredTypes.map((type) => (
                        <div
                          key={type}
                          onClick={() => {
                            setTypeSearch(type);
                            setFormData({ ...formData, type });
                            setShowTypeDropdown(false);
                          }}
                          className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer text-sm transition-colors"
                        >
                          {type}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-3 text-sm text-gray-500 text-center">
                        No types found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Limit Amount and Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Limit Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={formData.limitAmount || ''}
                    onChange={(e) => setFormData({ ...formData, limitAmount: Number(e.target.value) })}
                    placeholder="e.g., 5000"
                    min="0"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  {frequencies.map((freq) => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Requires Approval */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requires Approval
              </label>
              <select
                value={formData.requiresApproval ? 'Yes' : 'No'}
                onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.value === 'Yes' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details about this benefit"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleCancel}
              type="button"
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Update Benefit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};