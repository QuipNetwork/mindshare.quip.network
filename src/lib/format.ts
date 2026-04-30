export function formatPercent(n: number): string {
  return `${n.toFixed(2)}%`;
}

export const RANK_REWARDS: Map<number, number> = new Map([
  [1, 2000],
  [2, 1800],
  [3, 1600],
  [5, 1400],
  [10, 1200],
  [25, 1000],
  [100, 800],
  [500, 400],
  [1000, 200],
]);

export const QUIP_REWARDS: Map<number, number> = new Map([
  [1, 5000],
  [2, 4000],
  [3, 3000],
  [10, 2000],
  [25, 1000],
  [100, 500],
  [315, 100],
]);

export function getPointsForRank(rank: number, rewards = RANK_REWARDS): number {
  for (const [maxRank, points] of rewards) {
    if (rank <= maxRank) return points;
  }
  return 0;
}
