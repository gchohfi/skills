import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={[
        'rounded-lg shadow-md p-6 bg-white border border-gray-100',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
