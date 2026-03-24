interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full min-w-1 rounded-full bg-linear-to-r from-cyan to-purple transition-[width] duration-500"
        style={{
          width: `${Math.min(progress, 100)}%`,
        }}
      />
    </div>
  );
}
