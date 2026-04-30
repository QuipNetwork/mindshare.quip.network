interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="relative h-1 w-full max-w-[280px] flex-1 bg-zinc-150">
      <div
        className="absolute inset-y-0 left-0 origin-left animate-bar-grow"
        style={{
          width: `${Math.min(100, progress)}%`,
          backgroundImage:
            'linear-gradient(to right, #FF6C78 0%, #FF92D5 25%, #E6D7FF 50%, #4CE0FF 72%, #67E347 100%)',
          backgroundSize: '280px 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
        }}
      />
    </div>
  );
}
