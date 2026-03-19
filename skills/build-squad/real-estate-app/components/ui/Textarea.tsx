'use client';

import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  ...rest
}: TextareaProps) {
  return (
    <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0e6b6e] focus:outline-none focus:ring-2 focus:ring-[#0e6b6e]/20 disabled:bg-gray-50 disabled:text-gray-500 resize-y"
        {...rest}
      />
    </div>
  );
}
