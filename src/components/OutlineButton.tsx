import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function OutlineButton({
  children,
  className = '',
  ...rest
}: OutlineButtonProps) {
  return (
    <button
      {...rest}
      className={`border border-zinc-200 px-3 pt-2 pb-[7px] font-mono text-xs uppercase tracking-[0.4px] text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-950 ${className}`}
    >
      {children}
    </button>
  );
}
