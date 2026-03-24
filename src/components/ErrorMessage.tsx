interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <div className="rounded-lg bg-red-500/10 px-6 py-4 text-red-400">
        {message}
      </div>
      {onRetry && (
        <button className="cursor-pointer rounded-lg border border-white/6 bg-white/3 px-4 py-2 text-sm font-medium text-text-muted transition-all duration-150 hover:bg-white/6 hover:text-text-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
