import type { Config } from '@netlify/functions';
import { isRespondable, requireMethod } from '../../src/lib/http';
import { loadMergedLeaderboard } from '../../src/lib/leaderboard-cache';
import { KEYWORD, YEARLY_WINDOW_DAYS } from '../../src/lib/leaderboard-config';
import { weeklyWindow, trailingWindow } from '../../src/lib/leaderboard-window';
import { logFailure } from '../../src/lib/log';
import { MindshareClient } from '../../src/lib/mindshare-api';
import { blobCache } from '../../src/lib/netlify';

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
          client.fetchLeaderboard({ keyword: KEYWORD, ...weeklyWindow() }),
        yearly: () =>
          client.fetchLeaderboard({
            keyword: KEYWORD,
            ...trailingWindow(YEARLY_WINDOW_DAYS),
          }),
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
