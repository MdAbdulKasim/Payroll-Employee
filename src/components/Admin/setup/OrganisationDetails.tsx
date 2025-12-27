import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface OrganizationDetailsProps {
    onComplete?: () => void;
}

export default function OrganizationDetails({ onComplete }: OrganizationDetailsProps) {
    const { setOrganizationData, markStepComplete, organizationData } = useApp();
    const [formData, setFormData] = useState({
        name: organizationData?.name || '',
        logo: organizationData?.logo || '',
        businessLocation: organizationData?.businessLocation || '',
        industry: organizationData?.industry || '',
        dateFormat: organizationData?.dateFormat || 'DD/MM/YYYY',
        address: organizationData?.address || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrganizationData(formData);
        markStepComplete('organization-details');
        if (onComplete) onComplete();
        toast.success('Organization details saved successfully');
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                    <Label>Organization Logo</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Click to upload logo</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB (240 x 240 recommended)</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name*</Label>
                    <Input
                        id="orgName"
                        placeholder="Enter organization name"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="businessLocation">Business Location*</Label>
                    <Select value={formData.businessLocation} onValueChange={(value: string) => handleChange('businessLocation', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="industry">Industry*</Label>
                    <Select value={formData.industry} onValueChange={(value: string) => handleChange('industry', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format*</Label>
                    <Select value={formData.dateFormat} onValueChange={(value: string) => handleChange('dateFormat', value)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="col-span-2 space-y-2">
                    <Label htmlFor="address">Organization Address*</Label>
                    <Input
                        id="address"
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('address', e.target.value)}
                        required
                    />
                </div>


            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                    Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Save & Continue
                </Button>
            </div>
        </form>
    );
}
