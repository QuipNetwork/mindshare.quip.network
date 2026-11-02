import type { Config } from '@netlify/functions';
import { isRespondable, requireMethod } from '../../src/lib/http';
import { KEYWORD } from '../../src/lib/leaderboard-config';
import {
  campaignWindows,
  describeWindows,
} from '../../src/lib/leaderboard-window';
import { logFailure } from '../../src/lib/log';

function textResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export default function handler(request: Request): Response {
  try {
    requireMethod(request, 'GET');

    return textResponse(
      describeWindows(KEYWORD, campaignWindows())
    );
  } catch (err: unknown) {
    if (isRespondable(err)) return err.response();
    logFailure('leaderboard-windows.unhandled_error', err);
    return textResponse('Internal server error', 500);
  }
}

export const config: Config = { path: '/api/leaderboard/windows' };
