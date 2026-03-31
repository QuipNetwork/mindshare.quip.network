export type TimePeriod = 1 | 7 | 30 | 90 | 180 | 365;

export interface LeaderboardEntry {
  x_username: string;
  x_user_id: string;
  x_display_name: string;
  x_avatar_url: string | null;
  x_link: string;
  mindshare_score: number;
  mindshare_percent: number;
}

export interface LeaderboardEntryMerged {
  x_username: string;
  x_user_id: string;
  x_display_name: string;
  x_avatar_url: string | null;
  x_link: string;
  mindshare_score: {
    daily: number;
    weekly: number;
    yearly: number;
  };
  mindshare_percent: {
    daily: number;
    weekly: number;
    yearly: number;
  };
}

export interface LeaderboardEntryRanked extends LeaderboardEntryMerged {
  rank: {
    daily: number;
    weekly: number;
    yearly: number;
  };
}

export const TIME_PERIODS: Array<{ value: TimePeriod; label: string }> = [
  // { value: 1, label: '1D' },
  { value: 7, label: '7D' },
  { value: 30, label: '30D' },
  { value: 90, label: '3M' },
  { value: 180, label: '6M' },
  { value: 365, label: '1Y' },
];

export const ITEMS_PER_PAGE = 25;
