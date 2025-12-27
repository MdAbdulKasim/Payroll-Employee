'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import AddWorkLocationDialog from '@/components/Admin/settings/worklocation/Addworklocation';

interface WorkLocation {
  id: string;
  locationName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt?: string;
}

export default function WorkLocationsPage() {
  const [locations, setLocations] = useState<WorkLocation[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<WorkLocation | null>(null);

  const handleAddLocation = (locationData: Omit<WorkLocation, 'id' | 'createdAt'>) => {
    const newLocation: WorkLocation = {
      id: `LOC_${Date.now()}`,
      ...locationData,
      createdAt: new Date().toISOString(),
    };

    setLocations([...locations, newLocation]);
    setShowAddDialog(false);
    setEditingLocation(null);
    toast.success('Work location added successfully');
  };

  const handleEditLocation = (locationData: Omit<WorkLocation, 'id' | 'createdAt'>) => {
    if (!editingLocation) return;

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
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id));
    toast.success('Work location deleted successfully');
  };

  const openAddDialog = () => {
    setEditingLocation(null);
    setShowAddDialog(true);
  };

  const openEditDialog = (location: WorkLocation) => {
    setEditingLocation(location);
    setShowAddDialog(true);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Work Locations</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your organization&apos;s work locations</p>
          </div>
          <Button
            onClick={openAddDialog}
            className="w-fit sm:w-auto min-w-[200px] px-8 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>

        {/* Empty State */}
        {locations.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16 space-y-4">
              <div className="text-center">
                <p className="text-gray-600 text-base sm:text-lg">No work locations added yet</p>
              </div>
              <Button
                onClick={openAddDialog}
                className="w-fit sm:w-auto min-w-[200px] px-8 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Location
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Locations List */
          <div className="space-y-4">
            {locations.map((location) => (
              <Card key={location.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                        {location.locationName}
                      </h3>
                      <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                        <p>{location.address}</p>
                        <p>
                          {location.city}
                          {location.state && `, ${location.state}`}
                          {location.country && ` - ${location.country}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => openEditDialog(location)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteLocation(location.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      {showAddDialog && (
        <AddWorkLocationDialog
          isOpen={showAddDialog}
          onClose={() => {
            setShowAddDialog(false);
            setEditingLocation(null);
          }}
          onAdd={handleAddLocation}
          onEdit={handleEditLocation}
          editingLocation={editingLocation}
        />
      )}
    </div>
  );
}