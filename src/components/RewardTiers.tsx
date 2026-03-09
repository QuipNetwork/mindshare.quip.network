const TIERS = [
  { label: 'Gold', range: '1 - 10', color: '#FFD700', description: 'Top contributors with highest engagement' },
  { label: 'Silver', range: '11 - 50', color: '#C0C0C0', description: 'Strong consistent engagement' },
  { label: 'Bronze', range: '51 - 100', color: '#CD7F32', description: 'Active community participants' },
];

export function RewardTiers() {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold text-white">Reward Tiers</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.label}
            className="rounded-xl border border-[var(--brand-purple-medium)]/30 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: tier.color }}
              />
              <span className="text-sm font-semibold text-white">
                {tier.label}
              </span>
            </div>
            <div className="mb-1 text-xs font-mono text-[var(--brand-cyan)]">
              Rank {tier.range}
            </div>
            <p className="text-xs text-[var(--color-scheme-1--text)]">
              {tier.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
