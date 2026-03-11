import { Countdown } from '@/components/Countdown';

export function Hero() {
  return (
    <section className="mb-8 text-center">
      <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
        Mindshare Leaderboard
      </h1>
      <p className="mx-auto max-w-3xl text-sm text-(--color-scheme-1--text) md:text-base">
        Track who&apos;s driving the most Twitter/X engagement for{' '}
        <a
          href="https://x.com/quipnetwork"
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--brand-cyan) hover:underline"
        >
          @quipnetwork
        </a>
        . Climb the ranks to earn rewards.
      </p>

      <Countdown />
    </section>
  );
}
