import { Countdown } from '@/components/Countdown';

export function Hero() {
  return (
    <section className="animate-fade-up mb-8 overflow-hidden rounded-2xl border border-white/6 bg-linear-to-br from-[rgba(139,92,246,0.06)] via-[rgba(0,212,255,0.03)] to-[rgba(224,64,224,0.04)] p-8">
      <div className="relative mb-6 text-center">
        <h1 className="mb-2 text-[clamp(24px,4vw,34px)] font-semibold tracking-tight text-text-primary">
          Mindshare Leaderboard
        </h1>
        <div className="text-sm leading-relaxed text-text">
          Track who&apos;s driving the most Twitter/X engagement for{' '}
          <a
            href="https://x.com/quipnetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:underline"
          >
            @quipnetwork
          </a>
          . Climb the ranks to earn rewards.
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-0">
        {/* Prize pool */}
        <div className="flex flex-col items-center gap-1 border-t border-white/6 px-3 pt-5 text-center sm:border-t-0 sm:pt-0">
          <div className="text-2xl font-semibold tracking-tight text-pink" style={{ textShadow: '0 0 30px rgba(224,64,224,0.3)' }}>
            $100,000
          </div>
          <div className="text-xs font-medium text-text">
            in $QUIP Token Rewards
          </div>
          <div className="text-[11px] text-text-muted">
            Season 1 &middot; Top 315 &middot; Paid at TGE
          </div>
        </div>

        <div className="hidden h-12 w-px bg-white/6 sm:block" />

        {/* Countdown */}
        <div className="flex flex-col items-center gap-1 border-t border-white/6 px-3 pt-5 text-center sm:border-t-0 sm:pt-0">
          <Countdown />
        </div>

        <div className="hidden h-12 w-px bg-white/6 sm:block" />

        {/* Weekly info */}
        <div className="flex flex-col items-center gap-1 border-t border-white/6 px-3 pt-5 text-center sm:border-t-0 sm:pt-0">
          <div className="text-2xl font-semibold tracking-tight text-cyan" style={{ textShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
            Top 1,000
          </div>
          <div className="text-xs font-medium text-text">
            Earn Weekly $QUIP Points
          </div>
          <div className="text-[11px] text-text-muted">
            Every Monday at 1pm UTC
          </div>
        </div>
      </div>
    </section>
  );
}
