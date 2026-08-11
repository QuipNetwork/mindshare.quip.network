import { getStore } from '@netlify/blobs';

export interface CachedValue<T> {
  data: T;
  timestamp: number;
}

export interface Cache {
  read<T>(key: string): Promise<CachedValue<T> | undefined>;
  write<T>(key: string, data: T, timestamp: number): Promise<boolean>;
  readTimestamp(key: string): Promise<number | undefined>;
  touch(key: string, timestamp: number): Promise<boolean>;
}

export function blobCache(storeName: string): Cache {
  const store = getStore({ name: storeName, consistency: 'strong' });

  const timestampOf = (metadata: unknown) =>
    (metadata as { timestamp?: number } | undefined)?.timestamp;

  const writeValue = async <T>(key: string, data: T, timestamp: number) =>
    store
      .setJSON(key, data, { metadata: { timestamp } })
      .then(() => true)
      .catch((err: unknown) => {
        console.error(`Cache write failed for ${key}:`, err);
        return false;
      });

  return {
    read: async <T>(key: string) => {
      const cached = await store.getWithMetadata(key, { type: 'json' });
      const timestamp = timestampOf(cached?.metadata);

      if (!cached || timestamp === undefined) return undefined;

      return { data: cached.data as T, timestamp };
    },
    write: writeValue,
    readTimestamp: async (key: string) =>
      timestampOf((await store.getMetadata(key))?.metadata),
    touch: (key: string, timestamp: number) => writeValue(key, null, timestamp),
  };
}
