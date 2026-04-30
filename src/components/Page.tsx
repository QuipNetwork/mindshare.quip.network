import type { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
  className?: string;
}

export function Page({ children, className = '' }: PageProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1184px] px-[clamp(20px,5.45vw,78px)] ${className}`}
    >
      {children}
    </div>
  );
}
