
// components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileCheck,
  Banknote,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  Home,
  CreditCard,
  TrendingUp,
  User,
  Building2,
  X,
  LogOut,
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isAction?: boolean;
  onClick?: () => void;
}

interface MenuSection {
  items: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'admin' | 'employee';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, mode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [approvalsOpen, setApprovalsOpen] = useState(false);

  // Get stored mode from localStorage (set during login)
  const storedMode = typeof window !== 'undefined' 
    ? localStorage.getItem('user_role') 
    : null;

  // Resolve mode: use prop, pathname check, or stored mode
  const resolvedMode =
    mode ??
    (pathname?.startsWith('/admin') ? 'admin' :
      pathname?.startsWith('/employee') ? 'employee' :
        storedMode === 'admin' ? 'admin' : 'employee');

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
    router.push('/login');
  };

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  // Admin Navigation Items
  const adminSections: MenuSection[] = [
    {
      items: [
        { icon: <LayoutDashboard size={18} />, label: 'Dashboard', href: '/admin/setup' },
        { icon: <Users size={18} />, label: 'Employees', href: '/admin/employee' },
        { icon: <CalendarCheck size={18} />, label: 'Pay Runs', href: '/admin/payruns' },
        { icon: <Banknote size={18} />, label: 'Loans', href: '/admin/loans' },
        { icon: <FileText size={18} />, label: 'Documents', href: '/admin/documents' },
        { icon: <BarChart3 size={18} />, label: 'Reports', href: '/admin/reports' },
        { icon: <Settings size={18} />, label: 'Settings', href: '/admin/settings' },
      ]
    }
  ];

  const approvalItems = [
    { label: 'Reimbursements', href: '/admin/approvals/reimbursements' },
    { label: 'Proof of Investment', href: '/admin/approvals/investment' },
    { label: 'Salary Revision', href: '/admin/approvals/salary-revision' },
  ];

  // Employee Navigation Items
  const employeeSections: MenuSection[] = [
    {
      items: [
        { icon: <Home size={18} />, label: 'Dashboard', href: '/employee/dashboard' },
        { icon: <CreditCard size={18} />, label: 'Salary Details', href: '/employee/salary' },
        { icon: <TrendingUp size={18} />, label: 'Investment', href: '/employee/investment' },
        { icon: <FileText size={18} />, label: 'Documents', href: '/employee/documents/payslips' },
        { icon: <User size={18} />, label: 'Profile', href: '/employee/profile' },
      ]
    }
  ];

  const systemMenuItems: MenuItem[] = [
    // { icon: <LogOut size={18} />, label: 'Logout', href: '#', isAction: true, onClick: handleLogout }
  ];

  const menuSections: MenuSection[] =
    resolvedMode === 'admin' ? adminSections : employeeSections;

  const showApprovals = resolvedMode === 'admin';
  const isApprovalsActive = pathname?.startsWith('/admin/approvals') || false;

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50',
          'bg-white border-r border-gray-200',
          'transform transition-all duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'w-64',
          'flex flex-col'
        )}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-md">
              <Building2 size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                PayrollPro
              </h1>
              <span className="text-xs text-gray-500 font-medium">
                {resolvedMode === 'admin' ? 'Admin Portal' : 'Employee Portal'}
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {/* Regular Navigation Items */}
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <ul className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + '/');

                  const linkClasses = cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  );

                  if (item.isAction) {
                    return (
                      <li key={itemIdx}>
                        <button
                          onClick={() => {
                            item.onClick?.();
                            onClose();
                          }}
                          className={cn(
                            linkClasses,
                            'hover:bg-red-50 hover:text-red-700'
                          )}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={linkClasses}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Collapsible Approvals Section (Admin Only) */}
          {showApprovals && (
            <div className="mb-6">
              <button
                onClick={() => setApprovalsOpen(!approvalsOpen)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isApprovalsActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <FileCheck className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">Approvals</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    approvalsOpen && 'transform rotate-180'
                  )}
                />
              </button>

              {/* Collapsible Content */}
              {approvalsOpen && (
                <div className="pl-12 mt-1 space-y-1">
                  {approvalItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block px-4 py-2 text-sm rounded-md transition-colors',
                        pathname === item.href
                          ? 'text-blue-700 bg-blue-50 font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* System Menu Items (Logout) */}
          <div className="border-t border-gray-200 pt-4">
            <ul className="space-y-1">
              {systemMenuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      item.onClick?.();
                      onClose();
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      'text-gray-700 hover:bg-red-50 hover:text-red-700'
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;