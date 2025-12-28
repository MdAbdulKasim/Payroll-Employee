'use client';

import { useState, useEffect } from 'react';
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
  const [editingLocation, setEditingLocation] = useState<WorkLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/work-locations');
        // const data = await response.json();
        // setLocations(data);
        
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLocations([]);
      } catch (error) {
        toast.error('Failed to load work locations');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleAddLocation = async (locationData: Omit<WorkLocation, 'id' | 'createdAt'>) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/work-locations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(locationData)
      // });
      // const newLocation = await response.json();

      const newLocation: WorkLocation = {
        id: `LOC_${Date.now()}`,
        ...locationData,
        createdAt: new Date().toISOString(),
      };

      setLocations([...locations, newLocation]);
      setShowAddDialog(false);
      setEditingLocation(null);
      toast.success('Work location added successfully');
    } catch (error) {
      toast.error('Failed to add work location');
      console.error('Error:', error);
    }
  };

  const handleEditLocation = async (locationData: Omit<WorkLocation, 'id' | 'createdAt'>) => {
    if (!editingLocation) return;

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/work-locations/${editingLocation.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(locationData)
      // });
      // const updatedLocation = await response.json();

      setLocations(
        locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...loc, ...locationData }
            : loc
        )
      );

      setShowAddDialog(false);
      setEditingLocation(null);
      toast.success('Work location updated successfully');
    } catch (error) {
      toast.error('Failed to update work location');
      console.error('Error:', error);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work location?')) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/work-locations/${id}`, {
      //   method: 'DELETE'
      // });

      setLocations(locations.filter((loc) => loc.id !== id));
      toast.success('Work location deleted successfully');
    } catch (error) {
      toast.error('Failed to delete work location');
      console.error('Error:', error);
    }
  };

  const openAddDialog = () => {
    setEditingLocation(null);
    setShowAddDialog(true);
  };

  const openEditDialog = (location: WorkLocation) => {
    setEditingLocation(location);
    setShowAddDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-5xl">
          <div className="flex items-center justify-center py-16">
            <p className="text-gray-600">Loading work locations...</p>
          </div>
        </div>
      </div>
    );
  }

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
