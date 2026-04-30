import type { ReactNode } from 'react';

const heroGradient =
  'linear-gradient(to right, var(--color-grad-yellow-warm) 0%, var(--color-grad-yellow) 32.69%, var(--color-grad-lime) 59.9%, var(--color-grad-cyan-pale) 75.42%, var(--color-grad-cyan) 86.91%, var(--color-grad-lilac) 100%)';

export function EyebrowLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-stretch gap-1">
      <span
        className="inline-flex items-center px-2.5 pt-[5px] pb-1 font-mono text-[13px] font-medium uppercase leading-[1.15] tracking-[0.4px] text-zinc-950"
        style={{ backgroundImage: heroGradient }}
      >
        {children}
      </span>
    </div>
  );
}
