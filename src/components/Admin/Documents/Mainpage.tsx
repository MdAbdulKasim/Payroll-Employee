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
import { ChevronDown, X } from 'lucide-react';

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
  const [allDocuments, setAllDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/documents');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch documents');
      // }
      // const data = await response.json();
      // setAllDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 min-w-0">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading documents...</p>
          </div>
        </main>
      </div>
    );
  }

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