// components/Header.tsx
'use client';

import React, { useState } from 'react';
import { Bell, Menu, ChevronDown, Building2 } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-md">
              <Building2 size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">AMS</span>
          </div>
        </div>

        {/* Right: User Info + Notifications */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">Naveen</p>
              <p className="text-xs text-gray-500">Building A - Main Facility</p>
            </div>
            <button className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded-lg transition-colors">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">N</span>
              </div>
              <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;