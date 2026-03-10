import type { TimePeriod, LeaderboardEntry } from '@/lib/types';

export async function fetchLeaderboard(params: {
  period: TimePeriod;
  privateIds?: string;
  excludedIds?: string;
}): Promise<LeaderboardEntry[]> {
  const searchParams = new URLSearchParams({
    period: String(params.period),
  });

  if (params.privateIds?.trim()) {
    searchParams.set('private_x_user_ids', params.privateIds.trim());
  }
  if (params.excludedIds?.trim()) {
    searchParams.set('excluded_user_ids', params.excludedIds.trim());
  }

  const response = await fetch(`/api/leaderboard?${searchParams}`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error || `API error: ${response.status}`
    );
  }

  return response.json();
}
