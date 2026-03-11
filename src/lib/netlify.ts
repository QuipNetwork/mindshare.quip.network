import { getStore } from '@netlify/blobs';

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

  if (cached?.data && cached.metadata) {
    const timestamp = (cached.metadata as { timestamp?: number }).timestamp;
    if (timestamp && Date.now() - timestamp < ttlMs) {
      return cached.data as T;
    }
  }

  const data = await fn();

  await store
    .setJSON(key, data, { metadata: { timestamp: Date.now() } })
    .catch((err: unknown) => console.error('Cache write failed:', err));

  return data;
}
