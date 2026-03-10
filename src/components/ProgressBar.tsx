interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-(--brand-purple-dark)">
      <div
        className="h-full rounded-full bg-linear-to-r from-(--brand-cyan) to-(--brand-pink)"
        style={{
          width: `${Math.min(progress, 100)}%`,
        }}
      />
    </div>
  );
}
