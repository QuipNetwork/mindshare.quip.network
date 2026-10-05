import { loadMergedLeaderboard } from '../lib/leaderboard-cache';
import { KEYWORD, YEARLY_WINDOW_DAYS } from '../lib/leaderboard-config';
import { weeklyWindow, trailingWindow } from '../lib/leaderboard-window';
import { MindshareClient } from '../lib/mindshare-api';
import { blobCache } from '../lib/netlify';

export async function getLeaderboard(apiKey: string) {
  const client = new MindshareClient(apiKey);

  return loadMergedLeaderboard(blobCache('mindshare-cache'), KEYWORD, {
    weekly: () =>
      client.fetchLeaderboard({ keyword: KEYWORD, ...weeklyWindow() }),
    yearly: () =>
      client.fetchLeaderboard({
        keyword: KEYWORD,
        ...trailingWindow(YEARLY_WINDOW_DAYS),
      }),
  });
}
