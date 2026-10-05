import { getLeaderboard } from '../../src/server/leaderboard';
import type { Config } from '@netlify/functions';
import { isRespondable, requireMethod } from '../../src/lib/http';
import { logFailure } from '../../src/lib/log';

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

    const data = await getLeaderboard(apiKey);

    return jsonResponse(data);
  } catch (err: unknown) {
    if (isRespondable(err)) return err.response();
    logFailure('leaderboard.unhandled_error', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

export const config: Config = { path: '/api/leaderboard' };
