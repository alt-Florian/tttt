import { ReactNode } from 'react';

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-4 py-5 border-b border-gray-200 dark:border-dark-700 ${className}`}>
      {children}
    </div>
  );
}