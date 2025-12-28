'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface OrganizationFormData {
  logo?: File;
  organizationName: string;
  businessLocation: string;
  industry: string;
  dateFormat: string;
  organizationAddress: string;
  headOffice: string;
  headOfficeCity: string;
  headOfficeState: string;
  headOfficePincode: string;
  primaryContactEmail: string;
  secondaryContactEmail: string;
  secondaryContactName: string;
}

export default function SettingsProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: '',
    businessLocation: '',
    industry: '',
    dateFormat: 'DD/MM/YYYY (16/12/2025)',
    organizationAddress: '',
    headOffice: '',
    headOfficeCity: '',
    headOfficeState: '',
    headOfficePincode: '',
    primaryContactEmail: '',
    secondaryContactEmail: '',
    secondaryContactName: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    setFormData((prev) => ({ ...prev, logo: file }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeLogo = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    // Validation
    if (!formData.organizationName.trim()) {
      toast.error('Organization name is required');
      return;
    }
    if (!formData.businessLocation) {
      toast.error('Business location is required');
      return;
    }
    if (!formData.industry) {
      toast.error('Industry is required');
      return;
    }
    if (!formData.organizationAddress.trim()) {
      toast.error('Organization address is required');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically:
      // - Upload the logo if changed
      // - Save the form data to your backend
      // const response = await fetch('/api/organization', {
      //   method: 'POST',
      //   body: JSON.stringify(formData)
      // });

      toast.success('Organization settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to empty/default values
    setFormData({
      organizationName: '',
      businessLocation: '',
      industry: '',
      dateFormat: 'DD/MM/YYYY (16/12/2025)',
      organizationAddress: '',
      headOffice: '',
      headOfficeCity: '',
      headOfficeState: '',
      headOfficePincode: '',
      primaryContactEmail: '',
      secondaryContactEmail: '',
      secondaryContactName: '',
    });
    setLogoPreview(null);
    toast.info('Changes cancelled');
  };

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 max-w-5xl mx-auto lg:mx-0">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Organization Profile</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your organization&apos;s basic information</p>
        </div>

        {/* Organization Logo Section */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">Organization Logo</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 flex-shrink-0">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <Button
                  onClick={handleChangeLogo}
                  variant="outline"
                  className="mb-3 sm:mb-4 w-full sm:w-auto"
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Logo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  aria-label="Upload logo"
                />
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                  This logo will be displayed on documents such as Payclips and TDS Worksheet. Preferred image size: 240 × 240 pixels at 72/300 DPI. Maximum size: 2MB. Accepted formats: PNG, JPG, and JPEG.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organization Details Section */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4 sm:space-y-6">
            {/* Organization Name and Business Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="organizationName" className="text-xs sm:text-sm font-medium">
                  Organization Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  className="w-full text-sm"
                />
                <p className="text-[10px] sm:text-xs text-gray-500">
                  This is your registered business name which will appear in all forms and payslips.
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="businessLocation" className="text-xs sm:text-sm font-medium">
                  Business Location <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.businessLocation}
                  onValueChange={(value) => handleSelectChange('businessLocation', value)}
                >
                  <SelectTrigger id="businessLocation" className="text-sm">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Industry and Date Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="industry" className="text-xs sm:text-sm font-medium">
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleSelectChange('industry', value)}
                >
                  <SelectTrigger id="industry" className="text-sm">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="dateFormat" className="text-xs sm:text-sm font-medium">
                  Date Format <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.dateFormat}
                  onValueChange={(value) => handleSelectChange('dateFormat', value)}
                >
                  <SelectTrigger id="dateFormat" className="text-sm">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY (16/12/2025)">DD/MM/YYYY (16/12/2025)</SelectItem>
                    <SelectItem value="MM/DD/YYYY (12/16/2025)">MM/DD/YYYY (12/16/2025)</SelectItem>
                    <SelectItem value="YYYY-MM-DD (2025-12-16)">YYYY-MM-DD (2025-12-16)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Organization Address */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="organizationAddress" className="text-xs sm:text-sm font-medium">
                Organization Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="organizationAddress"
                name="organizationAddress"
                value={formData.organizationAddress}
                onChange={handleInputChange}
                placeholder="Enter organization address"
                className="w-full text-sm"
              />
              <p className="text-[10px] sm:text-xs text-gray-500">
                This will be considered as the address of your primary work location.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Head Office Section */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">Head Office</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="headOffice" className="text-xs sm:text-sm font-medium">
                  Head Office Address
                </Label>
                <Input
                  id="headOffice"
                  name="headOffice"
                  value={formData.headOffice}
                  onChange={handleInputChange}
                  placeholder="Enter head office address"
                  className="w-full text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="headOfficeCity" className="text-xs sm:text-sm font-medium">
                  City
                </Label>
                <Input
                  id="headOfficeCity"
                  name="headOfficeCity"
                  value={formData.headOfficeCity}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="w-full text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="headOfficeState" className="text-xs sm:text-sm font-medium">
                  State
                </Label>
                <Input
                  id="headOfficeState"
                  name="headOfficeState"
                  value={formData.headOfficeState}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  className="w-full text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="headOfficePincode" className="text-xs sm:text-sm font-medium">
                  Pincode
                </Label>
                <Input
                  id="headOfficePincode"
                  name="headOfficePincode"
                  value={formData.headOfficePincode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                  className="w-full text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Section */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="primaryContactEmail" className="text-xs sm:text-sm font-medium">
                Primary Contact Email
              </Label>
              <Input
                id="primaryContactEmail"
                name="primaryContactEmail"
                type="email"
                value={formData.primaryContactEmail}
                onChange={handleInputChange}
                placeholder="Enter primary contact email"
                className="w-full text-sm"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="secondaryContactName" className="text-xs sm:text-sm font-medium">
                Secondary Contact Name
              </Label>
              <Input
                id="secondaryContactName"
                name="secondaryContactName"
                value={formData.secondaryContactName}
                onChange={handleInputChange}
                placeholder="Enter secondary contact name"
                className="w-full text-sm"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="secondaryContactEmail" className="text-xs sm:text-sm font-medium">
                Secondary Contact Email
              </Label>
              <Input
                id="secondaryContactEmail"
                name="secondaryContactEmail"
                type="email"
                value={formData.secondaryContactEmail}
                onChange={handleInputChange}
                placeholder="Enter secondary contact email"
                className="w-full text-sm"
              />
              <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                You can configure the email addresses that would be used in the sender address field for emails sent from the system.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}