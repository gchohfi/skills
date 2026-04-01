'use client';
import { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const v = {
  primary: 'bg-[#e2c799] text-[#0f172a] hover:bg-[#d4b57e] focus:ring-[#e2c799]',
  secondary: 'border border-[#e2c799] text-[#e2c799] bg-transparent hover:bg-[#e2c799]/10 focus:ring-[#e2c799]',
  ghost: 'text-gray-600 bg-transparent hover:bg-gray-100 focus:ring-gray-400',
};
const s = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-base' };

export default function Button({ variant = 'primary', size = 'md', loading = false, children, className = '', disabled, ...rest }: ButtonProps) {
  return (
    <button disabled={disabled || loading} className={['inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed', v[variant], s[size], className].join(' ')} {...rest}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
