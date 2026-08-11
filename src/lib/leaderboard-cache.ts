import { mergeLeaderboards } from './leaderboard';
import type { Cache } from './netlify';
import { selectSourceToRefresh } from './refresh-schedule';
import type { Respondable } from './http';
import type { LeaderboardEntry, LeaderboardEntryMerged } from './types';

export const SOURCE_STALE_AFTER_MS = 60 * 60 * 1000;
export const UPSTREAM_COOLDOWN_MS = 20 * 60 * 1000;

type SourceName = 'weekly' | 'yearly';

export type LeaderboardSources = Record<
  SourceName,
  () => Promise<LeaderboardEntry[]>
>;

export class LeaderboardUnavailableError extends Error implements Respondable {
  constructor(missing: SourceName[]) {
    super(`Leaderboard sources not populated yet: ${missing.join(', ')}`);
    this.name = 'LeaderboardUnavailableError';
  }

  response() {
    console.error(this.message);
    return new Response(
      JSON.stringify({ error: 'Leaderboard is not available yet' }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'Retry-After': String(Math.ceil(UPSTREAM_COOLDOWN_MS / 1000)),
        },
      }
    );
  }
}

function cacheKeys(keyword: string) {
  return {
    weekly: `${keyword}|weekly`,
    yearly: `${keyword}|yearly`,
    lastAttempt: `${keyword}|last-attempt`,
  };
}

async function refreshSource(
  cache: Cache,
  keys: ReturnType<typeof cacheKeys>,
  sources: LeaderboardSources,
  name: SourceName,
  now: number
): Promise<LeaderboardEntry[] | undefined> {
  const cooldownStarted = await cache.touch(keys.lastAttempt, now);
  if (!cooldownStarted) {
    console.error('Skipping refresh, cooldown could not be recorded');
    return undefined;
  }

  try {
    const entries = await sources[name]();
    const stored = await cache.write(keys[name], entries, now);
    if (!stored) {
      console.error(`Refreshed ${name} leaderboard could not be cached`);
    }
    return entries;
  } catch (err) {
    console.error(`Upstream fetch failed for ${name} leaderboard:`, err);
    return undefined;
  }
}

export async function loadMergedLeaderboard(
  cache: Cache,
  keyword: string,
  sources: LeaderboardSources,
  now: number = Date.now()
): Promise<LeaderboardEntryMerged[]> {
  const keys = cacheKeys(keyword);

  const [weekly, yearly, lastAttemptTs] = await Promise.all([
    cache.read<LeaderboardEntry[]>(keys.weekly),
    cache.read<LeaderboardEntry[]>(keys.yearly),
    cache.readTimestamp(keys.lastAttempt),
  ]);

  const entries: Record<SourceName, LeaderboardEntry[] | undefined> = {
    weekly: weekly?.data,
    yearly: yearly?.data,
  };

  const refreshable = selectSourceToRefresh<SourceName>({
    candidates: [
      { key: 'weekly', timestamp: weekly?.timestamp },
      { key: 'yearly', timestamp: yearly?.timestamp },
    ],
    lastAttemptTs,
    now,
    ttlMs: SOURCE_STALE_AFTER_MS,
    cooldownMs: UPSTREAM_COOLDOWN_MS,
  });

  if (refreshable) {
    const refreshed = await refreshSource(
      cache,
      keys,
      sources,
      refreshable,
      now
    );
    if (refreshed) entries[refreshable] = refreshed;
  }

  const missing = (['weekly', 'yearly'] as const).filter(
    (name) => entries[name] === undefined
  );
  if (missing.length > 0) throw new LeaderboardUnavailableError(missing);

  return mergeLeaderboards(entries.weekly ?? [], entries.yearly ?? []);
}
