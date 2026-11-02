import clsx from 'clsx';
import { Em } from './Em';

export const FINAL_STRETCH_URL =
  'https://quip.network/blog/quip-network-final-stretch-to-mainnet';
export const QUIP_POINTS_URL = 'https://points.quip.network';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral';

/**
 * Replaces the weekly point wave countdown now that the Mindshare campaign
 * has ended, and points people at the Quip Points campaign that is live.
 */
export function CampaignConcluded() {
  return (
    <div className="flex min-w-0 flex-col gap-5 border-t border-zinc-200 pt-5">
      <div>
        <h2 className="font-display text-[clamp(26px,calc(1vw+16px),32px)] font-medium leading-[1.1] tracking-[-0.02em] text-zinc-950">
          This campaign has <Em>concluded</Em>
        </h2>
        <p className="mt-2 text-sm leading-5 text-zinc-600">
          Ended Nov 2 at 13:00 UTC.{' '}
          <a
            href={FINAL_STRETCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'whitespace-nowrap text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors duration-150 hover:decoration-zinc-950',
              focusRing
            )}
          >
            Read the update
          </a>
        </p>
      </div>

      <a
        href={QUIP_POINTS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'group flex items-center justify-between gap-5 bg-zinc-950 p-6 text-zinc-50 transition-colors duration-150 hover:bg-zinc-900',
          focusRing
        )}
      >
        <span className="min-w-0">
          <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.4px] text-zinc-400">
            points.quip.network
          </span>
          <span className="mt-2 block font-display text-[clamp(28px,calc(1vw+18px),32px)] font-medium leading-[1.1] tracking-[-0.02em]">
            Earn Quip Points
          </span>
        </span>
        <ArrowIcon />
      </a>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-5 w-5 shrink-0 text-coral transition-transform duration-150 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
