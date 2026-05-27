import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-dark mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full border border-border-light rounded-lg px-3.5 py-3 text-base focus:border-primary focus:outline-none transition-colors duration-200',
          'placeholder:text-text-muted placeholder:opacity-60',
          error && 'border-negative focus:border-negative',
          className
        )}
        {...props}
      />
      {error && <p className="text-negative text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-text-muted text-sm mt-1">{helperText}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ label, error, helperText, className, id, ...props }: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-dark mb-2">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full border border-border-light rounded-lg px-3.5 py-3 text-base focus:border-primary focus:outline-none transition-colors duration-200 resize-none',
          'placeholder:text-text-muted placeholder:opacity-60',
          error && 'border-negative focus:border-negative',
          className
        )}
        {...props}
      />
      {error && <p className="text-negative text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-text-muted text-sm mt-1">{helperText}</p>}
    </div>
  );
}
