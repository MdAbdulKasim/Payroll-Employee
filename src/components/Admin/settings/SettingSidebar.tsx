'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  MapPin,
  Building2,
  BadgeCheck,
  Users,
  Shield,
  Settings as SettingsIcon,
  Calendar,
  DollarSign,
  FileText,
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
    icon: <User className="h-5 w-5" />,
  },
  {
    group: 'ORGANIZATION SETTINGS',
    label: 'Work Locations',
    href: '/admin/settings/worklocation',
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    group: 'ORGANIZATION SETTINGS',
    label: 'Departments',
    href: '/settings/departments',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    group: 'ORGANIZATION SETTINGS',
    label: 'Designations',
    href: '/settings/designations',
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    group: 'USERS AND ROLES',
    label: 'Users',
    href: '/settings/users',
    icon: <Users className="h-5 w-5" />,
  },
  {
    group: 'USERS AND ROLES',
    label: 'Roles',
    href: '/settings/roles',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    group: 'PAYROLL SETTINGS',
    label: 'Setup & Configuration',
    href: '/settings/setup-configuration',
    icon: <SettingsIcon className="h-5 w-5" />,
  },
  {
    group: 'PAYROLL SETTINGS',
    label: 'Pay Schedule',
    href: '/settings/pay-schedule',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    group: 'PAYROLL SETTINGS',
    label: 'Salary Components',
    href: '/settings/salary-components',
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    group: 'PAYROLL SETTINGS',
    label: 'Statutory Components',
    href: '/settings/statutory-components',
    icon: <FileText className="h-5 w-5" />,
  },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

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
    <aside className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        </div>

        {groupedItems.map((group) => (
          <div key={group.group}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {group.group}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`${
                        isActive ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}