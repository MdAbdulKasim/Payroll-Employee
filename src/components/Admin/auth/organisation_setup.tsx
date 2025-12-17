"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

export default function OrganizationSetupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    businessLocation: "",
    industry: "",
    address: "",
    logo: "",
  });
  const [logoPreview, setLogoPreview] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.businessLocation ||
      !formData.industry ||
      !formData.address
    ) {
      return;
    }

    // Save organization data to localStorage or your state management solution
    const organizationData = {
      ...formData,
      dateFormat: "DD/MM/YYYY",
      headOfOrganization: "",
    };
    localStorage.setItem("organizationData", JSON.stringify(organizationData));
    localStorage.setItem("isAuthenticated", "true");

    // Redirect to dashboard
    router.push("/dashboard");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        handleChange("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    router.push("/login");
  };

  const isFormValid =
    formData.name &&
    formData.businessLocation &&
    formData.industry &&
    formData.address;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-2xl shadow-xl bg-white rounded-lg">
        <div className="p-6 space-y-1 border-b">
          <h1 className="text-2xl font-semibold text-gray-900">
            Organization Setup
          </h1>
          <p className="text-sm text-gray-500">
            Complete your organization details to continue
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-2">
              <label
                htmlFor="logo"
                className="text-sm font-medium text-gray-700"
              >
                Organization Logo
              </label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <label
                htmlFor="logo"
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block"
              >
                {logoPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-24 w-24 object-contain mb-2"
                    />
                    <p className="text-sm text-gray-600">Click to change logo</p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload logo
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </>
                )}
              </label>
            </div>

            {/* Organization Name and Business Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Organization Name*
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter organization name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="businessLocation"
                  className="text-sm font-medium text-gray-700"
                >
                  Business Location*
                </label>
                <select
                  id="businessLocation"
                  value={formData.businessLocation}
                  onChange={(e) =>
                    handleChange("businessLocation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select location</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label
                htmlFor="industry"
                className="text-sm font-medium text-gray-700"
              >
                Industry*
              </label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>

            {/* Organization Address */}
            <div className="space-y-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Organization Address*
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!isFormValid}
              >
                Continue to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}