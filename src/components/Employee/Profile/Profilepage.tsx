"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Briefcase, Calendar, Building, User, CreditCard, Landmark, Hash, Camera } from 'lucide-react';

const MyProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-w-[280px] w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            View and manage your personal information.
          </p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-blue-500 border-none overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Avatar with Upload */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                      RS
                    </span>
                  )}
                </div>
                <label 
                  htmlFor="profile-upload" 
                  className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  Rahul Sharma
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm">
                    Planning
                  </span>
                  <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm">
                    Junior
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Single Table with All Information */}
        <Card className="p-4 sm:p-5 md:p-6 bg-white border border-gray-200">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  Personal Information
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900 break-all">
                      rahul.sharma@company.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Mobile</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      +91 9876543210
                    </p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Date of Birth</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      Jan 15, 1990
                    </p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Gender</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      Male
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Address</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      123, Main Road, Koramangala, Bangalore - 560095
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  Professional Information
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Employee ID */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Employee ID</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      EMP001
                    </p>
                  </div>
                </div>

                {/* Designation */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Designation</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      Senior Software Engineer
                    </p>
                  </div>
                </div>

                {/* Department */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Department</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      Engineering
                    </p>
                  </div>
                </div>

                {/* Date of Joining */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Date of Joining</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      01 Apr 2022
                    </p>
                  </div>
                </div>

                {/* Work Location */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Work Location</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      Bangalore, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  Statutory Information
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* PAN */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">PAN</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900 font-mono">
                      ABCDE1234F
                    </p>
                  </div>
                </div>

                {/* UAN */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">UAN</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900 font-mono">
                      101234567890
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  Payment Information
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Account Holder Name */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Account Holder Name</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      Rahul Sharma
                    </p>
                  </div>
                </div>

                {/* Account Number */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Account Number</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900 font-mono">
                      ••••••••••3456
                    </p>
                  </div>
                </div>

                {/* Bank Name */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Landmark className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Bank Name</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      HDFC/Axis Branch
                    </p>
                  </div>
                </div>

                {/* IFSC Code */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">IFSC Code</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900 font-mono">
                      HDFC0001234
                    </p>
                  </div>
                </div>

                {/* Account Type */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Account Type</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-900">
                      Savings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MyProfile