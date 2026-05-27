'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: 'dashboard' },
  { href: '/input', label: 'Input', icon: 'input' },
  { href: '/riwayat', label: 'Riwayat', icon: 'history' },
];

function NavIcon({ icon, active }: { icon: string; active: boolean }) {
  const iconClass = cn('w-5 h-5', active ? 'text-primary' : 'text-text-muted');

  switch (icon) {
    case 'dashboard':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-2h2v20h-2zm4 4h2v16h-2z" />
        </svg>
      );
    case 'input':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      );
    case 'history':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed left-0 top-0 h-screen w-56 bg-white border-r border-border-light py-6 px-4">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">💰 Keuangan</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                isActive
                  ? 'bg-primary-light text-primary font-semibold'
                  : 'text-text-dark hover:bg-[#F5F5F5]'
              )}
            >
              <NavIcon icon={item.icon} active={isActive} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
