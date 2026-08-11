import type { Config } from '@netlify/functions';
import { getNextMondayWave, getPreviousMondayWave } from '../../src/lib/date';
import { isRespondable, requireMethod } from '../../src/lib/http';
import { loadMergedLeaderboard } from '../../src/lib/leaderboard-cache';
import { logFailure } from '../../src/lib/log';
import { MindshareClient } from '../../src/lib/mindshare-api';
import { blobCache } from '../../src/lib/netlify';

const KEYWORD = 'quipnetwork';
const YEARLY_WINDOW_DAYS = 365;

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

    const data = await loadMergedLeaderboard(
      blobCache('mindshare-cache'),
      KEYWORD,
      {
        weekly: () =>
          client.fetchLeaderboard({
            keyword: KEYWORD,
            startTs: Math.floor(getPreviousMondayWave().getTime() / 1000),
            endTs: Math.floor(getNextMondayWave().getTime() / 1000),
          }),
        yearly: () =>
          client.fetchLeaderboardByDays(KEYWORD, YEARLY_WINDOW_DAYS),
      }
    );

    return jsonResponse(data);
  } catch (err: unknown) {
    if (isRespondable(err)) return err.response();
    logFailure('leaderboard.unhandled_error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

export const config: Config = { path: '/api/leaderboard' };
