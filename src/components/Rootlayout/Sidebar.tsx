// components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  User,
  Bell,
  X,
  ChevronDown,
  Building2
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <CreditCard size={20} />, label: 'Salary Details', href: '/salary' },
    { icon: <TrendingUp size={20} />, label: 'Investment', href: '/investment' },
    { icon: <FileText size={20} />, label: 'Documents', href: '/documents/payslips' },
    { icon: <User size={20} />, label: 'Profile', href: '/profile' },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#f8fafc] border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-md">
              <Building2 size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">PayrollPro</h1>
              <span className="text-xs text-gray-500 font-medium">Employee Portal</span>
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
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      font-medium text-sm transition-all duration-200
                      ${isActive
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                      }
                    `}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
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