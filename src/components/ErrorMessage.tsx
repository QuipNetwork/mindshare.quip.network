import { OutlineButton } from './OutlineButton';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <div className="border border-zinc-200 bg-zinc-100 px-6 py-4 font-mono text-sm text-zinc-700">
        {message}
      </div>
      {onRetry && <OutlineButton onClick={onRetry}>Try Again</OutlineButton>}
    </div>
  );
}
