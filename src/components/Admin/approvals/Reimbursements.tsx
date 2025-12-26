'use client';

import React, { useState } from 'react';
import { Search, Download, Check, X, Eye, Calendar, DollarSign } from 'lucide-react';

// Types
interface Reimbursement {
  id: string;
  employeeName: string;
  employeeId: string;
  category: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  receipt?: string;
}

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'default' | 'sm';
}

// Dialog Component
const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg m-4">
        {children}
      </div>
    </div>
  );
};

const DialogContent: React.FC<DialogContentProps> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const DialogDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-gray-600 mt-1">{children}</p>
);

// Button Component
const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', size = 'default' }) => {
  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2';
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center justify-center rounded-lg font-medium transition-colors ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
};

// Main Component
const ReimbursementsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedReimbursement, setSelectedReimbursement] = useState<Reimbursement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([
    {
      id: 'RMB001',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      category: 'Travel',
      amount: 2500,
      date: '2025-12-20',
      status: 'pending',
      description: 'Client meeting in Mumbai - Flight and hotel expenses',
      receipt: 'receipt_001.pdf'
    },
    {
      id: 'RMB002',
      employeeName: 'Sarah Smith',
      employeeId: 'EMP002',
      category: 'Food',
      amount: 850,
      date: '2025-12-18',
      status: 'pending',
      description: 'Team lunch with clients',
      receipt: 'receipt_002.pdf'
    },
    {
      id: 'RMB003',
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      category: 'Office Supplies',
      amount: 1200,
      date: '2025-12-15',
      status: 'approved',
      description: 'Laptop accessories and office equipment',
      receipt: 'receipt_003.pdf'
    },
    {
      id: 'RMB004',
      employeeName: 'Emily Davis',
      employeeId: 'EMP004',
      category: 'Travel',
      amount: 3500,
      date: '2025-12-10',
      status: 'rejected',
      description: 'Conference attendance in Delhi',
      receipt: 'receipt_004.pdf'
    }
  ]);

  const handleApprove = (id: string): void => {
    setReimbursements(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r)
    );
    setSelectedReimbursement(null);
    setIsDialogOpen(false);
  };

  const handleReject = (id: string): void => {
    setReimbursements(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r)
    );
    setSelectedReimbursement(null);
    setIsDialogOpen(false);
  };

  const openDetails = (reimbursement: Reimbursement): void => {
    setSelectedReimbursement(reimbursement);
    setIsDialogOpen(true);
  };

  const filteredReimbursements = reimbursements.filter((r) => {
    const matchesSearch = r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = reimbursements.filter(r => r.status === 'pending').length;
  const totalAmount = filteredReimbursements.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reimbursement Approvals</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">Review and approve employee reimbursement requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2">{pendingCount}</p>
              </div>
              <div className="bg-orange-100 p-2 md:p-3 rounded-lg">
                <Calendar className="text-orange-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">₹{totalAmount.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg">
                <DollarSign className="text-blue-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600">This Month</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{reimbursements.length}</p>
              </div>
              <div className="bg-green-100 p-2 md:p-3 rounded-lg">
                <Check className="text-green-600" size={20} />
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
                placeholder="Search by name, ID, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg transition-colors ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('pending')}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg transition-colors ${filterStatus === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('approved')}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg transition-colors ${filterStatus === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Approved
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('rejected')}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg transition-colors ${filterStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {filteredReimbursements.map((reimbursement) => (
            <div key={reimbursement.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{reimbursement.employeeName}</p>
                  <p className="text-xs text-gray-500">{reimbursement.employeeId}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  reimbursement.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                  reimbursement.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {reimbursement.status.charAt(0).toUpperCase() + reimbursement.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium">{reimbursement.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{reimbursement.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-blue-600">₹{reimbursement.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(reimbursement.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                <Button
                  onClick={() => openDetails(reimbursement)}
                  className="border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
                  size="sm"
                >
                  <Eye size={16} className="mr-1" />
                  <span className="text-xs">View</span>
                </Button>
                {reimbursement.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => handleApprove(reimbursement.id)}
                      className="border-2 border-green-600 text-green-600 bg-white hover:bg-green-50"
                      size="sm"
                    >
                      <Check size={16} className="mr-1" />
                      <span className="text-xs">Approve</span>
                    </Button>
                    <Button
                      onClick={() => handleReject(reimbursement.id)}
                      className="border-2 border-red-600 text-red-600 bg-white hover:bg-red-50"
                      size="sm"
                    >
                      <X size={16} className="mr-1" />
                      <span className="text-xs">Reject</span>
                    </Button>
                  </>
                )}
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
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                {filteredReimbursements.map((reimbursement) => (
                  <tr key={reimbursement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reimbursement.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{reimbursement.employeeName}</div>
                        <div className="text-sm text-gray-500">{reimbursement.employeeId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reimbursement.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₹{reimbursement.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reimbursement.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reimbursement.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                        reimbursement.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reimbursement.status.charAt(0).toUpperCase() + reimbursement.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openDetails(reimbursement)}
                          className="p-1.5 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {reimbursement.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApprove(reimbursement.id)}
                              className="p-1.5 border-2 border-green-600 text-green-600 rounded hover:bg-green-50"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReject(reimbursement.id)}
                              className="p-1.5 border-2 border-red-600 text-red-600 rounded hover:bg-red-50"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={20} className="text-gray-500" />
            </button>
            <DialogHeader>
              <DialogTitle>Reimbursement Details</DialogTitle>
              <DialogDescription>
                View and manage reimbursement request
              </DialogDescription>
            </DialogHeader>

            {selectedReimbursement && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Request ID</p>
                    <p className="font-semibold text-sm md:text-base">{selectedReimbursement.id}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Status</p>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedReimbursement.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      selectedReimbursement.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedReimbursement.status.charAt(0).toUpperCase() + selectedReimbursement.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Employee Name</p>
                    <p className="font-semibold text-sm md:text-base">{selectedReimbursement.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Employee ID</p>
                    <p className="font-semibold text-sm md:text-base">{selectedReimbursement.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-sm md:text-base">{selectedReimbursement.category}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Amount</p>
                    <p className="font-semibold text-blue-600 text-sm md:text-base">₹{selectedReimbursement.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-sm md:text-base">{new Date(selectedReimbursement.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Receipt</p>
                    <button type="button" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                      <Download size={16} />
                      {selectedReimbursement.receipt}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs md:text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900 text-sm md:text-base">{selectedReimbursement.description}</p>
                </div>

                {selectedReimbursement.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      onClick={() => handleApprove(selectedReimbursement.id)}
                      className="flex-1 border-2 border-green-600 text-green-600 bg-white hover:bg-green-50"
                    >
                      <Check size={18} className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(selectedReimbursement.id)}
                      className="flex-1 border-2 border-red-600 text-red-600 bg-white hover:bg-red-50"
                    >
                      <X size={18} className="mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReimbursementsPage;