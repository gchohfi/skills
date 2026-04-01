import { ReactNode } from 'react';

export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={['rounded-lg shadow-md p-6 bg-white border border-gray-100', className].join(' ')}>
      {children}
    </div>
  );
}
