"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function EditDepartmentPage() {
  const router = useRouter();
  const params = useParams();
  const departmentId = params.id as string;

  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
    description: "",
  });

  /* -------------------------------------------------
     Mock fetch (replace with API later)
  --------------------------------------------------*/
  useEffect(() => {
    // Simulated existing department data
    const existingDepartment = {
      id: departmentId,
      departmentName: "Engineering",
      departmentCode: "ENG",
      description: "Handles all engineering tasks",
    };

    setFormData({
      departmentName: existingDepartment.departmentName,
      departmentCode: existingDepartment.departmentCode,
      description: existingDepartment.description,
    });
  }, [departmentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!formData.departmentName.trim()) {
      alert("Department Name is required");
      return;
    }

    // Update logic (API later)
    console.log("Updating department:", {
      id: departmentId,
      ...formData,
    });

    router.push("/admin/settings/departments");
  };

  const handleCancel = () => {
    router.push("/admin/settings/departments");
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-start justify-center p-4 pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit Department
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Department Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Code
              </label>
              <input
                type="text"
                name="departmentCode"
                value={formData.departmentCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              maxLength={250}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Max 250 characters"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-3">
              <Button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Update
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
              >
                Cancel
              </Button>
            </div>
            <div className="text-xs text-red-500">
              * Indicates mandatory fields
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
