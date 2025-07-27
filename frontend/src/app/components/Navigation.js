'use client';

import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { href: '/members', label: 'Members', icon: 'fas fa-users' },
    { href: '/attendance', label: 'Attendance', icon: 'fas fa-calendar-check' },
    { href: '/analytics', label: 'Analytics', icon: 'fas fa-chart-bar' },
    { href: '/bulk', label: 'Bulk Add', icon: 'fas fa-user-plus' },
  ];

  return (
    <div className="hidden sm:flex items-center space-x-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <a
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-700 text-white shadow-md border-b-2 border-white'
                : 'text-white hover:text-blue-200 hover:bg-blue-700/50'
            }`}
          >
            <i className={`${item.icon} mr-1`}></i>
            {item.label}
          </a>
        );
      })}
    </div>
  );
} 