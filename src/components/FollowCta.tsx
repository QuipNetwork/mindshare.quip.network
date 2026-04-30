import { XIcon } from './icons';

export function FollowCta() {
  return (
    <a
      href="https://x.com/quipnetwork"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-w-0 max-w-full items-center gap-3 border border-zinc-200 bg-zinc-50 py-2.5 pr-[18px] pl-2 font-mono text-[13px] text-zinc-700 transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-100"
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-zinc-950 text-zinc-50">
        <XIcon className="h-[13px] w-[13px]" />
      </span>
      <span>
        For the latest updates &mdash;{' '}
        <strong className="font-medium text-zinc-950">
          Follow @QuipNetwork
        </strong>
      </span>
    </a>
  );
}
