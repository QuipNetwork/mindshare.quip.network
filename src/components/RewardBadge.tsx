const VARIANTS = {
  cyan: 'text-(--brand-cyan) bg-[#00d4ff]/10',
  pink: 'text-(--brand-pink) bg-[#ff00ff]/10',
} as const;

interface RewardBadgeProps {
  children: React.ReactNode;
  variant: keyof typeof VARIANTS;
}

export function RewardBadge({ children, variant }: RewardBadgeProps) {
  return (
    <span
      className={`inline-block rounded-md w-20 text-center py-2 text-xs font-mono font-medium ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
