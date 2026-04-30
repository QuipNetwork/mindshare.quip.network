import type { ReactNode } from 'react';

interface EmProps {
  children: ReactNode;
  className?: string;
}

export function Em({ children, className = '' }: EmProps) {
  return (
    <em className={`font-normal italic tracking-[-0.04em] ${className}`}>
      {children}
    </em>
  );
}
