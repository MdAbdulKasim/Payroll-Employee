'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  MapPin,
  Building2,
  BadgeCheck,
  Users,
  Shield,
  Calendar,
  DollarSign,
  FileText,
  ChevronDown,
  Settings,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: ReactNode;
  group: string;
}

const sidebarItems: SidebarItem[] = [
  {
    group: 'ORGANIZATION SETTINGS',
    label: 'Profile',
    href: '/admin/settings',
    icon: <User className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'ORGANIZATION SETTINGS',
    label: 'Work Locations',
    href: '/admin/settings/worklocation',
    icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'ORGANIZATION SETTINGS',
    label: 'Departments',
    href: '/admin/settings/departments',
    icon: <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'ORGANIZATION SETTINGS',
    label: 'Designations',
    href: '/admin/settings/desginations',
    icon: <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'USERS AND ROLES',
    label: 'Users',
    href: '/admin/settings/users',
    icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'USERS AND ROLES',
    label: 'Roles',
    href: '/admin/settings/roles',
    icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'Setup & Configuration',
    label: 'Pay Schedule',
    href: '/admin/settings/payschedule',
    icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'Setup & Configuration',
    label: 'Salary Components',
    href: '/admin/settings/salary',
    icon: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    group: 'Setup & Configuration',
    label: 'Statutory Components',
    href: '/admin/settings/statutory',
    icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Find the currently active item
  const activeItem = sidebarItems.find((item) => pathname === item.href) || sidebarItems[0];

  // Group items by category
  const groupedItems = sidebarItems.reduce(
    (acc, item) => {
      const existing = acc.find((group) => group.group === item.group);
      if (existing) {
        existing.items.push(item);
      } else {
        acc.push({ group: item.group, items: [item] });
      }
      return acc;
    },
    [] as Array<{ group: string; items: SidebarItem[] }>
  );

  return (
    <>
      {/* Mobile Dropdown Menu (visible on small screens) */}
      <div className="lg:hidden w-full bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="p-3 sm:p-4">
          {/* Dropdown Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-haspopup="true"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-xs text-gray-500 truncate">Settings</p>
                <p className="text-sm font-medium text-gray-900 truncate">{activeItem.label}</p>
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden max-h-[60vh] overflow-y-auto">
              {groupedItems.map((group, groupIndex) => (
                <div key={group.group}>
                  {groupIndex > 0 && <div className="border-t border-gray-100" />}
                  <div className="px-3 sm:px-4 py-2 bg-gray-50">
                    <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {group.group}
                    </h3>
                  </div>
                  <nav className="py-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors ${isActive
                              ? 'bg-blue-50 text-blue-600 border-l-3 border-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span
                            className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'
                              }`}
                          >
                            {item.icon}
                          </span>
                          <span className="text-sm font-medium truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar (visible on large screens) */}
      <aside className="hidden lg:block w-64 xl:w-72 2xl:w-80 flex-shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-4 xl:p-6 space-y-6 xl:space-y-8">
          <div>
            <h2 className="text-base xl:text-lg font-semibold text-gray-900 mb-3 xl:mb-4">Settings</h2>
          </div>

          {groupedItems.map((group) => (
            <div key={group.group}>
              <h3 className="text-[10px] xl:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 xl:mb-3 px-2">
                {group.group}
              </h3>
              <nav className="space-y-0.5 xl:space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 xl:gap-3 px-2 xl:px-3 py-2 xl:py-2.5 rounded-lg transition-colors text-sm ${isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <span
                        className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'
                          }`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}