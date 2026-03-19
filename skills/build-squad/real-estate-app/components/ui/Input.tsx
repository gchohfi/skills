'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  ...rest
}: InputProps) {
  return (
    <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0e6b6e] focus:outline-none focus:ring-2 focus:ring-[#0e6b6e]/20 disabled:bg-gray-50 disabled:text-gray-500"
        {...rest}
      />
    </div>
  );
}
