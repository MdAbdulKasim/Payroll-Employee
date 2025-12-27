// components/Layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

// Number of required setup steps (must match SetupWizard.tsx)
const REQUIRED_SETUP_STEPS = 5;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const pathname = usePathname();

  // Check if current route is admin portal
  const isAdminPortal = pathname?.startsWith('/admin');

  // Check setup completion status from localStorage
  useEffect(() => {
    const checkSetupStatus = () => {
      if (typeof window !== 'undefined') {
        const savedSteps = localStorage.getItem('completedSteps');
        if (savedSteps) {
          try {
            const completedSteps = JSON.parse(savedSteps);
            setIsSetupComplete(completedSteps.length >= REQUIRED_SETUP_STEPS);
          } catch (error) {
            console.error('Error parsing completed steps:', error);
            setIsSetupComplete(false);
          }
        } else {
          setIsSetupComplete(false);
        }
      }
    };

    // Initial check
    checkSetupStatus();

    // Listen for storage changes (from other tabs) and poll for changes
    const handleStorageChange = () => checkSetupStatus();
    window.addEventListener('storage', handleStorageChange);

    // Poll for changes every 500ms to catch updates from same tab
    const interval = setInterval(checkSetupStatus, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Sidebar is only disabled for admin portal when setup is not complete
  // Employee portal sidebar is always enabled
  const isSidebarDisabled = isAdminPortal && !isSetupComplete;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - always enabled */}
      <Header
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Sidebar - disabled only for admin portal until setup is complete */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        disabled={isSidebarDisabled}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content - adjusts based on sidebar state */}
      <main 
        className={`
          transition-all duration-300 ease-in-out
          pt-20
          ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;