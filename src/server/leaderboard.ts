import { loadMergedLeaderboard } from '../lib/leaderboard-cache';
import { KEYWORD } from '../lib/leaderboard-config';
import { campaignWindows } from '../lib/leaderboard-window';
import { MindshareClient } from '../lib/mindshare-api';
import { blobCache } from '../lib/netlify';

export async function getLeaderboard(apiKey: string) {
  const client = new MindshareClient(apiKey);
  const windows = campaignWindows();

  return loadMergedLeaderboard(blobCache('mindshare-cache'), KEYWORD, {
    weekly: () =>
      client.fetchLeaderboard({ keyword: KEYWORD, ...windows.weekly }),
    yearly: () =>
      client.fetchLeaderboard({ keyword: KEYWORD, ...windows.yearly }),
  });
}
