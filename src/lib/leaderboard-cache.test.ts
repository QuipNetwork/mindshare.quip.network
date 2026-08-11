import { describe, expect, it, vi } from 'vitest';
import {
  LeaderboardUnavailableError,
  loadMergedLeaderboard,
  SOURCE_STALE_AFTER_MS,
  UPSTREAM_COOLDOWN_MS,
  type LeaderboardSources,
} from './leaderboard-cache';
import type { Cache, CachedValue } from './netlify';
import type { LeaderboardEntry } from './types';

const KEYWORD = 'quipnetwork';
const NOW = 1_800_000_000_000;

function entry(id: string, score: number): LeaderboardEntry {
  return {
    x_username: `user${id}`,
    x_user_id: id,
    x_display_name: `User ${id}`,
    x_avatar_url: null,
    x_link: `https://x.com/user${id}`,
    mindshare_score: score,
    mindshare_percent: score,
  };
}

interface FakeCache extends Cache {
  log: string[];
}

function fakeCache(
  initial: Record<string, CachedValue<unknown>> = {},
  options: { canWrite?: (key: string) => boolean } = {}
): FakeCache {
  const stored: Record<string, CachedValue<unknown>> = structuredClone(initial);
  const canWrite = options.canWrite ?? (() => true);
  const log: string[] = [];

  const write = async <T>(key: string, data: T, timestamp: number) => {
    log.push(`write ${key}`);
    if (!canWrite(key)) return false;
    stored[key] = structuredClone({ data, timestamp });
    return true;
  };

  return {
    log,
    read: async <T>(key: string) =>
      structuredClone(stored[key]) as CachedValue<T> | undefined,
    readTimestamp: async (key: string) => stored[key]?.timestamp,
    write,
    touch: (key: string, timestamp: number) => write(key, null, timestamp),
  };
}

function fakeSources(log: string[] = []): LeaderboardSources & {
  calls: () => string[];
} {
  const calls: string[] = [];
  return {
    calls: () => calls,
    weekly: async () => {
      calls.push('weekly');
      log.push('fetch weekly');
      return [entry('1', 10)];
    },
    yearly: async () => {
      calls.push('yearly');
      log.push('fetch yearly');
      return [entry('1', 20)];
    },
  };
}

function populatedCache(weeklyAge: number, yearlyAge: number) {
  return fakeCache({
    [`${KEYWORD}|weekly`]: {
      data: [entry('1', 1)],
      timestamp: NOW - weeklyAge,
    },
    [`${KEYWORD}|yearly`]: {
      data: [entry('1', 2)],
      timestamp: NOW - yearlyAge,
    },
  });
}

