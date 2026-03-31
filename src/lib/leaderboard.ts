import type {
  LeaderboardEntry,
  LeaderboardEntryMerged,
  LeaderboardEntryRanked,
} from './types';

export function getMostRecent12PMUtc(): number {
  const now = new Date();
  const today12PM = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      12,
      0,
      0,
      0
    )
  );
  if (now < today12PM) today12PM.setUTCDate(today12PM.getUTCDate() - 1);
  return Math.floor(today12PM.getTime() / 1000);
}

const DEFAULT_ENTRY_VALUES = Object.freeze({
  mindshare_score: { daily: 0, weekly: 0, yearly: 0 },
  mindshare_percent: { daily: 0, weekly: 0, yearly: 0 },
});

export function mergeEntries(
  weekly: LeaderboardEntry | undefined,
  yearly: LeaderboardEntry | undefined,
  daily: LeaderboardEntry | undefined
): LeaderboardEntryMerged {
  const base = daily ?? weekly ?? yearly;
  if (!base) throw new Error('At least one entry must be defined');

  return {
    x_username: base.x_username,
    x_user_id: base.x_user_id,
    x_display_name: base.x_display_name,
    x_avatar_url: base.x_avatar_url,
    x_link: base.x_link,
    mindshare_score: {
      daily:
        daily?.mindshare_score ?? DEFAULT_ENTRY_VALUES.mindshare_score.daily,
      weekly:
        weekly?.mindshare_score ?? DEFAULT_ENTRY_VALUES.mindshare_score.weekly,
      yearly:
        yearly?.mindshare_score ?? DEFAULT_ENTRY_VALUES.mindshare_score.yearly,
    },
    mindshare_percent: {
      daily:
        daily?.mindshare_percent ??
        DEFAULT_ENTRY_VALUES.mindshare_percent.daily,
      weekly:
        weekly?.mindshare_percent ??
        DEFAULT_ENTRY_VALUES.mindshare_percent.weekly,
      yearly:
        yearly?.mindshare_percent ??
        DEFAULT_ENTRY_VALUES.mindshare_percent.yearly,
    },
  };
}

export function mergeLeaderboards(
  weeklyList: LeaderboardEntry[],
  yearlyList: LeaderboardEntry[],
  dailyList: LeaderboardEntry[]
): LeaderboardEntryMerged[] {
  const weeklyMap = new Map<string, LeaderboardEntry>();
  for (const entry of weeklyList) {
    weeklyMap.set(entry.x_user_id, entry);
  }

  const yearlyMap = new Map<string, LeaderboardEntry>();
  for (const entry of yearlyList) {
    yearlyMap.set(entry.x_user_id, entry);
  }

  const dailyMap = new Map<string, LeaderboardEntry>();
  for (const entry of dailyList) {
    dailyMap.set(entry.x_user_id, entry);
  }

  const allIds = new Set([
    ...weeklyMap.keys(),
    ...yearlyMap.keys(),
    ...dailyMap.keys(),
  ]);
  const merged: LeaderboardEntryMerged[] = [];

  for (const id of allIds) {
    merged.push(
      mergeEntries(weeklyMap.get(id), yearlyMap.get(id), dailyMap.get(id))
    );
  }

  return merged;
}

export function calculateRanks(
  entries: LeaderboardEntryMerged[],
  sortBy: 'yearly' | 'weekly' | 'daily' = 'yearly'
): LeaderboardEntryRanked[] {
  const daily = Array.from(entries)
    .sort((a, b) => {
      return b.mindshare_score.daily - a.mindshare_score.daily;
    })
    .reduce((map, x, i) => {
      map.set(x.x_user_id, i);
      return map;
    }, new Map<string, number>());

  const weekly = Array.from(entries)
    .sort((a, b) => {
      return b.mindshare_score.weekly - a.mindshare_score.weekly;
    })
    .reduce((map, x, i) => {
      map.set(x.x_user_id, i);
      return map;
    }, new Map<string, number>());

  const yearly = Array.from(entries)
    .sort((a, b) => {
      return b.mindshare_score.yearly - a.mindshare_score.yearly;
    })
    .reduce((map, x, i) => {
      map.set(x.x_user_id, i);
      return map;
    }, new Map<string, number>());

  return entries
    .map(
      (entry): LeaderboardEntryRanked => ({
        ...entry,
        rank: {
          daily: daily.get(entry.x_user_id) ?? Infinity,
          weekly: weekly.get(entry.x_user_id) ?? Infinity,
          yearly: yearly.get(entry.x_user_id) ?? Infinity,
        },
      })
    )
    .sort((a, b) => {
      return a.rank[sortBy] - b.rank[sortBy];
    });
}
