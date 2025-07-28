import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

function Textarea({ label, required = false, error, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label required={required} htmlFor={props.name}>
        {label}
      </Label>
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input mt-2 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-[4rem] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error &&
            'border-destructive ring-1 ring-destructive/50 focus-visible:ring-destructive/50 focus-visible:border-destructive',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export { Textarea };
