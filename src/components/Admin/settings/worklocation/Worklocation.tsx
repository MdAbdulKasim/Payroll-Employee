'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import AddWorkLocationDialog from '@/components/Admin/settings/worklocation/Addworklocation';

export interface WorkLocation {
  id: string;
  locationName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt?: string;
}

export default function WorkLocationsPage() {
  const { organizationData, updateOrganization } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const hasLocation = organizationData?.businessLocation || organizationData?.address;

  const handleEditLocation = (locationData: Omit<WorkLocation, 'id' | 'createdAt'>) => {
    updateOrganization({
      businessLocation: locationData.locationName,
      address: locationData.address,
    });
    setShowAddDialog(false);
    toast.success('Work location updated successfully');
  };

  const openEditDialog = () => {
    setShowAddDialog(true);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Work Location</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your organization&apos;s primary work location</p>
          </div>
        </div>

        {/* Empty State / Location Card */}
        {!hasLocation ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16 space-y-4">
              <div className="text-center">
                <p className="text-gray-600 text-base sm:text-lg">No work location information available</p>
                <p className="text-sm text-gray-500 mt-1">Please complete the organization setup to add a location.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Single Location Card */
          <div className="space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      {organizationData.businessLocation || 'Primary Location'}
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <p>{organizationData.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                      onClick={openEditDialog}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {showAddDialog && (
        <AddWorkLocationDialog
          isOpen={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          onAdd={() => { }} // Not used anymore for adding
          onEdit={handleEditLocation}
          editingLocation={{
            id: 'primary',
            locationName: organizationData.businessLocation,
            address: organizationData.address,
            city: '', // These fields are not in organizationData yet
            state: '',
            country: '',
          }}
        />
      )}
    </div>
  );
}
