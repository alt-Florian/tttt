import { ReactNode } from 'react';

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={`px-4 py-5 ${className}`}>
      {children}
    </div>
  );
}