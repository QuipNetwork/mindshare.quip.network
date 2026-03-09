export function Hero() {
  return (
    <section className="mb-8 text-center">
      <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
        Mindshare Leaderboard
      </h1>
      <p className="mx-auto max-w-2xl text-sm text-[var(--color-scheme-1--text)] md:text-base">
        Track who&apos;s driving the most Twitter/X engagement for{' '}
        <a
          href="https://x.com/quipnetwork"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--brand-cyan)] hover:underline"
        >
          @quipnetwork
        </a>
        . Climb the ranks to earn rewards.
      </p>

      <div className="gradient-diagonal mx-auto mt-6 max-w-md rounded-xl border border-[var(--brand-purple-medium)]/40 p-4 text-left text-sm">
        <h3 className="mb-2 font-semibold text-white">Campaign Info</h3>
        <p className="text-[var(--color-scheme-1--text)]">
          Engage with QUIP Network on X to earn mindshare points.
          The higher your score, the better your rewards tier.
          Rankings update throughout the day.
        </p>
      </div>
    </section>
  );
}