describe('loadMergedLeaderboard', () => {
  it('refreshes at most one source per request', async () => {
    const cache = populatedCache(
      10 * SOURCE_STALE_AFTER_MS,
      10 * SOURCE_STALE_AFTER_MS
    );
    const sources = fakeSources();

    await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);

    expect(sources.calls()).toHaveLength(1);
  });

  it('refreshes the stalest source', async () => {
    const cache = populatedCache(
      SOURCE_STALE_AFTER_MS + 1,
      10 * SOURCE_STALE_AFTER_MS
    );
    const sources = fakeSources();

    await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);

    expect(sources.calls()).toEqual(['yearly']);
  });

  it('skips refreshing while the upstream cooldown is active', async () => {
    const cache = populatedCache(
      10 * SOURCE_STALE_AFTER_MS,
      10 * SOURCE_STALE_AFTER_MS
    );
    await cache.touch(
      `${KEYWORD}|last-attempt`,
      NOW - UPSTREAM_COOLDOWN_MS + 1
    );
    const sources = fakeSources();

    await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);

    expect(sources.calls()).toEqual([]);
  });

  it('serves both sources from cache while they are fresh', async () => {
    const cache = populatedCache(
      SOURCE_STALE_AFTER_MS - 1,
      SOURCE_STALE_AFTER_MS - 1
    );
    const sources = fakeSources();

    const merged = await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);

    expect(sources.calls()).toEqual([]);
    expect(merged[0].mindshare_score).toEqual({ weekly: 1, yearly: 2 });
  });

  it('merges a refreshed source with the cached one', async () => {
    const cache = populatedCache(
      10 * SOURCE_STALE_AFTER_MS,
      SOURCE_STALE_AFTER_MS - 1
    );
    const sources = fakeSources();

    const merged = await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);

    expect(sources.calls()).toEqual(['weekly']);
    expect(merged[0].mindshare_score).toEqual({ weekly: 10, yearly: 2 });
  });

  it('serves stale data when the refreshed source fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const cache = populatedCache(
      10 * SOURCE_STALE_AFTER_MS,
      SOURCE_STALE_AFTER_MS - 1
    );
    const failingWeekly = {
      weekly: () => Promise.reject(new Error('Mindshare API error 429')),
      yearly: async () => [entry('1', 2)],
    };

    const merged = await loadMergedLeaderboard(
      cache,
      KEYWORD,
      failingWeekly,
      NOW
    );

    expect(merged[0].mindshare_score).toEqual({ weekly: 1, yearly: 2 });
  });

  it('starts the cooldown before calling upstream', async () => {
    const cache = populatedCache(
      10 * SOURCE_STALE_AFTER_MS,
      10 * SOURCE_STALE_AFTER_MS
    );
    const sources = fakeSources(cache.log);

    await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);

    expect(cache.log[0]).toBe(`write ${KEYWORD}|last-attempt`);
    expect(cache.log[1]).toBe('fetch weekly');
  });

  it('keeps the cooldown when the refresh fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const cache = populatedCache(
      10 * SOURCE_STALE_AFTER_MS,
      10 * SOURCE_STALE_AFTER_MS
    );
    const failing = {
      weekly: () => Promise.reject(new Error('Mindshare API error 429')),
      yearly: () => Promise.reject(new Error('Mindshare API error 429')),
    };

    await loadMergedLeaderboard(cache, KEYWORD, failing, NOW);

    expect(await cache.readTimestamp(`${KEYWORD}|last-attempt`)).toBe(NOW);
  });

  it('does not call upstream when the cooldown cannot be recorded', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const cache = fakeCache({}, { canWrite: () => false });
    const sources = fakeSources();

    await loadMergedLeaderboard(cache, KEYWORD, sources, NOW).catch(() => {});

    expect(sources.calls()).toEqual([]);
  });

  it('alternates sources across consecutive refreshes', async () => {
    const cache = populatedCache(
      10 * SOURCE_STALE_AFTER_MS,
      10 * SOURCE_STALE_AFTER_MS
    );
    const sources = fakeSources();

    await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);
    await loadMergedLeaderboard(
      cache,
      KEYWORD,
      sources,
      NOW + UPSTREAM_COOLDOWN_MS
    );

    expect(sources.calls()).toEqual(['weekly', 'yearly']);
  });

  it('reports unavailable rather than merging a never-populated source', async () => {
    const cache = fakeCache();
    const sources = fakeSources();

    await expect(
      loadMergedLeaderboard(cache, KEYWORD, sources, NOW)
    ).rejects.toBeInstanceOf(LeaderboardUnavailableError);
  });

  it('becomes available once both sources have been populated', async () => {
    const cache = fakeCache();
    const sources = fakeSources();

    await loadMergedLeaderboard(cache, KEYWORD, sources, NOW).catch(() => {});
    const merged = await loadMergedLeaderboard(
      cache,
      KEYWORD,
      sources,
      NOW + UPSTREAM_COOLDOWN_MS
    );

    expect(merged[0].mindshare_score).toEqual({ weekly: 10, yearly: 20 });
  });

  it('serves the refreshed data even when caching it fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const cache = fakeCache(
      {
        [`${KEYWORD}|weekly`]: {
          data: [entry('1', 1)],
          timestamp: NOW - 10 * SOURCE_STALE_AFTER_MS,
        },
        [`${KEYWORD}|yearly`]: {
          data: [entry('1', 2)],
          timestamp: NOW - SOURCE_STALE_AFTER_MS + 1,
        },
      },
      { canWrite: (key) => key.endsWith('last-attempt') }
    );
    const sources = fakeSources();

    const merged = await loadMergedLeaderboard(cache, KEYWORD, sources, NOW);

    expect(merged[0].mindshare_score).toEqual({ weekly: 10, yearly: 2 });
  });

  it('propagates cache read failures instead of reporting unavailable', async () => {
    const cache = fakeCache();
    cache.read = () => Promise.reject(new Error('Blob store unreachable'));

    await expect(
      loadMergedLeaderboard(cache, KEYWORD, fakeSources(), NOW)
    ).rejects.toThrow('Blob store unreachable');
  });

  it('scopes cache keys to the keyword', async () => {
    const cache = populatedCache(
      SOURCE_STALE_AFTER_MS - 1,
      SOURCE_STALE_AFTER_MS - 1
    );
    const sources = fakeSources();

    await loadMergedLeaderboard(cache, 'otherkeyword', sources, NOW).catch(
      () => {}
    );

    expect(sources.calls()).toEqual(['weekly']);
  });
});

describe('LeaderboardUnavailableError', () => {
  it('responds with 503', () => {
    expect(new LeaderboardUnavailableError(['weekly']).response().status).toBe(
      503
    );
  });
});
