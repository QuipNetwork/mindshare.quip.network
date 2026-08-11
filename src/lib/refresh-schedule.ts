export interface RefreshCandidate<K extends string> {
  key: K;
  timestamp?: number;
}

export interface RefreshPolicy<K extends string> {
  candidates: RefreshCandidate<K>[];
  lastAttemptTs?: number;
  now: number;
  ttlMs: number;
  cooldownMs: number;
}

export function selectSourceToRefresh<K extends string>({
  candidates,
  lastAttemptTs,
  now,
  ttlMs,
  cooldownMs,
}: RefreshPolicy<K>): K | undefined {
  if (lastAttemptTs !== undefined && now - lastAttemptTs < cooldownMs) {
    return undefined;
  }

  const stale = candidates.filter(
    (candidate) =>
      candidate.timestamp === undefined || now - candidate.timestamp >= ttlMs
  );

  if (stale.length === 0) return undefined;

  return stale.reduce((stalest, candidate) =>
    (candidate.timestamp ?? 0) < (stalest.timestamp ?? 0) ? candidate : stalest
  ).key;
}
