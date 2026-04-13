import type { Config } from '@netlify/functions';
import { getNextMondayWave, getPreviousMondayWave } from '../../src/lib/date';
import { isRespondable, requireMethod } from '../../src/lib/http';
import { mergeLeaderboards } from '../../src/lib/leaderboard';
import { MindshareClient } from '../../src/lib/mindshare-api';
import { remember } from '../../src/lib/netlify';

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
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

    const data = await remember(
      'mindshare-cache',
      CACHE_KEY,
      CACHE_TTL_MS,
      async () => {
        const startTs = Math.floor(getPreviousMondayWave().getTime() / 1000);
        const endTs = Math.floor(getNextMondayWave().getTime() / 1000);
        const [weekly, yearly] = await Promise.all([
          client.fetchLeaderboard({ keyword: 'quipnetwork', startTs, endTs }),
          client.fetchLeaderboardByDays('quipnetwork', 365),
        ]);
        return mergeLeaderboards(weekly, yearly);
      }
    );

    return jsonResponse(data);
  } catch (err: unknown) {
    if (isRespondable(err)) return err.response();
    console.error('Unhandled error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

export const config: Config = { path: '/api/leaderboard' };
