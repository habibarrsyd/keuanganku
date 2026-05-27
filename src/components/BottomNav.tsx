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
  const iconClass = cn('w-6 h-6', active ? 'text-primary' : 'text-text-muted');

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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-light py-2 px-4 z-40">
      <div className="flex justify-around">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200 min-h-touch',
                isActive
                  ? 'text-primary'
                  : 'text-text-muted hover:text-text-dark'
              )}
            >
              <NavIcon icon={item.icon} active={isActive} />
              <span className={cn('text-xs', isActive && 'font-semibold')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
