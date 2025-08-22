'use client';

import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { Label } from './label';

interface ReusableSelectProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export function ReusableSelect({
  options,
  value,
  label,
  onChange,
  placeholder = 'Select an option',
  className = 'w-full mt-2 text-xs ',
  required,
  error,
  ...props
}: ReusableSelectProps) {
  return (
    <>
      <Label required={required}>{label}</Label>
      <Select onValueChange={onChange} value={value || undefined} {...props}>
        <SelectTrigger className={`${className} ${error ? 'border-2 border-red-600' : ''}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value: val, label }) => (
            <SelectItem className="text-xs" key={val} value={val}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
