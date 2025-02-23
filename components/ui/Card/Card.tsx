import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-dark-800 shadow-sm rounded-lg border border-gray-200 dark:border-dark-700 ${className}`}>
      {children}
    </div>
  );
}