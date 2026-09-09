import { getNextMondayWave, getPreviousMondayWave } from './date';

export const SECONDS_PER_DAY = 24 * 60 * 60;

export interface LeaderboardWindow {
  startTs: number;
  endTs: number;
}

function toUnixSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

function toIso(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString();
}

export function weeklyWindow(now: Date = new Date()): LeaderboardWindow {
  return {
    startTs: toUnixSeconds(getPreviousMondayWave(now)),
    endTs: toUnixSeconds(getNextMondayWave(now)),
  };
}

export function trailingWindow(
  days: number,
  now: Date = new Date()
): LeaderboardWindow {
  const endTs = toUnixSeconds(now);
  return { startTs: endTs - days * SECONDS_PER_DAY, endTs };
}

export function describeWindow(
  source: string,
  { startTs, endTs }: LeaderboardWindow
): string {
  return [
    `source=${source}`,
    `startTs=${startTs}`,
    `endTs=${endTs}`,
    `startIso=${toIso(startTs)}`,
    `endIso=${toIso(endTs)}`,
    `spanDays=${(endTs - startTs) / SECONDS_PER_DAY}`,
  ].join(' ');
}

export function describeWindows(
  keyword: string,
  windows: Record<string, LeaderboardWindow>,
  now: Date = new Date()
): string {
  return (
    [
      `keyword=${keyword} generatedAtIso=${now.toISOString()}`,
      ...Object.entries(windows).map(([source, window]) =>
        describeWindow(source, window)
      ),
    ].join('\n') + '\n'
  );
}
