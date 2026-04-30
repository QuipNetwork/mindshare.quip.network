interface MedalIconProps {
  place: number;
  className?: string;
}

export function MedalIcon({ place, className }: MedalIconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
    >
      <circle cx="14" cy="11" r="7" />
      <path d="M9 16 L7 25 L14 22 L21 25 L19 16" />
      <text
        x="14"
        y="14"
        textAnchor="middle"
        fontSize="8"
        fontWeight="500"
        fill="currentColor"
        stroke="none"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {String(place).padStart(2, '0')}
      </text>
    </svg>
  );
}
