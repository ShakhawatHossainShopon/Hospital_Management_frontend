import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

function Input({ label, required = false, error, className, type, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label required={required} htmlFor={props.name}>
        {label}
      </Label>
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground mt-1 placeholder:text-muted-foreground placeholder:text-xs placeholder:font-normal selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-8 w-full min-w-0 rounded-md border bg-transparent px-2 py-1 text-xs shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-xs file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          error &&
            'border-destructive ring-1 ring-destructive/50 focus-visible:ring-destructive/50 focus-visible:border-destructive',
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
