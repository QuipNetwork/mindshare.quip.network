import type { Config } from '@netlify/functions';
import { isRespondable, requireMethod } from '../../src/lib/http';
import { mergeLeaderboards } from '../../src/lib/leaderboard';
import { remember } from '../../src/lib/netlify';
import type { LeaderboardEntry } from '../../src/lib/types';

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const CACHE_KEY = 'quipnetwork|merged';

const API_BASE =
  'https://uat-mindshare.nucleus.codes/v1/metrics/external/mindshare-leaderboard-snapshots';

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function fetchPeriod(
  period: number,
  apiKey: string
): Promise<LeaderboardEntry[]> {
  const res = await fetch(`${API_BASE}/quipnetwork/${period}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    throw new Error(`Upstream API error ${res.status}: ${text}`);
  }

  return res.json();
}

export default async function handler(request: Request): Promise<Response> {
  try {
    requireMethod(request, 'GET');

    const apiKey = Netlify.env.get('MINDSHARE_API_KEY');
    if (!apiKey) {
      return jsonResponse({ error: 'Server configuration error' }, 500);
    }

    const data = await remember('mindshare-cache', CACHE_KEY, CACHE_TTL_MS, async () => {
      const [weekly, yearly] = await Promise.all([
        fetchPeriod(7, apiKey),
        fetchPeriod(365, apiKey),
      ]);
      return mergeLeaderboards(weekly, yearly);
    });

    return jsonResponse(data);
  } catch (err: unknown) {
    if (isRespondable(err)) return err.response();
    console.error('Unhandled error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

export const config: Config = { path: '/api/leaderboard' };
