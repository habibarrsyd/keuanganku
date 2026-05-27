import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string | number; label: string }>;
}

export function Select({
  label,
  error,
  helperText,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text-dark mb-2">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full border border-border-light rounded-lg px-3.5 py-3 text-base focus:border-primary focus:outline-none transition-colors duration-200 appearance-none cursor-pointer bg-white',
          'placeholder:text-text-muted placeholder:opacity-60',
          error && 'border-negative focus:border-negative',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-negative text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-text-muted text-sm mt-1">{helperText}</p>}
    </div>
  );
}
