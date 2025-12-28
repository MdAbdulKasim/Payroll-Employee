'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface WorkLocation {
  id: string;
  locationName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt?: string;
}

interface AddWorkLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (location: Omit<WorkLocation, 'id' | 'createdAt'>) => void;
  onEdit: (location: Omit<WorkLocation, 'id' | 'createdAt'>) => void;
  editingLocation: WorkLocation | null;
}

export default function AddWorkLocationDialog({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  editingLocation,
}: AddWorkLocationDialogProps) {
  const [formData, setFormData] = useState({
    locationName: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingLocation) {
      setFormData({
        locationName: editingLocation.locationName || '',
        address: editingLocation.address || '',
        city: editingLocation.city || '',
        state: editingLocation.state || '',
        country: editingLocation.country || '',
      });
    } else {
      setFormData({
        locationName: '',
        address: '',
        city: '',
        state: '',
        country: '',
      });
    }
    setErrors({});
  }, [editingLocation, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.locationName?.trim()) {
      newErrors.locationName = 'Location name is required';
    }
    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Map back to what the parent expects if necessary, or just pass formData
      // Since the parent expects Omit<WorkLocation, 'id' | 'createdAt'>
      onEdit(formData as any);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      locationName: '',
      address: '',
      city: '',
      state: '',
      country: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingLocation ? 'Edit Work Location' : 'Add Work Location'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {editingLocation
                ? 'Update the work location details'
                : 'Add a new work location for your organization'}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Location Name */}
          <div className="space-y-2">
            <Label htmlFor="locationName" className="text-sm font-medium">
              Location Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="locationName"
              name="locationName"
              placeholder="e.g., Head Office"
              value={formData.locationName}
              onChange={handleInputChange}
              className={errors.locationName ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.locationName && (
              <p className="text-xs text-red-500">{errors.locationName}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              className={errors.address ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          {/* City and State */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className={errors.city ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="state"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className={errors.state ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              className={errors.country ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.country && (
              <p className="text-xs text-red-500">{errors.country}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? editingLocation
                  ? 'Updating...'
                  : 'Adding...'
                : editingLocation
                  ? 'Update Location'
                  : 'Add Location'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
