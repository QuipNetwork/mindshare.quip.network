import { getStore } from '@netlify/blobs';

const FAILED_ATTEMPT_COOLDOWN_MS = 30 * 60 * 1000;

interface CacheMetadata {
  timestamp?: number;
  lastFailedAttemptTs?: number;
}

export async function remember<T>(
  storeName: string,
  key: string,
  ttlMs: number,
  fn: () => Promise<T>
): Promise<T> {
  const store = getStore(storeName);

  const cached = await store
    .getWithMetadata(key, { type: 'json' })
    .catch(() => null);

  const metadata = (cached?.metadata ?? {}) as CacheMetadata;
  const cachedData = cached?.data as T | undefined;
  const isFresh =
    metadata.timestamp !== undefined &&
    Date.now() - metadata.timestamp < ttlMs;

  if (cachedData !== undefined && isFresh) {
    return cachedData;
  }

  const recentlyFailed =
    metadata.lastFailedAttemptTs !== undefined &&
    Date.now() - metadata.lastFailedAttemptTs < FAILED_ATTEMPT_COOLDOWN_MS;

  if (cachedData !== undefined && recentlyFailed) {
    return cachedData;
  }

  try {
    const data = await fn();
    await store
      .setJSON(key, data, { metadata: { timestamp: Date.now() } })
      .catch((err: unknown) => console.error('Cache write failed:', err));
    return data;
  } catch (err) {
    if (cachedData !== undefined) {
      console.error('Upstream fetch failed, serving stale cache:', err);
      await store
        .setJSON(key, cachedData, {
          metadata: {
            timestamp: metadata.timestamp,
            lastFailedAttemptTs: Date.now(),
          },
        })
        .catch((writeErr: unknown) =>
          console.error('Cache metadata write failed:', writeErr)
        );
      return cachedData;
    }
    throw err;
  }
}
