"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Image as ImageIcon,
  Calendar,
  User,
  FolderOpen,
  FileImage,
  Eye
} from 'lucide-react';

interface FileData {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'file';
  uploadedDate: string;
  preview?: string;
}

interface FolderDetails {
  id: string;
  folderName: string;
  description: string;
  createdDate: string;
  createdBy: string;
  category: string;
  files: FileData[];
}

const EmployeeFolderDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams?.get('id') || '1';

  // Mock data - Replace with actual data fetching
  const [folderDetails] = useState<FolderDetails>({
    id: folderId,
    folderName: 'Employee Contract 2025',
    description: 'Employment contract documents and related paperwork for new hires in 2025. Includes signed agreements, terms and conditions, and employee acknowledgment forms.',
    createdDate: '30/06/2025',
    createdBy: 'HR Admin',
    category: 'Contracts',
    files: [
      {
        id: '1',
        name: 'Employment_Contract_John_Doe.pdf',
        size: '856 KB',
        type: 'file',
        uploadedDate: '30/06/2025'
      },
      {
        id: '2',
        name: 'ID_Proof_Document.pdf',
        size: '645 KB',
        type: 'file',
        uploadedDate: '30/06/2025'
      },
      {
        id: '3',
        name: 'Employee_Photo.jpg',
        size: '342 KB',
        type: 'image',
        uploadedDate: '30/06/2025',
        preview: 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Employee+Photo'
      },
      {
        id: '4',
        name: 'Signed_Agreement.pdf',
        size: '1.1 MB',
        type: 'file',
        uploadedDate: '30/06/2025'
      },
      {
        id: '5',
        name: 'Qualification_Certificate.pdf',
        size: '789 KB',
        type: 'file',
        uploadedDate: '30/06/2025'
      }
    ]
  });

  const handleView = (file: FileData) => {
    // Implement view logic
    console.log('Viewing:', file.name);
    
    if (file.type === 'image' && file.preview) {
      // Open image in new window/tab
      window.open(file.preview, '_blank');
    } else {
      // For PDFs and other files, you would typically open a viewer
      alert(`Opening ${file.name} in viewer...`);
      // In a real application, you might do:
      // window.open(`/api/files/view/${file.id}`, '_blank');
    }
  };

  const handleDownload = (fileName: string) => {
    // Implement download logic
    console.log('Downloading:', fileName);
    alert(`Downloading ${fileName}...`);
  };

  const handleDownloadAll = () => {
    console.log('Downloading all files...');
    alert('Downloading all files as ZIP...');
  };

  const handleBack = () => {
    router.back();
  };

  const getFileIcon = (type: 'image' | 'file') => {
    return type === 'image' ? (
      <FileImage className="w-8 h-8 text-green-600" />
    ) : (
      <FileText className="w-8 h-8 text-green-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FolderOpen className="w-6 h-6 text-green-600" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Employee
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {folderDetails.folderName}
              </h1>
            </div>
            <Button
              onClick={handleDownloadAll}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
        </div>

        {/* Folder Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Folder Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="mt-1 text-gray-900">{folderDetails.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="mt-1 text-gray-900">{folderDetails.category}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created Date</label>
                    <p className="text-gray-900">{folderDetails.createdDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created By</label>
                    <p className="text-gray-900">{folderDetails.createdBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Uploaded Files ({folderDetails.files.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {folderDetails.files.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No files uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {folderDetails.files.map((file) => (
                  <div
                    key={file.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex flex-col h-full">
                      {/* File Preview/Icon */}
                      <div className="mb-3">
                        {file.type === 'image' && file.preview ? (
                          <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-40 bg-green-50 rounded-lg flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                          {file.name}
                        </h3>
                        <div className="space-y-1 text-xs text-gray-500">
                          <p>Size: {file.size}</p>
                          <p>Uploaded: {file.uploadedDate}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <Button
                          onClick={() => handleView(file)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Eye className="w-3 h-3 mr-2" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDownload(file.name)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Download className="w-3 h-3 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeFolderDetailsPage;