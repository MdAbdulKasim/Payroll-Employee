"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, FileText } from 'lucide-react';

interface OrgFolder {
  id: string;
  folderName: string;
  description: string;
  createdDate: string;
  createdBy: string;
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'file';
}

const OrgFolderPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState({ folderName: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { folderName: '', description: '' };
    let isValid = true;

    if (!folderName.trim()) {
      newErrors.folderName = 'Folder name is required';
      isValid = false;
    } else if (folderName.trim().length < 3) {
      newErrors.folderName = 'Folder name must be at least 3 characters';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const fileData: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(),
        file: file,
        type: isImage ? 'image' : 'file',
      };

      if (isImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          fileData.preview = reader.result as string;
          setUploadedFiles(prev => [...prev, fileData]);
        };
        reader.readAsDataURL(file);
      } else {
        newFiles.push(fileData);
      }
    });

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }

    // Reset input
    e.target.value = '';
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newFolder: OrgFolder = {
        id: Date.now().toString(),
        folderName: folderName.trim(),
        description: description.trim(),
        createdDate: new Date().toLocaleDateString('en-GB'),
        createdBy: 'Current User',
      };

      // Here you would typically save to your backend/database
      console.log('Saving org folder:', newFolder);
      console.log('Uploaded files:', uploadedFiles);
      
      // You can also save to localStorage or send to API
      // Example: localStorage.setItem('orgFolders', JSON.stringify([...existingFolders, newFolder]));

      // Close dialog and navigate back
      setIsOpen(false);
      setTimeout(() => {
        router.back();
      }, 300);
    } catch (error) {
      console.error('Error saving folder:', error);
      alert('Failed to create org folder. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[280px] xs:max-w-sm sm:max-w-md md:max-w-lg p-0 gap-0">
        <DialogHeader className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
          <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
            New Org Folder
          </DialogTitle>
        </DialogHeader>

        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
          {/* Folder Name Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label 
              htmlFor="folderName" 
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              Folder Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="folderName"
              type="text"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                if (errors.folderName) {
                  setErrors({ ...errors, folderName: '' });
                }
              }}
              placeholder="Enter folder name"
              className={`w-full text-xs sm:text-sm h-8 sm:h-9 md:h-10 ${
                errors.folderName ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.folderName && (
              <p className="text-xs text-red-500 mt-1">{errors.folderName}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label 
              htmlFor="description" 
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              Description<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) {
                  setErrors({ ...errors, description: '' });
                }
              }}
              placeholder="Enter description"
              className={`w-full text-xs sm:text-sm min-h-[80px] sm:min-h-[100px] md:min-h-[120px] resize-none ${
                errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              rows={4}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* File Upload Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label 
              htmlFor="fileUpload" 
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              Upload Files or Photos
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="fileUpload"
                type="file"
                onChange={handleFileUpload}
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                className="w-full text-xs sm:text-sm h-8 sm:h-9 md:h-10 file:mr-2 file:px-2 file:py-1 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-medium text-gray-700">
                Uploaded Files ({uploadedFiles.length})
              </Label>
              <div className="border border-gray-200 rounded-md p-2 max-h-[200px] overflow-y-auto space-y-2">
                {uploadedFiles.map((uploadedFile, index) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {uploadedFile.type === 'image' && uploadedFile.preview ? (
                        <img
                          src={uploadedFile.preview}
                          alt={uploadedFile.file.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(uploadedFile.id)}
                      disabled={isSubmitting}
                      className="flex-shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 md:p-6 border-t border-gray-200">
          <Button
            onClick={handleSave}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 h-8 sm:h-9 md:h-10"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isSubmitting}
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 h-8 sm:h-9 md:h-10"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrgFolderPage;