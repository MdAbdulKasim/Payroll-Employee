// components/Header.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, ChevronDown, Building2, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Optional: clear auth/session data here
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-gray-50 border-b border-gray-200 z-40">
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
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              AMS
            </span>
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
          <div
            className="relative flex items-center gap-3 pl-3 border-l border-gray-200"
            ref={dropdownRef}
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">Naveen</p>
              <p className="text-xs text-gray-500">
                Building A - Main Facility
              </p>
            </div>

            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
            >
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">N</span>
              </div>
              <ChevronDown
                size={16}
                className="text-gray-500 hidden sm:block"
              />
            </button>

            {/* Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 top-14 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={()=> router.push('/profile')}>
                  <User size={16} />
                  View My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
