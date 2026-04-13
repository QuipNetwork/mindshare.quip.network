/**
 * Returns the next Monday 1PM UTC from now.
 */
export function getNextMondayWave(): Date {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7;

  const candidate = new Date(now);
  candidate.setUTCDate(now.getUTCDate() + daysUntilMonday);
  candidate.setUTCHours(13, 0, 0, 0);

  if (candidate <= now) {
    candidate.setUTCDate(candidate.getUTCDate() + 7);
  }

  return candidate;
}

/**
 * Returns the most recent Monday 1PM UTC in the past.
 */
export function getPreviousMondayWave(): Date {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const daysSinceMonday = (dayOfWeek - 1 + 7) % 7;

  const candidate = new Date(now);
  candidate.setUTCDate(now.getUTCDate() - daysSinceMonday);
  candidate.setUTCHours(13, 0, 0, 0);

  if (candidate > now) {
    candidate.setUTCDate(candidate.getUTCDate() - 7);
  }

  return candidate;
}
