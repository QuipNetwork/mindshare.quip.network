import type {
  LeaderboardEntry,
  LeaderboardEntryMerged,
  LeaderboardEntryRanked,
} from './types';

const DEFAULT_ENTRY_VALUES = Object.freeze({
  mindshare_score: { weekly: 0, yearly: 0 },
  mindshare_percent: { weekly: 0, yearly: 0 },
});

export function mergeEntries(
  weekly: LeaderboardEntry | undefined,
  yearly: LeaderboardEntry | undefined
): LeaderboardEntryMerged {
  const base = weekly ?? yearly;
  if (!base) throw new Error('At least one entry must be defined');

  return {
    x_username: base.x_username,
    x_user_id: base.x_user_id,
    x_display_name: base.x_display_name,
    x_avatar_url: base.x_avatar_url,
    x_link: base.x_link,
    mindshare_score: {
      weekly:
        weekly?.mindshare_score ?? DEFAULT_ENTRY_VALUES.mindshare_score.weekly,
      yearly:
        yearly?.mindshare_score ?? DEFAULT_ENTRY_VALUES.mindshare_score.yearly,
    },
    mindshare_percent: {
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
  yearlyList: LeaderboardEntry[]
): LeaderboardEntryMerged[] {
  const weeklyMap = new Map<string, LeaderboardEntry>();
  for (const entry of weeklyList) {
    weeklyMap.set(entry.x_user_id, entry);
  }

  const yearlyMap = new Map<string, LeaderboardEntry>();
  for (const entry of yearlyList) {
    yearlyMap.set(entry.x_user_id, entry);
  }

  const allIds = new Set([...weeklyMap.keys(), ...yearlyMap.keys()]);
  const merged: LeaderboardEntryMerged[] = [];

  for (const id of allIds) {
    merged.push(mergeEntries(weeklyMap.get(id), yearlyMap.get(id)));
  }

  return merged;
}

export function calculateRanks(
  entries: LeaderboardEntryMerged[],
  sortBy: 'yearly' | 'weekly' = 'yearly'
): LeaderboardEntryRanked[] {
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
          weekly: weekly.get(entry.x_user_id) ?? Infinity,
          yearly: yearly.get(entry.x_user_id) ?? Infinity,
        },
      })
    )
    .sort((a, b) => {
      return a.rank[sortBy] - b.rank[sortBy];
    });
}
