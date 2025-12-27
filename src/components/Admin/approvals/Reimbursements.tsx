'use client';

import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Users, DollarSign, Gift } from 'lucide-react';
import { AddBenefitDialog } from './Addbenefit';
import { EditBenefitDialog } from './EditBenefitDialog';

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

// Main Benefits Management Page
const BenefitsManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);

  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: 'BEN001',
      name: 'Petrol Allowance',
      type: 'Travel',
      limitAmount: 5000,
      frequency: 'Monthly',
      requiresApproval: true,
      description: 'Monthly petrol reimbursement for official travel',
      assignedEmployees: 25,
      totalAmount: 125000,
      status: 'active',
      selectedEmployees: ['1', '2', '3']
    },
    {
      id: 'BEN002',
      name: 'Housing Allowance',
      type: 'Accommodation',
      limitAmount: 15000,
      frequency: 'Monthly',
      requiresApproval: false,
      description: 'Monthly housing rent allowance',
      assignedEmployees: 40,
      totalAmount: 600000,
      status: 'active',
      selectedEmployees: ['1', '2', '3', '4']
    },
    {
      id: 'BEN003',
      name: 'Travel Allowance',
      type: 'Travel',
      limitAmount: 10000,
      frequency: 'Monthly',
      requiresApproval: true,
      description: 'Business travel and transportation costs',
      assignedEmployees: 30,
      totalAmount: 300000,
      status: 'active',
      selectedEmployees: ['1', '2']
    },
    {
      id: 'BEN004',
      name: 'Meal Allowance',
      type: 'Food',
      limitAmount: 3000,
      frequency: 'Monthly',
      requiresApproval: false,
      description: 'Daily meal and refreshment allowance',
      assignedEmployees: 50,
      totalAmount: 150000,
      status: 'active',
      selectedEmployees: ['1', '2', '3', '4', '5']
    },
    {
      id: 'BEN005',
      name: 'Internet Allowance',
      type: 'Utility',
      limitAmount: 2000,
      frequency: 'Monthly',
      requiresApproval: false,
      description: 'Home internet and connectivity expenses',
      assignedEmployees: 45,
      totalAmount: 90000,
      status: 'active',
      selectedEmployees: ['1', '2', '3', '4', '5']
    },
    {
      id: 'BEN006',
      name: 'Health Insurance',
      type: 'Insurance',
      limitAmount: 50000,
      frequency: 'Yearly',
      requiresApproval: false,
      description: 'Annual health insurance coverage',
      assignedEmployees: 55,
      totalAmount: 2750000,
      status: 'active',
      selectedEmployees: ['1', '2', '3', '4', '5', '6']
    }
  ]);

  const handleAddBenefit = (benefit: Omit<Benefit, 'id' | 'assignedEmployees' | 'totalAmount'>) => {
    const newBenefit: Benefit = {
      ...benefit,
      id: `BEN${String(benefits.length + 1).padStart(3, '0')}`,
      assignedEmployees: benefit.selectedEmployees?.length || 0,
      totalAmount: (benefit.selectedEmployees?.length || 0) * benefit.limitAmount
    };
    setBenefits([...benefits, newBenefit]);
    setIsDialogOpen(false);
  };

  const handleEditBenefit = (benefit: Omit<Benefit, 'id' | 'assignedEmployees' | 'totalAmount'>) => {
    if (editingBenefit) {
      setBenefits(benefits.map(b => 
        b.id === editingBenefit.id 
          ? { 
              ...b, 
              ...benefit,
              assignedEmployees: benefit.selectedEmployees?.length || 0,
              totalAmount: (benefit.selectedEmployees?.length || 0) * benefit.limitAmount
            }
          : b
      ));
      setEditingBenefit(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this benefit?')) {
      setBenefits(benefits.filter(b => b.id !== id));
    }
  };

  const openAddDialog = () => {
    setIsDialogOpen(true);
  };

  const openEditDialog = (benefit: Benefit) => {
    setEditingBenefit(benefit);
    setIsEditDialogOpen(true);
  };

  const benefitTypes = ['all', ...Array.from(new Set(benefits.map(b => b.type)))];

  const filteredBenefits = benefits.filter((b) => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || b.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalBenefits = benefits.length;
  const totalEmployees = benefits.reduce((sum, b) => sum + b.assignedEmployees, 0);
  const totalBudget = benefits.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Employee Benefits</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">Create and manage employee benefits and allowances</p>
          </div>
          <button
            onClick={openAddDialog}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Add Benefit
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Benefits</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">{totalBenefits}</p>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg">
                <Gift className="text-blue-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Assigned Employees</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{totalEmployees}</p>
              </div>
              <div className="bg-green-100 p-2 md:p-3 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">₹{totalBudget.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-2 md:p-3 rounded-lg">
                <DollarSign className="text-purple-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, ID, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {benefitTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilterType(type)}
                  className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg transition-colors capitalize ${
                    filterType === type 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {filteredBenefits.map((benefit) => (
            <div key={benefit.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{benefit.name}</p>
                  <p className="text-xs text-gray-500">{benefit.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  benefit.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {benefit.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{benefit.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Limit:</span>
                  <span className="font-semibold text-blue-600">₹{benefit.limitAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium">{benefit.frequency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Assigned:</span>
                  <span className="font-medium">{benefit.assignedEmployees} employees</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Approval:</span>
                  <span className="font-medium">{benefit.requiresApproval ? 'Required' : 'Not Required'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => openEditDialog(benefit)}
                  className="flex items-center justify-center gap-1 border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                  <span className="text-xs">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(benefit.id)}
                  className="flex items-center justify-center gap-1 border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  <span className="text-xs">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Benefit ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Limit Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBenefits.map((benefit) => (
                  <tr key={benefit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {benefit.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{benefit.name}</div>
                        <div className="text-sm text-gray-500">{benefit.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {benefit.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₹{benefit.limitAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {benefit.frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {benefit.assignedEmployees} employees
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        benefit.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {benefit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditDialog(benefit)}
                          className="p-1.5 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(benefit.id)}
                          className="p-1.5 border-2 border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

      {/* Add Benefit Dialog */}
      <AddBenefitDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddBenefit}
      />

      {/* Edit Benefit Dialog */}
      <EditBenefitDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditBenefit}
        benefit={editingBenefit}
      />
    </div>
  );
};

export default BenefitsManagementPage;