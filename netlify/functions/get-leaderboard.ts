import type { Config } from '@netlify/functions';
import { isRespondable, requireMethod } from '../../src/lib/http';
import { mergeLeaderboards } from '../../src/lib/leaderboard';
import { MindshareClient } from '../../src/lib/mindshare-api';
import { remember } from '../../src/lib/netlify';

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const CACHE_KEY = 'quipnetwork|merged';

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(request: Request): Promise<Response> {
  try {
    requireMethod(request, 'GET');

    const apiKey = Netlify.env.get('MINDSHARE_API_KEY');
    if (!apiKey) {
      return jsonResponse({ error: 'Server configuration error' }, 500);
    }

    const client = new MindshareClient(apiKey);

    const data = await remember('mindshare-cache', CACHE_KEY, CACHE_TTL_MS, async () => {
      const [weekly, yearly] = await Promise.all([
        client.fetchLeaderboardByDays('quipnetwork', 7),
        client.fetchLeaderboardByDays('quipnetwork', 365),
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
