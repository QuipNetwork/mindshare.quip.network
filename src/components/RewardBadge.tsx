const VARIANTS = {
  cyan: 'text-cyan bg-[rgba(0,212,255,0.1)]',
  pink: 'text-pink bg-[rgba(224,64,224,0.1)]',
  empty: 'text-text-muted bg-white/3',
} as const;

interface RewardBadgeProps {
  children: React.ReactNode;
  variant: keyof typeof VARIANTS;
}

export function RewardBadge({ children, variant }: RewardBadgeProps) {
  return (
    <span
      className={`inline-block min-w-16 rounded-[6px] px-3 py-[5px] text-center font-mono text-xs font-semibold ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
