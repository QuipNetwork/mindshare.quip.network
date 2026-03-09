export function formatScore(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  return n >= 10 ? n.toFixed(0) : n.toFixed(3);
}

export function formatPercent(n: number): string {
  return `${n.toFixed(2)}%`;
}
