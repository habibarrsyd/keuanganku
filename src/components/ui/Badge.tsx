import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variantClasses = {
    default: 'bg-primary-light text-primary',
    success: 'bg-[#E8F5E9] text-positive',
    danger: 'bg-[#FFEBEE] text-negative',
    warning: 'bg-[#FFF8E1] text-[#F57C00]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
