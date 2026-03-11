import { getStore } from '@netlify/blobs';
import type { Config } from '@netlify/functions';
import { isRespondable, requireMethod } from '../../src/lib/http';

const VALID_PERIODS = new Set([1, 7, 30, 90, 180, 365]);

const TTL_MS: Record<number, number> = Object.freeze({
  1: 5 * 60 * 1000,
  7: 60 * 60 * 1000,
  30: 6 * 60 * 60 * 1000,
  90: 6 * 60 * 60 * 1000,
  180: 6 * 60 * 60 * 1000,
  365: 6 * 60 * 60 * 1000,
});

const API_BASE =
  'https://uat-mindshare.nucleus.codes/v1/metrics/external/mindshare-leaderboard-snapshots';

function buildCacheKey(
  period: number,
  privateIds: string,
  excludedIds: string
): string {
  const sortedPrivate = privateIds
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .sort()
    .join(',');
  const sortedExcluded = excludedIds
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .sort()
    .join(',');
  return `quipnetwork|${period}|p:${sortedPrivate}|e:${sortedExcluded}`;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(request: Request): Promise<Response> {
  try {
    requireMethod(request, 'GET');

    const url = new URL(request.url);
    const periodParam = url.searchParams.get('period');
    const period = periodParam ? Number(periodParam) : NaN;

    if (!VALID_PERIODS.has(period)) {
      return jsonResponse(
        { error: 'Invalid period. Must be 1, 7, 30, 90, 180, or 365.' },
        400
      );
    }

    const privateIds = url.searchParams.get('private_x_user_ids') ?? '';
    const excludedIds = url.searchParams.get('excluded_user_ids') ?? '';

    const cacheKey = buildCacheKey(period, privateIds, excludedIds);
    const store = getStore('mindshare-cache');

    const cached = await store
      .getWithMetadata(cacheKey, { type: 'json' })
      .catch(() => null);

    if (cached?.data && cached.metadata) {
      const timestamp = (cached.metadata as { timestamp?: number }).timestamp;
      if (timestamp && Date.now() - timestamp < TTL_MS[period]) {
        return jsonResponse(cached.data);
      }
    }

    const apiKey = Netlify.env.get('MINDSHARE_API_KEY');
    if (!apiKey) {
      return jsonResponse({ error: 'Server configuration error' }, 500);
    }

    const apiUrl = new URL(`${API_BASE}/quipnetwork/${period}`);
    if (privateIds) apiUrl.searchParams.set('private_x_user_ids', privateIds);
    if (excludedIds) apiUrl.searchParams.set('excluded_user_ids', excludedIds);

    const upstream = await fetch(apiUrl.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => 'Unknown error');
      return jsonResponse(
        { error: `Upstream API error: ${upstream.status}`, detail: text },
        502
      );
    }

    const data = await upstream.json();

    await store
      .setJSON(cacheKey, data, { metadata: { timestamp: Date.now() } })
      .catch((err: unknown) =>
        console.error('Cache write failed:', err)
      );

    return jsonResponse(data);
  } catch (err: unknown) {
    if (isRespondable(err)) return err.response();
    console.error('Unhandled error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

export const config: Config = { path: '/api/leaderboard' };
