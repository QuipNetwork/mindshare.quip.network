import type { Config } from '@netlify/functions';
import { isRespondable, requireMethod } from '../../src/lib/http';
import {
  getMostRecent12PMUtc,
  mergeLeaderboards,
} from '../../src/lib/leaderboard';
import { MindshareClient } from '../../src/lib/mindshare-api';
import { remember } from '../../src/lib/netlify';

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
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
      try {
        const { MOCK_LEADERBOARD } = await import('./mock-data.ts');
        return jsonResponse(MOCK_LEADERBOARD);
      } catch {
        return jsonResponse({ error: 'Server configuration error' }, 500);
      }
    }

    const client = new MindshareClient(apiKey);

    const data = await remember('mindshare-cache', CACHE_KEY, CACHE_TTL_MS, async () => {
      const dailyStartTs = getMostRecent12PMUtc();
      const endTs = Math.floor(Date.now() / 1000);

      const [weekly, yearly, daily] = await Promise.all([
        client.fetchLeaderboardByDays('quipnetwork', 7),
        client.fetchLeaderboardByDays('quipnetwork', 365),
        client.fetchLeaderboard({
          keyword: 'quipnetwork',
          startTs: dailyStartTs,
          endTs,
        }),
      ]);
      return mergeLeaderboards(weekly, yearly, daily);
    });

    return jsonResponse(data);
  } catch (err: unknown) {
    if (isRespondable(err)) return err.response();
    console.error('Unhandled error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

export const config: Config = { path: '/api/leaderboard' };
