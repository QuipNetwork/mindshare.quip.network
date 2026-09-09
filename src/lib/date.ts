const MONDAY = 1;
const WAVE_HOUR_UTC = 13;
const DAYS_PER_WEEK = 7;

export function getNextMondayWave(now: Date = new Date()): Date {
  const daysUntilMonday =
    (MONDAY - now.getUTCDay() + DAYS_PER_WEEK) % DAYS_PER_WEEK;

  const candidate = new Date(now);
  candidate.setUTCDate(now.getUTCDate() + daysUntilMonday);
  candidate.setUTCHours(WAVE_HOUR_UTC, 0, 0, 0);

  if (candidate <= now) {
    candidate.setUTCDate(candidate.getUTCDate() + DAYS_PER_WEEK);
  }

  return candidate;
}

export function getPreviousMondayWave(now: Date = new Date()): Date {
  const daysSinceMonday =
    (now.getUTCDay() - MONDAY + DAYS_PER_WEEK) % DAYS_PER_WEEK;

  const candidate = new Date(now);
  candidate.setUTCDate(now.getUTCDate() - daysSinceMonday);
  candidate.setUTCHours(WAVE_HOUR_UTC, 0, 0, 0);

  if (candidate > now) {
    candidate.setUTCDate(candidate.getUTCDate() - DAYS_PER_WEEK);
  }

  return candidate;
}
