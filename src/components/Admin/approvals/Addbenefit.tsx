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

interface AddBenefitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (benefit: Omit<Benefit, 'id' | 'assignedEmployees' | 'totalAmount'>) => void;
  initialData?: Benefit | null;
}

export const AddBenefitDialog: React.FC<AddBenefitDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  initialData 
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

  // Sample employee list
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

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        selectedEmployees: initialData.selectedEmployees || [],
        name: initialData.name,
        type: initialData.type,
        status: initialData.status,
        limitAmount: initialData.limitAmount,
        frequency: initialData.frequency,
        requiresApproval: initialData.requiresApproval,
        description: initialData.description
      });
      setNameSearch(initialData.name);
      setTypeSearch(initialData.type);
      setEmployeeSearch('');
    } else {
      setFormData({
        selectedEmployees: [],
        name: '',
        type: '',
        status: 'active',
        limitAmount: 0,
        frequency: 'Monthly',
        requiresApproval: true,
        description: ''
      });
      setNameSearch('');
      setTypeSearch('');
      setEmployeeSearch('');
    }
  }, [initialData, open]);

  // Close dropdowns when clicking outside
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

  // Predefined benefit names
  const benefitNames = [
    'Petrol Allowance',
    'Housing Allowance',
    'Travel Allowance',
    'Meal Allowance',
    'Internet Allowance',
    'Health Insurance',
    'Education Allowance',
    'Phone Allowance',
    'Fitness Allowance',
    'Transportation Allowance',
    'Medical Allowance',
    'Book Allowance',
    'Uniform Allowance',
    'Parking Allowance',
    'Child Care Allowance'
  ];

  // Predefined benefit types
  const benefitTypes = [
    'Travel',
    'Accommodation',
    'Food',
    'Utility',
    'Insurance',
    'Education',
    'Communication',
    'Health & Wellness',
    'Transportation',
    'Personal Development',
    'Family Support',
    'Entertainment'
  ];

  // Frequency options
  const frequencies = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly', 'One-time'];

  // Approval options
  const approvalOptions = ['Yes', 'No'];

  // Status options
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Filter employees based on search
  const filteredEmployees = allEmployees.filter(emp => 
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  // Filter benefit names based on search
  const filteredNames = benefitNames.filter(name => 
    name.toLowerCase().includes(nameSearch.toLowerCase())
  );

  // Filter benefit types based on search
  const filteredTypes = benefitTypes.filter(type => 
    type.toLowerCase().includes(typeSearch.toLowerCase())
  );

  // Handle employee selection
  const handleEmployeeToggle = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter(id => id !== employeeId)
        : [...prev.selectedEmployees, employeeId]
    }));
  };

  // Handle select all employees
  const handleSelectAllEmployees = () => {
    if (formData.selectedEmployees.length === filteredEmployees.length) {
      setFormData(prev => ({ ...prev, selectedEmployees: [] }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        selectedEmployees: filteredEmployees.map(emp => emp.id) 
      }));
    }
  };

  // Get selected employee names for display
  const getSelectedEmployeeNames = () => {
    const selected = allEmployees.filter(emp => 
      formData.selectedEmployees.includes(emp.id)
    );
    if (selected.length === 0) return '';
    if (selected.length === 1) return selected[0].name;
    if (selected.length === allEmployees.length) return 'All Employees';
    return `${selected.length} Employees Selected`;
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation
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
    
    // Reset form
    setFormData({
      selectedEmployees: [],
      name: '',
      type: '',
      status: 'active',
      limitAmount: 0,
      frequency: 'Monthly',
      requiresApproval: true,
      description: ''
    });
    setNameSearch('');
    setTypeSearch('');
    setEmployeeSearch('');
  };

  // Handle cancel
  const handleCancel = () => {
    onOpenChange(false);
    // Reset form after animation
    setTimeout(() => {
      setFormData({
        selectedEmployees: [],
        name: '',
        type: '',
        status: 'active',
        limitAmount: 0,
        frequency: 'Monthly',
        requiresApproval: true,
        description: ''
      });
      setNameSearch('');
      setTypeSearch('');
      setEmployeeSearch('');
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={handleCancel}
      />
      
      {/* Dialog */}
      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {initialData ? 'Edit Benefit' : 'Add Benefit'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {initialData ? 'Update benefit details' : 'Create a new employee benefit'}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Employee Name Field with Checkbox Dropdown */}
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
                    {/* Select All Option */}
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
                    
                    {/* Employee List */}
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
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
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

            {/* Name Field with Search Dropdown */}
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
                          className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer text-sm transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-700">{name}</span>
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

            {/* Type Field with Search Dropdown */}
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
                          className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer text-sm transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-700">{type}</span>
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

            {/* Status Field */}
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
              {/* Limit Amount */}
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

              {/* Frequency */}
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
                {approvalOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
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
              {initialData ? 'Update Benefit' : 'Save Benefit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Component
export default function Demo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Dialog
      </button>
      
      <AddBenefitDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          alert('Benefit saved successfully!');
          setOpen(false);
        }}
      />
    </div>
  );
}