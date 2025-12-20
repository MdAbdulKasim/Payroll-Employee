"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDown, Filter, X } from 'lucide-react';

interface Document {
  id: string;
  documentName: string;
  createdDate: string;
  category: string;
  size: string;
  uploadedBy: string;
  folderType: 'org' | 'employee';
}

const PayRunsPage = () => {
  const router = useRouter();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedFolderType, setSelectedFolderType] = useState<'all' | 'org' | 'employee'>('all');

  const [allDocuments] = useState<Document[]>([
    {
      id: '1',
      documentName: 'Employee_Contract_2025.pdf',
      createdDate: '30/06/2025',
      category: 'Contracts',
      size: '2.5 MB',
      uploadedBy: 'HR Admin',
      folderType: 'employee',
    },
    {
      id: '2',
      documentName: 'Payroll_Report_May.xlsx',
      createdDate: '15/06/2025',
      category: 'Payroll',
      size: '1.8 MB',
      uploadedBy: 'Finance Team',
      folderType: 'org',
    },
    {
      id: '3',
      documentName: 'Tax_Documents_Q2.pdf',
      createdDate: '10/06/2025',
      category: 'Tax',
      size: '3.2 MB',
      uploadedBy: 'Accounting',
      folderType: 'org',
    },
    {
      id: '4',
      documentName: 'Employee_Handbook_2025.pdf',
      createdDate: '05/06/2025',
      category: 'Policies',
      size: '5.1 MB',
      uploadedBy: 'HR Manager',
      folderType: 'org',
    },
    {
      id: '5',
      documentName: 'Benefits_Enrollment.xlsx',
      createdDate: '01/06/2025',
      category: 'Benefits',
      size: '920 KB',
      uploadedBy: 'Benefits Admin',
      folderType: 'employee',
    }
  ]);

  // Filter documents based on selected filters
  const filteredDocuments = allDocuments.filter(doc => {
    const matchesEmployee = !selectedEmployee || doc.uploadedBy === selectedEmployee;
    const matchesFolderType = selectedFolderType === 'all' || doc.folderType === selectedFolderType;
    return matchesEmployee && matchesFolderType;
  });

  const handleCreateDoc = (type: 'org' | 'employee') => {
    if (type === 'org') router.push('/admin/documents/orgfolder');
    else router.push('/admin/documents/empfolder');
  };

  const handleViewDetails = (doc: Document) => {
    // Navigate to appropriate details page based on folder type
    if (doc.folderType === 'org') {
      router.push(`/admin/documents/orgfolder/details`);
    } else {
      router.push(`/admin/documents/empfolder/details`);
    }
  };

  const clearFilters = () => {
    setSelectedEmployee('');
    setSelectedFolderType('all');
  };

  const hasActiveFilters = selectedEmployee || selectedFolderType !== 'all';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            All Documents
          </h1>

          <div className="flex items-center gap-2">
            {/* Split Button */}
            <div className="inline-flex rounded-md shadow-sm overflow-hidden">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-none"
                onClick={() => handleCreateDoc('org')}
              >
                Create Doc
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 rounded-l-none border-l border-blue-500"
                    aria-label="More options"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleCreateDoc('org')}>
                    Org Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCreateDoc('employee')}>
                    Employee Folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            FILTER BY :
          </span>

          {/* Folder Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-xs sm:text-sm h-8 sm:h-9">
                {selectedFolderType === 'all' ? 'Folder Type' : 
                 selectedFolderType === 'org' ? 'Organization' : 'Employee'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFolderType('all')}>
                All Folders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFolderType('org')}>
                Organization
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFolderType('employee')}>
                Employee
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs sm:text-sm h-8 sm:h-9"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-3 text-sm text-gray-600">
          Showing {filteredDocuments.length} of {allDocuments.length} documents
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-semibold uppercase">
                    Document Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Created Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Category
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Folder Type
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Size
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Uploaded By
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {doc.documentName}
                    </TableCell>
                    <TableCell>{doc.createdDate}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.folderType === 'org' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {doc.folderType === 'org' ? 'Organization' : 'Employee'}
                      </span>
                    </TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleViewDetails(doc)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tablet */}
          <div className="hidden md:block lg:hidden overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Document</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.documentName}</TableCell>
                    <TableCell>{doc.createdDate}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        doc.folderType === 'org' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {doc.folderType === 'org' ? 'Organization' : 'Employee'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 text-white"
                        onClick={() => handleViewDetails(doc)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">Document Name</div>
                      <div className="font-semibold">{doc.documentName}</div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      doc.folderType === 'org' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {doc.folderType === 'org' ? 'Organization' : 'Employee'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500">Date</div>
                      <div>{doc.createdDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Category</div>
                      <div>{doc.category}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Size</div>
                      <div>{doc.size}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Uploaded By</div>
                      <div>{doc.uploadedBy}</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 text-white"
                    onClick={() => handleViewDetails(doc)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium mb-2">No documents found</p>
              <p className="text-sm">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PayRunsPage;