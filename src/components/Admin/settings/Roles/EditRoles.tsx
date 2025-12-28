"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const roleId = params.roleId as string;

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // TODO: Fetch role data from API
    // Example:
    // const fetchRole = async () => {
    //   const response = await fetch(`/api/roles/${roleId}`);
    //   const role = await response.json();
    //   setRoleName(role.name);
    //   setDescription(role.description);
    // };
    // fetchRole();
  }, [roleId]);

  const handleUpdateRole = () => {
    if (!roleName.trim() || !description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    // TODO: Add API call here to update role data
    // Example:
    // const updateRole = async () => {
    //   await fetch(`/api/roles/${roleId}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ roleName, description })
    //   });
    // };
    // updateRole();

    router.push("/admin/settings/roles");
  };

  const handleCancel = () => {
    router.push("/admin/settings/roles");
  };

  const handleClose = () => {
    router.push("/admin/settings/roles");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Edit Role
            </h1>

            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Role Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Role Name<span className="text-red-500">*</span>
              </Label>
              <Input
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="text-sm h-10"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Description<span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] resize-none text-sm"
                maxLength={250}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                onClick={handleUpdateRole}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9 px-5"
              >
                Update
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="text-sm h-9 px-5"
              >
                Cancel
              </Button>
            </div>

            <span className="text-xs sm:text-sm text-red-500">
              * indicates mandatory fields
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}