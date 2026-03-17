import type { LeaderboardEntry } from './types';

export interface MindshareLeaderboardParams {
  keyword: string;
  startTs: number;
  endTs: number;
  privateXUserIds?: string;
  excludedUserIds?: string;
}

export class MindshareClient {
  static API_BASE =
    'https://uat-mindshare.nucleus.codes/v1/metrics/external/mindshare-leaderboard-v2';
  private readonly apiKey: string;
  private readonly fetch: typeof fetch;

  constructor(apiKey: string, injectedFetch = fetch) {
    this.apiKey = apiKey;
    this.fetch = injectedFetch;
  }

  async fetchLeaderboard(
    params: MindshareLeaderboardParams
  ): Promise<LeaderboardEntry[]> {
    const { keyword, startTs, endTs, privateXUserIds, excludedUserIds } =
      params;

    const url = new URL(
      `${MindshareClient.API_BASE}/${keyword}/${startTs}/${endTs}`
    );

    if (privateXUserIds)
      url.searchParams.set('private_x_user_ids', privateXUserIds);
    if (excludedUserIds)
      url.searchParams.set('excluded_user_ids', excludedUserIds);

    const res = await this.fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => 'Unknown error');
      throw new Error(`Mindshare API error ${res.status}: ${text}`);
    }

    return res.json();
  }

  async fetchLeaderboardByDays(
    keyword: string,
    days: number
  ): Promise<LeaderboardEntry[]> {
    const endTs = Math.floor(Date.now() / 1000);
    const startTs = endTs - days * 24 * 60 * 60;
    return this.fetchLeaderboard({ keyword, startTs, endTs });
  }
}
